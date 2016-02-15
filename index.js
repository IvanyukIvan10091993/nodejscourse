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

// A function to clear log
function clearLog() {
  return process.stdout.write('\033c');
}
// A function to convert a number to two-digit format
function doubleNumber(number) {
    return (number > 9) ? number : '0' + number;
}
// A function to display time and beep
function displayTime() {
    clearLog();
    date = new Date();
    temp = date.getHours();
    hour = doubleNumber(temp);
    temp = date.getMinutes();
    minute = doubleNumber(temp);
    temp = date.getSeconds();
    second = doubleNumber(temp);
    console.log(colors.red(hour) + colors.grey(':') + colors.green(minute) + colors.grey(':') + colors.blue(second));
    logPatriotism();
    cursor.beep();
}
// A function to log patriotism
function logPatriotism() {
    console.log(colors.white('Русские') + colors.grey(' и ') + colors.blue('украинцы') + colors.grey(' - братья навек!'));
    console.log(colors.white('Русские') + colors.grey(' и ') + colors.blue('украинцы') + colors.grey(' - братья навек!'));
    console.log(colors.blue('Русские') + colors.grey(' и ') + colors.blue('украинцы') + colors.grey(' - братья навек!'));
    console.log(colors.blue('Русские') + colors.grey(' и ') + colors.yellow('украинцы') + colors.grey(' - братья навек!'));
    console.log(colors.red('Русские') + colors.grey(' и ') + colors.yellow('украинцы') + colors.grey(' - братья навек!'));
    console.log(colors.red('Русские') + colors.grey(' и ') + colors.yellow('украинцы') + colors.grey(' - братья навек!'));
}
// A function to repeat a function at a given interval
function repeater (functionToRepeat, interval) {
  functionToRepeat();
  setTimeout(function() {repeater(functionToRepeat, interval);}, interval - (new Date()).getMilliseconds());
}

// Recursion unleashed
setTimeout(function () {repeater(displayTime, 1000)}, 1000 - (new Date()).getMilliseconds())
