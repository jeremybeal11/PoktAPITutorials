# Connect dApp via Ruby
---
## Overview"
If you wish to connect your dApp to the Pocket Network via Ruby without using the Pocket Plugin, see our tutorial below. For more information on RPC calls, see the [JSON-RPC list](https://github.com/ethereum/wiki/wiki/JSON-RPC) for other calls you can use to interact on the Ethereum network. 

## Prerequisites
To be able to send data to the Pocket Nodes to be distributed thought the network, you will need:
*   [react-client](https://rubygems.org/gems/rest-client/versions/2.1.0.rc1-x64-mingw32)
*   Rubys JSON library
## Network URLs
Pocket has 3 URL domains that you can point your dApp to in order to interact with the network and perform what ever task you need:

*   Health:
    *   https://ethereum.pokt.network/health
*   Transaction:
    *   https://ethereum.pokt.network/transactions
* Query
    *   https://ethereum.pokt.network/queries

## Get Health [GET]
To get the Pocket node health status and see the plugins and network connected to the node, enter: 
```ruby
 MainURL = "https://ethereum.pokt.network"

def getHealth()

        url = MainURL + "/health"
        data =RestClient.get(url)
        puts data
        
    end
```

## Send a Transaction [POST]
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
```ruby
MainURL = "https://ethereum.pokt.network"

def sendTX()

            url = MainURL + "/transactions"
            
            request = {"network": "ETH","subnetwork": "4","serialized_tx": "0x0","tx_metadata":{}}.to_json
    
            send = RestClient.post(url,request, :content_type => 'application/json')
            
            puts send

    end 
```
## Query a Transaction [POST]
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
```ruby
MainURL = "https://ethereum.pokt.network"

def queryTX()
            
            url = MainURL + "/queries"   
        
            request = {"network": "ETH","subnetwork": "4","query":{"rpc_method": "eth_getBalance","rpc_params":["0x0","latest"]},"decoder": Decoder}.to_json
        
            send = RestClient.post(url,request, :content_type => 'application/json')
          
            puts send        
    end
```
## Send Data to Contract [POST]
Similar to sending a Ethereum transaction(as shown above), to send data to a smart contract, you must create the transaction parameters that includes: 
*   To (Smart Contract Address)
*   gas(Optional)
*   gasPrice 
*   value(Optional)
*   nonce(Optional)
*   Data 
    *   "0x" + contract_method_ID + encoded data

Once you defined your transaction params and signed it. Send it the same way you will send a Ethereum transaction (As shown earlier).
## Query Contract Data [POST]
To retrieve data from a smart contract, you will have to create the raw data to send to the Pocket node. The mandatory elements your transaction must have is:
*   To (address of the contact)
*   Data (the method ID you are trying to call)

You can also specify other parameters(optional additions) in your query which are:
*   from
*   gas
*   gasPrice
*   value

Example:
```ruby
Datatx = { 
        "from": "0x0", #user address
        "to": "0x0", #contract address
        "data": "0x186c2e5f" #methodID
    }
```
Once the params have been specified, just insert DataTX in the **RPC_Params** in the QueryTx method(See below for example). 
```Ruby
   request = {"network": "ETH","subnetwork": "4","query":{"rpc_method": "eth_call","rpc_params": [ Datatx, "latest" ]}, "decoder": {}}.to_json
        
```

