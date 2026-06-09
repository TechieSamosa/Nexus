"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import { useTerminal } from "./TerminalProvider";
import RetroTetrisGame from "./RetroTetrisGame";
import { starkQuotes } from "../lib/starkQuotes";

export default function GlobalTerminal() {
  const { isTerminalOpen, openTerminal, closeTerminal, initialCommand, starkMode, setStarkMode } = useTerminal();
  const [isMobile, setIsMobile] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ id: string; lines: string[]; isTyping: boolean }[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const lastQuoteIndexRef = useRef(-1);

  // Inactivity timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (isTerminalOpen && !isGameActive) {
          const prompts = [
            "Type 'help' to see what I can do...",
            "My neural networks are waiting for an input.",
            "Idle state detected. Awaiting command.",
            "Silence is golden, but code is execution."
          ];
          const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
          addOutput([`SYSTEM: ${randomPrompt}`], true);
        }
      }, 20000);
    };

    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousemove", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTerminalOpen, isGameActive]);

  const addOutput = (lines: string[], typing = false) => {
    setOutput(prev => [...prev, { id: crypto.randomUUID(), lines, isTyping: typing }]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    addOutput([`> ${cmd}`], false);

    const out: string[] = [];
    if (cmd === "help") {
      out.push("AVAILABLE COMMANDS:");
      out.push("  ls              List directory contents");
      out.push("  tree            Recursive directory visualizer");
      out.push("  pwd             Print working directory");
      out.push("  history         Display command history");
      out.push("  date            Display current system date");
      out.push("  echo            Print text");
      out.push("  contact         Display comms channels");
      out.push("  whoami          Display identity and bio");
      out.push("  gym             Show physical metrics");
      out.push("  coffee          Show coffee brewing status");
      out.push("  jarvis          Initialize J.A.R.V.I.S.");
      out.push("  ironman         Stark quote");
      out.push("  stark-mode      [HIDDEN] Toggle Mark XLVII protocol");
      out.push("  play            Launch Retro Tetris");
      out.push("  clear           Clear terminal");
    } else if (cmd === "ls") {
      out.push("total 42");
      out.push("drwxr-xr-x 2 ak root 4096 Jun  9 10:00 .");
      out.push("drwxr-xr-x 4 ak root 4096 Jun  9 10:00 ..");
      out.push("-rw-r--r-- 1 ak root 1024 Jun  9 10:00 [PROJECT:Aether]");
      out.push("-rw-r--r-- 1 ak root  512 Jun  9 10:00 [PROJECT:Synapse.cpp]");
      out.push("-rw-r--r-- 1 ak root  256 Jun  9 10:00 [PROJECT:BabyDragon]");
      out.push("-rw-r--r-- 1 ak root 2048 Jun  9 10:00 resume.pdf");
    } else if (cmd === "tree") {
      out.push(".");
      out.push("├── projects.json");
      out.push("├── experience.txt");
      out.push("├── readme.md");
      out.push("└── sys_logs/");
      out.push("    ├── boot.log");
      out.push("    └── kernel.log");
    } else if (cmd === "pwd") {
      out.push("/home/akhamitkar/nexus_v10");
    } else if (cmd === "history") {
      out.push("1  ls");
      out.push("2  npm run dev");
      out.push("3  python train.py --epochs 100");
    } else if (cmd === "date") {
      out.push(new Date().toString());
    } else if (cmd.startsWith("echo ")) {
      out.push(cmd.substring(5));
    } else if (cmd === "contact") {
      out.push("Email: adityasachinkhamitkar@gmail.com");
      out.push("GitHub: github.com/TechieSamosa");
    } else if (cmd === "whoami") {
      out.push("Aditya Khamitkar. Engineering intelligence from the statistical ground up.");
      // Injecting the easter egg link into the output array text.
      // We'll use a special marker to render it as a link in the UI.
      out.push("Check out [PROJECT:Aether] - The flagship system.");
    } else if (cmd === "gym") {
      out.push("Heavy lifting mode engaged. Deadlifts and Squats optimized for body recomposition. Calories and protein macros tracking active.");
    } else if (cmd === "coffee") {
      out.push("Brewing... Method: Moka Pot. Single estate black coffee. Pure fuel.");
    } else if (cmd === "jarvis") {
      out.push("Welcome back, Sir. All neural networks are currently online and functioning at optimal capacity.");
    } else if (cmd === "ironman") {
      let nextIdx = Math.floor(Math.random() * starkQuotes.length);
      while (nextIdx === lastQuoteIndexRef.current) {
        nextIdx = Math.floor(Math.random() * starkQuotes.length);
      }
      lastQuoteIndexRef.current = nextIdx;
      out.push(`"${starkQuotes[nextIdx]}" - Tony Stark`);
    } else if (cmd === "stark-mode") {
      setStarkMode(!starkMode);
      out.push(`Mark XLVII Protocol ${!starkMode ? 'ENGAGED' : 'DISENGAGED'}. Visuals overwritten.`);
    } else if (cmd === "play") {
      out.push("Initializing Retro Tetris...");
      setTimeout(() => setIsGameActive(true), 800);
    } else if (cmd === "clear") {
      setOutput([]);
      setInput("");
      return;
    } else {
      out.push(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }
    
    if (out.length > 0) addOutput(out, starkMode);
    setInput("");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]">
        <motion.button
          whileHover={{ rotate: 15, scale: 1.1 }}
          onClick={() => isTerminalOpen ? closeTerminal() : openTerminal()}
          className={`transition-colors p-4 rounded-full border shadow-lg ${starkMode ? 'bg-[#1a1a1a] border-[#FFD700] text-[#FFD700]' : 'bg-space-800/80 border-space-700 text-neon-cyan hover:text-white'}`}
          title="Open Global Terminal"
        >
          <span className="font-mono font-bold text-xl leading-none">&gt;_</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            drag={!isMobile}
            dragMomentum={false}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed z-[9998] overflow-hidden backdrop-blur-md rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.5)] 
              ${isMobile ? "inset-0 w-full h-[70vh] rounded-b-none mt-auto" : "bottom-24 right-10 w-[32rem] h-[28rem]"}
              ${starkMode ? 'bg-[#0d0d0d]/95 border border-[#FFD700]/50 shadow-[0_0_40px_rgba(255,215,0,0.2)]' : 'bg-space-900/95 border border-neon-cyan/50 shadow-[0_0_40px_rgba(0,242,254,0.2)]'}
            `}
          >
            {/* Mac UI Header */}
            <div className={`px-4 py-3 flex items-center justify-between border-b cursor-grab active:cursor-grabbing ${starkMode ? 'bg-[#1a1a1a]/80 border-[#FFD700]/30' : 'bg-space-800/80 border-space-700'}`}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center text-xs font-mono text-gray-400 select-none">
                <TerminalIcon size={12} className={`mr-2 ${starkMode ? 'text-[#FFD700]' : 'text-neon-cyan'}`} />
                {starkMode ? 'stark_terminal_xlvii' : 'nexus_terminal_v10'}
              </div>
              <button onClick={closeTerminal} className="text-gray-500 hover:text-white transition-colors">✕</button>
            </div>
            
            <div className="relative w-full h-[calc(100%-45px)]">
              {isGameActive ? (
                <RetroTetrisGame onExit={() => setIsGameActive(false)} />
              ) : (
                  <div ref={terminalEndRef} className="p-4 h-full overflow-y-auto font-mono text-sm md:text-base flex flex-col custom-scrollbar pb-16" style={{ scrollBehavior: 'smooth' }} onClick={() => inputRef.current?.focus()}>
                    <div className="mb-2 text-gray-400">
                      Nexus System Boot Sequence Complete.<br/>
                      Type 'help' to see available commands.
                    </div>
                    
                    {output.map((block, index) => (
                      <div key={block.id} className={starkMode ? 'text-[#FFD700]' : 'text-neon-cyan'}>
                        <MemoizedTerminalLine lines={block.lines} isTyping={block.isTyping} index={index} />
                      </div>
                    ))}
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-transparent">
                      <form 
                        onSubmit={handleCommand} 
                        className="flex items-center text-white"
                      >
                    <span className={`mr-2 ${starkMode ? 'text-white' : 'text-neon-purple'}`}>$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="bg-transparent border-none outline-none flex-1 text-white shadow-none focus:ring-0"
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <button type="submit" className="hidden" aria-hidden="true">Submit</button>
                      </form>
                    </div>
                  </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TypewriterBlock({ lines, isTyping, index }: { lines: string[], isTyping: boolean, index: number }) {
  const [displayedText, setDisplayedText] = useState(isTyping ? "" : lines.join("\n"));
  const hasAnimatedRef = useRef(false);
  
  useEffect(() => {
    if (!isTyping || hasAnimatedRef.current) {
      setDisplayedText(lines.join("\n"));
      return;
    }
    hasAnimatedRef.current = true;
    const fullText = lines.join("\n");
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [lines, isTyping]);

  const renderLine = (line: string, i: number) => {
    const projectRegex = /\[PROJECT:(.*?)\]/g;
    if (projectRegex.test(line)) {
      const parts = line.split(projectRegex);
      return (
        <span key={`cli-${index}-${i}-wrapper`}>
          {parts.map((part, pIndex) => {
             if (pIndex % 2 === 1) {
                return <a key={`cli-${index}-${i}-${pIndex}-link`} href="#bento" className="underline font-bold text-white hover:text-neon-purple cursor-pointer">{part}</a>;
             }
             return <span key={`cli-${index}-${i}-${pIndex}-text`}>{part}</span>;
          })}
        </span>
      );
    }
    return <span key={`cli-${index}-${i}-line`}>{line}</span>;
  };

  return (
    <div className="mb-1 whitespace-pre-wrap">
      <span className={lines[0]?.startsWith(">") ? "text-white" : ""}>
        {displayedText.split("\n").map((line, i) => (
          <div key={`cli-${index}-${i}-row`}>{renderLine(line, i)}</div>
        ))}
      </span>
    </div>
  );
}

const MemoizedTerminalLine = React.memo(TypewriterBlock);
