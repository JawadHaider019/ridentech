/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: '#DF9114',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
