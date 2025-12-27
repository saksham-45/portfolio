"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MatrixBackground } from "@/components/MatrixEffects";
import { useTypingEffect } from "@/hooks/useTypingEffect";

function StyledButton({
  children,
  href,
  gradient,
}: {
  children: React.ReactNode;
  href: string;
  gradient: string;
}) {
  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 rounded-full font-bold matrix-font text-white relative overflow-hidden"
        style={{
          background: gradient,
          boxShadow: "0 4px 0 0 rgba(0,0,0,0.25), 0 2px 12px 0 rgba(0,0,0,0.12)",
          textShadow: "0 0 10px #fff, 0 0 18px #fff, 0 0 12px #00ff00, 0 0 2px #fff",
        }}
    >
      {children}
      </motion.button>
    </Link>
  );
}

export default function Home() {
  const nameText = "Hi, I'm Saksham Srivastava";
  const { displayedText: displayedName, isTyping: isTypingName } = useTypingEffect(nameText, 100);
  
  const taglineText = "Computer Engineering Major & Math Minor | Building for Fun & Impact";
  const { displayedText: displayedTagline } = useTypingEffect(taglineText, 50, !isTypingName);

  return (
    <>
      <MatrixBackground />
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl"
        >
          {/* Typing Name */}
          <h1 
            className="matrix-font text-5xl md:text-7xl mb-6"
        style={{
              textShadow: "0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00",
            }}
          >
            {displayedName}
            {isTypingName && <span className="animate-pulse">|</span>}
        </h1>

          {/* Typing Tagline */}
          <p 
            className="matrix-font text-xl md:text-2xl mb-8 text-green-200"
            style={{
              textShadow: "0 0 5px #00ff00",
            }}
          >
            {displayedTagline}
          </p>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mb-8 relative"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse" style={{
                boxShadow: "0 0 20px rgba(0, 255, 0, 0.5)",
              }} />
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-green-500/50 relative z-10 bg-green-500/20 flex items-center justify-center" style={{
                boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
              }}>
                <span className="text-6xl md:text-8xl text-green-400 matrix-font">S</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <StyledButton
              href="/about"
              gradient="linear-gradient(145deg, #1a6fff 0%, #00b7ff 100%)"
            >
              About Me
            </StyledButton>
            <StyledButton
              href="/projects"
              gradient="linear-gradient(145deg, #1a6fff 0%, #00b7ff 100%)"
            >
              Projects
            </StyledButton>
            <StyledButton
              href="/contact"
              gradient="linear-gradient(145deg, #ff3434 0%, #ff0000 100%)"
            >
              Contact
            </StyledButton>
            <StyledButton
              href="/mystery"
              gradient="linear-gradient(145deg, #ff3434 0%, #ff0000 100%)"
            >
              Mystery
            </StyledButton>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
