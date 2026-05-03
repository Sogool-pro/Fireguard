import { get, ref, set } from "firebase/database";
import {
  collection,
  doc,
  getDocs,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { db, firestore } from "../firebase";

const BACKUP_FORMAT = "fireguard-system-backup";
const BACKUP_VERSION = 1;
const USERS_COLLECTION = "users";
const MAX_BATCH_WRITES = 450;

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function encodeFirestoreValue(value) {
  if (value instanceof Timestamp) {
    return {
      __fireguardType: "firestoreTimestamp",
      seconds: value.seconds,
      nanoseconds: value.nanoseconds,
    };
  }

  if (value instanceof Date) {
    return {
      __fireguardType: "date",
      value: value.toISOString(),
    };
  }

  if (Array.isArray(value)) {
    return value.map(encodeFirestoreValue);
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce((encoded, [key, childValue]) => {
      if (childValue !== undefined) {
        encoded[key] = encodeFirestoreValue(childValue);
      }
      return encoded;
    }, {});
  }

  return value;
}

function decodeFirestoreValue(value) {
  if (Array.isArray(value)) {
    return value.map(decodeFirestoreValue);
  }

  if (isPlainObject(value)) {
    if (value.__fireguardType === "firestoreTimestamp") {
      return new Timestamp(
        Number(value.seconds) || 0,
        Number(value.nanoseconds) || 0,
      );
    }

    if (value.__fireguardType === "date") {
      return new Date(value.value);
    }

    return Object.entries(value).reduce((decoded, [key, childValue]) => {
      decoded[key] = decodeFirestoreValue(childValue);
      return decoded;
    }, {});
  }

  return value;
}

function normalizeFirestoreUsers(users) {
  if (Array.isArray(users)) {
    return users;
  }

  if (isPlainObject(users)) {
    return Object.entries(users).map(([id, data]) => ({ id, data }));
  }

  return [];
}

function looksLikeRealtimeExport(value) {
  if (!isPlainObject(value)) return false;

  return [
    "alerts",
    "sensor_data",
    "room_names",
    "room_meta",
    "phone_numbers",
    "thresholds",
  ].some((key) => Object.prototype.hasOwnProperty.call(value, key));
}

function validateUserDocument(userDoc) {
  if (!userDoc || typeof userDoc.id !== "string" || !userDoc.id.trim()) {
    throw new Error("Backup contains a user record without a valid ID.");
  }

  if (userDoc.id.includes("/")) {
    throw new Error("Backup contains an invalid user record ID.");
  }

  if (!isPlainObject(userDoc.data)) {
    throw new Error(`Backup user record ${userDoc.id} is not a valid object.`);
  }
}

export function normalizeBackup(rawBackup) {
  if (!rawBackup || typeof rawBackup !== "object") {
    throw new Error("Backup file is empty or invalid.");
  }

  if (
    rawBackup.metadata?.format !== BACKUP_FORMAT &&
    looksLikeRealtimeExport(rawBackup)
  ) {
    return {
      metadata: {
        format: BACKUP_FORMAT,
        version: BACKUP_VERSION,
        createdAt: null,
        source: "realtime-database-export",
      },
      realtimeDatabase: rawBackup,
      firestore: { users: [] },
      summary: {
        realtimeRootKeys: Object.keys(rawBackup).length,
        users: 0,
        realtimeOnly: true,
      },
    };
  }

  if (rawBackup.metadata?.format !== BACKUP_FORMAT) {
    throw new Error("This is not a FireGuard backup file.");
  }

  if (rawBackup.metadata.version !== BACKUP_VERSION) {
    throw new Error(
      `Unsupported backup version ${rawBackup.metadata.version || "unknown"}.`,
    );
  }

  if (!Object.prototype.hasOwnProperty.call(rawBackup, "realtimeDatabase")) {
    throw new Error("Backup is missing Realtime Database data.");
  }

  const users = normalizeFirestoreUsers(rawBackup.firestore?.users);
  users.forEach(validateUserDocument);

  return {
    metadata: rawBackup.metadata,
    realtimeDatabase: rawBackup.realtimeDatabase ?? null,
    firestore: { users },
    summary: {
      realtimeRootKeys: isPlainObject(rawBackup.realtimeDatabase)
        ? Object.keys(rawBackup.realtimeDatabase).length
        : 0,
      users: users.length,
      realtimeOnly: false,
    },
  };
}

export async function createSystemBackup(currentUser) {
  const [realtimeSnapshot, usersSnapshot] = await Promise.all([
    get(ref(db)),
    getDocs(collection(firestore, USERS_COLLECTION)),
  ]);

  const users = usersSnapshot.docs.map((userDoc) => ({
    id: userDoc.id,
    data: encodeFirestoreValue(userDoc.data()),
  }));

  const backup = {
    metadata: {
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      createdAt: new Date().toISOString(),
      createdBy: currentUser
        ? {
            uid: currentUser.uid || null,
            email: currentUser.email || null,
            displayName: currentUser.displayName || null,
          }
        : null,
      includes: {
        realtimeDatabase: true,
        firestoreCollections: [USERS_COLLECTION],
      },
      authAccountsIncluded: false,
    },
    realtimeDatabase: realtimeSnapshot.exists() ? realtimeSnapshot.val() : null,
    firestore: {
      users,
    },
  };

  return normalizeBackup(backup);
}

export function createBackupFileName(date = new Date()) {
  const timestamp = date.toISOString().replace(/[:.]/g, "-");
  return `fireguard-backup-${timestamp}.json`;
}

export function downloadBackupFile(backup) {
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = createBackupFileName();
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function readBackupFile(file) {
  if (!file) {
    throw new Error("Choose a backup file first.");
  }

  const text = await file.text();
  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Backup file must be valid JSON.");
  }

  return normalizeBackup(parsed);
}

async function commitWriteActions(actions) {
  let batch = writeBatch(firestore);
  let writeCount = 0;

  for (const action of actions) {
    if (action.type === "delete") {
      batch.delete(action.ref);
    } else {
      batch.set(action.ref, action.data);
    }

    writeCount += 1;

    if (writeCount === MAX_BATCH_WRITES) {
      await batch.commit();
      batch = writeBatch(firestore);
      writeCount = 0;
    }
  }

  if (writeCount > 0) {
    await batch.commit();
  }
}

export async function restoreSystemBackup(rawBackup) {
  const backup = normalizeBackup(rawBackup);

  await set(ref(db), backup.realtimeDatabase);

  if (backup.firestore.users.length > 0) {
    const backupUserIds = new Set(
      backup.firestore.users.map((userDoc) => userDoc.id),
    );
    const currentUsersSnapshot = await getDocs(
      collection(firestore, USERS_COLLECTION),
    );
    const writeActions = [];

    currentUsersSnapshot.docs.forEach((currentUserDoc) => {
      if (!backupUserIds.has(currentUserDoc.id)) {
        writeActions.push({
          type: "delete",
          ref: doc(firestore, USERS_COLLECTION, currentUserDoc.id),
        });
      }
    });

    backup.firestore.users.forEach((userDoc) => {
      writeActions.push({
        type: "set",
        ref: doc(firestore, USERS_COLLECTION, userDoc.id),
        data: decodeFirestoreValue(userDoc.data),
      });
    });

    await commitWriteActions(writeActions);
  }

  return backup.summary;
}
