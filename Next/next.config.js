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
	}
}