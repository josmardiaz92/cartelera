const { error } = require('console');
const fs=require('fs');

//todo CREAR ARCHIVO
    //*TAMBIEN, CAMBIANDO EL SEGUNDO PARAMENTRO, SE PUEDE CAMBIAR EL CONTENIDO DE DICHO ARCHIVO

/* fs.writeFile('prueba01.txt','',(error)=>{ //*1er parametro nombre del nuevo archivo, 2do parametro es el texto que estara adentr y 3erparametro sera un callback para saber si hay un error
    if(error){
        console.log(`Error: ${error}`);
    }
});  */

//TODO LEER ARCHIVO

function newFunction() {
    let data=fs.readFile('prueba.txt','utf-8',(error,data)=>{  //*1er parametro nombre del nuevo archivo, el segundo parametro es para que no me lance un buffer, sino que el archivo sea legible (es opciona) y el 3do parametro sera un callback por si hay un error y la data que me va a retornar
        if(!error)
        {
            console.log(data);
        }else{
            console.log(`Error: ${error}`);
        }
        return data;
    });
    return data;
}

newFunction();

//TODO RENOMBRAR ARCHIVO

/* fs.rename('prueba01.txt','prueba.txt',(error)=>{ //*1er parametro nombre del archivo, 2do parametro es el nuevo nombre del archivo y 3erparametro sera un callback para saber si hay un error
    if(!error){
        console.log(`¡Renombrado!`);
    }else{
        console.log(`Error: ${error}`);
    }
}); */

//TODO AGREGAR CONTENIDO AL ARCHIVO

/* fs.appendFile('prueba.txt','\n¡Hola!',(error)=>{    //*1er parametro nombre del archivo, 2do parametro es contenido a agregar y 3erparametro sera un callback para saber si hay un error
    if(!error){
        console.log(`¡Contenido agregado!`);
    }else{
        console.log(`Error: ${error}`);
    }
}); */

//TODO CREAR COPIA DE UN ARCHIVO

/* fs.ReadStream('prueba.txt').pipe(fs.createWriteStream('prueba_bu.txt')); */

//TODO BORRAR UN ARCHIVO

/* fs.unlink('prueba_bu.txt',(error)=>{
    if(error){
        console.log(`Error: ${error}`);
    }
}) */

//TODO LEER LO QUE HAY DENTRO DE UNA CARPETA

/* fs.readdir('./',(error,archivos)=>{ 
    archivos.forEach(archivo=>{
        console.log(archivo);
    });
}); */