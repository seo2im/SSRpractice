module.exports = {
	webpack : config => {
		config.module.rules.push({
			test : /.(png|jpg)$/,
			use : [
				{
					loader : 'file-loader',
					options : {
						/* path change when file load */
						name : '[path][name].[ext]?[hash]',
						emitFile : false,
						publicPath : '/',
					}
				}
			]
		})
		return config;
	},
	/* Set export configuration */
	exportPathMap : function () {
		return {
			'/page1' : { page : 'page1'},
			'/page2-hello' : { page : '/page2', query : { str : 'hello' }},
			'/page2-world' : { page : '/page2', query : { str : 'world' }}
		}
	}
}