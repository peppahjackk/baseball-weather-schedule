var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	devtool: 'source-map',
	entry: [
		'./app/index.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: "index_bundle.js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: "babel-loader", query: {presets: ['es2015', 'react']}}
		]
	},
	resolve: {
		modules: ['node_modules'], 
		extensions: ['.js', '.scss']
	},
	plugins: [HtmlWebpackPluginConfig]
};