const webpack = require('webpack');
const path = require('path');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const ClosurePlugin = require('closure-webpack-plugin');

module.exports = {
	entry:
	{
		"css": "./src/index.js",
		"css.min": "./src/index.js",
	},
	output:
	{
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	    libraryTarget: 'var',
	    library: 'css'
	},
	optimization: {
	  minimize: true,
	  minimizer: [new UglifyJsPlugin({
		include: /\.min\.js$/
	  })]
	},
	node: {
		fs: 'empty'
	  }
};

// /\.min\.js$/