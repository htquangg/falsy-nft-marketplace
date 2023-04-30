/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'env:PUBLIC_GATEWAY_URL'
	},
	plugins: {
		'houdini-svelte': {}
	}
};

export default config;
