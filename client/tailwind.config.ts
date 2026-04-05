import type { Config } from 'tailwindcss'

const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const config: Config = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			nunito: ['var(--font-nunito), sans-serif'],
			source: ['var(--font-source), sans-serif'],
		},
		colors: {
			white: colors.white,
			black: colors.black,
			transparent: colors.transparent,
			gray: {
				base: '#313337',
				900: '#333333',
				800: '#393b40',
				500: '#6b6b6b',
				400: '#a5a5a5',
				300: '#E0E0E0',
				200: '#f2f7f2',
				150: '#f7faf7',
				100: '#f9f9f9',
				50: 'hsla(0,0%,100%,.04)',
			},
			pink: {
				400: '#ffc6d3',
			},
			red: {
				base: '#9b211b',
				400: '#ff0c00',
				error: '#F31559',
			},
			orange: {
				base: '#f5b60a',
				400: '#ffac33',
			},
			yellow: {
				400: '#ffc312',
			},
			green: {
				base: '#14a800',
				400: '#00c217',
			},
			blue: {
				400: '#439ffe',
			},
		},
		fontSize: {
			'small-sm': '8px',
			'small-md': '9px',
			small: '10px',
			'small-lg': '11px',
			'small-xl': '12px',
			'medium-sm': '13px',
			'medium-md': '14px',
			base: '15px',
			medium: '16px',
			'medium-lg': '17px',
			'medium-xl': '18px',
			lg: '19px',
			'2lg': '20px',
			'3lg': '21px',
			'4lg': '22px',
			'5lg': '23px',
			'6lg': '24px',
			'7lg': '25px',
			'8lg': '26px',
			'9lg': '27px',
			'10lg': '28px',
			xl: '29px',
			'2xl': '30px',
			'3xl': '31px',
			'4xl': '32px',
			'5xl': '33px',
			'6xl': '34px',
			'7xl': '35px',
			'8xl': '36px',
			'9xl': '37px',
			'10xl': '38px',
			'big-sm': '39px',
			'big-md': '40px',
			big: '41px',
			'big-lg': '42px',
			'big-xl': '43px',
		},
		extend: {
			lineHeight: {
				sm: '1.1',
				md: '1.2',
				lg: '1.3',
				'2lg': '1.4',
				'3lg': '1.5',
				'4lg': '1.6',
				'5lg': '1.7',
				xl: '1.8',
				'2xl': '1.9',
				'3xl': '2',
			},
			borderRadius: {
				sm: '5px',
				md: '10px',
				lg: '15px',
				'2lg': '20px',
				xl: '25px',
				'2xl': '30px',
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out',
			},
			transitionDuration: {
				DEFAULT: '200ms',
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
				4: '4',
				5: '5',
			},
			keyframes: {
				hide: {
					from: { opacity: '1' },
					to: { opacity: '0' },
				},
				fade: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				scaleIn: {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)',
					},
					'50%': {
						opacity: '0.3',
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
					},
				},
				opacity: {
					'0%': {
						opacity: '0',
						visibility: 'hidden',
					},
					'100%': {
						opacity: '1',
						visibility: 'visible',
					},
				},
				slideFromLeft: {
					'0%': {
						transform: 'translateX(-100%)',
					},
					'100%': {
						transform: 'translateX(0)',
					},
				},
				slideFromRight: {
					'0%': {
						transform: 'translateX(100%)',
					},
					'100%': {
						transform: 'translateX(0)',
					},
				},
				windowTransform: {
					'0%': {
						transform: 'translateY(-50px)',
						opacity: '0',
					},
					'100%': {
						transform: 'translateY(0px)',
						opacity: '1',
					},
				},
			},
			animation: {
				hide: 'hide 500ms ease-in-out forwards',
				fade: 'fade 500ms ease-in-out forwards',
				scaleIn: 'scaleIn 350ms ease-in-out forwards',
				opacity: 'opacity 300ms ease-in-out forwards',
				slideFromLeft: 'slideFromLeft 300ms ease-in-out forwards',
				slideFromRight: 'slideFromRight 300ms ease-in-out forwards',
				windowTransform: 'windowTransform 700ms ease-in-out forwards',
			},
		},
	},
	plugins: [
		plugin(
			({
				addComponents,
				theme,
				addUtilities,
			}: {
				addUtilities: Function
				addComponents: Function
				theme: Function
			}) => {
				addComponents({
					'.black-shadow': {
						boxShadow:
							'0 8px 34px rgba(0, 0, 0, 0.06), 0 1px 6px rgba(0, 0, 0, 0.12)',
					},

					'.yellow-shadow': {
						boxShadow: 'rgba(255, 195, 18, 0.1) 0px 4px 12px',
					},

					'.black-bottom-gradient': {
						background:
							'linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, transparent 40%)',
					},

					'.btn-green': {
						border: '2px solid transparent',
						transitionProperty: 'color, background-color, border-color',
						transitionTimingFunction: 'ease-in-out',
						transitionDuration: '200ms',
						backgroundColor: theme('colors.green.base'),
						color: theme('colors.white'),
						'&:hover': {
							color: theme('colors.white'),
							backgroundColor: theme('colors.green.400'),
							borderColor: theme('colors.green.400'),
						},
					},

					'.btn-orange': {
						border: '2px solid transparent',
						transitionProperty: 'color, background-color, border-color',
						transitionTimingFunction: 'ease-in-out',
						transitionDuration: '200ms',
						backgroundColor: theme('colors.orange.base'),
						color: theme('colors.white'),
						'&:hover': {
							color: theme('colors.white'),
							backgroundColor: theme('colors.orange.400'),
							borderColor: theme('colors.orange.400'),
						},
					},

					'.btn-red': {
						border: '2px solid transparent',
						transitionProperty: 'color, background-color, border-color',
						transitionTimingFunction: 'ease-in-out',
						transitionDuration: '200ms',
						backgroundColor: theme('colors.red.error'),
						color: theme('colors.white'),
						'&:hover': {
							color: theme('colors.white'),
							backgroundColor: theme('colors.red.400'),
							borderColor: theme('colors.red.400'),
						},
					},

					'.btn-green-border': {
						border: `2px solid ${theme('colors.green.base')}`,
						transitionProperty: 'color, background-color, border-color',
						transitionTimingFunction: 'ease-in-out',
						transitionDuration: '200ms',
						color: theme('colors.green.base'),
						'&:hover': {
							color: theme('colors.white'),
							backgroundColor: theme('colors.green.400'),
							borderColor: theme('colors.green.400'),
						},
					},

					'.green-hover': {
						transitionProperty: 'color',
						transitionTimingFunction: 'ease-in-out',
						transitionDuration: '200ms',
						'&:hover': {
							color: theme('colors.green.base'),
						},
					},

					'.light-green-bg-hover': {
						transitionProperty: 'color, background-color, border-color',
						transitionTimingFunction: 'ease-in-out',
						transitionDuration: '200ms',
						'&:hover': {
							color: theme('colors.white'),
							backgroundColor: theme('colors.green.400'),
							borderColor: theme('colors.green.400'),
						},
					},

					'.green-underline-hover': {
						position: 'relative',
						'&::after': {
							content: 'close-quote',
							position: 'absolute',
							left: '0',
							bottom: '-5px',
							height: '1px',
							width: '0px',
							backgroundColor: theme('colors.green.400'),
							transitionProperty: 'width',
							transitionTimingFunction: 'ease-in-out',
							transitionDuration: '200ms',
						},
						'&:hover::after': {
							width: '100%',
						},
					},

					'.green-underline-active': {
						position: 'relative',
						'&::after': {
							content: 'close-quote',
							position: 'absolute',
							left: '0',
							bottom: '-5px',
							height: '1px',
							width: '100%',
							backgroundColor: theme('colors.green.400'),
						},
					},

					'.up-hover': {
						transition: 'transform 200ms ease-in-out',

						'&:hover': {
							transform: `translateY(-2px)`,
						},
					},
				})

				addUtilities({
					'.outline-border-none': {
						outline: 'none',
						border: 'none',
					},

					'.flex-center-between': {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					},

					'.image-like-bg': {
						width: '100%',
						height: '100%',
						pointerEvents: 'none',
					},

					'.image-like-bg-contain': {
						width: '100%',
						height: '100%',
						objectPosition: 'center',
						objectFit: 'contain',
						pointerEvents: 'none',
					},

					'.image-like-bg-cover': {
						width: '100%',
						height: '100%',
						objectPosition: 'center',
						objectFit: 'cover',
						pointerEvents: 'none',
					},
				})
			}
		),
	],
}
export default config
