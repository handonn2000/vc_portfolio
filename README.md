# 3D Interactive Portfolio

A modern, high-performance personal portfolio website featuring a custom 3D particle globe, built with React, Three.js, and Tailwind CSS.

## 🚀 Features

- **Interactive 3D Globe**: A custom-built particle globe using `three.js` and `@react-three/fiber`.
    - **GPU-Accelerated**: Particle animations (repulsion, wave effects) run entirely on the GPU via custom Vertex Shaders for 60FPS+ performance.
    - **Interactive**: Mouse hover effects with physics-based particle scattering.
- **Modern UI**: Sleek, dark-themed design with glassmorphism effects using Tailwind CSS.
- **Responsive**: Fully responsive layout for all device sizes.
- **Animations**: Smooth page transitions and UI animations using `framer-motion` and `GSAP`.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **Deployment**: [Firebase Hosting](https://firebase.google.com/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Build & Deploy

To build the project for production:

```bash
npm run build
```

To deploy to Firebase (if configured):

```bash
npx firebase deploy
```

## 🎨 Performance Optimizations

The 3D Globe scene has been heavily optimized:
- **InstancedMesh**: Renders thousands of particles with a single draw call.
- **Custom Shaders**: All particle animations (repulsion, waves) are calculated in a Vertex Shader, removing CPU overhead.
- **Texture Mapping**: Particles are generated based on an Earth texture map for accurate geography.
