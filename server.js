'use strict'

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.development')

var IP = '127.0.0.1'
var port = 3000

var args = process.argv.splice(2)

if (args[0] === 'test') {
	config = require('./webpack.config.test')
	port = 3001
}

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: false,
	stats: {
		colors: true,
	},
}).listen(port, IP, function(err) {
	if (err) {
		console.log(err)
	}
	console.log('Listening at ' + IP + ':' + port)
})
