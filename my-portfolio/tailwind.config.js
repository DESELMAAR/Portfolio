/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDot: {
          "0%": { left: "0%" },
          "100%": { left: "100%" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.6)" },
        },
      },
      animation: {
        "slide-dot": "slideDot 8s linear infinite", // slow slide
        "glow": "glow 2s ease-in-out infinite",     // glowing effect
      },
    },
  },
  plugins: [],
}


