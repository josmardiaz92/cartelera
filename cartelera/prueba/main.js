$(document).ready(function() {
    
    const contenedor=document.getElementById('tabla-turnos');
    // Función para realizar la solicitud AJAX
    function hacerSolicitud() {
        let c=0;
    $.ajax({
        url: 'db.php',
        dataType: 'json',
        success: function(data) {

            const turnoActual=document.getElementById('turno-paciente-general').textContent=data[0].id;
            const lugarActual=document.getElementById('turno-area-general').textContent=data[0].idCaja;
            data.forEach(function(element, index) {
                if (c < 5) {
                    
                    if (c === 0) {
                        const turno1=document.getElementById('primerFilaTurno').textContent=element.id;
                        const en1=document.getElementById('primerFilaEn').textContent=element.idCaja;
                    } else {
                        const turnoElement = document.getElementById(`turno${index + 1}`);
                        const enElement = document.getElementById(`en${index + 1}`);
                        turnoElement.textContent = element.id;
                        enElement.textContent = element.idCaja;
                    }
                }
            c++;
                
            });
            /* console.log(data); */
            // Manipula los datos recibidos como desees
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud AJAX:', status, error);
        }
    });
    }

    // Ejecuta la función inicialmente
    hacerSolicitud();

    // Configura la ejecución periódica cada 5 segundos
    setInterval(hacerSolicitud, 1000);
});