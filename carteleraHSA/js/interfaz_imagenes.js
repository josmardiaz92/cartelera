const imgInterfaz = document.querySelector('.img-interfaz');

// Ocultar la imagen al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        imgInterfaz.classList.add('scrolled');
    } else {
        imgInterfaz.classList.remove('scrolled');
    }
});