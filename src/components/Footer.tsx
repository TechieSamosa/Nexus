"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Send, MapPin, Mail } from "lucide-react";
import GradientDescentGame from "./GradientDescentGame";

export default function Footer() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [msgName, setMsgName] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgBody, setMsgBody] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${msgName}`);
    const body = encodeURIComponent(`${msgBody}\n\nFrom: ${msgEmail}`);
    window.location.href = `mailto:adityasachinkhamitkar@gmail.com?subject=${subject}&body=${body}`;
    setShowMessageModal(false);
    setMsgName("");
    setMsgEmail("");
    setMsgBody("");
  };

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
      newOutput.push("  whoami          Display identity and bio");
      newOutput.push("  gym             Show physical metrics");
      newOutput.push("  coffee          Show coffee brewing status");
      newOutput.push("  jarvis          Initialize J.A.R.V.I.S.");
      newOutput.push("  ironman         Stark quote");
      newOutput.push("  play            Launch Gradient Descent Lander mini-game");
      newOutput.push("  sudo            Elevate privileges");
      newOutput.push("  clear           Clear terminal");
    } else if (cmd === "whoami") {
      newOutput.push("SYSTEM LOG: Identity Verified.");
      newOutput.push("Aditya Khamitkar - AI & ML Engineer, Deep Learning Researcher.");
      newOutput.push("Passionate about Frontier AI Alignment, Robotics, and elegant code.");
    } else if (cmd === "gym") {
      newOutput.push("Querying physical metrics... Deadlift PR: 200kg (440 lbs). Squat PR: 160kg. Status: Heavy weight, low reps.");
    } else if (cmd === "coffee") {
      newOutput.push("Brewing... Method: Moka Pot. Bean Status: Roasted. No sugar, no milk. Pure fuel.");
    } else if (cmd === "jarvis") {
      newOutput.push("Welcome back, Sir. All neural networks are currently online and functioning at optimal capacity. Ready to engineer some solutions.");
    } else if (cmd === "ironman") {
      newOutput.push("\"Sometimes you gotta run before you can walk.\" - Tony Stark");
    } else if (cmd === "sudo" || cmd === "sudo su") {
      newOutput.push("Nice try. This incident will be reported.");
    } else if (cmd === "play") {
      newOutput.push("Initializing Gradient Descent Simulator...");
      setTimeout(() => setIsGameActive(true), 800);
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
              Open for learning & new opportunities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 relative z-10">
            <motion.button
              onClick={() => setShowMessageModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-space-800 text-white border border-space-600 px-6 py-3 rounded-lg font-bold shadow-[0_0_15px_rgba(0,242,254,0.1)] hover:shadow-[0_0_25px_rgba(0,242,254,0.3)] hover:border-neon-cyan transition-all flex items-center whitespace-nowrap"
            >
              <TerminalIcon className="mr-2" size={18} /> Message Aditya
            </motion.button>
            <motion.a
              href="mailto:adityasachinkhamitkar@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-space-900 px-6 py-3 rounded-lg font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all flex items-center whitespace-nowrap"
            >
              <Mail className="mr-2" size={18} /> Establish Uplink
            </motion.a>
          </div>
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
          <span className="font-mono font-bold text-xl leading-none">&gt;_</span>
        </motion.button>
      </div>

      {/* Hidden Terminal Modal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            drag={!isMobile}
            dragMomentum={false}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed z-50 overflow-hidden bg-space-900/95 backdrop-blur-md border border-neon-cyan/50 rounded-lg shadow-[0_0_40px_rgba(0,242,254,0.2)] 
              ${isMobile ? "bottom-20 left-1/2 -translate-x-1/2 w-[90vw] h-[60vh]" : "bottom-24 right-10 w-[32rem] h-[28rem]"}`}
          >
            {/* Mac UI Header */}
            <div className="bg-space-800/80 px-4 py-3 flex items-center justify-between border-b border-space-700 cursor-grab active:cursor-grabbing">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
              </div>
              <div className="flex items-center text-xs font-mono text-gray-400 select-none">
                <TerminalIcon size={12} className="mr-2 text-neon-cyan" />
                stark_terminal_v10.exe
              </div>
              <button onClick={() => setShowTerminal(false)} className="text-gray-500 hover:text-white transition-colors">✕</button>
            </div>
            
            <div className="relative w-full h-[calc(100%-45px)]">
              {isGameActive ? (
                <GradientDescentGame onExit={() => setIsGameActive(false)} />
              ) : (
                <div className="p-4 h-full overflow-y-auto font-mono text-sm md:text-base text-green-400 flex flex-col custom-scrollbar" onClick={() => inputRef.current?.focus()}>
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
              <div className="mt-4 pb-4"></div>
            </div>
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-space-900/80 backdrop-blur-sm"
              onClick={() => setShowMessageModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-space-800 border border-neon-cyan/50 rounded-xl shadow-2xl shadow-neon-cyan/20 overflow-hidden z-10"
            >
              <div className="p-6 border-b border-space-700 flex items-center justify-between bg-space-900/50">
                <h3 className="text-xl font-bold text-white flex items-center font-mono">
                  <TerminalIcon className="mr-3 text-neon-cyan" />
                  Direct Message
                </h3>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSendMessage} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">NAME</label>
                  <input
                    required
                    type="text"
                    value={msgName}
                    onChange={(e) => setMsgName(e.target.value)}
                    className="w-full bg-space-900 border border-space-600 rounded-md p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">EMAIL</label>
                  <input
                    required
                    type="email"
                    value={msgEmail}
                    onChange={(e) => setMsgEmail(e.target.value)}
                    className="w-full bg-space-900 border border-space-600 rounded-md p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">MESSAGE</label>
                  <textarea
                    required
                    rows={4}
                    value={msgBody}
                    onChange={(e) => setMsgBody(e.target.value)}
                    className="w-full bg-space-900 border border-space-600 rounded-md p-3 text-white focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                    placeholder="Let's build something..."
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-neon-cyan/10 border border-neon-cyan text-neon-cyan font-bold py-3 rounded-md hover:bg-neon-cyan hover:text-space-900 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Transmit Payload</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
