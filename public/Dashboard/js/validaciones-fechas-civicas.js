function validarCampo(campo, regex, mensajeError) {
    const valor = campo.value.trim();
    if (valor === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: `El campo ${campo.id} no puede estar vacío`
        });
        return false;
    }
    if (!regex.test(valor)) {
        Swal.fire({
            icon: 'error',
            title: 'Error de validación',
            text: mensajeError
        });
        return false;
    }
    return true;
}

function validarFecha(campo) {
    const fechaSeleccionada = new Date(campo.value);
    const hoy = new Date();
    
    // Ajustar la hora de ambas fechas a medianoche
    fechaSeleccionada.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
        Swal.fire({
            icon: 'error',
            title: 'Fecha inválida',
            text: 'La fecha no puede ser anterior a hoy'
        });
        return false;
    }
    return true;
}

function validarImagen(campo) {
    const imagen = campo.files[0];
    if (!imagen || !/^image\/(jpeg|png|gif)$/.test(imagen.type)) {
        Swal.fire({
            icon: 'error',
            title: 'Imagen inválida',
            text: 'Por favor, seleccione una imagen válida (JPEG, PNG o GIF)'
        });
        return false;
    }
    return true;
}

const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

document.getElementById('titulo').addEventListener('input', function() {
    validarCampo(this, regexTexto, 'El título solo puede contener letras, vocales con tilde y ñ');
});

document.getElementById('descripcion').addEventListener('input', function() {
    validarCampo(this, regexTexto, 'La descripción solo puede contener letras, vocales con tilde y ñ');
});

document.getElementById('fecha').addEventListener('change', function() {
    validarFecha(this);
});

document.getElementById('imagen').addEventListener('change', function() {
    validarImagen(this);
});

document.getElementById('eventoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const camposValidos = [
        validarCampo(document.getElementById('titulo'), regexTexto, 'El título solo puede contener letras, vocales con tilde y ñ'),
        validarCampo(document.getElementById('descripcion'), regexTexto, 'La descripción solo puede contener letras, vocales con tilde y ñ'),
        validarFecha(document.getElementById('fecha')),
        validarImagen(document.getElementById('imagen'))
    ];
    if (camposValidos.every(Boolean)) {
        this.submit();
    }
});
