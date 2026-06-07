import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Markdown from "react-markdown";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Not Found" };
  }
  return {
    title: `${post.title} | Transmissions`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-space-900 text-white selection:bg-neon-purple/30 pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/transmissions" className="inline-flex items-center text-neon-cyan hover:text-white transition-colors mb-12">
          <ArrowLeft size={16} className="mr-2" />
          Back to Transmissions
        </Link>
        
        <article className="glass-panel aura-halo p-8 md:p-12 rounded-2xl border border-space-700 bg-space-800/50">
          <header className="mb-10 border-b border-space-700 pb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-400">
              <span className="flex items-center"><Calendar size={16} className="mr-2 text-neon-purple" /> {post.date}</span>
              <span className="flex items-center"><Clock size={16} className="mr-2 text-neon-cyan" /> {post.readTime}</span>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-neon-cyan prose-a:text-neon-purple hover:prose-a:text-white prose-code:text-yellow-400 prose-pre:bg-space-900 prose-pre:border prose-pre:border-space-700">
            <Markdown>{post.content}</Markdown>
          </div>
        </article>
      </div>
    </main>
  );
}
