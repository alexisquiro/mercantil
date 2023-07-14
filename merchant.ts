
import request from 'request';

class Mercantil{

    apiKey:string // set your API key here s
    baseURL = 'https://gw.3be3-22336bfa.us-east.apiconnect.appdomain.cloud/mercantil-banco/prod/v1/payment'
   baseURLDev='https://apimbu.mercantilbanco.com/mercantil-banco/prod/v1/payment'
   ipaddress=''
   constructor(apiKey:string,ipadrress:string,merchantId:string,terimnalId:string){
      this.apiKey=apiKey
   }

   c2p(amount:number,destinationBankId:string,currency?:string,destinationMobileNumber:string,originMobileNumber:string){

      /* 
      ejemplo del body
   [   {
         "integratorId": "1",
         "merchantId": "150332",
         "terminalId": "1"
      },
      {
      "ipaddress": "10.0.0.1",
      "browser_agent": "Chrome 18.1.3",
      "mobile": {
         "manufacturer": "Samsung",
         "model": "S9",
         "os_version": "Oreo 9.1",
         "location": {
            "lat": 37.422476,
            "lng": 122.08425
         }
      },
      {
      "trx_type": "compra",
      "payment_method": "c2p",
      "destination_id": "AcTQ7V1gfkkhWIk0bT+Y+w==",
      "invoice_number": "3564544",
      "currency": "VES",
      "amount": 2525.33,
      "destination_bank_id": "0105",
      "destination_mobile_number": "Hii5FFH00E9bpVHpvQA0HA==",
      "payment_reference": "0057718281656",
      "origin_mobile_number": "0RPdh6FxGFFcio2P8uxNxg==",
      "twofactor_auth": "pUlaFdz3PTvDK9wbl7W3Rw=="
      } 
   ]
*/

      const options = {
         method: 'POST',
         url: this.baseURLDev,
         headers: {'content-type': 'application/json', accept: 'application/json'},
         body: body
       };

       request(options, function (error, response, body) {
         if (error) throw new Error(error);
       
         console.log(body);
       });
   }



   temporalC2P(amount:number,destinationBankId:string,currency?:string,destinationMobileNumber:string,originMobileNumber:string){
      const options = {
        method: 'POST',
        url: 'https://apimbu.mercantilbanco.com/mercantil-banco/prod/v1/mobile-payment/scp',
        headers: {
          'X-IBM-Client-Id': 'clientId',
          'content-type': 'application/json',
          accept: 'application/json'
        },
        body: 'REPLACE_BODY'
      };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
      });
      

   }
   


}



