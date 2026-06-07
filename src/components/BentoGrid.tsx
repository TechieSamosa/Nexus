"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Moon, Cpu, Dna, Bot, Satellite, Cross, X, ExternalLink, Database, Network, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Project {
  id: string;
  title: string;
  icon: React.ReactNode;
  stats: string;
  color: string;
  uiCue: string;
  span: string;
  link?: string;
}

const bdhLineData = [
  { step: 0, "Transformer": 7.2, "BDH Base": 7.5, "BDH-NoMul": 8.1, "BDH-LowDim": 7.6, "BDH-Improved": 7.4 },
  { step: 1000, "Transformer": 5.1, "BDH Base": 5.4, "BDH-NoMul": 6.8, "BDH-LowDim": 5.3, "BDH-Improved": 5.2 },
  { step: 2000, "Transformer": 4.5, "BDH Base": 4.8, "BDH-NoMul": 6.2, "BDH-LowDim": 4.7, "BDH-Improved": 4.6 },
  { step: 2900, "Transformer": 4.2, "BDH Base": 4.5, "BDH-NoMul": 5.9, "BDH-LowDim": 4.4, "BDH-Improved": 4.3 },
];

const bdhBarData = [
  { name: "No Mul Gate (+)", impact: 0.059, fill: "#ef4444" },
  { name: "Low Dim (m=32)", impact: -0.052, fill: "#22c55e" },
  { name: "GELU Activation", impact: -0.039, fill: "#3b82f6" },
];

const projects: Project[] = [
  {
    id: "aether",
    title: "Project AETHER",
    icon: <Moon size={32} className="text-white" />,
    stats: "Deep learning GAN pipeline fine-tuned on self-supervised MAEs. Enhances Chandrayaan-2 lunar PSRs by 40% SNR improvement (+86 dB). Handles multi-modal fusion of OHRC, DFSAR, CLASS, and IIRS data via GDAL/Rasterio.",
    color: "from-gray-700 to-gray-900",
    uiCue: "Lunar PSR Imaging Pipeline",
    span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    link: "https://github.com/TechieSamosa/AETHER"
  },
  {
    id: "synapse",
    title: "Synapse.cpp",
    icon: <Cpu size={32} className="text-neon-cyan" />,
    stats: "MLP engine, zero external libs, C++17 RAII. Features: Adam/SGD, Xavier/He init, Backprop, Bias-corrected moments. Validated on XOR, Circle, Sine, Blobs.",
    color: "from-blue-900 to-space-900",
    uiCue: "Terminal Compiling...",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    link: "https://github.com/TechieSamosa/Synapse.cpp"
  },
  {
    id: "bdh",
    title: "BDH-Ablations",
    icon: <Dna size={32} className="text-neon-purple" />,
    stats: "5-variant dual-circuit SSM ablation on WikiText-2. Multiplicative gating (+0.059 nats loss). 4x latent compression (-0.052 nats).",
    color: "from-purple-900 to-space-900",
    uiCue: "Neuron Firing Node",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    link: "https://github.com/TechieSamosa/BDH-Ablations"
  },
  {
    id: "nexus",
    title: "Nexus Scout",
    icon: <Bot size={32} className="text-green-400" />,
    stats: "LangGraph orchestrator. Hybrid score: (0.6 * technical match) + (0.4 * satisfaction). Deterministic multi-agent talent evaluation bypassing API limits via batch-chunking.",
    color: "from-green-900/50 to-space-900",
    uiCue: "Agent Graph Visualizer",
    span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    link: "https://nexus-scout-catalyst.streamlit.app/"
  },
  {
    id: "agrisat",
    title: "AgriSat AI",
    icon: <Satellite size={32} className="text-yellow-400" />,
    stats: "Distributed Spark ETL. Ensemble soft-voting (RF, GBM, SVM) for >90% crop health accuracy. Processing multi-spectral GeoTIFFs on MinIO/S3.",
    color: "from-yellow-900/50 to-space-900",
    uiCue: "Multispectral Layer Switcher",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    link: "https://agrisatai.streamlit.app/"
  },
  {
    id: "doctor",
    title: "Dr DiagnoSense",
    icon: <Cross size={32} className="text-red-400" />,
    stats: "Healthcare NLP healthcare assistant, recognized by Intel/NITI Aayog.",
    color: "from-red-900/50 to-space-900",
    uiCue: "Retro Health Monitor",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  },
];

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="bento" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">The Laboratory</h2>
          <p className="text-gray-400 font-mono">High-density asymmetric project grid.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(240px,auto)]">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={project.span}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glarePosition="all"
                className="w-full h-full"
              >
                <div 
                  onClick={() => setSelectedProject(project)}
                  className={`w-full h-full rounded-2xl border border-space-700 bg-gradient-to-br ${project.color} p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden glass-panel aura-halo`}
                >
                  {/* Subtle grain texture over card */}
                  <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-30 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="p-3 bg-space-900/50 rounded-lg backdrop-blur-sm border border-white/5">
                      {project.icon}
                    </div>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs font-mono bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/40 hover:text-white px-3 py-1.5 rounded transition-colors flex items-center border border-neon-purple/30 z-20">
                        <ExternalLink size={12} className="mr-1" /> {project.link.includes('streamlit') ? 'Live Demo' : 'GitHub'}
                      </a>
                    ) : (
                      <span className="text-xs font-mono bg-space-900/80 px-2 py-1 rounded text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to expand
                      </span>
                    )}
                  </div>
                  
                  <div className="relative z-10 mt-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-base text-gray-300 line-clamp-3 mb-4">{project.stats}</p>
                    <div className="inline-flex flex-wrap gap-2 items-center text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-1.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                      <span>{project.uiCue}</span>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-space-800 border border-space-600 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative"
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-space-900 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className={`h-32 bg-gradient-to-br ${selectedProject.color} p-6 flex items-end`}>
              {selectedProject.icon}
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
              <div className="text-neon-cyan font-mono text-sm mb-6 flex items-center justify-between">
                 <div className="flex items-center">
                   <span className="w-2 h-2 rounded-full bg-neon-cyan mr-2"></span>
                   {selectedProject.uiCue}
                 </div>
                 {selectedProject.link && (
                   <a href={selectedProject.link} target="_blank" rel="noreferrer" className="flex items-center text-neon-purple hover:text-white transition-colors bg-space-900 px-3 py-1 rounded border border-space-700">
                     <ExternalLink size={14} className="mr-2" /> View Source
                   </a>
                 )}
              </div>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">{selectedProject.stats}</p>
                
                {selectedProject.id === "bdh" && (
                  <div className="space-y-6 mt-6">
                    <div className="p-4 bg-space-900 rounded-lg border border-space-700">
                      <h4 className="font-mono text-white mb-4 flex items-center"><span className="w-2 h-2 rounded-full bg-neon-cyan mr-2"></span> Training Loss Trajectories</h4>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={bdhLineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1b4b" />
                            <XAxis dataKey="step" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" domain={['auto', 'auto']} />
                            <Tooltip contentStyle={{ backgroundColor: '#12111d', border: '1px solid #1e1b4b' }} />
                            <Legend />
                            <Line type="monotone" dataKey="Transformer" stroke="#9ca3af" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="BDH Base" stroke="#00f2fe" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="BDH-NoMul" stroke="#ef4444" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="BDH-LowDim" stroke="#22c55e" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProject.id === "nexus" && (
                  <div className="p-6 bg-space-900 rounded-lg border border-space-700 mt-6">
                    <h4 className="font-mono text-white mb-6 flex items-center"><span className="w-2 h-2 rounded-full bg-neon-purple mr-2 animate-pulse"></span> Multi-Agent Orchestration Architecture</h4>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-space-800 border border-neon-cyan/50 text-neon-cyan px-6 py-2 rounded-lg font-mono text-sm">Supervisor Agent (LangGraph)</div>
                      <div className="h-6 border-l-2 border-dashed border-space-600"></div>
                      <div className="flex space-x-4 w-full justify-center">
                        <div className="h-10 border-t-2 border-dashed border-space-600 w-1/2 mt-3 absolute"></div>
                        <div className="bg-space-800 border border-space-600 px-4 py-2 rounded-lg text-center z-10 w-1/3">
                          <span className="text-xs text-gray-400 block mb-1">Node 1</span>
                          <span className="text-sm font-bold text-white">Technical Reviewer</span>
                        </div>
                        <div className="bg-space-800 border border-space-600 px-4 py-2 rounded-lg text-center z-10 w-1/3">
                          <span className="text-xs text-gray-400 block mb-1">Node 2</span>
                          <span className="text-sm font-bold text-white">Culture Fit Analyst</span>
                        </div>
                        <div className="bg-space-800 border border-space-600 px-4 py-2 rounded-lg text-center z-10 w-1/3">
                          <span className="text-xs text-gray-400 block mb-1">Node 3</span>
                          <span className="text-sm font-bold text-white">Coding Assessor</span>
                        </div>
                      </div>
                      <div className="h-6 border-l-2 border-dashed border-space-600"></div>
                      <div className="bg-neon-purple/20 border border-neon-purple text-white px-6 py-2 rounded-lg font-mono text-sm flex items-center">
                        <span className="mr-2">Aggregator / Scorer Node</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProject.id === "aether" && (
                  <div className="p-6 bg-space-900 rounded-lg border border-space-700 mt-6">
                    <h4 className="font-mono text-white mb-6 flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span> High-Level Design (HLD) Pipeline</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-space-800 border border-space-600 p-4 rounded-lg flex flex-col items-center text-center">
                        <Database size={24} className="text-gray-400 mb-2" />
                        <span className="text-sm font-bold text-white">Multi-modal Input</span>
                        <span className="text-xs text-gray-500 mt-1">OHRC, DFSAR, IIRS (GeoTIFF)</span>
                      </div>
                      <div className="flex flex-col items-center justify-center hidden md:flex text-space-600">
                        <span className="text-2xl">→</span>
                      </div>
                      <div className="bg-space-800 border border-neon-cyan/50 p-4 rounded-lg flex flex-col items-center text-center shadow-[0_0_15px_rgba(0,242,254,0.1)]">
                        <Network size={24} className="text-neon-cyan mb-2" />
                        <span className="text-sm font-bold text-white">U-Net Generator (MAE)</span>
                        <span className="text-xs text-gray-500 mt-1">Self-Supervised Fine-Tuning</span>
                      </div>
                      <div className="flex flex-col items-center justify-center hidden md:flex text-space-600">
                        <span className="text-2xl">→</span>
                      </div>
                      <div className="bg-space-800 border border-neon-purple/50 p-4 rounded-lg flex flex-col items-center text-center shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                        <Target size={24} className="text-neon-purple mb-2" />
                        <span className="text-sm font-bold text-white">Enhanced Output</span>
                        <span className="text-xs text-gray-500 mt-1">+86 dB SNR PSR Imagery</span>
                      </div>
                    </div>
                    <div className="mt-4 text-xs font-mono text-gray-500 text-center">Reference: AETHER/Journal and Reports/REPORT.pdf</div>
                  </div>
                )}

                {!["bdh", "nexus", "aether"].includes(selectedProject.id) && (
                  <div className="p-4 bg-space-900 rounded-lg border border-space-700 mt-6">
                    <h4 className="font-mono text-white mb-2">System Logs</h4>
                    <p className="text-sm text-gray-400">Architecture diagrams and full module documentation are available in the repository source code.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
