"use client";

import { motion } from "framer-motion";
import { Terminal, FileText, ExternalLink, Coffee } from "lucide-react";
import { useEffect, useState } from "react";

const titles = [
  "Data Scientist",
  "ML Engineer",
  "Full Stack AI Engineer",
  "Data Engineer",
  "Researcher",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 z-10 px-6">
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
              href="#bento"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 242, 254, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan px-6 py-3 rounded-md font-mono transition-all"
            >
              <ExternalLink size={18} />
              <span>Launch Demos</span>
            </motion.a>
            
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-neon-purple/10 border border-neon-purple text-neon-purple px-6 py-3 rounded-md font-mono transition-all"
            >
              <FileText size={18} />
              <span>Decrypt Resume</span>
            </motion.a>

            <motion.a
              href="https://github.com/TechieSamosa"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-space-800 border border-space-700 text-white px-6 py-3 rounded-md font-mono transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
              <span>Warp to GitHub</span>
            </motion.a>
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
    </section>
  );
}
