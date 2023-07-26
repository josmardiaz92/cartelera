let valorAnterior='';
let rutaPacientes='../php/consultarPacienteRay.php';
let rutaImagenes='../php/consultarImagenesRay.php';
let intervalo=0;
let listaPacientes='';
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
        if(arregloJson.length>0){
            //TODO mostrar el turno llamado en ese instante
            if(isNaN(parseInt(arregloJson[0].consultorio))){
                turnoPaciente.textContent=arregloJson[0].paciente;
                turnoArea.textContent=arregloJson[0].consultorio;
            }else{
                turnoPaciente.textContent=arregloJson[0].paciente;
                turnoArea.textContent=`Consultorio ${arregloJson[0].consultorio}`;
            }
            
            //*Comparar el valor actual con el valor anterior
            if (arregloJson[0].paciente !== valorAnterior) {
                const turno = document.getElementById('turnoActual');
                const entreturno = document.getElementById('entreTurnos');
                const logo=document.getElementById('logo');

                //Todo provisional
                const contenedorAudio = pinProvisional(turno, entreturno, logo);
                
                /* let textoaVoz='';
                if(isNaN(parseInt(arregloJson[0].consultorio))){
                    textoaVoz = `Paciente ${arregloJson[0].paciente}, será atendido en el  área de ${arregloJson[0].consultorio}`;
                }else{
                    textoaVoz = `Paciente ${arregloJson[0].paciente}, será atendido en el consutorio número ${arregloJson[0].consultorio}`;
                }
                let i = 0;
                for (i = 0; i < 3; i++) {
                    aparecer(turno, entreturno, logo);
                    let utterance = new SpeechSynthesisUtterance(textoaVoz);
                    speechSynthesis.speak(utterance);
                } */
                setTimeout(() => {
                    contenedorAudio.innerHTML='';
                    desaparecer(turno, entreturno, logo);
                }, 10000);
                //*Aquí puedes agregar cualquier acción que desees realizar cuando el valor cambie
            }
            //*Almacenar el valor actual para la siguiente comparación
            valorAnterior = arregloJson[0].paciente;
            
            listaPacientes=''; //*reiniciamos el valor para evitar errores
            let contadorPacientes=0;
            //*itero el arreglo para sacar los valores
            arregloJson.forEach(function (element, index) {
                if(contadorPacientes < 5){
                    if(isNaN(parseInt(element.consultorio))){
                        listaPacientes+=`
                        <tr>
                            <td class='text-center text-dark border-0 fs-3'>
                                <span>${element.paciente}</span>
                            </td>
                            <td class='en text-center text-dark border-0 fs-3'>
                                <span>${element.consultorio}</span>
                            </td>
                        </tr>`;
                    }else{
                        listaPacientes+=`
                        <tr>
                            <td class='text-center text-dark border-0 fs-3'>
                                <span>${element.paciente}</span>
                            </td>
                            <td class='en text-center text-dark border-0 fs-3'>
                                <span>Consultorio ${element.consultorio}</span>
                            </td>
                        </tr>`;
                    }
                    
                    contadorPacientes++;
                };
            })
            tablaTurnos.innerHTML=listaPacientes;
        }
    })
    .catch(error=>{console.error(`Atención ${error}`)})
}

function pinProvisional(turno, entreturno, logo) {
    const contenedorAudio = document.getElementById('contenedorAudio');
    const audio = document.createElement('audio');
    audio.src = '../tonos/hangouts_message.ogg';
    audio.autoplay = true;
    contenedorAudio.appendChild(audio);
    aparecer(turno, entreturno, logo);
    // Función para reproducir el audio cada 4 segundos, 3 veces en total
    function reproducirAudioCada4Segundos(veces) {
        if (veces <= 0) {
            return;
        }

        setTimeout(() => {
            audio.currentTime = 0; // Reinicia el audio al principio
            audio.play();
            reproducirAudioCada4Segundos(veces - 1); // Llamada recursiva para reproducir el audio nuevamente
        }, 3000);
    }
    // Iniciar la reproducción del audio tres veces
    reproducirAudioCada4Segundos(3);
    return contenedorAudio;
}

async function consultarImagenes(){
    fetch(rutaImagenes)
    .then(respuesta=>respuesta.json())
    .then(arregloJsonImagenes=>{
        arregloJsonImagenes.forEach((element,index)=>{
            intervalo=element.duracion;
            if(element.ubicacion==='flayer'){
                const nuevaDivision=document.createElement('div');
                nuevaDivision.classList="carousel-item imgCarrusel flayer";
                nuevaDivision.dataset.bsInterval=intervalo;
                nuevaDivision.id=`flayer${index}`;
                flayer.appendChild(nuevaDivision);
                const elemento=document.getElementById(`flayer${index}`);
                const nuevaImagen=document.createElement('img');
                nuevaImagen.classList="img-fluid d-block h-100 bordeRedondeado";
                nuevaImagen.src=`../imagenes/${element.nombre}.${element.extension}`;
                elemento.appendChild(nuevaImagen);
            }else{
                const nuevaDivision=document.createElement('div');
                nuevaDivision.classList="carousel-item h-100 cuadrado";
                nuevaDivision.dataset.bsInterval=intervalo;
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

setInterval(() => {
    consultarPacientes();
}, 3000);

consultarImagenes();