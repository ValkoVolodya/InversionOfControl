// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

// Create a hash and turn it into the sandboxed context which will be
// the global context of an application
var context = {
    module: {},
    console: console,
    setInterval: setInterval,
    setTimeout: setTimeout,
    clearInterval: clearInterval,
    util: util
};

context.global = context;
var sandbox = vm.createContext(context);

// Read an application source code from the file
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // We need to handle errors here

  // Run an application in sandboxed context
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  var s = sandbox.module.exports;
  s.doSomething();
  console.log(s.variableName);
  s.sum(2, 4);
  var str = s.sum.toString();
  console.log(str);
  console.log(str.slice(str.indexOf('(') + 1, str.indexOf(')')));
  // We can access a link to exported interface from sandbox.module.exports
  // to execute, save to the cache, print to console, etc.
});
