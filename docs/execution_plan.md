# Portfolio Execution Plan

This document outlines the step-by-step execution plan using specific prompts to build the portfolio.

## Phase 1: Project Initialization & Foundation
**Goal**: Set up the environment, install dependencies, and configure global styles.

*   **Prompt 1.1 (Setup)**: "Initialize a new Vite project named `portfolio` using the React + TypeScript template. Run `npm install`."
*   **Prompt 1.2 (Dependencies)**: "Install the necessary dependencies: `babylonjs`, `babylonjs-loaders`, `firebase`, and `lucide-react` (for icons)."
*   **Prompt 1.3 (Tailwind)**: "Initialize and configure Tailwind CSS. Create a `tailwind.config.js` file that includes a custom color palette inspired by nature (greens, browns) to match the tree theme. Update `index.css` with `@tailwind` directives."
*   **Prompt 1.4 (Cleanup)**: "Clean up the default Vite boilerplate. Remove `App.css`, clear `App.tsx`, and ensure the application renders a blank white page with a simple 'Hello World' text to verify setup."

## Phase 2: Core Layout & Component Structure
**Goal**: Build the responsive shell of the application.

*   **Prompt 2.1 (Layout)**: "Create a `Layout` component that wraps the entire application. It should include a `Navbar` at the top and a `Footer` at the bottom. The main content area should be responsive."
*   **Prompt 2.2 (Navbar)**: "Implement the `Navbar` component. It should be fixed at the top, transparent with a blur effect (`backdrop-blur`). Include the name 'Han Do-Nguyen-Nhat' on the left and links (About, Skills, Experience, Projects) on the right. Use a hamburger menu for mobile screens."
*   **Prompt 2.3 (Section Wrapper)**: "Create a reusable `Section` component. This component should handle consistent padding, max-width constraints, and include a title prop to render section headers uniformly."

## Phase 3: Content Implementation (Static)
**Goal**: Populate the site with the resume content.

*   **Prompt 3.1 (Hero)**: "Build the `Hero` section. It should take up the full viewport height (`h-screen`). Display the name, title 'Software Engineer - Backend', and the tagline. Add a 'View My Work' button. Leave a placeholder `div` with an ID of `canvas-container` for the 3D scene."
*   **Prompt 3.2 (About)**: "Build the `About` section using the resume summary. Highlight the 3+ years of experience and international client work."
*   **Prompt 3.3 (Skills)**: "Build the `Skills` section. Group skills into categories (Languages, Databases, Frameworks, Cloud/DevOps) as defined in the plan. Display them as clean, modern tags or cards."
*   **Prompt 3.4 (Experience)**: "Build the `Experience` section. Use a vertical timeline or a clean list layout. For each role (Mondia Digital, Nash Squared, GB Smart), display the title, company, date, and bullet points of achievements."
*   **Prompt 3.5 (Projects)**: "Build the `Projects` section. Create cards for 'Microservices 101', 'DSA 101', and the 'Graduation Thesis'. Include links to GitHub/Drive where applicable."

## Phase 4: The "Growing Tree" (Babylon.js)
**Goal**: Implement the interactive 3D feature.

*   **Prompt 4.1 (Scene Setup)**: "Create a `SceneComponent` using Babylon.js. Initialize the engine, scene, camera (ArcRotateCamera), and hemispheric light. Mount this component into the `Hero` section's placeholder."
*   **Prompt 4.2 (Tree Model)**: "Implement a procedural tree generation function or load a simple low-poly tree model. Place it in the center of the scene."
*   **Prompt 4.3 (Falling Leaves)**: "Create a particle system for falling leaves. The particles should emit from the tree canopy and slowly drift down to the ground, fading out. Use a simple leaf texture or a green plane."
*   **Prompt 4.4 (Interactivity)**: "Add mouse interaction. When the user moves the mouse, apply a slight wind force to the particles or rotate the camera slightly to give a parallax effect."

## Phase 5: Polish & Deployment
**Goal**: Finalize the design and deploy to Firebase.

*   **Prompt 5.1 (Responsiveness)**: "Review all sections on mobile, tablet, and desktop sizes. Fix any overflow issues or padding inconsistencies. Ensure the text is readable on all devices."
*   **Prompt 5.2 (Firebase Init)**: "Initialize Firebase Hosting in the project. Create a `firebase.json` configured for a single-page app (rewrites to `index.html`)."
*   **Prompt 5.3 (Build & Deploy)**: "Run the build script (`npm run build`). Verify the `dist` folder is created. (Instruction to user: Run `firebase deploy` to publish)."
