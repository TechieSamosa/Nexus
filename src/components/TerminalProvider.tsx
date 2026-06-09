"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface TerminalContextType {
  isTerminalOpen: boolean;
  openTerminal: (initialCommand?: string) => void;
  closeTerminal: () => void;
  initialCommand: string | null;
  starkMode: boolean;
  setStarkMode: (val: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [initialCommand, setInitialCommand] = useState<string | null>(null);
  const [starkMode, setStarkMode] = useState(false);

  const openTerminal = (cmd?: string) => {
    if (cmd) setInitialCommand(cmd);
    setIsTerminalOpen(true);
  };

  const closeTerminal = () => {
    setIsTerminalOpen(false);
    setInitialCommand(null);
  };

  useEffect(() => {
    if (starkMode) {
      document.body.classList.add("theme-stark");
    } else {
      document.body.classList.remove("theme-stark");
    }
  }, [starkMode]);

  return (
    <TerminalContext.Provider value={{
      isTerminalOpen, openTerminal, closeTerminal, initialCommand, starkMode, setStarkMode
    }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
