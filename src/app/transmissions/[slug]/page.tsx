import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import ReadingProgress from "@/components/ReadingProgress";
import MermaidDiagram from "@/components/MermaidDiagram";

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
    <main className="min-h-screen bg-[#0c0b11] text-slate-300 selection:bg-neon-cyan/30 pt-20 pb-32">
      <ReadingProgress />
      
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/transmissions" className="inline-flex items-center text-neon-cyan hover:text-white transition-colors mb-12 font-mono text-sm tracking-wide">
          <ArrowLeft size={16} className="mr-2" />
          RETURN TO DIRECTORY
        </Link>
        
        <article>
          <header className="mb-16 border-b border-white/10 pb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-slate-400">
              <span className="flex items-center"><Calendar size={16} className="mr-2 text-neon-purple" /> {post.date}</span>
              <span className="flex items-center"><Clock size={16} className="mr-2 text-neon-cyan" /> {post.readTime}</span>
            </div>
          </header>

          <div className="prose prose-invert prose-cyan lg:prose-lg mx-auto leading-loose tracking-normal text-slate-300">
            <Markdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  if (match && match[1] === "mermaid") {
                    return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
                  }
                  return (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.content}
            </Markdown>
          </div>
        </article>
      </div>
    </main>
  );
}
