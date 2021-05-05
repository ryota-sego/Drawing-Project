module.exports = {
  purge: [
     './resources/**/*.blade.php',
     './resources/**/*.js',
   ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
       '0': '0',
       '1/4': '25%',
       '1/2': '50%',
       '4/5': '80%',
       'full': '100%',
      },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms')({
       strategy: 'class',
      }),
    ],
}
