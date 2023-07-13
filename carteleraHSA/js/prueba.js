/* let ruta = '../php/prueba.txt';
let valorAnterior='';
setInterval(() => {
    consultar();
}, 3000);



function consultar() {
    fetch(ruta)
        .then(resp => resp.text()) // Convertir la respuesta en texto
        .then(datos => {
            const regex = /paciente: (.+), consultorio: (.+)/;
            const matches = datos.match(regex);
            let paciente = '';
            let consultorio = '';
            if (matches) {
                paciente = matches[1];
                consultorio = matches[2];
                
            } else {
                console.log("No se encontraron datos válidos en el texto.");
            }
            if(paciente!=valorAnterior){
                console.log('cambio')
            }else{
                console.log('bien')
            }
            valorAnterior=paciente;

        })
        .catch(error => {
            console.error('Error al leer el archivo:', error);
        });
}

 */

let ruta = '../php/prueba.txt';

fetch(ruta)
.then(resp => resp.text()) // Convertir la respuesta en texto
.then(datos => {
    console.log(datos);
    const lineas = datos.split('\n'); // Dividir el contenido en líneas
    console.log(lineas);
    // Realizar la solicitud AJAX para enviar los datos al servidor
    //insertarDatos(lineas);
})
.catch(error => {console.error('Error al leer el archivo:', error);
});


function insertarDatos(lineas) {
    fetch('../php/insertar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lineas)
    })
        .then(response => {
            if (response.ok) {
                console.log('Datos insertados correctamente.');
            } else {
                throw new Error('Error al insertar los datos.');
            }
        })
        .catch(error => { console.error('Error en la solicitud AJAX:', error); });
}

