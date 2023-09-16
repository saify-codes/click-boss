/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#099DF2","600":"#099DF2","700":"#bf1313","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        secondary: {"100":"#9487b4","200":"#8273a8","300":"#715f9b","400":"#5f4b8f","500":"#4D3782","600":"#453275","700":"#3e2c68","800":"#36275b"},
        // primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#E72D2E","700":"#bf1313","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
     require('@tailwindcss/forms'),
  ],
}
