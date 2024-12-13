document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las tarjetas
    const cards = document.querySelectorAll('.wrapper-card');
    
    // Añadir evento de clic a cada tarjeta
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Obtener el ID del checkbox correspondiente
            const checkboxId = this.getAttribute('for');
            const checkbox = document.getElementById(checkboxId);
            
            // Desmarcar todos los otros checkboxes y restaurar su tamaño
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                if (cb.id !== checkboxId) {
                    cb.checked = false;
                    const label = document.querySelector(`label[for="${cb.id}"]`);
                    if (label) {
                        label.style.width = '450px';
                        label.style.transition = 'all 0.6s ease';
                    }
                }
            });
            
            // Alternar el estado del checkbox actual y expandir la tarjeta
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                const label = document.querySelector(`label[for="${checkboxId}"]`);
                if (label) {
                    if (checkbox.checked) {
                        label.style.width = '900px';
                        label.style.transition = 'all 0.6s ease';
                    } else {
                        label.style.width = '450px';
                        label.style.transition = 'all 0.6s ease';
                    }
                }
            }
        });
    });
});
