function ampliarImagen(url) {
    const modal = document.getElementById("imageModal");
    const imgAmpliada = document.getElementById("imgAmpliada");
    
    imgAmpliada.src = url;
    modal.style.display = "block";
}

function cerrarImagen() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        cerrarImagen();
    }
}

function compartirVideo(url) {
    if (navigator.share) {
        navigator.share({
            title: 'Video sobre ODS 3',
            text: 'Mira este video sobre Salud y Bienestar - ODS 3.',
            url: url
        }).then(() => {
            console.log('Video compartido exitosamente');
        }).catch((error) => {
            console.error('Error al compartir:', error);
        });
    } else {
        alert('Tu navegador no soporta la función de compartir. Intenta copiar el enlace manualmente.');
    }
}

function descargarVideo(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'video_ods3.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function() {
    const compartirBotones = document.querySelectorAll('.ods-icono[onclick^="compartir"]');
    const descargarBotones = document.querySelectorAll('.ods-icono[href^="https://www.youtube.com"]');

    compartirBotones.forEach(boton => {
        boton.onclick = function(event) {
            event.preventDefault();
            const url = this.closest('.ods-video-elemento').querySelector('iframe').src;
            compartirVideo(url);
        };
    });

    descargarBotones.forEach(boton => {
        boton.onclick = function(event) {
            event.preventDefault();
            const url = this.href;
            descargarVideo(url);
        };
    });
});


// ------------------------------------------------------------------------------

// Mapa interactivo

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa
    var map = L.map('ods-map').setView([-12.04318, -77.02824], 13);

    // Añadir capa de mapa desde OpenStreetMap con estilo personalizado
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Estilo personalizado para los marcadores
    var customIcon = L.icon({
        iconUrl: 'ruta/a/tu/icono-personalizado.png',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });

    // Añadir marcadores con estilo personalizado
    var marker1 = L.marker([-12.04318, -77.02824], {icon: customIcon}).addTo(map);
    marker1.bindPopup("<b>Ubicación de ejemplo</b><br>Lima, Perú").openPopup();

    var marker2 = L.marker([-12.04535, -77.03129], {icon: customIcon}).addTo(map);
    marker2.bindPopup("<b>Ubicación adicional</b><br>Ejemplo en el mapa.");

    // Efecto de brillo
    function addMapGlow() {
        var glowOverlay = L.DomUtil.create('div', 'map-glow-overlay');
        map.getPanes().overlayPane.appendChild(glowOverlay);
    }
    addMapGlow();

    // Animación del título
    function animateTitulo() {
        var titulo = document.querySelector('.mapa-interactivo h2');
        if (titulo) {
            titulo.style.animation = 'tituloAnimado 2s ease-in-out infinite';
        }
    }
    animateTitulo();

    // Efecto hover en el mapa
    var mapContainer = document.getElementById('ods-map');
    mapContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
    });
    mapContainer.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });

    // Ajuste responsivo
    function adjustMapForMobile() {
        if (window.innerWidth <= 768) {
            mapContainer.style.height = '400px';
            mapContainer.style.borderWidth = '8px';
        } else {
            mapContainer.style.height = '600px';
            mapContainer.style.borderWidth = '12px';
        }
    }
    window.addEventListener('resize', adjustMapForMobile);
    adjustMapForMobile();
});


// ------------------------------------------------------------------------------
// Funciones para la galería de imágenes
function ampliarImagen(src) {
    const modal = document.getElementById('ods-imageModal');
    const imgAmpliada = document.getElementById('ods-imgAmpliada');
    modal.style.display = "block";
    imgAmpliada.src = src;
}

function cerrarImagen() {
    const modal = document.getElementById('ods-imageModal');
    modal.style.display = "none";
}

// Cerrar modal al hacer click fuera de la imagen
window.onclick = function(event) {
    const modal = document.getElementById('ods-imageModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Función para compartir en redes sociales
function compartir(imgUrl) {
    // Obtener URL completa de la imagen
    const urlCompleta = window.location.origin + imgUrl;
    
    // Configurar opciones de compartir
    const shareData = {
        title: 'Compartir imagen',
        text: '¡Mira esta imagen!',
        url: urlCompleta
    };

    // Usar Web Share API si está disponible
    if (navigator.share) {
        navigator.share(shareData)
            .catch((error) => console.log('Error compartiendo:', error));
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const redes = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlCompleta)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlCompleta)}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(urlCompleta)}`
        };

        // Abrir ventana para compartir
        window.open(redes.facebook, '_blank', 'width=600,height=400');
    }
}
