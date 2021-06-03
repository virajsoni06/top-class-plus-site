module.exports = {
	theme: {
		extend: {
			fontFamily: {
				merri: ["Merriweather"],
				sourceSans: ["Source Sans Pro"]
			},
			colors: {
				skyBlue: "#E0F9F9",
				turquoise: "#39CCCC",
				lightCyan: "#EDFFFD",
				"black-2": "#514950",
				"black-60": "rgba(0, 0, 0, 0.6)"
			},
			width: {
				card: "540px",
				dropdown: "230px",
				info: "180px"
			},
			fontSize: {
				"ty-h1": "58px",
				"ty-h2": "45px",
				"ty-h4": "28px",
				"ty-h5": "22px",
				"ty-h6": "18px",
				"ty-p": "18px",
				"ty-ps": "14px"
			},
			borderRadius: {
				small: "5px",
				large: "10px"
			}
		},
		maxWidth: {
			wrap: "1110px",
			features: "925px",
			featureCard: "255px"
		},
		screens: {
			"a-vp": "320px",
			"b-vp": "480px",
			"c-vp": "600px",
			"d-vp": "768px",
			"e-vp": "992px",
			"f-vp": "1200px"
		},
		borderWidth: {
			tiny: "0.15px",
			"1": "1px",
			"2": "2px",
			"15": "15px"
		}
	},
	variants: {},
	plugins: [],
	purge:
		process.env.NODE_ENV === "production"
			? {
					enabled: true,
					content: ["src/**/*.njk", "src/**/*.js"]
			  }
			: {}
};
