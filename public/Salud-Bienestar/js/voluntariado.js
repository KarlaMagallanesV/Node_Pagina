
const swiper = new Swiper(".swiper-container", {
    
    // Configura la dirección de desplazamiento en vertical
    direction: "vertical",
    
    // Aplica el efecto "fade" (desvanecimiento) en la transición de las diapositivas
    effect: "fade",
    
    // Configura la velocidad de la animación de la transición
    speed: 5000,
    
    // Habilita la opción de que  se reproduzca en bucle, es decir, vuelve al inicio cuando llega al final
    loop: true,
    
    // Los puntos de navegación
    pagination: {
        // Selecciona el elemento con clase .swiper-pagination para usarlo como paginación
        el: ".swiper-pagination",
        
        // Permite que los puntos de la paginación sean clicables
        clickable: true,
    },
    
    // Configuración del uso de la rueda del ratón para navegar entre las diapositivas
    mousewheel: {
        // Invertir el sentido del scroll de la rueda (false significa comportamiento normal)
        invert: false,
        
        // Evita que el movimiento horizontal interfiera con el scroll vertical
        forceToAxis: false,
        
        // Sensibilidad mínima para que se registre el desplazamiento
        thresholdDelta: 50,
        
        // Sensibilidad del desplazamiento de la rueda del ratón (1 es el valor predeterminado)
        sensitivity: 1,
    },
    
    // Escucha eventos que ocurren en el swiper
    on: {
        // Evento que se activa cuando cambia la diapositiva
        slideChange: function () {
            
            // Recorre todas las diapositivas
            this.slides.forEach((slide) => {
                // Selecciona el elemento con clase .background dentro de cada diapositiva
                let background = slide.querySelector(".background");
                
                // Si se encuentra el fondo, se le quita la clase 'animation' (se detiene la animación)
                if (background) {
                    background.classList.remove("animation");
                }
            });
            
            // Selecciona la diapositiva activa (la que está visible actualmente)
            let activeSlide = this.slides[this.activeIndex];
            
            // Busca el elemento con clase .background en la diapositiva activa
            let background = activeSlide.querySelector(".background");
            
            // Si el fondo existe, añade la clase 'animation' para iniciar la animación
            if (background) {
                background.classList.add("animation");
            }
        },
    },
});
