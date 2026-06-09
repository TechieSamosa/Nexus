"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GradientDescentGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [learningRate, setLearningRate] = useState(0.02);
  const [momentum, setMomentum] = useState(0.85);
  const [status, setStatus] = useState<"running" | "exploding" | "local" | "global">("running");
  
  // Physics state
  const particleRef = useRef({ x: 50, y: 0, vx: 0, vy: 0 });
  const animationRef = useRef<number | null>(null);

  // Loss function landscape (non-convex)
  // Maps canvas x [0, width] to a y value
  const f = (x: number, width: number, height: number) => {
    // Normalize x to [-2, 2]
    const nx = (x / width) * 4 - 2;
    // f(x) = x^4 - 2x^2 + 0.3x
    const y = Math.pow(nx, 4) - 2 * Math.pow(nx, 2) + 0.3 * nx;
    // Map back to canvas y
    return height - (y * 50 + height / 2);
  };

  // Derivative for gradient descent
  const df = (x: number, width: number) => {
    const nx = (x / width) * 4 - 2;
    // f'(x) = 4x^3 - 4x + 0.3
    const dy = 4 * Math.pow(nx, 3) - 4 * nx + 0.3;
    // Scale derivative
    return dy * (4 / width);
  };

  const resetGame = () => {
    particleRef.current = { x: 50, y: 0, vx: 0, vy: 0 };
    setStatus("running");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      }
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
      }

      // Draw landscape
      ctx.beginPath();
      ctx.moveTo(0, f(0, width, height));
      for (let x = 1; x < width; x++) {
        ctx.lineTo(x, f(x, width, height));
      }
      ctx.strokeStyle = "#00f2fe";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Physics update
      if (status === "running") {
        const p = particleRef.current;
        const grad = df(p.x, width);
        
        // Gradient Descent with Momentum Update
        p.vx = momentum * p.vx - learningRate * grad * 10000;
        p.x += p.vx;
        
        // Gravity/Snap to curve
        const targetY = f(p.x, width, height);
        p.y += (targetY - p.y) * 0.2;

        // Win/Loss Condition Checking
        if (p.x < 0 || p.x > width || isNaN(p.x) || Math.abs(p.vx) > 50) {
          setStatus("exploding");
        } else if (Math.abs(p.vx) < 0.01) {
          // Stopped moving. Check if in global or local minimum
          // Global minimum is around nx = 0.9 (right side), local is around nx = -1 (left side)
          const nx = (p.x / width) * 4 - 2;
          if (nx > 0.5) {
            setStatus("global");
          } else {
            setStatus("local");
          }
        }
      }

      // Draw Particle
      const p = particleRef.current;
      if (status !== "exploding") {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#ff007f";
        ctx.fill();
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff007f";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [learningRate, momentum, status]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 bg-space-900 flex flex-col items-center justify-center font-mono text-white p-4"
    >
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <h3 className="text-neon-cyan font-bold">Gradient Descent Lander</h3>
          <p className="text-xs text-gray-400">Find the global minimum.</p>
        </div>
        <button onClick={onExit} className="text-gray-400 hover:text-white px-3 py-1 bg-space-800 rounded">Exit</button>
      </div>

      <div className="w-full flex-1 relative border border-space-700 rounded-lg overflow-hidden bg-[#0c0b11]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        {/* Overlay Status */}
        {status !== "running" && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm">
            {status === "exploding" && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-2">ERROR: Exploding Gradient!</h2>
                <p className="text-gray-300">Learning rate was too high. You crashed.</p>
              </div>
            )}
            {status === "local" && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">ERROR: Local Minimum</h2>
                <p className="text-gray-300">Momentum was too low. Stuck in a shallow valley.</p>
              </div>
            )}
            {status === "global" && (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-400 mb-2">SUCCESS: Convergence Achieved</h2>
                <p className="text-gray-300">Global minimum reached. Perfect landing.</p>
              </div>
            )}
            <button onClick={resetGame} className="mt-6 px-6 py-2 bg-neon-cyan text-space-900 font-bold rounded hover:bg-white transition-colors">
              Restart Simulation
            </button>
          </div>
        )}
      </div>

      <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-space-800 p-4 rounded-lg border border-space-700">
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <label>Learning Rate (α)</label>
            <span className="text-neon-cyan">{learningRate.toFixed(4)}</span>
          </div>
          <input 
            type="range" min="0.001" max="0.05" step="0.001" 
            value={learningRate} 
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full accent-neon-cyan"
            disabled={status !== "running"}
          />
        </div>
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <label>Momentum (β)</label>
            <span className="text-neon-purple">{momentum.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0" max="0.99" step="0.01" 
            value={momentum} 
            onChange={(e) => setMomentum(parseFloat(e.target.value))}
            className="w-full accent-neon-purple"
            disabled={status !== "running"}
          />
        </div>
      </div>
    </motion.div>
  );
}
