---
title: "Connect dApp via PHP"
excerpt: ""
---
[block:api-header]
{
  "title": "Overview"
}
[/block]
If you wish to connect your dApp to the Pocket Network by configuring your PHP files to connect to the Pocket network without using the Pocket Plugin, see our tutorial below. For more information on RPC calls, see the [JSON-RPC list](https://github.com/ethereum/wiki/wiki/JSON-RPC) for other calls you can use to interact on the Ethereum network. 
[block:api-header]
{
  "title": "Prerequisites"
}
[/block]
To be able to send data to the Pocket Nodes to be distributed thought the network, we will be using the CURL in PHP.

[block:api-header]
{
  "title": "Network URLs"
}
[/block]
Pocket has 3 URL domains that you can point your dApp to in order to interact with the network and perform what ever task you need:

*   Health:
   *   https://ethereum.pokt.network/health
*   Transaction:
   *   https://ethereum.pokt.network/transactions
* Query
   *   https://ethereum.pokt.network/queries
[block:api-header]
{
  "title": "Get Health [GET]"
}
[/block]
To get the Pocket node health status and see the plugins and network connected to the node, enter: 
[block:code]
{
  "codes": [
    {
      "code": "$curlHealth = curl_init();\n\n$url = \"https://ethereum.pokt.network/health\";\n\ncurl_setopt ($curlHealth, CURLOPT_URL, $url2);\n\n$resp2 = curl_exec($curlHealth);\nif($resp2 === FALSE){\n   die(curl_error($curl));\n}\n\ncurl_close($curlHealth);",
      "language": "php"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Send a Transaction [POST]"
}
[/block]
To send a transaction on one blockchains Pocket supports, you will need to specify following in a JSON format:
*   Network 
*   Subnetwork 
*   Serialized TX (If your network accepts it)
*   TX MetaData (If your network accepts it)

See below for an example of seeing the JSON format, and sending an ETH transaction. 

[block:code]
{
  "codes": [
    {
      "code": " {\n            \"network\": \"ETH\",\n            \"subnetwork\": \"4\",\n            \"serialized_tx\": \"Enter_signed_TX_here\",\n            \"tx_metadata\": {}\n        }\n",
      "language": "json",
      "name": "sendTransaction.json"
    },
    {
      "code": "function sendTx($sendTxfile) {\n    $curl = curl_init();\n\n    $url = \"https://ethereum.pokt.network/transactions\";  \n    curl_setopt ($curl, CURLOPT_URL, $url);\n\n    // Takes the Json file and gets the contents\n    $dataJson = file_get_contents(\"./path/to/file/$sendTxfile.json\");\n\n    // Strip the white spaces from the Json file. \n    $encodeData = json_encode(json_decode($dataJson));\n\n    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));\n\n    curl_setopt($curl,CURLOPT_POSTFIELDS, $encodeData);\n\n    curl_setopt($curl, CURLOPT_POST, TRUE);\n\n    $resp = curl_exec($curl);\n\n    // catch errors.\n    if($resp === FALSE){\n        die(curl_error($curl));\n\n    }\n   }",
      "language": "php",
      "name": "Example ETH Transaction"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Query a Transaction [POST]"
}
[/block]
You can query a transaction on the network by using RPC Methods and parameters for getting the balance, and other information surrounding it. To execute this query, you will need to define:
*   Network
*   Subnetwork
*   Action (in our case its "query") with the following functions:
   *   rpc_method
   *   rpc_params   
[block:code]
{
  "codes": [
    {
      "code": "{\n            \"network\": \"ETH\",\n            \"subnetwork\": \"4\",\n            \"query\": {\n                \"rpc_method\": \"eth_getBalance\",\n                \"rpc_params\": [\"wallet_address\", \"latest\"]\n            },\n            \"decoder\": {}\n}",
      "language": "json",
      "name": "txQuery.json"
    },
    {
      "code": "function getTx($dataFile) {\n\n    $curl = curl_init();\n\n    $url = \"https://ethereum.pokt.network/queries\";  \n    curl_setopt ($curl, CURLOPT_URL, $url);\n\n    // Takes the Json file and gets the contents\n    $dataJson = file_get_contents(\"$dataFile\");\n\n    // Strip the white spaces from the Json file. \n    $encodeData = json_encode(json_decode($dataJson));\n\n    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));\n\n    curl_setopt($curl,CURLOPT_POSTFIELDS, $encodeData);\n\n    curl_setopt($curl, CURLOPT_RETURNTRANSFER, FALSE);\n\n    curl_setopt($curl, CURLOPT_POST, TRUE);\n\n    $resp = curl_exec($curl);\n\n    // catch errors.\n    if($resp === FALSE){\n        die(curl_error($curl));\n\n    }\n   }",
      "language": "php",
      "name": "Query ETH Balance Example"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Send Data to Contract [POST]"
}
[/block]
Similar to sending a Ethereum transaction(as shown above), to send data to a smart contract, you must create the transaction parameters that includes: 
*   To (Smart Contract Address)
*   gas(Optional)
*   gasPrice 
*   value(Optional)
*   nonce(Optional)
*   Data 
   *   "0x" + contract_method_ID + encoded data

Once you defined your transaction params and signed it. Send it the same way you will send a Ethereum transaction (As shown earlier):
[block:code]
{
  "codes": [
    {
      "code": "function sendTx($sendTxfile) {\n    $curl = curl_init();\n\n    $url = \"https://ethereum.pokt.network/transactions\";  \n    curl_setopt ($curl, CURLOPT_URL, $url);\n\n    // Takes the json file and gets the contents\n    $dataJson = file_get_contents(\"$sendDatafile.json\");\n\n    // Strip the white spaces from the Json file. \n    $encodeData = json_encode(json_decode($dataJson));\n\n    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));\n\n    curl_setopt($curl,CURLOPT_POSTFIELDS, $encodeData);\n\n    curl_setopt($curl, CURLOPT_POST, TRUE);\n\n    $resp = curl_exec($curl);\n\n    // catch errors.\n    if($resp === FALSE){\n        die(curl_error($curl));\n\n    }\n   }",
      "language": "php",
      "name": "Send Data to Contract"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Query Contract Data [POST]"
}
[/block]
To retrieve data from a smart contract, you will have to create the raw data to send to the Pocket node as well as a decoder. The mandatory elements your transaction must have is:
*   To (address of the contact)
*   Data (the method ID you are trying to call)

You can also specify other parameters(optional additions) in your query which are:
*   from
*   gas
*   gasPrice
*   value
[block:code]
{
  "codes": [
    {
      "code": "",
      "language": "php",
      "name": "Query Smart Contract Example"
    }
  ]
}
[/block]