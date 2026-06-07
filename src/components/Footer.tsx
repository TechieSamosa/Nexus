"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Terminal as TerminalIcon, Send, MapPin, Mail } from "lucide-react";

export default function Footer() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showTerminal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTerminal]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newOutput = [...output, `> ${cmd}`];

    if (cmd === "help") {
      newOutput.push("AVAILABLE COMMANDS:");
      newOutput.push("  whoami          Display identity and hobbies");
      newOutput.push("  hobbies         Display personal interests");
      newOutput.push("  heavy-lift      Show previous gym stats");
      newOutput.push("  deadlift_pr     Show current deadlift PR");
      newOutput.push("  moka-pot        Show previous coffee notes");
      newOutput.push("  moka_pot_notes  Show coffee bean estate preferences");
      newOutput.push("  clear           Clear terminal");
    } else if (cmd === "whoami" || cmd === "hobbies") {
      newOutput.push("SYSTEM LOG: Identity Verified.");
      newOutput.push("HOBBIES & INTERESTS:");
      newOutput.push("- Swimming (South Zone Swimmer) & Gymming");
      newOutput.push("- Archery (State Level Archer)");
      newOutput.push("- Postcrossing & Philately");
      newOutput.push("- Horology & Numismatics (Collecting automatic watches and old global coins)");
      newOutput.push("- Pen Enthusiast (I like pens, specifically Pilot Metropolitan)");
      newOutput.push("- Gaming (RDR 2 & others)");
      newOutput.push("- Actively learning Golf and Tennis");
    } else if (cmd === "heavy-lift") {
      newOutput.push("SYSTEM LOG: Last recorded 1RM - 180kg. Status: In Training.");
    } else if (cmd === "deadlift_pr") {
      newOutput.push("SYSTEM LOG: Current Deadlift PR - 200kg (440 lbs). Target: 220kg by Q4.");
    } else if (cmd === "moka-pot") {
      newOutput.push("SYSTEM LOG: Current Bean - Ethiopian Yirgacheffe, Light Roast. Ratio 1:15.");
    } else if (cmd === "moka_pot_notes") {
      newOutput.push("SYSTEM LOG: Favorite Estate - Blue Tokai Attikan Estate. Dark Roast, 18g dose, 40g yield. Notes: Dark chocolate, figs, roasted nuts.");
    } else if (cmd === "sudo" || cmd === "sudo su") {
      newOutput.push("nice try. this incident will be reported.");
    } else if (cmd === "rm -rf /") {
      newOutput.push("Permission denied. Nice try though :)");
    } else if (cmd === "matrix") {
      newOutput.push("Wake up, Neo... The Matrix has you.");
    } else if (cmd === "clear") {
      setOutput([]);
      setInput("");
      return;
    } else {
      newOutput.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }
    setOutput(newOutput);
    setInput("");
  };

  return (
    <footer className="relative bg-space-900 border-t border-space-700 pt-16 pb-8 overflow-hidden z-20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Placement Alert Banner */}
        <div className="mb-16 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border border-space-600 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_0_30px_rgba(139,92,246,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-50"></div>
          <div className="relative z-10 mb-4 md:mb-0">
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center mb-2">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-3 shadow-[0_0_10px_#22c55e]"></span>
              Open for Placement (2026/2027)
            </h3>
            <p className="text-gray-300 font-mono text-sm max-w-2xl">
              Currently seeking a 10-to-11-month industry placement or Master&apos;s Thesis opportunity starting June/July 2026 in AI/ML, MLOps, or Systems Engineering.
            </p>
          </div>
          <motion.a
            href="mailto:adityasachinkhamitkar@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 bg-white text-space-900 px-6 py-3 rounded-lg font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all flex items-center whitespace-nowrap"
          >
            <Mail className="mr-2" size={18} /> Establish Uplink
          </motion.a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-space-700/50 pt-8 mt-8">
          <div className="flex items-center mb-4 md:mb-0 space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan flex items-center justify-center text-white font-bold text-sm">
              AK
            </div>
            <span className="font-mono text-gray-400 text-sm">© {new Date().getFullYear()} Aditya Khamitkar. All systems functional.</span>
          </div>
          
          <div className="flex space-x-6 text-gray-400">
            <a href="https://github.com/TechieSamosa" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg></a>
            <a href="https://linkedin.com/in/adityakhamitkar" target="_blank" rel="noopener noreferrer" className="hover:text-neon-purple transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
            <a href="#" className="hover:text-white transition-colors"><MapPin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-6 z-50">
        <motion.button
          whileHover={{ rotate: 15, scale: 1.1 }}
          onClick={() => setShowTerminal(!showTerminal)}
          className="text-space-600 hover:text-neon-purple transition-colors p-4 bg-space-800/80 rounded-full border border-space-700 shadow-lg"
          title="Inspect the Pilot Metropolitan"
        >
          <PenTool size={36} />
        </motion.button>
      </div>

      {/* Hidden Terminal Modal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 bg-space-900 border border-neon-purple/50 rounded-lg shadow-[0_0_30px_rgba(139,92,246,0.2)] overflow-hidden z-50"
          >
            <div className="bg-space-800 px-3 py-2 flex items-center justify-between border-b border-space-700">
              <div className="flex items-center text-xs font-mono text-gray-400">
                <TerminalIcon size={12} className="mr-2 text-neon-purple" />
                secret_shell.exe
              </div>
              <button onClick={() => setShowTerminal(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            
            <div className="p-4 h-80 overflow-y-auto font-mono text-sm md:text-base text-green-400 flex flex-col custom-scrollbar" onClick={() => inputRef.current?.focus()}>
              <div className="mb-2 text-gray-400">
                Nexus Terminal v2.0<br/>
                Type 'help' to see available commands.
              </div>
              
              {output.map((line, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap">
                  <span className={line.startsWith("$") ? "text-white" : "text-neon-cyan"}>
                    {line}
                  </span>
                </div>
              ))}
              
              <form 
                onSubmit={handleCommand} 
                className="mt-2 flex items-center text-white"
              >
                <span className="text-neon-purple mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCommand(e);
                    }
                  }}
                  className="bg-transparent border-none outline-none flex-1 text-white shadow-none focus:ring-0"
                  autoComplete="off"
                  spellCheck="false"
                />
                <button type="submit" className="hidden" aria-hidden="true">Submit</button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
