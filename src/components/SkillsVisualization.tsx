"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Skill {
  name: string;
  level: number; // 0-100
  category: 'programming' | 'tools' | 'concepts';
}

const skills: Skill[] = [
  // Programming
  { name: 'Python', level: 90, category: 'programming' },
  { name: 'C++', level: 85, category: 'programming' },
  { name: 'C', level: 80, category: 'programming' },
  { name: 'C#', level: 75, category: 'programming' },
  { name: 'Assembly (x86-64, ARM)', level: 70, category: 'programming' },
  { name: 'Bash', level: 75, category: 'programming' },
  { name: 'JavaScript/TypeScript', level: 80, category: 'programming' },
  { name: 'Dart', level: 70, category: 'programming' },
  
  // Tools
  { name: 'LLVM', level: 75, category: 'tools' },
  { name: 'GDB', level: 80, category: 'tools' },
  { name: 'Wireshark', level: 70, category: 'tools' },
  { name: 'Burp Suite', level: 65, category: 'tools' },
  { name: 'Unity3D', level: 70, category: 'tools' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'Git', level: 85, category: 'tools' },
  
  // Concepts
  { name: 'System Design', level: 80, category: 'concepts' },
  { name: 'Embedded Systems', level: 75, category: 'concepts' },
  { name: 'Chip Design', level: 70, category: 'concepts' },
  { name: 'Hardware Security', level: 75, category: 'concepts' },
  { name: 'Optimization', level: 85, category: 'concepts' },
  { name: 'OOP', level: 90, category: 'concepts' },
];

const categoryLabels = {
  programming: 'Programming Languages',
  tools: 'Tools & Frameworks',
  concepts: 'Concepts & Methodologies',
};

export function SkillsVisualization() {
  const { ref, isVisible } = useScrollAnimation();

  const categories = ['programming', 'tools', 'concepts'] as const;

  return (
    <div ref={ref} className="space-y-12">
      {categories.map((category) => {
        const categorySkills = skills.filter((s) => s.category === category);
        return (
          <div key={category} className="space-y-4">
            <h3 className="text-2xl font-bold text-green-300 matrix-font border-b border-green-700 pb-2">
              {categoryLabels[category]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-green-200 text-sm font-mono">{skill.name}</span>
                    <span className="text-green-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="relative h-2 bg-black border border-green-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-400"
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: 'easeOut' }}
                      style={{
                        boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

