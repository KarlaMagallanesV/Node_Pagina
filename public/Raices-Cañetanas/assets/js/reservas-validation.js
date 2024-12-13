document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const dateInput = form.querySelector('input[name="reservation-date"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^9\d{8}$/;

    function showError(input, message) {
        input.classList.add('error');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
    }

    function clearError(input) {
        input.classList.remove('error');
    }

    nameInput.addEventListener('input', function() {
        if (!nameRegex.test(this.value)) {
            showError(this, 'El nombre solo puede contener letras, vocales con tilde y ñ');
        } else {
            clearError(this);
        }
    });

    phoneInput.addEventListener('input', function() {
        if (this.value.length > 0 && this.value[0] !== '9') {
            showError(this, 'El teléfono debe comenzar con 9');
        } else if (this.value.length > 9) {
            showError(this, 'El teléfono debe tener 9 dígitos');
        } else {
            clearError(this);
        }
    });

    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showError(this, 'No puedes seleccionar una fecha pasada');
        } else {
            clearError(this);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!nameInput.value || !phoneInput.value || !dateInput.value || !messageInput.value) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios'
            });
            return;
        }

        if (nameRegex.test(nameInput.value) && phoneRegex.test(phoneInput.value)) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Tu reserva ha sido enviada correctamente'
            }).then(() => {
                form.submit();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, corrige los errores en el formulario'
            });
        }
    });
});
