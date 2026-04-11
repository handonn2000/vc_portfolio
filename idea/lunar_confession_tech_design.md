# Technical Design Document: "The Lunar Walk" Confession (PixiJS Edition)

## 1. Architecture & Tech Stack

*   **Framework:** React (integrated into the existing Vite-based portfolio).
*   **Rendering Engine:** **PixiJS** via `@pixi/react`. PixiJS is the fastest WebGL-accelerated 2D renderer available. It natively integrates with React using declarative syntax, drastically reducing the boilerplate required by vanilla HTML5 Canvas.
*   **Aesthetic Driver:** `@pixi/filter-pixelate`. We will use this to automatically down-sample high-fidelity programmatically drawn shapes into authentic retro pixel art. 
*   **Styling for UI:** Tailwind CSS for rendering the RPG dialogue overlay and menus on top of the WebGL canvas.

## 2. The PixiJS Pixelation Workflow (Core Design Paradigm)

Instead of manually mapping out individual pixels in 2D arrays, we will draw smooth, beautiful vector graphics and glowing effects using Pixi's `Graphics` API. We then apply a global `PixelateFilter` over the scene container to achieve the required 8-bit/16-bit aesthetic automatically. 

This approach **prioritizes design** because you can focus on color theory, glowing auras, and beautiful geometry, and let the renderer handle the pixelation.

### 2.1 Drawing Programmatically
```tsx
import { Graphics, Container, withFilters } from '@pixi/react';
import { PixelateFilter } from '@pixi/filter-pixelate';

// 1. Create a filter instance
const pixelFilter = new PixelateFilter(4); // 4x4 pixel blocks

// 2. Wrap the scene
const FiltersContainer = withFilters(Container, {
  pixelate: pixelFilter
});
```

### 2.2 Designing the Moon
A glowing, magical moon is easily rendered programmatically without external assets:
```tsx
const DrawMoon = useCallback((g) => {
  g.clear();
  // Base Moon
  g.beginFill(0xE0E0E0);
  g.drawCircle(x, y, 100);
  g.endFill();
  
  // Magical Glow (Outer transparent circle)
  g.beginFill(0x1B1E3F, 0.4);
  g.drawCircle(x, y, 120);
  g.endFill();
}, []);

// Usage:
<Graphics draw={DrawMoon} />
```

## 3. Game Loop & State Management

### 3.1 Smooth Declarative Parallax
In `@pixi/react`, we avoid manual `requestAnimationFrame` loops. Instead, we manage positional state in mutable refs and update them inside Pixi's native `useTick` hook.

```tsx
import { useTick } from '@pixi/react';

const ParallaxLayer = () => {
    let cameraX = useRef(0);
    
    useTick((delta) => {
        // Update physics, movement, and camera here
        cameraX.current += (targetCameraX - cameraX.current) * 0.1 * delta;
    });

    return (
       <Container x={-cameraX.current * 0.5}>
         {/* Mountains and Hills Graphics */}
       </Container>
    );
}
```

### 3.2 React-Isolated UI Overlay
We keep game-logic separated from the React DOM tree.
*   **WebGL Canvas Layer:** Background, Characters, Particles (Managed by Pixi).
*   **DOM Layer:** Start Screen, Spacebar Prompts, Dialogue Box (Managed by Tailwind React components). 

We will use standard `useState` to toggle the RPG text box overlay on/off based on player coordinates tracked within the Pixi loop.

## 4. Functional Systems

### 4.1 Weather / Particle System (Falling Petals)
Because Pixi uses WebGL, we can render 1,000+ petals with zero lag. We can create an array of "Particle" objects in a `useRef` and iterate over them in `useTick` to update their X/Y offsets, utilizing `Math.sin()` to simulate wind.

### 4.2 Proximity & RPG Text System
When the player (`playerX`) mathematically approaches the destination/male character (`npcX`):
1.  **Stop Loop:** The `useTick` allows us to isolate movement physics conditionally (`if (!isDialogueMode) updateMovement()`).
2.  **RPG Text Box:** An `.absolute` positioned Tailwind component triggers on top of the `<Stage>`.
3.  **Typewriter Hook:** A standard React `useEffect` timeout hook splices the confession string character-by-character.

## 5. Directory & File Structure
```text
/src
  /pages
    /LunarConfession
       LunarConfession.tsx        // Main Wrapper & UI overlay logic
       /components
         PixiStage.tsx            // The <Stage> root component
         PlayerSprite.tsx         // Programmatically drawn character
         ParallaxBackground.tsx   // The Scrolling layers
         ParticleEmitter.tsx      // The floating petals
         DialogueOverlay.tsx      // Tailwind HTML text box overlay
```

## 6. Implementation Phasing Using PixiJS
*   **Phase 1:** Install dependencies (`pixi.js`, `@pixi/react`, `@pixi/filter-pixelate`).
*   **Phase 2:** Initialize `<Stage>` and apply the global `PixelateFilter`.
*   **Phase 3:** Write the `Graphics` drawing functions for the Moon, glowing fields, and the simple retro characters.
*   **Phase 4:** Implement `useTick` for keyboard listening (`A/D` or `Left/Right`) and scrolling the Parallax Containers.
*   **Phase 5:** Build the `ParticleEmitter` for the mystical petal-falling atmosphere.
*   **Phase 6:** Hook up the React DOM Dialogue Box and finalize the ending confession logic.
