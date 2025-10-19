import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  type: 'normal' | 'pulse' | 'glow';
  pulsePhase: number;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  hue: number;
}

export default function SimpleInteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false });
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      
      for (let i = 0; i < particleCount; i++) {
        const type = ['normal', 'pulse', 'glow'][Math.floor(Math.random() * 3)] as Particle['type'];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          hue: Math.random() * 120 + 180, // Blue to purple range
          type,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    };

    const createWave = (x: number, y: number) => {
      wavesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 100 + Math.random() * 50,
        opacity: 0.6,
        hue: 200 + Math.random() * 60,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      
      // Create ripple effect when mouse moves quickly
      const dx = newX - mouseRef.current.x;
      const dy = newY - mouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      if (speed > 15 && Math.random() < 0.2) {
        createWave(newX, newY);
      }
      
      mouseRef.current.x = newX;
      mouseRef.current.y = newY;
      setIsInteracting(true);
    };

    const handleMouseDown = () => {
      mouseRef.current.isPressed = true;
      createWave(mouseRef.current.x, mouseRef.current.y);
    };

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false;
    };

    const handleMouseLeave = () => {
      setIsInteracting(false);
    };

    const animate = () => {
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw waves
      wavesRef.current = wavesRef.current.filter(wave => {
        wave.radius += 1.5;
        wave.opacity *= 0.96;
        
        if (wave.opacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = wave.opacity;
          ctx.strokeStyle = `hsl(${wave.hue}, 60%, 50%)`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          return true;
        }
        return false;
      });

      // Update particles
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (isInteracting && distance < 120) {
          const force = (120 - distance) / 120;
          const pullStrength = mouseRef.current.isPressed ? 0.02 : 0.008;
          
          particle.vx += (dx / distance) * force * pullStrength;
          particle.vy += (dy / distance) * force * pullStrength;
          particle.opacity = Math.min(0.8, particle.opacity + force * 0.02);
        } else {
          particle.opacity = Math.max(0.1, particle.opacity - 0.002);
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Apply friction
        particle.vx *= 0.996;
        particle.vy *= 0.996;

        // Update pulse phase
        particle.pulsePhase += 0.03;

        // Draw particle
        ctx.save();
        
        let finalOpacity = particle.opacity;
        let finalSize = particle.size;

        switch (particle.type) {
          case 'pulse':
            const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
            finalSize = particle.size * pulse;
            finalOpacity = particle.opacity * (0.8 + pulse * 0.2);
            break;
          
          case 'glow':
            // Outer glow
            ctx.globalAlpha = finalOpacity * 0.2;
            ctx.fillStyle = `hsl(${particle.hue}, 70%, 70%)`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, finalSize * 2.5, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        // Draw main particle
        ctx.globalAlpha = finalOpacity;
        ctx.fillStyle = `hsl(${particle.hue}, 60%, 70%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, finalSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw connections
      particlesRef.current.forEach((particle, index) => {
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const connectionStrength = (100 - distance) / 100;
            
            ctx.save();
            ctx.globalAlpha = connectionStrength * 0.3;
            ctx.strokeStyle = `hsl(${(particle.hue + otherParticle.hue) / 2}, 50%, 60%)`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isInteracting]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
}