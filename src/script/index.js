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

const throttlerWithDebounce = (func, delay) => {
    let flag = true;

    return function () {
        if (flag) {
            func();
            flag = false;
            setTimeout(() => {
                flag = true;
                func();
            }, delay);
        }
    };
};

const handleHeroTabIndex = () => {
    if (window.screen.availWidth < 1440) {
        heroSendMsgBtn.setAttribute('tabindex', 9);
        heroTopPlaces.setAttribute('tabindex', 10);
        heroAddUserBtn.setAttribute('tabindex', 11);
        heroExploreBtn.setAttribute('tabindex', 12);
        heroGetStartedBtn.setAttribute('tabindex', 13);
        heroWatchDemoBtn.setAttribute('tabindex', 14);
    } else {
        heroExploreBtn.setAttribute('tabindex', 9);
        heroGetStartedBtn.setAttribute('tabindex', 10);
        heroWatchDemoBtn.setAttribute('tabindex', 11);
        heroSendMsgBtn.setAttribute('tabindex', 12);
        heroTopPlaces.setAttribute('tabindex', 13);
        heroAddUserBtn.setAttribute('tabindex', 14);
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

const debouncer = (func, delay) => {
    let timer;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, delay);
    };
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

const betterScroll = throttlerWithDebounce(activeNav, 300);

window.addEventListener('scroll', betterScroll);

// Validate Email
const emailWrapper = document.getElementById('newsletter-email-wrapper');
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('newsletter-email');
newsletterForm.addEventListener('submit', checkEmail);

// Splide Carousel
new Splide('.splide').mount();

// Handle tabindexing
const heroSendMsgBtn = document.getElementById('hero-send-msg-btn');
const heroAddUserBtn = document.getElementById('hero-add-user-btn');
const heroTopPlaces = document.getElementById('hero-top-places-btn');
const heroExploreBtn = document.getElementById('hero-explore-btn');
const heroGetStartedBtn = document.getElementById('hero-get-started-btn');
const heroWatchDemoBtn = document.getElementById('hero-watch-demo-btn');
const testimonialNavPrev = document.getElementById('testimonial-arrow-prev');
const testimonialNavNext = document.getElementById('testimonial-arrow-next');

handleHeroTabIndex();
handleTestimonialTabIndex();

const betterResize = debouncer(() => {
    handleHeroTabIndex();
    handleTestimonialTabIndex();
}, 500);

window.onresize = betterResize;

// Footer Accordion
const footerAccordions = document.getElementById('footer-bottom');

footerAccordions.addEventListener('click', toggleAccordion);
