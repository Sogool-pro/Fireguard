#include <SPI.h>
#include <LoRa.h>
#include <DHT.h>

// Pin Definitions
#define DHTPIN 4
#define DHTTYPE DHT11
#define MQ2_PIN 34
#define MQ7_PIN 35
#define FLAME_PIN 13

// LoRa Pins
#define LORA_SCK 18
#define LORA_MISO 19
#define LORA_MOSI 23
#define LORA_SS 5
#define LORA_RST 14
#define LORA_DIO0 2

// Node configuration
const char* NODE_ID = "NODE02";
const unsigned long SEND_INTERVAL = 5000;

DHT dht(DHTPIN, DHTTYPE);
unsigned long lastSendTime = 0;

void setup() {
  Serial.begin(115200);
  while (!Serial);
  
  dht.begin();
  pinMode(FLAME_PIN, INPUT_PULLUP);

  // LoRa setup
  SPI.begin(LORA_SCK, LORA_MISO, LORA_MOSI, LORA_SS);
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  
  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed.");
    while (1);
  }
  
  // Optimized LoRa settings
  LoRa.setSignalBandwidth(62.5E3);
  LoRa.setSpreadingFactor(12);
  LoRa.setCodingRate4(8);
  LoRa.setPreambleLength(12);
  LoRa.setSyncWord(0x12);
  LoRa.enableCrc();
  LoRa.setTxPower(20, PA_OUTPUT_PA_BOOST_PIN);
  
  Serial.println("Node 2 initialized");
}

void loop() {
  unsigned long currentTime = millis();
  
  if (currentTime - lastSendTime >= SEND_INTERVAL) {
    // Read sensors
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    int mq2 = analogRead(MQ2_PIN);
    int mq7 = analogRead(MQ7_PIN);
    int flame = !digitalRead(FLAME_PIN);

    // Validate readings
    if (isnan(temperature) || isnan(humidity)) {
      Serial.println("DHT read error!");
      temperature = -1;
      humidity = -1;
    }

    // Prepare and send data
    String data = String(NODE_ID) + "," + 
                 String(temperature, 1) + "," + 
                 String(humidity, 1) + "," +
                 String(mq2) + "," + 
                 String(mq7) + "," + 
                 String(flame);

    // Non-blocking LoRa transmission
    if (LoRa.beginPacket()) {
      LoRa.print(data);
      LoRa.endPacket(true); // Async mode
      Serial.println("Sent: " + data);
    } else {
      Serial.println("LoRa send failed");
    }
    
    lastSendTime = currentTime;
  }
  
  // Handle other tasks if needed
}