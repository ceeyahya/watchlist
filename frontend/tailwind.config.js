const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
			},
			extend: {
				animation: {
					'spin-slow': 'spin 3s linear infinite',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
