"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProcessedProject } from '@/types/github';
import { getLanguageColor, formatRelativeTime, truncate } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: ProcessedProject;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const languageColor = getLanguageColor(project.language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        className="relative h-full border border-green-700/50 rounded-lg p-6 bg-black/40 backdrop-blur-sm overflow-hidden cursor-pointer"
        whileHover={{ 
          borderColor: '#00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
        }}
        style={{
          border: isHovered ? '1px solid #00ff00' : '1px solid rgba(0, 255, 0, 0.3)',
        }}
        onClick={() => router.push(`/projects/${project.slug}`)}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: isHovered
              ? 'linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.1), transparent)'
              : 'transparent',
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Language indicator */}
        {project.language && (
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: languageColor }}
            />
            <span className="text-sm text-green-400 font-mono">{project.language}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold mb-2 text-green-300 matrix-font">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-green-200 mb-4 text-sm leading-relaxed">
          {truncate(project.description, 120)}
        </p>

        {/* Topics/Tags */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded border border-green-500/30"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-green-300">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{project.stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v1a1 1 0 11-2 0v-1A5 5 0 0011 9H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{project.forks}</span>
          </div>
          <span className="text-green-400/70 text-xs">
            {formatRelativeTime(project.updatedAt)}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 text-sm font-mono flex items-center gap-1 transition-colors"
          >
            View on GitHub
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: isHovered ? 3 : 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </motion.svg>
          </Link>
          {project.homepage && (
            <Link
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-sm font-mono flex items-center gap-1 transition-colors"
            >
              Live Demo
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

