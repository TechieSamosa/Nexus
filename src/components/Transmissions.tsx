"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { BlogPost } from "@/lib/blog";
import { Terminal, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Transmissions({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section id="transmissions" className="py-24 px-6 relative z-10 bg-[#0c0b11] border-t border-space-700">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4 flex items-center">
            <Terminal className="mr-4 text-neon-cyan" size={36} />
            Transmissions
          </h2>
          <p className="text-gray-400 font-mono">Engineering logs and mechanistic interpretations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Tilt key={post.slug} perspective={1000} tiltMaxAngleX={5} tiltMaxAngleY={5} className="transform-style-3d h-full">
              <Link href={`/transmissions/${post.slug}`} className="block h-full outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, boxShadow: "0px 0px 25px rgba(139,92,246,0.3)", transition: { type: "spring", stiffness: 250, damping: 20 } }}
                  className="w-full h-full rounded-2xl border border-space-700 bg-space-800/50 p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden glass-panel aura-halo animate-wave will-change-transform"
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-4 text-xs font-mono text-gray-500">
                      <span className="flex items-center"><Calendar size={14} className="mr-1 text-neon-purple" /> {post.date}</span>
                      <span className="flex items-center"><Clock size={14} className="mr-1 text-neon-cyan" /> {post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between border-t border-space-700/50 pt-4 mt-auto">
                    <span className="text-xs font-mono text-neon-purple group-hover:text-white transition-colors tracking-widest">READ LOG</span>
                    <ArrowRight size={16} className="text-neon-purple group-hover:text-white transition-colors group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
