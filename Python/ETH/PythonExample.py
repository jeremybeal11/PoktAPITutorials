import requests
import json

def apiConnection():

    PoktURL = "https://ethereum.pokt.network"

    def sendTransaction():

        poktnode = {"network":"ETH","subnetwork":"4","serialized_tx":"0x0","tx_metadata":{}}
        response = requests.post(PoktURL + "/transactions", data= poktnode)
        
        #print(response.text)
    
    sendTransaction()

    def txQuery():

        url = PoktURL +"/queries"

        address = "0x1aef7f3a9b54db7f6d844c4a73eac7a701d851a1"

        txReturn = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_getBalance", "rpc_params":[str(address),"latest"]},"decoder":{}}
        
        headers = {"content-type": "application/json"}

        ethVal = requests.post(url= url, headers = headers, json= txReturn)

        print(ethVal.json())

    txQuery()

        # example contract params to request data.
        contractParams = {

            "to": "0xc63b376d9e2ecfc9019c700e9d7dd486e3d28e97",
            "from": "0x0"
            "data": "0x186c2e5f"
        }
        
        # example JSON of calling data from a Smart Contract
        contractReturn = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_call", "rpc_params":[contractParams,"latest"]},"decoder":{}}
         

apiConnection()
    
