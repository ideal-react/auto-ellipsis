'use strict'

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

var host = 'http://127.0.0.1:3001'

module.exports = {
	entry: [
		'webpack-dev-server/client?' + host,
		'mocha!./test/index.js',
	],
	output: {
		path: path.join(__dirname, 'temp'),
		filename: 'test.js',
		publicPath: host + '/static/',
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			loader: 'style!css?modules&localIdentName=[local]-[hash:base64:5]!postcss',
		},]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
	postcss: [autoprefixer],
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('test'),
		}),
	]
}
