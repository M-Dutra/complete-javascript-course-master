//  Importing Module
// import {addToCart, totalPrice as price, tq}
// from './shoppingCart.js';
// repair, we dont need to use strict mode
// console.log(shippingCost); // undefined
// if we want to use, we just need to use export
//  2 types of exports:
// a) Named Exports
// b) Default Exports

// addToCart('bread','5');
// console.log(price, totalQuantity);
// Very flexible, we can rename it on the import or export
// totalPrice as price - import file
// totalQuantity as qt -  export file
// console.log(`Importing module`);



// .................................................
// We can import everything
// note: name convenction S...C
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, {cart} from './shoppingCart.js';
// We can import twice (line 23 and 27), but its not usual
// add('pizza', 2);
// add('bread', 5);
// add('apples', 4);
// console.log(cart);
// its not a copy...its a live connection
// otherwise it would be a empty array

// // We can mix to
// import add, {addToCart, totalPrice as price, tq} from './shoppingCart.js';
// add('pizza', 2);
// console.log(price);

// .................................................
// Top-Level AWAIT (ES2022)

// only work on modules
// html:  {/* <script type="module" defer src="script.js"></script> */}
// console.log('Start fetching');
// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await res.json();
// console.log(data);
// console.log('Something');

// const getLastPost = async function() {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//   console.log(data);
//   return {title: data.at(-1).title, text: data.at(-1).body};
// };

// const lastPost = getLastPost();
// console.log(lastPost); // its a promise



// // this its not elegante:
// // lastPost.then(last => console.log(last));

// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// Another thing: import export
// .... see end of video
// .................................................



// .................................................
// Module Pattern

// lets implement
// 1) ify function

// const ShoppingCart2 = (function() {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrize = 237;
//   const totalQuantity = 23;

//   const addToCart = function(product, quantity) {
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} added to cart
//     (shipping cost is ${shippingCost})`);
//   };

//   const orderStock = function(product, quantity) {
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrize,
//     totalQuantity,
//   };

// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost); // undefined
// .................................................


// .................................................
// COMMONJS Modules
// Export
// export.addToCart = function(product, quantity) {
//   cart.push({product, quantity});
//   console.log(`${quantity} ${product} added to cart
//   (shipping cost is ${shippingCost})`);
// };

// // Import
// const { addToCart } = require('./shoppingCart.js');
// .................................................


// .................................................
// Command Line: Introduction
// .................................................


// .................................................
// NPM : Introduction
// import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    {product: 'bread', quantity: 5},
    {product: 'pizza', quantity: 5},
  ],
  user: {loggedIn: true},
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state); // good way to make a copy
console.log(stateClone);
state.user.loggedIn = false; // when you alter the loggedIn you change on both...not a good way to copy
console.log

console.log(stateDeepClone);

// .................................................



// .................................................
// Bundling with Parcel and NPM Scripts
// module bundler: PARCEL
// Parcel is simpler to use, when compared with WEBPACKER (use a lot on REACT)

// PARCEL (belongs to npm)

// 2 ways
// a) NPX
// b) NMP scripts


// a) NPX
// terminal: npx parcel index.html

// dont reload
if(module.hot) {
  module.hot.accept()
}

// b) NMP scripts
// terminal:  npm run start
// .................................................


// .................................................
// BABEL (configuring and polyfilling)

//  we want that everyone can read our project in every browsers - transpile

class Person {
  greeting = 'Hey'
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve('TEST').then(x=>console.log(x));

import 'core-js/stable'; // polyfield
// import 'core-js/stable/array/find'; // select specific . to put the file shorter
// import 'core-js/stable/array/promise'; // select specific . to put the file shorter
// Polifilling async functions
import 'regenerator-runtime/runtime';
// .................................................


// .................................................
// Write Clean and Modern Javascript
// .................................................


// .................................................
// 
// .................................................
