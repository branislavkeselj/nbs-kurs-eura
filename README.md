Trenutni kurs eura Narodne banke Srbije sa Node.js

Potrebno je instalirati soap.

npm install soap --save

Nakon instaliranja potrebno u header(nbs.js) ubaciti podatke za pristup NBS servisu, nakon toga

const nbs=require('./nbs');

module.exports=()=>{

    nbs()
    .then(rez=>{
        console.log(rez)
    })
    .catch(err=>{
        console.log(err)
    })
}
