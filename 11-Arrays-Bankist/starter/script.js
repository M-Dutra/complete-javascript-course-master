'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ....................................................
const displayMovements = function (movements, sort = false) {
  // Limpar o html
  // innerHTML vs. textContent:
  // innnerHTML = returns everything including the html tags
  // textContent = just the text
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
        </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
      });
    };
    // ....................................................


    // ....................................................
    // Current Balance --> .reduce and sum the elements of the movements array
    const calcDisplayBalance = function(acc) {
      acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
      labelBalance.textContent = `${acc.balance} €`;
    };
    // ....................................................


    // ....................................................
    // Resumo bottom - in out interest
    const calcDisplaySummary = function(acc){
      const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);

      labelSumIn.textContent = `${incomes}€`;

      const outcomes = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);

      labelSumOut.textContent = `${Math.abs(outcomes)}€`;

      const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((interest, index, array) => {
          console.log(array);
          return interest >= 1;
        })
        .reduce((acc, interest) => acc + interest, 0);

      labelSumInterest.textContent = `${interest}€`;
    };
    // ....................................................

// ....................................................
// Username - add a new pair on the object: username: 'md'
const createUsernames = function(accs) {
  accs.forEach(function(acc){
    acc.username = acc.owner
      .toLowerCase()
      .split(' ') // ---> puts on array
      .map(name => name[0]) //---> array with the first letter
      .join(''); //---> convert array into a string
  });
};
createUsernames(accounts);
// ....................................................


// ....................................................
const updateUI = function(acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};
// ....................................................





// ....................................................
// Log in - implementing
// event handelers
let currentAccount;

btnLogin.addEventListener('click', function(event){
  event.preventDefault(); // prevent form submitting
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {

    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // remove cursor blinking
    inputLoginPin.blur();

    // Display movements, balance and summary
    updateUI(currentAccount);

  };
});
// ....................................................




// ....................................................
// Transfers - right side of the app
btnTransfer.addEventListener(`click`, function(event){
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // clear the field
  inputTransferAmount.value = inputTransferTo.value = ' ';
  // remove money from current user and add positive on the receiver
  // current user have enought money? verify if number is positive
  if ( amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
      // Update users interface
      updateUI(currentAccount);
  }

});
// ....................................................



// ....................................................
// LOAN
btnLoan.addEventListener(`click`, function(event){
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 &&  currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    // Add movement to current account
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  };
  inputTransferAmount.value = '';
});
// ....................................................






// ....................................................
// Close account
btnClose.addEventListener(`click`, function(event){
  event.preventDefault();

  if (inputCloseUsername.value === currentAccount.username
    && inputClosePin.value === currentAccount.pin) {
      const index = accounts.findIndex(acc => acc.username === currentAccount.username);
      console.log(index);
      // Delete account
      accounts.splice(index, 1);
      // Hide UI
      containerApp.style.opacity = 0;
    };
  // Clear fields
  inputTransferAmount.value = inputTransferTo.value = ' ';
});
// ....................................................


// ....................................................
// Sort

let sorted = false;

btnSort.addEventListener(`click`, function(event){
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// ....................................................





/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// ....................................................
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2)); // ---> ['c', 'd', 'e ]
console.log(arr.slice(2,4)); //---> ['c', 'd']
console.log(arr.slice(-2)); // ---> ['d', 'e']
console.log(arr.slice(-1)); // ---> ['e']
console.log(arr.slice(1,-2)); //---> ['b', 'c']
// slice create a copy of an array
// 1
console.log(arr.slice());
// 2 (spread operator)
console.log([...arr]);
// Best solution: slice better when you whant to call other methods .something.y.z

// SPLICE
// mutates the original array
console.log(arr.splice(2)); //---> ['c', 'd', 'e']
// watch now the original array
console.log(arr); //---> ['a', 'b']
// second arguement, elements to delete
console.log(arr.splice(1,2)); //---> index 1, delete index 1 and 2

// REVERSE
// muates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f' ];
console.log(arr2.reverse()); //---> le de tras para a frente
console.log(arr2); // ---> now the arr2 is the reverse

// CONCAT
// doesn t mutate the original one
const letters = arr.concat(arr2);
console.log(letters); //---> array from a to j
// the same as
console.log([...arr, ...arr2]);


// JOIN
//converts to string
console.log(letters.join('-'));

// OTHERS
// push
const animals = ['pigs', 'goats', 'sheep'];
console.log(animals.push('cows')); //---> adiciona no fim

// SHIFT
// The shift() method removes the first element from an array
// and returns that removed element.
//  This method changes the length of the array.
const array1 = [1, 2, 3];
const firstElement = array1.shift();
console.log(array1);// Expected output: Array [2, 3]
console.log(firstElement);// Expected output: 1

// UNSHIFT
// The unshift() method adds the specified elements to the
//  beginning of an array and returns the new length of the array.
const array2 = [1, 2, 3];
console.log(array2.unshift(4, 5));// Expected output: 5
console.log(array2);// Expected output: Array [4, 5, 1, 2, 3]

// POP
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
console.log(plants.pop());// Expected output: "tomato"
console.log(plants);// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
plants.pop();
console.log(plants);// Expected output: Array ["broccoli", "cauliflower", "cabbage"]

// IndexOf
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison'));// Expected output: 1
console.log(beasts.indexOf('bison', 2));// Start from index 2 // Expected output: 4
console.log(beasts.indexOf('giraffe'));// Expected output: -1, qunado nao existe retorna -1

// INCLUDES
const array3 = [1, 2, 3];
console.log(array3.includes(2));// Expected output: true
const pets = ['cat', 'dog', 'bat'];
console.log(pets.includes('cat'));// Expected output: true
console.log(pets.includes('at'));// Expected output: false

// AT
const arr4 = [23, 11, 64];
console.log(arr4[0]);
// or
console.log(arr4.at(0)); // ---> return 23
// last array element
console.log(arr4[arr2.length-1]);
console.log(arr4.slice(-1)[0]);
console.log(arr4.at(-1));
// works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
// ....................................................


// ....................................................
// Loopin: forEach
const movements = [200, 450, -400, 3000,
                  -650, -130, 70, 1300];

console.log(movements);
console.log(movements.entries());

// for of
for ( const movement of movements) {
  if (movement > 0 ) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdraw ${Math.abs(movement)}`);
  }
}

console.log(`............forEach`);

// forEach
movements.forEach(function (movement) {
  if (movement > 0 ) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdraw ${Math.abs(movement)}`);
  }
})

// use the index
//for of
for ( const [index, movement] of movements.entries()) {
  if (movement > 0 ) {
    console.log(`Movement ${index+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index+1}: You withdraw ${Math.abs(movement)}`);
  }
}
// ....................................................
// forEach - ARRAYS
movements.forEach(function (movement, index, array) {
  if (movement > 0 ) {
    console.log(`Movement ${index+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index+1}: You withdraw ${Math.abs(movement)}`);
  }
})

// repara que a ordem dos argumentos é diferente
// for of (index, element) e array.entries()
// forEach (element, index, array)
// forEach nao consegues usar o break...continue and break nao funciona, fazem loop em todo o array
// ....................................................




// ....................................................
// forEach - MAPS and SETS
// Maps
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);


  currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
  })

  // SET

  const currenciesUnique = new Set(['USD', 'GBP',
                                  'USD', 'EUR', 'EUR']);

console.log(currenciesUnique);


// nao faz sentido ter o segundo argumento, key, pois key e value sao iguais
// o set nao tem key, mas forEach foi construido desta forma
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// ....................................................



// ....................................................
// Coding Challange # 1
// const checkDogs = function(arr1, arr2) {
//   const arr1Correct = arr1.slice(1,-2);
//   const dogs = [...arr1Correct, ...arr2];
//   // or with concat: const dogs = arr1Correct.concat(arr2);

//   console.log(arr1); // com o slice mantem o array original
//   console.log(dogs);
//   dogs.forEach(function (dog, index){
//     if (dog >= 3) {
//       console.log(`Dog number ${index + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${index + 1} is still a puppy 🐶`)
//     }
//   });
// };

// // const dogsJulia = [3, 5, 2, 12, 7];
// // const dogsKate = [4, 1, 15, 8, 3];

// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];

// checkDogs(dogsJulia, dogsKate);
// ....................................................




// ....................................................
// Data Transformations: MAP - FILTER - REDUCE

// ....................................................
// MAP
// Theory
//The map() method creates a new array populated
// with the results of calling a provided function on every element in the calling array.
const array5 = [1, 4, 9, 16];
// Pass a function to map
const map5 = array5.map(x => x * 2);
console.log(map5);
// Expected output: Array [2, 8, 18, 32]


// Other example:
const movements1 = [200, 450, -400, 3000,
                  -650, -130, 70, 1300];

const euroToUsd = 1.1;

const movementsUSD = movements1.map(function(mov){
  return mov * euroToUsd;
});

console.log(movements1);
console.log(movementsUSD);

// do the same but with a for of loop
const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * euroToUsd);
};
console.log(movementsUSDfor);

// write the map with a arrow function
const movementsUSD1 = movements1.map(mov => mov * euroToUsd);
console.log(movementsUSD1);

// another exemple with movements but printing a string
// dont forget, it will return an array
const movementsDescriptions = movements1.map((mov, index) =>
  `Movement ${index + 1}: You ${mov > 0 ? 'deposited' : 'withdraw'} ${Math.abs(mov)}`
);
console.log(movementsDescriptions);
// ....................................................


// ....................................................
// FILTER
 //theory
// The filter() method creates a shallow copy of a portion
//  of a given array, filtered down to just the elements
//  from the given array that pass the test implemented
//  by the provided function.
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]


//other exemples
const deposits = movements.filter(function(mov){
  return mov > 0;
});

console.log(movements);
console.log(deposits);


// the same but with arrow function
const deposits1 = movements.filter(mov => mov > 0);
console.log(deposits1);

// the same but with a for of
const depositsFor = [];
for (const mov of movements) if (mov > 0 ) depositsFor.push(mov);
console.log(depositsFor);

//Do the same but to withdrawals
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
// ....................................................


// ....................................................
// REDUCE
// theory
// The reduce() method executes a user-supplied "reducer"
//  callback function on each element of the array, in order,
//  passing in the return value from the calculation on the preceding element.
//   The final result of running the reducer across all elements
//  of the array is a single value.
const array6 = [1, 2, 3, 4];
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array6.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);
console.log(sumWithInitial);
// Expected output: 10

// other exemples
// with the array give the balance, sum of array

console.log(movements);

// acccumulator --> SNOWBALL
const balance = movements.reduce(function(accumulator, current, index, array){
  console.log(`Iteration ${index}: ${accumulator}`)
  return accumulator + current;
}, 0);
console.log(balance);

//for of loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);


// the same but with arrow function
const balance3 = movements.reduce((accumulator, current) =>
  accumulator + current, 0
);
console.log(balance3);


// Another example:
// get the maximum of the array movements:
const max = movements.reduce((acc, mov) => {
  if (acc > mov)
    return acc;
  else
    return mov;
}, movements[0]);

console.log(max);
// ....................................................


// ....................................................
//  Coding Challange # 2
const calcAverageHumanAge = function(array) {

  const humanAge = array.map(function(dogAge){
    if ( dogAge <= 2) {
      return 2 * dogAge;
    } else {
      return 16 + 4 * dogAge;
    }
  });

  // console.log(humanAge);

  const oldAge = humanAge.filter(function(exclude){
    return exclude > 18;
  });

  // console.log(oldAge);

  const average =  oldAge.reduce(function(acc, curr) {
    return acc + curr;
  }, 0);

  console.log(average / oldAge.length);
};


const age1 = [5,2,4,1,15,8,3];
const age2 = [16,6,10,5,6,1,4];

calcAverageHumanAge(age1);
calcAverageHumanAge(age2);
// ....................................................


// ....................................................
// Chaining Methods
// using methods like map, reduce and filter

// Pipeline
// ---> note: to debug, you can call the 3 arguments and print the arr
const totalDepositsUSD = movements
.filter(mov => mov > 0)
.map(mov => mov * euroToUsd )
.reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
// ....................................................



// ....................................................
//  Coding Challange # 3
// ---> refactor the code with Arrow functions and chaining methods
const calcAverageHumanAge2 = function(ages) {

  const humanAge = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(exclude => exclude >= 18)
    .reduce((acc, curr, index, arr) => acc + curr / arr.length, 0);
};


const age3 = [5,2,4,1,15,8,3];
const age4 = [16,6,10,5,6,1,4];

calcAverageHumanAge2(age3);
calcAverageHumanAge2(age4);
// ....................................................



// ....................................................
// FIND
// theory
// The find() method returns the first element in the provided
// array that satisfies the provided testing function.
//  If no values satisfy the testing function, undefined is returned.
const array7 = [5, 12, 8, 130, 44];
const found = array7.find(element => element > 10);
console.log(found);
// Expected output: 12

// Other example
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// attention
// filter gives a array
// find gives a element, the first one that satisfy the condition


// Another example - select a specific per name of the owner
console.log(accounts);
const account = accounts.find(account => account.owner === `Jessica Davis`)
console.log(account);
// ....................................................



// ....................................................
// Find Index
// The findIndex() method returns the index
//  of the first element in an array that satisfies
//  the provided testing function.
//  If no elements satisfy the testing function, -1 is returned.
const array8 = [5, 12, 8, 130, 44];
const isLargeNumber = (element) => element > 13;

console.log(array8.findIndex(isLargeNumber));
// Expected output: 3
// ....................................................


// ....................................................
// SOME
// The some() method tests whether at least one element in the array
// passes the test implemented by the provided function.
// It returns true if, in the array,
// it finds an element for which the provided function
// returns true; otherwise it returns false. It doesn't
// modify the array.
const array9 = [1, 2, 3, 4, 5];
// Checks whether an element is even
const even = (element) => element % 2 === 0;
console.log(array9.some(even));
// Expected output: true

// Other exemples - Some kind related with .includes method
// Includes - check equality
// Some - condition
console.log(movements);
console.log(movements.includes(-130));
// Lets write the previous line with the some method:
console.log(movements.some(mov => mov === -130));


console.log(movements.some(mov => mov > 0 ));
console.log(movements.some(mov => mov > 5000 ));
console.log(movements.some(mov => mov > 1500));
// ....................................................



// ....................................................
// EVERY
// The every() method tests whether all elements in the
//  array pass the test implemented by the provided function.
//  It returns a Boolean value.
const isBelowThreshold = (currentValue) => currentValue < 40;
const array10 = [1, 30, 39, 29, 10, 13];
console.log(array10.every(isBelowThreshold));
// Expected output: true

// Other examples
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov < 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
// ....................................................



// ....................................................
// FLAT
const arr11 = [0, 1, 2, [3, 4]];
console.log(arr11.flat());
// Expected output: Array [0, 1, 2, 3, 4]
const arr12 = [0, 1, 2, [[[3, 4]]]];
console.log(arr12.flat(2));
// Expected output: Array [0, 1, 2, Array [3, 4]]

// Other exemples
const arr14 = [[1,2,3], [4,5,6], 7, 8];
console.log(arr14.flat());
const arrDeep = [[[1,2],3], [4,[5,6]], 7, 8];
console.log(arrDeep.flat(2)); //deepth argument - 2
// ....................................................


// ....................................................
// FLATMAP

// Combines the flat and the map

// const arr13 = [1, 2, 1];
// const result = arr13.flatMap((num) => (num === 2 ? [2, 2] : 1));
// console.log(result);
// Expected output: Array [1, 2, 2, 1]
// ....................................................




// ....................................................
// Small exercise...calculate all the balance of all accounts
// Another one
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// or with chaining - the same
const overalBalance1 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance1);


// or with flatmap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance2);
// ....................................................



// ....................................................
// SORT
// mutates the original array
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]
const array15 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array15);
// Expected output: Array [1, 100000, 21, 30, 4]


// Other examples

const owners = ['jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);


// With number it is different
console.log(movements);
console.log(movements.sort()); // ---> dont work, sort by string
// how to solve:
// return < a, A,B
// return > 0, B,A

// ASCENDING
movements.sort((a,b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});

console.log(movements);

// the same
movements.sort((a,b) => a - b);


// DESCENDING
movements.sort((a,b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});


// the same
movements.sort((a,b) => b - a);

console.log(movements);
// ....................................................





// ....................................................
// Creating and Filling Arrays

console.log([1,2,3,4,5,6,7]);
console.log(new Array(1,2,3,4,5,6,7));

// FILL
// Creates a empty aray with length 7
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5)); // ---> dont work

// Solution, method fill
// x.fill(1);
x.fill(1, 3, 5); //---> do index 3 ate ao 5 preenche com 1
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// FROM
const y = Array.from({length: 7}, () => 1 );
console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1);
console.log(z);


labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements_value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
// ....................................................


// ....................................................
// Which array we should use?

// we learn gross 23 methods to arrays
// ....................................................


// ....................................................
// Practice lecture

// 1 - Total deposits of all accounts
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >0)
  .reduce((sum, curr) => sum + curr, 0);

// 2 - Count deposits above 1000
const numDeposits1000x = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000)
  .length;

console.log(numDeposits1000x);

// do the same but with reduce
const numDeposits1000y = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => cur >= 1000 ? count ++ : count, 0)

console.log(numDeposits1000y);

let a = 10;
console.log(a++); //---> return 10
console.log(a); //---> return 11
console.log(++a); //---> return 12
console.log(a); //---> return 12


// // 3 - New object Sum of deposits and sum of withdrawals
// const { deposits, withdrawals} = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//     // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
//     // OR
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits, withdrawals);


// 4 - Convert string to TitleCase

// exemple: This Is a Nice Title

const convertTitleCase = function(title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ')
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
// ....................................................




// ....................................................
//  Coding Challange # 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

// 1
dogs.forEach(dog => (dog.recFood = Math.trunc( dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2
const sarahDog = dogs.find( dog => dog.owners.includes('Sarah'));
console.log(sarahDog);
console.log(`Sarah s dog is eating too ${sarahDog.curFood > sarahDog.recFood ? 'much' : 'little'}`);

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners)
console.log(ownersEatTooMuch);


const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood )
  .flatMap(dog => dog.owners)
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(', ')} dogs eat too much`);
console.log(`${ownersEatTooLittle.join(', ')} dogs eat too little`);

// 5
const dogsEatTooPerfect = dogs
  .some(dog => dog.curFood === dog.recFood )
console.log(dogsEatTooPerfect);

// 6
const checkEatingOk = dog =>  dog.curFood < 1.1 * dog.recFood && dog.curFood > 0.9 * dog.recFood;

const dogsEatOk = dogs
  .some(checkEatingOk);
console.log(dogsEatOk);

// 7
console.log(dogs.filter(checkEatingOk));

// 8
// create shallow copy
const shallowCopySorted = dogs
  .slice()
  .sort((a,b) => a.recFood - b.recFood);
console.log(shallowCopySorted);
// ....................................................
