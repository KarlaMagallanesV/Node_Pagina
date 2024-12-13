const darkModeToggle = document.querySelector('.dark-mode');

darkModeToggle.addEventListener('click', () => {
    // Alterna el modo oscuro en el cuerpo
    document.body.classList.toggle('dark-mode-variables');

    // Alterna los íconos de luz y oscuridad
    darkModeToggle.querySelector('span:nth-child(1)').classList.toggle('active');
    darkModeToggle.querySelector('span:nth-child(2)').classList.toggle('active');
});
