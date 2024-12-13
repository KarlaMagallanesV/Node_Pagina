// Animación para mostrar las secciones cuando se hace scroll
window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('.section');
    let scrollTop = window.scrollY;
    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        if (scrollTop > sectionTop - window.innerHeight / 1.3) {
            section.classList.add('active');
        }
    });
});