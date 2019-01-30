## Connect dApp via PHP

# Overview
If you wish to connect your dApp to the Pocket Network by configuring your PHP files to connect to the Pocket network without using the Pocket Plugin, see our tutorial below. For more information on RPC calls, see the [JSON-RPC list](https://github.com/ethereum/wiki/wiki/JSON-RPC) for other calls you can use to interact on the Ethereum network. 

# Prerequisites
To be able to send data to the Pocket Nodes to be distributed thought the network, we will be using the CURL in PHP.

# Network URLs
Pocket has 3 URL domains that you can point your dApp to in order to interact with the network and perform what ever task you need:

*   Health:
   *   https://ethereum.pokt.network/health
*   Transaction:
   *   https://ethereum.pokt.network/transactions
* Query
   *   https://ethereum.pokt.network/queries
# Get Health [GET]
To get the Pocket node health status and see the plugins and network connected to the node, enter: 

```PHP
 $curlHealth = curl_init();
 $url = "https://ethereum.pokt.network/health";
 curl_setopt ($curlHealth, CURLOPT_URL, $url2);
 $resp2 = curl_exec($curlHealth);
    if($resp2 === FALSE){       
       die(curl_error($curl));
        }
    curl_close($curlHealth);
   
```
# Send a Transaction [POST]
To send a transaction on one blockchains Pocket supports, you will need to specify following in a JSON format:
*   Network 
*   Subnetwork 
*   Serialized TX (If your network accepts it)
*   TX MetaData (If your network accepts it)

See below for an example of the JSON format, and sending an ETH transaction. 

```JSON
       {            
         "network": "ETH",
         "subnetwork": "4",
         "serialized_tx": "Enter_signed_TX_here",
         "tx_metadata": {}    
         }
```      
Example:
```PHP
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
```      
      
# Query a Transaction [POST]
You can query a transaction on the network by using RPC Methods and parameters for getting the balance, and other information surrounding it. To execute this query, you will need to define:
*   Network
*   Subnetwork
*   Action (in our case its "query") with the following functions:
   *   rpc_method
   *   rpc_params   
```JSON
{
     "network": "ETH",
     "subnetwork": "4",
     "query": {
            "rpc_method": "eth_getBalance",
            "rpc_params": ["0x0", "latest"]
        },
            "decoder": {}
        }
```
Example:
```PHP
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
```
# Send Data to Contract [POST]
Similar to sending a Ethereum transaction(as shown above), to send data to a smart contract, you must create the transaction parameters that includes: 
*   To (Smart Contract Address)
*   gas(Optional)
*   gasPrice 
*   value(Optional)
*   nonce(Optional)
*   Data 
   *   "0x" + (contract_method_ID + encoded data)

Once you defined your transaction params and signed it. Send it the same way you will send a Ethereum transaction (As shown earlier in "Send a Transaction"):

# Query Contract Data [POST]
To retrieve data from a smart contract, you will have to create the raw data to send to the Pocket node as well as a decoder. The mandatory elements your transaction must have is:
*   To (address of the contact)
*   Data (the method ID you are trying to call)

You can also specify other parameters(optional additions) in your query which are:
*   from
*   gas
*   gasPrice
*   value

Smart Contract Data Query(JSON format Example):
```JSON
 {
    "network": "ETH",
    "subnetwork": "4",
    "query": 
    {
        "rpc_method": "eth_call",
         "rpc_params":[{"from": "0x0", "to": "0x0", "data": "MethodID"}, "latest"]
    },
    "decoder":{}
}
```
