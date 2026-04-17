/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'primary-lg': '0 12px 32px rgba(232,70,10,0.4)',
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(135deg, #E8460A 0%, #C73A08 100%)',
                'hero-gradient': 'linear-gradient(to top, rgba(28,25,23,0.9) 0%, rgba(28,25,23,0.4) 50%, transparent 100%)',
                'warm-gradient': 'linear-gradient(135deg, #FFF5F2 0%, #FAFAF8 100%)',
            },
            animation: {
                'fade-slide-up': 'fadeSlideUp 0.6s cubic-bezier(0.25,1,0.5,1) forwards',
                'blob': 'blobFloat 8s ease-in-out infinite',
                'cart-bounce': 'cartBounce 0.4s cubic-bezier(0.25,1,0.5,1)',
                'scale-in': 'scaleIn 0.35s cubic-bezier(0.25,1,0.5,1) forwards',
            },
            keyframes: {
                fadeSlideUp: {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                blobFloat: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(20px, -30px) scale(1.05)' },
                    '66%': { transform: 'translate(-15px, 15px) scale(0.95)' },
                },
                cartBounce: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.12)' },
                },
                scaleIn: {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
};