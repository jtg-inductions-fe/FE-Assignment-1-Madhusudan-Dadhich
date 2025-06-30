import Splide from '@splidejs/splide';
import '@splidejs/splide/css'; // Carousel library import
import '../styles/main.scss';

// Utilities

// Email Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Function to toggle hamburger state - active or inactive
 */
const toggleHamburger = () => {
    navbar.classList.toggle('active');
    authWrapper.classList.toggle('active');
};

/**
 * Function to check for valid email
 */
const checkEmail = (e) => {
    e.preventDefault();
    const email = emailInput.value;

    if (email == '' || !emailRegex.test(email)) {
        emailWrapper.classList.add('input__text--error');
    } else {
        emailWrapper.classList.remove('input__text--error');
    }
};

/**
 * Function to handle toggling of Accordion
 */
const toggleAccordion = (e) => {
    let element = e.target;
    if (element != null) {
        if (element.parentElement.classList.contains('footer__nav-title')) {
            element = element.parentElement;
        }

        if (
            element.parentElement.classList.contains('open') &&
            element.nextElementSibling != null &&
            element.nextElementSibling.classList.contains('open')
        ) {
            element.nextElementSibling.classList.remove('open');
            element.parentElement.classList.remove('open');
        } else {
            if (element.nextElementSibling != null) {
                element.nextElementSibling.classList.add('open');
                element.parentElement.classList.add('open');
            }
        }
    }
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

const handleTestimonialTabIndex = () => {
    if (window.screen.availWidth < 1024) {
        testimonialNavPrev.removeAttribute('tabindex');
        testimonialNavNext.removeAttribute('tabindex');
    } else {
        testimonialNavPrev.setAttribute('tabindex', 15);
        testimonialNavNext.setAttribute('tabindex', 16);
    }
};

// Page Loader
const pageLoader = document.getElementById('overlay-loader');

window.onload = () => {
    pageLoader.classList.add('loaded');
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

// Validate Email
const emailWrapper = document.getElementById('newsletter-email-wrapper');
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('newsletter-email');
newsletterForm.addEventListener('submit', checkEmail);

// Splide Carousel
new Splide('.splide').mount();

// Handle Testimonials tabindexing
const testimonialNavPrev = document.getElementById('testimonial-arrow-prev');
const testimonialNavNext = document.getElementById('testimonial-arrow-next');

handleTestimonialTabIndex();

window.onresize = () => {
    handleTestimonialTabIndex();
};

// Footer Accordion
const footerAccordions = document.getElementsByClassName('footer__nav-title');

for (let accordion of footerAccordions) {
    accordion.addEventListener('click', toggleAccordion);
}
