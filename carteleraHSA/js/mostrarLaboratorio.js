let valorAnterior='';
let rutaPacientes='../php/consultarPaciente.php';
let rutaImagenes='../php/imagenes.php';
let intervalo=0;
const areaVisual='laboratorio';
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
        if(arregloJson[0].area===areaVisual){
            //TODO mostrar el turno llamado en ese instante
            turnoPaciente.textContent=arregloJson[0].paciente;
            turnoArea.textContent=arregloJson[0].consultorio;
            //*Comparar el valor actual con el valor anterior
            if (arregloJson[0].paciente !== valorAnterior) {
                const turno = document.getElementById('turnoActual');
                const entreturno = document.getElementById('entreTurnos');
                const logo=document.getElementById('logo');
                let textoaVoz='';
                if(isNaN(arregloJson[0].consultorio)){
                    textoaVoz = `Paciente ${arregloJson[0].paciente}, será atendido en el  área de ${arregloJson[0].consultorio}`;
                }else{
                    textoaVoz = `Paciente ${arregloJson[0].paciente}, será atendido en el consutorio número ${arregloJson[0].consultorio}`;
                }
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
            valorAnterior = arregloJson[0].paciente;
        }
        //*itero el arreglo para sacar los valores
        arregloJson.forEach(function (element, index) {
            if(element.area===areaVisual){
                const turnoElement = document.getElementById(`turno${index + 1}`);
                const enElement = document.getElementById(`en${index + 1}`);
                turnoElement.textContent = element.paciente;
                enElement.textContent = element.consultorio;
            }
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
            if(element.are_mul==='general' || element.are_mul===areaVisual){
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
                };
            };
        })
    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

setInterval(() => {
    consultarPacientes();
}, 3000);

consultarImagenes();