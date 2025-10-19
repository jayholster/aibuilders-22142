import React, { useRef, useEffect, useState, useCallback } from 'react';

// Spatial partitioning for performance optimization
class SpatialGrid {
  private grid: Map<string, Particle[]> = new Map();
  private cellSize: number;
  private width: number;
  private height: number;

  constructor(width: number, height: number, cellSize: number = 100) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
  }

  clear() {
    this.grid.clear();
  }

  private getKey(x: number, y: number): string {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX},${cellY}`;
  }

  insert(particle: Particle) {
    const key = this.getKey(particle.x, particle.y);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(particle);
  }

  getNearby(particle: Particle, radius: number = 100): Particle[] {
    const nearby: Particle[] = [];
    const cellRadius = Math.ceil(radius / this.cellSize);
    const centerX = Math.floor(particle.x / this.cellSize);
    const centerY = Math.floor(particle.y / this.cellSize);

    for (let x = centerX - cellRadius; x <= centerX + cellRadius; x++) {
      for (let y = centerY - cellRadius; y <= centerY + cellRadius; y++) {
        const key = `${x},${y}`;
        const particles = this.grid.get(key);
        if (particles) {
          nearby.push(...particles);
        }
      }
    }
    return nearby;
  }
}

// Enhanced particle interface with multiple types and behaviors
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  baseHue: number;
  type: 'star' | 'energy' | 'plasma' | 'cosmic' | 'nebula';
  
  // Animation properties
  pulsePhase: number;
  rotationPhase: number;
  noiseOffset: number;
  energy: number;
  magneticField: number;
  
  // Trail system
  trailHistory: TrailPoint[];
  maxTrailLength: number;
  
  // State machine for dynamic behavior
  state: 'idle' | 'attracted' | 'repelled' | 'orbiting' | 'charging';
  stateTimer: number;
  
  // Physics properties
  mass: number;
  friction: number;
  elasticity: number;
}

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
  hue: number;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  hue: number;
  speed: number;
  ripples: number;
}

interface InteractionField {
  x: number;
  y: number;
  strength: number;
  radius: number;
  type: 'attract' | 'repel' | 'vortex';
  decay: number;
}

// Smooth interpolation utilities for professional animations
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Perlin noise implementation for organic, flowing movement
class PerlinNoise {
  private permutation: number[];
  
  constructor() {
    this.permutation = [];
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = Math.floor(Math.random() * 256);
    }
    for (let i = 0; i < 256; i++) {
      this.permutation[256 + i] = this.permutation[i];
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  noise(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = this.fade(x);
    const v = this.fade(y);
    const A = this.permutation[X] + Y;
    const AA = this.permutation[A];
    const AB = this.permutation[A + 1];
    const B = this.permutation[X + 1] + Y;
    const BA = this.permutation[B];
    const BB = this.permutation[B + 1];

    return this.lerp(
      this.lerp(this.grad(this.permutation[AA], x, y),
                this.grad(this.permutation[BA], x - 1, y), u),
      this.lerp(this.grad(this.permutation[AB], x, y - 1),
                this.grad(this.permutation[BB], x - 1, y - 1), u), v
    );
  }
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const fieldsRef = useRef<InteractionField[]>([]);
  const spatialGridRef = useRef<SpatialGrid | null>(null);
  const noiseRef = useRef<PerlinNoise>(new PerlinNoise());
  
  // Enhanced mouse tracking with velocity and gesture recognition
  const mouseRef = useRef({ 
    x: 0, 
    y: 0, 
    prevX: 0, 
    prevY: 0, 
    isDown: false, 
    velocity: { x: 0, y: 0 },
    trail: [] as { x: number; y: number; time: number }[]
  });
  
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const [isInteracting, setIsInteracting] = useState(false);
  
  // Performance monitoring for adaptive quality
  const performanceRef = useRef({ frameCount: 0, lastFpsCheck: 0, fps: 60 });

  // Object pooling for efficient memory management
  const particlePoolRef = useRef<Particle[]>([]);
  const wavePoolRef = useRef<Wave[]>([]);

  const createParticle = useCallback((x: number, y: number, type?: Particle['type']): Particle => {
    if (particlePoolRef.current.length > 0) {
      const particle = particlePoolRef.current.pop()!;
      // Reset particle properties efficiently
      const size = Math.random() * 4 + 1;
      const opacity = Math.random() * 0.8 + 0.4;
      const hue = Math.random() * 360;
      
      Object.assign(particle, {
        x, y,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
        size, baseSize: size,
        opacity, baseOpacity: opacity,
        hue, baseHue: hue,
        type: type || (['star', 'energy', 'plasma', 'cosmic', 'nebula'] as const)[Math.floor(Math.random() * 5)],
        pulsePhase: Math.random() * Math.PI * 2,
        rotationPhase: Math.random() * Math.PI * 2,
        noiseOffset: Math.random() * 1000,
        energy: Math.random() * 100 + 50,
        magneticField: Math.random() * 30 + 10,
        trailHistory: [],
        maxTrailLength: 15 + Math.floor(Math.random() * 10),
        state: 'idle' as const,
        stateTimer: 0,
        mass: Math.random() * 2 + 0.5,
        friction: 0.98 + Math.random() * 0.02,
        elasticity: 0.7 + Math.random() * 0.3
      });
      return particle;
    }
    
    // Create new particle if pool is empty
    const size = Math.random() * 4 + 1;
    const opacity = Math.random() * 0.8 + 0.4;
    const hue = Math.random() * 360;
    
    return {
      x, y,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size, baseSize: size,
      opacity, baseOpacity: opacity,
      hue, baseHue: hue,
      type: type || (['star', 'energy', 'plasma', 'cosmic', 'nebula'] as const)[Math.floor(Math.random() * 5)],
      pulsePhase: Math.random() * Math.PI * 2,
      rotationPhase: Math.random() * Math.PI * 2,
      noiseOffset: Math.random() * 1000,
      energy: Math.random() * 100 + 50,
      magneticField: Math.random() * 30 + 10,
      trailHistory: [],
      maxTrailLength: 15 + Math.floor(Math.random() * 10),
      state: 'idle' as const,
      stateTimer: 0,
      mass: Math.random() * 2 + 0.5,
      friction: 0.98 + Math.random() * 0.02,
      elasticity: 0.7 + Math.random() * 0.3
    };
  }, []);

  const createWave = useCallback((x: number, y: number, intensity: number = 1) => {
    const wave: Wave = {
      x, y,
      radius: 0,
      maxRadius: 80 + intensity * 40,
      opacity: 0.8 * intensity,
      hue: 200 + Math.random() * 160,
      speed: 0.5 + intensity * 0.2,
      ripples: Math.floor(2 + intensity * 2)
    };
    wavesRef.current.push(wave);
  }, []);

  const createInteractionField = useCallback((x: number, y: number, type: InteractionField['type'], strength: number = 1) => {
    fieldsRef.current.push({
      x, y,
      strength: strength * 100,
      radius: 150,
      type,
      decay: 0.005
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        spatialGridRef.current = new SpatialGrid(canvas.width, canvas.height, 120);
        createParticles();
      }
    };

    const createParticles = () => {
      const particleCount = Math.min(60, Math.max(20, Math.floor((canvas.width * canvas.height) / 25000)));
      particlesRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };

    const updateMouseVelocity = () => {
      const mouse = mouseRef.current;
      mouse.velocity.x = mouse.x - mouse.prevX;
      mouse.velocity.y = mouse.y - mouse.prevY;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      
      // Update mouse trail for gesture recognition
      mouse.trail.push({ x: mouse.x, y: mouse.y, time: timeRef.current });
      mouse.trail = mouse.trail.filter(point => timeRef.current - point.time < 30);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      setIsInteracting(true);
      
      // Create dynamic interaction fields based on mouse movement
      const speed = Math.sqrt(mouseRef.current.velocity.x ** 2 + mouseRef.current.velocity.y ** 2);
      if (speed > 5) {
        createInteractionField(mouseRef.current.x, mouseRef.current.y, 'attract', speed / 20);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create enhanced wave effects
      createWave(x, y, 1.5);
      createInteractionField(x, y, 'vortex', 2);
      
      // Spawn particles at click location
      for (let i = 0; i < 5; i++) {
        particlesRef.current.push(createParticle(
          x + (Math.random() - 0.5) * 50,
          y + (Math.random() - 0.5) * 50,
          'energy'
        ));
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleMouseLeave = () => {
      setIsInteracting(false);
    };

    const updateParticleState = (particle: Particle, deltaTime: number) => {
      particle.stateTimer += deltaTime;
      
      // Intelligent state transitions
      if (particle.state === 'idle' && particle.energy > 80) {
        particle.state = 'charging';
        particle.stateTimer = 0;
      } else if (particle.state === 'charging' && particle.stateTimer > 60) {
        particle.state = 'idle';
        particle.energy = 50;
      }
      
      // Apply state-specific visual effects
      switch (particle.state) {
        case 'charging':
          particle.size = particle.baseSize * (1 + Math.sin(particle.stateTimer * 0.05) * 0.3);
          particle.opacity = particle.baseOpacity * (1 + Math.sin(particle.stateTimer * 0.07) * 0.2);
          break;
        case 'attracted':
          particle.hue = (particle.baseHue + particle.stateTimer * 0.5) % 360;
          break;
        default:
          particle.size = particle.baseSize + Math.sin(particle.pulsePhase) * 0.1;
          particle.opacity = particle.baseOpacity + Math.sin(particle.pulsePhase * 0.7) * 0.05;
      }
    };

    const animate = (currentTime: number) => {
      // Delta time for frame-rate independent animation
      const deltaTime = Math.min(currentTime - lastFrameTimeRef.current, 32);
      lastFrameTimeRef.current = currentTime;
      timeRef.current += deltaTime * 0.001;
      
      // Performance monitoring for adaptive quality
      performanceRef.current.frameCount++;
      if (currentTime - performanceRef.current.lastFpsCheck > 1000) {
        performanceRef.current.fps = performanceRef.current.frameCount;
        performanceRef.current.frameCount = 0;
        performanceRef.current.lastFpsCheck = currentTime;
      }

      const quality = Math.min(1, performanceRef.current.fps / 60);
      
      updateMouseVelocity();

      // Sophisticated background with dynamic gradients
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(9, 9, 11, 0.95)');
      gradient.addColorStop(1, 'rgba(15, 15, 20, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update spatial grid for O(n) particle interactions
      if (spatialGridRef.current) {
        spatialGridRef.current.clear();
        particlesRef.current.forEach(particle => {
          spatialGridRef.current!.insert(particle);
        });
      }

      // Enhanced wave system with multiple ripples
      wavesRef.current = wavesRef.current.filter(wave => {
        wave.radius += wave.speed;
        wave.opacity -= 0.003;
        
        if (wave.opacity > 0) {
          for (let i = 0; i < wave.ripples; i++) {
            const rippleRadius = wave.radius - i * 20;
            if (rippleRadius > 0) {
              const rippleOpacity = wave.opacity * (1 - i / wave.ripples);
              ctx.beginPath();
              ctx.arc(wave.x, wave.y, rippleRadius, 0, Math.PI * 2);
              ctx.strokeStyle = `hsla(${wave.hue + i * 10}, 70%, 60%, ${rippleOpacity})`;
              ctx.lineWidth = 2 - i * 0.3;
              ctx.stroke();
            }
          }
          return true;
        }
        return false;
      });

      // Update and visualize interaction fields
      fieldsRef.current = fieldsRef.current.filter(field => {
        field.strength *= (1 - field.decay);
        field.radius *= 1.01;
        
        if (field.strength > 1) {
          // Draw field visualization
          const gradient = ctx.createRadialGradient(
            field.x, field.y, 0,
            field.x, field.y, field.radius
          );
          const alpha = field.strength / 100 * 0.1;
          const fieldHue = field.type === 'attract' ? 180 : field.type === 'repel' ? 0 : 280;
          gradient.addColorStop(0, `hsla(${fieldHue}, 70%, 60%, ${alpha})`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(field.x, field.y, field.radius, 0, Math.PI * 2);
          ctx.fill();
          
          return true;
        }
        return false;
      });

      // Advanced particle system with sophisticated physics
      particlesRef.current.forEach((particle, i) => {
        updateParticleState(particle, deltaTime);
        
        // Perlin noise for organic, flowing movement (reduced)
        const noiseX = noiseRef.current.noise(particle.x * 0.002, timeRef.current * 0.05) * 0.02;
        const noiseY = noiseRef.current.noise(particle.y * 0.002, timeRef.current * 0.05 + 100) * 0.02;
        particle.vx += noiseX;
        particle.vy += noiseY;

        // Enhanced mouse interaction with professional easing
        if (isInteracting) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = easeOutCubic((200 - distance) / 200);
            const attractionStrength = mouseRef.current.isDown ? 0.08 : 0.025;
            
            particle.vx += (dx / distance) * force * attractionStrength;
            particle.vy += (dy / distance) * force * attractionStrength;
            particle.energy = Math.min(100, particle.energy + force * 2);
            
            if (distance < 50) {
              particle.state = 'attracted';
              particle.stateTimer = 0;
            }
          }
        }

        // Sophisticated interaction field effects
        fieldsRef.current.forEach(field => {
          const dx = field.x - particle.x;
          const dy = field.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < field.radius) {
            const force = (field.radius - distance) / field.radius * field.strength * 0.001;
            
            switch (field.type) {
              case 'attract':
                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;
                break;
              case 'repel':
                particle.vx -= (dx / distance) * force;
                particle.vy -= (dy / distance) * force;
                break;
              case 'vortex':
                const perpX = -dy / distance;
                const perpY = dx / distance;
                particle.vx += perpX * force + (dx / distance) * force * 0.3;
                particle.vy += perpY * force + (dy / distance) * force * 0.3;
                break;
            }
          }
        });

        // Efficient particle-to-particle interactions using spatial grid
        if (spatialGridRef.current && quality > 0.5) {
          const nearby = spatialGridRef.current.getNearby(particle, 100);
          nearby.forEach(otherParticle => {
            if (otherParticle !== particle) {
              const dx = otherParticle.x - particle.x;
              const dy = otherParticle.y - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 60 && distance > 0) {
                const force = (60 - distance) / 60;
                const repulsion = force * 0.01 / particle.mass;
                particle.vx -= (dx / distance) * repulsion;
                particle.vy -= (dy / distance) * repulsion;
                
                // Dynamic energy exchange
                const energyTransfer = force * 0.5;
                particle.energy += energyTransfer;
                otherParticle.energy -= energyTransfer;
              }
            }
          });
        }

        // Apply movement with delta time for smooth animation (very slow)
        particle.x += particle.vx * deltaTime * 0.01;
        particle.y += particle.vy * deltaTime * 0.01;

        // Seamless boundary wrapping
        const margin = 50;
        if (particle.x < -margin) particle.x = canvas.width + margin;
        else if (particle.x > canvas.width + margin) particle.x = -margin;
        if (particle.y < -margin) particle.y = canvas.height + margin;
        else if (particle.y > canvas.height + margin) particle.y = -margin;

        // Apply sophisticated friction
        particle.vx *= particle.friction;
        particle.vy *= particle.friction;

        // Update animation phases
        particle.pulsePhase += deltaTime * 0.0005;
        particle.rotationPhase += deltaTime * 0.0003;

        // Advanced trail system for energy and cosmic particles
        if (particle.type === 'energy' || particle.type === 'cosmic') {
          particle.trailHistory.push({
            x: particle.x,
            y: particle.y,
            alpha: 1,
            size: particle.size,
            hue: particle.hue
          });
          
          if (particle.trailHistory.length > particle.maxTrailLength) {
            particle.trailHistory.shift();
          }
          
          // Draw sophisticated trail with fade
          particle.trailHistory.forEach((point, index) => {
            point.alpha -= 0.008;
            if (point.alpha > 0) {
              const trailSize = point.size * (index / particle.trailHistory.length) * 0.7;
              ctx.beginPath();
              ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${point.hue}, 70%, 60%, ${point.alpha})`;
              ctx.fill();
            }
          });
        }
      });

      // Render particles with enhanced type-specific visuals
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotationPhase);

        // Type-specific rendering with professional effects
        switch (particle.type) {
          case 'star':
            // Star with multi-layer glow
            const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2);
            starGradient.addColorStop(0, `hsla(${particle.hue}, 80%, 80%, ${particle.opacity})`);
            starGradient.addColorStop(0.7, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity * 0.5})`);
            starGradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = starGradient;
            ctx.beginPath();
            ctx.arc(0, 0, particle.size * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Bright core
            ctx.fillStyle = `hsla(${particle.hue}, 90%, 90%, ${particle.opacity})`;
            ctx.beginPath();
            ctx.arc(0, 0, particle.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'energy':
            // Energy orb with electric effect
            const energyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 1.5);
            energyGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`);
            energyGradient.addColorStop(0.5, `hsla(${particle.hue + 30}, 80%, 60%, ${particle.opacity * 0.7})`);
            energyGradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = energyGradient;
            ctx.beginPath();
            ctx.arc(0, 0, particle.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'plasma':
            // Plasma with animated oscillating edges
            const plasmaGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
            plasmaGradient.addColorStop(0, `hsla(${particle.hue}, 90%, 70%, ${particle.opacity})`);
            plasmaGradient.addColorStop(0.8, `hsla(${particle.hue + 60}, 70%, 50%, ${particle.opacity * 0.6})`);
            plasmaGradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = plasmaGradient;
            for (let i = 0; i < 3; i++) {
              const radius = particle.size * (1 + Math.sin(particle.pulsePhase + i) * 0.3);
              ctx.beginPath();
              ctx.arc(0, 0, radius, 0, Math.PI * 2);
              ctx.fill();
            }
            break;

          case 'cosmic':
            // Cosmic dust with dynamic sparkle effects
            const cosmicGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 3);
            cosmicGradient.addColorStop(0, `hsla(${particle.hue}, 60%, 80%, ${particle.opacity})`);
            cosmicGradient.addColorStop(0.3, `hsla(${particle.hue + 120}, 50%, 60%, ${particle.opacity * 0.8})`);
            cosmicGradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = cosmicGradient;
            ctx.beginPath();
            ctx.arc(0, 0, particle.size * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Dynamic sparkle effect
            if (Math.random() < 0.1) {
              ctx.fillStyle = `hsla(${particle.hue}, 100%, 90%, ${particle.opacity})`;
              ctx.fillRect(-particle.size * 2, -0.5, particle.size * 4, 1);
              ctx.fillRect(-0.5, -particle.size * 2, 1, particle.size * 4);
            }
            break;

          case 'nebula':
            // Nebula cloud with flowing gradients
            const nebulaGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 4);
            nebulaGradient.addColorStop(0, `hsla(${particle.hue}, 40%, 60%, ${particle.opacity * 0.3})`);
            nebulaGradient.addColorStop(0.5, `hsla(${particle.hue + 180}, 30%, 40%, ${particle.opacity * 0.2})`);
            nebulaGradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = nebulaGradient;
            ctx.beginPath();
            ctx.arc(0, 0, particle.size * 4, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        ctx.restore();
      });

      // Enhanced connection system with gradient lines
      if (quality > 0.3) {
        particlesRef.current.forEach((particle, i) => {
          if (spatialGridRef.current) {
            const nearby = spatialGridRef.current.getNearby(particle, 120);
            nearby.forEach(otherParticle => {
              if (particle !== otherParticle && particlesRef.current.indexOf(otherParticle) > i) {
                const dx = otherParticle.x - particle.x;
                const dy = otherParticle.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                  const opacity = (120 - distance) / 120 * 0.2;
                  
                  const gradient = ctx.createLinearGradient(
                    particle.x, particle.y,
                    otherParticle.x, otherParticle.y
                  );
                  gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${opacity})`);
                  gradient.addColorStop(0.5, `hsla(${(particle.hue + otherParticle.hue) / 2}, 70%, 60%, ${opacity * 1.5})`);
                  gradient.addColorStop(1, `hsla(${otherParticle.hue}, 70%, 60%, ${opacity})`);
                  
                  ctx.strokeStyle = gradient;
                  ctx.lineWidth = opacity * 3;
                  ctx.beginPath();
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(otherParticle.x, otherParticle.y);
                  ctx.stroke();
                }
              }
            });
          }
        });
      }

      // Draw elegant mouse trail
      if (isInteracting && mouseRef.current.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(mouseRef.current.trail[0].x, mouseRef.current.trail[0].y);
        
        for (let i = 1; i < mouseRef.current.trail.length; i++) {
          const point = mouseRef.current.trail[i];
          const alpha = i / mouseRef.current.trail.length * 0.5;
          ctx.strokeStyle = `hsla(200, 70%, 60%, ${alpha})`;
          ctx.lineWidth = alpha * 4;
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Set up event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    // Initialize
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [createParticle, createWave, createInteractionField]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        opacity: 0.8, 
        pointerEvents: 'auto',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default InteractiveBackground;