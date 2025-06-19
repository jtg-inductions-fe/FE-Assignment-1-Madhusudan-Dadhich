import '../styles/main.scss';

// Utilities

/**
 * Function to toggle hamburger state - active or inactive
 */
const toggleHamburger = () => {
    navbar.classList.toggle('active');
    authWrapper.classList.toggle('active');
};

// Navbar Hamburger Toggle
const navbar = document.getElementById('header-navlinks');
const authWrapper = document.getElementById('header-authlinks');
const navbarToggler = document.getElementById('header-nav-toggler');

navbarToggler.addEventListener('click', toggleHamburger);

// Sticky Header
const header = document.getElementById('header-navbar');

window.addEventListener('scroll', () => {
    header.classList[window.scrollY > 0 ? 'add' : 'remove']('active');
    if (
        navbar.classList.contains('active') &&
        authWrapper.classList.contains('active')
    ) {
        toggleHamburger();
    }
});
