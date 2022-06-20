package com.ionicframework.conferenceapp;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Collections;
import java.util.List;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    String s = getMacAddress();

  }

  public String getMacAddress(){
    try{
      List<NetworkInterface> networkInterfaceList = Collections.list(NetworkInterface.getNetworkInterfaces());

      String stringMac = "";

      for(NetworkInterface networkInterface : networkInterfaceList)
      {
        if(networkInterface.getName().equalsIgnoreCase("wlon0"));
        {
          for(int i = 0 ;i <networkInterface.getHardwareAddress().length; i++){
            String stringMacByte = Integer.toHexString(networkInterface.getHardwareAddress()[i]& 0xFF);

            if(stringMacByte.length() == 1)
            {
              stringMacByte = "0" +stringMacByte;
            }

            stringMac = stringMac + stringMacByte.toUpperCase() + ":";
          }
          break;
        }

      }
      return stringMac;
    }catch (SocketException e)
    {
//               e.printStackTrace();
      System.out.println(e);
    }

    return  "0";
  }
}
