import '@material-tailwind/html/utils/withMT';
import withMT from '@material-tailwind/html/utils/withMT';

/** @type {import('tailwindcss').Config} */
export default withMT({
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: []
});
