let rutaImagenes='../php/consultarImagenesGen.php';
let intervalo=0;

async function consultarImagenes(){
    fetch(rutaImagenes)
    .then(respuesta=>respuesta.json())
    .then(arregloJsonImagenes=>{
        arregloJsonImagenes.forEach((element,index)=>{
            intervalo=element.duracion;
            if(element.ubicacion==='cuadrado'){
                const nuevaDivision=document.createElement('div');
                nuevaDivision.classList="carousel-item cuadrado h-100";
                nuevaDivision.dataset.bsInterval=intervalo
                nuevaDivision.id=`cuadrado${index}`;
                cuadrado.appendChild(nuevaDivision);
                const elemento=document.getElementById(`cuadrado${index}`);
                const nuevaImagen=document.createElement('img');
                nuevaImagen.classList="img-fluid bordeRedondeado mx-auto d-block h-100";
                nuevaImagen.src=`../imagenes/${element.nombre}.${element.extension}`;
                elemento.appendChild(nuevaImagen);
            };
        })
    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

function mostrarHora() {
    let reloj=document.getElementById('reloj');
    let fecha = new Date();
    // Opciones para formatear la fecha en español
    let opcionesFecha = { weekday: 'short', month: 'long', day: 'numeric' };
    let fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    
    let horas = formatoDosDigitos(fecha.getHours());
    let minutos = formatoDosDigitos(fecha.getMinutes());
    let ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12;
    let horaActual =  `<h1 class="text-end" style="font-size: 100px;">${horas}:${minutos} ${ampm}</h1>`;
    reloj.innerHTML = horaActual;
    reloj.innerHTML+=`<p class="fs-1 text-end">${fechaFormateada}</p>`
}
function formatoDosDigitos(numero) {
    return numero < 10 ? "0" + numero : numero;
}


consultarImagenes();

setInterval(mostrarHora, 1000);


