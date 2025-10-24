const config = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			// mobile-first breakpoints (overriding defaults)
			"sm": "360px",
			"md": "768px",
			"desktop": "1440px",
		},
		extend: {
			colors: {
				green: {
					DEFAULT: "#70C05B",
					100: "#70C05B",
				},
				orange: {
					100: "#FF6633",
					200: "#FCD5BA",
				},
				black: {
					100: "#414141",
				},
				white: "#FFFFFF",
				grey: {
					100: "#F3F2F1",
				},
				beige: {
					100: "#F9F4E2",
				},
			},
			maxWidth: {
				"content": "1208px"
			}
		}
	}
};

export default config;
