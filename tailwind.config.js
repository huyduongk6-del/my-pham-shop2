/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        'primary-hover': '#333333',
        'pastel-pink': '#FAF7F2',
        'pastel-pink-light': '#FDFBF9',
        'korean-beige': '#D8BFA3',
        'korean-rose-beige': '#E8C7C2',
        dark: '#111111',
        muted: '#767676',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'Pretendard', 'sans-serif'],
        script: ['"Plus Jakarta Sans"', 'sans-serif'], // Loại bỏ font viết tay sến, chuyển sang elegant sans
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'soft-pink': '0 8px 30px rgba(255, 107, 156, 0.1)',
      }
    },
  },
  plugins: [],
}
