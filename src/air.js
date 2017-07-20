class Air {
	/** init template and options */
	constructor(tpl,options) {
		this.tpl = tpl;
		this.options = Object.assign({
			data: {},
			type: '{{}}',
			debug: false
		},options);
		
		/** type_left is '{{' type_right is '}}' */
		const type_left = this.options.type.slice(0,this.options.type.length/2);
		const type_right = this.options.type.slice(this.options.type.length/2,this.options.type.length);

		this.type_re = new RegExp(`${type_left}([^${type_right}]+)?${type_right}`, 'g');

		this.result = this.run();// start run and output result;
	}

	get result() {
		return this.result;
	}

	/** render a element by id or class */
	render(el) {
		let type = el.slice(0,1);
		switch(type) {
			case '#':
				document.getElementById(el).innerHTML = this.result;
				break;
			case '.':
				document.getElementsByClassName(el).innerHTML = this.result;
				break;
			default:
				document.querySelector(el).innerHTML = this.result;
		}
	}

	/** start */
	run() {
		let match = null;
		while(match = this.type_re.exec(this.tpl)){
			console.log(match)
		}
	}
}