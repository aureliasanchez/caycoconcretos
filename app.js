window.onscroll = function () {
  addStickyClass();
};

var navbar = document.querySelector(".mil-top-panel");
var sticky = navbar.offsetTop;

function addStickyClass() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".mil-menu-btn");
  const navigation = document.querySelector(".mil-navigation");
  const hasChildrenItems = document.querySelectorAll(".mil-has-children");

  // Toggle menu on button click
  menuBtn.addEventListener("click", function () {
    this.classList.toggle("mil-active");
    navigation.classList.toggle("mil-active");
  });

  // Handle submenu toggling on mobile
  hasChildrenItems.forEach((item) => {
    const link = item.querySelector("a");
    const submenu = item.querySelector("ul");

    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 1200) {
        e.preventDefault();
        submenu.classList.toggle("mil-active");

        // Toggle max-height for smooth animation
        if (submenu.style.maxHeight) {
          submenu.style.maxHeight = null;
        } else {
          submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
      }
    });
  });

  // Reset submenus on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200) {
      hasChildrenItems.forEach((item) => {
        const submenu = item.querySelector("ul");
        submenu.classList.remove("mil-active");
        submenu.style.maxHeight = null;
      });
    }
  });
});

// Seleccionamos el elemento de la barra de progreso
const progressBar = document.querySelector(".mil-progress");

// Función que actualiza la barra de progreso al hacer scroll
function updateProgressOnScroll() {
  // La altura total del documento menos la altura de la ventana visible
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  // Cuánto ha sido desplazado
  const scrollTop = window.scrollY;

  // Calculamos el porcentaje del scroll
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  // Ajustamos la altura de la barra de progreso según el porcentaje de scroll
  progressBar.style.height = scrollPercentage + "%";
}

// Escuchamos el evento de desplazamiento (scroll) y llamamos a la función
window.addEventListener("scroll", updateProgressOnScroll);

/*Mis JS
---------------------------------------
---------------------------------------
---------------------------------------
*/

/* 
Baner de opciones
---------------------------------------
---------------------------------------
---------------------------------------
 */

document.addEventListener("DOMContentLoaded", function () {
  const opcionIzquierda = document.getElementById("opcion-izquierda");
  const opcionDerecha = document.getElementById("opcion-derecha");
  const opcionesIzquierda = document.getElementById("opciones-izquierda");
  const opcionesDerecha = document.getElementById("opciones-derecha");

  // Debug para verificar que los elementos se encuentran
  console.log("Elementos principales:", {
    opcionIzquierda: opcionIzquierda,
    opcionDerecha: opcionDerecha,
    opcionesIzquierda: opcionesIzquierda,
    opcionesDerecha: opcionesDerecha,
  });

  // Obtener las opciones secundarias separadas por lado
  const opcionesSecundariasIzquierda =
    opcionesIzquierda?.querySelectorAll(".opcion-secundaria") || [];
  const opcionesSecundariasDerecha =
    opcionesDerecha?.querySelectorAll(".opcion-secundaria") || [];

  // Debug para verificar las opciones secundarias
  console.log("Cantidad de opciones secundarias:", {
    izquierda: opcionesSecundariasIzquierda.length,
    derecha: opcionesSecundariasDerecha.length,
  });

  // Verificar que los event listeners se están agregando
  if (opcionIzquierda) {
    opcionIzquierda.addEventListener("click", function () {
      console.log("Click en opción izquierda");
      opcionesDerecha.style.display = "none";
      opcionesIzquierda.style.display =
        opcionesIzquierda.style.display === "none" ? "flex" : "none";
      ocultarTodasLasListas();
    });
  }

  if (opcionDerecha) {
    opcionDerecha.addEventListener("click", function () {
      console.log("Click en opción derecha");
      opcionesIzquierda.style.display = "none";
      opcionesDerecha.style.display =
        opcionesDerecha.style.display === "none" ? "flex" : "none";
      ocultarTodasLasListas();
    });
  }

  function ocultarTodasLasListas() {
    document.querySelectorAll(".lista-elementos").forEach((lista) => {
      lista.style.display = "none";
    });
  }

  // Manejar opciones secundarias izquierdas
  opcionesSecundariasIzquierda.forEach((opcion, index) => {
    console.log("Agregando evento a opción izquierda:", index + 1);
    opcion.addEventListener("click", function (e) {
      console.log("Click en opción secundaria izquierda:", index + 1);
      e.preventDefault();
      ocultarTodasLasListas();
      const listaCorrespondiente = document.getElementById(
        `lista-opcion-${index + 1}`
      );
      console.log("Lista correspondiente:", listaCorrespondiente);
      if (listaCorrespondiente) {
        listaCorrespondiente.style.display = "block";
      }
    });
  });

  // Manejar opciones secundarias derechas
  opcionesSecundariasDerecha.forEach((opcion, index) => {
    console.log("Agregando evento a opción derecha:", index + 4);
    opcion.addEventListener("click", function (e) {
      console.log("Click en opción secundaria derecha:", index + 4);
      e.preventDefault();
      ocultarTodasLasListas();
      const listaCorrespondiente = document.getElementById(
        `lista-opcion-${index + 4}`
      );
      console.log("Lista correspondiente:", listaCorrespondiente);
      if (listaCorrespondiente) {
        listaCorrespondiente.style.display = "block";
      }
    });
  });

  // Manejar clics en los elementos de la lista
  document.querySelectorAll(".elemento-lista").forEach((elemento) => {
    elemento.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        window.location.href = href;
      }
    });
  });
});

/* 
Carrucel de img
---------------------------------------
---------------------------------------
---------------------------------------
*/

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('carruselTrack');
    const toggleButton = document.getElementById('toggleViewButton'); // Botón para alternar vistas
    if (!track || !toggleButton) return;

    const slides = Array.from(track.children);
    let isPaused = false;
    let isTouching = false;
    let animationId = null;
    let lastTime = 0;
    const VELOCITY = 1.5;
    let resumeTimeout;
    let isListView = false; // Estado inicial: carrusel

    // Detectar si es dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    function getSlideWidth() {
        const slide = slides[0];
        const style = window.getComputedStyle(slide);
        return slide.offsetWidth + parseInt(style.marginRight || 0) + parseInt(style.marginLeft || 0) + 30;
    }

    function moveSlide(timestamp) {
        if (!lastTime) lastTime = timestamp;
        lastTime = timestamp;

        // Detener si está en hover (desktop) o tocando (móvil)
        if ((isMobile && isTouching) || (!isMobile && isPaused)) {
            animationId = requestAnimationFrame(moveSlide);
            return;
        }

        const currentTransform = getComputedStyle(track).transform;
        let currentX = 0;
        if (currentTransform !== 'none') {
            currentX = parseFloat(currentTransform.split(',')[4]) || 0;
        }

        currentX -= VELOCITY;
        track.style.transform = `translateX(${currentX}px)`;

        const slideWidth = getSlideWidth();
        if (currentX <= -slideWidth) {
            const firstSlide = track.firstElementChild;
            track.appendChild(firstSlide);
            track.style.transform = `translateX(${currentX + slideWidth}px)`;
        }

        animationId = requestAnimationFrame(moveSlide);
    }

    // Función para programar la reanudación después de 1 segundo
    function startResumeTimeout() {
        if (resumeTimeout) clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            isPaused = false;
            isTouching = false;
        }, 1000);
    }

    if (isMobile) {
        // Comportamiento móvil - touch
        track.addEventListener('touchstart', () => {
            isTouching = true;
            if (resumeTimeout) clearTimeout(resumeTimeout);
        }, { passive: true });

        track.addEventListener('touchend', () => {
            startResumeTimeout();
        }, { passive: true });
    } else {
        // Comportamiento desktop - hover
        track.addEventListener('mouseenter', () => {
            isPaused = true;
            if (resumeTimeout) clearTimeout(resumeTimeout);
        });

        track.addEventListener('mouseleave', () => {
            startResumeTimeout();
        });
    }

    // Alternar entre carrusel y vista de lista
    toggleButton.addEventListener('click', function () {
        isListView = !isListView; // Alternar estado

        if (isListView) {
            // Cambiar a vista de lista
            track.classList.add('carrusel-lista');
            track.style.transform = 'none'; // Desactiva el movimiento
            cancelAnimationFrame(animationId); // Detener animación
            toggleButton.textContent = 'Cambiar a Carrusel';
        } else {
            // Cambiar a vista de carrusel
            track.classList.remove('carrusel-lista');
            moveSlide(performance.now()); // Reiniciar animación
            toggleButton.textContent = 'Cambiar a Lista';
        }
    });

    // Iniciar la animación
    moveSlide(performance.now());

    // Ajustar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        lastTime = 0;
        track.style.transform = 'translateX(0)';
        moveSlide(performance.now());
    });
});