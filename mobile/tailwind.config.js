/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'woo-principal': '#FAF7F5',
        'woo-red': '#792C2D',
        'woo-yellow': '#F4B740',
        'woo-dark-text': '#2E2E2E',
        'woo-light-gray': '#6B6B6B',
        'woo-white-cards': '#FFF',
        'woo-black': '#000'

        // 'woo-cream': '#F5EFE0',
        // 'woo-dark-bg': '#1C1B2E',
        // 'woo-yellow': '#E8C84A',
        // 'woo-rose': '#D4606A',
        // 'woo-orange': '#E07B45',
        // 'woo-burgundy': '#7B2D3A',
        // 'woo-coral': '#E8735A',
        // 'woo-card': '#2A2940',
      },
    },
  },
  plugins: [],
};
