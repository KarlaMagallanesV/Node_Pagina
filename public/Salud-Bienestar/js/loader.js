
window.onload = () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');

    // Esperar 3 segundos antes de ocultar el loader
    setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
        }, 1000);
    }, 4000);
};
