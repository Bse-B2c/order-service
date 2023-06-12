const getPath =
	path =>
	([, name]) => {
		return `${path}${name}`;
	};

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 18,
				},
			},
		],
		'@babel/preset-typescript',
	],
	plugins: [
		[
			require.resolve('babel-plugin-module-resolver'),
			{
				root: ['./src'],
				alias: {
					'@common': getPath('./src/common'),
					'@src': getPath('./src'),
					'@middleware': getPath('./src/middleware'),
					'@orderDetails': getPath('./src/orderDetails'),
					'@orderItems': getPath('./src/orderItems'),
					'@paymentDetails': getPath('./src/paymentDetails'),
					'@cartItem': getPath('./src/cartItem'),
					'@shoppingCart': getPath('./src/shoppingCart'),
				},
			},
		],
		'babel-plugin-transform-typescript-metadata',
		['@babel/plugin-proposal-decorators', { version: 'legacy' }],
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true,
			},
		],
	],
	ignore: ['**/*.spec.ts'],
};
