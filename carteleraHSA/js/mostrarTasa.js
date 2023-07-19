let rutaTasa='../php/consultarTasa.php';
let dolar=0;
let pesos=0;

fetch(rutaTasa)
.then(res=>res.json())
.then(tasa=>{
    console.log(tasa);
    if(tasa.length>0)
    dolar=parseFloat(tasa[0].usd_cam);
    pesos=parseFloat(tasa[0].cop_cam);
    const contenedorTasa=document.getElementById('tasaDia');
    contenedorTasa.innerHTML=` Tasa del día: <b>Dolar:</b> ${dolar.toFixed(2)} Bs. <b>Pesos:</b> ${pesos.toFixed(2)} Bs.`
});