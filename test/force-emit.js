'use strict';
var test = require('tape');
var webpack = require('webpack');
var assign = require('object-assign');
var conf = require('./utils/conf');

test('xo-loader can force to emit error', function (t) {
	webpack(assign({},
		conf,
		{
			entry: './test/fixtures/warn.js',
			xo: assign({}, conf.xo, {
				emitError: true
			})
		}
	),
	function (err, stats) {
		if (err) {
			throw err;
		}

		// console.log(stats.compilation.errors);
		t.ok(stats.hasErrors(), 'a file should return error if asked');
		// console.log(stats.compilation.warnings);
		t.notOk(
			stats.hasWarnings(),
			'a file should return no warning if error asked'
		);
		t.end();
	});
});

test('xo-loader can force to emit warning', function (t) {
	webpack(assign({},
		conf,
		{
			entry: './test/fixtures/error.js',
			xo: assign({}, conf.xo, {
				emitWarning: true
			})
		}
	),
	function (err, stats) {
		if (err) {
			throw err;
		}

		// console.log(stats.compilation.warnings);
		t.ok(stats.hasWarnings(), 'a file should return warning if asked');
		// console.log(stats.compilation.errors);
		t.notOk(stats.hasErrors(), 'a file should return no error if error asked');
		t.end();
	});
});
