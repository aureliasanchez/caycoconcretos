window.onscroll = function() {
    addStickyClass();
};

var navbar = document.querySelector('.mil-top-panel');
var sticky = navbar.offsetTop;

function addStickyClass() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mil-menu-btn');
    const navigation = document.querySelector('.mil-navigation');
    const hasChildrenItems = document.querySelectorAll('.mil-has-children');

    // Toggle menu on button click
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('mil-active');
        navigation.classList.toggle('mil-active');
    });

    // Handle submenu toggling on mobile
    hasChildrenItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('ul');

        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 1200) {
                e.preventDefault();
                submenu.classList.toggle('mil-active');
                
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
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1200) {
            hasChildrenItems.forEach(item => {
                const submenu = item.querySelector('ul');
                submenu.classList.remove('mil-active');
                submenu.style.maxHeight = null;
            });
        }
    });
});



// Seleccionamos el elemento de la barra de progreso
const progressBar = document.querySelector('.mil-progress');
    
// Función que actualiza la barra de progreso al hacer scroll
function updateProgressOnScroll() {
    // La altura total del documento menos la altura de la ventana visible
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Cuánto ha sido desplazado
    const scrollTop = window.scrollY;

    // Calculamos el porcentaje del scroll
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Ajustamos la altura de la barra de progreso según el porcentaje de scroll
    progressBar.style.height = scrollPercentage + "%";
}

// Escuchamos el evento de desplazamiento (scroll) y llamamos a la función
window.addEventListener('scroll', updateProgressOnScroll);




