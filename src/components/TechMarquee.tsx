"use client";

import { motion } from "framer-motion";
import { Database, Code2, Cpu, Brain, Network, Terminal, Sparkles, Server, Users, Mic, ClipboardList, RefreshCcw, Handshake } from "lucide-react";

const techStack = [
  { name: "C++", icon: <Terminal size={16} /> },
  { name: "Python", icon: <Code2 size={16} /> },
  { name: "SQL", icon: <Database size={16} /> },
  { name: "Bash", icon: <Terminal size={16} /> },
  { name: "DSA", icon: <Code2 size={16} /> },
  { name: "OS & DBMS", icon: <Database size={16} /> },
  { name: "System Design", icon: <Network size={16} /> },
  { name: "LLD & HLD", icon: <Network size={16} /> },
  { name: "Linux", icon: <Server size={16} /> },
  { name: "Docker", icon: <Cpu size={16} /> },
  { name: "AWS", icon: <Server size={16} /> },
  { name: "Kubernetes", icon: <Network size={16} /> },
  { name: "Git", icon: <Terminal size={16} /> },
  { name: "Apache Spark", icon: <Sparkles size={16} /> },
  { name: "PySpark", icon: <Sparkles size={16} /> },
  { name: "Ray", icon: <Network size={16} /> },
  { name: "ETL Pipelines", icon: <Database size={16} /> },
  { name: "PyTorch", icon: <Brain size={16} /> },
  { name: "TensorFlow", icon: <Brain size={16} /> },
  { name: "MLflow", icon: <Sparkles size={16} /> },
  { name: "scikit-learn", icon: <Brain size={16} /> },
  { name: "Hugging Face", icon: <Sparkles size={16} /> },
];

export default function TechMarquee() {
  // Split the tech stack into two halves
  const half = Math.ceil(techStack.length / 2);
  const firstHalf = techStack.slice(0, half);
  const secondHalf = techStack.slice(half);

  // Duplicate the arrays to create a seamless loop
  const duplicatedFirst = [...firstHalf, ...firstHalf];
  const duplicatedSecond = [...secondHalf, ...secondHalf];

  return (
    <section className="py-20 border-y border-space-700 bg-space-800/30 backdrop-blur-md relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-space-900 via-transparent to-space-900 z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-10 relative z-20">
        <h2 className="text-2xl font-mono text-neon-cyan flex items-center">
          <Cpu className="mr-2" />
          <span className="text-white">System.</span>getArsenal()
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* Row 1: Moves Left */}
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 180, // Slower duration
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
          >
            {duplicatedFirst.map((tech, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center space-x-1.5 bg-space-800 border border-space-700 px-4 py-2 rounded-full mx-2 shadow-sm shadow-black/50 transition-colors hover:border-neon-purple hover:bg-space-700/50 cursor-default"
              >
                <span className="text-neon-cyan">{tech.icon}</span>
                <span className="font-mono text-gray-300 text-xs">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 180, // Slower duration
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
          >
            {duplicatedSecond.map((tech, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center space-x-1.5 bg-space-800 border border-space-700 px-4 py-2 rounded-full mx-2 shadow-sm shadow-black/50 transition-colors hover:border-neon-purple hover:bg-space-700/50 cursor-default"
              >
                <span className="text-neon-purple">{tech.icon}</span>
                <span className="font-mono text-gray-300 text-xs">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
