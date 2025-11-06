"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function PiAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 22;
    let columns = Math.floor(width / fontSize);
    // Initialize multiple drops per column for denser rain effect
    let dropsPerColumn = 3; 
    let drops: number[][] = new Array(columns)
      .fill(0)
      .map(() => Array.from({ length: dropsPerColumn }, () => Math.floor(Math.random() * height / fontSize)));

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00FF00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        for (let j = 0; j < drops[i].length; j++) {
          const text = Math.random() < 0.5 ? "0" : "1";
          ctx.fillText(text, i * fontSize, drops[i][j] * fontSize);

          if (drops[i][j] * fontSize > height && Math.random() > 0.975) {
            drops[i][j] = 0;
          }
          drops[i][j]++;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns)
        .fill(0)
        .map(() => Array.from({ length: dropsPerColumn }, () => Math.floor(Math.random() * height / fontSize)));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
      }}
    />
  );
}

function StyledButton({ children, style, onClick }) {
  const [hover, setHover] = useState(false);
  // Inline 3D pill button style, bright gradients, MATRIX font, with hover state
  const baseStyle = {
    cursor: "pointer",
    fontFamily: "'Matrix Code NFI', monospace",
    fontWeight: "bold",
    fontSize: "1.1rem",
    padding: "0.7rem 2.2rem",
    borderRadius: "999px",
    border: "none",
    outline: "none",
    boxShadow: "0 4px 0 0 rgba(0,0,0,0.25), 0 2px 12px 0 rgba(0,0,0,0.12)",
    color: "#fff",
    letterSpacing: "0.05em",
    textTransform: "camelCase",
    transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
    // Add a white glow to the text in addition to the neon/green
    textShadow:
      "0 0 10px #fff, 0 0 18px #fff, 0 0 12px #00ff00, 0 0 2px #fff",
    ...style,
  };
  const hoverStyle = {
    transform: "translateY(-2px) scale(1.04)",
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.25), 0 0 18px #00ff00",
    filter: "brightness(1.15) saturate(1.2)",
  };
  return (
    <button
      type="button"
      style={hover ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Home() {
  return (
    <>
      <PiAnimation />
      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "2rem",
          textAlign: "center", // Ensure text is centered
        }}
      >
        <h1 className="matrix-font glowing-text" style={{ fontSize: "4rem", margin: "0.5rem 0" }}>
          Hy I am Saksham Srivastava
        </h1>
        <p className="matrix-font glowing-text" style={{ fontSize: "2rem", margin: "0.5rem 0" }}>
          I am a computer engineering major and math minor learning and building for fun and impact
        </p>
        <Image
          src="/profile.jpg"
          alt=""
          width={200}
          height={200}
          style={{ borderRadius: "50%", marginTop: "2rem" }}
        />
        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <Link href="/mystery">
            <StyledButton
              style={{
                background: "linear-gradient(145deg, #ff3434 0%, #ff0000 100%)",
                boxShadow: "0 4px 0 0 #b30000, 0 2px 12px 0 rgba(255,0,0,0.15)",
              }}
            >
              Mystery Page
            </StyledButton>
          </Link>
          <Link href="/about">
            <StyledButton
              style={{
                background: "linear-gradient(145deg, #1a6fff 0%, #00b7ff 100%)",
                boxShadow: "0 4px 0 0 #0051b3, 0 2px 12px 0 rgba(0,183,255,0.15)",
              }}
            >
              About Me
            </StyledButton>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
