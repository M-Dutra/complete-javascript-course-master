'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-05-20T23:36:17.929Z',
    '2023-05-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementsDate = function(date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)); // result in miliseconds
  const daysPassed = calcDaysPassed(new Date(), date);

  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);

  // else {
  //   const day = `${date.getDate()}`.padStart(2,0);
  //   const month = `${date.getMonth() + 1}`.padStart(2,0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
};

const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};



const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //Dates
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);

    // Currency
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// // FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;





btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Experiment API
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      // weekday: 'long'
    };
    const locale = currentAccount.locale;
    console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);


    // const day = `${now.getDate()}`.padStart(2,0);
    // const month = `${now.getMonth() + 1}`.padStart(2,0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2,0);
    // const min = `${now.getMinutes()}`.padStart(2,0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();



    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

    setTimeout(function(){
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
    
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





//..............................................................................
// Converting and Checking Numbers

console.log(23 === 23.0); // ---> integer and float its the same

// Base 10-0 to 9 --- 1/10 = 0.1 ---- 3/10 = 3.3333
// Binary base 2-0 1
console.log(0.1 + 0.2); // ---> .30000000004!!!
console.log(0.1 + 0.2 === 0.3); //----> false ahaha

// Convert String to Number
console.log(Number('23'));
// or
console.log(+'23');

// Parsing
// 1 parseInt
console.log(Number.parseInt('30px')); // return 30
console.log(Number.parseInt('e23')); // return NaN - need to be the number at first place
// the second argument its the base....10 or binary
console.log(Number.parseInt('30px', 2)); // return NaN
console.log(Number.parseInt('30px', 10)); // return 30
console.log(Number.parseInt('e23', 10)); // return NaN
// 2 parseFloat
console.log(Number.parseFloat('   2.5rem')); // 2.5
console.log(Number.parseInt('   2.5rem')); // 2

// isNaN
console.log(Number.isNaN(20));  // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false

// isFinite
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false
// best to check if it is a real number


// isInteger
console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false
//..............................................................................




//..............................................................................
// Math and Rounding
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1/2)); // 5 note that ** exponencial
console.log(25 ** (1/3)); // 2 cube

// Maximum
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23 because use caortion
console.log(Math.max(5, 18, '23px', 11, 2)); // dont parse
// Minimum
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Area circunferencia
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Random
// gives a number between 0-1
console.log(Math.random());
// dice
console.log(Math.trunc(Math.random() * 6 + 1));
//
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1 + min);
console.log(randomInt(10, 20));

//..............................................................................
// Rounding integers
// Trunc
console.log(Math.trunc(20.55)); // 20
//Round
console.log(Math.round(20.55)); // 21
console.log(Math.round(20.45)); // 20

// Ceil
// para cima
console.log(Math.ceil(20.55)); // 21
console.log(Math.ceil(20.45)); // 21

// Floor
// para baixo
console.log(Math.floor(20.55)); // 20
console.log(Math.floor(20.45)); // 20

// negative numbers
console.log(Math.trunc(-20.55)); // -20
console.log(Math.round(-20.55)); // -21
console.log(Math.round(-20.45)); // -20
console.log(Math.ceil(-20.55)); // -20
console.log(Math.floor(-20.45)); // -21
//..............................................................................



//..............................................................................
// Rounding decimals
// toFixed - return a string
console.log((2.7).toFixed(0)); // 3
console.log((2.7).toFixed(3)); // 2.700
console.log((2.345).toFixed(2)); // 2.35
console.log(+(2.345).toFixed(2)); // 2.35
//..............................................................................



//..............................................................................
// The remainder operator
console.log(5 % 2); // 1
console.log(5 / 2) // 5 = 2 * 2 + 1
console.log(8 % 3); // 0
console.log(8 / 3); // 8 = 2 * 3 + 2


// EVEN - par
console.log(6 % 2); // 0 --> par
console.log(6 / 2); // 3 -->


// ODD - impar
console.log(7 % 2); // 1 --> impar
console.log(7 / 2); // 3.5 -->


const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered'; //0, 2, 4, 6
    if (i % 3 === 0) row.style.backgroundColor = 'blue'; // 1, 3, 5, 7
  });
});
//..............................................................................



//..............................................................................
// Numeric Separators
// 287,460,000,000
const diameter = 287460000000;
const diameter2 = 287_460_000_000;
console.log(diameter2);

const priceCents = 345_99;
console.log(priceCents);

const transferFee = 15_00;
const transferFee2 = 1_500;
console.log(transferFee);
// is the same
console.log(transferFee2);

const PI = 3.14_15 // you cant put near the dot, after or before
console.log(PI);

console.log(Number('230_00000')); // NaN, only can use on numbers
console.log(parseInt('230_00000')); // do _ para a frente ingora --- retorna 230
//..............................................................................


//..............................................................................
// BigInt
// primitive type
console.log(2 ** 53 -1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);
// permitenos guardar numeros maiores do que a linha 433
console.log(885858575756639390300304535);
console.log(885858575756639390300304535n); //BigInt
console.log(BigInt(885858575));


// Operations
console.log(10000n + 10000n);
console.log(100088488773737737377362662535350n * 10000n);

const huge = 20289967376838938909n;
const num = 23;
// console.log(huge * num); // error, cannot mix bigint with small numbers
console.log(huge * BigInt(num)); // solution: convert small number into a BigInt


console.log(20n > 15); // true
console.log(20n === 20); // false
console.log(20n == '20'); // true
console.log(typeof(20n)); // bigInt
console.log(huge + 'is really big');

// console.log(Math.sqrt(16n)); // doesn t work

// Divisions
console.log(10 / 3); // 3.33333
console.log(10n / 3n); // 3n
//..............................................................................



//..............................................................................
// Dates
// Create Date
// const now = new Date();
// console.log(now);
// console.log(new Date('Jun 22 2023 12:07:27'));
// // parsing the string - with you should not do this
// console.log(new Date('December 24, 2015'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 15, 23, 5)); // note: month comeca no 0 = janeiro.
// console.log(new Date(2037, 10, 33)); // day 33 - comeca a contagem Thu Dec 03 2037
console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days later the previous line

//  Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth()); // 0 = Janeiro
// console.log(future.getDate()); // day of the month
// console.log(future.getDay()); // 0 = Sunday
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString()); // 2037-11-19T14:23:00.000Z
// console.log(future.getTime()); // timestamps - quantos segundos passaram desde new date(0) - 1 Jan 1970
// console.log(new Date(2142253380000)); // the same as const future

// //Current timestamp
// console.log(Date.now()); // 1687429617696

// // Update
// future.setFullYear(2040);
// console.log(future);
//..............................................................................


//..............................................................................
// Operation Dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);
// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // result in miliseconds

// const days1 = calcDaysPassed(
//   new Date(2037, 3, 4),
//   new Date(2037, 3, 14)
// );
// console.log(days1);

//..............................................................................



//..............................................................................
// Internationalizing Dates

//..............................................................................




//..............................................................................
// Internationalizing Numbers
const num1 = 3884764.23;
const options = {
  style: 'currency', // percent, currency, unit
  unit: 'mile-per-hour', // celsius
  currency: 'EUR',
  // useGrouping: false,
};
console.log('US:', new Intl.NumberFormat('en-US').format(num1));
console.log('GR:', new Intl.NumberFormat('de-DE').format(num1));
console.log('Syria:', new Intl.NumberFormat('ar-SY').format(num1));
console.log('Bowser:', new Intl.NumberFormat(navigator.locale).format(num1));

//with second argument, options
console.log('US:', new Intl.NumberFormat('en-US', options).format(num1));
console.log('GR:', new Intl.NumberFormat('de-DE', options).format(num1));
console.log('Syria:', new Intl.NumberFormat('ar-SY', options).format(num1));
console.log('Bowser:', new Intl.NumberFormat(navigator.locale, options).format(num1));
//..............................................................................



//..............................................................................
//Timers (setTimeout vs setInterval)

// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`), 3000, ...ingredients); // apos 3 segundos faz o console.log()
console.log(`Waiting`);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);


// setInterval -
// setInterval(function(){
//   const now = new Date();
//   console.log(now)
// }, 1000);
//..............................................................................


//..............................................................................
// Countdown Timer
//..............................................................................
