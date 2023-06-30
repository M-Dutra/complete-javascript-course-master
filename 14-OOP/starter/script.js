'use strict';


// ............................................................................
// What is OOP?
// Model - class - instance
// 4  principles - Abstraction - Encapsulation - Inheritance - Polymorphism
// 1: Abstraction - hidding details that dont matter
// 2: Encapsulation - keep properties and methods private
// 3: Inheritance - admin can inheritance from user...parent vs child class
// 4: Polymorphism - a child class can overwrite a method
// ............................................................................


// ............................................................................
// OOP in Javascript

// Objects are linked to a prototype
// Prototype - contains methods
//  3 ways of implementing prototypl inheritance
// 1 - Construction functions
// 2 - ES6 Classes
// 3 - Object.create()
// ............................................................................


// ............................................................................
// 1 - Construction functions (and the new operator)
const Person = function(firstName, birthYear) {
  // Instance Properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Methods - never do this
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // }

};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 4 steps happened:
// 1 - New {} is created
// 2 - function is called, this = {}
// 3 - {} linked to prototype
// 4 - function automatically return {}

const matilda = new Person('Matilda', 1980);
const jack = new Person('Jack', 1975);
console.log(matilda);
console.log(jack);

console.log(jonas instanceof Person); // true
const jay = 'Jay';
console.log(jay instanceof Person); // false
// ............................................................................


// ............................................................................
// PROTOTYPES

console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';

console.log(jonas, matilda);
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false
// ............................................................................


// ............................................................................
// Prototypal Inheritance: Built-in Objects
console.log(jonas.__proto__); // {species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

const arr = [3,6,7,10,45,6,45]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);


// This way we can use this method in every arrays
//...but you should not use this
Array.prototype.unique= function() {
  return [...new Set(this)];
};

console.log(arr.unique());

// Proto chain - 6 until get the object
const h1 = document.querySelector('h1');
console.dir(h1);
// ............................................................................



// ............................................................................
// Coding Challange # 1
const Car = function(make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(this.speed += 10);
};

Car.prototype.brake = function () {
  console.log(this.speed -= 5);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
console.log(bmw, mercedes);
bmw.accelerate();
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();
mercedes.brake();
// ............................................................................


// ............................................................................
// 2 - ES6 Classes

// 2.1 - class expression
// const PersonCl = class {

// };



// 2.2 - class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`)
  }

  get fullName(){
    return this._fullName
  }

  static hey() {
    console.log('Hey there');
    console.log(this);
  }
};

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica.age);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

//NOTE: Methods we can do it as the construction function or inside the class
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

jessica.greet();

// 1.Classes are NOT hoisted
// 2. Class are first-class citizens
// 3. Classes are executed in strict mode
// ............................................................................


// ............................................................................
// Setters and Getters

const walter = new PersonCl('Walter White', 1965);
console.log(walter);
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest () {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);
// ............................................................................


// ............................................................................
// Static Methods

const Person1 = function(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person1.hey = function () {
  console.log('Hey there👋');
  console.log(this);
};

Person1.hey(); // works
const manuel = new Person1('Manuel', 1991);
// manuel.hey(); // does not work...because its not on the prototype of manuel object

PersonCl.hey();
// ............................................................................


// ............................................................................
// 3. Object.create()

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
console.log(sarah);
// ............................................................................


// ............................................................................
// Coding Challange # 2
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  };


  accelarate() {
    console.log(this.speed += 10);
  }

  brake() {
    console.log(this.speed -= 5);
  }
};

const ford = new CarCl('Ford', 120);
ford.accelarate();
ford.accelarate();
ford.brake();
console.log(ford.speedUS); // getter
ford.speedUS = 50; // setter
console.log(ford);
// ............................................................................



// ............................................................................
// Inheritance between Classes - Constructor Functions

// Parent
const Person3 = function(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person3.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Child
const Student = function(firstName, birthYear, course) {
  Person3.call(this, firstName, birthYear);
  this.course = course;
};

// Linking Prototypes
Student.prototype = Object.create(Person3.prototype);

Student.prototype.introduce = function() {
  console.log(`My name is ${this.firstName} and i am studying ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student); //true
console.log(mike instanceof Person3); // true because of line 335
console.log(mike instanceof Object); //true


Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
// ............................................................................




// ............................................................................
// Coding Challange # 3
const EV = function(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};


EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBatery = function (chargeTo) {
  this.charge = chargeTo;
};


EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(`${this.make} is going at ${this.speed},
  with a charge of ${this.charge}%`);
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate(); // o parent tbm tem um accelarate method, mas ele usa primeiro o sei e so depois vai ao pai
tesla.brake();
tesla.chargeBatery(55);
console.log(tesla);
// ............................................................................
