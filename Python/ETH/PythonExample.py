import requests
import json

def apiConnection():


    def sendTransaction():


        poktnode = {"network":"ETH","subnetwork":"4","serialized_tx":"0x0","tx_metadata":{}}
        response = requests.post("https://ethereum.pokt.network/transactions", data= poktnode)
        
        #print(response.text)
        #print(poktnode)
    
    sendTransaction()

    def txQuery():

        url = "https://ethereum.pokt.network/queries"

        txReturn = {"network": "ETH","subnetwork": "4","query": {"rpc_method": "eth_getTransactionCount", "rpc_params":["0x1aef7f3a9b54db7f6d844c4a73eac7a701d851a1","latest"]},"decoder":{}}
        
        headers = {"content-type": "application/json"}

        ethVal = requests.post(url= url, headers = headers, json= txReturn)

        print(ethVal.json())
    

    txQuery()

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



apiConnection()
       
