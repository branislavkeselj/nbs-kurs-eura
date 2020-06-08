const soap=require('soap');

module.exports=()=>{

    return new Promise(getClient)
        .then(getValue)
        //.then(validate)        
        
    function getClient(resolve, reject){

        const url='https://webservices.nbs.rs/CommunicationOfficeService1_0/ExchangeRateService.asmx?WSDL';

        soap.createClient(url,(err,client)=> {

            if(err){
    
                reject('createClient | '+err.message);
            }
            else resolve(client)
        })
    }

    function getValue(client){

        return new Promise((resolve, reject)=>{

            const header=`<AuthenticationHeader xmlns="http://communicationoffice.nbs.rs">
                <UserName>username</UserName>
                <Password>password</Password>
                <LicenceID>licenceID</LicenceID>
            </AuthenticationHeader>`;

            const args={
                currencyCode:978,
                rateType:2,
                exchangeRateListTypeID:3
            };

            client.addSoapHeader(header);

            client.GetCurrentExchangeRateByRateType(args,(err, rez)=> {

                if (err) {
                    
                    reject('GetCurrentExchangeRateByRateType | '+err.message);
                }
                else resolve(rez.GetCurrentExchangeRateByRateTypeResult);
            })
       })   
    }

    function validate(value){

        if(new RegExp(/^\d+(\.\d{1,4})?$/).test(value)) return value;

        throw new Error('Pogrešan format ['+value+']');
    }
}