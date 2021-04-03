const withTM = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
	[
		withTM,
		{
			transpileModules: ['react-syntax-highlighter'],
		},
	],
]);

module.exports = {
	async rewrites() {
		return [
			{
				source: '/artykul/:article*',
				destination: '/article/:article*', // The :path parameter is used here so will not be automatically passed in the query
			},
		];
	},
};
