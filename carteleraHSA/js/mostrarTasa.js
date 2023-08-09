let rutaTasa='../php/consultarTasa.php';
let dolar=0;
let pesos=0;
let euro=0;
let dolarAnteior=0;
let pesosAnterior=0;

consultarTasa();

setInterval(() => {
    consultarTasa();
}, 3000);

function consultarTasa() {
    fetch(rutaTasa)
        .then(res => res.json())
        .then(tasa => {
            const contenedorTasa = document.getElementById('tasaDia');
            if (tasa.length > 0) {
                if (tasa[0].usd_cam !== dolarAnteior || tasa[0].cop_cam !== pesosAnterior) {
                    dolar = parseFloat(tasa[0].usd_cam);
                    pesos = parseFloat(tasa[0].cop_cam);
                    contenedorTasa.innerHTML = ` Tasa del día: <b>Dolar:</b> ${dolar.toFixed(2)} Bs. <b>Pesos:</b> ${pesos.toFixed(2)}. `;
                }
                dolarAnteior = tasa[0].usd_cam;
                pesosAnterior = tasa[0].cop_cam;
            }else{
                contenedorTasa.innerHTML='';
            }
        });
}
