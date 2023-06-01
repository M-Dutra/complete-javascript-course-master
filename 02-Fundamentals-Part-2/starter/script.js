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


const friends = ['Michael', 'Steven', 'Peter']
friends.push('Jay');
console.log(friends);
console.log(friends.length);

friends.unshift('Miguel')
console.log(friends);



                                                                        // 4 - DELETE

friends.pop();
console.log(friends);

friends.shift();
console.log(friends);

console.log(friends.indexOf('Steven'));

console.log(friends.includes('Michael'));
console.log(friends.includes('Mi'));


