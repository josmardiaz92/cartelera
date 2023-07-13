let valorAnterior='';
let rutaPacientes='../php/db.php';
let rutaImagenes='../php/imagenes.php';
let intervalo=0;
function desaparecer(turno, entreturno, logo) {
    turno.classList.remove("ver");
    turno.classList.add("no-ver");
    entreturno.classList.remove("no-ver");
    entreturno.classList.add("ver");
    setTimeout(() => {
        logo.classList.remove("HSA")
        turno.classList.add("d-none");
        entreturno.classList.remove("d-none");
    }, 550);
}
function aparecer(turno, entreturno, logo) {
    turno.classList.remove("no-ver");
    turno.classList.add("ver");
    entreturno.classList.remove("ver");
    entreturno.classList.add("no-ver");
    setTimeout(() => {
        logo.classList.add("HSA");
        turno.classList.remove("d-none");
        entreturno.classList.add("d-none");
    }, 550);
}

async function consultarPacientes(){
    fetch(rutaPacientes)
    .then(respuesta=>respuesta.json())
    .then(arregloJson=>{
        //TODO mostrar el turno llamado en ese instante
        turnoPaciente.textContent=arregloJson[0].nom_tur;
        turnoArea.textContent=arregloJson[0].especialidad;
        //*Comparar el valor actual con el valor anterior
        if (arregloJson[0].nom_tur !== valorAnterior) {
            const turno = document.getElementById('turnoActual');
            const entreturno = document.getElementById('entreTurnos');
            const logo=document.getElementById('logo');
            const textoaVoz = `Paciente ${arregloJson[0].nom_tur}, será atendido en ${arregloJson[0].especialidad}`;
            let i = 0;
            for (i = 0; i < 3; i++) {
                aparecer(turno, entreturno, logo);
                let utterance = new SpeechSynthesisUtterance(textoaVoz);
                speechSynthesis.speak(utterance);
            }
            setTimeout(() => {
                desaparecer(turno, entreturno, logo);
            }, 10000);
            //*Aquí puedes agregar cualquier acción que desees realizar cuando el valor cambie
        }
        //*Almacenar el valor actual para la siguiente comparación
        valorAnterior = arregloJson[0].nom_tur;
        //*itero el arreglo para sacar los valores
        arregloJson.forEach(function (element, index) {
            const turnoElement = document.getElementById(`turno${index + 1}`);
            const enElement = document.getElementById(`en${index + 1}`);
            turnoElement.textContent = element.nom_tur;
            enElement.textContent = element.especialidad;
        });
    })
    .catch(error=>{console.error(`Atención ${error}`)})

}

async function consultarImagenes(){
    fetch(rutaImagenes)
    .then(respuesta=>respuesta.json())
    .then(arregloJsonImagenes=>{
        intervalo=2000;
        arregloJsonImagenes.forEach((element,index)=>{
            if(element.ubi_mul==='flayer'){
                const nuevaDivision=document.createElement('div');
                nuevaDivision.classList="carousel-item imgCarrusel flayer";
                nuevaDivision.dataset.bsInterval=intervalo
                nuevaDivision.id=`flayer${index}`;
                flayer.appendChild(nuevaDivision);
                const elemento=document.getElementById(`flayer${index}`);
                const nuevaImagen=document.createElement('img');
                nuevaImagen.classList="img-fluid d-block h-100 bordeRedondeado";
                nuevaImagen.src=`../imagenes/${element.url_mul}.${element.ext_mul}`;
                elemento.appendChild(nuevaImagen);
            }else{
                const nuevaDivision=document.createElement('div');
                nuevaDivision.classList="carousel-item h-100 cuadrado";
                nuevaDivision.dataset.bsInterval=intervalo
                nuevaDivision.id=`cuadrado${index}`;
                cuadrado.appendChild(nuevaDivision);
                const elemento=document.getElementById(`cuadrado${index}`);
                const nuevaImagen=document.createElement('img');
                nuevaImagen.classList="img-fluid h-100 bordeRedondeado";
                nuevaImagen.src=`../imagenes/${element.url_mul}.${element.ext_mul}`;
                elemento.appendChild(nuevaImagen);
            }
        })
        
        
    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

setInterval(() => {
    consultarPacientes();
}, 3000);

consultarImagenes();