'use strict';
var xo = require('xo');
var assign = require('object-assign');
var loaderUtils = require('loader-utils');

function lint(input, config, webpack, callback) {
	var res = xo.lintText(input, config);

	if (
		(res.errorCount === 0 && res.warningCount === 0) ||
		res.results.length === 0
	) {
		if (callback) {
			callback(null, input);
		}
		return;
	}

	// skip ignored file warning
	if (!(
		res.warningCount === 1 &&
		res.results[0].messages[0] &&
		res.results[0].messages[0].message &&
		res.results[0].messages[0].message.indexOf('.eslintignore') > -1 &&
		res.results[0].messages[0].message.indexOf('--no-ignore') > -1
	)) {
		if (res.errorCount || res.warningCount) {
			// add filename for each results so formatter can have relevant filename
			res.results.forEach(function (r) {
				r.filePath = webpack.resourcePath;
			});
			var messages = config.formatter(res.results);

			// default behavior: emit error only if we have errors
			var emitter = res.errorCount ? webpack.emitError : webpack.emitWarning;

			// force emitError or emitWarning if user want this
			if (config.emitError) {
				emitter = webpack.emitError;
			} else if (config.emitWarning) {
				emitter = webpack.emitWarning;
			}

			if (emitter) {
				emitter(messages);
				if (config.failOnError && res.errorCount) {
					throw new Error('Module failed because of a eslint error.');
				} else if (config.failOnWarning && res.warningCount) {
					throw new Error('Module failed because of a eslint warning.');
				}
			} else {
				throw new Error(
					'Your module system doesn\'t support emitWarning. ' +
					'Update available? \n' +
					messages
				);
			}
		}
	}

	if (callback) {
		return callback(null, input);
	}
}

module.exports = function (input) {
	var config = assign(
		// loader defaults
		{
			cwd: this.context,
      filename: this.resourcePath,
			formatter: xo.getFormatter()
		},
		// user defaults
		this.options.xo || {},
		// loader query string
		loaderUtils.parseQuery(this.query)
	);
	this.cacheable();

	var callback = this.async();
	// sync
	if (!callback) {
		lint(input, config, this);

		return input;
	}
	// async
	try {
		lint(input, config, this, callback);
	} catch (err) {
		return callback(err);
	}
};
