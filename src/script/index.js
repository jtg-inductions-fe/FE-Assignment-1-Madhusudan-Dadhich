import Splide from '@splidejs/splide';
import '@splidejs/splide/css'; // Carousel library import
import '../styles/main.scss';

// Utilities

/**
 * Function to toggle hamburger state - active or inactive
 */
const toggleHamburger = () => {
    navbar.classList.toggle('active');
    authWrapper.classList.toggle('active');
};

/**
 * Function to add styling to sticky header
 */
const activeNav = () => {
    header.classList[window.scrollY > 40 ? 'add' : 'remove']('active');
    if (
        navbar.classList.contains('active') &&
        authWrapper.classList.contains('active')
    ) {
        toggleHamburger();
    }
};

// Navbar Hamburger Toggle
const navbar = document.getElementById('header-navlinks');
const authWrapper = document.getElementById('header-authlinks');
const navbarToggler = document.getElementById('header-nav-toggler');

// handle nav menu states
window.addEventListener('click', (e) => {
    if (e.target == navbarToggler.children[0]) {
        toggleHamburger();
    } else {
        if (
            navbar.classList.contains('active') &&
            authWrapper.classList.contains('active')
        ) {
            toggleHamburger();
        }
    }
});

// Sticky Header
const header = document.getElementById('header-navbar');

window.addEventListener('scroll', activeNav);

// Splide Carousel
new Splide('.splide').mount();
