package com.example...;

import android.content.Context;
import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;


import static org.junit.Assert.*;

/**
 * Instrumented test, which will execute on an Android device.
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
 
@RunWith(AndroidJUnit4.class)
public class ExampleInstrumentedTest {
    @Test
    public void useAppContext() {
        // Context of the app under test.
        Context appContext = InstrumentationRegistry.getTargetContext();

        Assert.assertEquals("com.example.jeremybeal.androidplugin", appContext.getPackageName());
    }

    httpConnection connect = new httpConnection();
  
    @Test
    public void connectionTest() throws IOException {

        String test = connect.getHttpResponse();

        //System.out.println(test);
        Log.d("FROM TEST", "connectionTest: hello"+ test);

    }

    @Test
    public void sendTX() throws IOException, JSONException {

        JSONObject sendToken = new JSONObject();

        sendToken.put("network","ETH");
        sendToken.put("subnetwork","4");
        sendToken.put("serialized_tx","0x0");
        sendToken.put("tx_metadata", null);

        String go = connect.sendTxdata(sendToken);

        System.out.println(go);

        //Log.d("from Test", go);

    }

    @Test
    public void QueryTX() throws IOException, JSONException {

        String TXJson = "{\"network\":\"ETH\",\"subnetwork\":\"4\",\"query\":{\"rpc_method\":\"eth_getBalance\",\"rpc_params\":[\"0x0\",\"latest\"]},\"decoder\":{}}";

        JSONObject jsonString = new JSONObject(TXJson);

        String go = connect.queryTxdata(jsonString);

        Log.d("print", go);

    }


}
