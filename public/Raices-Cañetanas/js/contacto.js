document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    
    // Validaciones
    const validateFirstName = (value) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value);
    const validateLastName = (value) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value);
    const validateEmail = (value) => /^[^\s@]+@gmail\.com$/.test(value);
    const validatePhone = (value) => /^9\d{8}$/.test(value);
    const validateMessage = (value) => value.trim() !== "";

    // Elementos de entrada
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    // Función para mostrar mensajes de error
    const showError = (input, message) => {
        const errorSpan = document.getElementById(`${input.id}Error`);
        errorSpan.innerText = message;
        input.classList.add("invalid");
        input.classList.remove("valid");
    };

    // Función para ocultar mensajes de error
    const hideError = (input) => {
        const errorSpan = document.getElementById(`${input.id}Error`);
        errorSpan.innerText = "";
        input.classList.add("valid");
        input.classList.remove("invalid");
    };

    // Validaciones en tiempo real
    firstNameInput.addEventListener("input", function() {
        if (!validateFirstName(this.value)) {
            showError(this, "El nombre solo debe contener letras y espacios.");
        } else {
            hideError(this);
        }
    });

    lastNameInput.addEventListener("input", function() {
        if (!validateLastName(this.value)) {
            showError(this, "El apellido solo debe contener letras y espacios.");
        } else {
            hideError(this);
        }
    });

    emailInput.addEventListener("input", function() {
        if (!validateEmail(this.value)) {
            showError(this, "El correo debe ser un Gmail y no puede contener espacios.");
        } else {
            hideError(this);
        }
    });

    phoneInput.addEventListener("input", function() {
        if (!validatePhone(this.value)) {
            showError(this, "El teléfono debe comenzar con 9 y tener 9 dígitos.");
        } else {
            hideError(this);
        }
    });

    messageInput.addEventListener("input", function() {
        if (!validateMessage(this.value)) {
            showError(this, "El mensaje no puede estar vacío.");
        } else {
            hideError(this);
        }
    });

    // Enviar el formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Validar todos los campos antes de enviar
        const isValid = [
            validateFirstName(firstNameInput.value),
            validateLastName(lastNameInput.value),
            validateEmail(emailInput.value),
            validatePhone(phoneInput.value),
            validateMessage(messageInput.value)
        ].every(v => v === true);

        if (isValid) {
            // Muestra un mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Enviado!',
                text: 'Tu mensaje ha sido enviado exitosamente.',
                confirmButtonText: 'Aceptar'
            });
            form.reset(); // Resetea el formulario
        } else {
            // Si hay errores, mostrar un mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, corrige los errores en el formulario.',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});
