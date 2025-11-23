import Section from './Section'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

const experiences = [
    {
        company: "NAB Innovation Centre Vietnam",
        role: "Software Engineer",
        location: "Ho Chi Minh City, Vietnam",
        period: "Sep 2024 - Present",
        achievements: [
            "Contributing to the Financial Crime Workbench – Case Management platform for transaction monitoring and customer due diligence.",
            "Designed and implemented APIs for seamless integration across microservices using Java 17, Spring Boot, and PostgreSQL.",
            "Delivered robust backend foundation enhancing NAB's investigative efficiency and compliance capabilities."
        ]
    },
    {
        company: "Mondia Digital",
        role: "Software Engineer - Backend",
        location: "Dubai, UAE (Remote)",
        period: "Oct 2023 - Aug 2024",
        achievements: [
            "Migrated Subscription Aggregator System using Java 17, Spring Boot, MongoDB, and Kafka.",
            "Designed new stock management architecture for inventory operations.",
            "Increased test coverage from 0% to 80% using JUnit5, Mockito, and JaCoCo."
        ]
    },
    {
        company: "Nash Squared",
        role: "Software Engineer - Backend",
        location: "Ho Chi Minh, Vietnam",
        period: "Sep 2021 - Aug 2023",
        achievements: [
            "Developed E-commerce Aggregator Platform using Java 11, Spring Boot, and CockroachDB.",
            "Optimized batch processing, increasing speed by 60%.",
            "Integrated APIs from TikTok, Shopify, and Amazon."
        ]
    },
    {
        company: "GB Smart Innovation JSC",
        role: "Mobile Developer",
        location: "Ho Chi Minh, Vietnam",
        period: "Aug 2020 - Dec 2021",
        achievements: [
            "Built Android-based employee management application.",
            "Implemented image processing techniques for photo enhancement."
        ]
    }
]

export default function Experience() {
    return (
        <Section id="experience" title="Professional Journey">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-nature-700 before:to-transparent">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-nature-700 bg-nature-900 group-hover:border-accent-neon group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                            <Briefcase size={18} className="text-nature-300 group-hover:text-accent-neon transition-colors" />
                        </div>

                        {/* Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl hover:bg-nature-800/60 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                <span className="text-accent-DEFAULT font-medium text-sm bg-accent-DEFAULT/10 px-3 py-1 rounded-full w-fit">
                                    {exp.company}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 text-sm text-nature-400 mb-4">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {exp.period}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {exp.location}
                                </div>
                            </div>

                            <ul className="space-y-2">
                                {exp.achievements.map((item, i) => (
                                    <li key={i} className="text-nature-200 text-sm leading-relaxed flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-dark shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}
