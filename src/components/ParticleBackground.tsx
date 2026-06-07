"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let comets: Comet[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Star {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5;
        this.speedY = Math.random() * 0.2 + 0.1;
        this.opacity = Math.random();
      }

      update() {
        this.y += this.speedY;
        if (this.y > canvas!.height) {
          this.y = 0;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Comet {
      x: number;
      y: number;
      length: number;
      speedX: number;
      speedY: number;
      opacity: number;
      active: boolean;

      constructor() {
        this.active = false;
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.opacity = 0;
        this.reset();
      }

      reset() {
        this.active = Math.random() > 0.98; // Rare chance to spawn
        if (this.active) {
          this.x = Math.random() * canvas!.width;
          this.y = -50;
          this.length = Math.random() * 80 + 20;
          this.speedX = (Math.random() - 0.5) * 4;
          this.speedY = Math.random() * 5 + 3;
          this.opacity = 1;
        }
      }

      update() {
        if (!this.active) {
          this.reset();
          return;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;

        if (this.opacity <= 0 || this.y > canvas!.height) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active || !ctx) return;
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.speedX * 5, this.y - this.speedY * 5);
        gradient.addColorStop(0, `rgba(0, 242, 254, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(0, 242, 254, 0)");
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * 5, this.y - this.speedY * 5);
        ctx.stroke();
      }
    }

    const initParticles = () => {
      stars = [];
      comets = [];
      const starCount = Math.floor((canvas!.width * canvas!.height) / 4000);
      for (let i = 0; i < starCount; i++) stars.push(new Star());
      for (let i = 0; i < 5; i++) comets.push(new Comet());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      comets.forEach(comet => {
        comet.update();
        comet.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen"
    />
  );
}
