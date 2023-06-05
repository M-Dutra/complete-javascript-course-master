// Remember, we're gonna use strict mode in all scripts now!
'use strict';

                                                          // Problem 1 - Amplitude


// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// const calcAmplitude = function (temps) {

//   let max = temps[0];
//   let min = temps[0];

//   for(let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   console.log(max, min);

//   const amplitude =  max - min;
//   return amplitude;
// }
// console.log(calcAmplitude(temperatures));



                                                  // Problem 2 - Receive 2 arrays



// console.log(`-------Problem 2--------`);

// const temperatures2 = [2000];

// const calcAmplitudeNew = function (t1, t2) {

//   const temps = t1.concat(t2);
//   console.log(temps);

//   let max = temps[0];
//   let min = temps[0];

//   for(let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;

//     if (curTemp > max) max = curTemp;
//     if (curTemp < min) min = curTemp;
//   }

//   console.log(max, min);

//   const amplitude =  max - min;
//   return amplitude;
// }
// console.log(calcAmplitudeNew(temperatures, temperatures2));

// const measureKelvin = function() {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: Number(prompt('Degrees celsius:')),
//   };
//   console.table(measurement);
//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// console.log(measureKelvin());


// Coding Challange # 1

// const data1 = [17, 21, 23];

// const printForecast = function (arr) {
//   let str = '';
//   for(let i = 0; i < arr.length; i++) {
//     str = str + `${arr[i]} Celcius in ${i + 1} days...`
//   }
//   console.log(`...` + str);
// }

// console.log(printForecast(data1));
