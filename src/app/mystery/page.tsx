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

    // Lorenz attractor parameters
    let sigma = 10;
    let rho = 28;
    let beta = 8 / 3;
    const trailLength = 6000;
    const dt = 0.002;

    // Determine Lorenz attractor's bounding box for scaling
    const lorenzBounds = {
      xMin: -30,
      xMax: 30,
      yMin: -30,
      yMax: 30,
      zMin: 0,
      zMax: 50
    };

    // Initialize multiple attractors with slightly different initial states
    const attractorCount = 7;
    let attractors: {
      trail: { x: number; y: number; z: number }[];
      state: { x: number; y: number; z: number };
    }[] = [];

    for (let i = 0; i < attractorCount; i++) {
      let trail: { x: number; y: number; z: number }[] = [];
      // Slightly different initial states
      let state = {
        x: 0.01 + (Math.random() - 0.5) * 0.02,
        y: 0 + (Math.random() - 0.5) * 0.02,
        z: 0 + (Math.random() - 0.5) * 0.02
      };
      for (let j = 0; j < trailLength; j++) {
        const dx = sigma * (state.y - state.x);
        const dy = state.x * (rho - state.z) - state.y;
        const dz = state.x * state.y - beta * state.z;
        state = {
          x: state.x + dx * dt,
          y: state.y + dy * dt,
          z: state.z + dz * dt,
        };
        trail.push({ ...state });
      }
      attractors.push({ trail, state });
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', resize);

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

      // Draw each attractor's trail with neon glow and hue cycling offset by index
      attractors.forEach(({ trail }, index) => {
        ctx.beginPath();
        for (let i = 0; i < trail.length - 1; i++) {
          // 3D rotation for visual effect (rotate around Y and X)
          let p = trail[i];
          let q = trail[i + 1];
          // Rotate around Y axis (vertical)
          let x1 = cosA * p.x + sinA * p.z;
          let z1 = -sinA * p.x + cosA * p.z;
          // Rotate around X axis (horizontal)
          let y1 = cosB * p.y - sinB * z1;
          // Project to 2D, center and scale to fit canvas
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

      // Euler step for each attractor, add new point to trail, remove oldest
      attractors.forEach(attractor => {
        let last = attractor.trail[attractor.trail.length - 1];
        const dx = sigma * (last.y - last.x);
        const dy = last.x * (rho - last.z) - last.y;
        const dz = last.x * last.y - beta * last.z;
        const next = {
          x: last.x + dx * dt,
          y: last.y + dy * dt,
          z: last.z + dz * dt,
        };
        attractor.trail.push(next);
        attractor.trail.shift();
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
