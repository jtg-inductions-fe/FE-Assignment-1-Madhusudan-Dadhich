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
const navbar = document.querySelector('[data-navbar]');
const authWrapper = document.querySelector('[data-auth]');
const navbarToggler = document.querySelector('[data-navbar-toggler]');

navbarToggler.addEventListener('click', toggleHamburger);

// Sticky Header
const header = document.querySelector('[data-header]');

window.addEventListener('scroll', () => {
    header.classList[window.scrollY > 50 ? 'add' : 'remove']('active');
    if (
        navbar.classList.contains('active') ||
        authWrapper.classList.contains('active')
    ) {
        toggleHamburger();
    }
});
