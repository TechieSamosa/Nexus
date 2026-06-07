import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import QuestLog from "@/components/QuestLog";
import BentoGrid from "@/components/BentoGrid";
import Trophies from "@/components/Trophies";
import Transmissions from "@/components/Transmissions";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts();
  return (
    <main className="relative bg-space-900 min-h-screen selection:bg-neon-purple/30 text-white overflow-hidden">
      <ParticleBackground />
      <Hero />
      <TechMarquee />
      <QuestLog />
      <BentoGrid />
      <Transmissions posts={posts} />
      <Trophies />
      <Footer />
    </main>
  );
}
