const fs=require('fs');

/* fs.readFile('prueba.txt','utf-8',(error,data)=>{
    if(!error){
        console.log(data);
    }else{
        console.log(`error: ${error}`);
    }
}); */

//TODO asi se hace de forma sincrona, a diferencia a que por defecto se hace asincrono

console.log('inicio');
const miData=fs.readFileSync('prueba.txt', 'utf-8');
console.log(miData);
console.log('fin');