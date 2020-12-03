const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	entry : './srcs/index.js',
	output : {
		filename : '[name].[chunkhash].js',
		path : path.resolve(__dirname, 'dist')
	},

	module : {
		rules : [
			{
				test : /\.js$/,
				use: 'babel-loader',
			}
		]
	},

	plugins : [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './template/index.html'
		})
	],

	mode : 'production'
};