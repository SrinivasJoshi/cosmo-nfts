/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				bblack: '#01010c',
				wwhite: '#fafafa',
			},
			fontFamily: {
				//prettier-ignore
				'lato': ['Lato', 'sans-serif'],
				//prettier-ignore
				'macondo': ['Macondo', 'serif'],
			},
			animation: {
				'spin-slow': 'spin 60s linear infinite',
			},
		},
	},
	plugins: [],
};
