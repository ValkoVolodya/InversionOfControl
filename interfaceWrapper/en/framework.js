// Wrapping function and interface example

var fs = require('fs'),
    vm = require('vm');

// Create a hash for application sandbox
var context = {
  module: {},
  console: console,
  // Forward link to fs API into sandbox
  fs: cloneInterface(fs),
  // Wrapper for setTimeout in sandbox
  setTimeout: function(callback, timeout) {
    // Logging all setTimeout calls
    console.log(
      'Call: setTimeout, ' +
      'callback function: ' + callback.name + ', ' +
      'timeout: ' + timeout
    );
    setTimeout(function() {
      // Logging timer events before application event
      console.log('Event: setTimeout, before callback');
      // Calling user-defined timer event
      callback();
      console.log('Event: setTimeout, after callback');
    }, timeout);
  }
};

function isFunction(fnToCheck){
  var getType = {};
  return fnToCheck && getType.toString.call(fnToCheck)=== '[object Function]';
}

function wrapFunction(fnName, fn){
  return function wrapper(){
    var args = [];
    Array.prototype.push.apply(args, arguments);
    var last = args.length - 1;
    if (typeof(args[last]) === 'function') {
      console.log("Hello!");
      var cb = args[last];
      args[last] = wrapFunction(args[last].name, args[last]);
    }
    console.log('Call: ' + fnName);
    console.dir(args);
    return fn.apply(undefined, args);
  }
}

function cloneInterface(interfaceName){
  var clone = {};
  for (var key in interfaceName){
    clone[key] = wrapFunction(key, interfaceName[key]);
  }
  return clone;
}

// Turn hash into context
context.global = context;
var sandbox = vm.createContext(context);

// Read an application source code from the file
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Run an application in sandboxed context
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});
