/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //font-family
      fontFamily: {
        'Josefin': ['Josefin Sans', 'sans-serif'],
      },
      // Add animation keyframes
      keyframes: {
        myAnim: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-50px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      // Add animation properties to the button
      animation: {
        'myAnim': 'myAnim .5s ease 0s 1 normal forwards',
      },
      //theme-colors
      colors: {
        primary: {
          'bright-blue': 'hsl(220, 98%, 61%)',
          'firstColor': 'hsl(192, 100%, 67%)',
          'secondColor': 'hsl(280, 87%, 65%)',
          'check-background': 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
        },
        lightTheme: {
          'very-light-gray': 'hsl(0, 0%, 98%)',
          'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
          'light-grayish-blue': 'hsl(233, 11%, 84%)',
          'dark-grayish-blue': 'hsl(236, 9%, 61%)',
          'very-dark-grayish-blue': 'hsl(235, 19%, 35%)',
        },
        darkTheme: {
          'very-dark-blue': 'hsl(235, 21%, 11%)',
          'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
          'light-grayish-blue': 'hsl(234, 39%, 85%)',
          'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
          'dark-grayish-blue': 'hsl(234, 11%, 52%)',
          'very-dark-grayish-blue-1': 'hsl(233, 14%, 35%)',
          'very-dark-grayish-blue-2': 'hsl(237, 14%, 26%)',
        },
      },
      boxShadow: {
        borderGradient: '0 0 0 2px from-primary-firstColor to-primary-secondColor',
      },
      //media quarry
      screens: {
        'sm': '320px', // Added custom breakpoint for 320px
        'md': '768px',
        'lg': '1024px',
        'xl': '1200px',
        'xxl': '1440px'
      },
    },
  },
  plugins: [],
};
