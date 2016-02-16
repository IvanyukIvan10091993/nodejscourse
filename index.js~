// Libraries
var ansi = require('ansi');
var colors = require('colors/safe');

var cursor = ansi(process.stdout);

// Variables
var date,
    hour,
    minute,
    second,
    temp;

// A function to convert a number to two-digit format
function doubleNumber(number) {
    return (number > 9) ? number : '0' + number;
}

// A function to display time and beep
function displayTime() {
    date = new Date();
    temp = date.getHours();
    hour = doubleNumber(temp);
    temp = date.getMinutes();
    minute = doubleNumber(temp);
    temp = date.getSeconds();
    second = doubleNumber(temp);
    console.log(colors.red(hour) + colors.grey(':') + colors.green(minute) + colors.grey(':') + colors.blue(second));
    cursor.beep();
}

// A function to repeat a function at a given interval
function repeater (functionToRepeat, interval) {
  functionToRepeat();
  setTimeout(function() {repeater(functionToRepeat, interval);}, interval - (new Date()).getMilliseconds());
}

// Recursion unleashed
setTimeout(function () {repeater(displayTime, 1000)}, 1000 - (new Date()).getMilliseconds())
