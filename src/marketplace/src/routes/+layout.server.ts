import type { LayoutServerLoad } from './$types';

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ cookies }) => {
	const isAuthenticated = !!cookies.get('Session');
	return {
		isAuthenticated
	};
};
