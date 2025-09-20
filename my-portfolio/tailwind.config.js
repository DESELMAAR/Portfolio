/** @type {import('tailwindcss').Config} */
export default {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {
keyframes: {
// défilement horizontal continu (sans coupure)
slideDot: {
"0%": { transform: "translateX(-10%)" },
"100%": { transform: "translateX(110%)" }
},
// léger rebond vertical
bounceSoft: {
"0%,100%": { transform: "translateY(0)" },
"50%": { transform: "translateY(-6px)" }
},
// halo lumineux doux
glow: {
"0%,100%": { opacity: 0.35, filter: "blur(2px)" },
"50%": { opacity: 0.9, filter: "blur(4px)" }
},
// shimmer horizontal très lent (fond)
shimmer: {
"0%": { backgroundPosition: "-40% 0" },
"100%": { backgroundPosition: "140% 0" }
},
// rotation très lente (fond)
spinSlow: {
from: { transform: "rotate(0deg)" },
to: { transform: "rotate(360deg)" }
}
},
animation: {
"slide-dot": "slideDot 12s linear infinite",
"bounce-soft": "bounceSoft 2.4s ease-in-out infinite",
glow: "glow 3.6s ease-in-out infinite",
shimmer: "shimmer 16s linear infinite",
"spin-slow": "spinSlow 40s linear infinite",
}
},
},
plugins: [],
}