import { Button, Input, type MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
	components: {
		Input: Input.extend({
			classNames: {
				input:
					"transition-all focus-visible:ring-3 focus-visible:ring-slate-300 duration-100 border border-slate-200 ring-transparent hover:border-slate-300 ring-0 focus:border-slate-700 focus:ring-3 focus:ring-slate-100 placeholder-slate-400",
			},
		}),
	},
	primaryColor: "cyan",
	colors: {
		cyan: [
			"#ecfeff",
			"#cffafe",
			"#a5f3fc",
			"#22d3ee",
			"#06b6d4",
			"#0891b2",
			"#0e7490",
			"#155e75",
			"#164e63",
			"#083344",
		],
		gray: [
			"#f8fafc",
			"#f1f5f9",
			"#e2e8f0",
			"#94a3b8",
			"#64748b",
			"#475569",
			"#334155",
			"#1e293b",
			"#0f172a",
			"#020617",
		],
	},
	fontFamily: "Inter, sans-serif",
	fontFamilyMonospace: "Fira Code, monospace",
	headings: {
		fontWeight: "500",
		fontFamily: "SF Pro Display, sans-serif",
		textWrap: "balance",
		sizes: {
			h1: {
				fontSize: "56px",
				lineHeight: "64px",
			},
			h2: {
				fontSize: "48px",
				lineHeight: "56px",
			},
			h3: {
				fontSize: "40px",
				lineHeight: "48px",
			},
			h4: {
				fontSize: "32px",
				lineHeight: "40px",
			},
			h5: {
				fontSize: "24px",
				lineHeight: "32px",
			},
			h6: {
				fontSize: "20px",
				lineHeight: "28px",
			},
		},
	},
	fontSizes: {
		xs: "12px",
		sm: "14px",
		md: "16px",
		lg: "18px",
		xl: "32px",
		"2xl": "40px",
		"3xl": "48px",
		"4xl": "56px",
		"5xl": "64px",
		"6xl": "72px",
	},
	lineHeights: {
		xs: "16px",
		sm: "20px",
		md: "24px",
		lg: "32px",
		xl: "40px",
		"2xl": "48px",
		"3xl": "56px",
		"4xl": "64px",
		"5xl": "72px",
		"6xl": "72px",
	},
};
