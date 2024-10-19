const config = {
    // important: true,
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        ringWidth: {
            DEFAULT: "1px",
            0: "0px",
            1: "1px",
            2: "2px",
            3: "3px",
            4: "4px",
            8: "8px",
        },
        backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
                "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            "gradient-to-r":
                "linear-gradient(to right, var(--tw-gradient-stops))",
            "gradient-to-br":
                "linear-gradient(to bottom right, var(--tw-gradient-stops))",
            "gradient-to-b":
                "linear-gradient(to bottom, var(--tw-gradient-stops))",
            "gradient-to-bl":
                "linear-gradient(to bottom left, var(--tw-gradient-stops))",
            "gradient-to-l":
                "linear-gradient(to left, var(--tw-gradient-stops))",
            "gradient-to-tl":
                "linear-gradient(to top left, var(--tw-gradient-stops))",
            "gradient-to-t":
                "linear-gradient(to top, var(--tw-gradient-stops))",
            "gradient-to-tr":
                "linear-gradient(to top right, var(--tw-gradient-stops))",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1.5rem",
                md: "2rem",
                lg: "2.5rem",
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
            tightest: "-0.028em",
            tighter: "-0.012em",
            tight: "-0.006em",
            normal: "0",
            wide: "0.03em",
            wider: "0.06em",
            widest: "0.08em",
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
                "ease-in-out-cubic":
                    "cubic-bezier(0.645,  0.045, 0.355, 1.000)",
                "ease-in-out-quart":
                    "cubic-bezier(0.770,  0.000, 0.175, 1.000)",
                "ease-in-out-quint":
                    "cubic-bezier(0.860,  0.000, 0.070, 1.000)",
            },
            boxShadow: {
                card: "0 2px 4px 0 rgba(27, 28, 29, 0.04)",
            },
            perspective: {
                none: "none",
                xs: "400px",
                sm: "800px",
                md: "1600px",
                lg: "3200px",
            },
        },
    },
    plugins: [
        "prettier-plugin-tailwindcss",
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/container-queries"),
    ],
};

export default config;
