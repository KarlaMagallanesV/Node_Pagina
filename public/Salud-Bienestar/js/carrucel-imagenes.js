document.addEventListener('DOMContentLoaded', function() {
    const carouselWrapper = document.querySelector('.ods-carousel-wrapper');
    let isHovered = false;
    const items = carouselWrapper.querySelectorAll('.ods-carousel-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carouselWrapper.appendChild(clone);
    });

    function startCarousel() {
        if (!isHovered) {
            carouselWrapper.style.animationPlayState = 'running';
        }
    }

    function stopCarousel() {
        carouselWrapper.style.animationPlayState = 'paused';
    }

    carouselWrapper.addEventListener('animationend', function() {
        carouselWrapper.style.animation = 'none';
        carouselWrapper.offsetHeight; 
        carouselWrapper.style.animation = 'scroll 40s linear infinite';
    });

    carouselWrapper.addEventListener('mouseenter', function() {
        isHovered = true;
        stopCarousel();
    });

    carouselWrapper.addEventListener('mouseleave', function() {
        isHovered = false;
        startCarousel();
    });

    startCarousel();
});
