# Product Requirement Document: "The Lunar Walk" Confession

## 1. Project Overview
"The Lunar Walk" is a minimalist, pixel-art web experience designed for a personal confession. The theme centers around the Moon (**Nguyệt**), representing the recipient. The experience is a 2D side-scrolling "walking simulator" that culminates in a romantic dialogue.

## 2. Visual Style & Art Direction
- **Style:** 8-bit / 16-bit Pixel Art.
- **Color Palette:** 
    - **Primary:** Midnight Blue (#0A0E27), Indigo (#1B1E3F).
    - **Accents:** Silver/White for Moonlight (#E0E0E0), Soft Pink/Purple for flower sparks.
- **Key Visual Elements:**
    - **The Central Moon:** A large, detailed, glowing pixel moon that remains fixed in the center of the sky.
    - **Parallax Background:** Multiple layers (Forest, Hills, Clouds) moving at different speeds to create depth.
    - **Weather/Particles:** Subtle falling pixel petals or "moonlight dust."

## 3. Core Mechanics
- **Movement:** 
    - `Left/Right Arrow Keys` or `A/D` to move the female character.
    - Animation transitions: `idle`, `walk_right`, `walk_left`.
- **Level Progression:**
    - The character starts on the far left.
    - As she walks right, the environment transitions seamlessly:
        - **Scene 1:** Dark Forest (Quiet).
        - **Scene 2:** Glowing Flower Field (Music begins).
        - **Scene 3:** The Lunar Summit (Final destination).
- **Interaction:**
    - `Space Bar` to initiate and progress through dialogue when near the male character.

## 4. User Flow
1. **Entry:** A simple start screen: "Press any key to begin the journey to Nguyệt."
2. **The Walk:** The user controls the character walking through the three scenes.
3. **The Meeting:** The female character reaches the male character waiting on a hill under the moon. 
4. **The Dialogue:** A "Proximity Prompt" (e.g., a heart icon) appears. Pressing Space opens the dialogue box.
5. **The Final Message:** The sequence of text leads to the final confession message.
6. **Closing:** The screen fades to a beautiful static "End Card" of the two characters looking at the moon together.

## 5. Functional Requirements
- **RPG Text Box System:** Support for character-by-character typing effect, name tags, and progression on click/space.
- **Audio:** 
    - Ambient night sounds (crickets, wind) for Scene 1.
    - Soft, emotional Lo-fi/Piano track for Scene 2 & 3.
- **Responsive Design:** Must work in a browser window, centering the pixel canvas.

## 6. Content (Placeholder)
- **Character 1 (Female):** Representing her.
- **Character 2 (Male):** Representing you.
- **Dialogue Start:** "Nguyệt... you're here. I've been waiting for you under this moon."
