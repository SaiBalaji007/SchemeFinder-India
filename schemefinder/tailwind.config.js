/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#13101E",
          50: "#F4F2FA",
          100: "#E7E2F5",
        },
        violet: {
          50: "#F6F3FE",
          100: "#EDE7FD",
          200: "#D9CCFB",
          300: "#BCA3F6",
          400: "#9A72EE",
          500: "#7C4DE3",
          600: "#6B32D6",
          700: "#5A24B8",
          800: "#481C93",
          900: "#3A1876",
        },
        saffron: "#F5A524",
        leaf: "#178A4C",
        sand: "#FBF9F5",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(19,16,30,0.04), 0 8px 24px rgba(90,36,184,0.06)",
        card: "0 1px 2px rgba(19,16,30,0.04), 0 12px 32px -8px rgba(90,36,184,0.12)",
        "card-hover": "0 4px 12px rgba(19,16,30,0.06), 0 24px 48px -12px rgba(90,36,184,0.22)",
        glow: "0 0 0 1px rgba(124,77,227,0.15), 0 8px 40px rgba(124,77,227,0.25)",
      },
      backgroundImage: {
        tricolor: "linear-gradient(90deg, #F5A524 0%, #F5A524 33%, #FFFFFF 33%, #FFFFFF 66%, #178A4C 66%, #178A4C 100%)",
        grain: "radial-gradient(circle at 1px 1px, rgba(90,36,184,0.08) 1px, transparent 0)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
