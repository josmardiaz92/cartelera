$(document).ready(function() {
    let valorAnterior = '';
    // Función para realizar la solicitud AJAX
    function hacerSolicitud() {
        let c=0;
        $.ajax({
            url: '../php/db.php',
            dataType: 'json',
            success: function(data) {
                console.log(data)
                const turnoActual = document.getElementById('turno-paciente').textContent = data[0].nom_tur;
                const lugarActual = document.getElementById('turno-area').textContent = data[0].especialidad;
                // Comparar el valor actual con el valor anterior
                if (data[0].nom_tur !== valorAnterior) {
                    const turno = document.getElementById('turnoActual');
                    const entreturno = document.getElementById('entreTurnos');
                    const textoaVoz = `Paciente ${data[0].nom_tur}, será atendido en ${data[0].especialidad}`;
                    let i = 0;
                    for (i = 0; i < 3; i++) {
                        aparecer(turno, entreturno);
                        let utterance = new SpeechSynthesisUtterance(textoaVoz);
                        speechSynthesis.speak(utterance);
                    }
                    setTimeout(() => {
                        desaparecer(turno, entreturno);
                    }, 15000);
                    // Aquí puedes agregar cualquier acción que desees realizar cuando el valor cambie
                }
                // Almacenar el valor actual para la siguiente comparación
                valorAnterior = data[0].nom_tur;
                data.forEach(function (element, index) {
                    if (c < 5) {
                        if (c === 0) {
                            const turno1 = document.getElementById('primerFilaTurno');
                            const en1 = document.getElementById('primerFilaEn');
                            turno1.textContent = element.nom_tur;
                            en1.textContent = element.especialidad;
                        } else {
                            const turnoElement = document.getElementById(`turno${index + 1}`);
                            const enElement = document.getElementById(`en${index + 1}`);
                            turnoElement.textContent = element.nom_tur;
                            enElement.textContent = element.especialidad;
                        }
                    }
                    c++;
                });
                function desaparecer(turno, entreturno) {
                    turno.classList.remove("ver");
                    turno.classList.add("no-ver");
                    entreturno.classList.remove("no-ver");
                    entreturno.classList.add("ver");
                    setTimeout(() => {
                        turno.classList.add("d-none");
                        entreturno.classList.remove("d-none");
                    }, 550);
                }
                function aparecer(turno, entreturno) {
                    turno.classList.remove("no-ver");
                    turno.classList.add("ver");
                    entreturno.classList.remove("ver");
                    entreturno.classList.add("no-ver");
                    setTimeout(() => {
                        turno.classList.remove("d-none");
                        entreturno.classList.add("d-none");
                    }, 550);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', status, error);
            }
        });
    }
    // Ejecuta la función inicialmente
    hacerSolicitud();
    // Configura la ejecución periódica cada 5 segundos
    //setInterval(hacerSolicitud, 1000);
});