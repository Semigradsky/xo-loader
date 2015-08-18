# xo-loader [![Build Status](http://img.shields.io/travis/Semigradsky/xo-loader.svg)](https://travis-ci.org/Semigradsky/xo-loader)

> [XO](https://github.com/sindresorhus/xo) loader for webpack. Based on [eslint-loader](https://github.com/MoOx/eslint-loader)

## Install

```console
$ npm install xo-loader
```

## Usage

In your webpack configuration

```javascript
module.exports = {
	// ...
	module: {
		loaders: [
			{test: /\.js$/, loader: 'xo-loader', exclude: /node_modules/}
		]
	}
	// ...
}
```

When using with transpiling loaders (like `babel-loader`), make sure they are in correct order
(bottom to top). Otherwise files will be check after being processed by `babel-loader`

```javascript
module.exports = {
	// ...
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
			{test: /\.js$/, loader: 'xo-loader', exclude: /node_modules/}
		]
	}
	// ...
}
```

To be safe, you can use `preLoaders` section to check source files, not modified
by other loaders (like `babel-loader`)

```js
module.exports = {
	// ...
	module: {
		preLoaders: [
			{test: /\.js$/, loader: 'xo-loader', exclude: /node_modules/}
		]
	}
	// ...
}
```

### Options

You can pass [XO options](https://github.com/sindresorhus/xo#config) directly by

- Adding a query string to the loader for this loader usabe only

```js
{
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'xo-loader?{rules:[{semi:0}]}',
				exclude: /node_modules/,
			},
		],
	},
}
```

- Adding an `xo` entry in your webpack config for global options:

```js
module.exports = {
	xo: {
		space: true
	}
}
```

**Note that you can use both method in order to benefit from global & specific options**

#### Errors and Warning

**By default the loader will auto adjust error reporting depending
on xo errors/warnings counts.**
You can still force this behavior by using `emitError` **or** `emitWarning` options:

##### `emitError` (default: `false`)

Loader will always return errors if this option is set to `true`.

```js
module.exports = {
	entry: "...",
	module: {
		// ...
	}
	xo: {
		emitError: true
	}
}
```

##### `emitWarning` (default: `false`)

Loader will always return warnings if option is set to `true`.

#### `quiet` (default: `false`)

Loader will process and report errors only and ignore warnings if this option is set to true

```js
module.exports = {
	entry: "...",
	module: {
		// ...
	}
	xo: {
		quiet: true
	}
}
```

##### `failOnWarning` (default: `false`)

Loader will cause the module build to fail if there are any xo warnings.

```js
module.exports = {
	entry: "...",
	module: {
		// ...
	}
	xo: {
		failOnWarning: true
	}
}
```

##### `failOnError` (default: `false`)

Loader will cause the module build to fail if there are any xo errors.

```js
module.exports = {
	entry: "...",
	module: {
		// ...
	}
	xo: {
		failOnError: true
	}
}
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
