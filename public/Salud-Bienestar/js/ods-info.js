// JavaScript para el carrusel
const slides = document.querySelectorAll('.ds-slide');
let currentIndex = 0;

// Función para mostrar solo la tarjeta activa
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
}

// Inicia el carrusel automático
function startCarousel() {
    showSlide(currentIndex);
    currentIndex = (currentIndex + 1) % slides.length;
}

// Configura el intervalo para rotar las imágenes
let interval = setInterval(startCarousel, 2000);

// Pausar el carrusel al pasar el mouse
slides.forEach(slide => {
    slide.addEventListener('mouseover', () => clearInterval(interval));
    slide.addEventListener('mouseout', () => interval = setInterval(startCarousel, 2000));
});

// Inicializa el carrusel
startCarousel();



