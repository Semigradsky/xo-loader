'use strict';

module.exports = {
	output: {
		path: './test/output/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: './index',
				exclude: /node_modules/
			}
		]
	}
};
