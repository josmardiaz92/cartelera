//TODO me permite ver la ruta completa del archivo
//console.log(__filename);

//TODO me muestra la ruta hasta el contenedor del archivo
//console.log(__dirname);

//TODO asi se muestran tablas
/* console.count("node");
console.log("hola");
console.count("node");
console.table({
    a:1,
    b:2
});

console.log("Nivel N° 1");
console.group();
console.log("Nivel N° 2");
console.group();
console.log("Nivel N° 3");
console.log("Más contenido del nivel 3");
console.groupEnd();
console.log("Regresamos al nivel 2");
console.groupEnd();
console.log("Regresamos al nivel 1");


 */

let valor=0;
const saludar=()=>{
    console.log('hola mundo');
    valor++;
}

//setTimeout(saludar,2000);
/* let timer=setTimeout(saludar,2000);
clearTimeout(timer); */

let intervalo=setInterval(()=>{
    saludar();
    if(valor===5){
        clearInterval(intervalo);
    }
},1000);