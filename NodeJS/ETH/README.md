## Connect dApp via NodeJS
# Overview

If you wish to connect your dApp to the Pocket Network in the NodeJS environment without using the Pocket Plugin, see our tutorial below. For more information on RPC calls, see the [JSON-RPC list](https://github.com/ethereum/wiki/wiki/JSON-RPC) for other calls you can use to interact on the Ethereum network. 
# Prerequisites
To be able to send data to the Pocket Nodes to be distributed thought the network, you will need:
*   [Request Module](https://www.npmjs.com/package/request) 
# Network URLs
Pocket has 3 URL domains that you can point your dApp to in order to interact with the network and perform what ever task you need:

*   Health:
    *  https://ethereum.pokt.network/health
*   Transaction:
    *   https://ethereum.pokt.network/transactions
* Query
   *   https://ethereum.pokt.network/queries

# Setup Request
When the module is installed. We will add it to the top of our Server.js file:
```Javascript
var request = require("request")
```
# Get Health [GET]
To get the Pocket node health status and see the plugins and network connected to the node, enter: 
```Javascript
var health = request.get("https://ethereum.pokt.network/health", function(err, res, body) {  
    let json = JSON.parse(body);
    console.log(json);
});
```
# Send a Transaction [POST]
To send a transaction on one blockchains Pocket supports, you will need to specify following in a JSON format:
*   Network 
*   Subnetwork 
*   Serialized TX (If your network accepts it)
*   TX MetaData (If your network accepts it)

See below for an example of seeing the JSON format, and sending an ETH transaction. 
```JSON
{
    "network": "ETH",
    "subnetwork": "4",
    "serialized_tx": "0x0",
    "tx_metadata": {}
}
```
Example:
```Javascript
var sendTx = {
    url: "https://ethereum.pokt.network/transactions",
    form: 
        {"network":"ETH","subnetwork":"4","serialized_tx":"0x0","tx_metadata":{}}
}

var pktSend = request.post(sendTx, function(err, res, body) {  
    let json = JSON.parse(body);
    console.log(json);
});
```
#   Query a Transaction [POST]
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
```Javascript
var txCode = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_getTransactionCount", "rpc_params":["<Address>", "latest"]},"decoder":{}}
       
var quertTx = {
    url: "https://ethereum.pokt.network/queries",
    headers: {"Content-Type": "application/json"},
    form: txCode   
}
    
var pktQuerytx = request.post(quertTx, function(err, res,body) {  
    let json = JSON.parse(body);
    console.log(body);


}); 
```
# Send Data to Contract [POST]

Similar to sending a Ethereum transaction(as shown above), to send data to a smart contract, you must create the transaction parameters that includes: 
*   To (Smart Contract Address)
*   gas(Optional)
*   gasPrice 
*   value(Optional)
*   nonce(Optional)
*   Data 
   *   "0x" + contract_method_ID + encoded data

Once you defined your transaction params and signed it. Send it the same way you will send a Ethereum transaction (As shown earlier):
# Query Contract Data [POST]"
To retrieve data from a smart contract, you will have to create the raw data to send to the Pocket node as well as a decoder. The mandatory elements your transaction must have is:
*   To (address of the contact)
*   Data (the method ID you are trying to call)

You can also specify other parameters(optional additions) in your query which are:
*   from
*   gas
*   gasPrice
*   value
```Javascript
var dataTx = {
        "from": "0x2a14D313F58bA0bd4e8Fa282082D11DA24b1DaA3",
        "to": "0xc63b376d9e2ecfc9019c700e9d7dd486e3d28e97",
        "data": "0x186c2e5f"
}

var contractCode = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_call", "rpc_params":[ dataTx, "latest"]},"decoder":{}}

var conquertTx = {
    url: "https://ethereum.pokt.network/queries",
    headers: {"Content-Type": "application/json"},
    form: contractCode   
}

var pktcontractSend = request.post(conquertTx, function(err, res, body) {  
    let json = JSON.parse(body);
    console.log(json);
});
```
