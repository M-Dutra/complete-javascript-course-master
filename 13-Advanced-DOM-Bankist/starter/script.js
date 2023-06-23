'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

console.log(btnsOpenModal); // node list 2 buttons

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


// ....................................................................
// ELEMENTS: select - create - delete

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// Selector
const header = document.querySelector('.header');
// SelectorAll
const allSections = document.querySelectorAll('.section');
console.log(allSections); // return a NodeList
// getElementById
document.getElementById('section--1');
// getElementsByTagName
const buttons = document.getElementsByTagName('button');
console.log(buttons); // return HTMLCollection
// getElementsByClassName
console.log(document.getElementsByClassName('btn'));


// CREATE

// .insertAdjacentHTML

// The insertAdjacentHTML() method of the Element interface parses the
// specified text as HTML or XML and inserts the resulting nodes into the
//  DOM tree at a specified position.
// insertAdjacentHTML(position, text)
// position: "beforebegin"  "afterbegin"  "beforeend"  "afterend"
// text: The string to be parsed as HTML or XML and inserted into the tree.

// .createElement

// creates the HTML element specified by tagName,
// or an HTMLUnknownElement if tagName isn't recognized.

const message = document.createElement('div');

// class.List methods:  add() remove() replace() toggle()
message.classList.add('cookie-message');

// message.textContent = `We use cookies for improved functionality and analytic`;
message.innerHTML =
  `We use cookies for improved functionality
  and analytics. <button class = "btn btn--close-cookie">Got it!</button>`;

//  PREPEND
// The Element.prepend() method inserts a set of Node objects or string
// objects before the first child of the Element.
// String objects are inserted as equivalent Text nodes.

// header.prepend(message);

// APPEND
// The Element.append() method inserts a set of Node objects or string
//  objects after the last child of the Element. String objects are
//  inserted as equivalent Text nodes.
// header.append(message);

// Se quiseres que apareca em cima e em baixo, prepend e append:
// header.append(message.cloneNode(true)); // e header.prepend

header.append(message);
// header.before(message);

//  DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
});
// ....................................................................


// ....................................................................
// Styles - Attributes - Classes

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message);
console.log(message.style.backgroundColor); // return the backgorund color
console.log(message.style.color); // dont return anything

// STYLES
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 48.3333px
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';


// change
document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES
const logo = document.querySelector('.nav__logo')
console.log(logo.alt);
// image
console.log(logo.src);
console.log(logo.getAttribute('src'));
// links
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

const link1 = document.querySelector('.nav__link--btn');
console.log(link1.href); // http://127.0.0.1:8080/starter/#
console.log(link1.getAttribute('href')); // #



console.log(logo.getAttribute('src'));
console.log(logo.className);
console.log(logo.designer); // undefined (non-standard)
console.log(logo.getAttribute('designer')); // now you can read
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes as arrays

// Don't use
// it will overwrite all existing classes
logo.className = 'jonas';

// ....................................................................
