#  Connect Android
## Overview
If you wish to connect your Android dApp to the Pocket Network without using the Pocket Plugin, see our tutorial below. For more information on RPC calls, see the [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) list for other calls you can use to interact on the Ethereum network.
## Prerequisites
*   Okhttp3
*   Jitpack
## Setup
In your project gradle file insert jitpack
```
allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://www.jitpack.io' }

    }
}
```
In your project gradle file, insert Okhttp3 in the dependencies section:
```
dependencies {
   ...
   ** implementation 'com.squareup.okhttp3:okhttp:3.12.1'
   ...
}
```
(courtesy check) make sure your internet permission is turned on in your AndroidManafest.xml file 
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="<your_package_name>">
    
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <application
           ... 
    </application>
```
## Create HTTP object
```
OkHttpClient httpClient = new OkHttpClient();
```
## Create JSON header 
```Java
 public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");
```
Now we can create our Read and Write methods

## Sending Transactions or Smart Contact Data [POST]
 To send a transaction, we will need to send the data VIA JSON.
```Java
 String sendTxdata(JSONObject json) throws IOException {

         RequestBody body = RequestBody.create(JSON, String.valueOf(json));
         Request request = new Request.Builder()
                 .url("https://ethereum.pokt.network/transactions")
                 .post(body)
                 .build();
         try (Response response = httpClient.newCall(request).execute()) {
             return response.body().string();
         }
     }
```
## Query a Transaction or Smart Contract Data [POST]
```Java
 String queryTxdata(JSONObject json) throws IOException {

        RequestBody body = RequestBody.create(JSON, String.valueOf(json));
        Request request = new Request.Builder()
                .url("https://ethereum.pokt.network/queries")
                .post(body)
                .build();
        try (Response response = httpClient.newCall(request).execute()) {
            return response.body().string();
        }
    }
```
