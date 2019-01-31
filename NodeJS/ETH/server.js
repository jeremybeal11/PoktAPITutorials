var http = require("https"),
    request = require("request")
PoktURL = "https://ethereum.pokt.network"

function getHealth() {

    var health = request.get(PoktURL+"/health", function(err, res, body) {  
        let json = JSON.parse(body);
        console.log(json);
    });

}

function sendTX(){
    
    var sendTx = {
        url: PoktURL + "/transactions",
        form: 
            {"network":"ETH","subnetwork":"4","serialized_tx":"0x0","tx_metadata":{}}
    }
    
    var pktSend = request.post(sendTx, function(err, res, body) {  
        let json = JSON.parse(body);
        console.log(json);
    });
}

// if you wish to have the hex address as a parameter, you may have to use the web3 library to convert
// hex>ascii>string
function queryTX(){
    var txCode = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_getTransactionCount", "rpc_params":["0x1aef7f3a9b54db7f6d844c4a73eac7a701d851a1", "latest"]},"decoder":{}}
   
var quertTx = {
    url: PoktURL + "/queries",
    headers: {"Content-Type": "application/json"},
    form: txCode   
}
    
var pktQuerytx = request.post(quertTx, function(err, res,body) {  
    let json = JSON.parse(body);

    console.log(json);

}); 
}

// query contract data
var dataTx = {
    "from": "0x2a14D313F58bA0bd4e8Fa282082D11DA24b1DaA3",
    "to": "0xc63b376d9e2ecfc9019c700e9d7dd486e3d28e97",
    "data": "0x186c2e5f"
}

// simply insert dataTX into txCode for the RPC_Params as if you were looking up a transaction.
var txCode = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_call", "rpc_params":[ dataTx, "latest"]},"decoder":{}}

