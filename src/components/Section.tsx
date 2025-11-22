import type { ReactNode } from 'react'

interface SectionProps {
    id: string
    title?: string
    children: ReactNode
    className?: string
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
    return (
        <section id={id} className={`py-20 md:py-32 relative ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 inline-block relative">
                            <span className="text-gradient">{title}</span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-DEFAULT to-transparent opacity-50" />
                        </h2>
                    </div>
                )}
                <div className="animate-fade-in-up">
                    {children}
                </div>
            </div>
        </section>
    )
}
