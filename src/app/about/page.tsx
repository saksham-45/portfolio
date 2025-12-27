"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MatrixBackground } from '@/components/MatrixEffects';
import { SkillsVisualization } from '@/components/SkillsVisualization';
import { Timeline } from '@/components/Timeline';

const AboutPage = () => {
  return (
    <>
      <MatrixBackground />
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-green-400 min-h-screen">

        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-green-300 matrix-font" style={{
            textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00',
          }}>
            Saksham Srivastava
          </h1>
          <p className="text-lg text-green-200 mb-2">Tampa, FL • +1 (813) 860-8506</p>
          <div className="flex flex-wrap gap-3 justify-center text-sm text-green-300">
            <a href="mailto:saksham146053@gmail.com" className="hover:text-green-400 underline transition-colors">
              Email
            </a>
            <span>•</span>
            <a href="https://linkedin.com/in/sakshamsriv" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 underline transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href="https://github.com/saksham-45" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 underline transition-colors">
              GitHub
            </a>
          </div>
        </motion.header>

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 text-green-300 matrix-font border-b border-green-700 pb-3">
            Timeline
          </h2>
          <Timeline />
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-8 text-green-300 matrix-font border-b border-green-700 pb-3">
            Skills & Expertise
          </h2>
          <SkillsVisualization />
        </motion.section>

        {/* Quick Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-green-200 mb-4">Explore my work</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/projects"
              className="px-6 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 hover:border-green-400 transition-colors matrix-font"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg hover:bg-green-500/30 hover:border-green-400 transition-colors matrix-font"
            >
              Get In Touch
            </Link>
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default AboutPage;