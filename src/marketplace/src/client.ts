import { env } from '$env/dynamic/public';
import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: env.PUBLIC_GATEWAY_URL || '',
	fetchParams() {
		return {
			credentials: 'include'
		};
	}
});
