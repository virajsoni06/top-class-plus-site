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
				"ws-blue": {
					100: "#E6F0FF",
					200: "#BFDAFF",
					300: "#99C3FF",
					400: "#4D97FE",
					500: "#006AFE",
					600: "#005FE5",
					700: "#004098",
					800: "#003072",
					900: "#00204C"
				}
			},
			width: {
				subscribe: "540px"
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
