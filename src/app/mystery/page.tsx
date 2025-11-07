"use client";
import React, { useRef, useEffect } from 'react';

const PsychedelicPi: React.FC = () => {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);
  const canvasRef4 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef1.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    let animationFrameId: number;
    let time = 0;
    let currentPoint = 0;

    const points = 1000;
    const a = 5;
    const b = 5;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', resize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const pi = Math.PI;
      const points = 1000;
      const radius = Math.min(width, height) / 3;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;

      for (let layer = 0; layer < 3; layer++) {
        const hueBase = (time * 40 + layer * 120) % 360;
        ctx.strokeStyle = `hsl(${hueBase}, 100%, 60%)`;
        ctx.shadowColor = `hsl(${hueBase}, 100%, 70%)`;
        ctx.lineWidth = 2 + layer;

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const t = (i / points) * pi * 4;
          const mod1 = 1 + 0.5 * Math.sin(6 * t + time + layer);
          const mod2 = 1 + 0.5 * Math.cos(8 * t + time + layer);

          const x = centerX + radius * Math.cos(t) * mod1;
          const y = centerY + radius * Math.sin(t) * mod2;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef2.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    let animationFrameId: number;
    let time = 0;
    let currentPoint = 0;
    const points = 1000;
    const a = 5;
    const b = 5;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', resize);

    function drawFlower(rFunc: (theta: number) => number, points: number, hueOffset: number) {
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * 2 * Math.PI;
        const r = rFunc(theta) * (Math.min(width, height) / 4);
        const x = centerX + r * Math.cos(theta);
        const y = centerY + r * Math.sin(theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsl(${(time * 60 + hueOffset) % 360}, 80%, 60%)`;
      ctx.shadowColor = `hsl(${(time * 60 + hueOffset) % 360}, 80%, 70%)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 20;

      // Draw multiple flower-like structures with different parametric equations
      drawFlower(theta => Math.cos(5 * theta) * (1 + 0.3 * Math.sin(time)), 500, 0);
      drawFlower(theta => Math.sin(4 * theta) * (1 + 0.3 * Math.cos(time)), 500, 120);
      drawFlower(theta => Math.cos(3 * theta) * Math.sin(2 * theta + time), 500, 240);

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef3.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    let animationFrameId: number;
    let time = 0;

    let theta = 0;
    const a = 5;
    const b = 5;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', resize);

    // Initialize with black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    function draw() {
      if (!ctx) return;

      // Always clear background fully to black to prevent overflow
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 20;

      const hue = (time * 60) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
      ctx.lineWidth = 3;

      ctx.beginPath();

      // Slowly decreasing scale factor to keep spiral inside viewport
      // Calculate max radius for current theta: r = a + b * theta
      // Max radius in pixels: r * scale <= radiusLimit, radiusLimit = 0.45 * min(width, height)
      // So scale = radiusLimit / r
      const radiusLimit = 0.45 * Math.min(width, height);
      const rMax = a + b * theta;
      const scale = radiusLimit / rMax;

      // Draw spiral from theta=0 up to current theta in steps
      const step = 0.1; // smaller step for smoother curve

      for (let t = 0; t <= theta; t += step) {
        const r = a + b * t;
        const x = centerX + scale * r * Math.cos(t);
        const y = centerY + scale * r * Math.sin(t);
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();

      // Increment theta continuously to trace spiral infinitely
      theta += 0.05;

      // No abrupt reset, keep drawing infinitely with scaling down

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef4.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId: number;
    let time = 0;

    // Lorenz attractor parameters (shared for all attractors)
    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    const trailLength = 800; // shorter trails for clarity
    const dt = 0.008; // slightly faster motion

    // Lorenz bounding box for scaling
    const lorenzBounds = {
      xMin: -30,
      xMax: 30,
      yMin: -30,
      yMax: 30,
      zMin: 0,
      zMax: 50
    };

    // Number of independent attractors
    const attractorCount = 4;
    // Each attractor has its own state and velocity in Lorenz space
    type Attractor = {
      trail: { x: number; y: number; z: number }[];
      state: { x: number; y: number; z: number };
      velocity: { x: number; y: number; z: number };
      bounds: typeof lorenzBounds;
    };
    let attractors: Attractor[] = [];

    // Generate unique initial positions and velocities for each attractor
    for (let i = 0; i < attractorCount; i++) {
      // Spread out starting positions in Lorenz space
      const x0 = -20 + 40 * (i / (attractorCount - 1));
      const y0 = -20 + 40 * ((i * 2) % attractorCount) / (attractorCount - 1);
      const z0 = 10 + 10 * i;
      // Give each attractor a unique velocity direction (small random perturbation)
      const vscale = 2.2 + Math.random() * 1.2;
      const velocity = {
        x: (Math.random() - 0.5) * vscale,
        y: (Math.random() - 0.5) * vscale,
        z: (Math.random() - 0.5) * vscale,
      };
      const state = { x: x0, y: y0, z: z0 };
      // Each attractor gets its own trail
      const trail = Array(trailLength).fill({ ...state });
      attractors.push({
        trail: [...trail],
        state: { ...state },
        velocity: { ...velocity },
        bounds: { ...lorenzBounds }
      });
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', resize);

    // For boundary reflection: returns new value and velocity after bounce
    function reflect(val: number, vel: number, min: number, max: number): [number, number] {
      let next = val;
      let v = vel;
      if (next < min) {
        next = min + (min - next); // reflect inside
        v = Math.abs(v);
      }
      if (next > max) {
        next = max - (next - max);
        v = -Math.abs(v);
      }
      return [next, v];
    }

    function draw() {
      if (!ctx) return;

      // Black background, no fading
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;

      // Calculate scale to fit Lorenz attractor in canvas (with margin)
      const margin = 0.08;
      const w = width * (1 - 2 * margin);
      const h = height * (1 - 2 * margin);
      const lorenzWidth = lorenzBounds.xMax - lorenzBounds.xMin;
      const lorenzHeight = lorenzBounds.yMax - lorenzBounds.yMin;
      const scale = Math.min(w / lorenzWidth, h / lorenzHeight);
      const offsetX = width / 2;
      const offsetY = height / 2;

      // Attractor rotation for aesthetics
      const angle = time * 0.18;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosB = Math.cos(angle * 0.43);
      const sinB = Math.sin(angle * 0.43);

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 2.2;

      // Draw each attractor independently
      attractors.forEach((attractor, index) => {
        ctx.beginPath();
        for (let i = 0; i < attractor.trail.length - 1; i++) {
          let p = attractor.trail[i];
          let q = attractor.trail[i + 1];
          // 3D rotation and projection
          let x1 = cosA * p.x + sinA * p.z;
          let z1 = -sinA * p.x + cosA * p.z;
          let y1 = cosB * p.y - sinB * z1;
          let px = offsetX + x1 * scale;
          let py = offsetY + y1 * scale;

          let x2 = cosA * q.x + sinA * q.z;
          let z1q = -sinA * q.x + cosA * q.z;
          let y2 = cosB * q.y - sinB * z1q;
          let qx = offsetX + x2 * scale;
          let qy = offsetY + y2 * scale;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        // Neon hue cycling with offset per attractor
        const hue = (time * 90 + index * 360 / attractorCount) % 360;
        ctx.strokeStyle = `hsl(${hue},100%,60%)`;
        ctx.shadowColor = `hsl(${hue},100%,80%)`;
        ctx.stroke();
      });

      ctx.restore();

      // Advance each attractor independently, with boundary reflection
      attractors.forEach(attractor => {
        let { x, y, z } = attractor.state;
        let { x: vx, y: vy, z: vz } = attractor.velocity;
        // Lorenz derivatives
        const dx = sigma * (y - x);
        const dy = x * (rho - z) - y;
        const dz = x * y - beta * z;
        // Advance state, add a bit of velocity (to make it independent)
        let nx = x + dx * dt + vx * dt * 0.14;
        let ny = y + dy * dt + vy * dt * 0.14;
        let nz = z + dz * dt + vz * dt * 0.14;
        // Reflect at boundaries (so attractor stays visible)
        [nx, vx] = reflect(nx, vx, attractor.bounds.xMin, attractor.bounds.xMax);
        [ny, vy] = reflect(ny, vy, attractor.bounds.yMin, attractor.bounds.yMax);
        [nz, vz] = reflect(nz, vz, attractor.bounds.zMin, attractor.bounds.zMax);
        // Save new state and velocity
        attractor.state = { x: nx, y: ny, z: nz };
        attractor.velocity = { x: vx, y: vy, z: vz };
        // Update trail
        attractor.trail.push({ x: nx, y: ny, z: nz });
        if (attractor.trail.length > trailLength) {
          attractor.trail.shift();
        }
      });

      time += 0.012;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);


  return (
    <>
      <section style={{ height: '100vh', position: 'relative' }}>
        <canvas ref={canvasRef1} style={{ display: 'block', width: '100vw', height: '100vh', backgroundColor: 'black' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#00FF00',
            fontFamily: 'monospace',
            fontSize: '4rem',
            textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          π in 3D
        </div>
      </section>
      <section style={{ height: '100vh', position: 'relative' }}>
        <canvas ref={canvasRef2} style={{ display: 'block', width: '100vw', height: '100vh', backgroundColor: 'black' }} />
        <div
          style={{
            position: 'absolute',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#00FF00',
            fontFamily: 'monospace',
            fontSize: '1.5rem',
            textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
          }}
        >
          sin(rθ) in 3D
        </div>
      </section>
      <section style={{ height: '100vh', position: 'relative' }}>
        <canvas ref={canvasRef3} style={{ display: 'block', width: '100vw', height: '100vh', backgroundColor: 'black' }} />
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#00FF00',
            fontFamily: 'monospace',
            fontSize: '1.5rem',
            textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
          }}
        >
          Parametric Spiral: r = a + bθ, x = r cos(θ), y = r sin(θ)
        </div>
      </section>
      <section style={{ height: '100vh', position: 'relative' }}>
        <canvas ref={canvasRef4} style={{ display: 'block', width: '100vw', height: '100vh', backgroundColor: 'black' }} />
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#00FF00',
            fontFamily: 'monospace',
            fontSize: '1.5rem',
            textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 30px #00FF00',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
          }}
        >
          Lorenz Attractor
        </div>
      </section>
    </>
  );
};

export default PsychedelicPi;
