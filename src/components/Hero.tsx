"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FileText, ExternalLink, Coffee, Download, X } from "lucide-react";
import { useEffect, useState } from "react";

const titles = [
  "Aditya Khamitkar",
  "Data Scientist",
  "AI/ML Engineer",
  "Generative AI",
  "Data Engineer",
  "ML Engineer",
  "Full Stack AI Engineer",
  "Researcher"
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const resumeLinks = [
    { name: "General Resume (resume 92)", path: "/resumes/cv-general.pdf" },
    { name: "CV", path: "/resumes/cv.pdf" },
    { name: "Full CV", path: "/resumes/cv-full.pdf" },
    { name: "CV for USA", path: "/resumes/cv-usa.pdf" },
    { name: "CV Europass", path: "/resumes/cv-europass.pdf" },
    { name: "CV for Germany", path: "/resumes/cv-germany.pdf" },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        if (displayText === "") {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, displayText.length + 1));
        if (displayText === currentTitle) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section className={`relative min-h-screen flex items-center pt-20 px-6 overflow-hidden ${showResumeModal ? 'z-50' : 'z-10'}`}>
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 bg-space-800/50 border border-space-700 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
            </span>
            <span className="text-base font-mono text-gray-300">System Online // Aditya Khamitkar</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-white">The</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple mt-2 min-h-[120px] md:min-h-[80px] leading-tight">
                {displayText}
                <span className="animate-pulse text-white">_</span>
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-lg font-mono">
              &quot;Bridging the gap between low-level C++ systems and high-stakes agentic AI deployments.&quot;
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a
              href="https://github.com/TechieSamosa"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 0px 25px rgba(255,255,255,0.4)", transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-space-800 border border-space-700 text-white px-5 py-3 rounded-md font-mono transition-colors duration-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
              <span>GitHub</span>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/aditya-khamitkar-128a30283/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 0px 25px rgba(10,102,194,0.6)", transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-[#0a66c2]/10 border border-[#0a66c2] text-[#0a66c2] px-5 py-3 rounded-md font-mono transition-colors duration-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href="https://www.kaggle.com/adityakhamitkar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 0px 25px rgba(32,190,255,0.6)", transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-[#20beff]/10 border border-[#20beff] text-[#20beff] px-5 py-3 rounded-md font-mono transition-colors duration-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.34-.246.526-.246h3.37c.142 0 .223.054.246.164.022.11-.023.197-.139.26l-5.26 5.176 5.86 9.61c.141.188.164.341.071.458z"/></svg>
              <span>Kaggle</span>
            </motion.a>
            
            <motion.button
              onClick={() => setShowResumeModal(true)}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 0px 25px rgba(139,92,246,0.6)", transition: { type: "spring", stiffness: 400, damping: 10 } }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-neon-purple/10 border border-neon-purple text-neon-purple px-6 py-3 rounded-md font-mono transition-colors duration-100"
            >
              <FileText size={18} />
              <span>Decrypt Resume</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - Terminal & Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Terminal Window */}
          <div className="bg-space-800/80 backdrop-blur-md rounded-lg border border-space-700 overflow-hidden shadow-2xl shadow-neon-purple/20">
            <div className="flex items-center justify-between px-4 py-3 border-b border-space-700 bg-space-900/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono flex items-center">
                <Terminal size={14} className="mr-2" /> nexus_terminal_v2.exe
              </div>
              <div className="w-12"></div> {/* Spacer for symmetry */}
            </div>
            
            <div className="p-6 font-mono text-sm text-gray-300 min-h-[300px] relative">
              <p><span className="text-neon-purple">root@nexus</span>:<span className="text-neon-cyan">~</span>$ ./init_protocol.sh</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-2 text-gray-400"
              >
                [+] Initializing neural pathways... OK
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-1 text-gray-400"
              >
                [+] Loading model weights... OK
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-1 text-neon-cyan"
              >
                [+] Aditya Khamitkar instance successfully deployed.
              </motion.p>

              {/* Avatar Graphic Placeholder */}
              <div className="absolute bottom-6 right-6 flex items-end">
                <div className="relative">
                  {/* Moka Pot / Coffee */}
                  <div className="absolute -left-12 bottom-0 text-gray-400 flex flex-col items-center">
                    <motion.div
                      animate={{ y: [0, -10, -20], opacity: [0, 0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="text-white text-xs mb-1"
                    >
                      ~
                    </motion.div>
                    <Coffee size={32} className="text-orange-900/80 fill-orange-950" />
                  </div>
                  
                  {/* Avatar Body placeholder (A glowing tech cube for now, or just an icon) */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-24 h-24 bg-gradient-to-tr from-neon-purple to-neon-cyan rounded-2xl shadow-lg flex items-center justify-center border border-white/20"
                  >
                    <div className="w-16 h-16 bg-space-900 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">👨‍💻</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative floating elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 -right-10 w-32 h-32 border border-neon-cyan/20 rounded-full border-dashed pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-space-900/80 backdrop-blur-sm"
              onClick={() => setShowResumeModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-space-800 border border-space-700 rounded-xl shadow-2xl shadow-neon-purple/20 overflow-hidden z-10"
            >
              <div className="p-6 border-b border-space-700 flex items-center justify-between bg-space-900/50">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FileText className="mr-3 text-neon-purple" />
                  Select File Profile
                </h3>
                <button 
                  onClick={() => setShowResumeModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {resumeLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-space-900 border border-space-700 hover:border-neon-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all group"
                  >
                    <span className="text-gray-300 font-mono text-sm group-hover:text-neon-purple transition-colors">
                      {link.name}
                    </span>
                    <Download size={18} className="text-gray-500 group-hover:text-neon-cyan transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
