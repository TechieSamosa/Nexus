"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      securityLevel: "loose",
      fontFamily: "monospace",
    });
    
    const renderDiagram = async () => {
      if (ref.current) {
        try {
          const id = `mermaid-${Math.random().toString(36).substring(7)}`;
          const { svg } = await mermaid.render(id, chart);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid rendering error:", error);
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return <div className="mermaid-container flex justify-center py-4 w-full overflow-x-auto custom-scrollbar" ref={ref} />;
}
