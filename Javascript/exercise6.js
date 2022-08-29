/*
PROBLEM 6: OBSERVABLES
 A live analytics dashboard displays data about a medical operating room to doctors and nurses. It receives its data from three independent monitoring systems:
- Temperature 
- Air pressure 
- Humidity
Each system sends randomly data every 100-2000ms. TASK:
Write an observable that, when subscribed to, emits a "display object" containing the latest value of all three systems, to be consumed by the dashboard.

REQUIREMENTS:
Display object should not be emitted more often than every 100ms
Display object should only be emitted when one of the systems sends a new value
If a value is not received from a specific system for more than 1000ms, its reading (in the display object) should be 'N/A'
All 3 systems must emit at least one value before 1 display object is ever sent to the dashboard.
For the purposes of this exercise, assume that the readings from each system are available as a 'data' event on a node EventEmitter. For example:
temperature = new EventEmitter(); temperature.on('data', data => { // data = '24.2' })
*/




const { EventEmitter } = require("stream");
const Rx = require('rxjs')

let temp ='N/A',air='N/A',humid='N/A';
function getRandom(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max)
   const val = Math.floor(Math.random() * (max - min) + min)
   return val;
 }
 

temperature = new EventEmitter(); 
temperature.on('data', data => {   temp=getRandom(12,24) })

AirPressure = new EventEmitter(); 
AirPressure.on('data', data => {   air=getRandom(10,16) })

humidity = new EventEmitter(); 
humidity.on('data', data => {   humid=getRandom(50,80) })


let val=getRandom(100,2000);
setInterval(function() {
   temperature.emit('data')
   val=getRandom(100,2000);
       
 },val );

let val2=getRandom(100,2000);
 setInterval(function() {
   // console.log('air')
   AirPressure.emit('data')
   val2=getRandom(100,2000);
   // console.log(val2+' air')
   
},val2 );

let val3=getRandom(100,2000);
setInterval(function() {
   // console.log('humid')
   humidity.emit('data')
   val3=getRandom(100,2000);
   
   // console.log(val3+' humid')
},val3 );

let val4=getRandom(100,2000);

const myobservable = new Rx.Observable(o=>{
   o.next('Temperature : '+ temp)
   o.next('Air Pressure : '+ air)
   o.next('Humidity : '+ humid)
})
setInterval(function() {
   myobservable.subscribe(result=>{
       console.log(result)
   })
   humid='N/A'
   air='N/A'
   temp='N/A'
   val4=getRandom(100,1000);
},val4 );
