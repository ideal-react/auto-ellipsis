'use strict'

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.development')

var host = 'http://127.0.0.1:3000'

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: false,
	stats: {
		colors: true
	}
}).listen(3000, '127.0.0.1', function(err) {
	if (err) {
		console.log(err)
	}
	console.log('Listening at ' + host)
})
