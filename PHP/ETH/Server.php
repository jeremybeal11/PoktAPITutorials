<?php

    $curl = curl_init();
    $curlHealth = curl_init();

    $url = "https://ethereum.pokt.network/queries";

    $url2 = "https://ethereum.pokt.network/health";

    $url3 = "https://ethereum.pokt.network/transactions";

    $dataJson = file_get_contents('txQuery.json');
    // Strip the white spaces from the Json file. 
    $encodeData = json_encode(json_decode($dataJson));


   // Query stuff
   function getTx($dataFile) {

    $curl = curl_init();

    $url = "https://ethereum.pokt.network/queries";  
    curl_setopt ($curl, CURLOPT_URL, $url);

    // Takes the Json file and gets the contents
    $dataJson = file_get_contents("$dataFile.json");

    // Strip the white spaces from the Json file. 
    $encodeData = json_encode(json_decode($dataJson));

    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    curl_setopt($curl,CURLOPT_POSTFIELDS, $encodeData);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, FALSE);

    curl_setopt($curl, CURLOPT_POST, TRUE);

    $resp = curl_exec($curl);

    // catch errors.
    if($resp === FALSE){
        die(curl_error($curl));

    }
    //////////////////////////////////
   }

   function sendTx($sendTxfile) {
    $curl = curl_init();

    $url = "https://ethereum.pokt.network/transactions";  
    curl_setopt ($curl, CURLOPT_URL, $url);

    // Takes the Json file and gets the contents
    $dataJson = file_get_contents("$sendTxfile.json");

    // Strip the white spaces from the Json file. 
    $encodeData = json_encode(json_decode($dataJson));

    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    curl_setopt($curl,CURLOPT_POSTFIELDS, $encodeData);

    curl_setopt($curl, CURLOPT_POST, TRUE);

    $resp = curl_exec($curl);

    // catch errors.
    if($resp === FALSE){
        die(curl_error($curl));

    }
   }

   getTx(queryContract)

?>