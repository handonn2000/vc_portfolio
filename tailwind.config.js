/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                nature: {
                    900: '#0f1715', // Deep charcoal/green (Background)
                    800: '#162623', // Dark forest
                    700: '#1e3a34',
                    600: '#2d5a50',
                    500: '#3e7c6f',
                    400: '#52a08f',
                    300: '#6cc5b0',
                    200: '#8eead5', // Light mint
                    100: '#bafff0',
                    50: '#effffb',
                },
                accent: {
                    light: '#a7f3d0', // Soft green glow
                    DEFAULT: '#10b981', // Primary green
                    dark: '#059669',
                    neon: '#00ff9d', // High contrast accent
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #162623 0deg, #0f1715 180deg, #162623 360deg)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
