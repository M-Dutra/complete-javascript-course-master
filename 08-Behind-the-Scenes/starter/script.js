'use strict';

                                                    // SCOPING

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `You are ${firstName}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true; // we can access, its kind of a function scope

//       // Creating NEW variable with same name as outer scope s variable
//       const firstName = 'Steven';

//       // Reassigning outer scope s variable
//       output = 'New output';


//       const str = `Oh, and you are a millenial, ${firstName}`;
//       console.log(str);

//       function add (a, b) {
//         return a + b;
//       }


//     }


//     // console.log(str);
//     console.log(millenial);
//     // add(2, 3);
//     console.log(output);


//   }

//   printAge();
//   return age;

// }

// const firstName = 'Jonas';
// calcAge(1991);
// // console.log(age);
// // printAge();
// console.log(me);


// var me = 'Jonas';
// let job = 'teacher';
// const year = 1991;


// console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));


// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function(a, b) {
//   return a + b;
// } // this need to be unitialized before declaration

// var addArrow = (a, b) => a + b; //this is undefined

//.......................................
// console.log(undefined);

// if (!numProducts) deleteShoppingCard();

// var numProducts = 10;

// function deleteShoppingCard() {
//   console.log('All products deleted');

// }
//..........................................
// var x = 1;
// let y = 2;
// const z = 3;
// .........................................

//.................................
// This keyword
// console.log(this); // window
// const calcAge = function (birthYear) {
//   console.log(2037-birthYear);
//   console.log(this); // undefined ---> refers to the calcAge
// };

// calcAge(1991);


// const calcAgeArrow = birthYear => {
//   console.log(2037-birthYear);
//   console.log(this); // window ---> this keyword of the global scope
// };

// calcAgeArrow(1980);

// const jonas = {
//   year: 1991,
//   calcAge: function() {
//     console.log(this); // jonas object
//     console.log(2037 - this.year);
//   }
// };
// jonas.calcAge();

// console.log(`......`);

// const matilda = {
//   year: 2017, // matilda can call a method outside and grab on another object
// };

// matilda.calcAge = jonas.calcAge;
// matilda.calcAge();

// const f =  jonas.calcAge;
// f(); // here it is just a function and we dont have any owner....because of the this!
//.................................


//.................................................
// Functions: REGULAR  VS ARROW

// var firstName = 'Matilda';

// const jonas = {
//   firstName: 'Jonas',

//   year: 1991,

//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },

//   greet: () => console.log(`Hey ${this.firstName}`), // the parent scope of a arrow function is the global scope

// };

// jonas.greet(); // thats why return a undefined

// console.log(this.firstName);




// const jonas = {
//   firstName: 'Jonas',
//   year: 1991,

//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);

    //Solution one

    // const self = this; // self or that is the same thing
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996); // dont have access to the year, soluction SELF
      // console.log(this);
      // console.log(this.year >= 1981 && year <= 1996); // dont have access to the year, soluction SELF

//     //Solution 2
//     const isMillenial =  () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMillenial();
//   },


//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };

// jonas.greet();
// jonas.calcAge();

// When using a function inside another function and to have access
// to the variables: or you use self and define a regular expression, or you use a arrow function



// Arguments keyword ---> only available in regular functions

// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b
// };
// addArrow(2, 5, 8);
//.................................................




//.................................................
// Primitive vs. Objects

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'Jonas',
//   age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log('Friend:', friend);
// console.log('Me:', me);

// PRIMITIVES - number, string, boolran, null, symbol...
// OBJECTS - arrays, functions....
// call stack vs heap

// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log(`Before marriage:`, jessica);
console.log(`after marriage:`, marriedJessica);

// Solution to this problem - Object.assign

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob']
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log(`Before marriage:`, jessica2);
console.log(`after marriage:`, jessicaCopy);


//..........................
