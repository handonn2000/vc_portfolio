Build a "CCUS Global Projects" 3D interactive component using React, Tailwind CSS, Three.js, and React Three Fiber.

Libraries to use:
- three
- @react-three/fiber
- @react-three/drei
- framer-motion (for UI overlays)
- maath (for geometry math)

Visual Requirements:
1. Scene Setup: A clean, high-end industrial aesthetic. Background should be a subtle radial gradient (light grey #F5F5F5 to white).
2. The Globe: 
   - Create a sphere with a custom shader or matte material (color: #E0E0E0).
   - Apply a "dot matrix" or "wireframe" texture to the sphere to give it a technical feel, similar to the Heidelberg Materials design.
   - Add a subtle "Antigravity" floating animation (slow sine wave on the Y-axis) so the globe gently bobs up and down.
3. Markers (Project Locations):
   - Place glowing cylindrical markers at specific Lat/Long coordinates on the sphere surface.
   - Marker Color: Neon Green (#00DD39).
   - Markers should pulse opacity slightly.
   - Use these real coordinates for the data array:
     * Edmonton, Canada (53.5461, -113.4938)
     * Brevik, Norway (59.0533, 9.7027)
     * Padeswood, UK (53.15, -3.05)
     * Slite, Sweden (57.68, 18.79)
     * Mitchell, Indiana (38.73, -86.47)
4. Interactivity:
   - Allow the user to rotate the globe via drag (OrbitControls with enableZoom={false}).
   - When hovering a marker, pause the auto-rotation and show a tooltip with the location name.
5. Lighting:
   - Soft ambient light (intensity 0.5).
   - Directional light from top-left to cast soft shadows.

Technical Constraints:
- Use functional components and hooks.
- Convert Lat/Long to Vector3 positions on the sphere radius.
- Ensure the component is responsive (Canvas takes 100% width/height of container).