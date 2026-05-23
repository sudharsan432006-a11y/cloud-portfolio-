/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'infra-dark': '#050505',
        'infra-gray': '#121212',
        'cyber-blue': '#00f2ff',
        'cloud-white': '#f0f0f0',
        'matrix-green': '#00ff41',
      },
    },
  },
  plugins: [],
};
