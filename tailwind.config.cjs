/** @type {import('tailwindcss').Config} */

const daisy = require("daisyui");
const tailwindTypography = require("@tailwindcss/typography");
const plugin = require("tailwindcss/plugin");

const childrenSupport = ({ addVariant }) => {
	addVariant("child", "& > *");
	addVariant("child-hover", "& > *:hover");
};

const extendedTailwind = plugin(function ({ addComponents, theme }) {
	addComponents({
		".auto-center": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	});
});

module.exports = {
	darkMode: ["class", '[data-theme="dark"]'],
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},

		screen: {
			sm: 425,
			md: 768,
			lg: 1024,
			xl: 1280,
			"2xl": 1440,
		},
	},

	daisyui: {
		styled: true,
		themes: [
            "dark",
			{
				// light: {
				// 	...require("daisyui/src/colors/themes")[
				// 		"[data-theme=light]"
				// 	],
				// },
			},
		],
		base: true,
		utils: true,
		logs: true,
		rtl: false,

		prefix: "",
	},

	plugins: [tailwindTypography, extendedTailwind, daisy, childrenSupport],
};
