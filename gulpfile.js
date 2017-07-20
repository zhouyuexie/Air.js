const gulp = require('gulp');
const path = require('path');
const webpack = require('gulp-webpack');
const wp = require("webpack");
const rename = require('gulp-rename'); //更改名字
const uglify = require('gulp-uglify'); //js代码压缩
const notify = require('gulp-notify'); //通知信息

let modules = {
	loaders: [{
		//这是处理es6文件
		test: /\.js$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
		query: {
			presets: ['es2015'],
			plugins: ['transform-runtime']
		}
	}]
}

gulp.task('default', function() {
	return gulp.src('./index.js')
		.pipe(webpack({
			watch: true,
			output: {
				filename: 'air.js'
			},
			module: modules
		}))
		// .pipe(uglify())//生产的时候再启用压缩
		.pipe(gulp.dest('/dist/'))
		.pipe(notify("<%= file.relative %> 成功生成!"));
});