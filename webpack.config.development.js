'use strict'

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

var host = 'http://127.0.0.1:3000'

module.exports = {
	devtool: '#eval-source-map',
	entry: [
		'webpack-dev-server/client?' + host,
		'webpack/hot/only-dev-server',
		'./example/src/index.jsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
		publicPath: host + '/static/',
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'react-hot!babel',
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	]
}
