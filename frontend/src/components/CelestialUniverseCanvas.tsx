import React, { useEffect, useRef } from 'react';

interface CelestialCanvasProps {
  interactive?: boolean;
}

export const CelestialUniverseCanvas: React.FC<CelestialCanvasProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Stars
    const starCount = Math.min(width > 768 ? 160 : 70, 200);
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const colors = ['#FBBF24', '#F59E0B', '#FEF08A', '#FFFBEB', '#EA580C', '#D97706'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Drifting Rose Petals & Gold Sparkles
    const petalCount = width > 768 ? 28 : 14;
    const petals: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
      isGold: boolean;
    }> = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 0.6 - 0.3,
        speedY: Math.random() * 0.7 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.6 + 0.3,
        isGold: Math.random() > 0.7,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft sunlit turmeric ambient bloom
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        30,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, 'rgba(254, 240, 138, 0.18)'); // Soft turmeric sun halo
      bgGrad.addColorStop(0.45, 'rgba(250, 204, 21, 0.08)');
      bgGrad.addColorStop(1, 'rgba(254, 252, 232, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Stars
      for (const s of stars) {
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.15) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.shadowBlur = s.radius > 1.2 ? 6 : 2;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render Petals & Gold Stardust
      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.rotation) * 0.4;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.isGold) {
          // Radiant Turmeric Stardust diamond
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fillStyle = '#FBBF24';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FEF08A';
          ctx.fill();
        } else {
          // Auspicious Golden Marigold (गेंदा) Petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.95, p.size * 0.55, 0, 0, Math.PI * 2);
          const petalGrad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
          petalGrad.addColorStop(0, '#FEF08A');
          petalGrad.addColorStop(0.35, '#F59E0B');
          petalGrad.addColorStop(0.75, '#D97706');
          petalGrad.addColorStop(1, '#B45309');
          ctx.fillStyle = petalGrad;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#F59E0B';
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};
