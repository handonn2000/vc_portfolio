import { useState, useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Float, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// Project Data
const PROJECTS = [
    { name: "Edmonton, Canada", lat: 53.5461, lon: -113.4938 },
    { name: "Brevik, Norway", lat: 59.0533, lon: 9.7027 },
    { name: "Padeswood, UK", lat: 53.15, lon: -3.05 },
    { name: "Slite, Sweden", lat: 57.68, lon: 18.79 },
    { name: "Mitchell, Indiana", lat: 38.73, lon: -86.47 },
]

// Convert Lat/Lon to Vector3
function latLonToVector3(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)
    return new THREE.Vector3(x, y, z)
}

function ParticleGlobe({ onHover }: { onHover: (project: string | null) => void }) {
    const globeRadius = 4 // Reduced size
    // Load Earth Specular Map (Black ocean, white land)
    // Using a reliable public URL for the texture
    const earthMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg')

    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate Particles from Texture
    const particleData = useMemo(() => {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = earthMap.image.width
        tempCanvas.height = earthMap.image.height
        const ctx = tempCanvas.getContext('2d')
        if (!ctx) return []

        ctx.drawImage(earthMap.image, 0, 0)
        const imgData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
        const data = imgData.data

        const particles = []
        const step = 3 // Increased density (lower step = more particles)

        for (let y = 0; y < tempCanvas.height; y += step) {
            for (let x = 0; x < tempCanvas.width; x += step) {
                const i = (y * tempCanvas.width + x) * 4
                const r = data[i]

                // If pixel is bright (land), add a particle
                if (r > 50) {
                    // Map 2D UV to 3D Sphere
                    // Note: Texture mapping might need inversion depending on the source image
                    // Standard equirectangular map: 
                    // phi (lat) goes from 0 (top) to PI (bottom)
                    // theta (lon) goes from 0 to 2PI

                    const phi = (y / tempCanvas.height) * Math.PI
                    const theta = (x / tempCanvas.width) * 2 * Math.PI - (Math.PI / 2) // Adjust rotation to align with markers

                    const vX = globeRadius * Math.sin(phi) * Math.cos(theta)
                    const vY = globeRadius * Math.cos(phi)
                    const vZ = globeRadius * Math.sin(phi) * Math.sin(theta)

                    particles.push({ pos: new THREE.Vector3(vX, vY, vZ), size: Math.random() * 0.03 + 0.01 })
                }
            }
        }
        return particles
    }, [earthMap])

    useEffect(() => {
        if (meshRef.current) {
            particleData.forEach((particle, i) => {
                dummy.position.copy(particle.pos)
                dummy.scale.set(particle.size, particle.size, particle.size)
                dummy.lookAt(new THREE.Vector3(0, 0, 0)) // Face center
                dummy.updateMatrix()
                meshRef.current!.setMatrixAt(i, dummy.matrix)
            })
            meshRef.current.instanceMatrix.needsUpdate = true
        }
    }, [particleData, dummy])

    return (
        <group>
            {/* Particles */}
            <instancedMesh ref={meshRef} args={[undefined, undefined, particleData.length]}>
                <sphereGeometry args={[0.35, 4, 4]} /> {/* Smaller dots */}
                <meshBasicMaterial color="#00DD39" transparent opacity={0.4} /> {/* Lower opacity */}
            </instancedMesh>

            {/* Inner Dark Sphere to block background seeing through */}
            <mesh>
                <sphereGeometry args={[globeRadius - 0.1, 32, 32]} />
                <meshBasicMaterial color="#0f1715" transparent opacity={0.95} />
            </mesh>

            {/* Markers */}
            {PROJECTS.map((project) => {
                const pos = latLonToVector3(project.lat, project.lon, globeRadius + 0.2)
                return (
                    <Marker
                        key={project.name}
                        position={pos}
                        name={project.name}
                        onHover={onHover}
                    />
                )
            })}
        </group>
    )
}

function Marker({ position, name, onHover }: { position: THREE.Vector3, name: string, onHover: (n: string | null) => void }) {
    const ref = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
        if (ref.current) {
            // Pulse effect
            const t = state.clock.getElapsedTime()
            const scale = 1 + Math.sin(t * 3) * 0.2
            ref.current.scale.set(scale, scale, scale)
            ref.current.lookAt(new THREE.Vector3(2.5, 0, 0)) // Look at center of globe (shifted)
        }
    })

    return (
        <mesh
            ref={ref}
            position={position}
            onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
                onHover(name)
                document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
                setHovered(false)
                onHover(null)
                document.body.style.cursor = 'auto'
            }}
        >
            <cylinderGeometry args={[0.1, 0.05, 0.5, 8]} />
            <meshBasicMaterial
                color={hovered ? "#00FF55" : "#00DD39"}
                transparent
                opacity={0.8}
            />
            {/* Glow Halo */}
            <mesh position={[0, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.1, 0.3, 16]} />
                <meshBasicMaterial color="#00DD39" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
        </mesh>
    )
}

export default function GlobeScene() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null)

    return (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#050a08] to-[#0f1715]"> {/* Darker background for space */}
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 14], fov: 45 }}>
                <fog attach="fog" args={['#050a08', 20, 120]} /> {/* Pushed fog back to reveal stars */}

                {/* Universe Environment */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={2000} scale={25} size={3} speed={0.4} opacity={0.5} color="#00DD39" />
                <Sparkles count={1000} scale={30} size={1} speed={0.2} opacity={0.3} color="#ffffff" />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00FF55" />

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={!hoveredProject}
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    target={[2.5, 0, 0]} // Orbit around the shifted globe
                />

                {/* Floating Globe - Shifted to the Right */}
                <group position={[2.5, 0, 0]}>
                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                        <ParticleGlobe onHover={setHoveredProject} />
                    </Float>
                </group>
            </Canvas>

            {/* UI Overlay for Tooltip */}
            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
                    >
                        <div className="glass-panel px-6 py-3 rounded-xl shadow-xl border border-white/10">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#00DD39] animate-pulse" />
                                {hoveredProject}
                            </h3>
                            <p className="text-nature-300 text-xs mt-1">CCUS Project Active</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
