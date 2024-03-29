#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define ssid "10 Điểm"
#define password "111.222.333"

#define trigPin D3
#define echoPin D2

WiFiClient client;
HTTPClient http;

void setup() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.begin(115200);
  
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void sendPutRequest(int floor, int trashStatus) {
  HTTPClient http;
  WiFiClient client; // Thêm đối tượng WiFiClient
  
  // Tạo URL
  String url = "http://13.212.74.138:3000/api/buildings/"+String(floor);

  Serial.print(url);
  // Gửi PUT request
  http.begin(client, url); // Sử dụng phương thức begin(WiFiClient, url)
  http.addHeader("Content-Type", "application/json");
  
  // Dữ liệu cần gửi
  String jsonData = "{\"floor\":" + String(floor) + ",\"trashStatus\":" + String(trashStatus) + "}";
  
  int httpResponseCode = http.PUT(jsonData); // Sử dụng phương thức PUT với dữ liệu JSON
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    // Đọc phản hồi từ server
    String response = http.getString();
    Serial.println(response);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}


void loop(){
  Serial.println(WiFi.localIP());
  long duration, distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;
  Serial.println(WiFi.localIP());

  if (distance >= 1 && distance <= 5) {
    Serial.print("Send put level 3: ");
    Serial.println(distance);
    sendPutRequest(4, 3);
  } else if (distance > 5 && distance <= 15) {
    Serial.print("Send put level 2: ");
    Serial.println(distance);
    sendPutRequest(4, 2);
  } else if (distance >= 16) {
    Serial.print("Send put level 1: ");
    Serial.println(distance);
    sendPutRequest(4, 1);
  } else {
    Serial.println(distance);
  }
  delay(10000);
}
