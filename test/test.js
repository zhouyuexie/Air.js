let Air = require('../index.js');

let test = new Air('<p>Hello, my name is {{name}}. I\'m {{age}} years old.</p>',{name: "Krasimir",age: 29})

console.log(test)