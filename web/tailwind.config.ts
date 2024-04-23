import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"index.html",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		backgroundImage: {
			"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			"gradient-conic":
				"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			"gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1.5rem",
				md: "2rem",
				lg: "2.5rem",
			},
			screens: {
				// 'xl': '1080px',
				// '2xl': '1080px',
				"3xl": "1180px",
			},
		},
		fontFamily: {
			body: [
				"Inter V",
				"Inter",
				"Helvetica",
				"Roboto",
				"system-ui",
				"sans-serif",
			],
			display: [
				"SF Pro Display",
				"SF Pro",
				"apple-system",
				"Helvetica",
				"Inter V",
				"Inter",
				"sans-serif",
			],
		},
		fontWeight: {
			light: "300",
			regular: "400",
			medium: "500",
			semibold: "600",
			bold: "700",
		},
		letterSpacing: {
			tightest: "-0.03em",
			tighter: "-0.02em",
			tight: "-0.01em",
			normal: "0",
			wide: "0.025em",
			wider: "0.05em",
			widest: "0.06em",
		},
		borderRadius: {
			1: "0.25rem",
			2: "0.5rem",
			3: "0.75rem",
			4: "1rem",
			5: "1.25rem",
			6: "1.5rem",
			7: "1.75rem",
			8: "2rem",
			12: "3rem",
			16: "4rem",
			full: "9999px",
		},
		extend: {
			padding: {
				"safe-top": "var(--safe-area-inset-top)",
				"safe-bottom": "var(--safe-area-inset-bottom)",
				"safe-left": "var(--safe-area-inset-left)",
				"safe-right": "var(--safe-area-inset-right)",
			},
			scale: {
				hover: "1.02",
				active: "0.98039215686", // So that their geometric mean is 1
			},
			transitionTimingFunction: {
				"expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
				"ease-drama": "cubic-bezier(0.6, 0.6, 0, 1)",
				"ease-in-out-quad": "cubic-bezier(0.455,  0.030, 0.515, 0.955)",
				"ease-in-out-cubic": "cubic-bezier(0.645,  0.045, 0.355, 1.000)",
				"ease-in-out-quart": "cubic-bezier(0.770,  0.000, 0.175, 1.000)",
				"ease-in-out-quint": "cubic-bezier(0.860,  0.000, 0.070, 1.000)",
			},
			boxShadow: {
				"surface-sm":
					"inset 0 0 0 1px white, 0px 1px 1px 0px rgba(109, 12, 42, 0.04), 0px 1px 1px 0px rgba(109, 12, 42, 0.03), 0px 2px 2px 0px rgba(109, 12, 42, 0.02), 0px 2px 2px 0px rgba(109, 12, 42,0.01)",
				"surface-md":
					"inset 0 0 0 1px white, 0px 1px 1px 0px rgba(109, 12, 42, 0.04), 0px 3px 3px 0px rgba(109, 12, 42, 0.03), 0px 6px 4px 0px rgba(109, 12, 42, 0.02), 0px 6px 4px 0px rgba(109, 12, 42,0.01)",
				"surface-lg":
					"inset 0 0 0 1px white, 0px 1px 1px 0px rgba(109, 12, 42, 0.04), 0px 3px 3px 0px rgba(109, 12, 42, 0.03), 0px 6px 4px 0px rgba(109, 12, 42, 0.02), 0px 11px 4px 0px rgba(109, 12, 42,0.01), 0px 32px 24px -12px rgba(109, 12, 42, 0.06)",
				"surface-lg-inverted":
					"inset 0 0 0 1px white, 0px 0px 1px 0px rgba(109, 12, 42, 0.04), 0px 0px 3px 0px rgba(109, 12, 42, 0.03), 0px 0px 4px 0px rgba(109, 12, 42, 0.02), 0px 0px 4px 0px rgba(109, 12, 42,0.01), 0px 0px 24px -12px rgba(109, 12, 42, 0.06)",
				"surface-inset": "inset 0 1px 1px 0 rgba(0, 0, 0, 0.1)",
				inlight: "inset 0px -6px 8px 0px rgba(255, 255, 255, 0.04)",
				"inlight-lg":
					"inset 0px -6px 8px 0px rgba(255, 255, 255, 0.04), inset 0px -11px 24px -12px rgba(255, 255, 255, 0.06)",
			},
		},
		plugins: [],
	},
} as Config;

export default config;
