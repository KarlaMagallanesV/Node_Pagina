AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

function toggleTheme() {
    document.body.classList.toggle('neon-mode');
    const themeIcon = document.querySelector('.theme-toggle i');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
    
    const isDarkMode = document.body.classList.contains('neon-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('neon-mode');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }
    
    cargarEventos();
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    
    if(navLinks.classList.contains('active')) {
        navLinks.style.animation = 'slideIn 0.3s forwards';
    } else {
        navLinks.style.animation = 'slideOut 0.3s forwards';
    }
}

async function cargarEventos() {
    try {
        const response = await fetch('/Salud-Bienestar/php/eventos.php');
        if (!response.ok) {
            throw new Error('Error al cargar los eventos');
        }
        const responseText = await response.text();
        
        const jsonMatch = responseText.match(/\{.*\}|\[.*\]/s);
        if (!jsonMatch) {
            throw new Error('No se encontró JSON válido en la respuesta');
        }
        
        const eventos = JSON.parse(jsonMatch[0]);
        mostrarEventos(eventos);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar los eventos: ' + error.message
        });
    }
}

document.getElementById('eventoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(this);
        
        const titulo = formData.get('titulo');
        const fecha = formData.get('fecha');
        const imagen = formData.get('imagen');
        
        if(titulo.length < 3) {
            throw new Error('El título debe tener al menos 3 caracteres');
        }
        
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        if(fechaSeleccionada < hoy) {
            throw new Error('Solo puedes seleccionar fechas desde hoy en adelante');
        }
        
        if(imagen.size > 5000000) {
            throw new Error('La imagen no debe superar los 5MB');
        }

        const response = await fetch('/Salud-Bienestar/php/eventos.php', {
            method: 'POST',
            body: formData
        });

        const responseText = await response.text();
        
        const jsonMatch = responseText.match(/\{.*\}/s);
        if (!jsonMatch) {
            throw new Error('No se encontró JSON válido en la respuesta');
        }
        
        let jsonData;
        try {
            jsonData = JSON.parse(jsonMatch[0]);
        } catch (e) {
            console.error('Respuesta del servidor:', responseText);
            throw new Error('Error al procesar la respuesta del servidor');
        }

        if (!response.ok) {
            throw new Error(`Error en el servidor: ${jsonData.error || responseText}`);
        }

        if (jsonData.error) {
            throw new Error(jsonData.error);
        }

        document.getElementById('eventos-container').innerHTML = '';
        await cargarEventos();
        
        this.reset();
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: '¡Evento agregado con éxito!'
        });
        
    } catch(error) {
        console.error('Error completo:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        });
    } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

function mostrarEventos(eventos) {
    const container = document.getElementById('eventos-container');
    
    eventos.forEach(evento => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.dataset.aos = 'fade-up';
        
        const fecha = new Date(evento.fecha).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const imagenUrl = evento.imagen ? `/${evento.imagen}` : '/assets/img/default-event.jpg';
        
        card.innerHTML = `
            <h3>${evento.titulo}</h3>
            <p class="descripcion">${evento.descripcion || 'Sin descripción'}</p>
            <p class="fecha">${fecha}</p>
            <img src="${imagenUrl}" alt="${evento.titulo}" 
                 onerror="this.src='/assets/img/default-event.jpg'"
                 style="max-width: 100%; height: auto;">
        `;
        container.appendChild(card);
    });
}

function mostrarNotificacion(mensaje, tipo) {
    Swal.fire({
        icon: tipo,
        title: tipo === 'success' ? 'Éxito' : 'Error',
        text: mensaje,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}