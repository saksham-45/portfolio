"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '01'.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

const AboutPage = () => {
  return (
    <main className="relative max-w-6xl mx-auto px-6 py-12 text-green-400 font-mono bg-black min-h-screen overflow-hidden">
      <MatrixBackground />

      {/* Header Section */}
      <header className="flex flex-col items-center text-center mb-16 relative z-10">
        <h1 className="text-5xl font-extrabold mb-3 text-green-300 drop-shadow-[0_0_10px_#00FF00]">
          Saksham Srivastava
        </h1>
        <p className="text-lg text-green-200 mb-1">Tampa, FL • +1 (813) 860-8506</p>
        <p className="text-md text-green-300 mb-1">
          <a href="mailto:saksham146053@gmail.com" className="hover:text-green-500 underline">saksham146053@gmail.com</a> |{' '}
          <a href="https://linkedin.com/in/sakshamsriv" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 underline">LinkedIn</a> |{' '}
          <a href="https://github.com/saksham-45" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 underline">GitHub</a> |{' '}
          <a href="https://saksham-45.github.io/" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 underline">Portfolio</a>
        </p>
      </header>

      {/* Education Section */}
      <section className="mb-16 relative z-10">
        <h2 className="text-3xl font-semibold mb-4 border-b border-green-700 pb-2">Education</h2>
        <div className="text-green-200">
          <h3 className="text-xl font-bold">University of South Florida, Bellini College of AI</h3>
          <p>Bachelor of Science in Computer Engineering, Minor in Mathematics (May 2027)</p>
          <p>Relevant Coursework: Data Structures, Algorithms, OS, Digital Logic, Python & C Program Design</p>
        </div>
      </section>

      {/* Skills & Certifications */}
      <section className="mb-16 relative z-10">
        <h2 className="text-3xl font-semibold mb-4 border-b border-green-700 pb-2">Skills & Certifications</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Programming</h3>
            <ul className="list-disc list-inside text-green-200">
              <li>Assembly (x86-64, ARM), C++, C#, Python, Bash</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Tools</h3>
            <ul className="list-disc list-inside text-green-200">
              <li>LLVM, GDB, Wireshark, Burp Suite, Unity3D, Docker, Git</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Concepts</h3>
            <ul className="list-disc list-inside text-green-200">
              <li>System Design, Embedded Systems, Chip Design, Hardware Security, Optimization, OOP</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-16 relative z-10">
        <h2 className="text-3xl font-semibold mb-4 border-b border-green-700 pb-2">Projects</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {[
            {
              name: "MoodScope",
              desc: "Real-time emotion detection (MTCNN+CNN) with 85% accuracy, 180ms latency. Quantized models for 40% efficiency boost, integrated Llama 3.2-based trend analysis.",
              tech: "OpenCV, PyQt5, TensorFlow, Metal API, SQLite",
              link: "https://github.com/saksham-45/moodscope"
            },
            {
              name: "DSL Compiler",
              desc: "Domain-specific language compiler achieving 5–10% faster symbolic computation than Python. Includes REPL, live plotting, optimized LLVM codegen.",
              tech: "Llvmlite, NumPy, Matplotlib, Pytest",
              link: "https://github.com/saksham-45/dsl-compiler"
            },
            {
              name: "YouTube Semantic Search Engine",
              desc: "Semantic search achieving ~3× better relevance vs keyword search using Sentence Transformers + FAISS. Recall@10 = 0.82, nDCG@10 = 0.79.",
              tech: "PyTorch, FAISS, WandB, Apple MPS",
              link: "https://github.com/saksham-45/bettersearchytube"
            },
            {
              name: "SnackChat",
              desc: "Cross-platform Flutter app for food-themed chats and snaps. Optimized Firestore usage by 20%.",
              tech: "Flutter, Dart, Firebase, Cloud Messaging",
              link: "https://github.com/saksham-45/snackchat"
            },
          ].map((proj) => (
            <div key={proj.name} className="border border-green-700 rounded-lg p-6 shadow-lg hover:shadow-green-500/40 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2 text-green-300">{proj.name}</h3>
              <p className="text-green-200 mb-3">{proj.desc}</p>
              <p className="text-sm text-green-400 italic mb-2">Tech: {proj.tech}</p>
              <Link href={proj.link} target="_blank" className="text-green-500 hover:text-green-300 underline">
                View on GitHub →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16 relative z-10">
        <h2 className="text-3xl font-semibold mb-4 border-b border-green-700 pb-2">Experience</h2>
        <div className="border border-green-700 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-2 text-green-300">Project Intern – Greenpeace India</h3>
          <p className="italic text-green-200 mb-2">Sep 2020 – Feb 2021</p>
          <ul className="list-disc list-inside text-green-200">
            <li>Generated 50,000+ petition signatures contributing to environmental policy changes.</li>
            <li>Developed analytics workflows increasing campaign engagement by 35%.</li>
          </ul>
        </div>
      </section>

    
    </main>
  );
};

export default AboutPage;