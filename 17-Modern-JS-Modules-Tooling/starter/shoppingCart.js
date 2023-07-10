//  Exporting Module
console.log('Exporting module');

// Blocking code
// console.log('Start fetching users');
// await fetch(`https://jsonplaceholder.typicode.com/users`);
// console.log('Finish fetching');


const shippingCost = 10;
export const cart = [];

// if we want to use this variables on other module, we just need to use export
//  2 types of exports:
// a) Named Exports - simplest way
// b) Default Exports
export const addToCart = function(product, quantity) {
  cart.push({product, quantity});
  console.log(`${quantity} ${product} added to cart`);
};
// Attention: need to be at top level
// this woul not work
// if(true) {
//   export const addToCart = function(product, quantity) {
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} added to cart`);
//   };
// }

// We can export several thing with Names exports
const totalPrice = 237;
const totalQuantity = 23;

export {totalPrice, totalQuantity as qt};

// .................
// b) Default Exports
// when we just want to pass one thing per module
export default function(product, quantity) {
  cart.push({product, quantity});
  console.log(`${quantity} ${product} added to cart`);
};
