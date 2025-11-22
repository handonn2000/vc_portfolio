import Section from './Section'

export default function About() {
    return (
        <Section id="about" title="About Me">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-6 text-lg text-nature-200 leading-relaxed">
                    <p>
                        I'm a <span className="text-white font-semibold">Software Engineer</span> specializing in
                        backend development and cloud-native architectures. With over 3 years of experience working with
                        international clients from Dubai and the UK, I've honed my skills in building scalable,
                        high-performance systems.
                    </p>
                    <p>
                        My journey involves migrating legacy systems to modern microservices, optimizing batch processing
                        algorithms, and designing robust APIs. I'm passionate about <span className="text-accent-neon">Clean Code</span>,
                        <span className="text-accent-neon">System Design</span>, and solving complex engineering challenges.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="glass-card p-4 rounded-xl text-center flex-1">
                            <h3 className="text-3xl font-bold text-white mb-1">3+</h3>
                            <p className="text-sm text-nature-300">Years Exp.</p>
                        </div>
                        <div className="glass-card p-4 rounded-xl text-center flex-1">
                            <h3 className="text-3xl font-bold text-white mb-1">10+</h3>
                            <p className="text-sm text-nature-300">Projects</p>
                        </div>
                        <div className="glass-card p-4 rounded-xl text-center flex-1">
                            <h3 className="text-3xl font-bold text-white mb-1">Global</h3>
                            <p className="text-sm text-nature-300">Clients</p>
                        </div>
                    </div>
                </div>

                {/* Visual/Image Placeholder - Could be a photo or abstract graphic */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-DEFAULT to-nature-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <div className="relative glass-panel p-8 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                        {/* Abstract Code Graphic */}
                        <div className="font-mono text-sm text-nature-300 opacity-50 select-none">
                            <p>class Engineer &#123;</p>
                            <p className="pl-4">passion: "Building";</p>
                            <p className="pl-4">stack: ["Java", "Spring", "Cloud"];</p>
                            <p className="pl-4">mission: "Scale & Optimize";</p>
                            <p className="pl-4">status: "Ready to Deploy";</p>
                            <p>&#125;</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
