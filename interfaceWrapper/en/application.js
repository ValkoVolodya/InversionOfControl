// Print something
console.log('From application global context');

// Example for fs API
var fileName = './README.md';
console.log('Application going to read ' + fileName);
fs.readFile(fileName, function(err, src) {
  console.log('File ' + fileName + ' size ' + src.length);
});
console.log(fs.stat("/home/insomniac/Documents"), function() {console.log("You`re at home");});
