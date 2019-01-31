require 'json'
require 'rest-client'


class ApiConnect 

    MainURL = "https://ethereum.pokt.network"

    def getHealth()

        url = MainURL + "/health"

        data =RestClient.get(url)

        puts data
    end

    def queryTX()
            
            url = MainURL + "/queries"   
        
            request = {"network": "ETH","subnetwork": "4","query":{"rpc_method": "eth_getBalance","rpc_params":["0x2a14D313F58bA0bd4e8Fa282082D11DA24b1DaA3","latest"]},"decoder": Decoder}.to_json
        
            send = RestClient.post(url,request, :content_type => 'application/json')
          
            puts send        
    end

    def sendTX()

            url =  MainURL + "/transactions"
            
            request = {"network": "ETH","subnetwork": "4","serialized_tx": "0x0","tx_metadata":{}}.to_json
            
            send = RestClient.post(url,request, :content_type => 'application/json')
        

            #puts send

    end 

    Datatx = { 
        "from": "0x2a14d313f58ba0bd4e8fa282082d11da24b1daa3",
        "to": "0xc63b376d9e2ecfc9019c700e9d7dd486e3d28e97",
        "data": "0x186c2e5f" #methodID
        
    }



ApiConnect.new.getHealth()
