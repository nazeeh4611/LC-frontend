import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A0A0A",
          900: "#000000",
        },
        bg: {
          DEFAULT: "#000000",
          secondary: "#0A0A0A",
          elevated: "#141414",
          dark: "#000000",
        },
        gold: {
          DEFAULT: "#B8933F",
          bright: "#E3C071",
          deep: "#8C6A28",
          soft: "rgba(227,192,113,0.12)",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          muted: "#B3B3B3",
          faint: "#707070",
        },
        border: {
          DEFAULT: "rgba(227,192,113,0.18)",
          strong: "rgba(227,192,113,0.4)",
          hairline: "rgba(255,255,255,0.08)",
        },
        status: {
          success: "#3FB27F",
          warning: "#D6A337",
          danger: "#D2564B",
          info: "#4C86C9",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-manrope, 'Manrope')",
          "-apple-system",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-cormorant, 'Cormorant Garamond')",
          "Georgia",
          "'Times New Roman'",
          "serif",
        ],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-lg": ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-md": ["2.125rem", { lineHeight: "1.15" }],
        "eyebrow": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
        /* Editorial scale — used by the new homepage design system */
        "hero": ["clamp(3.25rem, 7vw, 7.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "editorial": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "editorial-sm": ["clamp(1.75rem, 3.2vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "stat": ["clamp(2.75rem, 5vw, 4.75rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, rgba(227,192,113,0) 0%, rgba(227,192,113,0.7) 50%, rgba(227,192,113,0) 100%)",
        "navy-gradient": "linear-gradient(180deg, #141414 0%, #000000 100%)",
        "radial-fade": "radial-gradient(circle at 50% 0%, rgba(227,192,113,0.14) 0%, rgba(0,0,0,0) 60%)",
        "gold-radial": "radial-gradient(circle at 30% 20%, rgba(227,192,113,0.22) 0%, rgba(227,192,113,0) 55%)",
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212,175,106,0.25), 0 8px 24px rgba(0,0,0,0.45)",
        card: "0 4px 20px rgba(0,0,0,0.35)",
        elevated: "0 30px 80px -20px rgba(0,0,0,0.65)",
        "gold-glow": "0 0 60px -10px rgba(212,175,106,0.35)",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.75rem",
        blob: "42% 58% 65% 35% / 45% 40% 60% 55%",
        "blob-2": "63% 37% 41% 59% / 40% 61% 39% 60%",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 7s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
