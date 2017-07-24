/**
 * options 可定制类型,是否调试,还有需要render的元素,如果没有就不render
 */
class Air {
	/** init template and options */
	constructor(tpl,data,options = {}) {
		this.tpl = tpl;
		this.data = data;
		this._result; // 存储结果
		this.type_keyword = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;

		this.options = Object.assign({
			type: '{{}}',
			debug: false,
			el: null
		}, options);

		this.build();// start build and output result;
	}

	get result() {
		return this._result;
	}

	/** 根据参数初始化正则表达式 */
	initReg() {
		/** type_left is '{{' type_right is '}}' */
		const type_left = this.options.type.slice(0,this.options.type.length/2);
		const type_right = this.options.type.slice(this.options.type.length/2,this.options.type.length);

		this.type_re = new RegExp(`${type_left}([^${type_right}]+)?${type_right}`, 'g');

		return new RegExp(`${type_left}([^${type_right}]+)?${type_right}`, 'g'); // /{{([^}}]+)?}}/g;
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
	build() {
		if (!this.initReg().test(this.tpl)) {
			/** 是否有所含表达式 */
			this._result = this.tpl;
			return;
		}

		let match = null;
		let cursor = 0,
				code = 'var code = [];\n';

		while(( match = this.type_re.exec(this.tpl)) !== null) {
			let string = this.tpl.slice(cursor,match.index); // 字符串
			code += `code.push('${string.replace(/'/g, "\\'")}');\n`; // 替换字符串中的'为"

			if (this.type_keyword.test(match[1])) {
				// 说明这里面有js的关键字,是需要执行
				code += `${match[1]}`;
			}
			else {
				code += `code.push(${match[1]});\n`; // 替换{{}}之间js代码
			}
			cursor = match.index + match[0].length; // 移动浮标到下一个位置
		}
		code += `return code.join('');`;

		let fun = new Function(code); // 构造函数
		this._result = fun.call(this.data); // 得到编译后的字符串

		if (this.options.el) {
			// 如果有el就直接render
			this.render(this.options.el);// 调用render
		}
	}
}

module.exports = Air;
