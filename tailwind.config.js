/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#0097A7',

          secondary: '#fb8532',

          accent: '#7ee787',

          neutral: '#2A303C',

          'base-100': '#0d1117',

          info: '#2188ff',

          success: '#28a745',

          warning: '#ffdf5d',

          error: '#bd2c00'
        },
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#0097A7',

          secondary: '#c75200',

          accent: '#7ee787',

          neutral: '#0d1117',

          info: '#2188ff',

          success: '#28a745',

          warning: '#ffdf5d',

          error: '#bd2c00'
        }
      }
    ]
  },
  plugins: [
    require('daisyui'), require('@tailwindcss/forms')
  ]
}
