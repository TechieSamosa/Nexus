"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 0, 0], [1, 1, 1]], // L
  [[0, 0, 1], [1, 1, 1]], // J
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]], // Z
];

const COLORS = [
  '#00f2fe', '#FFD700', '#ff007f', '#00ff00', '#9d00ff', '#ff8c00', '#00bfff'
];

export default function RetroTetrisGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [exitBuffer, setExitBuffer] = useState('');

  const gridRef = useRef<number[][]>(Array.from({ length: 20 }, () => Array(10).fill(0)));
  const pieceRef = useRef({
    shape: SHAPES[0],
    color: 1,
    x: 3,
    y: 0
  });

  const spawnPiece = useCallback(() => {
    const idx = Math.floor(Math.random() * SHAPES.length);
    pieceRef.current = {
      shape: SHAPES[idx],
      color: idx + 1,
      x: 3,
      y: 0
    };
  }, []);

  const collision = useCallback((offsetX = 0, offsetY = 0, newShape = pieceRef.current.shape) => {
    const { x, y } = pieceRef.current;
    for (let r = 0; r < newShape.length; r++) {
      for (let c = 0; c < newShape[r].length; c++) {
        if (newShape[r][c]) {
          const newX = x + c + offsetX;
          const newY = y + r + offsetY;
          if (newX < 0 || newX >= 10 || newY >= 20) return true;
          if (newY >= 0 && gridRef.current[newY][newX]) return true;
        }
      }
    }
    return false;
  }, []);

  const merge = useCallback(() => {
    const { shape, color, x, y } = pieceRef.current;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] && y + r >= 0) {
          gridRef.current[y + r][x + c] = color;
        }
      }
    }
  }, []);

  const clearLines = useCallback(() => {
    let linesCleared = 0;
    for (let r = 19; r >= 0; r--) {
      if (gridRef.current[r].every(cell => cell !== 0)) {
        gridRef.current.splice(r, 1);
        gridRef.current.unshift(Array(10).fill(0));
        linesCleared++;
        r++; // Check the same row again since everything shifted down
      }
    }
    if (linesCleared > 0) {
      setScore(s => s + linesCleared * 100);
    }
  }, []);

  const moveDown = useCallback(() => {
    if (gameOver) return;
    if (!collision(0, 1)) {
      pieceRef.current.y += 1;
    } else {
      if (pieceRef.current.y <= 0) {
        setGameOver(true);
        return;
      }
      merge();
      clearLines();
      spawnPiece();
    }
  }, [collision, merge, clearLines, spawnPiece, gameOver]);

  const moveLeft = useCallback(() => {
    if (!gameOver && !collision(-1, 0)) pieceRef.current.x -= 1;
  }, [collision, gameOver]);

  const moveRight = useCallback(() => {
    if (!gameOver && !collision(1, 0)) pieceRef.current.x += 1;
  }, [collision, gameOver]);

  const rotate = useCallback(() => {
    if (gameOver) return;
    const shape = pieceRef.current.shape;
    const newShape = shape[0].map((_, i) => shape.map(row => row[i]).reverse());
    if (!collision(0, 0, newShape)) {
      pieceRef.current.shape = newShape;
    }
  }, [collision, gameOver]);

  // Main Loop
  useEffect(() => {
    spawnPiece();
    const interval = setInterval(moveDown, 500);
    return () => clearInterval(interval);
  }, [moveDown, spawnPiece]);

  // Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const blockSize = Math.floor(canvas.width / 10);

      // Draw Grid
      for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 10; c++) {
          if (gridRef.current[r][c]) {
            ctx.fillStyle = COLORS[gridRef.current[r][c] - 1];
            ctx.fillRect(c * blockSize, r * blockSize, blockSize - 1, blockSize - 1);
          }
        }
      }

      // Draw Active Piece
      if (!gameOver) {
        const { shape, color, x, y } = pieceRef.current;
        ctx.fillStyle = COLORS[color - 1];
        for (let r = 0; r < shape.length; r++) {
          for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
              ctx.fillRect(Math.floor((x + c) * blockSize), Math.floor((y + r) * blockSize), blockSize - 1, blockSize - 1);
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [gameOver]);

  // Keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      // Hidden exit command
      setExitBuffer(prev => {
        const newBuf = (prev + e.key.toLowerCase()).slice(-4);
        if (newBuf === 'exit') {
          onExit();
        }
        return newBuf;
      });

      if (e.key === "ArrowLeft") moveLeft();
      if (e.key === "ArrowRight") moveRight();
      if (e.key === "ArrowUp") rotate();
      if (e.key === "ArrowDown") moveDown();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, rotate, moveDown, onExit]);

  return (
    <div className="flex flex-col items-center w-full h-full p-2 text-cyan-400 font-mono relative">
      <div className="flex justify-between w-full items-center mb-2">
        <h3 className="text-lg font-bold">Retro Tetris</h3>
        <div className="flex items-center gap-4">
          <span className="font-bold text-white">SCORE: {score}</span>
          <button onClick={onExit} className="text-gray-400 hover:text-white font-bold">✕</button>
        </div>
      </div>

      <div className="relative w-full h-full overflow-hidden box-border flex justify-center">
        <canvas 
          ref={canvasRef} 
          width={200} 
          height={400} 
          className="bg-[#0c0b11] border-2 border-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.1)] block"
        />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-10">
            <span className="text-2xl text-red-500 font-bold mb-4">GAME OVER</span>
            <button 
              onClick={() => {
                gridRef.current = Array.from({ length: 20 }, () => Array(10).fill(0));
                setScore(0);
                setGameOver(false);
                spawnPiece();
              }}
              className="px-4 py-2 bg-neon-cyan text-space-900 rounded font-bold"
            >
              RESTART
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 mt-4 md:hidden w-full max-w-[200px]">
        <button onClick={moveLeft} className="bg-space-800 p-3 rounded active:bg-space-700">←</button>
        <button onClick={rotate} className="bg-space-800 p-3 rounded active:bg-space-700">↻</button>
        <button onClick={moveRight} className="bg-space-800 p-3 rounded active:bg-space-700">→</button>
        <div className="col-start-2">
          <button onClick={moveDown} className="bg-space-800 p-3 w-full rounded active:bg-space-700">↓</button>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-center hidden md:block">
        Arrow Keys to Move/Rotate. Type 'exit' to quit.
      </div>
    </div>
  );
}
