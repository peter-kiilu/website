module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#001f3f',  // Navy blue
          light: '#1a3d6d',
          dark: '#00152e',
        },
        secondary: {
          default: '#2ecc71',  // Emerald green
          light: '#48d68b',
          dark: '#27ae60',
        },
        accent: {
          default: '#f39c12',  // Orange
          light: '#f4b350',
          dark: '#e67e22',
        },
      },
    },
  },
  plugins: [],
}