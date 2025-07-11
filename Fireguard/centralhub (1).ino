#include <SPI.h>
#include <LoRa.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <TimeLib.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// ===================== CONFIGURATION =====================
// WiFi
#define WIFI_SSID "reaper"
#define WIFI_PASSWORD "R0512200112r"

// Firebase
#define API_KEY "AIzaSyDBJ5gpJCs-N5-QT0_OfPZrPTRCu4Dv6eg"
#define DATABASE_URL "https://fireguardiot-default-rtdb.asia-southeast1.firebasedatabase.app/"

// LoRa Pins
#define LORA_SCK 18
#define LORA_MISO 19
#define LORA_MOSI 23
#define LORA_SS 5
#define LORA_RST 14
#define LORA_DIO0 2

// LCD Configuration
#define LCD_ADDRESS 0x27  // I2C address of the LCD (usually 0x27 or 0x3F)
#define LCD_COLS 20       // Number of columns in the LCD
#define LCD_ROWS 4        // Number of rows in the LCD

// Button Pins
#define DISPLAY_TOGGLE_BUTTON_PIN 15  // New button to toggle display modes
#define NODE1_BUTTON_PIN 26
#define NODE2_BUTTON_PIN 32

// Thresholds (based on safety standards)
#define TEMP_NORMAL_MAX 35.0
#define TEMP_WARNING_MAX 50.0
#define HUMIDITY_NORMAL_MAX 80.0
#define HUMIDITY_WARNING_MAX 100.0
#define MQ2_GAS_NORMAL_MAX 500
#define MQ2_GAS_WARNING_MAX 800
#define MQ7_CO_NORMAL_MAX 500
#define MQ7_CO_WARNING_MAX 800
#define FLAME_THRESHOLD 1

// Hardware Pins
#define BUZZER_PIN 25
#define NODE1_LED_PIN 27
#define NODE2_LED_PIN 33

// SIM800L
#define SIM800L_RX 16
#define SIM800L_TX 17

// Timing
#define WARNING_DELAY 5000       // 5 seconds for warning state
#define ALERT_DELAY 15000        // 15 seconds for alert state
#define SMS_COOLDOWN 60000       // 1 minute between SMS alerts
#define FIREBASE_COOLDOWN 30000  // 30 seconds between Firebase updates for same alert
#define TIME_SYNC_INTERVAL 3600000 // 1 hour
#define LCD_UPDATE_INTERVAL 5000 // Update LCD every second
#define BUTTON_DEBOUNCE_DELAY 200 // Button debounce delay

// Display modes
enum DisplayMode {
  NODE1_DETAILS,
  NODE2_DETAILS,
  SYSTEM_STATUS,
  ALERT_STATUS
};

// NTP Settings
const char* ntpServers[] = {
  "pool.ntp.org",
  "time.nist.gov",
  "ph.pool.ntp.org"
};
const long gmtOffset_sec = 28800; // GMT+8 (Philippines)
const int daylightOffset_sec = 0;

// Alert Levels
enum AlertLevel {
  NORMAL,
  WARNING,
  ALERT
};

// ===================== GLOBAL VARIABLES =====================
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
HardwareSerial sim800l(1);
LiquidCrystal_I2C lcd(LCD_ADDRESS, LCD_COLS, LCD_ROWS);

const String PHONE_NUMBERS[] = {"+639107980993", "+639854747065"};
const int NUM_PHONE_NUMBERS = sizeof(PHONE_NUMBERS) / sizeof(PHONE_NUMBERS[0]);

bool signupOK = false;
bool timeSynced = false;
DisplayMode currentDisplayMode = NODE1_DETAILS;
unsigned long lastLcdUpdate = 0;
unsigned long lastButtonPress = 0;

struct NodeData {
  String nodeID;
  float temperature = 0;
  float humidity = 0;
  int mq2Value = 0;    // Smoke/Combustible gas
  int mq7Value = 0;    // CO
  int flameValue = 0;
  unsigned long lastUpdate = 0;
  AlertLevel alertLevel = NORMAL;
  String alertMessage = "Normal";
  String lastAlertMessage = "";
};

struct NodeAlert {
  bool buzzerSilenced = false;
  unsigned long warningStartTime = 0;
  unsigned long alertStartTime = 0;
  bool warningActive = false;
  bool alertActive = false;
  unsigned long lastSMSTime = 0;
  unsigned long lastFirebaseTime = 0;
  bool smsSent = false;
  
  // Anti-spam tracking for each sensor type
  unsigned long tempAlertStartTime = 0;
  unsigned long smokeAlertStartTime = 0;
  unsigned long coAlertStartTime = 0;
  unsigned long flameAlertStartTime = 0;
  bool tempAlertPending = false;
  bool smokeAlertPending = false;
  bool coAlertPending = false;
  bool flameAlertPending = false;
};

NodeData node1Data = {"NODE1"};
NodeData node2Data = {"NODE2"};
NodeAlert node1Alert, node2Alert;

// ===================== FUNCTION DECLARATIONS =====================
void syncNTPTime(bool forceSync = false);
String getFormattedDateTime();
String getFormattedTime();
void sendATCommand(String cmd, String expected, unsigned long timeout);
void sendSMS(String number, String message);
void checkButtons();
void handleAlerts();
void parseReceivedData(String data);
void evaluateAlertLevel(NodeData* nodeData, NodeAlert* nodeAlert);
void sendAlertToFirebase(NodeData* nodeData, NodeAlert* nodeAlert);
void sendSMSAlert(NodeData* nodeData, NodeAlert* nodeAlert);
void sendToFirebase(NodeData* nodeData, NodeAlert* nodeAlert);
String getAlertLevelString(AlertLevel level);
bool shouldSendAlert(NodeData* nodeData, NodeAlert* nodeAlert);
void updateLCD();
void displayWelcomeScreen();
void displayNodeDetails(NodeData* nodeData);
void displaySystemStatus();
void displayAlertStatus();
void changeDisplayMode();

// ===================== SETUP =====================
void setup() {
  Serial.begin(115200);
  while (!Serial);

  // Initialize LCD
  Wire.begin();
  lcd.begin(LCD_COLS, LCD_ROWS);
  lcd.backlight();
  displayWelcomeScreen();

  // Initialize hardware
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(NODE1_LED_PIN, OUTPUT);
  pinMode(NODE2_LED_PIN, OUTPUT);
  pinMode(DISPLAY_TOGGLE_BUTTON_PIN, INPUT_PULLUP);
  pinMode(NODE1_BUTTON_PIN, INPUT_PULLUP);
  pinMode(NODE2_BUTTON_PIN, INPUT_PULLUP);
  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(NODE1_LED_PIN, LOW);
  digitalWrite(NODE2_LED_PIN, LOW);

  // Initialize SIM800L
  sim800l.begin(9600, SERIAL_8N1, SIM800L_RX, SIM800L_TX);
  delay(1000);
  sendATCommand("AT", "OK", 2000);
  sendATCommand("AT+CMGF=1", "OK", 2000);
  sendATCommand("AT+CNMI=1,2,0,0,0", "OK", 2000);

  // Connect to WiFi
  lcd.setCursor(0, 1);
  lcd.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    lcd.print(".");
    delay(300);
  }
  Serial.println("\nConnected! IP: " + WiFi.localIP().toString());
  lcd.setCursor(0, 2);
  lcd.print("IP: ");
  lcd.print(WiFi.localIP().toString());

  // Initialize Firebase
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  lcd.setCursor(0, 3);
  lcd.print("Initializing Firebase");
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase: OK");
    lcd.setCursor(0, 3);
    lcd.print("Firebase: OK        ");
    signupOK = true;
  } else {
    Serial.println("Firebase: Failed - " + String(config.signer.signupError.message.c_str()));
    lcd.setCursor(0, 3);
    lcd.print("Firebase: Failed    ");
  }
  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  // Initialize LoRa
  lcd.setCursor(0, 3);
  lcd.print("Initializing LoRa   ");
  SPI.begin(LORA_SCK, LORA_MISO, LORA_MOSI, LORA_SS);
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    lcd.setCursor(0, 3);
    lcd.print("LoRa init failed!   ");
    while (1);
  }
  LoRa.setSignalBandwidth(62.5E3);
  LoRa.setSpreadingFactor(12);
  LoRa.setCodingRate4(8);
  LoRa.setPreambleLength(12);
  LoRa.setSyncWord(0x12);
  LoRa.enableCrc();
  LoRa.setTxPower(20, PA_OUTPUT_PA_BOOST_PIN);
  Serial.println("LoRa initialized!");
  lcd.setCursor(0, 3);
  lcd.print("LoRa initialized!   ");

  // Initial time sync
  syncNTPTime(true);
  delay(2000); // Show welcome screen for 2 seconds
}

// ===================== TIME FUNCTIONS =====================
void syncNTPTime(bool forceSync) {
  static unsigned long lastSync = 0;
  static uint8_t currentServer = 0;
  
  if (forceSync || millis() - lastSync >= TIME_SYNC_INTERVAL) {
    Serial.print("Syncing time with ");
    Serial.println(ntpServers[currentServer]);
    
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServers[currentServer]);
    
    Serial.print("Waiting for sync");
    time_t now = 0;
    for (int i = 0; i < 10; i++) {
      now = time(nullptr);
      if (now > 86400) break; // Valid if > Jan 2 1970
      delay(1000);
      Serial.print(".");
    }
    
    if (now > 86400) {
      timeSynced = true;
      Serial.println(" Success: " + getFormattedDateTime());
    } else {
      Serial.println(" Failed!");
      currentServer = (currentServer + 1) % (sizeof(ntpServers)/sizeof(ntpServers[0]));
    }
    lastSync = millis();
  }
}

String getFormattedDateTime() {
  time_t now = time(nullptr);
  if (now < 86400) { // If time not set
    syncNTPTime(true);
    now = time(nullptr);
    if (now < 86400) return "1970-01-01 00:00:00"; // Fallback
  }

  struct tm timeinfo;
  localtime_r(&now, &timeinfo);
  
  char buffer[80];
  strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", &timeinfo);
  return String(buffer);
}

String getFormattedTime() {
  time_t now = time(nullptr);
  if (now < 86400) { // If time not set
    syncNTPTime(true);
    now = time(nullptr);
    if (now < 86400) return "00:00:00"; // Fallback
  }

  struct tm timeinfo;
  localtime_r(&now, &timeinfo);
  
  char buffer[20];
  strftime(buffer, sizeof(buffer), "%H:%M:%S", &timeinfo);
  return String(buffer);
}

// ===================== LCD FUNCTIONS =====================
void displayWelcomeScreen() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("   FIREGUARD IOT   ");
  lcd.setCursor(0, 1);
  lcd.print(" Fire Detection &  ");
  lcd.setCursor(0, 2);
  lcd.print(" Monitoring System ");
  lcd.setCursor(0, 3);
  lcd.print("  Initializing...  ");
}

void updateLCD() {
  static unsigned long lastUpdate = 0;
  unsigned long now = millis();
  
  if (now - lastUpdate < LCD_UPDATE_INTERVAL) {
    return;
  }
  lastUpdate = now;
  
  lcd.clear();
  
  // Display time on top row for all modes
  lcd.setCursor(0, 0);
  lcd.print(getFormattedTime());
  
  // Display current mode indicator
  lcd.setCursor(13, 0);
  switch(currentDisplayMode) {
    case NODE1_DETAILS: lcd.print("N1"); break;
    case NODE2_DETAILS: lcd.print("N2"); break;
    case SYSTEM_STATUS: lcd.print("SYS"); break;
    case ALERT_STATUS: lcd.print("ALRT"); break;
  }
  
  // Display WiFi status
  lcd.setCursor(17, 0);
  lcd.print(WiFi.status() == WL_CONNECTED ? "W" : "X");
  
  // Display the appropriate content based on current mode
  switch(currentDisplayMode) {
    case NODE1_DETAILS:
      displayNodeDetails(&node1Data);
      break;
    case NODE2_DETAILS:
      displayNodeDetails(&node2Data);
      break;
    case SYSTEM_STATUS:
      displaySystemStatus();
      break;
    case ALERT_STATUS:
      displayAlertStatus();
      break;
  }
}

void displayNodeDetails(NodeData* nodeData) {
  // Row 1: Node ID and temperature
  lcd.setCursor(0, 1);
  lcd.print(nodeData->nodeID);
  lcd.print(" Temp: ");
  lcd.print(nodeData->temperature, 1);
  lcd.print("C");
  
  // Row 2: Humidity and CO
  lcd.setCursor(0, 2);
  lcd.print("Hum: ");
  lcd.print(nodeData->humidity, 0);
  lcd.print("% CO: ");
  lcd.print(nodeData->mq7Value);
  lcd.print("ppm");
  
  // Row 3: Gas/Smoke and Flame
  lcd.setCursor(0, 3);
  lcd.print("Gas: ");
  lcd.print(nodeData->mq2Value);
  lcd.print(" Flame: ");
  lcd.print(nodeData->flameValue ? "YES" : "NO");
}

void displaySystemStatus() {
  // Row 1: WiFi status
  lcd.setCursor(0, 1);
  lcd.print("WiFi: ");
  lcd.print(WiFi.status() == WL_CONNECTED ? "Connected" : "Disconnected");
  
  // Row 2: IP address (truncated if needed)
  lcd.setCursor(0, 2);
  lcd.print("IP: ");
  String ip = WiFi.localIP().toString();
  if (ip.length() > 16) {
    lcd.print(ip.substring(0, 16));
  } else {
    lcd.print(ip);
  }
  
  // Row 3: Firebase and LoRa status
  lcd.setCursor(0, 3);
  lcd.print("Firebase: ");
  lcd.print(signupOK ? "OK" : "ERR");
  lcd.print(" LoRa: OK");
}

void displayAlertStatus() {
  // Row 1: Node 1 alert status
  lcd.setCursor(0, 1);
  lcd.print("N1: ");
  lcd.print(getAlertLevelString(node1Data.alertLevel));
  lcd.print(" ");
  lcd.print(node1Alert.buzzerSilenced ? "(S)" : "   ");
  
  // Row 2: Node 2 alert status
  lcd.setCursor(0, 2);
  lcd.print("N2: ");
  lcd.print(getAlertLevelString(node2Data.alertLevel));
  lcd.print(" ");
  lcd.print(node2Alert.buzzerSilenced ? "(S)" : "   ");
  
  // Row 3: Current alert message (truncate if too long)
  String alertMsg;
  if (node1Data.alertLevel == ALERT) {
    alertMsg = node1Data.alertMessage;
  } else if (node2Data.alertLevel == ALERT) {
    alertMsg = node2Data.alertMessage;
  } else if (node1Data.alertLevel == WARNING) {
    alertMsg = node1Data.alertMessage;
  } else if (node2Data.alertLevel == WARNING) {
    alertMsg = node2Data.alertMessage;
  } else {
    alertMsg = "System Normal";
  }
  
  lcd.setCursor(0, 3);
  if (alertMsg.length() > 20) {
    lcd.print(alertMsg.substring(0, 20));
  } else {
    lcd.print(alertMsg);
  }
}

void changeDisplayMode() {
  unsigned long now = millis();
  if (now - lastButtonPress < BUTTON_DEBOUNCE_DELAY) {
    return;
  }
  lastButtonPress = now;
  
  currentDisplayMode = (DisplayMode)((currentDisplayMode + 1) % 4);
  
  // Force immediate LCD update
  lastLcdUpdate = 0;
  updateLCD();
}

// ===================== BUTTON FUNCTIONS =====================
void checkButtons() {
  static unsigned long lastSilencePress = 0;
  unsigned long now = millis();
  
  // Check display toggle button
  if (digitalRead(DISPLAY_TOGGLE_BUTTON_PIN) == LOW) {
    changeDisplayMode();
  }
  
  // Check Node 1 silence button
  if (digitalRead(NODE1_BUTTON_PIN) == LOW && now - lastSilencePress > BUTTON_DEBOUNCE_DELAY) {
    node1Alert.buzzerSilenced = !node1Alert.buzzerSilenced;
    digitalWrite(NODE1_LED_PIN, node1Alert.buzzerSilenced ? LOW : HIGH);
    lastSilencePress = now;
    Serial.println("Node1 " + String(node1Alert.buzzerSilenced ? "Silenced" : "Active"));
    sendToFirebase(&node1Data, &node1Alert);
  }
  
  // Check Node 2 silence button
  if (digitalRead(NODE2_BUTTON_PIN) == LOW && now - lastSilencePress > BUTTON_DEBOUNCE_DELAY) {
    node2Alert.buzzerSilenced = !node2Alert.buzzerSilenced;
    digitalWrite(NODE2_LED_PIN, node2Alert.buzzerSilenced ? LOW : HIGH);
    lastSilencePress = now;
    Serial.println("Node2 " + String(node2Alert.buzzerSilenced ? "Silenced" : "Active"));
    sendToFirebase(&node2Data, &node2Alert);
  }
}

// ===================== CORE FUNCTIONS =====================
void sendATCommand(String cmd, String expected, unsigned long timeout) {
  Serial.println("AT CMD: " + cmd);
  sim800l.println(cmd);
  
  unsigned long start = millis();
  String response;
  while (millis() - start < timeout) {
    while (sim800l.available()) {
      char c = sim800l.read();
      response += c;
      if (response.indexOf(expected) != -1) return;
    }
  }
  Serial.println("Timeout waiting for: " + expected);
}

void sendSMS(String number, String message) {
  sim800l.print("AT+CMGS=\"");
  sim800l.print(number);
  sim800l.println("\"");
  delay(500);
  sim800l.print(message);
  sim800l.write(26);
  delay(1000);
  Serial.println("SMS sent to " + number);
}

String getAlertLevelString(AlertLevel level) {
  switch(level) {
    case NORMAL: return "Normal";
    case WARNING: return "Warning";
    case ALERT: return "Alert";
    default: return "Unknown";
  }
}

void handleAlerts() {
  unsigned long now = millis();
  
  // Node 1 Alerts
  if (node1Data.alertLevel == WARNING && !node1Alert.buzzerSilenced) {
    // Pulsing for warning
    if (now % 1000 < 500) {
      tone(BUZZER_PIN, 800, 100);
      digitalWrite(NODE1_LED_PIN, HIGH);
    } else {
      digitalWrite(NODE1_LED_PIN, LOW);
    }
  } 
  else if (node1Data.alertLevel == ALERT && !node1Alert.buzzerSilenced) {
    // Fast pulsing for alert
    if (now % 500 < 250) {
      tone(BUZZER_PIN, 1000, 100);
      digitalWrite(NODE1_LED_PIN, HIGH);
    } else {
      digitalWrite(NODE1_LED_PIN, LOW);
    }
  }
  else {
    digitalWrite(NODE1_LED_PIN, LOW);
  }

  // Node 2 Alerts
  if (node2Data.alertLevel == WARNING && !node2Alert.buzzerSilenced) {
    // Pulsing for warning
    if (now % 1000 < 500) {
      tone(BUZZER_PIN, 900, 100);
      digitalWrite(NODE2_LED_PIN, HIGH);
    } else {
      digitalWrite(NODE2_LED_PIN, LOW);
    }
  } 
  else if (node2Data.alertLevel == ALERT && !node2Alert.buzzerSilenced) {
    // Fast pulsing for alert
    if (now % 500 < 250) {
      tone(BUZZER_PIN, 1200, 100);
      digitalWrite(NODE2_LED_PIN, HIGH);
    } else {
      digitalWrite(NODE2_LED_PIN, LOW);
    }
  }
  else {
    digitalWrite(NODE2_LED_PIN, LOW);
  }

  // If no alerts, ensure buzzer is off
  if (node1Data.alertLevel == NORMAL && node2Data.alertLevel == NORMAL) {
    noTone(BUZZER_PIN);
  }
}

void parseReceivedData(String data) {
  int commas[5];
  commas[0] = data.indexOf(',');
  if (commas[0] == -1) return;
  
  for (int i = 1; i < 5; i++) {
    commas[i] = data.indexOf(',', commas[i-1]+1);
    if (commas[i] == -1) return;
  }

  String receivedNodeID = data.substring(0, commas[0]);
  float receivedTemp = data.substring(commas[0]+1, commas[1]).toFloat();
  float receivedHumidity = data.substring(commas[1]+1, commas[2]).toFloat();
  int receivedMQ2 = data.substring(commas[2]+1, commas[3]).toInt();
  int receivedMQ7 = data.substring(commas[3]+1, commas[4]).toInt();
  int receivedFlame = data.substring(commas[4]+1).toInt();

  // Determine which node this data belongs to
  NodeData* nodeData;
  NodeAlert* nodeAlert;
  
  if (receivedNodeID == "NODE1" || receivedNodeID == "NODE01") {
    nodeData = &node1Data;
    nodeAlert = &node1Alert;
  } else if (receivedNodeID == "NODE2" || receivedNodeID == "NODE02") {
    nodeData = &node2Data;
    nodeAlert = &node2Alert;
  } else {
    Serial.println("Unknown node ID: " + receivedNodeID);
    return;
  }

  // Update node data
  nodeData->nodeID = receivedNodeID;
  nodeData->temperature = receivedTemp;
  nodeData->humidity = receivedHumidity;
  nodeData->mq2Value = receivedMQ2;
  nodeData->mq7Value = receivedMQ7;
  nodeData->flameValue = receivedFlame;
  nodeData->lastUpdate = millis();

  // Print sensor data to serial monitor
  Serial.println("\n=== " + nodeData->nodeID + " ===");
  Serial.println("Temperature: " + String(nodeData->temperature) + "°C");
  Serial.println("Humidity: " + String(nodeData->humidity) + "%");
  Serial.println("Gas and Smoke (MQ2): " + String(nodeData->mq2Value) + " ppm");
  Serial.println("CO (MQ7): " + String(nodeData->mq7Value) + " ppm");
  Serial.println("Flame: " + String(nodeData->flameValue ? "DETECTED" : "None"));

  // Evaluate alert level and process
  evaluateAlertLevel(nodeData, nodeAlert);
  sendToFirebase(nodeData, nodeAlert);
}

bool shouldSendAlert(NodeData* nodeData, NodeAlert* nodeAlert) {
  unsigned long now = millis();
  
  // Don't send if we've already sent this exact alert recently
  if (nodeData->alertMessage == nodeData->lastAlertMessage) {
    if (now - nodeAlert->lastFirebaseTime < FIREBASE_COOLDOWN) {
      return false;
    }
  }
  
  // Update tracking variables
  nodeData->lastAlertMessage = nodeData->alertMessage;
  nodeAlert->lastFirebaseTime = now;
  return true;
}

void evaluateAlertLevel(NodeData* nodeData, NodeAlert* nodeAlert) {
  unsigned long now = millis();
  AlertLevel newLevel = NORMAL;
  String alertMsg = "Normal conditions";

  // Check each sensor and determine the highest alert level
  bool flameDetected = (nodeData->flameValue == FLAME_THRESHOLD);
  bool tempWarning = (nodeData->temperature > TEMP_NORMAL_MAX);
  bool tempAlert = (nodeData->temperature > TEMP_WARNING_MAX);
  bool humidityWarning = (nodeData->humidity > HUMIDITY_NORMAL_MAX);
  bool humidityAlert = (nodeData->humidity > HUMIDITY_WARNING_MAX);
  bool gasWarning = (nodeData->mq2Value > MQ2_GAS_NORMAL_MAX);
  bool gasAlert = (nodeData->mq2Value > MQ2_GAS_WARNING_MAX);
  bool coWarning = (nodeData->mq7Value > MQ7_CO_NORMAL_MAX);
  bool coAlert = (nodeData->mq7Value > MQ7_CO_WARNING_MAX);

  // Individual sensor tracking with delays (anti-spam)
  if (tempWarning && !nodeAlert->tempAlertPending) {
    nodeAlert->tempAlertStartTime = now;
    nodeAlert->tempAlertPending = true;
  } else if (tempWarning && now - nodeAlert->tempAlertStartTime >= ALERT_DELAY) {
    tempAlert = true;
  } else if (!tempWarning) {
    nodeAlert->tempAlertPending = false;
  }

  if (gasWarning && !nodeAlert->smokeAlertPending) {
    nodeAlert->smokeAlertStartTime = now;
    nodeAlert->smokeAlertPending = true;
  } else if (gasWarning && now - nodeAlert->smokeAlertStartTime >= ALERT_DELAY) {
    gasAlert = true;
  } else if (!gasWarning) {
    nodeAlert->smokeAlertPending = false;
  }

  if (coWarning && !nodeAlert->coAlertPending) {
    nodeAlert->coAlertStartTime = now;
    nodeAlert->coAlertPending = true;
  } else if (coWarning && now - nodeAlert->coAlertStartTime >= ALERT_DELAY) {
    coAlert = true;
  } else if (!coWarning) {
    nodeAlert->coAlertPending = false;
  }

  // Flame detection is always immediate (no delay)
  if (flameDetected) {
    nodeAlert->flameAlertStartTime = now;
  }

  // Build alert message
  if (flameDetected) {
    newLevel = ALERT;
    alertMsg = "FLAME DETECTED!";
  }
  else if (tempAlert || gasAlert || coAlert || humidityAlert) {
    newLevel = ALERT;
    alertMsg = "ALERT: ";
    if (tempAlert) alertMsg += "High temp(" + String(nodeData->temperature) + "°C) ";
    if (gasAlert) alertMsg += "High Gas and Smoke(" + String(nodeData->mq2Value) + "ppm) ";
    if (coAlert) alertMsg += "High CO(" + String(nodeData->mq7Value) + "ppm) ";
    if (humidityAlert) alertMsg += "High humidity(" + String(nodeData->humidity) + "%) ";
  }
  else if (tempWarning || gasWarning || coWarning || humidityWarning) {
    newLevel = WARNING;
    alertMsg = "Warning: ";
    if (tempWarning) alertMsg += "Elevated temp(" + String(nodeData->temperature) + "°C) ";
    if (gasWarning) alertMsg += "Gas and Smoke detected(" + String(nodeData->mq2Value) + "ppm) ";
    if (coWarning) alertMsg += "CO detected(" + String(nodeData->mq7Value) + "ppm) ";
    if (humidityWarning) alertMsg += "High humidity(" + String(nodeData->humidity) + "%) ";
  }

  // Handle state transitions
  if (newLevel != nodeData->alertLevel) {
    Serial.println("Alert level changed from " + getAlertLevelString(nodeData->alertLevel) + 
                  " to " + getAlertLevelString(newLevel));
    
    if (newLevel == WARNING) {
      nodeAlert->warningStartTime = now;
      nodeAlert->warningActive = true;
    }
    else if (newLevel == ALERT) {
      nodeAlert->alertStartTime = now;
      nodeAlert->alertActive = true;
    }
    
    nodeData->alertLevel = newLevel;
    nodeData->alertMessage = alertMsg;
    
    // For ALERT level, send immediate notification
    if (newLevel == ALERT && shouldSendAlert(nodeData, nodeAlert)) {
      sendAlertToFirebase(nodeData, nodeAlert);
      if (!nodeAlert->smsSent || (now - nodeAlert->lastSMSTime > SMS_COOLDOWN)) {
        sendSMSAlert(nodeData, nodeAlert);
        nodeAlert->smsSent = true;
        nodeAlert->lastSMSTime = now;
      }
    }
  }

  // For WARNING level, check if it's been active long enough to escalate
  if (nodeData->alertLevel == WARNING && nodeAlert->warningActive) {
    if (now - nodeAlert->warningStartTime >= WARNING_DELAY) {
      // Check if conditions still warrant warning
      if (tempWarning || gasWarning || coWarning || humidityWarning) {
        // Escalate to ALERT after warning period
        nodeData->alertLevel = ALERT;
        nodeData->alertMessage = "Escalated Alert: " + alertMsg;
        nodeAlert->alertStartTime = now;
        nodeAlert->alertActive = true;
        nodeAlert->warningActive = false;
        
        Serial.println("Warning escalated to Alert after delay");
        if (shouldSendAlert(nodeData, nodeAlert)) {
          sendAlertToFirebase(nodeData, nodeAlert);
          if (!nodeAlert->smsSent || (now - nodeAlert->lastSMSTime > SMS_COOLDOWN)) {
            sendSMSAlert(nodeData, nodeAlert);
            nodeAlert->smsSent = true;
            nodeAlert->lastSMSTime = now;
          }
        }
      }
    }
  }

  // Print current status to serial
  Serial.println("Current Status: " + alertMsg);
  Serial.println("Alert Level: " + getAlertLevelString(nodeData->alertLevel));
}

void sendAlertToFirebase(NodeData* nodeData, NodeAlert* nodeAlert) {
  if (Firebase.ready() && signupOK) {
    FirebaseJson json;
    String path = "alerts/" + String(millis());
    
    json.set("node", nodeData->nodeID);
    json.set("message", nodeData->alertMessage);
    json.set("level", getAlertLevelString(nodeData->alertLevel));
    json.set("temperature", nodeData->temperature);
    json.set("humidity", nodeData->humidity);
    json.set("Gas_and_Smoke", nodeData->mq2Value);
    json.set("carbon_monoxide", nodeData->mq7Value);
    json.set("flame", nodeData->flameValue);
    json.set("timestamp", getFormattedDateTime());
    
    if (Firebase.RTDB.setJSON(&fbdo, path.c_str(), &json)) {
      Serial.println("Firebase alert logged: " + nodeData->alertMessage);
    } else {
      Serial.println("Firebase error: " + fbdo.errorReason());
    }
  }
}

void sendSMSAlert(NodeData* nodeData, NodeAlert* nodeAlert) {
  String msg = "🚨 " + nodeData->alertMessage + " 🚨\nNode: " + nodeData->nodeID +
               "\nTemp: " + String(nodeData->temperature) + "°C" +
               "\nHumidity: " + String(nodeData->humidity) + "%" +
               "\nGas and Smoke: " + String(nodeData->mq2Value) + " ppm" +
               "\nCO: " + String(nodeData->mq7Value) + " ppm" +
               "\nFlame: " + (nodeData->flameValue ? "DETECTED" : "None") +
               "\nTime: " + getFormattedDateTime() +
               "\nAlert Level: " + getAlertLevelString(nodeData->alertLevel);
  
  for (int i = 0; i < NUM_PHONE_NUMBERS; i++) {
    sendSMS(PHONE_NUMBERS[i], msg);
    delay(1000);
  }
}

void sendToFirebase(NodeData* nodeData, NodeAlert* nodeAlert) {
  if (Firebase.ready() && signupOK && shouldSendAlert(nodeData, nodeAlert)) {
    FirebaseJson json;
    String path = "sensor_data/" + nodeData->nodeID;
    
    json.set("temperature", nodeData->temperature);
    json.set("humidity", nodeData->humidity);
    json.set("Gas_and_Smoke", nodeData->mq2Value);
    json.set("carbon_monoxide", nodeData->mq7Value);
    json.set("flame", nodeData->flameValue);
    json.set("timestamp", getFormattedDateTime());
    json.set("alert_level", getAlertLevelString(nodeData->alertLevel));
    json.set("alert_message", nodeData->alertMessage);
    json.set("silenced", nodeAlert->buzzerSilenced);
    
    if (!Firebase.RTDB.setJSON(&fbdo, path.c_str(), &json)) {
      Serial.println("Firebase update failed: " + fbdo.errorReason());
    }
  }
}

// ===================== MAIN LOOP =====================
void loop() {
  syncNTPTime(); // Maintain time sync
  checkButtons();
  
  if (LoRa.parsePacket()) {
    String data;
    while (LoRa.available()) data += (char)LoRa.read();
    parseReceivedData(data);
  }
  
  handleAlerts();
  updateLCD();
  
  while (sim800l.available()) {
    Serial.write(sim800l.read());
  }
  
  delay(10);
}