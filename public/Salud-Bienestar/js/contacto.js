// Validaciones en tiempo real
document.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("input", () => validateField(field)); 
    field.addEventListener("blur", () => validateField(field));  
});

function validateField(field) {
    const errorSpan = field.nextElementSibling;
    let isValid = true;

    // Validaciones específicas para cada campo
    switch(field.id) {
        case "nombres":
        case "apellidos":
            isValid = /^[A-Za-záéíóúñÑ\s]+$/.test(field.value);
            errorSpan.innerText = isValid ? "" : "Solo se aceptan letras";
            break;
        case "gmail":
            if (field.value.trim() === "") {
                hideError(field, errorSpan);
                return true;
            }
            isValid = field.value.endsWith("@gmail.com");
            errorSpan.innerText = isValid ? "" : "El correo debe finalizar con @gmail.com";
            break;
        case "tipoDocumento":
            isValid = field.value !== "";
            errorSpan.innerText = isValid ? "" : "Selecciona un tipo de documento";
            break;
        case "numeroDocumento":
            const tipoDocumento = document.getElementById("tipoDocumento").value;
            isValid = tipoDocumento === "CE" ? /^[0-9]{20}$/.test(field.value) : /^[0-9]{8}$/.test(field.value);
            errorSpan.innerText = isValid ? "" : `Número debe tener ${tipoDocumento === "CE" ? "20" : "8"} dígitos`;
            break;
        case "edad":
            const edadValue = parseInt(field.value);
            isValid = edadValue >= 18 && !isNaN(edadValue);
            errorSpan.innerText = isValid ? "" : "La edad debe ser mayor o igual a 18";
            break;
        case "telefono":
            isValid = /^9\d{8}$/.test(field.value);
            errorSpan.innerText = isValid ? "" : "Teléfono debe empezar con 9 y tener 9 dígitos";
            break;
        case "direccion":
        case "mensaje":
            isValid = field.value.trim() !== "";
            errorSpan.innerText = isValid ? "" : `El ${field.id} no puede estar vacío`;
            break;
    }

    isValid ? hideError(field, errorSpan) : showError(field, errorSpan);
    return isValid;
}

function showError(field, errorSpan) {
    errorSpan.style.display = "block";
    errorSpan.style.color = "red";
    field.classList.add("border-red-500");
    field.classList.remove("border-green-500");
}

function hideError(field, errorSpan) {
    errorSpan.style.display = "none";
    field.classList.remove("border-red-500");
    field.classList.add("border-green-500");
}

function submitForm(event) {
    event.preventDefault();
    const fields = document.querySelectorAll("input, select, textarea");
    const formValid = Array.from(fields).every(validateField);

    if (formValid) {
        Swal.fire({
            title: '¡Formulario Enviado!',
            text: 'Formulario enviado correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'swal2-popup'
            },
            timer: 2000,
            timerProgressBar: true
        });
        document.getElementById("contactForm").reset();
        document.getElementById("contactFormRight").reset();
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, corrige los errores en el formulario antes de enviarlo.',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'swal2-popup'
            },
            timer: 2000,
            timerProgressBar: true
        });
    }
}
