import Section from './Section'

const skillCategories = [
    {
        title: "Languages",
        skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS"]
    },
    {
        title: "Frameworks",
        skills: ["Spring Boot", "Spring Cloud", "React", "Kafka", "Keycloak", "Android Studio"]
    },
    {
        title: "Databases",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "CockroachDB"]
    },
    {
        title: "Cloud & DevOps",
        skills: ["AWS (EC2, ECS, S3)", "Docker", "CI/CD", "Microservices", "System Design"]
    }
]

export default function Skills() {
    return (
        <Section id="skills" title="Technical Arsenal" className="bg-nature-900/50">
            <div className="grid md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                    <div
                        key={category.title}
                        className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 rounded-full text-sm font-medium bg-nature-800 text-nature-200 border border-nature-700 hover:border-accent-DEFAULT hover:text-accent-neon transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}
