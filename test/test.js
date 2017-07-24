let Air = require('../index.js');

let test = new Air(`<p>Hello, my name is <%this.name%>. I\'m <%this.age%> years old. <% for (var item in this.info){ %> <%item%> <% } %></p>`,{
	name: "周岳谢",
	age: 24,
	info: ['i', 'love', 'you']
},{
	type:'<%%>'
});

console.log(test)