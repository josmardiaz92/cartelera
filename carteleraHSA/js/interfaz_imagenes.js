const imgInterfaz = document.querySelector('.img-interfaz');
const buscar=document.getElementById('buscar');
const btnBuscar=document.getElementById('btnBuscar');
let buscando=false;

// Ocultar la imagen al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        imgInterfaz.classList.add('scrolled');
    } else {
        imgInterfaz.classList.remove('scrolled');
    }
});

function desaparecer() {
    buscar.classList.remove("ver");
    buscar.classList.add("no-ver");
    buscando=false;
    setTimeout(() => {
        buscar.classList.add("d-none");
    }, 550);
}
function aparecer() {
    buscar.classList.remove("no-ver");
    buscar.classList.add("ver");
    buscando=true
    setTimeout(() => {
        buscar.classList.remove("d-none");
    }, 20);
}

btnBuscar.addEventListener('click',()=>{
    let verInput=buscando ? desaparecer() : aparecer();
    })