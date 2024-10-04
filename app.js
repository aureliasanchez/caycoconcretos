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