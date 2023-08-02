// Tiempo de inactividad deseado en milisegundos (por ejemplo, 5 minutos)
const tiempoInactividad = 2000; // 5 minutos en milisegundos
let temporizadorInactividad;

// Función para reiniciar el temporizador
function reiniciarTemporizadorInactividad() {
    clearTimeout(temporizadorInactividad);
    temporizadorInactividad = setTimeout(ventanaInactiva, tiempoInactividad);
}

// Función que se ejecuta cuando la ventana se considera inactiva
function ventanaInactiva() {
    // Aquí puedes realizar acciones cuando la ventana se considera inactiva
    console.log('La ventana está inactiva.');
}

// Eventos que indican la interacción del usuario
window.addEventListener('mousemove', reiniciarTemporizadorInactividad);
window.addEventListener('keydown', reiniciarTemporizadorInactividad);
window.addEventListener('click', reiniciarTemporizadorInactividad);
// Agrega más eventos según sea necesario, dependiendo de qué interacciones deseas rastrear.

// Iniciar el temporizador cuando se carga la página
reiniciarTemporizadorInactividad();
