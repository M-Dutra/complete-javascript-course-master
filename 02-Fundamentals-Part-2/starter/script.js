'use strict';

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log('I can drive :D');



// Error - Unexpected strict mode reserved word
// const interface = "Audio";
// const private = 534;
// Error: Unexpected token 'if'
//  const if = 23;

// Functions

// function logger(name) {
//   console.log('My name is Jonas');
// }

// Calling - Running - Invoking function

// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//   console.log(apples, oranges);
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// const appleJuice = fruitProcessor(5,0);
// console.log(appleJuice);
// const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);


// Keep your code DRY



// function declarations vs expressions



// // Function DECLARATION
// function calcAge1(birthYear) {
//   return 2037 - birthYear;
// }
// const age1 = calcAge1(1991);
// console.log(age1);



// // Function EXPRESSION
// const calcAge2 = function (birthYear) {
//   return 2037 - birthYear;
// }

// const age2 = calcAge2(1991);

// console.log(age1, age2);


// // Another type of function Expression - ARROW FUNCTION

// const calcAge3 = birthYear => 2037 - birthYear;

// const age3 = calcAge3(1991);
// console.log(age3);


// const yearsUntilRetirement = (birthYear, firstName) => {
//   const age = 2037 - birthYear;
//   const retirement = 65 - age;
//   // return retirement;
//   return `${firstName} retires in ${retirement} years`;
// }

// console.log(yearsUntilRetirement(1991, 'Jonas'));
// console.log(yearsUntilRetirement(1980, 'Bob'));

// Functions calling other functions

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }


// function fruitProcessor(apples, oranges) {

//   const applePieces = cutFruitPieces(apples);
//   const orangePieces = cutFruitPieces(oranges);

//   console.log(apples, oranges);
//   const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} piece of orange`;
//   return juice;
// }

// console.log(fruitProcessor(3, 6));

// Resume of functions

// const calcAge = function (birthYear) {
//   return 2037- birthYear;
// }



// const yearsUntilRetirement = function  (birthYear, firstName) {
//   const age = calcAge(birthYear);
//   const retirement = 65 - age;

//   if (retirement > 0) {
//     console.log(`${firstName} retires in ${retirement} years`);
//     return retirement;
//   } else {
//     console.log(`${firstName} has already retired 🎉`);
//     return -1;
//   }

// }
// console.log(yearsUntilRetirement(1991, 'Jonas'));
// console.log(yearsUntilRetirement(1950, 'Mike'));

// when we use return above, dont do more things

                                                                        // Coding Challange # 1

// const calcAverage = (first, second, third) => (first + second + third)/ 3;

// let scoreDolphins = calcAverage(44, 23, 71);
// let scoreKoalas = calcAverage(65, 54, 49);

// console.log(scoreDolphins, scoreKoalas);

// const checkWinner = function (scoreDolphins, scoreKoalas) {
//   if (scoreDolphins >= 2 * scoreKoalas) {
//     console.log(`Dolphins wins with (${scoreDolphins} vs. ${scoreKoalas})`);
//   } else if (scoreKoalas >= 2 * scoreDolphins) {
//     console.log(`Koalas wins with (${scoreKoalas} vs. ${scoreDophins})`);
//   } else {
//     console.log(`No team wins!`);f
//   }
// }

// checkWinner(scoreDolphins, scoreKoalas);

// scoreDolphins = calcAverage(85, 54, 41);
// scoreKoalas = calcAverage(23, 34, 27);
// console.log(scoreDolphins, scoreKoalas);
// checkWinner(scoreDolphins, scoreKoalas);


                                                                          // Arrays

// const friend1 = 'Michael';
// const friend2 = 'Steven';
// const friend3 = 'Peter';

// const friends = ['Michael', 'Steven', 'Peter']

// console.log(friends);

// const y = new Array(1991, 1984,2008, 2020);
// console.log(years);

                                                  // // CRUD


                                                // // 1 - Read

// console.log(friends[0]);
// console.log(friends[2]);

// console.log(friends.length);
// console.log(friends[friends.length-1]);  // -----> return the last element

// console.log(friends.indexOf('Steven'));





                                                // // 2 - Update

// friends[2] = 'Jay';
// console.log(friends);

//             // Arrays with diffrent types

// const firstName = 'Jonas';
// const jonas = [firstName, 'Dutra', 2037-1991, friends, 'teacher'];
// console.log(jonas);
// console.log(jonas.length);


//
// const calcAge = function (birthYear) {
//   return 2037 - birthYear;
// }

// const years = [1990, 1967, 2002, 2010, 2018];

// const age1 = calcAge(years[0]);
// console.log(age1);

                                                                    // Array METHODS


                                                                //  3 - Add


// const friends = ['Michael', 'Steven', 'Peter']
// friends.push('Jay');
// console.log(friends);
// console.log(friends.length);

// friends.unshift('Miguel')
// console.log(friends);



//                                                                         // 4 - DELETE

// friends.pop();
// console.log(friends);

// friends.shift();
// console.log(friends);

// console.log(friends.indexOf('Steven'));

// console.log(friends.includes('Michael'));
// console.log(friends.includes('Mi'));


                                                                    // Coding Challenge #2

// const calcTip = function (bill) {
//   if (bill >= 50 && bill <= 300 ) {
//     const tip = bill * 0.15;
//     return tip;
//   } else {
//     const tip = bill * 0.20;
//     return tip;
//   }
// }

// // refactor the function

// // const calcAge3 = birthYear => 2037 - birthYear;


// const calcTip = function(bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
// }

// const bills = [125, 555, 44];

// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// console.log(tips);
// const total = [tips[0]+bills[0], tips[1]+bills[1], tips[2]+bills[2]];
// console.log(total)

                                                                        // Objects


// const jonas = {
//   firstName: 'Jonas',
//   lastName: 'Dutra',
//   age: 2037 - 1991,
//   job: 'teacher',
//   friends: ['Miguel', 'Peter', 'Steve']
// };


// nos objectos o ordem não interessa tanto


                                                                            // 1 - READ
// console.log(jonas);
// console.log(jonas.lastName);
// console.log(jonas.friends);
// console.log(jonas['lastName']);


// const nameKey = 'Name';
// console.log(jonas['first' + nameKey]);
// console.log(jonas['last' + nameKey]);

// const interestedIn = prompt('What do you want to now? Choose between age, first name, last name, job and friends');
// console.log(jonas[interestedIn]);

// if (jonas[interestedIn]) {
//   console.log(jonas[interestedIn]);
// } else {
//   console.log ('Wrong request');
// }

                                                                            // 2 - CREATE

// jonas.location = 'Portugal';
// jonas["twitter"] = '@manueldutra';
// console.log(jonas);

// console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is ${jonas.friends[0]}`)


                                                        // Function and boolean inside the OBJECT

                                                        // this - concept
// const jonas = {

//   firstName: 'Jonas',

//   lastName: 'Dutra',

//   birthYear: 1991,

//   job: 'teacher',

//   friends: ['Miguel', 'Peter', 'Steve'],

//   hasDriversLicense: true,

//   // calcAge: function() {
//   //   return 2037 - this.birthYear;
//   // }

//   calcAge: function() {
//     this.age = 2037 - this.birthYear;
//     return this.age;
//   },

//   getSummary: function() {
//     return `${this.firstName} is a ${this.calcAge()} and he has ${this.hasDriversLicense ? "a" : "not"} a driver's license`;
//   }
// };

// console.log(jonas.calcAge());
// console.log(jonas['calcAge'](jonas.birthYear));

// console.log(jonas.age);
// console.log(jonas.getSummary());



// Methods - built in methods to objects

                                                      // CODING CHALLANGE #3

// const mark = {
//   firstName: 'Mark',
//   lastName: 'Miller',
//   mass: 78,
//   height: 1.69,
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2;
//     return this.BMI;
//   }
// };


// const john = {
//   firstName: 'John',
//   lastName: 'Smith',
//   mass: 92,
//   height: 1.95,
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2;
//     return this.BMI;
//   }
// };

// mark.calcBMI();
// john.calcBMI();
// console.log(mark.bmi, john.bmi);



// if (mark.bmi > john.bmi) {
//   console.log(`${mark.firstName} ${mark.lastName}'s BMI
//   (${mark.bmi}) is higher than ${john.firstName} ${john.lastName}'s BMI (${john.bmi}))`);
// } else if (john.bmi > mark.bmi) {
//   console.log(`${john.firstName} ${john.lastName}'s BMI
//   (${john.bmi}) is higher than ${mark.firstName} ${mark.lastName}'s BMI (${mark.bmi}))`);
// }

                              // ITERATION - LOOPS


                              // FOR

// for(let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }

                              // FOR on ARRAYS


// const jonas = ['Jonas', 'Dutra', 2037 - 1991, 'teacher', ['Miguel', 'Peter', 'Steve'], true, 'tomatos'];

// const types = []

// for( let i = 0; i <= jonas.length-1 ;i++) {
//   console.log(jonas[i], typeof jonas[i]);
//   // types[i] = typeof jonas[i];
//   types.push(typeof jonas[i]);
// }

// console.log(types);

// const years = [1991, 2007, 1969, 2020];
// const ages = [];
// for (let i = 0; i < years.length; i++ ) {
//   ages.push(2037 - years[i]);
// }
// console.log(ages);

// continue and break

// CONTINUE
// console.log('...................................');

// const jonas = ['Jonas', 'Dutra', 2037 - 1991, 'teacher', ['Miguel', 'Peter', 'Steve'], true, 'tomatos'];
// const types = [];
// for (let i = 0; i <= jonas.length-1 ; i++) {
//   if (typeof jonas[i] !== 'string') continue;
//   console.log(jonas[i], typeof jonas[i]);
// }

// console.log('...................................');

// // BREAK
// for (let i = 0; i <= jonas.length-1 ; i++) {
//   if (typeof jonas[i] === 'number') break;
//   console.log(jonas[i], typeof jonas[i]);
// }

                                                            // LOOPING

// const jonas = ['Jonas',
//               'Dutra',
//               2037 - 1991,
//               'teacher',
//               ['Miguel', 'Peter', 'Steve'],
//               ];

// for (let i = jonas.length -1; i >= 0; i-- ) {
//   console.log(i, jonas[i]);
// }

//                                                           // Loop inside a loop


// for(let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }

// for (let exercise = 1; exercise <= 3; exercise++) {
//   console.log(`---------Starting exercise ------- ${exercise}`)
//   for (let rep = 1; rep <= 5; rep++) {
//     console.log(`Lifting weight repetition ${rep}`);
//   }
// }


                                                  // WHILE LOOP

// let rep = 1;
// while (rep <= 10) {
//   console.log(`Lifting weights repetition ${rep}`);
//   rep++;
// }

// let dice = Math.trunc(Math.random() * 6) + 1;
// while (dice !== 6) {
//   console.log(`You rolled a ${dice}`);
//   dice = Math.trunc(Math.random() * 6) + 1;
//   if (dice === 6 ) console.log('Loop is about to end...')
// }


                              // Coding Challange #4

// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];

// const calcTip = function (bill) {
//   return bill >= 50 && bill < 300 ? bill * 0.15 : bill * 0.20;
// }

// for (let i = 0; i <= bills.length-1; i++){
//   const tip = calcTip(bills[i]);
//   tips.push(tip);
//   totals.push(tip + bills[i]);
// }

// console.log(bills);
// console.log(tips);
// console.log(totals);

// const calcAverage = function(arr) {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//   sum += arr[i];
//   }
//   return sum / arr.length;
// }
// console.log(calcAverage(totals));
