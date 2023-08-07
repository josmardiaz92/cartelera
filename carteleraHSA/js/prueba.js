/* // Selecciona la imagen que deseas observar
const imageToObserve = document.querySelector('.image-to-observe');

// Opciones de la API Intersection Observer
const options = {
  root: null, // El viewport será el área de observación
  threshold: 0.5 // Cuando al menos el 50% de la imagen es visible, se disparará la notificación
};

// Crear el Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // entry.isIntersecting será true si la imagen es visible
    if (entry.isIntersecting) {
      console.log('La imagen es visible en el viewport');
      // Aquí puedes realizar las acciones que desees cuando la imagen es visible
    } else {
      console.log('La imagen ya no es visible en el viewport');
      // Aquí puedes realizar las acciones que desees cuando la imagen ya no es visible
    }
  });
}, options);

// Observar la imagen
observer.observe(imageToObserve); */

/* const activeItem = document.querySelector('.carousel-item.active');
const activeItemIndex = activeItem.index;
console.log(activeItem) */

/* const activeItem = document.querySelector('.carousel-item.active');
const carouselInner = document.querySelector('.carousel-inner');
const children = carouselInner.children;
//const activeItemIndex = children.indexOf(activeItem);

console.log(carouselInner,children);
//console.log(activeItemIndex); */

/* const carouselInner = document.querySelector('.carousel-inner');
const children = carouselInner.querySelectorAll('.carousel-item');
for (let i = 0; i < children.length; i++) {
  const child = children[i];
  console.log(child );
} */

//TODO con esto puedo saber donde esta el video en el carrousel
/* let activeItem = document.querySelector('.carousel-item.active');
const carouselInner = document.querySelector('.carousel-inner');
let children = Array.from(carouselInner.children);
let activeItemIndex = children.indexOf(activeItem);

console.log(carouselInner, children, activeItemIndex);

activeItem = document.querySelector('.carousel-item.active');
children = Array.from(carouselInner.children);
activeItemIndex = children.indexOf(activeItem);

console.log(carouselInner, children, activeItemIndex); */

const carouselItems = document.querySelectorAll('.carousel-item');
const options = {
  threshold: 0.5, // La fracción del elemento que debe ser visible para activar la reproducción
};

function handleIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const video = entry.target.querySelector('video');
      if (video && video.paused) {
        video.play();
      }
    } else {
      const video = entry.target.querySelector('video');
      if (video && !video.paused) {
        video.pause();
      }
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, options);

carouselItems.forEach((item) => {
  observer.observe(item);
});
