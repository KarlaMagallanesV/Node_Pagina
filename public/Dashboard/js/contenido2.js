window.onload = function() {
    const images = document.querySelectorAll('.img-disco');
    
    images.forEach((img, index) => {
        img.style.transitionDelay = `${index * 100}ms`; // retraso de transición
        img.classList.add('animate');
    });
};

// Animación para las imágenes al cargarse
const style = document.createElement('style');
style.textContent = `
.img-disco.animate {
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);
