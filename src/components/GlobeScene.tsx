import { useState, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

// Project Data
const PROJECTS = [
    { name: "Ho Chi Minh City, Vietnam", lat: 10.8231, lon: 106.6297 },
    { name: "Melbourne, Australia", lat: -37.8136, lon: 144.9631 },
    { name: "Manchester, UK", lat: 53.4808, lon: -2.2426 },
    { name: "Dubai, UAE", lat: 25.2048, lon: 55.2708 },
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
    const globeRadius = 4
    const earthMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg')

    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const { raycaster, pointer, camera } = useThree()
    const intersectionRef = useRef<THREE.Mesh>(null) // Invisible sphere for raycasting

    // Generate Particles
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
        const step = 3

        for (let y = 0; y < tempCanvas.height; y += step) {
            for (let x = 0; x < tempCanvas.width; x += step) {
                const i = (y * tempCanvas.width + x) * 4
                const r = data[i]

                if (r > 50) {
                    const phi = (y / tempCanvas.height) * Math.PI
                    const theta = (x / tempCanvas.width) * 2 * Math.PI - (Math.PI / 2)

                    const vX = globeRadius * Math.sin(phi) * Math.cos(theta)
                    const vY = globeRadius * Math.cos(phi)
                    const vZ = globeRadius * Math.sin(phi) * Math.sin(theta)

                    // Store original position and current position
                    particles.push({
                        origin: new THREE.Vector3(vX, vY, vZ),
                        current: new THREE.Vector3(vX, vY, vZ),
                        size: Math.random() * 0.03 + 0.01
                    })
                }
            }
        }
        return particles
    }, [earthMap])

    useFrame(() => {
        if (!meshRef.current || !intersectionRef.current) return

        // Raycast to find mouse position on the globe surface
        raycaster.setFromCamera(pointer, camera)
        const intersects = raycaster.intersectObject(intersectionRef.current)

        let point: THREE.Vector3 | null = null
        if (intersects.length > 0) {
            point = intersects[0].point
        }

        particleData.forEach((particle, i) => {
            const { origin, current, size } = particle

            if (point) {
                const dist = origin.distanceTo(point)
                const repulsionRadius = 2.0 // Increased radius
                const maxRepulsion = 0.8 // Increased force

                if (dist < repulsionRadius) {
                    // Calculate direction from cursor to particle
                    const dir = new THREE.Vector3().subVectors(origin, point).normalize()

                    // Add "Scatter" noise
                    // We want them to move generally away, but with some chaotic deviation
                    dir.x += (Math.random() - 0.5) * 0.5
                    dir.y += (Math.random() - 0.5) * 0.5
                    dir.z += (Math.random() - 0.5) * 0.5
                    dir.normalize()

                    // Force magnitude
                    const force = (1 - dist / repulsionRadius) * maxRepulsion

                    // Target position
                    const targetPos = origin.clone().add(dir.multiplyScalar(force))

                    // Move faster away (avoidance)
                    current.lerp(targetPos, 0.2)
                } else {
                    // Return to origin slowly (floating back)
                    current.lerp(origin, 0.05)
                }
            } else {
                current.lerp(origin, 0.05)
            }

            dummy.position.copy(current)
            dummy.scale.set(size, size, size)
            dummy.lookAt(new THREE.Vector3(0, 0, 0))
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <group>
            {/* Particles */}
            <instancedMesh ref={meshRef} args={[undefined, undefined, particleData.length]}>
                <sphereGeometry args={[0.35, 4, 4]} />
                <meshBasicMaterial color="#00DD39" transparent opacity={0.4} />
            </instancedMesh>

            {/* Invisible Sphere for Raycasting */}
            <mesh ref={intersectionRef} visible={false}>
                <sphereGeometry args={[globeRadius, 32, 32]} />
                <meshBasicMaterial />
            </mesh>

            {/* Inner Dark Sphere */}
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
    const groupRef = useRef<THREE.Group>(null)
    const ringRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    // Define the Pin Shape
    const pinShape = useMemo(() => {
        const s = new THREE.Shape()
        // Start at bottom tip
        s.moveTo(0, 0)
        // Curve up left
        s.quadraticCurveTo(-0.4, 0.4, -0.4, 0.9)
        // Top Arc (Semi-circle)
        s.absarc(0, 0.9, 0.4, Math.PI, 0, true)
        // Curve down right
        s.quadraticCurveTo(0.4, 0.4, 0, 0)

        // Hole
        const hole = new THREE.Path()
        hole.absarc(0, 0.9, 0.18, 0, Math.PI * 2, false)
        s.holes.push(hole)

        return s
    }, [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        if (groupRef.current) {
            // Billboard effect: Always face the camera
            groupRef.current.quaternion.copy(state.camera.quaternion)

            // Base scale is smaller now (0.2)
            const baseScale = 0.2
            const targetScale = hovered ? baseScale * 1.2 : baseScale
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
        }

        if (ringRef.current) {
            // Radar ping effect
            const ringScale = 1 + (t * 2) % 1.5
            ringRef.current.scale.set(ringScale, ringScale, 1)

            const opacity = 0.5 * (1 - ((t * 2) % 1.5) / 1.5)
            if (Array.isArray(ringRef.current.material)) {
                // Handle array material
            } else {
                (ringRef.current.material as THREE.MeshBasicMaterial).opacity = opacity
            }
        }
    })

    return (
        <group position={position}>
            {/* Pin Group - Billboards to Camera */}
            <group ref={groupRef} scale={[0.2, 0.2, 0.2]}>
                <group position={[0, 0.1, 0]}> {/* Lift pin slightly */}
                    <mesh
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
                        <extrudeGeometry args={[pinShape, { depth: 0.1, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 }]} />
                        <meshStandardMaterial
                            color={hovered ? "#00FFFF" : "#00DD39"}
                            emissive={hovered ? "#00FFFF" : "#00DD39"}
                            emissiveIntensity={0.6}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>

                    {/* Dark Inner Dot */}
                    <mesh position={[0, 0.9, 0.05]}>
                        <cylinderGeometry args={[0.17, 0.17, 0.12, 32]} />
                        <meshBasicMaterial color="#0f1715" />
                    </mesh>
                </group>

                {/* Pulsing Ring - Now inside billboard group, rotated to be "floor" of the pin */}
                <mesh ref={ringRef} position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.2, 0.8, 32]} />
                    <meshBasicMaterial color="#00DD39" transparent opacity={0.5} side={THREE.DoubleSide} />
                </mesh>
            </group>
        </group>
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
