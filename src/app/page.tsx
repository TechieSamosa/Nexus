import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import QuestLog from "@/components/QuestLog";
import BentoGrid from "@/components/BentoGrid";
import Trophies from "@/components/Trophies";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-space-900 min-h-screen selection:bg-neon-purple/30 text-white overflow-hidden">
      <ParticleBackground />
      <Hero />
      <TechMarquee />
      <QuestLog />
      <BentoGrid />
      <Trophies />
      <Footer />
    </main>
  );
}
