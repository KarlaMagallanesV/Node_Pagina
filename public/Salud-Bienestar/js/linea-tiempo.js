(function () {
  "use strict";

  // Función para mostrar/ocultar el contenido de la descripción
  function toggleContenido(index) {
      const descripciones = document.querySelectorAll(".ods-descr");
      const descripcionSeleccionada = document.getElementById(`ods-descr-${index}`);
      
      // Ocultar todas las descripciones excepto la seleccionada
      descripciones.forEach((descr) => {
          if (descr !== descripcionSeleccionada) {
              descr.style.opacity = 0;
              setTimeout(() => {
                  descr.style.display = 'none';
              }, 300);
          }
      });

      // Mostrar la descripción seleccionada
      if (descripcionSeleccionada.style.display !== 'block') {
          descripcionSeleccionada.style.display = 'block';
          setTimeout(() => {
              descripcionSeleccionada.style.opacity = 1;
          }, 10);
      }
  }

  // Asignar la función a los elementos de fecha
  const fechas = document.querySelectorAll(".ods-date");
  fechas.forEach((fecha, index) => {
      fecha.addEventListener('click', () => toggleContenido(index));
  });

  // Código para animar los elementos de la línea de tiempo al entrar en la vista
  const elementosLinea = document.querySelectorAll(".ods-timeline-section li");

  function estaEnVista(el) {
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }

  function animarElementosVisibles() {
      elementosLinea.forEach((elemento) => {
          if (estaEnVista(elemento)) {
              elemento.classList.add("en-vista");
          }
      });
  }

  // Escuchar eventos
  window.addEventListener("load", animarElementosVisibles);
  window.addEventListener("resize", animarElementosVisibles);
  window.addEventListener("scroll", animarElementosVisibles);
})();
