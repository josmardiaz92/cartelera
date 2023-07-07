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
            data.forEach(function() {
                if (c < 5) {
                    
                    if (c === 0) {
                        const turno1=document.getElementById('primerFilaTurno').textContent=data[0].id;
                        const en1=document.getElementById('primerFilaEn').textContent=data[0].idCaja;
                    } else {
                        const turno2=document.getElementById('turno2').textContent=data[1].id;
                        const en2=document.getElementById('en2').textContent=data[1].idCaja;
                        const turno3=document.getElementById('turno3').textContent=data[2].id;
                        const en3=document.getElementById('en3').textContent=data[2].idCaja;
                        const turno4=document.getElementById('turno4').textContent=data[3].id;
                        const en4=document.getElementById('en4').textContent=data[3].idCaja;
                        const turno5=document.getElementById('turno5').textContent=data[4].id;
                        const en5=document.getElementById('en5').textContent=data[4].idCaja;
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