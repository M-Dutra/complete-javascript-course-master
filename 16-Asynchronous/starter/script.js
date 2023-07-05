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
  // countriesContainer.style.opacity = 1;
};

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
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



const getCountryData = function(country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      // Country 2
      const neighbour = data[0].borders[0];
      if(!neighbour) throw new Error('No neighbour found!!');
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`,'Country not found');
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 🔥🔥🔥`); // handling the error
      renderError(`Something went wrong:😭 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
};




getCountryData('costa rica');
// .............................................................................


// .............................................................................
// Chaining Promises
// .............................................................................


// .............................................................................
// Handling rejected promises

btn.addEventListener('click', function() {
  getCountryData('costa rica');
});


// .............................................................................
// Trowing errors manually
getCountryData('australia');

// .............................................................................
