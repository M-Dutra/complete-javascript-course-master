'use strict';


// .............................................................................
// FUNCTIONS
// .............................................................................




// .............................................................................
// Default parameters

// const bookings = [];

// const createBooking = function(flightNum, numPassaengers = 1, price = 199 * numPassaengers) {

//   // ES5 (oldway)
//   // numPassaengers = numPassaengers || 1;
//   // price = price || 199;

//   const booking = {
//     flightNum,
//     numPassaengers,
//     price
//   }
//   console.log(booking);
//   bookings.push(booking);
// }

// createBooking('LH123'); // ---> passegers and price return undefined
// createBooking('LH123', 2, 800); // --->
// createBooking('LH123', 5);
// createBooking('LH123', undefined, 5); // ---> If we want to skip one argument
// .............................................................................







// .............................................................................
// Passing Arguments

// const flight = 'LH234';
// const jonas = {
//   name: 'Manuel Dutra',
//   passport: 123456789,
// };

// const checkIn = function(flightNum, passenger) {
//   flightNum = 'LH99';
//   passenger.name = `Mr. ${passenger.name}`;
//   if (passenger.passport === 123456789) {
//     alert(`Check in`);
//   } else {
//     alert(`Wrong passport!`);
//   }
// }


// checkIn(flight, jonas);
// console.log(flight); // ---> mantem a LH234
// console.log(jonas); // ---> altera para Mr. Manuel Dutra




// // another example

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas); // ---> will return WRONG PASSWORD




// Passing Value vs reference
// javascrpit nao passa por referencia, apenas por value
// .............................................................................



// .............................................................................
// First Class functions (and higher order)

// functions they are treat as values
// funtions are objects and objects are values
// .............................................................................



// .............................................................................
// FUNCTIONS ACCEPTING CALLBACK FUNCTION

// const oneWord = function(str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function(str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-order function
// const transformer = function(str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Tranfromed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}`)
// }

// transformer('Javascript is the best!', upperFirstWord);
// transformer('Javascript is the best!', oneWord);


// // another exemple:
// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);

// ['Jonas', 'Martha', 'Adam'].forEach(high5);
// .............................................................................





// .............................................................................
// FUNCTIONS RETURNING FUNCTIONS
// a function that returns another function

// const greet = function(greeting) {
//   return function(name) {
//     console.log(`${greeting} ${name}`);
//   }
// }

// const greeterHey = greet(`hey`);
// greeterHey(`jonas`);
// greeterHey(`Stever`);

// greet(`hello`)(`jonas`);

// works - because of clousure

// refactor with arroy function
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);
// greet(`hello`)(`jonas`);

// .............................................................................


// .............................................................................
// The call and apply Methods
// const lufthansa = {
//   airline: `Lufthansa`,
//   iataCode: `LH`,
//   bookings: [],
//   book(flightNum, name) {

//     console.log(`${name} booked a seat on ${this.airline}
//     flight ${this.iataCode}${flightNum}`);

//     this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
//   }
// }

// // Call method
// lufthansa.book(239, 'Manuel Dutra');
// lufthansa.book(239, 'John Smith');
// console.log(lufthansa);

// const eurowings = {
//   airline: `Eurowings`,
//   iataCode: `EW`,
//   bookings: [],
// }

// // objectivo: queremos reusar a book function d lufthansa na eurowings
// const book = lufthansa.book;

// // book(23, `Diana Spencer`); //---> doesnt work
// // solucao
// book.call(eurowings, 23, `Diana Spencer`);
// console.log(eurowings);

// book.call(lufthansa, 267, `Carlos Spencer`);
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: `LX`,
//   bookinga: [],
// };

// book.call(swiss, 583, `Mary Cooper`);

// // Apply Method
// const flightData = [583, `george cooper`];
// //the same way apply vs call
// book.apply(swiss, flightData)
// book.call(swiss, ...flightData)
// console.log(swiss);
// // .............................................................................


// // .............................................................................
// // The bind method
// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, `Steven Williams`);

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23(`Manuel Dutra`);
// bookEW23(`Fabiana Bravo`);

// // other examples - with event listeners

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// document.querySelector('.buy').
// addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// // Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(100));
// console.log(addVAT(23));
// .............................................................................



// .............................................................................
// Coding Challange #1
// .....
//.........
//.............
// .............................................................................


// .............................................................................
// Immediately Invoked Function Expressions (IIFE)
// .............................................................................



// .............................................................................
// Closures
// .............................................................................
