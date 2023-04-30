import { env } from '$env/dynamic/public';
import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: env.PUBLIC_GATEWAY_URL,
	// uncomment this to configure the network call (for things like authentication)
	// for more information, please visit here: https://www.houdinigraphql.com/guides/authentication
	fetchParams() {
		return {
			credentials: 'include'
		};
	}
});
