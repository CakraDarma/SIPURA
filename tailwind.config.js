/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
import plugin from 'tailwindcss/plugin';

module.exports = {
	darkMode: ['class'],
	content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				'black-light': '#6B6D76',
				orange: {
					light: '#CC7C6E',
					dark: '#D1654B',
				},
				'white-dark': '#e4e4e7',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				heading: ['var(--font-heading)', ...fontFamily.sans],
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		plugin(function ({ addBase, addComponents, addUtilities }) {
			addBase({});
			addComponents({
				'.heading-1': {
					'@apply text-3xl  md:text-5xl font-normal md:leading-[76.80px] font-heading':
						{},
				},
				'.heading-2': {
					'@apply text-4xl font-medium md:text-5xl font-heading': {},
				},
				'.heading-3': {
					'@apply text-2xl leading-relaxed md:text-3xl font-heading': {},
				},
				'.heading-4': {
					'@apply text-[2rem] leading-normal': {},
				},
				'.heading-5': {
					'@apply font-sans md:text-2xl text-xl antialiased font-semibold leading-snug tracking-normal':
						{},
				},
				'.heading-6': {
					'@apply font-semibold text-lg leading-8': {},
				},
				'.body-1': {
					'@apply  font-sans text-xl font-light sm:text-2xl font-medium': {},
				},
				'.body-2': {
					'@apply font-sans text-sm md:text-base antialiased font-light leading-relaxed':
						{},
				},
				'.caption': {
					'@apply text-sm': {},
				},
				'.tagline': {
					'@apply  font-light uppercase': {},
				},
				'.button': {
					'@apply  text-xs font-bold uppercase tracking-wider': {},
				},
			});
			addUtilities({
				'.tap-highlight-color': {
					'-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
				},
			});
		}),
	],
};
