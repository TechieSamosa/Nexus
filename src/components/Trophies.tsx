"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { GraduationCap, Award, BookOpen, Star, Trophy, HeartHandshake, Languages } from "lucide-react";

const academics = [
  {
    title: "Vellore Institute of Technology",
    subtitle: "Integrated M.Tech (ME) in computer science engineering specialised in Computational & Data Science (2022-2027)",
    icon: <img src="/logos/VIT.png" className="w-full h-full object-contain p-2" />,
    color: "from-neon-cyan/20 to-transparent",
    border: "border-neon-cyan",
  },
  {
    title: "Space Central School, Sriharikota",
    subtitle: "Class 12 CBSE (94.4%) | Head Boy",
    icon: <img src="/logos/Space Central School.jpg" className="w-full h-full object-contain p-2" />,
    color: "from-indigo-400/20 to-transparent",
    border: "border-indigo-400",
  },
  {
    title: "Space Central School, Sriharikota",
    subtitle: "Class 10 CBSE",
    icon: <img src="/logos/Space Central School.jpg" className="w-full h-full object-contain p-2" />,
    color: "from-blue-400/20 to-transparent",
    border: "border-blue-400",
  },
];

const certifications = [
  {
    title: "IBM AI Engineering",
    subtitle: "IBM / Coursera",
    icon: <img src="/logos/ibm-vector-logo-download-free-11574219405kplub4crun-photoaidcom-cropped.png" className="w-full h-full object-contain p-2" />,
    color: "from-neon-purple/20 to-transparent",
    border: "border-neon-purple",
  },
  {
    title: "Deep Neural Networks with PyTorch",
    subtitle: "IBM / Coursera",
    icon: <img src="/logos/ibm-vector-logo-download-free-11574219405kplub4crun-photoaidcom-cropped.png" className="w-full h-full object-contain p-2" />,
    color: "from-pink-400/20 to-transparent",
    border: "border-pink-400",
  },
  {
    title: "AI/ML for Geodata Analysis",
    subtitle: "ISRO - Indian Space Research Organization",
    icon: <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg" className="w-full h-full object-contain p-2" />,
    color: "from-orange-400/20 to-transparent",
    border: "border-orange-400",
  },
  {
    title: "Supervised Machine Learning",
    subtitle: "Stanford University",
    icon: <img src="/logos/stanford University.png" className="w-full h-full object-contain p-2" />,
    color: "from-red-400/20 to-transparent",
    border: "border-red-400",
  },
];

const extracurriculars = [
  {
    title: "All-India Champions",
    subtitle: "National Aerolympics 2020 (Organized by HAL & AeSI)",
    icon: <img src="/logos/HAL.avif" className="w-full h-full object-contain p-2" />,
    color: "from-yellow-400/20 to-transparent",
    border: "border-yellow-400",
  },
  {
    title: "National Cadet Corps (NCC)",
    subtitle: "Cadet (AP/JD2016417009)",
    icon: <img src="/logos/NCC.jpg" className="w-full h-full object-contain p-2" />,
    color: "from-green-500/20 to-transparent",
    border: "border-green-500",
  },
  {
    title: "DBHPS Rashtra Bhasha Praveena",
    subtitle: "Equivalent to B.A. in Hindi Literature",
    icon: <img src="/logos/DBHPS.png" className="w-full h-full object-contain p-2" />,
    color: "from-indigo-400/20 to-transparent",
    border: "border-indigo-400",
  },
  {
    title: "State Level Swimmer & Archery",
    subtitle: "School Games Federation Andhra Pradesh",
    icon: <img src="/logos/Swimming-photoaidcom-cropped.jpg" className="w-full h-full object-contain p-2" />,
    color: "from-cyan-400/20 to-transparent",
    border: "border-cyan-400",
  },
];

const volunteering = [
  {
    title: "General Open Source Contributions",
    subtitle: "Omdena & Various Organizations",
    icon: <img src="/logos/GitHub.png" className="w-full h-full object-contain p-2" />,
    color: "from-teal-400/20 to-transparent",
    border: "border-teal-400",
  },
  {
    title: "Open Source Contributor",
    subtitle: "GirlScript Summer of Code",
    icon: <img src="/logos/GSSoC.png" className="w-full h-full object-contain p-2" />,
    color: "from-emerald-400/20 to-transparent",
    border: "border-emerald-400",
  },
  {
    title: "Technical Team Lead",
    subtitle: "Data Science Club, VIT Bhopal",
    icon: <img src="/logos/Data Science Clug.png" className="w-full h-full object-contain p-2" />,
    color: "from-cyan-400/20 to-transparent",
    border: "border-cyan-400",
  },
];

const languages = [
  {
    title: "Fluent / Full Professional",
    subtitle: "English",
    icon: <Languages size={40} className="text-yellow-400" />,
    color: "from-yellow-400/20 to-transparent",
    border: "border-yellow-400",
  },
  {
    title: "Native / Bilingual",
    subtitle: "Hindi, Marathi, Telugu",
    icon: <Languages size={40} className="text-amber-500" />,
    color: "from-amber-500/20 to-transparent",
    border: "border-amber-500",
  },
  {
    title: "Elementary / Learning",
    subtitle: "German, Kannada, Tamil",
    icon: <Languages size={40} className="text-lime-400" />,
    color: "from-lime-400/20 to-transparent",
    border: "border-lime-400",
  },
];

const GridSection = ({ title, items, indexOffset }: { title: string, items: any[], indexOffset: string }) => (
  <div className="mb-16">
    <h3 className="text-2xl font-mono text-neon-cyan mb-8 text-left border-b border-space-700 pb-2">{indexOffset}. {title}</h3>
    <div className="relative">
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-space-600 to-transparent transform -translate-y-1/2 z-0"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        {items.map((item, index) => (
        <Tilt key={`${title}-${index}`} perspective={1000} tiltMaxAngleX={10} tiltMaxAngleY={10} className="transform-style-3d">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -6, transition: { type: "spring", stiffness: 250, damping: 20 } }}
            className="flex flex-col items-center group animate-wave will-change-transform"
          >
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-full group-hover:bg-white/10 transition-colors"></div>
              <div 
                className={`w-24 h-24 rounded-full border-2 ${item.border} bg-space-900 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${item.color}`}></div>
                <span className="relative z-10 drop-shadow-lg w-full h-full flex items-center justify-center">{item.icon}</span>
              </div>
            </div>
            
            <div className={`bg-space-800/80 backdrop-blur-sm border border-space-700 p-4 rounded-xl w-full text-center group-hover:${item.border.replace('border-', 'border-')}/50 group-hover:shadow-[0_0_25px_rgba(0,242,254,0.1)] transition-all duration-100 shadow-lg`}>
              <h3 className="font-bold text-white text-lg mb-2 h-14 flex items-center justify-center">{item.title}</h3>
              <p className="text-base font-mono text-gray-400">{item.subtitle}</p>
            </div>
          </motion.div>
        </Tilt>
        ))}
      </div>
    </div>
  </div>
);

export default function Trophies() {
  return (
    <section className="py-24 relative px-6 z-10 bg-space-800/20 border-t border-space-700">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-16">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Archives</span>
        </h2>

        <GridSection title="Academics" items={academics} indexOffset="01" />
        <GridSection title="Certifications" items={certifications} indexOffset="02" />
        <GridSection title="Extracurriculars & Awards" items={extracurriculars} indexOffset="03" />
        <GridSection title="Volunteering" items={volunteering} indexOffset="04" />
        <GridSection title="Languages" items={languages} indexOffset="05" />
      </div>
    </section>
  );
}
