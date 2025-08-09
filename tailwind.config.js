/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#646cff', // used for links, borders, hover
          dark: '#535bf2',    // hover
          light: '#747bff',   // hover (light mode)
        },
        secondary: '#61dafb', // react logo
        accent: '#888',       // docs text
        background: {
          DEFAULT: '#242424', // dark bg
          light: '#ffffff',  // light bg
          dark: '#1a1a1a',   // button
        },
        muted: '#f9f9f9',     // button (light)
        surface: '#213547',   // h1 (light mode)
        border: {
          DEFAULT: '#e5e7eb', // Tailwind gray-200
          dark: '#4b5563',    // Tailwind gray-600
        },
        text: {
          DEFAULT: '#213547', // h1 (light mode)
          light: '#ffffff',   // default text (dark)
          muted: '#888',      // docs text
          dark: '#242424',    // default text (dark)
        },
        placeholder: {
          DEFAULT: '#6b7280', // Tailwind gray-500
          dark: '#9ca3af',    // Tailwind gray-400
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        purple: {
          600: '#9333ea',
          700: '#7e22ce',
        },
        red: {
          500: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
