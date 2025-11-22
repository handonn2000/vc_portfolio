import Section from './Section'
import { Github, ExternalLink, Folder } from 'lucide-react'

const projects = [
    {
        title: "Microservices 101",
        description: "A research project exploring Spring Cloud, Kafka, and Keycloak. Implemented a full microservices architecture with centralized auth and event-driven communication.",
        tags: ["Java", "Spring Boot", "Kafka", "Keycloak"],
        links: {
            github: "https://github.com",
            demo: "#"
        }
    },
    {
        title: "DSA 101",
        description: "A dedicated repository for mastering Data Structures and Algorithms in Python. Contains implementations of core algorithms and solutions to complex problems.",
        tags: ["Python", "Algorithms", "Data Structures"],
        links: {
            github: "https://github.com",
            demo: "#"
        }
    },
    {
        title: "NFT Charity Marketplace",
        description: "Graduation thesis project. A web application leveraging NFTs to facilitate fundraising for charitable organizations. Built with React and Blockchain integration.",
        tags: ["React", "Blockchain", "NFT", "Web3"],
        links: {
            github: "#",
            demo: "#"
        }
    }
]

export default function Projects() {
    return (
        <Section id="projects" title="Featured Projects" className="bg-nature-900/50">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="glass-card p-6 rounded-2xl flex flex-col group hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="p-3 rounded-lg bg-nature-800 text-accent-DEFAULT group-hover:text-accent-neon transition-colors">
                                <Folder size={24} />
                            </div>
                            <div className="flex gap-4">
                                <a href={project.links.github} target="_blank" rel="noreferrer" className="text-nature-400 hover:text-white transition-colors">
                                    <Github size={20} />
                                </a>
                                <a href={project.links.demo} target="_blank" rel="noreferrer" className="text-nature-400 hover:text-white transition-colors">
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-neon transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-nature-300 text-sm leading-relaxed mb-6 flex-grow">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium text-nature-400 font-mono"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    )
}
