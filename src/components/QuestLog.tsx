"use client";

import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState } from "react";
import { Shield, Map, Target, Briefcase, Rocket, X, Building } from "lucide-react";

interface Quest {
  id: number;
  title: string;
  company: string;
  date: string;
  icon: React.ReactNode;
  summary: string;
  achievements: string[];
  color: string;
}

const quests: Quest[] = [
  {
    id: 1,
    title: "Frontier AI Alignment & Multi-Agent Auditing",
    company: "Deccan AI Experts",
    date: "Jan 2025 - Present",
    icon: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden"><img src="/logos/Deccan AI.jpg" alt="Deccan AI" className="w-full h-full object-contain p-1" /></div>,
    summary: "Frontier AI Alignment & Multi-Agent Auditing",
    achievements: [
      "Accumulated 500+ hours across frontier LLM projects (MAITRIX, Shield, Bluebird, Action Extensions).",
      "On Project MAITRIX, led tool-correctness validation on agentic RL environments by auditing Python implementations against live SQLite seed databases across an 18-tool setup, surfacing logical errors and SQL mismatches.",
      "Engineered structured RLHF evaluation rubrics for structured side-by-side LLM response comparisons (assessing reasoning coherence and factual grounding), improving instruction-following accuracy by 15%.",
      "Performed rigorous EDA and data-quality analysis using Pandas/NumPy to enforce data governance."
    ],
    color: "from-neon-cyan to-blue-600",
  },
  {
    id: 2,
    title: "Data Scientist & AI QA Specialist",
    company: "Mindrift",
    date: "2024 - Present",
    icon: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden"><img src="/logos/Mindrift.jpg" alt="Mindrift" className="w-full h-full object-contain p-1" /></div>,
    summary: "Data Scientist & AI Quality Assurance",
    achievements: [
      "Working as a Data Scientist and AI Quality Assurance specialist. Creating and managing high-tier Human Intelligence Data (HID) to train frontier AI models. Acting as the critical human-in-the-loop for AI alignment, reasoning validation, and rigorous quality assurance."
    ],
    color: "from-blue-400 to-indigo-600",
  },
  {
    id: 3,
    title: "AI and Math Specialist",
    company: "Outlier",
    date: "Jan 2025 - Present",
    icon: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden"><img src="/logos/Outlier.png" alt="Outlier" className="w-full h-full object-contain p-1" /></div>,
    summary: "AI and Math Specialist",
    achievements: [
      "Operating as an AI and Math Specialist. Evaluated and trained advanced AI models on complex mathematical reasoning and problem-solving tasks, providing structured human feedback for iterative model improvement."
    ],
    color: "from-green-500 to-emerald-700",
  },
  {
    id: 4,
    title: "AI Engineering Intern",
    company: "Proton Engineering Consultancy & Services",
    date: "Oct 2025 - Dec 2025",
    icon: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden"><img src="/logos/Proton Engieering.png" alt="Proton Engineering" className="w-full h-full object-contain p-1" /></div>,
    summary: "Automating Engineering Talent Acquisition",
    achievements: [
      "Architected and deployed an AI-driven resume parsing web application utilizing Python, Streamlit, and Plotly.",
      "Leveraged SpaCy NLP pipelines and pdfplumber to automate candidate screening and complex data extraction.",
      "Developed custom scoring and skill-clustering algorithms tailored to specialized EPC industry roles, achieving >90% accuracy in candidate categorization.",
      "Drove significant operational impact by slashing HR manual screening time by 80% (processing 50 resumes in 42 seconds instead of 120 minutes)."
    ],
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 5,
    title: "Data Science and AI/ML Engineering Intern",
    company: "Satish Dhawan Space Centre, Sriharikota Range (SDSC-SHAR), Indian Space Research Organisation (ISRO)",
    date: "Oct 2024 - Nov 2024",
    icon: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden"><img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg" alt="ISRO" className="w-full h-full object-contain p-1" /></div>,
    summary: "AI for Launch Vehicle Telemetry",
    achievements: [
      "Analyzed PSLV/SSLV transponder signals to automate signal-degradation quantification for launch safety protocols.",
      "Developed LSTM-based RNN time-series forecasting models in PyTorch and TensorFlow via Jupyter, serving predictions via FastAPI.",
      "Applied advanced statistical techniques to quantify the exact impact of yaw, pitch, roll angles, Radar Cross Section (RCS), and aspect angle on signal integrity, effectively mitigating real-time atmospheric interference. Reduced manual signal review time by 40%.",
      "Authored 4-5 comprehensive technical reports under the direct mentorship of Mr. Ram Senthil C., Deputy Manager of Mission Computers."
    ],
    color: "from-orange-500 to-red-600",
  },
  {
    id: 6,
    title: "Intel AI 4 Youth Trainee",
    company: "Intel Corporation",
    date: "Mar 2021 - Oct 2021",
    icon: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden"><img src="/logos/Intel-Logo.png" alt="Intel" className="w-full h-full object-contain p-1" /></div>,
    summary: "Healthcare AI for Social Impact",
    achievements: [
      "Selected among the top 125 finalists out of 52,000 participants in a prestigious All India AI problem-solving competition backed by Intel, MeitY, NITI Aayog, and NeGD.",
      "Completed intensive training in Machine Learning and Neural Networks.",
      "Prototyped 'Doctor Bot', a transformer-based NLP virtual healthcare assistant (pre-ChatGPT era).",
      "'Doctor Bot' was officially endorsed by NITI Aayog for public deployment in Uttar Pradesh, recognizing its potential to drastically improve healthcare accessibility."
    ],
    color: "from-neon-purple to-purple-800",
  }
];

export default function QuestLog() {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  return (
    <section className={`py-24 relative px-6 ${selectedQuest ? 'z-50' : 'z-10'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-16">
          <Target className="text-neon-cyan" size={36} />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Quest Log</h2>
          <div className="h-px bg-gradient-to-r from-space-700 to-transparent flex-grow ml-4"></div>
        </div>

        <div className="space-y-12 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] top-8 bottom-8 w-1 bg-space-800 rounded-full hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ height: "100%" }}
            />
          </div>

          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex flex-col md:flex-row gap-8 items-start group"
            >
              {/* Timeline Node */}
              <div className="hidden md:flex flex-col items-center z-10">
                <div className={`w-14 h-14 rounded-full bg-space-900 border-2 border-space-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-neon-cyan transition-colors relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${quest.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">
                    {quest.icon}
                  </span>
                </div>
              </div>

              {/* Quest Card */}
              <Tilt perspective={1000} tiltMaxAngleX={5} tiltMaxAngleY={5} className="flex-1 transform-style-3d">
                <motion.div 
                  onClick={() => setSelectedQuest(quest)}
                  whileHover={{ y: -6, boxShadow: "0px 0px 25px rgba(255,255,255,0.3)", transition: { type: "spring", stiffness: 250, damping: 20 } }}
                  className="w-full h-full glass-panel aura-halo rounded-xl p-6 md:p-8 relative overflow-hidden cursor-pointer animate-wave will-change-transform group"
                >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-50" />
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${quest.color}`} />
                
                <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none scale-150 transform rotate-12">
                   {quest.icon}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-1">Quest {quest.id}: {quest.title}</h3>
                    <p className="text-neon-cyan font-mono text-base">{quest.company}</p>
                  </div>
                  <span className="text-sm font-mono px-3 py-1 bg-space-900 border border-space-700 rounded-full text-gray-400 whitespace-nowrap relative z-10">
                    {quest.date}
                  </span>
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-between">
                  <p className="text-gray-300 text-lg">{quest.summary}</p>
                  <span className="text-neon-purple text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-neon-purple/20 px-2 py-1 rounded">View Data</span>
                </div>
                </motion.div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quest Modal */}
      <AnimatePresence>
        {selectedQuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-space-800 border border-space-600 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedQuest(null)}
                className="absolute top-4 right-4 p-2 bg-space-900 rounded-full text-gray-400 hover:text-white transition-colors z-20"
              >
                <X size={20} />
              </button>
              
              <div className={`h-40 bg-gradient-to-br ${selectedQuest.color} p-8 flex items-end relative overflow-hidden`}>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 scale-150">
                  {selectedQuest.icon}
                </div>
                <div className="relative z-10">
                  <span className="font-mono text-white/80 text-sm mb-2 block">{selectedQuest.date}</span>
                  <h2 className="text-4xl font-bold text-white">{selectedQuest.company}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-neon-cyan mb-6">{selectedQuest.title}</h3>
                
                <div className="space-y-4">
                  {selectedQuest.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start bg-space-900/50 p-4 rounded-lg border border-space-700">
                      <span className="text-neon-purple mr-4 mt-1">
                        <Shield size={18} />
                      </span>
                      <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
