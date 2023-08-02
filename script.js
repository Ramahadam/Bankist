'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsCotainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
const message = document.createElement('div');
const h1 = document.querySelector('h1');
const links = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//Advance DOM manipulation

message.classList.add('cookie-message');
message.innerHTML = `We provide coockies to  <button class="btn btn--close-cookie">Got it! </button>`;
console.log(message);
header.append(message);
// header.insertAdjacentElement('afterbegin', message);
// header.append(message.cloneNode(true));
// header.after(message);
// header.before(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#000';
message.style.width = '100%';

console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

console.log(getComputedStyle(message).height);

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.setAttribute('alt', 'ENBD bank'));
console.log(logo.alt);

//Data attribute is speacial type of attributes
logo.setAttribute('versionNumber', '2.2');
console.log(logo.dataset.versionNumber);

logo.classList.add('js');

//DON'T use this will overisde
logo.className = 'jnonas';

//Events and handling

const headingSelected = function (e) {
  alert(`Heading 1 is selected `);

  h1.removeEventListener('click', headingSelected);
};
h1.addEventListener('click', headingSelected);

//Capturing phase , target pahse , bubling phase

/**Generating random numbers from */
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomInt(5, 10));
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });

/**
 *
 * Page navigation scrolling (event deligation)
 */

// links.forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });
/**
 * Event Delegation , #delegation #scrolling #smooth scrolling
 */
//1.Add event listener to the common parent of the element
//2. Determine what element that originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
/***
 *
 * Button scrolling
 */

btnScrollTo.addEventListener('click', function (e) {
  const scroll = section1.getBoundingClientRect();
  // console.log(scroll);
  // console.log(e.target.getBoundingClientRect());
  console.log(
    `X offset: ${window.pageXOffset}, Y offset: ${window.pageYOffset}`
  );
  console.log(`X offset: ${window.scrollX}, Y offset: ${window.scrollY}`);
  console.log(document.documentElement.clientHeight);
  console.log(document.documentElement.clientWidth);

  section1.scrollIntoView({ behavior: 'smooth' });
});

/**
 *
 * DOM traversing
 */

// const heading1 = document.querySelector('h1');
// console.log(heading1.querySelectorAll('.highlight'));
// console.log(heading1.children);
// console.log(heading1.childNodes);
// heading1.firstElementChild.style.color = 'red';
// heading1.lastElementChild.style.color = 'dodgerblue';
// console.log(heading1.parentElement);
// console.log(heading1.parentNode);
// heading1.closest('.header').style.background = 'var(--gradient-secondary)';
// console.log(heading1.previousElementSibling);
// console.log(heading1.nextElementSibling.textContent);
// [...heading1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.background = 'red';
// });

/*
Tab component - impleting tab content 

*/

tabsCotainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate content area
  const tabNumber = clicked.dataset.tab;
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  const tabToBeOpend = document.querySelector(
    `.operations__content--${tabNumber}`
  );
  tabToBeOpend.classList.add('operations__content--active');
});

/**
 * Menu fade
 */

const handOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.jnonas');

    siblings.forEach(ele => {
      if (ele !== link) ele.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handOver.bind(0.5));
nav.addEventListener('mouseout', handOver.bind(1));

/**
 * Sticky menu on scroll
//  */
// const intialCoord = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > intialCoord.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

/**
 * Implementing intersection observer on
 * sticky note
 */

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.1, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const navHieght = nav.getBoundingClientRect().height;

const stickyCall = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyCall, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHieght}px`,
});

headerObserver.observe(header);

/***
 *
 * Reaval section observer
 */
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  //Stop observing the observed target
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

const allsections = document.querySelectorAll('.section');

allsections.forEach(section => {
  sectionObserver.observe(section);
  //TODO remove comment bellow
  // section.classList.add('section--hidden');
});

/**
 *
 * Lazy loading Images
 */

const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyImages.forEach(img => imgObserver.observe(img));

/****************************************
 *
 * Slider for  images
 *
 * ************************************
 */

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');
  let curSlide = 0;
  let maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');

      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    });
  };

  const goToSlide = function (currentSlide) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activeDots(curSlide);
  };

  //Previous slide
  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activeDots(curSlide);
  };

  //Initializtion
  function init() {
    goToSlide(0);
    createDots();
    activeDots(curSlide);
  }
  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //using left and right key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDots(slide);
    }
  });
};
slider();

/***********
 * DOM cycle
 *
 *
 */
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('Markup is loaded and js built');
// });

window.addEventListener('load', function (e) {
  console.log(e);
});

document.addEventListener('beforeunload', function (e) {
  e.preventDefault();
});
