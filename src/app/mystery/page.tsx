"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixBackground } from '@/components/MatrixEffects';

const MysteryPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    { 
      id: 'lorenz', 
      name: 'Lorenz Attractor', 
      description: 'Chaotic system',
      equation: 'ẋ = σ(y - x)\nẏ = x(ρ - z) - y\nż = xy - βz'
    },
    { 
      id: 'lissajous', 
      name: 'Lissajous Curves', 
      description: 'Parametric oscillations',
      equation: 'x = A·sin(a·t + δ)\ny = B·sin(b·t)'
    },
    { 
      id: 'epicycloid', 
      name: 'Epicycloid', 
      description: 'Rolling circle on circle',
      equation: 'x = (R+r)·cos(t) - r·cos((R+r)/r·t)\ny = (R+r)·sin(t) - r·sin((R+r)/r·t)'
    },
    { 
      id: 'butterfly', 
      name: 'Butterfly Curve', 
      description: 'Polar equation',
      equation: 'r = e^cos(θ) - 2·cos(4θ) + sin⁵(θ/12)'
    },
    { 
      id: 'heart', 
      name: 'Heart Curve', 
      description: 'Parametric heart',
      equation: 'x = 16·sin³(t)\ny = 13·cos(t) - 5·cos(2t) - 2·cos(3t) - cos(4t)'
    },
    { 
      id: 'rose', 
      name: 'Rose Curves', 
      description: 'Polar roses',
      equation: 'r = a·cos(k·θ) or r = a·sin(k·θ)'
    },
    { 
      id: 'spiral', 
      name: 'Archimedean Spiral', 
      description: 'Classic spiral',
      equation: 'r = a + b·θ\nx = r·cos(θ), y = r·sin(θ)'
    },
    { 
      id: 'fourier', 
      name: 'Fourier Series', 
      description: 'Sum of sine waves',
      equation: 'f(x) = Σ(aₙ·sin(nx) + bₙ·cos(nx))'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const current = sectionRefs.current.findIndex((ref) => {
        if (!ref) return false;
        const rect = ref.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });
      if (current !== -1 && current !== currentSection) {
        setCurrentSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setCurrentSection(index);
  };

  return (
    <>
      <MatrixBackground />
      <div className="relative z-10 min-h-screen bg-black">
        {/* Navigation Sidebar */}
        <motion.div
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-black/80 backdrop-blur-sm border border-green-700/50 rounded-lg p-4 space-y-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`block w-full text-left px-3 py-2 rounded text-sm font-mono transition-all ${
                  currentSection === index
                    ? 'bg-green-500/30 text-green-400 border border-green-500'
                    : 'text-green-300/70 hover:text-green-400 hover:bg-green-500/10'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => setShowControls(!showControls)}
            className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors matrix-font text-sm"
          >
            {showControls ? 'Hide' : 'Show'} Controls
          </button>
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 bg-black/90 backdrop-blur-sm border border-green-700/50 rounded-lg p-4 space-y-4 min-w-[200px]"
              >
                <div>
                  <label className="block text-xs text-green-400 mb-2 font-mono">Speed</label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs text-green-300 font-mono">{speed.toFixed(1)}x</span>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-full px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 rounded hover:bg-green-500/30 transition-colors matrix-font text-sm"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Section Indicator */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex gap-2 bg-black/80 backdrop-blur-sm border border-green-700/50 rounded-lg p-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSection === index
                    ? 'bg-green-400 w-8'
                    : 'bg-green-700 hover:bg-green-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Visualizations */}
        <div ref={(el) => { sectionRefs.current[0] = el; }}>
          <LorenzVisualization
            isActive={currentSection === 0}
            speed={speed}
            isPlaying={isPlaying}
            equation={sections[0].equation}
          />
        </div>
        <div ref={(el) => { sectionRefs.current[1] = el; }}>
          <LissajousVisualization
            isActive={currentSection === 1}
            speed={speed}
            isPlaying={isPlaying}
            equation={sections[1].equation}
          />
        </div>
        <div ref={(el) => { sectionRefs.current[2] = el; }}>
          <EpicycloidVisualization
            isActive={currentSection === 2}
            speed={speed}
            isPlaying={isPlaying}
            equation={sections[2].equation}
          />
        </div>
        <div ref={(el) => { sectionRefs.current[3] = el; }}>
          <ButterflyVisualization
            isActive={currentSection === 3}
            speed={speed}
            isPlaying={isPlaying}
            equation={sections[3].equation}
          />
        </div>
        <div ref={(el) => { sectionRefs.current[4] = el; }}>
          <HeartVisualization
            isActive={currentSection === 4}
            speed={speed}
            isPlaying={isPlaying}
            equation={sections[4].equation}
          />
        </div>
        <div ref={(el) => { sectionRefs.current[5] = el; }}>
          <RoseVisualization
            isActive={currentSection === 5}
            speed={speed}
            isPlaying={isPlaying}
            equation={sections[5].equation}
          />
        </div>
        <div ref={(el) => { sectionRefs.current[6] = el; }}>
          <SpiralVisualization
            isActive={currentSection === 6}
            speed={speed}
            isPlaying={isPlaying}
            equation={sections[6].equation}
          />
        </div>
        <div ref={(el) => { sectionRefs.current[7] = el; }}>
          <FourierVisualization
            isActive={currentSection === 7}
            speed={speed}
            isPlaying={isPlaying}
            equation={sections[7].equation}
          />
        </div>
      </div>
    </>
  );
};

// Shared component for equation display
const EquationDisplay: React.FC<{ equation: string; isActive: boolean }> = ({ equation, isActive }) => (
  <motion.div
    className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-sm border border-green-700/50 rounded-lg p-4 max-w-md"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
  >
    <div className="text-green-400 font-mono text-sm whitespace-pre-line leading-relaxed">
      {equation}
    </div>
  </motion.div>
);

// 3D projection helper
function project3D(x: number, y: number, z: number, angleX: number, angleY: number, scale: number, offsetX: number, offsetY: number): [number, number] {
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  
  const x1 = x;
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;
  
  const x2 = x1 * cosY + z1 * sinY;
  const y2 = y1;
  const z2 = -x1 * sinY + z1 * cosY;
  
  const px = offsetX + x2 * scale;
  const py = offsetY + y2 * scale;
  
  return [px, py];
}

// Lorenz Attractor - 3D with real-time drawing
const LorenzVisualization: React.FC<{ isActive: boolean; speed: number; isPlaying: boolean; equation: string }> = ({ isActive, speed, isPlaying, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    const trailLength = 600;
    const dt = 0.008;

    const attractorCount = 3;
    type Attractor = {
      trail: { x: number; y: number; z: number }[];
      state: { x: number; y: number; z: number };
    };
    let attractors: Attractor[] = [];

    for (let i = 0; i < attractorCount; i++) {
      const x0 = -20 + 40 * (i / (attractorCount - 1));
      const y0 = -20 + 40 * ((i * 2) % attractorCount) / (attractorCount - 1);
      const z0 = 10 + 10 * i;
      const state = { x: x0, y: y0, z: z0 };
      attractors.push({
        trail: [],
        state: { ...state }
      });
    }
  
    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !isPlaying) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const margin = 0.08;
      const w = width * (1 - 2 * margin);
      const h = height * (1 - 2 * margin);
      const scale = Math.min(w / 60, h / 60);
      const offsetX = width / 2;
      const offsetY = height / 2;

      const angleX = time * 0.18 * speed;
      const angleY = time * 0.12 * speed;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 2.2;

      attractors.forEach((attractor, index) => {
        if (attractor.trail.length > 1) {
          ctx.beginPath();
          for (let i = 0; i < attractor.trail.length - 1; i++) {
            let p = attractor.trail[i];
            let [px, py] = project3D(p.x, p.y, p.z, angleX, angleY, scale, offsetX, offsetY);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          const hue = (time * 90 * speed + index * 360 / attractorCount) % 360;
          ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
          ctx.shadowColor = `hsl(${hue}, 100%, 80%)`;
          ctx.stroke();
        }

        let { x, y, z } = attractor.state;
        const dx = sigma * (y - x);
        const dy = x * (rho - z) - y;
        const dz = x * y - beta * z;
        attractor.state = {
          x: x + dx * dt * speed,
          y: y + dy * dt * speed,
          z: z + dz * dt * speed
        };
        attractor.trail.push({ ...attractor.state });
        if (attractor.trail.length > trailLength) {
          attractor.trail.shift();
        }
      });

      time += 0.012 * speed;
      animationRef.current = requestAnimationFrame(draw);
    }

    if (isPlaying) draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <EquationDisplay equation={equation} isActive={isActive} />
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        <h2 className="text-2xl font-bold matrix-font text-green-400" style={{
          textShadow: '0 0 10px #00ff00',
        }}>
          Lorenz Attractor
        </h2>
      </motion.div>
    </section>
  );
};

// Lissajous Curves - 3D with real-time drawing
const LissajousVisualization: React.FC<{ isActive: boolean; speed: number; isPlaying: boolean; equation: string }> = ({ isActive, speed, isPlaying, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    let time = 0;
    let currentPoint = 0;

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !isPlaying) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const scale = Math.min(width, height) / 3;
      const angleX = time * 0.15 * speed;
      const angleY = time * 0.1 * speed;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;

      const curves = [
        { a: 3, b: 2, hue: 0 },
        { a: 5, b: 4, hue: 120 },
        { a: 4, b: 3, hue: 240 },
      ];

      curves.forEach(({ a, b, hue }) => {
        ctx.beginPath();
        const maxPoints = 1000;
        const pointsToDraw = Math.min(currentPoint, maxPoints);
        
        for (let i = 0; i <= pointsToDraw; i++) {
          const t = (i / maxPoints) * Math.PI * 2 + time * speed;
          const x = scale * Math.sin(a * t);
          const y = scale * Math.sin(b * t + time * speed * 0.5);
          const z = scale * 0.3 * Math.cos((a + b) * t);
          
          const [px, py] = project3D(x, y, z, angleX, angleY, 1, centerX, centerY);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        
        const currentHue = (hue + time * speed * 30) % 360;
        ctx.strokeStyle = `hsl(${currentHue}, 100%, 60%)`;
        ctx.shadowColor = `hsl(${currentHue}, 100%, 70%)`;
        ctx.stroke();
      });

      currentPoint += 3 * speed;
      if (currentPoint > 1000) currentPoint = 1000;
      time += 0.02 * speed;
      animationRef.current = requestAnimationFrame(draw);
    }

    if (isPlaying) {
      currentPoint = 0;
    draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <EquationDisplay equation={equation} isActive={isActive} />
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        <h2 className="text-2xl font-bold matrix-font text-green-400" style={{
          textShadow: '0 0 10px #00ff00',
        }}>
          Lissajous Curves
        </h2>
      </motion.div>
    </section>
  );
};

// Epicycloid - 3D with real-time drawing
const EpicycloidVisualization: React.FC<{ isActive: boolean; speed: number; isPlaying: boolean; equation: string }> = ({ isActive, speed, isPlaying, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    let time = 0;
    let currentPoint = 0;

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !isPlaying) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const R = 100;
      const r = 30;
      const scale = Math.min(width, height) / 400;
      const angleX = time * 0.2 * speed;
      const angleY = time * 0.15 * speed;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;

      ctx.beginPath();
      const maxPoints = 1000;
      const pointsToDraw = Math.min(currentPoint, maxPoints);
      
      for (let i = 0; i <= pointsToDraw; i++) {
        const t = (i / maxPoints) * Math.PI * 4 + time * speed;
        const x = scale * ((R + r) * Math.cos(t) - r * Math.cos((R + r) / r * t));
        const y = scale * ((R + r) * Math.sin(t) - r * Math.sin((R + r) / r * t));
        const z = scale * 50 * Math.sin(t * 2);
        
        const [px, py] = project3D(x, y, z, angleX, angleY, 1, centerX, centerY);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      const hue = (time * speed * 50) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.stroke();

      currentPoint += 4 * speed;
      if (currentPoint > maxPoints) currentPoint = maxPoints;
      time += 0.01 * speed;
      animationRef.current = requestAnimationFrame(draw);
    }

    if (isPlaying) {
      currentPoint = 0;
    draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <EquationDisplay equation={equation} isActive={isActive} />
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        <h2 className="text-2xl font-bold matrix-font text-green-400" style={{
          textShadow: '0 0 10px #00ff00',
        }}>
          Epicycloid
        </h2>
      </motion.div>
    </section>
  );
};

// Butterfly Curve - 3D with real-time drawing
const ButterflyVisualization: React.FC<{ isActive: boolean; speed: number; isPlaying: boolean; equation: string }> = ({ isActive, speed, isPlaying, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    let time = 0;
    let currentPoint = 0;

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !isPlaying) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const scale = Math.min(width, height) / 6;
      const angleX = time * 0.18 * speed;
      const angleY = time * 0.12 * speed;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;

      ctx.beginPath();
      const maxPoints = 2000;
      const pointsToDraw = Math.min(currentPoint, maxPoints);
      
      for (let i = 0; i <= pointsToDraw; i++) {
        const theta = (i / maxPoints) * Math.PI * 12 + time * speed * 0.1;
        const r = Math.exp(Math.cos(theta)) - 2 * Math.cos(4 * theta) + Math.pow(Math.sin(theta / 12), 5);
        const x = scale * r * Math.cos(theta);
        const y = scale * r * Math.sin(theta);
        const z = scale * 0.5 * Math.sin(theta * 3);
        
        const [px, py] = project3D(x, y, z, angleX, angleY, 1, centerX, centerY);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      const hue = (time * speed * 40) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.stroke();

      currentPoint += 5 * speed;
      if (currentPoint > maxPoints) currentPoint = maxPoints;
      time += 0.01 * speed;
      animationRef.current = requestAnimationFrame(draw);
    }

    if (isPlaying) {
      currentPoint = 0;
      draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <EquationDisplay equation={equation} isActive={isActive} />
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        <h2 className="text-2xl font-bold matrix-font text-green-400" style={{
          textShadow: '0 0 10px #00ff00',
        }}>
          Butterfly Curve
        </h2>
      </motion.div>
    </section>
  );
};

// Heart Curve - 3D with real-time drawing
const HeartVisualization: React.FC<{ isActive: boolean; speed: number; isPlaying: boolean; equation: string }> = ({ isActive, speed, isPlaying, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    let time = 0;
    let currentPoint = 0;

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !isPlaying) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const scale = Math.min(width, height) / 40;
      const angleX = time * 0.2 * speed;
      const angleY = time * 0.15 * speed;
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;

      ctx.beginPath();
      const maxPoints = 1000;
      const pointsToDraw = Math.min(currentPoint, maxPoints);
      
      for (let i = 0; i <= pointsToDraw; i++) {
        const t = (i / maxPoints) * Math.PI * 2 + time * speed;
        const x = scale * 16 * Math.pow(Math.sin(t), 3);
        const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const z = scale * 5 * Math.sin(t * 4);
        
        const [px, py] = project3D(x, y, z, angleX, angleY, 1, centerX, centerY);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      const hue = (time * speed * 50) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.stroke();

      currentPoint += 4 * speed;
      if (currentPoint > maxPoints) currentPoint = maxPoints;
      time += 0.01 * speed;
      animationRef.current = requestAnimationFrame(draw);
    }

    if (isPlaying) {
      currentPoint = 0;
    draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <EquationDisplay equation={equation} isActive={isActive} />
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        <h2 className="text-2xl font-bold matrix-font text-green-400" style={{
          textShadow: '0 0 10px #00ff00',
        }}>
          Heart Curve
        </h2>
      </motion.div>
    </section>
  );
};

// Rose Curves - 3D with real-time drawing
const RoseVisualization: React.FC<{ isActive: boolean; speed: number; isPlaying: boolean; equation: string }> = ({ isActive, speed, isPlaying, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    let time = 0;
    let currentPoint = 0;

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !isPlaying) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const scale = Math.min(width, height) / 4;
      const angleX = time * 0.18 * speed;
      const angleY = time * 0.12 * speed;
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;

      const roses = [
        { k: 5, hue: 0 },
        { k: 4, hue: 120 },
        { k: 3, hue: 240 },
      ];

      roses.forEach(({ k, hue }) => {
        ctx.beginPath();
        const maxPoints = 1000;
        const pointsToDraw = Math.min(currentPoint, maxPoints);
        
        for (let i = 0; i <= pointsToDraw; i++) {
          const theta = (i / maxPoints) * Math.PI * 2 + time * speed * 0.1;
          const r = scale * Math.cos(k * theta) * (1 + 0.3 * Math.sin(time * speed));
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          const z = scale * 0.2 * Math.sin(theta * k);
          
          const [px, py] = project3D(x, y, z, angleX, angleY, 1, centerX, centerY);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        
        const currentHue = (hue + time * speed * 30) % 360;
        ctx.strokeStyle = `hsl(${currentHue}, 100%, 60%)`;
        ctx.shadowColor = `hsl(${currentHue}, 100%, 70%)`;
        ctx.stroke();
      });

      currentPoint += 3 * speed;
      if (currentPoint > 1000) currentPoint = 1000;
      time += 0.02 * speed;
      animationRef.current = requestAnimationFrame(draw);
    }

    if (isPlaying) {
      currentPoint = 0;
      draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <EquationDisplay equation={equation} isActive={isActive} />
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        <h2 className="text-2xl font-bold matrix-font text-green-400" style={{
          textShadow: '0 0 10px #00ff00',
        }}>
          Rose Curves
        </h2>
      </motion.div>
    </section>
  );
};

// Spiral Visualization - 3D with real-time drawing
const SpiralVisualization: React.FC<{ isActive: boolean; speed: number; isPlaying: boolean; equation: string }> = ({ isActive, speed, isPlaying, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    let time = 0;
    let theta = 0;
    const a = 5;
    const b = 5;

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !isPlaying) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const angleX = time * 0.15 * speed;
      const angleY = time * 0.1 * speed;
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 3;

      const hue = (time * 60 * speed) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;

        ctx.beginPath();
      const radiusLimit = 0.45 * Math.min(width, height);
      const rMax = a + b * theta;
      const scale = radiusLimit / rMax;

      for (let t = 0; t <= theta; t += 0.1) {
        const r = a + b * t;
        const x = scale * r * Math.cos(t);
        const y = scale * r * Math.sin(t);
        const z = scale * 20 * Math.sin(t * 2);
        
        const [px, py] = project3D(x, y, z, angleX, angleY, 1, centerX, centerY);
        if (t === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.stroke();
      theta += 0.05 * speed;
      time += 0.02 * speed;
      animationRef.current = requestAnimationFrame(draw);
    }

    if (isPlaying) draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <EquationDisplay equation={equation} isActive={isActive} />
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        <h2 className="text-2xl font-bold matrix-font text-green-400" style={{
          textShadow: '0 0 10px #00ff00',
        }}>
          Archimedean Spiral
        </h2>
      </motion.div>
    </section>
  );
};

// Fourier Series - 3D with real-time drawing
const FourierVisualization: React.FC<{ isActive: boolean; speed: number; isPlaying: boolean; equation: string }> = ({ isActive, speed, isPlaying, equation }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let currentPoint = 0;

    function resize() {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      currentCanvas.width = width;
      currentCanvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx || !isPlaying) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const centerY = height / 2;
      const centerX = width / 2;
      const frequencies = 15;
      const angleX = time * 0.1 * speed;
      const angleY = time * 0.08 * speed;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2;

      ctx.beginPath();
      const maxPoints = width;
      const pointsToDraw = Math.min(currentPoint, maxPoints);
      
      for (let x = 0; x <= pointsToDraw; x += 2) {
        let y = 0;
        for (let n = 1; n <= frequencies; n++) {
          const amplitude = 50 / n;
          const frequency = n * 0.02;
          y += amplitude * Math.sin(frequency * x + time * speed * n);
        }
        const z = 30 * Math.sin(x * 0.01);
        const [px, py] = project3D(x - centerX, y, z, angleX, angleY, 1, centerX, centerY);
        if (x === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      const hue = (time * speed * 30) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.stroke();

      currentPoint += 3 * speed;
      if (currentPoint > maxPoints) currentPoint = maxPoints;
      time += 0.02 * speed;
      animationRef.current = requestAnimationFrame(draw);
    }

    if (isPlaying) {
      currentPoint = 0;
    draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, isPlaying]);

  return (
    <section className="h-screen relative flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <EquationDisplay equation={equation} isActive={isActive} />
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
      >
        <h2 className="text-2xl font-bold matrix-font text-green-400" style={{
          textShadow: '0 0 10px #00ff00',
        }}>
          Fourier Series
        </h2>
      </motion.div>
      </section>
  );
};

export default MysteryPage;
