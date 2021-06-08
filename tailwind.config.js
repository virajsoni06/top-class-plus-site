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
				alpha: "58px",
				beta: "45px",
				gamma: "28px",
				delta: "22px",
				epsilon: "18px",
				eta: "16px",
				theta: "40px",
				zeta: "14px"
			},
			borderRadius: {
				small: "5px",
				large: "10px"
			},
			spacing: {
				"72": "24rem",
				"84": "27rem",
				"96": "30rem"
			}
		},
		fill: theme => ({
			black: theme("colors.black"),
			turquoise: theme("colors.turquoise")
		}),
		stroke: theme => ({
			black: theme("colors.black"),
			turquoise: theme("colors.turquoise")
		}),
		maxWidth: {
			large: "1200px",
			wrap: "1110px",
			half: "550px",
			img: "500px",
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
		minWidth: {
			half: "550px",
			img: "500px"
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
