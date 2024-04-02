#include <Servo.h>

#define trigPin 3
#define echoPin 2
#define CLOSE_TRASH 0 // Góc đóng của servo
#define OPEN_TRASH 110 // Góc mở của servo

Servo myservo;
unsigned char autoTrigger = 0;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  myservo.attach(4);
  myservo.write(CLOSE_TRASH); // Khởi động với servo ở góc đóng
}

void loop() {
  long duration, distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration / 58.0; // Chia cho 58 để tính đơn vị là cm

  if (distance > 0 && distance <= 15) { 
    if (!autoTrigger) {
      autoTrigger = 1;
      Serial.println(distance);
      Serial.println("OPEN"); // In ra "OPEN" khi mở
      myservo.write(OPEN_TRASH);
      delay(2000); // Thời gian mở
    }
  } 
  else {
    if (autoTrigger) {
      autoTrigger = 0;
      Serial.println(distance);
      Serial.println("CLOSE"); // In ra "CLOSE" khi đóng
      myservo.write(CLOSE_TRASH);
    }
  }
  delay(1000); // Thời gian giữa các lần đo
}
