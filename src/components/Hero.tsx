import { ChevronDown } from 'lucide-react'
import BabylonScene from './BabylonScene'

export default function Hero() {
    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <BabylonScene />
            </div>

            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-nature-900 via-transparent to-nature-900/50 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                <div className="animate-fade-in-up space-y-6">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-lg">
                        Han <span className="text-accent-neon">Do-Nguyen-Nhat</span>
                    </h1>

                    <div className="inline-block glass-panel px-8 py-4 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                        <h2 className="text-xl md:text-3xl font-light text-nature-100 tracking-wide">
                            Software Engineer <span className="text-accent-DEFAULT mx-2">•</span> Backend
                        </h2>
                    </div>

                    <p className="text-nature-200 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        Crafting robust microservices and cloud-native solutions with
                        <span className="text-accent-neon font-medium"> Spring Boot</span> &
                        <span className="text-accent-neon font-medium"> Modern Tech</span>.
                    </p>

                    <div className="pt-8">
                        <a
                            href="#about"
                            className="btn-primary inline-flex items-center gap-2 group"
                        >
                            View My Work
                            <ChevronDown className="group-hover:translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-float">
                <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center p-2 backdrop-blur-sm">
                    <div className="w-1 h-3 bg-accent-neon rounded-full animate-pulse-slow" />
                </div>
            </div>
        </section>
    )
}
