var http = require("https"),
    request = require("request")



var health = request.get("https://ethereum.pokt.network/health", function(err, res, body) {  
    let json = JSON.parse(body);
    //console.log(json);
});







var sendTx = {
    url: "https://ethereum.pokt.network/transactions",
    form: 
        {"network":"ETH","subnetwork":"4","serialized_tx":"0xf86b0c85037e11d600825208942a14d313f58ba0bd4e8fa282082d11da24b1daa3876a94d74f430000802ba079b5b7c1cfbc7c7234b8cff71552c89ca4ddc6c97784267bd5d642afc8dc7af5a02f6eded43f0fba40d47605c1c750bdf85d36a5c833b632a542c9c828b73a3fbf","tx_metadata":{}}
}

var pktSend = request.post(sendTx, function(err, res, body) {  
    let json = JSON.parse(body);
    //console.log(json);
});



var txCode = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_getTransactionCount", "rpc_params":["0x1aef7f3a9b54db7f6d844c4a73eac7a701d851a1", "latest"]},"decoder":{}}
       
var quertTx = {
    url: "https://ethereum.pokt.network/queries",
    headers: {"Content-Type": "application/json"},
    form: txCode   
}
    
var pktQuerytx = request.post(quertTx, function(err, res,body) {  
    let json = JSON.parse(body);
    //console.log(body);


}); 



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
    //console.log(json);
});
