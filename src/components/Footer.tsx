export default function Footer() {
    return (
        <footer className="py-8 bg-nature-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-nature-400 text-sm">
                    Designed & Built by <span className="text-white font-medium">Han Do-Nguyen-Nhat</span>
                </p>
                <p className="text-nature-600 text-xs mt-2">
                    © {new Date().getFullYear()} • Crafted with React, Tailwind & Babylon.js
                </p>
            </div>
        </footer>
    )
}
