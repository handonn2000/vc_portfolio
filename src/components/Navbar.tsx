import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-nature-900/80' : 'bg-nature-900/40'
                    }`}>
                    {/* Logo */}
                    <a href="#" className="text-2xl font-bold font-display text-white tracking-tight">
                        Han<span className="text-accent-neon">.dev</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-nature-100 hover:text-accent-neon transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Social Icons */}
                    <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-nature-200 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-nature-200 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:handonn542000@gmail.com" className="text-nature-200 hover:text-white transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-24 left-4 right-4 glass-panel rounded-2xl p-6 md:hidden animate-fade-in-up">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-nature-100 hover:text-accent-neon transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="flex gap-6 pt-4 border-t border-white/10 justify-center">
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-nature-200 hover:text-white">
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-nature-200 hover:text-white">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:handonn542000@gmail.com" className="text-nature-200 hover:text-white">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
