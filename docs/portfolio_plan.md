# Portfolio Implementation Plan

## Goal Description
Build a responsive, interactive web portfolio for **Han Do-Nguyen-Nhat** (Software Engineer - Backend) based on the analyzed resume. The portfolio will feature a 3D tree animation using Babylon.js and will be deployed via Firebase (initially local).

## Tech Stack
-   **Frontend Framework**: React (Vite) + TypeScript
    -   *Reason*: You have experience with React and TypeScript. Vite offers a fast development experience.
-   **Styling**: Tailwind CSS
    -   *Reason*: Ensures rapid development of responsive, mobile-friendly designs.
-   **3D Graphics**: Babylon.js
    -   *Reason*: Powerful engine for the requested tree animation.
-   **Deployment**: Firebase Hosting
    -   *Reason*: Easy static hosting, supports local emulation for testing.

## Content Strategy (Based on Resume)

### 1. Hero Section
-   **Name**: Han Do-Nguyen-Nhat
-   **Title**: Software Engineer - Backend
-   **Tagline**: Experienced in Microservices, Spring Boot, and Cloud-Native Technologies.
-   **Call to Action**: "View My Work" or "Contact Me"

### 2. About Me
-   Brief professional summary highlighting 3+ years of experience in Backend development, working with international clients (Dubai, UK), and expertise in Java/Spring ecosystems.

### 3. Skills
-   **Languages**: Java, Python, Javascript, Typescript, SQL, MQL, HTML, CSS
-   **Databases**: MySQL, PostgresSQL, CockroachDB, MongoDB, Redis
-   **Frameworks**: Spring Boot, Spring Cloud, Kafka, Keycloak, ReactJs, Android Studio
-   **Cloud & DevOps**: AWS (EC2, ECS, S3, Lambda), Docker, CI/CD (Jenkins/GitLab CI - implied from "System design" and "Microservices")

### 4. Experience
-   **NAB Innovation Centre Vietnam** (Sep 2024 - Present): Software Engineer. Contributing to the Financial Crime Workbench – Case Management platform for transaction monitoring and customer due diligence. Designed and implemented APIs for seamless microservices integration using Java 17, Spring Boot, and PostgreSQL.
-   **Mondia Digital** (Oct 2023 - Sep 2024): Backend Engineer. Migrated Subscription Aggregator, designed stock management.
-   **Nash Squared** (Sep 2021 - Aug 2023): Backend Engineer. Built E-commerce Aggregator, optimized batch processing.
-   **GB Smart Innovation JSC** (Aug 2020 - Dec 2021): Mobile Developer. Android app for employee management.

### 5. Projects
-   **Microservices 101**: Research project on Spring Cloud, Kafka.
-   **DSA 101**: Learning Data Structures & Algorithms in Python.
-   **Graduation Thesis**: NFT Marketplace for Charity.

### 6. Education & Certifications
-   **University of Economics and Law**: Bachelor of Information Systems.
-   **Certifications**: SAP S/4HANA, Blockchain (Funix), LinkedIn skills.

## Babylon.js Feature: "The Growing Tree"
-   **Concept**: A 3D tree that represents your growth as an engineer.
-   **Animation**:
    -   **Idle**: Gentle swaying of branches.
    -   **Falling Leaves**: Leaves occasionally fall, symbolizing the passage of time or "letting go" of old code/bugs.
    -   **Interaction**: Mouse movement creates a "wind" effect.
-   **Implementation**:
    -   Use `BABYLON.ParticleSystem` for falling leaves.
    -   Procedural tree generation or a simple low-poly model.

## Responsiveness Plan
-   **Mobile**: Single column layout. Hamburger menu for navigation.
-   **Tablet/Desktop**: Multi-column layout (e.g., Experience on left, Skills on right).
-   **Tailwind Classes**: Use `md:`, `lg:` prefixes for breakpoints.

## Firebase Deployment (Local First)
1.  **Install CLI**: `npm install -g firebase-tools`
2.  **Login**: `firebase login`
3.  **Init**: `firebase init hosting` (Select "Use an existing project" or "Create a new project", set public directory to `dist`).
4.  **Build**: `npm run build`
5.  **Emulate**: `firebase emulators:start` to test locally at `localhost:5000`.

## Next Steps
1.  Initialize Vite project: `npm create vite@latest portfolio -- --template react-ts`
2.  Install dependencies: `npm install babylonjs babylonjs-loaders firebase`
3.  Setup Tailwind CSS.
4.  Implement components iteratively.
