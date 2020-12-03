const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	entry : './srcs/index.js',
	output : {
		filename : '[name].[chunkhash].js',
		path : path.resolve(__dirname, 'dist'),
		publicPath : '/dist/'
	},

	module : {
		rules : [
			{
				test : /\.js$/,
				use: {
					loader : 'babel-loader',
					options : {
						configFile : path.resolve(__dirname, '.babelrc.client.js')
					}
				}
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