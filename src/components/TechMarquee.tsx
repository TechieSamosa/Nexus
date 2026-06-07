"use client";

import { motion } from "framer-motion";
import { Database, Code2, Cpu, Brain, Network, Terminal, Sparkles, Server } from "lucide-react";

const techStack = [
  { name: "Python", icon: <Code2 size={20} /> },
  { name: "C++17", icon: <Terminal size={20} /> },
  { name: "SQL", icon: <Database size={20} /> },
  { name: "Bash", icon: <Terminal size={20} /> },
  { name: "PyTorch", icon: <Brain size={20} /> },
  { name: "TensorFlow", icon: <Brain size={20} /> },
  { name: "Hugging Face", icon: <Sparkles size={20} /> },
  { name: "GANs", icon: <Network size={20} /> },
  { name: "RLHF", icon: <Brain size={20} /> },
  { name: "State-Space Models", icon: <Cpu size={20} /> },
  { name: "LangChain", icon: <Network size={20} /> },
  { name: "LangGraph", icon: <Network size={20} /> },
  { name: "RAG Pipelines", icon: <Database size={20} /> },
  { name: "Antigravity IDE", icon: <Sparkles size={20} /> },
  { name: "Claude Code", icon: <Code2 size={20} /> },
  { name: "OpenAI Codex", icon: <Cpu size={20} /> },
  { name: "Apache Spark", icon: <Server size={20} /> },
  { name: "PySpark", icon: <Server size={20} /> },
  { name: "AWS (S3/EC2)", icon: <Server size={20} /> },
  { name: "Docker", icon: <Code2 size={20} /> },
  { name: "SQLite", icon: <Database size={20} /> },
];

export default function TechMarquee() {
  // Duplicate the array to create a seamless loop
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <section className="py-20 border-y border-space-700 bg-space-800/30 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-space-900 via-transparent to-space-900 z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-8 relative z-20">
        <h2 className="text-2xl font-mono text-neon-cyan flex items-center">
          <Cpu className="mr-2" />
          <span className="text-white">System.</span>getArsenal()
        </h2>
      </div>

      <div className="flex overflow-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
        >
          {duplicatedTech.map((tech, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-space-800 border border-space-700 px-6 py-3 rounded-full mx-4 shadow-lg shadow-black/50 transition-colors hover:border-neon-purple hover:bg-space-700/50 cursor-default"
            >
              <span className="text-neon-cyan">{tech.icon}</span>
              <span className="font-mono text-gray-300 text-sm">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
