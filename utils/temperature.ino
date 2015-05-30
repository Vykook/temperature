#include "DHT.h"

#define DHTPIN A1


#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.println("init");
}

void loop() {
  delay(10000);
  float h = dht.readHumidity();
  // Read temperature as Celsius
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)){
    Serial.println("error");
    return;
  }
 
  Serial.print(h);
  Serial.print("|");
  Serial.println(t);
}
