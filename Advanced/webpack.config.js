const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/* Server no need node_bundle, because server can use node_modules any time */
const nodeExternals = require('webpack-node-externals');

function getConfig(isServer, name) {
	return {
	entry : {
		[name] : `./srcs/${name}`
	},

	output : {
		/* server no need hash, server no caching */
		filename : isServer ? '[name].bundle.js' : '[name].[chunkhash].js',
		path : path.resolve(__dirname, 'dist'),
		publicPath : '/dist/'
	},
	/*
		target is bundling effective.
		When you set "node", bundling node effective, example, without 'fs', 'path'
	*/
	target : isServer ? 'node' : 'web',
	/* Server except node bundling */
	externals : isServer ? [nodeExternals()] : [],
	/* 
		This erase "__dirname"'s '/'
		Project use "__dirname" in server, so use this option
	*/
	node : {
		__dirname : false
	},
	optimization : isServer ? 
	{splitChunks : false, minimize : false} : undefined,

	module : {
		rules : [
			{
				test : /\.js$/,
				use: {
					loader : 'babel-loader',
					options : {
						configFile : path.resolve(__dirname, 
							isServer ? '.babelrc.server.js' : '.babelrc.client.js')
					}
				}
			},
			{
				test : /\.(png|jpg|gif)$/,
				use : {
					loader : 'file-loader',
					/* file copy do one side, no two */
					options : {
						emitFile : isServer ? false : true,
					}
				}
			}
		]
	},

	plugins : isServer ? []
	: [
		//new CleanWebpackPlugin(), -> this delete all
		new HtmlWebpackPlugin({
			template: './template/index.html'
		})
	],

	mode : 'production'
	};
};

module.exports = [getConfig(false, 'index'), getConfig(true, 'server'), getConfig(true, 'prerender')];