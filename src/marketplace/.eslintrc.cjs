module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint', '@graphql-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [
		{ files: ['*.svelte'], processor: 'svelte3/svelte3' },
		{
			files: ['*.graphql'],
			parser: '@graphql-eslint/eslint-plugin',
			plugins: ['@graphql-eslint'],
			rules: {
				'@graphql-eslint/known-type-names': 'error'
			}
		}
	],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
