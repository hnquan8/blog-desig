/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: ['light','dark', 
    {
      mytheme: { 
            "primary": "#34d399",
            "secondary": "#f3e8ff",
            "accent": "#1dcdbc",    
            "neutral": "#2b3440",
            "base-100": "#F5F5F5",
            "info": "#3abff8",
            "success": "#36d399",
            "warning": "#fbbd23",
            "error": "#f87272",
      },
    },],
  },
}
