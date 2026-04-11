import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { PixelateFilter } from '@pixi/filter-pixelate';

import playerIdleUrl from '../../assets/lunar/player_idle.svg';
import playerWalk1Url from '../../assets/lunar/player_walk1.svg';
import playerWalk2Url from '../../assets/lunar/player_walk2.svg';
import npcIdleUrl from '../../assets/lunar/npc_idle.svg';
// @ts-ignore
import bgMusicUrl from '../../assets/lunar/videoplayback.mp3';

const DIALOGUE_LINES = [
  "Nguyệt tới rồi hả",
  "Đêm nay trăng đẹp ha, Nguyệt đứng ngắm với Hàn xíu nha...",
  "Uhm... Hàn có chuyện này muốn nói với Nguyệt",
  "Thật ra là...",
  "Hàn rất thích Nguyệt... Nguyệt có muốn làm bạn gái của Hàn không?",
];

export default function LunarConfession() {
  const [gameState, setGameState] = useState('START');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [noClickCount, setNoClickCount] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<'YES' | 'NO'>('YES');
  const selectedRef = useRef<'YES' | 'NO'>('YES');
  const dialogueIndexRef = useRef(0);
  const isTextFinishedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [acceptedText, setAcceptedText] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);
  const engineState = useRef('START'); // Synchronous Engine Tracking
  const keys = useRef({ left: false, right: false, space: false });
  const playerState = useRef({ x: 200, cameraX: 0 });

  useEffect(() => {
    dialogueIndexRef.current = dialogueIndex;
  }, [dialogueIndex]);

  useEffect(() => {
    if (gameState !== 'DIALOGUE' || dialogueIndex >= DIALOGUE_LINES.length) return;
    setDisplayedText("");
    isTextFinishedRef.current = false;
    let currentString = "";
    const targetString = DIALOGUE_LINES[dialogueIndex];
    let charIndex = 0;
    const typer = setInterval(() => {
      if (charIndex < targetString.length) {
        currentString += targetString.charAt(charIndex);
        setDisplayedText(currentString);
        charIndex++;
      } else {
        isTextFinishedRef.current = true;
        clearInterval(typer);
      }
    }, 50);
    return () => clearInterval(typer);
  }, [gameState, dialogueIndex]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new PIXI.Application({
      width: 1000,
      height: 500,
      backgroundColor: 0x07091B,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });
    canvasRef.current.appendChild(app.view as HTMLCanvasElement);

    const pixelFilter = new PixelateFilter(2.5);
    const gameContainer = new PIXI.Container();
    gameContainer.filters = [pixelFilter];
    app.stage.addChild(gameContainer);

    /* ====== VISUAL ENVIRONMENT ====== */
    const skyLayer = new PIXI.Graphics();
    const skyColors = [0x05061C, 0x090D2B, 0x161C4C, 0x2A296D, 0x4B3B8A, 0x7659A5, 0x987EB7];
    const bandHeight = 500 / skyColors.length;
    skyColors.forEach((color, i) => {
      skyLayer.beginFill(color);
      skyLayer.drawRect(-500, i * bandHeight, 6000, bandHeight * 2);
      skyLayer.endFill();
    });

    // Beautiful Shiny Stars
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * 5000 - 500;
      const y = Math.random() * 380;
      const isLarge = Math.random() > 0.92;
      const color = Math.random() > 0.7 ? 0xFFB7C5 : (Math.random() > 0.7 ? 0x93FFD8 : 0xFFFFFF); // Pink, Teal, White

      if (isLarge) {
        // Bright Inner core
        skyLayer.beginFill(0xFFFFFF, 1);
        skyLayer.drawCircle(x, y, 2);
        // Glowing auras
        skyLayer.beginFill(color, 0.5);
        skyLayer.drawCircle(x, y, 6);
        skyLayer.beginFill(color, 0.1);
        skyLayer.drawCircle(x, y, 14);
        skyLayer.endFill();
        // Shiny Cross Reflections
        skyLayer.beginFill(0xFFFFFF, 0.9);
        skyLayer.drawRect(x - 10, y - 0.5, 20, 1);
        skyLayer.drawRect(x - 0.5, y - 10, 1, 20);
        skyLayer.endFill();
      } else {
        skyLayer.beginFill(color, Math.random() * 0.8 + 0.2);
        skyLayer.drawRect(x, y, 2, 2);
        skyLayer.endFill();
      }
    }

    const drawCloud = (x: number, y: number, scale: number) => {
      skyLayer.beginFill(0x987EB7, 0.4);
      skyLayer.drawCircle(x, y, 40 * scale);
      skyLayer.drawCircle(x + 50 * scale, y - 10 * scale, 50 * scale);
      skyLayer.drawCircle(x + 100 * scale, y + 10 * scale, 40 * scale);
      skyLayer.beginFill(0xB5A4CD, 0.5);
      skyLayer.drawCircle(x + 20 * scale, y - 15 * scale, 30 * scale);
      skyLayer.drawCircle(x + 60 * scale, y - 30 * scale, 40 * scale);
      skyLayer.endFill();
    };
    for (let i = 0; i < 15; i++) {
      drawCloud(i * 300 + Math.random() * 100, Math.random() * 200 + 50, Math.random() * 0.5 + 0.5);
    }

    const moonLayer = new PIXI.Graphics();
    moonLayer.beginFill(0xFFF9E6);
    moonLayer.drawCircle(500, 200, 100);
    moonLayer.endFill();
    moonLayer.beginFill(0xE6D5BA, 0.8);
    moonLayer.drawCircle(460, 160, 20);
    moonLayer.drawCircle(550, 240, 15);
    moonLayer.drawCircle(490, 250, 10);
    moonLayer.drawCircle(530, 150, 30);
    moonLayer.endFill();

    const moonGlow = new PIXI.Graphics();
    moonGlow.beginFill(0xF4D1E1, 0.5);
    moonGlow.drawCircle(500, 200, 160);
    moonGlow.endFill();
    moonGlow.filters = [new PIXI.filters.BlurFilter(30)];

    const mountainsLayer = new PIXI.Graphics();
    mountainsLayer.beginFill(0x272251);
    // Soft, rounded hills
    for (let mx = -1000; mx < 5000; mx += 300) {
      const h = Math.random() * 80 + 100; // Random heights
      mountainsLayer.drawEllipse(mx, 460, h * 2.5, h); // Super wide radius
    }
    mountainsLayer.endFill();

    const forestLayer = new PIXI.Graphics();

    // Utility for drawing heavily detailed structured Pixel Canopy clusters!
    const drawStructuredCanopy = (cx: number, cy: number, radius: number, colorBase: number, colorHighlight: number) => {
      for (let dy = -radius; dy <= radius; dy += 4) {
        for (let dx = -radius; dx <= radius; dx += 4) {
          if (dx * dx + dy * dy <= radius * radius) {
            if (Math.random() > 0.25) {
              const c = (dy < -radius * 0.3 && Math.random() > 0.3) ? colorHighlight : colorBase;
              forestLayer.beginFill(c);
              forestLayer.drawRect(cx + dx + (Math.random() * 4), cy + dy + (Math.random() * 4), 6, 6);
              forestLayer.endFill();
            }
          }
        }
      }
    };

    for (let i = -100; i < 2000; i += 120) {
      forestLayer.beginFill(0x1B162E);
      forestLayer.drawPolygon([i - 5, 400, i + 5, 400, i + 2, 280, i - 2, 280]); // Tapered Main Trunk
      forestLayer.drawPolygon([i, 350, i - 25, 290, i - 20, 285]); // Left Branch Detail
      forestLayer.drawPolygon([i, 320, i + 30, 260, i + 25, 250]); // Right Branch Detail
      forestLayer.endFill();

      drawStructuredCanopy(i, 230, 60, 0xE8A0BA, 0xFFD1DC);
      drawStructuredCanopy(i - 40, 290, 45, 0xE8A0BA, 0xFFD1DC);
      drawStructuredCanopy(i + 40, 270, 45, 0xE8A0BA, 0xFFD1DC);
    }

    // High Density Detailed Meadow Grass (Now Dynamic Array!)
    const grassBlades: { x: number, h: number, color: number, isFlower: boolean, type: number }[] = [];
    for (let i = -500; i < 5500; i += 2) { // Extended map coverage
      if (Math.random() > 0.05) {
        grassBlades.push({
          x: i,
          h: Math.random() * 25 + 5,
          color: Math.random() > 0.4 ? 0x1E2B52 : 0x2A3D73, // Multi-tone
          isFlower: Math.random() > 0.92,
          type: Math.floor(Math.random() * 3)
        });
      }

      // Massive Fireflies 
      if (i % 64 === 0 && Math.random() > 0.2) {
        forestLayer.beginFill(0x93FFD8, 0.4);
        forestLayer.drawCircle(i, 380 + Math.random() * 20, 12);
        forestLayer.beginFill(0xFFFFFF, 0.9);
        forestLayer.drawCircle(i, 380, 4);
        forestLayer.endFill();
      }
    }

    const groundLayer = new PIXI.Graphics();
    groundLayer.beginFill(0x0C1024);
    groundLayer.drawRect(-500, 400, 6000, 150);
    groundLayer.endFill();

    /* ====== DYNAMIC PARTICLES ====== */
    const particleLayer = new PIXI.Graphics();
    const particles = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * 4000,
      y: Math.random() * 500,
      speed: Math.random() * 1.5 + 0.5,
      wobble: Math.random() * Math.PI * 2,
      size: Math.random() * 3 + 2,
      color: Math.random() > 0.5 ? 0xFFB7C5 : 0xFFD1DC
    }));

    const shootingStars = Array.from({ length: 4 }).map(() => ({
      x: Math.random() * 4000,
      y: Math.random() * 200 - 100,
      speed: Math.random() * 15 + 15, // Extremely fast
      active: Math.random() > 0.5,
      delay: Math.random() * 200
    }));

    /* ====== NATIVE SVG ASSET LOADING ====== */
    const npc = PIXI.Sprite.from(npcIdleUrl);
    npc.anchor.set(0.5, 1); // Perfect bottom alignment for physics tracking
    npc.scale.set(1.0);
    npc.x = 3500;
    npc.scale.x = -1.0;

    const dynamicGrassLayer = new PIXI.Graphics();
    const activeHearts: { x: number, y: number, speed: number, wobble: number, size: number }[] = [];

    // Player Animation Container
    const playerContainer = new PIXI.Container();
    const pIdle = PIXI.Sprite.from(playerIdleUrl);
    const pWalk1 = PIXI.Sprite.from(playerWalk1Url);
    const pWalk2 = PIXI.Sprite.from(playerWalk2Url);

    // Setup scaling and anchors globally for all frames
    [pIdle, pWalk1, pWalk2].forEach(sprite => {
      sprite.anchor.set(0.5, 1);
      sprite.scale.set(1.0);
      sprite.visible = false;
      playerContainer.addChild(sprite);
    });
    pIdle.visible = true; // Default

    gameContainer.addChild(skyLayer, moonGlow, moonLayer, mountainsLayer, forestLayer, dynamicGrassLayer, particleLayer, groundLayer, npc, playerContainer);

    /* ====== ENGINE LOGIC ====== */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        keys.current.left = true;
        if (engineState.current === 'DIALOGUE' && dialogueIndexRef.current === DIALOGUE_LINES.length - 1 && isTextFinishedRef.current) {
          selectedRef.current = 'YES';
          setSelectedChoice('YES');
        }
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        keys.current.right = true;
        if (engineState.current === 'DIALOGUE' && dialogueIndexRef.current === DIALOGUE_LINES.length - 1 && isTextFinishedRef.current) {
          selectedRef.current = 'NO';
          setSelectedChoice('NO');
        }
      }
      if (e.code === 'Space') {
        e.preventDefault();
        const current = engineState.current;
        if (current === 'PROMPT') {
          engineState.current = 'DIALOGUE';
          setGameState('DIALOGUE');
        } else if (current === 'DIALOGUE') {
          if (dialogueIndexRef.current === DIALOGUE_LINES.length - 1 && isTextFinishedRef.current) {
            // Confirm selection
            if (selectedRef.current === 'YES') {
              engineState.current = 'ACCEPTED';
              setGameState('ACCEPTED');
            } else {
              setNoClickCount(c => c + 1);
            }
          } else {
            setDialogueIndex(prev => prev < DIALOGUE_LINES.length - 1 ? prev + 1 : prev);
          }
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.current.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.current.right = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let time = 0;
    const ticker = (delta: number) => {
      // Delta Clamp: Prevent massive physics jumps (teleporting) if the frame drops during React DOM renders!
      const safeDelta = Math.min(delta, 2.5);

      const current = engineState.current;
      let speed = 6.5;
      let isMoving = false;
      const state = playerState.current;

      if (keys.current.left && (current === 'PLAYING' || current === 'PROMPT')) {
        state.x -= speed * safeDelta;
        isMoving = true;
      }
      if (keys.current.right && (current === 'PLAYING' || current === 'PROMPT')) {
        state.x += speed * safeDelta;
        isMoving = true;
      }

      if (state.x < 100) state.x = 100;
      if (state.x > 5000) state.x = 5000; // Unlocked the invisible wall past the NPC

      // Flat ground physics
      let groundY = 400;

      let nextState = current;
      const isAtNPC = Math.abs(state.x - 3500) < 150; // Dynamic Proximity Prompt
      if (isAtNPC && current === 'PLAYING') nextState = 'PROMPT';
      if (!isAtNPC && current === 'PROMPT') nextState = 'PLAYING';

      state.cameraX += (state.x - 500 - state.cameraX) * 0.08;

      skyLayer.x = -state.cameraX * 0.01;
      moonGlow.x = -state.cameraX * 0.03;
      moonLayer.x = -state.cameraX * 0.03;
      mountainsLayer.x = -state.cameraX * 0.15;
      forestLayer.x = -state.cameraX;

      npc.x = 3500 - state.cameraX;
      npc.y = 400;

      time += safeDelta * 0.1;

      particleLayer.clear();
      particles.forEach(p => {
        p.y += p.speed * safeDelta;
        p.x += Math.sin(time + p.wobble) * 2;
        if (p.y > 500) { p.y = -10; p.x = Math.random() * 4000; }
        const screenX = p.x - state.cameraX;
        if (screenX > -50 && screenX < 1050) {
          particleLayer.beginFill(p.color, 0.8);
          particleLayer.drawEllipse(screenX, p.y, p.size, p.size / 2);
          particleLayer.endFill();
        }
      });

      if (current === 'ACCEPTED') {
        if (Math.random() > 0.85) {
          activeHearts.push({
            x: 3500 + (Math.random() * 800 - 400),
            y: 600,
            speed: Math.random() * 3 + 1,
            wobble: Math.random() * Math.PI * 2,
            size: Math.random() * 8 + 6
          });
        }
        activeHearts.forEach(h => {
          h.y -= h.speed * safeDelta;
          h.x += Math.sin(time + h.wobble) * 2;
          const sx = h.x - state.cameraX;
          if (h.y > -50) {
            particleLayer.beginFill(0xFF4B72, 0.9);
            particleLayer.drawCircle(sx - h.size / 2.5, h.y - h.size / 4, h.size / 2.2);
            particleLayer.drawCircle(sx + h.size / 2.5, h.y - h.size / 4, h.size / 2.2);
            particleLayer.drawPolygon([sx - h.size * 0.9, h.y - h.size * 0.1, sx + h.size * 0.9, h.y - h.size * 0.1, sx, h.y + h.size]);
            particleLayer.endFill();
          }
        });
      }

      // Compute Dynamic Wind Grass
      dynamicGrassLayer.clear();
      const curPx = -state.cameraX;
      grassBlades.forEach(blade => {
        const sx = blade.x + curPx;
        // Cull offscreen grass
        if (sx > -20 && sx < 1020) {
          // Wave propagation logic (Wind moves right to left across X)
          const swayAmt = Math.sin(time * 1.5 + (blade.x * 0.05)) * (blade.h * 0.4);

          dynamicGrassLayer.beginFill(blade.color);
          if (blade.type === 0) {
            // Standard tall blade
            dynamicGrassLayer.drawPolygon([sx, 400, sx + 3, 400, sx + 3 + swayAmt, 400 - blade.h, sx + swayAmt, 400 - blade.h]);
          } else if (blade.type === 1) {
            // Thin curved blade
            dynamicGrassLayer.drawPolygon([sx, 400, sx + 2, 400, sx + 1 + (swayAmt * 1.2), 400 - blade.h, sx + (swayAmt * 1.2), 400 - blade.h]);
          } else {
            // Double tuft
            dynamicGrassLayer.drawPolygon([sx - 2, 400, sx + 4, 400, sx + 2 + swayAmt, 400 - blade.h, sx - 1 + swayAmt, 400 - blade.h]);
          }
          dynamicGrassLayer.endFill();

          if (blade.isFlower) {
            dynamicGrassLayer.beginFill(0xFFD1DC);
            dynamicGrassLayer.drawRect(sx + swayAmt, 400 - blade.h - 3, 3, 3);
            dynamicGrassLayer.endFill();
          }
        }
      });

      // Compute Shooting Stars!
      shootingStars.forEach(s => {
        if (s.active) {
          s.x -= s.speed * safeDelta;
          s.y += (s.speed * 0.4) * safeDelta; // 25 degree downward angle
          const screenX = s.x - state.cameraX * 0.01; // Parallax to sky
          if (screenX > -100 && screenX < 1100 && s.y < 500) {
            // Draw the glowing tail
            particleLayer.beginFill(0xFFFFFF, 0.8);
            particleLayer.drawPolygon([screenX, s.y, screenX + 60, s.y - 24, screenX + 60, s.y - 20]);
            particleLayer.endFill();
            particleLayer.beginFill(0x93FFD8, 0.4); // Teal trail glow
            particleLayer.drawPolygon([screenX, s.y - 2, screenX + 100, s.y - 40, screenX + 100, s.y - 30]);
            particleLayer.endFill();
          }
          if (s.y > 500 || screenX < -200) {
            s.active = false;
            s.delay = 100 + Math.random() * 300;
          }
        } else {
          s.delay -= safeDelta;
          if (s.delay <= 0) {
            s.active = true;
            s.x = Math.random() * 4000 + state.cameraX;
            s.y = Math.random() * 150 - 50;
          }
        }
      });

      // Translate Character Logic
      playerContainer.x = state.x - state.cameraX;
      playerContainer.y = groundY;

      // Flip Sprites
      if (keys.current.left) playerContainer.scale.x = -1;
      if (keys.current.right) playerContainer.scale.x = 1;

      // Toggle Animated Vector Frames smoothly
      if (isMoving) {
        const animSpeed = 1.0;
        const frameIndex = Math.floor(time * animSpeed) % 4; // Native 4-frame cycle
        pIdle.visible = (frameIndex === 0 || frameIndex === 2);
        pWalk1.visible = (frameIndex === 1);
        pWalk2.visible = (frameIndex === 3);
      } else {
        pIdle.visible = true;
        pWalk1.visible = false;
        pWalk2.visible = false;
      }

      if (nextState !== current) {
        engineState.current = nextState;
        setGameState(nextState);
      }
    };
    app.ticker.add(ticker);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      app.destroy(true, true);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'ACCEPTED') return;
    const fullText = " hẹn hò với Hàn nha...";
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setAcceptedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [gameState]);

  return (
    <div className="w-screen h-screen bg-[#05061C] flex justify-center items-center overflow-hidden relative" style={{ fontFamily: '"Press Start 2P", monospace' }}>
      <div
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          imageRendering: 'pixelated'
        }}
      >
        <style>{`
             canvas { max-width: 100vw; max-height: 100vh; object-fit: contain; }
             @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          `}</style>
        <audio ref={audioRef} src={bgMusicUrl} loop />
      </div>

      {gameState === 'START' && (
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 bg-[#05061C]/80 backdrop-blur-md transition-opacity duration-1000">
          <h1 className="text-[4rem] font-bold tracking-[0.05em] mb-4 text-[#FFF9E6] drop-shadow-[0_0_20px_#F4D1E1]">Hi Nguyệt, chơi game khum?</h1>
          <p className="text-[#FFB7C5] animate-pulse cursor-pointer hover:scale-110 transition-transform mt-10 text-xl"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
              }
              engineState.current = 'PLAYING';
              setGameState('PLAYING');
            }}>
            [ Bấm vào đây để chơi nè ]
          </p>
        </div>
      )}

      {gameState === 'PROMPT' && (
        <div className="absolute top-[35%] text-center animate-bounce z-10 pointer-events-none drop-shadow-[0_0_15px_#FFB7C5]">
          <div className="text-[#FFB7C5] text-6xl mb-4">♥</div>
          <p className="text-white text-sm bg-[#161C4C]/90 border-2 border-white px-4 py-2 rounded">SPACE</p>
        </div>
      )}

      {gameState === 'DIALOGUE' && (
        <div className="absolute bottom-[10%] w-[90%] max-w-4xl bg-[#090D2B]/95 border-b-4 border-t-4 border-[#F4D1E1] p-8 rounded-sm text-white shadow-[0_0_50px_rgba(244,209,225,0.2)] z-20">
          <div className="text-[#93C5FD] text-xl tracking-[0.2em] mb-6 drop-shadow-[0_0_8px_#93C5FD]">- Korea boi -</div>
          <p className="text-lg leading-loose tracking-widest min-h-[90px] text-[#FFF9E6]">
            {displayedText}
            {displayedText === DIALOGUE_LINES[dialogueIndex] && dialogueIndex < DIALOGUE_LINES.length - 1 && (
              <span className="animate-pulse inline-block ml-4 text-[#FFB7C5]">▼</span>
            )}
          </p>
        </div>
      )}

      {gameState === 'DIALOGUE' && dialogueIndex === DIALOGUE_LINES.length - 1 && displayedText === DIALOGUE_LINES[dialogueIndex] && (
        <div className="absolute bottom-[25%] flex items-center justify-center space-x-12 z-30 w-full animate-fade-in">
          <button
            onClick={() => { engineState.current = 'ACCEPTED'; setGameState('ACCEPTED'); }}
            className={`text-[#05061C] font-bold py-4 px-10 rounded-full border-4 transition-all origin-center shadow-[0_0_30px_#FFB7C5] ${selectedChoice === 'YES' ? 'bg-white border-[#FFB7C5] scale-110' : 'bg-[#FFB7C5] border-transparent'}`}
            style={{ transform: `scale(${(selectedChoice === 'YES' ? 1.1 : 1.0) + noClickCount * 0.15})` }}
          >
            YES
          </button>
          <button
            onClick={() => setNoClickCount(c => c + 1)}
            className={`font-bold py-3 px-8 rounded-full border-4 transition-all ${selectedChoice === 'NO' ? 'bg-[#FFB7C5] text-[#05061C] border-white scale-110 shadow-[0_0_20px_#FFB7C5]' : 'bg-[#161C4C] text-[#FFB7C5] border-[#FFB7C5]'}`}
          >
            {["NO", "Are you sure?", "Are you sure sure?", "Really?", "Don't do it :(", "I'm gonna cry 😭", "Please say yes!!!", "Stop it :(", "My heart is breaking!"][Math.min(noClickCount, 8)]}
          </button>
        </div>
      )}

      {noClickCount > 0 && gameState === 'DIALOGUE' && (
        <div className="absolute top-[30%] right-[25%] text-6xl animate-bounce z-10 pointer-events-none drop-shadow-[0_0_15px_#FFB7C5]">
          🥺
        </div>
      )}

      {(gameState === 'DIALOGUE' || gameState === 'ACCEPTED') && dialogueIndex === DIALOGUE_LINES.length - 1 && (
        <div className="absolute inset-0 bg-[#FFF9E6] animate-[pulse_4s_ease-in-out_infinite] opacity-20 pointer-events-none mix-blend-screen z-0" />
      )}

      {gameState === 'ACCEPTED' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 bg-[#FFF9E6]/60 backdrop-blur-sm transition-all duration-1000">
          <h5 className="text-black text-2xl md:text-4xl lg:text-[4rem] text-center font-bold tracking-[0.1em] drop-shadow-[0_0_60px_#FFB7C5]">
            <span className="text-[#FFB7C5]">Nguyệt</span>{acceptedText}
          </h5>
        </div>
      )}
    </div>
  );
}
