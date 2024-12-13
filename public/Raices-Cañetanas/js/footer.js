// Agregar animación de rotación al hacer clic en los iconos
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Agregar la clase de animación al ícono
        icon.classList.add('rotate-animation');

        // Quitar la clase después de 1 segundo para permitir múltiples clics
        setTimeout(() => {
            icon.classList.remove('rotate-animation');
        }, 1000);

        alert('¡Redirigiendo a nuestra red social!');
    });
});
