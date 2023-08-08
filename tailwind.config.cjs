/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '1450px',
			md: '1450px',
			lg: '1550px',
			xl: '1550px',
			'2xl': '1800px'
		},
		container: {
			padding: {
				DEFAULT: '4rem',
				sm: '4rem',
				lg: '12rem',
				xl: '12rem',
				'2xl': '12rem'
			}
		},
		extend: {
			colors: {
				greenLight: '#95d5b2',
				primaryLight: '#ccdbdc',
				primary: '#3d5a80',
				lightBlue: '#caf0f8',
				error: '#fca5a5'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
