package com.reactbluetooth;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class BluetoothMethodHelper extends ReactContextBaseJavaModule {

   BluetoothMethodHelper(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
       Log.d("BluetoothMethodHelper", "Getting module name");
        return "BluetoothMethodHelper";
   }

   @ReactMethod
   public void ledOn() {
      String sendtxt = "press\n";
      MainActivity.getBtt().write(sendtxt.getBytes());
      Log.d("BluetoothMethodHelper", sendtxt);
   }

   @ReactMethod
   public void ledOff() {
      String sendtxt = "release\n";
      MainActivity.getBtt().write(sendtxt.getBytes());
      Log.d("BluetoothMethodHelper", sendtxt);
   }

   @ReactMethod
   public void paOn() {
      String sendtxt = "dupa\n";
      MainActivity.getBtt().write(sendtxt.getBytes());
      Log.d("BluetoothMethodHelper", sendtxt);
   }

   @ReactMethod
   public void duOff() {
      String sendtxt = "padu\n";
      MainActivity.getBtt().write(sendtxt.getBytes());
      Log.d("BluetoothMethodHelper", sendtxt);
   }

   @ReactMethod
   public void verifyPin(String pin, Callback callback) {
      // Wysyłanie PINu do Arduino przez Bluetooth
      Log.d("BluetoothMethodHelper", "verifyPin called with: " + pin);
      sendToArduino(pin);
  
      // Przykład: (tu musisz dodać odpowiedni kod do obsługi odpowiedzi)
listenForArduinoResponse((response) -> {
    // Zakładając, że 'response' to tablica i chcesz jej pierwszy element:
    String responseString = (String) response[0];
    
    Log.d("BluetoothReciver", responseString);
    
    if (responseString.equals("OK")) {  // Używaj 'responseString', a nie 'response' tutaj.
        callback.invoke(true);
    } else {
        callback.invoke(false);
    }
});
   }

   private void sendToArduino(String message) {
      // Tutaj dodaj metodę do wysyłania komunikatów do Arduino
      MainActivity.getBtt().write(message.getBytes());
   }

   private void listenForArduinoResponse(Callback callback) {
      // Tutaj musisz dodać odpowiedni kod, który będzie słuchał odpowiedzi od Arduino
      // i następnie wywołać callback z odpowiedzią. Na razie to tylko szkic.
   }
}
