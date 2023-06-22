f'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; // ---> this refers to restaurant
  },

  orderDelivery: function({ starterIndex = 1, mainIndex = 0, time = 20, address}) {
    console.log(`Order received ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
    will be delivered to ${address} at ${time}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};



//..............................................................................
// Destructuring Arrays

// const arr = [2, 3 ,4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x,y,z] = arr;
// console.log(x,y,z); // ---> return 2 3 4
// console.log(arr); // ---> return [2, 3, 4]

// let [main, ,secondary] = restaurant.categories;
// console.log(main, secondary);

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// console.log(`............`);

// [main, secondary] = [secondary, main];
// console.log(main, secondary);


// console.log(`............`);


// const [starter, mainCourse] = restaurant.order(2,0);
// console.log(starter, mainCourse);

// //  Nested destructuring
// const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

// const [i, ,[j, k]] = nested;
// console.log(i, j, k);

// // Defalault values
// const [p=1,q=1,r=1] = [8];
// console.log(p,q,r);
//..............................................................................






//..............................................................................
// Destructuring Objects

// const {name, openingHours, categories} = restaurant;
// console.log(name, openingHours, categories);

// // rename the keys
// const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
// console.log(restaurantName, hours, tags);

// // defaul values (menu = [])
// const {menu = [], starterMenu: starters = []} = restaurant;
// console.log(menu, starters);

// // mutating variables
// let a = 111;
// let b = 999;
// const obj = {a:23, b:7, c:14};
// ({a, b} = obj);
// console.log(a, b);

// // nested
// const { fri: {open: o, close: c} } = restaurant.openingHours;
// console.log(o, c);




// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// })

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1
// });
//..............................................................................







//..............................................................................
// Spread Operator

// ...on arrays

//use to expand an array to all his elements

// bad practice
// const arr = [7,8,9];
// const badNewArr = [1,2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

//good practice ---> spread operator
//  without the spread operator, it would be a array inside an array
// const newArr = [1,2, ...arr];
// console.log(newArr); // ---> return [1,2,7,8,9]
// console.log(...newArr); // ---> return 1 2 7 8 9
// console.log(1,2,7,8,9);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);
// console.log(...newMenu);

// copy array
// const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

//it works in all iterables - arrays, strings, maps, sets (but not objects)

// exemple: string
// const str = 'Jonas';
// const letters = [...str, '', 'S.'];
// console.log(letters);
// console.log(...str);
// console.log(`${...str}`);  //---> dont work

// real example
// const ingredients = [prompt(`Let's make pasta! Ingedient1?`),
//                     prompt(`Ingedient2?`),
//                     prompt(`Ingedient3?`)];

// console.log(ingredients);
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

//...on objects
// const newRestaurant = {foundedIn:1998, ...restaurant, founder: 'Guiseppe'}
// console.log(newRestaurant);

// const restaurantCopy = {...restaurant};
// restaurantCopy.name = 'Ristorante di Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);
//..............................................................................









//..............................................................................
// Rest Pattern and Parameters


// oposite of the spread operator

// Spread - here it is a spread because ... on the right side of =
// const arr = [1,2,...[3,4]];
// console.log(arr); // ---> return [1,2,3,4]

// //  Rest - because on the left side of the =
// const [a,b, ...others] = [1,2,3,4,5];
// console.log(a, b, others); // ---> 1 2 [3,4,5]

// const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(pizza, risotto, otherFood);

// // Objects
// const {sat, ...weekdays} = restaurant.openingHours;
// console.log(weekdays);


// functions
// const add = function(...numbers) {
//   let sum = 0;
//   for(let i = 0; i<numbers.length; i++)
//     sum += numbers[i];
//     console.log(sum);
// };

// add(2,3);
// add(5,3,7,2);
// add(3,23,2,89);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');
//..............................................................................










//..............................................................................
// Short Circuiting (&& ||)

// use any data type, treturn any data type
//  if the first value it is a truthy operator return the first one
// console.log('......................');
// console.log(3 || 'Jonas');
// console.log('Jonas' || 3);
// console.log('' || 'Jonas'); // ---> falsy value '', return Jonas
// console.log(true || 0); // ---> true
// console.log(undefined || null); // ---> undefined its a falsy value, so return null, but null its also a falsy value
// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // ---> return Hello, the first truthy operator

// restaurant.numGuests = 0;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);
// console.log('.........AND.............');

// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');
// console.log('Jonas' && 0);
// console.log('Hello' && 23 && null && 'Jonas'); // ---> return the null

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
//..............................................................................








//..............................................................................
//  Nullish coalescing operator (??)


// restaurant.numGuests = 0;
// const guests = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests); // ---? return the 10 because 0 it is a falsy value


//  nullish : null and undefined (not 0 or '')
// const guestsCorrect = restaurant.numGuests ?? 10;
// console.log(guestsCorrect); // ---> return 0: because ?? works with nullish values intead of falsy values
//..............................................................................









//..............................................................................
// Logical Assignment Operators

// const rest1 = {
//   name: 'Capri',
//   // numGuests: 20,
//   numGuests: 0,

// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// rest1.numGuests = rest1.numGuests || 10;
// rest1.numGuests  ||= 10; // ---> equivalent of the line 335 --> dont work because work again with falsy values
// rest2.numGuests = rest2.numGuests || 10;
// rest2.numGuests ||= 10; // ---> equivalent of the line 338
// console.log(rest1);
// console.log(rest2);


// OR assignment operator
// NULLISH --> null or undefined
// rest1.numGuests  ??= 10;
// rest2.numGuests ??= 10;
// console.log(rest1);
// console.log(rest2);


// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>'; // ---> equivalent of the line 353
// rest2.owner &&= '<ANONYMOUS>'; // ---> equivalent of the line 354





// console.log(rest1);
// console.log(rest2);
//..............................................................................








//..............................................................................
// Coding Challange #1

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4
// const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1];
// console.log(players1Final);

// // 5
// const {team1, x: draw, team2} = game.odds;
// console.log(team1, draw, team2);

// // 6
// const printGoals = function (...players) {
//   console.log(players);
//   console.log(`${players.length} goals were scored`);
// };
// printGoals(...game.scored);

// // 7
// team1 < team2  && console.log('Team 1 is more likely to win');
// team1 > team2  && console.log('Team 2 is more likely to win');
//..............................................................................


















//..............................................................................
// Looping Arrays ---> FOR-OF and

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// for (const item of menu) console.log(item); // ---> we dont have more lines, tnat why we dont open a block {}

// // index and element //--> its not a great solution, but we can = .entries()
// for (const [i,el] of menu.entries()) {
//   console.log(`${i+1}: ${el}`);
// }

// console.log([...menu.entries()]);
//..............................................................................







//..............................................................................
// Enhanced Object Literals

// 1
// por exemplo, no openingHours, poderias definir fora do restaurante, depois chamavamos apneas openingHours,

// 2
// // 2.1 old way
// order: function (starterIndex, mainIndex) {
//   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; // ---> this refers to restaurant
// },

// // Equivalent to:
// // 2.1 new way
// order(starterIndex, mainIndex) {
//   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; // ---> this refers to restaurant
// },

// 3
// const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// openingHours: {
//   weekdays[3]: {
//     open: 12,
//     close: 22,
//   },
//   weekdays[4]: {
//     open: 11,
//     close: 23,
//   },
//   weekdays[5]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// },
//..............................................................................









//..............................................................................
// Optional Chaining (?.)

// if (restaurant.openingHours && restaurant.openingHours.mon) {
//   console.log(restaurant.openingHours.mon.open);
// };

// // if (restaurant.openingHours.fri) {
// //   console.log(restaurant.openingHours.fri.open);
// // }

// // with optional chaining
// console.log(restaurant.openingHours.mon?.open); // ---> undefined
// console.log(restaurant.openingHours?.mon?.open); // ---> undefined
// // console.log(restaurant.openingHours.mon.open); // ---> error

// // Example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open}`);
// };

// Methods
// console.log(restaurant.order?.(0,1) ?? 'Method does not exist');
// console.log(restaurant.orderRissoto?.(0,1) ?? 'Method does not exist'); // ---> nullshid the first one, so returns 'Method not exist'


// Arrays
// const users = [{
//   name: 'Jonas',
//   email: 'hello@jonas.io'
// }];
// console.log(users);

// // good way
// console.log(users[0]?.name ?? 'User array empty');

// //bad way
// if (users.length > 0 ) console.log(users[0].name);
// else console.log('user array empty');
//..............................................................................







//..............................................................................
// Looping Objects (keys, values, entries)

// Keys
// const properties = Object.keys(restaurant.openingHours);
// console.log(properties);
// let openStr = `We are open on ${properties.length} days`;

// for (const day of properties) {
//   openStr += `${day}, `;
// };

// console.log(openStr);

// // Values
// const values = Object.values(restaurant.openingHours);
// console.log(values);

// Entries
// const entries = Object.entries(restaurant.openingHours);
// console.log(entries);

// for ( const [key, { open, close}] of entries) {
//   console.log(`On ${key} we open as ${open} and close at ${close}`);
// }

// // simpler exemple
// const hours =  {
//   open: 12,
//   close: 23,
// };

// const entries1 = Object.entries(hours);
// console.log(entries1);

// for ( const [key, value] of entries1) {
//   console.log(`On ${key} we open as ${value}`);
// }
//..............................................................................











//..............................................................................
// Coding Challange #2

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };


// // 1
// for (const [i, player] of game.scored.entries()) {
//   console.log(`Goal ${i+1}: ${player}`);
// };

// // 2 odds average
// const values = Object.values(game.odds);
// let average = 0;
// for (const odd of values)
// average += odd;
// average /= values.length;
// console.log(average);

// // 3
// console.log(Object.entries(game.odds));
// for(const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }
//..............................................................................









//..............................................................................
// SETS

//  all the duplicates are gonne, and the aspect its kind of an array with {}
//  not good to store and retrieve
// const ordersSet =  new Set([
//   'pasta',
//   'pizza',
//   'pizza',
//   'risotto',
//   'pasta',
//   'pizza'
// ]);

// console.log(new Set('jonas'));

// console.log(ordersSet); // ---> {'pasta', 'pizza', 'risotto'}
// console.log(ordersSet.size); // ---> 3
// console.log(ordersSet.has('pizza'));
// console.log(ordersSet.has('bread'));
// ordersSet.add('garlic bread');
// ordersSet.add('garlic bread'); // ---> add only once
// console.log(ordersSet);
// ordersSet.delete('risotto');
// console.log(ordersSet);
// // ordersSet.clear();
// console.log(ordersSet);

// for (const order of ordersSet) console.log(order);

// // Example
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// const staffUnique = [...new Set(staff)]; // ---> clear duplicates with set, and then convert again to an array [...]
// console.log(staffUnique);
// console.log(new Set(staff).size); // ---> return 3
// console.log(new Set('manueldutra').size);
//..............................................................................







//..............................................................................
// MAPS

// its similar to an object, but on the keys could be any kind(string, array,etc)


// Create
// const rest = new Map();

// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze italy');
// console.log(rest.set(2, 'Lisbon Portugal'));

// rest
// .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
// .set('open', 11)
// .set('close', 23)
// .set(true, 'We are open')
// .set(false, 'We are closed');


// console.log(rest);


// // Read
// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 21;

// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));


// // Presence
// console.log(rest.has('categories'));

// // Delete
// console.log(rest);
// rest.delete(1); // ---> 1, 'Firenze italy'
// console.log(rest);

// // Size
// console.log(rest.size);

// // Remove all elements
// // rest.clear();

// const arr = [1, 2];
// rest.set(arr, 'Test');
// console.log(rest.get(arr));

// rest.set(document.querySelector('h1'), 'Heading');

// console.log(rest);
//..............................................................................







//..............................................................................
//  MAPS ITERATION


// create a new map without SET:

// const question = new Map([
//   ['question', 'What language do you speak?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'Javascript'],
//   ['correct', 3],
//   [true, 'correct'],
//   [false, 'Try again'],
// ]);

// console.log(question);


// // Convert objects to map:
// // console.log(Object.entries(restaurant.openingHours));
// // const hoursMap = new Map(Object.entries(restaurant.openingHours));
// // console.log(hoursMap);

// // Iteration

// console.log(question.get('question'));

// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }

// // const answer = Number(prompt('Your answer'));
// // console.log(answer);

// // console.log(question.get(question.get('correct') === answer ));


// // Convert Map to array:
//  console.log([...question]);


//  console.log([...question.keys()]);
//  console.log([...question.values()]);
//..............................................................................






//..............................................................................
// DATA STRUCTURE - wich should we use?

//  Array - Object - Set - Map

// 3 sources of data:
// 3.1 - source code
// 3.2 - input from user (UI)
// 3.3 - fetched from API

// Simple list: array or set
// Key/Value pairs: object or maps

//  Array vs Sets
// arrays, ordem interssa, podem repetir e podemos manipular os dados
// sets, valores unicos, remover duplicados, high-performance...delete it is 10 times faster then in arrays


// Object vs Maps
// both keys and pairs
// objects - traditional, easier to write, keys only strings, when you need to include function(methods), when using Json
// maps - better performance, keys any data type, easy to iterate
//..............................................................................






//..............................................................................
// Coding Challange #3

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1
// console.log(gameEvents.values());
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// // 2
// gameEvents.delete(64);
// console.log(gameEvents);

// // 3
// const time = [...gameEvents.keys()].pop();
// console.log(time);
// console.log(`An event happened, on average, every ${time / gameEvents.size} minutes`);


// //4
// console.log(gameEvents);

// for (const [min, event] of gameEvents) {
//   const half = min <= 45 ? 'First' : 'Second';
//   console.log(`[${half} Half] ${min}: ${event})`);
// }

//..............................................................................





//..............................................................................
// STRINGS - Part 1

// strings are primitives

// BOXING: para podermos usar os metodos, o javascript comnverte a string em objecto para depois podermos usar os metodos


// const airline = 'Tap Air Portugal';
// const plane = 'A320';


// // READ
// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);
// console.log(airline.length);
// console.log('B737'.length);

// // METHODS
// console.log('B737'.indexOf('7'));
// console.log(airline.indexOf('r'));
// console.log(airline.lastIndexOf('r'));
// console.log(airline.indexOf('Portugal'));

// console.log(airline.slice(4)); //sub string - part of a string
// console.log(airline.slice(4, 7)); // return Air

// // first word of a string
// console.log(airline.slice(0, airline.indexOf('   ')));
// // last word of a string
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));


// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));



// const checkMiddlesSeat = function (seat) {
//   // B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === 'B' || s === 'E') console.log(`You got a middle seat`);
//   else console.log(`You got lucky`);
// };

// checkMiddlesSeat('11B');
// checkMiddlesSeat('23C');
// checkMiddlesSeat('3E');
// //..............................................................................






// //..............................................................................
// // STRING - Part 2


// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // Capitalization
// const passenger = 'jOnAS';
// const passengerLower = passenger.toLowerCase()
// const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);


// // Comparing email
// const email = 'hello@jonas.io';
// const loginEmail = '  Hello@Jonas.Io \n';

// // const lowerEmail = loginEmail.toLowerCase();
// // const trimmedEmail = lowerEmail.trim(); // ---> remove empty spaces
// // console.log(trimmedEmail);


// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log( email === normalizedEmail);


// // Replacing

// const priceGB = '288,97 pounds'
// const priceUS = priceGB.replace('pounds', 'euros').replace(',', '.');
// console.log(priceUS);

// // replace all
// const announcement = `All passengers come boarding door 23. Boarding door 23!`;
// console.log(announcement.replaceAll('door','gate'));

// // Booleans
// const plane1 = 'Airbus A320neo';

// console.log(plane1.includes('A320'));
// console.log(plane1.includes('Boeing'));
// console.log(plane1.startsWith('Air'));

// if (plane1.startsWith('Airbus') && plane1.endsWith('neo')) {
//   console.log(`Part of NEW Airbus family`);
// }

// // Practice exercice

// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();
//   if (baggage.includes('knife') || baggage.includes('gun')) {
//     console.log(`You are not allowed on board`);
//   } else {
//     console.log('Welcome aboard!');
//   }
// };

// checkBaggage(`I have laptop, some foof and pocket knife`);
// checkBaggage(`Socks and camera`);
// checkBaggage(`Get some snacks and a gun for protection`);

// //..............................................................................






//  //.............................................................................
// // String - Part 3

// // SPLIT
// console.log(`a+very+nice+string`.split('+')); // ---> convert to an array
// console.log(`Manuel Fernandes Dutra`.split(' '));
// const [firstName, lastName] = 'Manuel Dutra'. split(' ');
// console.log(firstName, lastName);

// // JOIN
// const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
// console.log(newName);



// const capitalizeName = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];
//   for (const n of names) {
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     // or
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   };
//   console.log(namesUpper.join(' '));
// };

// capitalizeName('jessica ann smith davis');
// capitalizeName('manuel fernandes dutra');

// // Padding
// const message = `Go to gate 23!`;
// console.log(message.padStart(25, '+').padEnd(30, '+'));
// console.log('Jonas'.padStart(25, '+').padEnd(40, '+'));


// const maskCredit = function (number) {
//   const str = number + '';
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// }

// console.log(maskCredit(4675956956096));
// console.log(maskCredit(797979576454));
// console.log(maskCredit(123456789));

// //Repeat

// const message2 = `Bad weather...all departures Delayed...  `;
// console.log(message2.repeat(5));

// const planesInLine = function(n) {
//   console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`)
// }

// planesInLine(5);
// planesInLine(3);

//..............................................................................








//..............................................................................
//Coding Challenge #4

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click', function () {
//   const text = document.querySelector('textarea').value;
//   const rows = text.split('\n');

//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.toLowerCase().trim().split('_');

//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
//   }
// });


// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure


//..............................................................................







//..............................................................................
// String methods pratice

// console.log(flights.split('+'));

// const getCode = str => str.slice(0, 3).toUpperCase();

// for (const flight of flights.split('+')) {
//   const [type, from, to, time] = flight.split(';');
//   const output = `${type.startsWith('_Delayed') ? '🎈' : ''}${type.replaceAll('_',' ')} ${getCode(from)}${getCode(to)} ${time.replace(':', 'h')}`.padStart(36);

//   console.log(output);
// }
//..............................................................................
