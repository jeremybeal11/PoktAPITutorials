#  Connect dApp via Python
## Overview
If you wish to connect your dApp to the Pocket Network via Ruby without using the Pocket Plugin, see our tutorial below. For more information on RPC calls, see the [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) list for other calls you can use to interact on the Ethereum network.
## Prerequisites
*   Python 2.7 (minimum)
*   [Python Requests Lib](http://docs.python-requests.org/en/master/user/install/)
*   [JSON formatter](https://www.freeformatter.com/json-formatter.html) (Optional, but helpful)

**Note**: If you are using the JSON formatter, make sure the **indent level** is set to "compact (1 line)" and **brace style** is on "collapse".
## Get Health [GET]
While we check for the Nodes health we are going to make sure your Requests library is properly installed, open up idle and enter:
```python
      >>> import requests # Get server health
      >>> response = requests.get("https://ethereum.pokt.network/health") #to recieve response number
      >>> print(response) #to recive node JSON resonse
      >>> print(response.json())"
``` 
## Sending Transactions [POST]
Most networks accept signed transactions coded as hex strings, and these should be the input of the **serialized_tx** field. The **tx_metadata** is for networks that required different data structures to represent a transaction. To send a transaction, we will need to send the data VIA JSON.
```python
def sendTransaction():


        poktnode = {"network":"ETH","subnetwork":"4","serialized_tx":"0x0","tx_metadata":{}}
        response = requests.post("https://ethereum.pokt.network/transactions", data= poktnode)
        
        print(response.text)
    sendTransaction()
```
## Query a Transaction [POST]
To send a transaction on one blockchains Pocket supports, you will need to specify following in a JSON format:
*   Network 
*   Subnetwork 
*   Serialized TX (If your network accepts it)
*   TX MetaData (If your network accepts it)
See below for an example of seeing the JSON format, and sending an ETH transaction. 
```python
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
```python
 def txQuery():

        url = "https://ethereum.pokt.network/queries"

        txReturn = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_getTransactionCount", "rpc_params":["0x0","latest"]},"decoder":{}}
        
        headers = {"content-type": "application/json"}

        ethVal = requests.post(url= url, headers = headers, json= txReturn)

        #print(ethVal.json())
        #print ethVal.status_code, ethVal.reason
        #print(txReturn)

    txQuery()
 ```
## Send Data to a Contract [POST]"
Similar to sending a Ethereum transaction(as shown above), to send data to a smart contract, you must create the transaction parameters that includes:
*   To (Smart Contract Address)
*   gas(Optional)
*   gasPrice
*   value(Optional)
*   nonce(Optional)
*   Data
   * "0x" + contract_method_ID + encoded data
   
Once you defined your transaction params and signed it. Send it the same way you will send a Ethereum transaction (As shown earlier):

## Query Contract Data [POST]
To retrieve data from a smart contract, you will have to create the raw data to send to the Pocket node as well as a decoder. The mandatory elements your transaction must have is:
*   To (address of the contact)
*   Data (the method ID you are trying to call)
*   You can also specify other parameters(optional additions) in your query which are:
*   from
*   gas
*   gasPrice
*   value

```python
def contractQuery():

        url = "https://ethereum.pokt.network/queries"

        contractParams = {

            "to": "0xc63b376d9e2ecfc9019c700e9d7dd486e3d28e97",
            "data": "0x186c2e5f"
        }

        contractReturn = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_call", "rpc_params":[contractParams,"latest"]},"decoder":{}}
        
        getData = requests.post(url= url, json= contractReturn)


        #print(getData.json())
        
    contractQuery()    
    ```
