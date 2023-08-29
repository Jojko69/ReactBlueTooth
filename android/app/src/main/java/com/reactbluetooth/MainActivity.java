package com.reactbluetooth;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import android.os.Bundle;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.IOException;
import java.util.Set;
import java.util.UUID;


public class MainActivity extends ReactActivity {

  ///public final static String MODULE_MAC = "00:22:06:30:7C:8E";
  public final static String MODULE_MAC = "00:22:06:01:70:77";
  public final static int REQUEST_ENABLE_BT = 1;
  private final UUID MY_UUID = UUID.fromString("00001101-0000-1000-8000-00805f9b34fb");

  // MAC  HC-05 00:22:06:01:70:77
  // HC-05 "00001101-0000-1000-8000-00805F9B34FB"

  BluetoothAdapter bta;                 //bluetooth stuff
  BluetoothSocket mmSocket;             //bluetooth stuff
  BluetoothDevice mmDevice;             //bluetooth stuff
  static ConnectedThread btt = null;           //Our custom thread
  public Handler mHandler;              //this receives messages from thread

  public static ConnectedThread getBtt() {
    return btt;
  }

  String response = "";

  private void addMsg(String msg) {
    response = response+msg;
  }

  private ActivityResultLauncher<String> requestPermissionLauncher =
  registerForActivityResult(new ActivityResultContracts.RequestPermission(), isGranted -> {
      if (isGranted) {
          // Permission is granted. Continue the action or workflow in your app.
          addMsg("Granted\n");
      } else {
          // Explain to the user that the feature is unavailable because the
          // feature requires a permission that the user has denied. At the
          // same time, respect the user's decision. Don't link to system
          // settings in an effort to convince the user to change their
          // decision.
          addMsg("Granted\n");
      }
  });



  private void init() {

    BluetoothManager bluetoothManager = getSystemService(BluetoothManager.class);
    bta = bluetoothManager.getAdapter();


    if (bta == null) {
      addMsg("bluetooth adapter not available\n");
  } else {
      if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
          requestPermissionLauncher.launch(Manifest.permission.BLUETOOTH_CONNECT);
      } else {
        addMsg("BLUETOOTH_CONNECT Already Granted\n");
          
      }
      if (ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.BLUETOOTH_CONNECT) == PackageManager.PERMISSION_GRANTED) {

          Set<BluetoothDevice> pairedDevices = bta.getBondedDevices();
          addMsg("paired");
          if (pairedDevices.size() > 0) {
              // There are paired devices. Get the name and address of each paired device.
              for (BluetoothDevice device : pairedDevices) {
                  String deviceName = device.getName();
                  String deviceHardwareAddress = device.getAddress(); // MAC address
                  addMsg(deviceName + "  " + deviceHardwareAddress + "\n");
  
              }
          }
      }
  }

  if (!bta.isEnabled()) {
      Intent enableBTIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
      startActivityForResult(enableBTIntent, REQUEST_ENABLE_BT);
  } else {
      initiateBluetoothProcess();
  }
    
  }

@Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK && requestCode == REQUEST_ENABLE_BT) {
            initiateBluetoothProcess();
        }
    }


    public void initiateBluetoothProcess() {

        if (bta.isEnabled()) {

            //attempt to connect to bluetooth module
            BluetoothSocket tmp = null;
            mmDevice = bta.getRemoteDevice(MODULE_MAC);

            //create socket
            try {
                if (ActivityCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                    // TODO: Consider calling
                    //    ActivityCompat#requestPermissions
                    // here to request the missing permissions, and then overriding
                    //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                    //                                          int[] grantResults)
                    // to handle the case where the user grants the permission. See the documentation
                    // for ActivityCompat#requestPermissions for more details.
                    return;
                }
                tmp = mmDevice.createRfcommSocketToServiceRecord(MY_UUID);
                mmSocket = tmp;
                mmSocket.connect();
                Log.i("[BLUETOOTH]","Connected to: "+mmDevice.getName());
            }catch(IOException e){
                try{mmSocket.close();}catch(IOException c){return;}
            }

            Log.i("[BLUETOOTH]", "Creating handler");
            mHandler = new Handler(Looper.getMainLooper()){
                @Override
                public void handleMessage(Message msg) {
                    //super.handleMessage(msg);
                    if(msg.what == ConnectedThread.RESPONSE_MESSAGE){
                        String txt = (String)msg.obj;
                        addMsg(txt);
                    }
                }
            };

            Log.i("[BLUETOOTH]", "Creating and running Thread");
            btt = new ConnectedThread(mmSocket,mHandler);
            btt.start();
        }
    }





  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactBlueTooth";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled()){

 
          @Override
          protected void onCreate(Bundle savedInstanceState) {
              super.onCreate(savedInstanceState);

              MainActivity.this.init();



        }
      };
  }
}
