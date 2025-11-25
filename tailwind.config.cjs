module.exports = {
  content: [
    "./index.html",
    "./node_modules/flowbite-react/lib/**/*.{js,ts}",
    "./node_modules/react-tailwindcss-datepicker/dist/*.js",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          50: '#7f4577',
          700: '#7f4577',
          900: '#7f4577',
        },
        secondary: '#9F5D9B',
        confirm: '#0000ff',
        cancel: '#ff0000',
        yellow: '#E28A05',
        blue: '#056BE2',
        aguamarina: '#31FFFF',
        grayNc: '#e0d8cc',
        appBackground: '#ebeef7',
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      backgroundImage: {
        'app': "url('/assets/app_background.jpg')",
        'login-numbers': "url('/assets/login_numbers.jpg')",
        'login-shape': "url('/assets/login_shape.png')",
        'home-background': "url('/assets/newBg2.png')",
      },
    },
  },
  plugins: [],
  safelist: [{
    pattern: /bg-/,
  }]
}
