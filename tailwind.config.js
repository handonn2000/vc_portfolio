/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                nature: {
                    50: '#f2f8f2',
                    100: '#e2f0e3',
                    200: '#c5e1c7',
                    300: '#9bc79e',
                    400: '#6ca571',
                    500: '#4a8750',
                    600: '#386b3d',
                    700: '#2e5532',
                    800: '#27442a',
                    900: '#213924',
                    950: '#101f12',
                },
                earth: {
                    50: '#fbf7f3',
                    100: '#f5ebe4',
                    200: '#ebd6c6',
                    300: '#debba2',
                    400: '#ce9a7b',
                    500: '#c27d59',
                    600: '#b56343',
                    700: '#964e36',
                    800: '#7b4131',
                    900: '#63362a',
                    950: '#351a13',
                }
            },
        },
    },
    plugins: [],
}
