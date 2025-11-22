import { useEffect, useRef } from 'react'
import * as BABYLON from 'babylonjs'

export default function BabylonScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const engineRef = useRef<BABYLON.Engine | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        // Initialize Engine
        const engine = new BABYLON.Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true,
            alpha: true
        })
        engineRef.current = engine

        // Create Scene
        const scene = new BABYLON.Scene(engine)
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)

        // Fog for depth
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP
        scene.fogColor = BABYLON.Color3.FromHexString("#0f1715")
        scene.fogDensity = 0.02

        // Camera
        const camera = new BABYLON.ArcRotateCamera(
            'camera',
            Math.PI / 2, // alpha
            Math.PI / 2.5, // beta
            18, // radius
            new BABYLON.Vector3(0, 4, 0), // target
            scene
        )
        camera.attachControl(canvasRef.current, true)
        camera.lowerRadiusLimit = 12
        camera.upperRadiusLimit = 25
        camera.lowerBetaLimit = 0.5
        camera.upperBetaLimit = Math.PI / 2

        // Smooth camera movement
        camera.useAutoRotationBehavior = true
        camera.autoRotationBehavior!.idleRotationSpeed = 0.05
        camera.autoRotationBehavior!.idleRotationWaitTime = 1000
        camera.autoRotationBehavior!.idleRotationSpinupTime = 2000

        // Lighting
        const hemiLight = new BABYLON.HemisphericLight(
            'hemiLight',
            new BABYLON.Vector3(0, 1, 0),
            scene
        )
        hemiLight.intensity = 0.3
        hemiLight.diffuse = new BABYLON.Color3(0.1, 0.3, 0.2) // Greenish ambient

        const dirLight = new BABYLON.DirectionalLight(
            'dirLight',
            new BABYLON.Vector3(-1, -2, -1),
            scene
        )
        dirLight.intensity = 1.5
        dirLight.diffuse = new BABYLON.Color3(1, 0.9, 0.8) // Warm sun
        dirLight.specular = new BABYLON.Color3(0.1, 1, 0.5) // Neon green highlights

        // Glow Layer for "Tech" feel
        const gl = new BABYLON.GlowLayer("glow", scene)
        gl.intensity = 0.6

        // --- Tree Generation (Stylized Low Poly) ---

        // Materials
        const trunkMat = new BABYLON.StandardMaterial('trunkMat', scene)
        trunkMat.diffuseColor = BABYLON.Color3.FromHexString("#2d2d2d") // Dark charcoal
        trunkMat.emissiveColor = BABYLON.Color3.FromHexString("#05100e")
        trunkMat.specularColor = BABYLON.Color3.FromHexString("#333333")

        const leafMat = new BABYLON.StandardMaterial('leafMat', scene)
        leafMat.diffuseColor = BABYLON.Color3.FromHexString("#10b981") // Emerald
        leafMat.emissiveColor = BABYLON.Color3.FromHexString("#064e3b") // Deep green glow
        leafMat.specularColor = BABYLON.Color3.FromHexString("#00ff9d") // Neon highlights
        leafMat.alpha = 0.9

        // Trunk
        const trunk = BABYLON.MeshBuilder.CreateCylinder(
            'trunk',
            { height: 6, diameterTop: 0.4, diameterBottom: 1, tessellation: 6 },
            scene
        )
        trunk.position.y = 3
        trunk.material = trunkMat

        // Branches (Simple)
        const createBranch = (angle: number, y: number, length: number) => {
            const branch = BABYLON.MeshBuilder.CreateCylinder(
                'branch',
                { height: length, diameterTop: 0.2, diameterBottom: 0.4, tessellation: 6 },
                scene
            )
            branch.parent = trunk
            branch.position.y = y - 3 // Relative to trunk center
            branch.rotation.z = Math.PI / 3
            branch.rotation.y = angle
            branch.position.x = Math.sin(angle) * 0.5
            branch.position.z = Math.cos(angle) * 0.5
            branch.material = trunkMat
            return branch
        }

        createBranch(0, 4, 3)
        createBranch(Math.PI * 2 / 3, 3.5, 2.5)
        createBranch(Math.PI * 4 / 3, 4.5, 2.5)

        // Canopy (IcoSpheres for geometric look)
        const createCanopy = (pos: BABYLON.Vector3, scale: number) => {
            const mesh = BABYLON.MeshBuilder.CreateIcoSphere(
                'canopy',
                { radius: 1, subdivisions: 1 },
                scene
            )
            mesh.position = pos
            mesh.scaling = new BABYLON.Vector3(scale, scale, scale)
            mesh.material = leafMat
            return mesh
        }

        const leaves: BABYLON.Mesh[] = []
        leaves.push(createCanopy(new BABYLON.Vector3(0, 6.5, 0), 2.5))
        leaves.push(createCanopy(new BABYLON.Vector3(1.5, 5.5, 0.5), 1.8))
        leaves.push(createCanopy(new BABYLON.Vector3(-1.5, 5.8, -0.5), 1.9))
        leaves.push(createCanopy(new BABYLON.Vector3(0, 5.2, 1.5), 1.6))
        leaves.push(createCanopy(new BABYLON.Vector3(0.5, 7.5, -0.5), 1.5))

        // --- Particles (Fireflies) ---
        const particleSystem = new BABYLON.ParticleSystem("particles", 1000, scene)
        particleSystem.particleTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/flare.png", scene)
        particleSystem.emitter = new BABYLON.Vector3(0, 4, 0)
        particleSystem.minEmitBox = new BABYLON.Vector3(-10, -5, -10)
        particleSystem.maxEmitBox = new BABYLON.Vector3(10, 10, 10)

        particleSystem.color1 = new BABYLON.Color4(0, 1, 0.6, 1) // Neon green
        particleSystem.color2 = new BABYLON.Color4(0.6, 1, 0.8, 1)
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0)

        particleSystem.minSize = 0.05
        particleSystem.maxSize = 0.15
        particleSystem.minLifeTime = 2
        particleSystem.maxLifeTime = 5
        particleSystem.emitRate = 100
        particleSystem.gravity = new BABYLON.Vector3(0, 0.05, 0) // Float up
        particleSystem.start()

        // --- Animation Loop ---
        let time = 0
        scene.registerBeforeRender(() => {
            time += 0.005
            // Gentle tree sway
            const sway = Math.sin(time) * 0.02
            trunk.rotation.z = sway
            trunk.rotation.x = Math.cos(time * 0.8) * 0.02

            // Pulse leaves
            leaves.forEach((leaf, i) => {
                const scale = 1 + Math.sin(time * 2 + i) * 0.02
                leaf.scaling = new BABYLON.Vector3(leaf.scaling.x, scale * leaf.scaling.y, leaf.scaling.z)
            })
        })

        // Render
        engine.runRenderLoop(() => {
            scene.render()
        })

        // Resize
        const handleResize = () => engine.resize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            scene.dispose()
            engine.dispose()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full outline-none"
            style={{ touchAction: 'none' }}
        />
    )
}
