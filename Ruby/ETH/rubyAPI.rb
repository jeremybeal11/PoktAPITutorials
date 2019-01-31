require 'json'
require 'rest-client'


class ApiConnect 

    def getHealth()

        url = "https://ethereum.pokt.network/health"

        data =RestClient.get(url)

        puts data
    end

    def queryTX()
    
            
            url = "https://ethereum.pokt.network/queries"   
        
            request = {"network": "ETH","subnetwork": "4","query":{"rpc_method": "eth_getBalance","rpc_params":["0x2a14D313F58bA0bd4e8Fa282082D11DA24b1DaA3","latest"]},"decoder": Decoder}.to_json
        
            send = RestClient.post(url,request, :content_type => 'application/json')
          
            puts send        
    end

    def sendTX()

            url = "https://ethereum.pokt.network/transactions"

            
            request = {"network": "ETH","subnetwork": "4","serialized_tx": "0x0","tx_metadata":{}}.to_json
            
            send = RestClient.post(url,request, :content_type => 'application/json')
        

            #puts send

    end 


    
    def sendContractTX()

        url = "https://ethereum.pokt.network/transactions"

            
        request = {"network": "ETH","subnetwork": "4",
            "serialized_tx": "0x0",
            "tx_metadata":{}}.to_json
            
        send = RestClient.post(url,request, :content_type => 'application/json')
        

           # puts send        
    
    end

    Datatx = { 
        "from": "0x2a14d313f58ba0bd4e8fa282082d11da24b1daa3",
        "to": "0xc63b376d9e2ecfc9019c700e9d7dd486e3d28e97",
        "data": "0x186c2e5f" #methodID
        
    }

    Decoder = ["returnTypes": ["address", "uint256", "string", "string", "bytes32", "string", "uint256", "string", "bool", "uint256", "uint256"]]

    # when i specify the "FROM" it still returns the data first data it recieved 

    def QueryContract()

        url = "https://ethereum.pokt.network/queries"

        request = {"network": "ETH","subnetwork": "4","query":{"rpc_method": "eth_call","rpc_params": [ Datatx, "latest" ]}, "decoder": {}}.to_json
        
        
        send = RestClient.post(url,request, :content_type => 'application/json')

        puts send
        

    end    
    
end

ApiConnect.new.QueryContract()
