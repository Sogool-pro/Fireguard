const LOG_HEADERS = [
  "Date",
  "Room",
  "Severity",
  "Alarm Details",
  "Flame Sensor",
  "Temp (\u00B0C)",
  "Humidity",
  "Smoke (ppm)",
  "CO (ppm)",
  "Entry Type",
  "Recorded By",
  "Notes",
];

const LOG_COLUMN_WIDTHS = [
  { min: 1, max: 1, width: 20 },
  { min: 2, max: 3, width: 12 },
  { min: 4, max: 4, width: 42 },
  { min: 5, max: 5, width: 14 },
  { min: 6, max: 7, width: 10 },
  { min: 8, max: 8, width: 12 },
  { min: 9, max: 9, width: 10 },
  { min: 10, max: 10, width: 20 },
  { min: 11, max: 11, width: 26 },
  { min: 12, max: 12, width: 14 },
];

const SEVERITY_ORDER = ["FLAME", "ESCALATED", "ALERT", "WARNING", "INFO"];

const LOG_SEVERITY_STYLES = {
  FLAME: 11,
  ESCALATED: 17,
  ALERT: 4,
  WARNING: 16,
  INFO: 18,
};

const SUMMARY_SEVERITY_STYLES = {
  FLAME: 20,
  ESCALATED: 24,
  ALERT: 25,
  WARNING: 26,
  INFO: 27,
};

const CELL_REFS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const ZIP_UTF8_FLAG = 0x0800;
const ZIP_STORE_METHOD = 0;

function normalizeText(value, fallback = "-") {
  const text = String(value ?? "").trim().replace(/\s+/g, " ");
  return text || fallback;
}

function normalizeTimestamp(value) {
  const text = normalizeText(value);
  if (text === "-") return text;

  const normalized = text.replace("T", " ").replace(/\.\d{3}Z$/i, "Z");
  const compactDateTime = normalized.match(
    /^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})(?::(\d{2}))?$/,
  );

  if (compactDateTime) {
    return `${compactDateTime[1]} ${compactDateTime[2]}:${
      compactDateTime[3] || "00"
    }`;
  }

  const parsed = new Date(text.includes(" ") ? text.replace(" ", "T") : text);
  if (Number.isNaN(parsed.getTime())) return normalized;

  const pad = (part) => String(part).padStart(2, "0");
  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(
    parsed.getDate(),
  )} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(
    parsed.getSeconds(),
  )}`;
}

function normalizeRoom(value) {
  const text = normalizeText(value);
  return text === "-" ? text : text.toUpperCase();
}

function parseMeasurement(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;

  const text = String(value ?? "").trim();
  if (!text || text === "-") return null;

  const match = text.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;

  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function parsePercent(value) {
  const parsed = parseMeasurement(value);
  if (parsed === null) return null;
  return Math.abs(parsed) > 1 ? parsed / 100 : parsed;
}

function roundNumber(value, digits = 2) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return null;
  }

  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function average(values) {
  const numbers = values.filter((value) => Number.isFinite(value));
  if (numbers.length === 0) return null;

  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

function deriveSeverity(log) {
  const message = normalizeText(log.alert ?? log.message, "").toLowerCase();
  const rawSeverity = normalizeText(
    log.severity ?? log.alert_level ?? log.level ?? log.type ?? log.status,
    "",
  ).toLowerCase();
  const flame = normalizeText(log.flame, "").toLowerCase();

  if (
    message.includes("flame") ||
    rawSeverity.includes("flame") ||
    flame === "detected"
  ) {
    return "FLAME";
  }

  if (message.includes("escalated") || rawSeverity.includes("escalated")) {
    return "ESCALATED";
  }

  if (rawSeverity.includes("warn") || message.includes("warning")) {
    return "WARNING";
  }

  if (
    rawSeverity.includes("info") ||
    rawSeverity.includes("normal") ||
    message.includes("info")
  ) {
    return "INFO";
  }

  if (
    rawSeverity.includes("alert") ||
    rawSeverity.includes("danger") ||
    rawSeverity.includes("critical") ||
    message.includes("alert") ||
    message.includes("high ")
  ) {
    return "ALERT";
  }

  return "INFO";
}

function normalizeLog(log) {
  const temperature = parseMeasurement(log.temperature);
  const humidity = parsePercent(log.humidity);
  const smoke = parseMeasurement(log.smoke ?? log.Gas_and_Smoke);
  const carbonMonoxide = parseMeasurement(
    log.carbonMonoxide ?? log.carbon_monoxide,
  );
  const severity = deriveSeverity(log);

  return {
    date: normalizeTimestamp(log.date ?? log.timestamp),
    room: normalizeRoom(log.room ?? log.node),
    severity,
    alarmDetails: normalizeText(log.alert ?? log.message),
    flame: normalizeText(log.flame),
    temperature: roundNumber(temperature, 1),
    humidity,
    smoke: roundNumber(smoke, 2),
    carbonMonoxide: roundNumber(carbonMonoxide, 2),
    entryType: normalizeText(log.entryType),
    recordedBy: normalizeText(log.reportedBy ?? log.reported_by),
    notes: normalizeText(log.notes ?? log.report_notes),
  };
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineString(value) {
  const text = String(value);
  const preserveSpace = /^\s|\s$/.test(text) ? ' xml:space="preserve"' : "";
  return `<is><t${preserveSpace}>${escapeXml(text)}</t></is>`;
}

function cell(ref, value, styleId) {
  const style = styleId === undefined ? "" : ` s="${styleId}"`;

  if (value === null || value === undefined || value === "") {
    return `<c r="${ref}"${style}/>`;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return `<c r="${ref}"${style}><v>${value}</v></c>`;
  }

  return `<c r="${ref}"${style} t="inlineStr">${inlineString(value)}</c>`;
}

function row(rowNumber, cells, height) {
  const heightAttrs =
    height === undefined ? "" : ` ht="${height}" customHeight="1"`;
  return `<row r="${rowNumber}"${heightAttrs}>${cells.join("")}</row>`;
}

function buildColsXml(columns) {
  return `<cols>${columns
    .map(
      (column) =>
        `<col min="${column.min}" max="${column.max}" width="${column.width}" customWidth="1"/>`,
    )
    .join("")}</cols>`;
}

function buildLogsSheetXml(logs) {
  const lastRow = Math.max(logs.length + 1, 1);
  const headerCells = LOG_HEADERS.map((header, index) =>
    cell(`${CELL_REFS[index]}1`, header, 1),
  );

  const dataRows = logs.map((log, index) => {
    const rowNumber = index + 2;
    const isTinted = index % 2 === 0;
    const textStyle = isTinted ? 3 : 10;
    const dateStyle = isTinted ? 2 : 9;
    const detailStyle = isTinted ? 5 : 12;
    const tempStyle = isTinted ? 6 : 13;
    const percentStyle = isTinted ? 7 : 14;
    const metricStyle = isTinted ? 8 : 15;

    return row(
      rowNumber,
      [
        cell(`A${rowNumber}`, log.date, dateStyle),
        cell(`B${rowNumber}`, log.room, textStyle),
        cell(
          `C${rowNumber}`,
          log.severity,
          LOG_SEVERITY_STYLES[log.severity] || LOG_SEVERITY_STYLES.INFO,
        ),
        cell(`D${rowNumber}`, log.alarmDetails, detailStyle),
        cell(`E${rowNumber}`, log.flame, textStyle),
        cell(`F${rowNumber}`, log.temperature, tempStyle),
        cell(`G${rowNumber}`, log.humidity, percentStyle),
        cell(`H${rowNumber}`, log.smoke, metricStyle),
        cell(`I${rowNumber}`, log.carbonMonoxide, metricStyle),
        cell(`J${rowNumber}`, log.entryType, textStyle),
        cell(`K${rowNumber}`, log.recordedBy, textStyle),
        cell(`L${rowNumber}`, log.notes, textStyle),
      ],
      "19.95",
    );
  });

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">
  <dimension ref="A1:L${lastRow}"/>
  <sheetViews><sheetView tabSelected="1" workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="14.4" x14ac:dyDescent="0.3"/>
  ${buildColsXml(LOG_COLUMN_WIDTHS)}
  <sheetData>${row(1, headerCells, "30")}${dataRows.join("")}</sheetData>
  <autoFilter ref="A1:L${lastRow}"/>
  <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>
</worksheet>`;
}

function buildSummary(logs) {
  const severityRows = SEVERITY_ORDER.map((severity) => {
    const matchingLogs = logs.filter((log) => log.severity === severity);
    const temperatures = matchingLogs
      .map((log) => log.temperature)
      .filter((value) => Number.isFinite(value));

    return {
      severity,
      count: matchingLogs.length,
      share: logs.length ? matchingLogs.length / logs.length : 0,
      worstTemperature: temperatures.length
        ? Math.max(...temperatures.map((value) => roundNumber(value, 1)))
        : null,
    };
  });

  const roomMap = new Map();
  logs.forEach((log) => {
    const current = roomMap.get(log.room) || {
      room: log.room,
      total: 0,
      carbonMonoxide: [],
      smoke: [],
    };

    current.total += 1;
    if (Number.isFinite(log.carbonMonoxide)) {
      current.carbonMonoxide.push(log.carbonMonoxide);
    }
    if (Number.isFinite(log.smoke)) current.smoke.push(log.smoke);
    roomMap.set(log.room, current);
  });

  const roomRows = Array.from(roomMap.values())
    .sort((a, b) => a.room.localeCompare(b.room, undefined, { numeric: true }))
    .map((room) => ({
      room: room.room,
      total: room.total,
      avgCarbonMonoxide: roundNumber(average(room.carbonMonoxide), 2),
      avgSmoke: roundNumber(average(room.smoke), 2),
    }));

  return { severityRows, roomRows };
}

function buildSummarySheetXml(logs) {
  const { severityRows, roomRows } = buildSummary(logs);
  const lastRow = Math.max(10 + roomRows.length, 10);
  const severityHeaderRow = row(3, [
    cell("A3", "Severity", 19),
    cell("B3", "Count", 19),
    cell("C3", "Share", 19),
    cell("D3", "Worst Temp (\u00B0C)", 19),
  ]);

  const severityXml = severityRows
    .map((summary, index) => {
      const rowNumber = index + 4;
      return row(rowNumber, [
        cell(
          `A${rowNumber}`,
          summary.severity,
          SUMMARY_SEVERITY_STYLES[summary.severity],
        ),
        cell(`B${rowNumber}`, summary.count, 21),
        cell(`C${rowNumber}`, summary.share, 22),
        cell(`D${rowNumber}`, summary.worstTemperature, 23),
      ]);
    })
    .join("");

  const roomHeaderRow = row(10, [
    cell("A10", "Room", 19),
    cell("B10", "Total Logs", 19),
    cell("C10", "Avg CO (ppm)", 19),
    cell("D10", "Avg Smoke (ppm)", 19),
  ]);

  const roomsXml = roomRows
    .map((summary, index) => {
      const rowNumber = index + 11;
      const textStyle = index % 2 === 0 ? 28 : 21;
      const numberStyle = index % 2 === 0 ? 29 : 30;

      return row(rowNumber, [
        cell(`A${rowNumber}`, summary.room, textStyle),
        cell(`B${rowNumber}`, summary.total, textStyle),
        cell(`C${rowNumber}`, summary.avgCarbonMonoxide, numberStyle),
        cell(`D${rowNumber}`, summary.avgSmoke, numberStyle),
      ]);
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">
  <dimension ref="A1:D${lastRow}"/>
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="14.4" x14ac:dyDescent="0.3"/>
  <cols><col min="1" max="4" width="20" customWidth="1"/></cols>
  <sheetData>${row(1, [
    cell("A1", "\uD83D\uDD25 Sensor Log \u2014 Summary Dashboard", 31),
    cell("B1", "", 32),
    cell("C1", "", 32),
    cell("D1", "", 32),
  ], "36")}${severityHeaderRow}${severityXml}${roomHeaderRow}${roomsXml}</sheetData>
  <mergeCells count="1"><mergeCell ref="A1:D1"/></mergeCells>
  <pageMargins left="0.75" right="0.75" top="1" bottom="1" header="0.5" footer="0.5"/>
</worksheet>`;
}

function buildStylesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">
  <numFmts count="3"><numFmt numFmtId="164" formatCode="yyyy\\-mm\\-dd\\ hh:mm:ss"/><numFmt numFmtId="165" formatCode="0.0"/><numFmt numFmtId="166" formatCode="0.0%"/></numFmts>
  <fonts count="6" x14ac:knownFonts="1"><font><sz val="11"/><color rgb="FF000000"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Arial"/></font><font><sz val="9"/><name val="Arial"/></font><font><b/><sz val="9"/><color rgb="FFFFFFFF"/><name val="Arial"/></font><font><b/><sz val="14"/><color rgb="FFFFFFFF"/><name val="Arial"/></font><font><sz val="10"/><color rgb="FF000000"/><name val="Arial"/></font></fonts>
  <fills count="11"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1F3864"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF2F7FF"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFF0000"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFFFFF"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFF4500"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFF8C00"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFC00000"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF2E75B6"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF2E4057"/></patternFill></fill></fills>
  <borders count="3"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFBFBFBF"/></left><right style="thin"><color rgb="FFBFBFBF"/></right><top style="thin"><color rgb="FFBFBFBF"/></top><bottom style="medium"><color rgb="FF1F3864"/></bottom><diagonal/></border><border><left style="thin"><color rgb="FFBFBFBF"/></left><right style="thin"><color rgb="FFBFBFBF"/></right><top style="thin"><color rgb="FFBFBFBF"/></top><bottom style="thin"><color rgb="FFBFBFBF"/></bottom><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="33"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf><xf numFmtId="164" fontId="2" fillId="3" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="3" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="3" fillId="4" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="3" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="165" fontId="2" fillId="3" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="166" fontId="2" fillId="3" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="2" fontId="2" fillId="3" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="164" fontId="2" fillId="5" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="5" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="3" fillId="6" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="2" fillId="5" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf><xf numFmtId="165" fontId="2" fillId="5" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="166" fontId="2" fillId="5" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="2" fontId="2" fillId="5" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf><xf numFmtId="0" fontId="3" fillId="7" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="3" fillId="8" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="3" fillId="9" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="1" fillId="10" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="1" fillId="6" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="5" fillId="3" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="166" fontId="5" fillId="3" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="165" fontId="5" fillId="3" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="1" fillId="8" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="1" fillId="4" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="1" fillId="7" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="1" fillId="9" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="5" fillId="5" borderId="2" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="2" fontId="5" fillId="5" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="2" fontId="5" fillId="3" borderId="2" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="4" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
  <dxfs count="0"/>
  <tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleLight16"/>
</styleSheet>`;
}

function buildWorkbookXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <workbookPr defaultThemeVersion="166925"/>
  <bookViews><workbookView xWindow="0" yWindow="0" windowWidth="28800" windowHeight="17640"/></bookViews>
  <sheets><sheet name="Logs" sheetId="1" r:id="rId1"/><sheet name="Summary" sheetId="2" r:id="rId2"/></sheets>
  <calcPr calcId="191029"/>
</workbook>`;
}

function buildWorkbookRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function buildRootRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
}

function buildContentTypesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

function buildCorePropsXml(createdAt) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>Fireguard</dc:creator>
  <cp:lastModifiedBy>Fireguard</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${createdAt}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${createdAt}</dcterms:modified>
</cp:coreProperties>`;
}

function buildAppPropsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Fireguard</Application>
  <DocSecurity>0</DocSecurity>
  <ScaleCrop>false</ScaleCrop>
  <HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>2</vt:i4></vt:variant></vt:vector></HeadingPairs>
  <TitlesOfParts><vt:vector size="2" baseType="lpstr"><vt:lpstr>Logs</vt:lpstr><vt:lpstr>Summary</vt:lpstr></vt:vector></TitlesOfParts>
  <Company>Fireguard</Company>
  <LinksUpToDate>false</LinksUpToDate>
  <SharedDoc>false</SharedDoc>
  <HyperlinksChanged>false</HyperlinksChanged>
  <AppVersion>16.0300</AppVersion>
</Properties>`;
}

function buildWorkbookFiles(logs) {
  const normalizedLogs = logs.map(normalizeLog);
  const createdAt = new Date().toISOString();

  return [
    ["[Content_Types].xml", buildContentTypesXml()],
    ["_rels/.rels", buildRootRelsXml()],
    ["xl/workbook.xml", buildWorkbookXml()],
    ["xl/_rels/workbook.xml.rels", buildWorkbookRelsXml()],
    ["xl/worksheets/sheet1.xml", buildLogsSheetXml(normalizedLogs)],
    ["xl/worksheets/sheet2.xml", buildSummarySheetXml(normalizedLogs)],
    ["xl/styles.xml", buildStylesXml()],
    ["docProps/core.xml", buildCorePropsXml(createdAt)],
    ["docProps/app.xml", buildAppPropsXml()],
  ];
}

function createCrcTable() {
  const table = new Uint32Array(256);

  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }

  return table;
}

const CRC_TABLE = createCrcTable();

function crc32(bytes) {
  let crc = 0xffffffff;

  for (let index = 0; index < bytes.length; index += 1) {
    crc = CRC_TABLE[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function uint16(value) {
  return [value & 0xff, (value >>> 8) & 0xff];
}

function uint32(value) {
  return [
    value & 0xff,
    (value >>> 8) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 24) & 0xff,
  ];
}

function concatBytes(chunks) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const output = new Uint8Array(totalLength);
  let offset = 0;

  chunks.forEach((chunk) => {
    output.set(chunk, offset);
    offset += chunk.length;
  });

  return output;
}

function createZip(files) {
  const encoder = new TextEncoder();
  const localChunks = [];
  const centralChunks = [];
  let offset = 0;

  files.forEach(([name, content]) => {
    const nameBytes = encoder.encode(name);
    const contentBytes = encoder.encode(content);
    const crc = crc32(contentBytes);
    const size = contentBytes.length;

    const localHeader = new Uint8Array([
      ...uint32(0x04034b50),
      ...uint16(20),
      ...uint16(ZIP_UTF8_FLAG),
      ...uint16(ZIP_STORE_METHOD),
      ...uint16(0),
      ...uint16(0),
      ...uint32(crc),
      ...uint32(size),
      ...uint32(size),
      ...uint16(nameBytes.length),
      ...uint16(0),
    ]);

    localChunks.push(localHeader, nameBytes, contentBytes);

    const centralHeader = new Uint8Array([
      ...uint32(0x02014b50),
      ...uint16(20),
      ...uint16(20),
      ...uint16(ZIP_UTF8_FLAG),
      ...uint16(ZIP_STORE_METHOD),
      ...uint16(0),
      ...uint16(0),
      ...uint32(crc),
      ...uint32(size),
      ...uint32(size),
      ...uint16(nameBytes.length),
      ...uint16(0),
      ...uint16(0),
      ...uint16(0),
      ...uint16(0),
      ...uint32(0),
      ...uint32(offset),
    ]);

    centralChunks.push(centralHeader, nameBytes);
    offset += localHeader.length + nameBytes.length + contentBytes.length;
  });

  const centralDirectory = concatBytes(centralChunks);
  const localFiles = concatBytes(localChunks);
  const endOfCentralDirectory = new Uint8Array([
    ...uint32(0x06054b50),
    ...uint16(0),
    ...uint16(0),
    ...uint16(files.length),
    ...uint16(files.length),
    ...uint32(centralDirectory.length),
    ...uint32(localFiles.length),
    ...uint16(0),
  ]);

  return concatBytes([localFiles, centralDirectory, endOfCentralDirectory]);
}

export function downloadLogsWorkbook(logs, fileName = "Logs.xlsx") {
  const workbookBytes = createZip(buildWorkbookFiles(logs));
  const blob = new Blob([workbookBytes], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
