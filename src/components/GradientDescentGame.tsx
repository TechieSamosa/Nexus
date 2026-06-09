"use client";

import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function GradientDescentGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lr, setLr] = useState(0.01);
  const [momentum, setMomentum] = useState(0.9);
  const [status, setStatus] = useState('Use Arrow Keys (← →) to navigate. Find the Global Minimum!');
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Physics state
  const stateRef = useRef({
    x: -2.5,
    v: 0,
    time: 0,
    startTime: Date.now(),
    userForce: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      if (e.key === "ArrowLeft") stateRef.current.userForce = -0.05;
      if (e.key === "ArrowRight") stateRef.current.userForce = 0.05;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        stateRef.current.userForce = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
      if (!isPlaying) return;
      
      const state = stateRef.current;
      state.time += 0.01;
      
      // Update Timer
      const elapsed = ((Date.now() - state.startTime) / 1000).toFixed(1);
      setTimer(parseFloat(elapsed));

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // The loss function: shifting landscape
      // f(x) = x^4 - 2x^2 + 0.3x + sin(x * 2 + time) * 0.5
      const f = (val: number) => Math.pow(val, 4) - 2 * Math.pow(val, 2) + 0.3 * val + Math.sin(val * 2 + state.time) * 0.5;
      const df = (val: number) => 4 * Math.pow(val, 3) - 4 * val + 0.3 + Math.cos(val * 2 + state.time) * 1.0;

      // Draw landscape
      ctx.beginPath();
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      for (let px = 0; px < canvas.width; px++) {
        const mathX = (px / canvas.width) * 6 - 3;
        const mathY = f(mathX);
        const py = canvas.height - (mathY + 3) * 30; 
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Update particle physics
      const grad = df(state.x);
      state.v = momentum * state.v - lr * grad + state.userForce;
      state.x += state.v;

      // Draw particle
      const px = ((state.x + 3) / 6) * canvas.width;
      const py = canvas.height - (f(state.x) + 3) * 30;
      
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700';
      ctx.fill();
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#FFD700';

      // Win/Loss states
      if (Math.abs(state.x) > 4) {
        setStatus(`ERROR: Exploding Gradient! You crashed. Time: ${elapsed}s`);
        setIsPlaying(false);
        return;
      }
      
      // Global minimum check: x should be around 0.8 to 1.5 in this function, gradient near 0
      if (Math.abs(state.v) < 0.005 && Math.abs(grad) < 0.05) {
        if (state.x > 0.5 && state.x < 1.5) {
          setStatus(`SUCCESS: Global Minimum Reached in ${elapsed}s!`);
          setIsPlaying(false);
          if (parseFloat(elapsed) <= 15) {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00f2fe', '#FFD700', '#8b5cf6']
            });
          }
          return;
        } else {
          setStatus(`ERROR: Stuck in Local Minimum. Keep moving! Time: ${elapsed}s`);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    
    if (isPlaying) draw();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [lr, momentum, isPlaying]);

  const resetGame = () => {
    stateRef.current = { x: -2.5, v: 0, time: 0, startTime: Date.now(), userForce: 0 };
    setTimer(0);
    setStatus('Use Arrow Keys (← →) to navigate. Find the Global Minimum!');
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-2 text-cyan-400 relative">
      <div className="flex justify-between w-full items-center mb-2">
        <h3 className="text-lg font-bold">Interactive Descent Simulator</h3>
        <button onClick={onExit} className="text-gray-400 hover:text-white border border-gray-600 px-2 py-1 rounded text-xs">Exit</button>
      </div>
      
      <div className="flex justify-between w-full text-xs font-mono mb-2 text-gray-300">
        <span>STATUS: <span className="text-white">{status}</span></span>
        <span className="text-neon-purple font-bold">TIME: {timer.toFixed(1)}s</span>
      </div>

      <canvas ref={canvasRef} width={600} height={300} className="bg-[#0c0b11] border border-cyan-500/30 rounded-lg mb-4 w-full h-48 md:h-64 shadow-[0_0_20px_rgba(0,242,254,0.1)]" />
      
      {!isPlaying && (
        <button onClick={resetGame} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neon-cyan text-space-900 px-6 py-2 rounded font-bold hover:bg-white transition-colors shadow-lg shadow-neon-cyan/50 z-10">
          RESTART SIMULATION
        </button>
      )}

      <div className="flex gap-6 w-full max-w-md text-xs font-mono">
        <label className="flex flex-col w-1/2">
          Learning Rate: {lr.toFixed(3)}
          <input type="range" min="0.001" max="0.05" step="0.001" value={lr} onChange={(e) => setLr(parseFloat(e.target.value))} className="mt-1" />
        </label>
        <label className="flex flex-col w-1/2">
          Momentum: {momentum.toFixed(2)}
          <input type="range" min="0" max="0.99" step="0.01" value={momentum} onChange={(e) => setMomentum(parseFloat(e.target.value))} className="mt-1" />
        </label>
      </div>
      
      <div className="mt-4 flex gap-4 w-full max-w-md">
        <button 
          onMouseDown={() => { stateRef.current.userForce = -0.05 }} 
          onMouseUp={() => { stateRef.current.userForce = 0 }} 
          onTouchStart={() => { stateRef.current.userForce = -0.05 }}
          onTouchEnd={() => { stateRef.current.userForce = 0 }}
          className="flex-1 bg-space-800 border border-space-600 py-2 rounded text-white active:bg-space-700"
        >
          ← LEFT FORCE
        </button>
        <button 
          onMouseDown={() => { stateRef.current.userForce = 0.05 }} 
          onMouseUp={() => { stateRef.current.userForce = 0 }} 
          onTouchStart={() => { stateRef.current.userForce = 0.05 }}
          onTouchEnd={() => { stateRef.current.userForce = 0 }}
          className="flex-1 bg-space-800 border border-space-600 py-2 rounded text-white active:bg-space-700"
        >
          RIGHT FORCE →
        </button>
      </div>
    </div>
  );
}
