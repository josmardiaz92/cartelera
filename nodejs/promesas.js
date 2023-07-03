//TODO res=>resolve (resuelto) | rej=>reject (rechazado)
/* const miPromesa=new Promise((res,rej)=>{
    res(`Exito en la llamada de la promesa`);
    rej(`ocurrio un error en el servidos...`)
});

miPromesa.then((resultado)=>{
    console.log(resultado);},
    (error)=>{
        console.log(`Error: ${error}`);
    }); */

const moduloPromesa=require('./mis modulos/promesa');
const miPromesa=moduloPromesa.dividir(15,5);
miPromesa.then((data)=>{
    console.log(data);
},(error)=>{
    console.log(`error: ${error}`);
});