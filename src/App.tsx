import Layout from './components/Layout'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import AudioPlayer from './components/AudioPlayer'

function App() {
  return (
    <Layout>
      <AudioPlayer />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
    </Layout>
  )
}

export default App
