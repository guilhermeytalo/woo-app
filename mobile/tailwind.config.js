/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'woo-cream': '#F5EFE0',
        'woo-dark-bg': '#1C1B2E',
        'woo-yellow': '#E8C84A',
        'woo-rose': '#D4606A',
        'woo-orange': '#E07B45',
        'woo-burgundy': '#7B2D3A',
        'woo-coral': '#E8735A',
        'woo-card': '#2A2940',
      },
    },
  },
  plugins: [],
};
