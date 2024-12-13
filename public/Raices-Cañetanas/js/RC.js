// Seleccionar los elementos del menú
const menuItems = document.querySelectorAll('.nav-link');

// Animación de hover con escalado
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1)';
        item.style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Animación suave al abrir el submenu
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseover', () => {
        const submenu = dropdown.querySelector('.submenu');
        submenu.style.opacity = '1';
        submenu.style.visibility = 'visible';
        submenu.style.transform = 'translateY(0)';
    });

    dropdown.addEventListener('mouseout', () => {
        const submenu = dropdown.querySelector('.submenu');
        submenu.style.opacity = '0';
        submenu.style.visibility = 'hidden';
        submenu.style.transform = 'translateY(10px)';
    });
});
