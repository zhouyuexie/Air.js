class Air {
	/** init template and options */
	constructor(tpl,data,options = {}) {
		this.tpl = tpl;
		this.data = data;

		this.options = Object.assign({
			type: '{{}}',
			debug: false
		}, options);
		
		this.initReg();

		this.run();// start run and output result;
	}

	/** 根据参数初始化正则表达式 */
	initReg() {
		/** type_left is '{{' type_right is '}}' */
		const type_left = this.options.type.slice(0,this.options.type.length/2);
		const type_right = this.options.type.slice(this.options.type.length/2,this.options.type.length);

		this.type_re = new RegExp(`${type_left}([^${type_right}]+)?${type_right}`, 'g');
	}

	/** 是否有所含表达式 */
	isHaveType() {
		return this.type_re.test(this.tpl);
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
		if (!this.isHaveType()) {
			this.result = this.tpl;
			return;
		}

		let match = null;
		while(match = this.type_re.exec(this.tpl)){
			console.log(match)
		}
	}
}

module.exports = Air;
