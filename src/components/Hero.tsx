import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import GlobeScene from './GlobeScene'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLHeadingElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const descRef = useRef<HTMLParagraphElement>(null)
    const btnRef = useRef<HTMLAnchorElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // Initial state - Slide from Left
        gsap.set([nameRef.current, titleRef.current, descRef.current, btnRef.current], {
            opacity: 0,
            x: -50
        })
        gsap.set(scrollRef.current, { opacity: 0, y: 20 })

        tl.to(nameRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.5
        })
            .to(titleRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
            }, "-=0.6")
            .to(descRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
            }, "-=0.6")
            .to(btnRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.6,
            }, "-=0.4")
            .to(scrollRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6
            }, "-=0.2")

    }, { scope: containerRef })

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden" ref={containerRef}>
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <GlobeScene />
            </div>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-nature-900/90 via-nature-900/30 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start pointer-events-none">
                <div className="space-y-8 pointer-events-auto max-w-3xl">
                    <h1 ref={nameRef} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white drop-shadow-lg">
                        Han
                        <span className="text-[#00DD39]"> Do</span>
                    </h1>

                    <div ref={titleRef} className="inline-flex items-center gap-3 glass-panel px-6 py-3 rounded-full border-l-4 border-[#00DD39]">
                        <span className="text-xl md:text-2xl font-light text-nature-100 tracking-wide">
                            Software Engineer
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00DD39]" />
                        <span className="text-xl md:text-2xl font-medium text-[#00DD39] tracking-wide">
                            Backend
                        </span>
                    </div>

                    <p ref={descRef} className="text-nature-300 text-lg md:text-2xl font-light leading-relaxed max-w-2xl">
                        Crafting robust microservices and cloud-native solutions with
                        <span className="text-white font-medium"> Spring Boot</span> &
                        <span className="text-white font-medium"> Modern Tech</span>.
                    </p>

                    <div className="pt-4">
                        <a
                            ref={btnRef}
                            href="#about"
                            className="btn-primary inline-flex items-center gap-3 group !bg-[#00DD39] !text-white !px-8 !py-4 !text-lg !rounded-full hover:!bg-[#00FF55] !shadow-[0_0_20px_rgba(0,221,57,0.3)] hover:!shadow-[0_0_30px_rgba(0,255,85,0.5)] transition-all duration-300"
                        >
                            View My Work
                            <ChevronDown className="group-hover:translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-float">
                <div className="w-[30px] h-[50px] rounded-full border-2 border-nature-900/30 flex justify-center p-2 backdrop-blur-sm">
                    <div className="w-1 h-3 bg-[#00DD39] rounded-full animate-pulse-slow" />
                </div>
            </div>
        </section>
    )
}
