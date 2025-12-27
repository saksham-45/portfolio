"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MatrixBackground } from '@/components/MatrixEffects';

// Blog posts data - in a real app, this would come from a CMS or markdown files
const blogPosts = [
  {
    slug: 'welcome',
    title: 'Welcome to My Blog',
    excerpt: 'This is where I share my thoughts on software development, computer engineering, and the projects I\'m working on.',
    date: '2024-01-15',
    readTime: '3 min read',
    tags: ['General', 'Introduction'],
  },
  // Add more blog posts here as you create them
];

export default function BlogPage() {
  return (
    <>
      <MatrixBackground />
      <main className="relative z-10 min-h-screen bg-black text-green-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 matrix-font" style={{
              textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00',
            }}>
              Blog
            </h1>
            <p className="text-green-200 text-lg max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on software development and computer engineering.
            </p>
          </motion.div>

          {/* Blog Posts */}
          {blogPosts.length > 0 ? (
            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-green-700/50 rounded-lg p-8 bg-black/40 backdrop-blur-sm hover:border-green-400 hover:bg-black/60 transition-all"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-3xl font-bold mb-3 text-green-300 matrix-font hover:text-green-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-green-200 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-green-400/70">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      {post.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-green-200 text-lg mb-4">No blog posts yet.</p>
              <p className="text-green-400/70">Check back soon for updates!</p>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}

