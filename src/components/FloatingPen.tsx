"use client";

import { motion } from "framer-motion";
import { PenTool } from "lucide-react";

export default function FloatingPen() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] group">
      <motion.div
        whileHover={{ y: -20, boxShadow: "0px 0px 25px rgba(0,242,254,0.6)", transition: { type: "spring", stiffness: 400, damping: 10 } }}
        className="bg-space-800/80 backdrop-blur-md p-4 rounded-full border border-space-600 shadow-[0_0_15px_rgba(0,242,254,0.3)] cursor-pointer relative"
      >
        {/* The animate-wave class makes it oscillate ±5px over 3s, but stops on group:hover thanks to globals.css */}
        <div className="animate-wave text-neon-cyan group-hover:text-white transition-colors duration-200">
          <PenTool size={28} className="transform -rotate-45" />
        </div>
      </motion.div>
    </div>
  );
}
