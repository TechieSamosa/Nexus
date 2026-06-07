"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy, Award, Medal } from "lucide-react";

const achievements = [
  {
    title: "Integrated M.Tech in Computer Science",
    subtitle: "Computational & Data Science | VIT, Class of 2027",
    icon: <GraduationCap size={40} className="text-neon-cyan" />,
    color: "from-neon-cyan/20 to-transparent",
    border: "border-neon-cyan",
  },
  {
    title: "Intel AI4Youth National Finalist",
    subtitle: "Top 125 out of 52,000 competitors",
    icon: <Award size={40} className="text-neon-purple" />,
    color: "from-neon-purple/20 to-transparent",
    border: "border-neon-purple",
  },
  {
    title: "All-India Champions",
    subtitle: "National Aerolympics 2020",
    icon: <Trophy size={40} className="text-yellow-400" />,
    color: "from-yellow-400/20 to-transparent",
    border: "border-yellow-400",
  },
  {
    title: "Smart India Hackathon",
    subtitle: "Finalist 2024",
    icon: <Medal size={40} className="text-orange-400" />,
    color: "from-orange-400/20 to-transparent",
    border: "border-orange-400",
  },
];

export default function Trophies() {
  return (
    <section className="py-24 relative px-6 z-10 bg-space-800/20 border-t border-space-700">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white tracking-tight mb-16">
          The Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Trophies</span>
        </h2>

        <div className="relative">
          {/* Abstract Shelf Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-space-600 to-transparent transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center group"
              >
                {/* Hovering Badge */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-white/5 blur-xl rounded-full group-hover:bg-white/10 transition-colors"></div>
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + index * 0.5, ease: "easeInOut" }}
                    className={`w-24 h-24 rounded-full border-2 ${item.border} bg-space-900 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${item.color}`}></div>
                    <span className="relative z-10 drop-shadow-lg">{item.icon}</span>
                  </motion.div>
                </div>
                
                {/* Plaque */}
                <div className="bg-space-800/80 backdrop-blur-sm border border-space-700 p-4 rounded-xl w-full text-center group-hover:border-space-500 transition-colors shadow-lg">
                  <h3 className="font-bold text-white text-lg mb-2 h-14 flex items-center justify-center">{item.title}</h3>
                  <p className="text-sm font-mono text-gray-400">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
