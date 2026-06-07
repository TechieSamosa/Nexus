"use client";

import { motion } from "framer-motion";
import { Database, Code2, Cpu, Brain, Network, Terminal, Sparkles, Server, Users, Mic, ClipboardList, RefreshCcw, Handshake } from "lucide-react";

const techStack = [
  { name: "DSA", icon: <Code2 size={20} /> },
  { name: "LLD & HLD", icon: <Network size={20} /> },
  { name: "OS & DBMS", icon: <Database size={20} /> },
  { name: "Python", icon: <Code2 size={20} /> },
  { name: "C++17", icon: <Terminal size={20} /> },
  { name: "SQL", icon: <Database size={20} /> },
  { name: "Bash", icon: <Terminal size={20} /> },
  { name: "OOP", icon: <Code2 size={20} /> },
  { name: "Distributed Computing", icon: <Network size={20} /> },
  { name: "Pandas", icon: <Database size={20} /> },
  { name: "NumPy", icon: <Database size={20} /> },
  { name: "SciPy", icon: <Database size={20} /> },
  { name: "EDA", icon: <Sparkles size={20} /> },
  { name: "Statistical Modelling", icon: <Brain size={20} /> },
  { name: "Hypothesis Testing", icon: <Brain size={20} /> },
  { name: "A/B Testing", icon: <Network size={20} /> },
  { name: "scikit-learn", icon: <Brain size={20} /> },
  { name: "XGBoost", icon: <Brain size={20} /> },
  { name: "PCA / t-SNE / UMAP", icon: <Database size={20} /> },
  { name: "GDAL / Rasterio", icon: <Server size={20} /> },
  { name: "Tableau / Power BI", icon: <Sparkles size={20} /> },
  { name: "PyTorch", icon: <Brain size={20} /> },
  { name: "TensorFlow", icon: <Brain size={20} /> },
  { name: "Hugging Face", icon: <Sparkles size={20} /> },
  { name: "GANs", icon: <Network size={20} /> },
  { name: "LSTM", icon: <Network size={20} /> },
  { name: "Time-Series Forecasting", icon: <Sparkles size={20} /> },
  { name: "Bayesian Optimisation", icon: <Brain size={20} /> },
  { name: "ROC-AUC / F1 / RMSE", icon: <Database size={20} /> },
  { name: "State-Space Models", icon: <Cpu size={20} /> },
  { name: "LangChain", icon: <Network size={20} /> },
  { name: "LangGraph", icon: <Network size={20} /> },
  { name: "RAG Pipelines", icon: <Database size={20} /> },
  { name: "Prompt Engineering", icon: <Code2 size={20} /> },
  { name: "RLHF", icon: <Brain size={20} /> },
  { name: "LLM Evaluation", icon: <Brain size={20} /> },
  { name: "Apache Spark / PySpark", icon: <Server size={20} /> },
  { name: "ETL Pipelines", icon: <Database size={20} /> },
  { name: "Feature Engineering", icon: <Code2 size={20} /> },
  { name: "MLflow", icon: <Sparkles size={20} /> },
  { name: "FastAPI", icon: <Network size={20} /> },
  { name: "AWS (S3/EC2)", icon: <Server size={20} /> },
  { name: "Docker", icon: <Code2 size={20} /> },
  { name: "Kubernetes", icon: <Server size={20} /> },
  { name: "Git", icon: <Terminal size={20} /> },
  { name: "Matplotlib / Seaborn", icon: <Sparkles size={20} /> },
  { name: "Antigravity IDE", icon: <Sparkles size={20} /> },
  { name: "Claude Code", icon: <Code2 size={20} /> },
  { name: "OpenAI Codex", icon: <Cpu size={20} /> },
  { name: "Leadership", icon: <Users size={20} /> },
  { name: "Public Speaking", icon: <Mic size={20} /> },
  { name: "Project Management", icon: <ClipboardList size={20} /> },
  { name: "Agile Methodologies", icon: <RefreshCcw size={20} /> },
  { name: "Cross-functional Collaboration", icon: <Handshake size={20} /> },
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
              duration: 90, // Slower duration
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
          >
            {duplicatedFirst.map((tech, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center space-x-2 bg-space-800 border border-space-700 px-6 py-3 rounded-full mx-4 shadow-lg shadow-black/50 transition-colors hover:border-neon-purple hover:bg-space-700/50 cursor-default"
              >
                <span className="text-neon-cyan">{tech.icon}</span>
                <span className="font-mono text-gray-300 text-sm">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 90, // Slower duration
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
          >
            {duplicatedSecond.map((tech, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center space-x-2 bg-space-800 border border-space-700 px-6 py-3 rounded-full mx-4 shadow-lg shadow-black/50 transition-colors hover:border-neon-purple hover:bg-space-700/50 cursor-default"
              >
                <span className="text-neon-purple">{tech.icon}</span>
                <span className="font-mono text-gray-300 text-sm">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
