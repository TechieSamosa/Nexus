import { getAllPosts } from "@/lib/blog";
import Transmissions from "@/components/Transmissions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Transmissions | Aditya Khamitkar",
  description: "Engineering logs and mechanistic interpretations.",
};

export default function TransmissionsPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#0c0b11] text-white selection:bg-neon-purple/30 pt-20">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Link href="/" className="inline-flex items-center text-neon-cyan hover:text-white transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Return to Command Center
        </Link>
      </div>
      <Transmissions posts={posts} />
    </main>
  );
}
