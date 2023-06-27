'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// console.log(btnsOpenModal); // node list 2 buttons

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   // btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling - line 178

// ....................................................................
// EVENT DELEGATION (related with bubbling)
// Page navigation

// When you have a lot of elements, we are creating a lot of copies of the function and it is not a good solution to performance
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     // console.log('Link');
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
//   });
// });

// The solution to get a better performance:
// EVENT DELEGATION
// 1. Add event listener to common parent element
// 2. Determinate what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  // Matching strategy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
  }
});
// ....................................................................



// ....................................................................
// TABBED COMPONENT


tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');


  // Activate Content Area
  // console.log(clicked.dataset.tab);
  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});
// ....................................................................




// ....................................................................
// Menu fade animation
// nav.addEventListener('mouseover', function (e) {
//   if(e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });

//     logo.style.opacity = 0.5;
//   }
// });


// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });

//     logo.style.opacity = 1;
//   }
// });


// Refactor the code:
const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }

};

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// OR.....


nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));
// ....................................................................



// ....................................................................
// Sticky Navigation

// 1 Solution: bad performance: when we scroll all the times triggers the console.log(window.scrollY);
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);

// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky');
//   }
// });


// 2 Solution - The intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   treshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//...
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);


const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  treshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
// ....................................................................




// ....................................................................
// Revealing elements on Scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});


allSections.forEach(function(section) {
  sectionObserver.observe(section);
  // section.classList.add('.section--hidden');
});
// ....................................................................


// ....................................................................
// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
// ....................................................................


// ....................................................................
//Slider Component
// Images exercice

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.2) transleX(-800px)';
slider.style.overflow = 'visible';

const goToSlide = function(slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};

goToSlide(0);

// Next Slide

const nextSlide = function() {
  if (curSlide === maxSlide -1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
}


btnRight.addEventListener('click', nextSlide);




// ....................................................................







// ....................................................................
// ELEMENTS: select - create - delete

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // Selector
// const header = document.querySelector('.header');
// // SelectorAll
// const allSections = document.querySelectorAll('.section');
// console.log(allSections); // return a NodeList
// // getElementById
// document.getElementById('section--1');
// // getElementsByTagName
// const buttons = document.getElementsByTagName('button');
// console.log(buttons); // return HTMLCollection
// // getElementsByClassName
// console.log(document.getElementsByClassName('btn'));


// // CREATE

// // .insertAdjacentHTML

// // The insertAdjacentHTML() method of the Element interface parses the
// // specified text as HTML or XML and inserts the resulting nodes into the
// //  DOM tree at a specified position.
// // insertAdjacentHTML(position, text)
// // position: "beforebegin"  "afterbegin"  "beforeend"  "afterend"
// // text: The string to be parsed as HTML or XML and inserted into the tree.

// // .createElement

// // creates the HTML element specified by tagName,
// // or an HTMLUnknownElement if tagName isn't recognized.

// const message = document.createElement('div');

// // classList methods:  add() remove() replace() toggle()
// message.classList.add('cookie-message');

// // message.textContent = `We use cookies for improved functionality and analytic`;
// message.innerHTML =
//   `We use cookies for improved functionality
//   and analytics. <button class = "btn btn--close-cookie">Got it!</button>`;

// //  PREPEND
// // The Element.prepend() method inserts a set of Node objects or string
// // objects before the first child of the Element.
// // String objects are inserted as equivalent Text nodes.

// // header.prepend(message);

// // APPEND
// // The Element.append() method inserts a set of Node objects or string
// //  objects after the last child of the Element. String objects are
// //  inserted as equivalent Text nodes.
// // header.append(message);

// // Se quiseres que apareca em cima e em baixo, prepend e append:
// // header.append(message.cloneNode(true)); // e header.prepend

// header.append(message);
// // header.before(message);

// //  DELETE ELEMENTS
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     // message.parentElement.removeChild(message);
// });
// // ....................................................................


// // ....................................................................
// // Styles - Attributes - Classes

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// console.log(message);
// console.log(message.style.backgroundColor); // return the backgorund color
// console.log(message.style.color); // dont return anything

// // STYLES
// console.log(getComputedStyle(message));
// console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
// console.log(getComputedStyle(message).height); // 48.3333px
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';


// // change
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // ATTRIBUTES
// const logo = document.querySelector('.nav__logo')
// console.log(logo.alt);
// // image
// console.log(logo.src);
// console.log(logo.getAttribute('src'));
// // links
// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// const link1 = document.querySelector('.nav__link--btn');
// console.log(link1.href); // http://127.0.0.1:8080/starter/#
// console.log(link1.getAttribute('href')); // #



// console.log(logo.getAttribute('src'));
// console.log(logo.className);
// console.log(logo.designer); // undefined (non-standard)
// console.log(logo.getAttribute('designer')); // now you can read
// logo.alt = 'Beautiful minimalist logo';
// logo.setAttribute('company', 'Bankist');

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes as arrays

// // Don't use
// // it will overwrite all existing classes
// logo.className = 'jonas';

// ....................................................................


// ....................................................................
//  Smooth Scrolling


btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); // need to give the coordinates where to scroll
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); // button rectangle
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // current scroll position
  console.log('height/width', document.documentElement.clientHeight, document.documentElement.clientWidth) // view port

  // Scrolling

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // OR...

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // OR....

  section1.scrollIntoView({ behavior: 'smooth'});
});
// ....................................................................





// ....................................................................
// Events

// click mouseover change keyup scroll submit touchstart blur focus

// Mouseenter
const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading')
// });

// Alternative:  but this is the old way

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading');
// };


//  addEventListener - its better, you can add several events

// Show event only one time
const alertH1 =  function (e) {
  alert('addEventListener: Great! You are reading the heading');

  // h1.removeEventListener('mouseenter', alertH1); // prevents to repeat every time that we pass the mouse on the h1
};

h1.addEventListener('mouseenter', alertH1);


// With setTimeout
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // apos 3 segundos deixa de efetuar o event listener


// With HTML attribute - we should not use it

//<h1 onclick="alert('HTML alert')"></h1>
// ....................................................................



// ....................................................................
// Propagation: Bubbling and Capturing - theory
// ....................................................................


// ....................................................................
// Propagation: In Practice

// random color rgb(255,255,255)
// const randomInt = (min,max) => Math.floor(Math.random() * (max-min+1) + min );
// const randomColor = () => `rgb(${randomInt(0,255)}, ${randomInt(0,255)}, ${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   // Stop propagation
//   // e.stopPropagation(); // usually its not a great idea
// });

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Nav', e.target, e.currentTarget);
// });
// ....................................................................




// ....................................................................
// EVENT DELEGATION (related with bubbling)
// exercise on the top of document
// ....................................................................




// ....................................................................
// DOM TRAVERSING

// const h1 = document.querySelector('h1');


// Going downwards: child
// console.log(h1.querySelectorAll('.highlight')); // highlight its a child of h1
// console.log(h1.childNodes); // NodeList(11) [text, comment, text, comment, text, span.highlight, text, br, text, span.highlight, text]
// console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';


// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
// ....................................................................


// ....................................................................
// TABBED COMPONENT - codigo em cima...line 73
// ....................................................................


// ....................................................................
// Passing Arguments to Event Handlers - line 107

// ....................................................................


// ....................................................................
// Sticky Navigation - line 174
// ....................................................................


// ....................................................................
// Sticky Navigation - The intersection observer API - line 192
// ....................................................................


// ....................................................................
// Revealing elements on Scroll
// ....................................................................

// ....................................................................
// Lazy Loading Images - line 258
// ....................................................................


// ....................................................................
// Slider - line 285
// ....................................................................
