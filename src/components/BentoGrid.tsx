"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Tilt from "react-parallax-tilt";
import { Moon, Cpu, Dna, Bot, Satellite, Rocket, Cross, X, ExternalLink, Database, Network, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import MermaidDiagram from "./MermaidDiagram";

const nexusMermaid = `graph TD
    A[👤 User Inputs JD] -->|Parsed Text| B{💾 LangGraph State Manager}
    
    subgraph Multi-Agent Orchestration
        B -->|Injects Resumes in Chunks of 5| C[🕵️‍♂️ Scout Node]
        C -->|Outputs Match/Interest JSON| D[🔀 Decision Router]
        D -->|Filters Only Top 3 Candidates| E[🤝 Negotiator Node]
        E -->|Reads Hidden Satisfaction Data| F[✉️ Drafts Personalized Outreach]
    end

    subgraph Data & Inference Layer
        DB[(Deccan AI Mock DB: 30 Profiles)] -.->|Candidate Feed| B
        C ===|Batch Inference| LLM((Groq API: Llama-3.3-70b))
        E ===|Zero-Shot Generation| LLM
    end

    F -->|Final Payload| G[🖥️ Streamlit Command Center UI]
    
    classDef node fill:#1e1b4b,stroke:#00f2fe,stroke-width:2px,color:#fff;
    classDef state fill:#312e81,stroke:#6366f1,stroke-width:2px,color:#fff;
    class A,G action;
    class B state;
    class C,D,E node;`;

const agrisatMermaid = `graph LR
    subgraph "1. Cloud Storage (MinIO/S3)"
        C["raw/ bucket"]
        D["processed/ bucket"]
        E["models/ bucket"]
    end

    subgraph "2. PySpark ETL Pipeline"
        F["Extract"]
        G["Transform (NDVI, Features)"]
        H["Load (Parquet/CSV)"]
    end

    subgraph "3. scikit-learn ML"
        I["Ensemble Classifier (Health)"]
        J["RF Regressor (Yield)"]
    end

    subgraph "4. Streamlit Dashboard"
        K["Interactive Map"]
        L["Model Metrics"]
    end

    C --> F --> G --> H --> D
    D --> I & J --> E
    D & E --> K & L`;

const bdhMermaid = `graph TD
    Input[Token Input: idx] --> Embed[Token Embedding E]
    Embed --> LN1[Layer Norm]
    
    subgraph BDH_Layer ["BDH Layer (Repeated L = 6 times)"]
        LN1 --> EncPrimal[Primal Encoder W_enc]
        EncPrimal --> ReLUPrimal["Primal Activation: ReLU(·)"]
        
        ReLUPrimal --> Attn["Causal Softmax Attention <br> Q = K = xs, V = x"]
        LN1 --> Attn
        
        Attn --> LN2[Layer Norm]
        LN2 --> EncDual[Dual Encoder W_enc_v]
        EncDual --> ReLUDual["Dual Activation: ReLU(·)"]
        
        ReLUPrimal -- xs --> Gate{{"Multiplicative Gate (xs ⊙ ys)"}}
        ReLUDual -- ys --> Gate
        
        Gate --> Drop[Dropout p=0.1]
        Drop --> Dec[Decoder W_dec]
        Dec --> LN3[Layer Norm]
        
        LN1 -- Residual Skip --x LN4[Layer Norm]
        LN3 --> LN4
    end
    
    LN4 --> LMHead[LM Head: Linear]
    LMHead --> Logits[Output Logits]`;

interface Project {
  id: string;
  title: string;
  icon: React.ReactNode;
  hook: string;
  stats: string;
  color: string;
  uiCue: string;
  span: string;
  githubUrl?: string;
  liveUrl?: string;
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
    hook: "Revealing the Moon’s Darkest Secrets: We use AI to enhance images of the Moon's permanently shadowed regions—areas that haven't seen sunlight for billions of years—helping scientists find water ice and safe landing sites using Chandrayaan-2 data.",
    stats: "Project AETHER: Lunar PSR Imaging Pipeline. Deep learning GAN pipeline fine-tuned on self-supervised MAEs. Enhances Chandrayaan-2 lunar PSRs by 40% SNR improvement (+86 dB). Handles multi-modal fusion of OHRC, DFSAR, CLASS, and IIRS data via GDAL/Rasterio.",
    color: "from-gray-700 to-gray-900",
    uiCue: "Lunar PSR Imaging Pipeline",
    span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    githubUrl: "https://github.com/TechieSamosa/AETHER"
  },
  {
    id: "synapse",
    title: "Synapse.cpp",
    icon: <Cpu size={32} className="text-neon-cyan" />,
    hook: "Neural Networks, From Scratch: A deep dive into the brain of AI. I built a Multi-Layer Perceptron using only C++ and pure mathematics, proving that you don't need external libraries to understand how machines learn.",
    stats: "Synapse.cpp: MLP Engine from Scratch. Pure C++17 implementation (RAII, Adam/SGD, Xavier/He Init). Full forward/backward pass, dropout, and gradient clipping with zero external dependencies. Validated across 4 benchmarks (XOR, Circle, Sine, 3-class Blobs).",
    color: "from-blue-900 to-space-900",
    uiCue: "Terminal Compiling...",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    githubUrl: "https://github.com/TechieSamosa/Synapse.cpp"
  },
  {
    id: "bdh",
    title: "BDH-Ablations",
    icon: <Dna size={32} className="text-neon-purple" />,
    hook: "Understanding AI’s \"Dragon Hatchling\": A research study that pulls apart a new, biologically-inspired AI model to see which components are essential for \"thinking\" and which can be optimized away.",
    stats: "BDH Ablations: Bio-Inspired Dual-Circuit Language Model. A controlled 5-variant ablation study of a dual-circuit State-Space Model on byte-level WikiText-2. Identified multiplicative gating as the critical component (+0.059 nats loss on removal). Secured -0.052 nats perplexity gain with 4x latent compression.",
    color: "from-purple-900 to-space-900",
    uiCue: "Neuron Firing Node",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    githubUrl: "https://github.com/TechieSamosa/BDH-Ablations"
  },
  {
    id: "nexus",
    title: "Nexus Scout",
    icon: <Bot size={32} className="text-green-400" />,
    hook: "The Smart Recruiter: An AI-powered talent scout that autonomously processes hundreds of resumes to find the perfect technical and personality fit, saving recruiters hours of manual work.",
    stats: "Nexus Scout: Multi-Agent Talent Acquisition Pipeline. Deterministic LangGraph pipeline with a weighted hybrid scoring engine (60% technical fit, 40% interest alignment). Utilizes batch-chunking inference to bypass API limits and Pydantic for strict JSON routing.",
    color: "from-green-900/50 to-space-900",
    uiCue: "Agent Graph Visualizer",
    span: "col-span-1 md:col-span-2 lg:col-span-2 row-span-1",
    githubUrl: "https://github.com/TechieSamosa/NexusScout",
    liveUrl: "https://nexus-scout-catalyst.streamlit.app/"
  },
  {
    id: "agrisat",
    title: "AgriSat AI",
    icon: <Satellite size={32} className="text-yellow-400" />,
    hook: "Space-Age Farming: A satellite-based health monitor for crops. By analyzing light patterns from space, we can predict crop health and forecast yields, helping farmers make data-driven decisions.",
    stats: "AgriSat AI: Distributed ETL & Predictive Analytics. Distributed Apache Spark/PySpark pipeline on AWS S3/MinIO. Achieved 92%+ crop-health classification accuracy with a soft-voting ensemble (Random Forest, GBM, SVM). Extracts NDVI/EVI spectral features.",
    color: "from-yellow-900/50 to-space-900",
    uiCue: "Multispectral Layer Switcher",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    githubUrl: "https://github.com/TechieSamosa/AgriSatAI",
    liveUrl: "https://agrisatai.streamlit.app/"
  },
  {
    id: "pslv",
    title: "PSLV Telemetry Analysis",
    icon: <Rocket size={32} className="text-orange-400" />,
    hook: "AI for Rocket Science: Ensuring the safety of rocket launches by analyzing the strength of communication signals and predicting potential disruptions from the rocket's exhaust flames.",
    stats: "PSLV Telemetry Signal Integrity and Predictive Analysis. Developed AI-driven predictive models to analyse PSLV telemetry data, improving anomaly detection and enhancing flight safety protocols. Applied advanced radar signal processing and SNR-based comparisons.",
    color: "from-orange-900/50 to-space-900",
    uiCue: "Radar Signal Processing",
    span: "col-span-1 md:col-span-1 lg:col-span-2 row-span-1",
  },
  {
    id: "sentiment",
    title: "Sentiment Analysis Model",
    icon: <Database size={32} className="text-teal-400" />,
    hook: "Understanding Human Emotions in Text: A classic natural language processing project that classifies movie reviews as positive or negative using TF-IDF vectorization and Logistic Regression.",
    stats: "Sentiment Analysis Model. Developed a sentiment analysis model classifying IMDB movie reviews as positive or negative. Preprocessed text data and employed a TF-IDF vectorizer to train a logistic regression model. Extended to a web interface using Flask.",
    color: "from-teal-900/50 to-space-900",
    uiCue: "Text Classification",
    span: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
  }
];

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="bento" className={`py-24 px-6 relative ${selectedProject ? 'z-50' : 'z-10'}`}>
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
                perspective={1000}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glarePosition="all"
                className="w-full h-full transform-style-3d"
              >
                <motion.div 
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ y: -6, boxShadow: "0px 0px 25px rgba(0,242,254,0.4)", transition: { type: "spring", stiffness: 250, damping: 20 } }}
                  className={`w-full h-full rounded-2xl border border-space-700 bg-gradient-to-br ${project.color} p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden glass-panel aura-halo animate-wave will-change-transform`}
                >
                  {/* Subtle grain texture over card */}
                  <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-30 pointer-events-none"></div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="p-3 bg-space-900/50 rounded-lg backdrop-blur-sm border border-white/5">
                      {project.icon}
                    </div>
                    {(project.liveUrl || project.githubUrl) ? (
                      <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-xs font-mono bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/40 hover:text-white px-3 py-1.5 rounded transition-colors flex items-center border border-neon-purple/30 z-20">
                        <ExternalLink size={12} className="mr-1" /> {project.liveUrl ? 'Live Demo' : 'GitHub'}
                      </a>
                    ) : (
                      <span className="text-xs font-mono bg-space-900/80 px-2 py-1 rounded text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to expand
                      </span>
                    )}
                  </div>
                  
                  <div className="relative z-10 mt-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-base text-gray-300 line-clamp-3 mb-4">{project.hook}</p>
                    <div className="inline-flex flex-wrap gap-2 items-center text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-1.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span>
                      <span>{project.uiCue}</span>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-space-800 border border-space-600 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-space-900 rounded-full text-gray-400 hover:text-white transition-colors z-50 shadow-lg"
            >
              <X size={20} />
            </button>
            
            <div className={`h-32 bg-gradient-to-br ${selectedProject.color} p-6 flex items-end`}>
              {selectedProject.icon}
            </div>
            
            <div className="p-8">
              {/* Header (The Hook) */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-lg text-gray-200 leading-relaxed italic border-l-4 border-neon-cyan pl-4 bg-space-900/50 py-3 rounded-r-lg">{selectedProject.hook}</p>
              </div>

              {/* Divider */}
              <hr className="border-neon-cyan/30 my-6" />

              {/* Body (Technical Deep Dive) */}
              <div className="space-y-6 text-gray-300">
                <div className="text-md leading-relaxed font-mono whitespace-pre-wrap bg-space-900/40 p-5 rounded-lg border border-space-700">{selectedProject.stats}</div>
                
                {/* Actionables */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="inline-flex items-center text-neon-cyan font-mono text-sm px-4 py-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/10">
                    <span className="w-2 h-2 rounded-full bg-neon-cyan mr-2 animate-pulse"></span>
                    {selectedProject.uiCue}
                  </div>
                  <div className="flex space-x-4">
                    {selectedProject.githubUrl && (
                      <motion.a 
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        whileHover={{ y: -8, boxShadow: "0px 0px 25px rgba(255,255,255,0.4)", transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        className="flex items-center font-bold text-white bg-space-800 px-6 py-2 rounded-lg border border-space-600 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                        Source Code
                      </motion.a>
                    )}
                    {selectedProject.liveUrl && (
                      <motion.a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        whileHover={{ y: -8, boxShadow: "0px 0px 25px rgba(0,242,254,0.8)", transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        className="flex items-center font-bold text-black bg-neon-cyan px-6 py-2 rounded-lg border border-neon-cyan/50 shadow-[0_0_10px_rgba(0,242,254,0.2)]"
                      >
                        <ExternalLink size={16} className="mr-2" /> Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
                {selectedProject.id === "bdh" && (
                  <div className="space-y-6 mt-6">
                    <div className="p-4 bg-space-900 rounded-lg border border-space-700">
                      <h4 className="font-mono text-white mb-4 flex items-center"><span className="w-2 h-2 rounded-full bg-neon-cyan mr-2"></span> BDH Architecture Forward Pass</h4>
                      <div className="w-full bg-space-800 rounded-lg p-2 border border-space-600 mb-6">
                        <MermaidDiagram chart={bdhMermaid} />
                      </div>
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
                    <div className="w-full bg-space-800 rounded-lg p-2 border border-space-600">
                      <MermaidDiagram chart={nexusMermaid} />
                    </div>
                  </div>
                )}



                {selectedProject.id === "agrisat" && (
                  <div className="p-6 bg-space-900 rounded-lg border border-space-700 mt-6">
                    <h4 className="font-mono text-white mb-6 flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span> Distributed Spark ETL Architecture</h4>
                    <div className="w-full bg-space-800 rounded-lg p-2 border border-space-600">
                      <MermaidDiagram chart={agrisatMermaid} />
                    </div>
                  </div>
                )}

                {selectedProject.id === "synapse" && (
                  <div className="p-6 bg-space-900 rounded-lg border border-space-700 mt-6">
                    <h4 className="font-mono text-white mb-6 flex items-center"><span className="w-2 h-2 rounded-full bg-neon-cyan mr-2 animate-pulse"></span> Synapse.cpp MLP Architecture</h4>
                    <div className="w-full bg-space-800 rounded-lg p-2 border border-space-600 flex justify-center">
                      <img src="https://raw.githubusercontent.com/TechieSamosa/Synapse.cpp/main/assets/mlp_architecture.png" alt="MLP Architecture Diagram" className="max-w-full rounded-lg bg-white/5" />
                    </div>
                    <div className="mt-6 p-3 bg-black/50 rounded border border-space-700 font-mono text-xs text-green-400">
                      $ make build<br/>
                      $ ./synapse_train --dataset=xor --epochs=1000<br/>
                      [Epoch 1000] Loss: 0.0014 | Accuracy: 100.0%
                    </div>
                  </div>
                )}

                {!["bdh", "nexus", "aether", "agrisat", "synapse"].includes(selectedProject.id) && (
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
