package com.example...;


import org.json.JSONObject;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class httpConnection {

    String poktURL = "https://ethereum.pokt.network/health";

     OkHttpClient httpClient = new OkHttpClient();

     // get node health data

     String getHttpResponse() throws IOException {

        Request request = new Request.Builder()
                .url(poktURL)
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            //System.out.print(response.body());
            assert response.body() != null;
            return response.body().string();

        }

     }

    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

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

    String querySC(JSONObject json) throws  IOException {
        RequestBody body = RequestBody.create(JSON, String.valueOf(json));
        Request request = new Request.Builder()
                .url("https://ethereum.pokt.network/queries")
                .post(body)
                .build();
        try (Response response = httpClient.newCall(request).execute()) {
            return response.body().string();
        }
    }

}
