// File contains a small piece of the source to demonstrate main module
// of a sample application to be executed in the sandboxed context by
// another pice of code from `framework.js`. Read README.md for tasks.

// Print from the global context of application module
console.log('From application global context');

var isNumber = util.isNumber;
console.log("Is Infinity a number?\n" + isNumber(Infinity));

var intervalID = setInterval(function(){
    console.log("On the edge of tomorrow...");
}, 1000);

setTimeout(function(){
    clearInterval(intervalID);
    console.log("So now the cycle is end.");
}, 5000);

console.log(this.module.toString());

module.exports = {}

module.exports.doSomething = function() {
	// Print from the exported function context
  console.log('From application exported function');
};

module.exports.variableName = 'stringVariable';

module.exports.sum = function(a, b) {
  console.log(a + " + " + b + " = " + (a + b));
}
