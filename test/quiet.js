'use strict';
var test = require('tape');
var webpack = require('webpack');
var assign = require('object-assign');
var conf = require('./utils/conf');

test('xo-loader only returns errors and not warnings if quiet is set', function (t) {
	webpack(assign({},
		conf,
		{
			entry: './test/fixtures/warn.js',
			xo: assign({}, conf.xo, {
				quiet: true
			})
		}
	),
	function (err, stats) {
		if (err) {
			throw err;
		}

		// console.log(stats.compilation.warnings);
		t.notOk(
			stats.hasWarnings(),
			'a file that contains eslint warning should return nothing if quiet option is true'
		);
		// console.log(stats.compilation.errors)
		t.notOk(
			stats.hasErrors(),
			'a file that contains eslint warning should return no error if it ' +
				'contains only warning in quiet mode'
		);
		t.end();
	});
});
