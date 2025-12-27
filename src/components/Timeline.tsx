"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string[];
  type: 'education' | 'experience';
}

const timelineItems: TimelineItem[] = [
  {
    title: 'Bachelor of Science in Computer Engineering',
    organization: 'University of South Florida, Bellini College of AI',
    period: 'Expected May 2027',
    description: [
      'Minor in Mathematics',
      'Relevant Coursework: Data Structures, Algorithms, OS, Digital Logic, Python & C Program Design',
    ],
    type: 'education',
  },
  {
    title: 'Project Intern',
    organization: 'Greenpeace India',
    period: 'Sep 2020 – Feb 2021',
    description: [
      'Generated 50,000+ petition signatures contributing to environmental policy changes',
      'Developed analytics workflows increasing campaign engagement by 35%',
    ],
    type: 'experience',
  },
];

export function Timeline() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-700/50" />

      <div className="space-y-12">
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2 }}
            className="relative pl-20"
          >
            {/* Timeline dot */}
            <div className="absolute left-6 top-2">
              <motion.div
                className="w-4 h-4 rounded-full bg-green-400 border-2 border-black"
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.3 }}
                style={{
                  boxShadow: '0 0 15px rgba(0, 255, 0, 0.8)',
                }}
              />
            </div>

            {/* Content card */}
            <motion.div
              className="border border-green-700/50 rounded-lg p-6 bg-black/40 backdrop-blur-sm"
              whileHover={{ borderColor: '#00ff00', boxShadow: '0 0 20px rgba(0, 255, 0, 0.2)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-green-300 matrix-font mb-1">
                    {item.title}
                  </h3>
                  <p className="text-green-400 font-mono text-sm">{item.organization}</p>
                </div>
                <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded border border-green-500/30 whitespace-nowrap">
                  {item.period}
                </span>
              </div>
              <ul className="space-y-2">
                {item.description.map((desc, i) => (
                  <li key={i} className="text-green-200 text-sm flex items-start gap-2">
                    <span className="text-green-400 mt-1">▸</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

