'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// .............................................................................
//  Asynchronous, AJAX, APIS
// .............................................................................


// .............................................................................
//  Our first AJAX call: XML HTTP request

// 1 -  old school way: http request

const renderCountry = function(data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.continents[0]}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
  <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
  <p class="country__row"><span>💰</span>${Object.keys(data.currencies)[0]}</p>
  </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {

//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText); // this = request...the result is JSON = big string...we need to convert
//     //or
//     // const data = JSON.parse(this.responseText[0]]; // initialy have this format [{...}]
//     console.log(data);
//     // Render country 1
//     renderCountry(data);


//     // Get neighbour country 2
//     const [neighbour] = data.borders
//     if(!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');


// .............................................................................

// .............................................................................
//How the web works: Request and Responses
// .............................................................................


// .............................................................................
//Welcome to Callback Hell
// incialmente, ao fazer refresh no browser, a ordem dos paises alterava
// agora vamos garantir que a chamada do ajax, so e feita apos a anterior estar concluída
// lets call neighbour conntries
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// triangular shape
// SOLUTION - PROMISES
// .............................................................................


// .............................................................................
// PROMISES AND THE FETCH API
// 2 - FETCH API

// old way
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();


// const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
// console.log(request); // return Promise {<pending>} - container for a future value
// change over time - lifecycle:
// 1 - pending
// 2 - settled (fulfilled vs rejected)
// entre 1 e 2 - async task

// Build vs Consume Promisse
// .............................................................................



// .............................................................................
// CONSUME PROMISE

// const request = fetch(`https://restcountries.com/v3.1/name/portugal`);
// console.log(request);

// const getCountryData = function(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Refactor the previous code:
// const getCountryData = function(country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if(!response.ok)
//         throw new Error(`Country not found (${response.status})`)
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//       // Country 2
//       const neighbour = data[0].borders[0];
//       if(!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if(!response.ok)
//         throw new Error(`Country not found (${response.status})`)
//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🔥🔥🔥`); // handling the error
//       renderError(`Something went wrong: ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })
// };


// Refactor the previous code:


const getJSON = function(url, errorMSG = 'Something went wrong') {
  return fetch(url)
    .then(response => {
      if(!response.ok)
        throw new Error(`${errorMSG} (${response.status})`);
      return response.json();
    });
};



// const getCountryData = function(country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       // Country 2
//       const neighbour = data[0].borders[0];
//       if(!neighbour) throw new Error('No neighbour found!!');
//       return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`,'Country not found');
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🔥🔥🔥`); // handling the error
//       renderError(`Something went wrong:😭 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     })
// };




// getCountryData('costa rica');
// .............................................................................


// .............................................................................
// Chaining Promises
// .............................................................................


// .............................................................................
// Handling rejected promises

// btn.addEventListener('click', function() {
//   getCountryData('costa rica');
// });


// .............................................................................
// Trowing errors manually
// getCountryData('australia');
// .............................................................................


// .............................................................................
// Coding Challange # 1
// const renderCountry = function(data, className = '') {
//   const html = `
//   <article class="country ${className}">
//   <img class="country__img" src="${data.flags.svg}" />
//   <div class="country__data">
//   <h3 class="country__name">${data.name.common}</h3>
//   <h4 class="country__region">${data.continents[0]}</h4>
//   <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//   <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
//   <p class="country__row"><span>💰</span>${Object.keys(data.currencies)[0]}</p>
//   </div>
//   </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const whereAmI = function(lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       console.log(response)
//       if(!response.ok)
//         throw new Error(`Problem with geolocation (${response.status})`)
//       return response.json()
//     })
//     .then(data => {
//       console.log(data);
//       const city = data.city;
//       const country = data.country;
//       console.log(`You are in ${city}, ${country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${country}`)
//     })
//     .then(response => {
//       if(!response.ok)
//         throw new Error(`Country not found (${response.status})`)
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 😤`))
// };

// whereAmI(52.508, 13.381); // berlin, germany
// whereAmI(19.037, 72.873); // munbai india
// whereAmI(-33.933, 18.474); // cape town, south africa
// .............................................................................



// .............................................................................
// ASYNCHRONOUS: The event Loop
// theory
// .............................................................................

// .............................................................................
//  The event Loop: Practice

// note: micro-task queu have priority
//
// .............................................................................


// .............................................................................
// Build PROMISE (259)
const lotteryPromise = new Promise(function(resolve, reject){

  console.log('Lottery draw is happening 🔮');

  setTimeout(function(){

    if(Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You LOST your money 😱'));
    }

  }, 2000)

});

// lotteryPromise
//   .then(response => console.log(response))
//   .catch(err => console.error(err));


//   // Promissifying setTimeout
// const wait = function(seconds) {
//   return new Promise(function(resolve){
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1).then(() => {
//   console.log('I waited for 1 seconds');
//   return wait(1);
// }).then(() => {
//   console.log('I waited for 2 second');
//   return wait(1);
// }).then(() => {
//   console.log('I waited for 3 second');
//   return wait(1);
// }).then(() => {
//   console.log('I waited for 4 second');
//   return wait(1);
// })

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem')).catch(x => console.error(x));
// // .............................................................................


// // .............................................................................
// // Promisifying: Geolocation API

// const getPosition = function() {
//   return new Promise(function(resolve, reject){
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   });
// };

// getPosition().then(pos => console.log(pos));




// const whereAmI = function() {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })

//     .then(response => {
//       console.log(response)
//       if(!response.ok)
//         throw new Error(`Problem with geolocation (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       const city = data.city;
//       const country = data.country;
//       console.log(`You are in ${city}, ${country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then(response => {
//       if(!response.ok)
//         throw new Error(`Country not found (${response.status})`)
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 😤`))
//   };


//   btn.addEventListener('click', whereAmI);
// .............................................................................



// .............................................................................
// Coding Challange # 2

// const imgContainer = document.querySelector('.images');

// const wait = function(seconds) {
//   return new Promise(function(resolve){
//     setTimeout(resolve, seconds * 1000);
//   });
// };


// const createImage = function(imgPath) {

//   return new Promise(function(resolve, reject){

//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function(){
//       imgContainer.append(img);
//       resolve(img);
//     })

//     img.addEventListener('error', function() {
//       reject(new Error('Image not found'))
//     });

//   });
// };


// let currentImg;

// createImage('img/img-1.jpg')

//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })


//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })


//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })


//   .then(() => {
//     currentImg.style.display = 'none';
//   })


//   .catch(err =>  console.error(err))
// .............................................................................


// .............................................................................
// CONSUMING PROMISES: ASYNC/WAIT


// const getPosition = function() {
//   return new Promise(function(resolve, reject){
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   });
// };

// // async and await is the same as:
// // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res))

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng} = pos.coords;
//     // Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if(!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();


//     const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
//     if(!res.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`

//   } catch(err) {
//     renderError(`Something went wrong ${err.message}`);
//     // Reject promise returned from async function
//     throw err;
//   }
// };

// console.log(`1:Will get location`);
// // const city = whereAmI();
// // console.log(city);


// // whereAmI()
// //   .then(city => console.log(`2: ${city}`))
// //   .catch(err => console.log(`2: ${err.message} 💥`))
// //   .finally(() => console.log(`3: Finished getting location`));

// // Refactor the code
// (async function() {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} 🔥`);
//   }
//   console.log(`3: Finished getting location`);
// })();

// console.log(`3: Finished getting location`);


// .............................................................................


// .............................................................................
// TRY AND CATH
// Error handling: with async and await
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }
// .............................................................................


// .............................................................................
// Returning values: Async Functions
// .............................................................................



// .............................................................................
// PROMISE.ALL
// Running promisses in Parallel -

// This way they are running one by one
// const get3Countries = async function(c1, c2, c3) {
//   try {
//     const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
//   } catch(err) {
//     console.log(err);
//   }
// }
// get3Countries('portugal', 'canada', 'tanzania');

// Lets make it on Parallel
// const get3Countries = async function(c1, c2, c3) {
//   try {
//     const data = await Promise.all([

//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),

//     ]);
//     console.log(data.map(element => element[0].capital[0]));

//   } catch(err) {
//     console.log(err);
//   }
// }
// get3Countries('portugal', 'canada', 'tanzania');
// .............................................................................


// .............................................................................
//Promise.race
// (async function() {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]); // prints the faster one to upload
// }) ();



// const timeout = function(sec) {
//   return new Promise(function(_, reject) {
//     setTimeout(function() {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(0.2)
// ]).then(res => console.log(res[0]))
// .catch(err => console.error(err));

// .............................................................................

// .............................................................................
// Promise.allSettled

// return all results of all promises, dont make a short circuit
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));

// vs Promisse.all
// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res))
// .catch(err => console.error(err));

// .............................................................................


// .............................................................................
//Promise.any (ES2021)

// return first fullfield promise, and ignore promise reject

// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Another success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));


// .............................................................................
