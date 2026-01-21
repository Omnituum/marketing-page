import { useEffect, useRef, useState } from 'react';

interface HexNode {
  x: number;
  y: number;
  col: number;
  row: number;
  neighbors: number[];
}

interface SecurityPulse {
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

export function OmniBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Omni colors - deeper violet/indigo palette
    const nodeColor = { r: 109, g: 40, b: 217 }; // Deep violet
    const pulseColorStart = { r: 79, g: 70, b: 229 }; // Indigo
    const pulseColorEnd = { r: 13, g: 148, b: 136 }; // Muted teal

    // Build deterministic hexagonal grid
    const hexRadius = 70; // Slightly larger spacing for security feel
    const hexHeight = hexRadius * Math.sqrt(3);
    const nodes: HexNode[] = [];
    const nodeMap: Map<string, number> = new Map();

    const cols = Math.ceil(width / (hexRadius * 1.5)) + 4;
    const rows = Math.ceil(height / hexHeight) + 4;
    const offsetX = -hexRadius * 2;
    const offsetY = -hexHeight;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * hexRadius * 1.5;
        const y = offsetY + row * hexHeight + (col % 2) * (hexHeight / 2);
        const key = `${col},${row}`;
        nodeMap.set(key, nodes.length);
        nodes.push({ x, y, col, row, neighbors: [] });
      }
    }

    // Build neighbor connections
    nodes.forEach((node, idx) => {
      const { col, row } = node;
      const neighborOffsets = col % 2 === 0
        ? [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]]
        : [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0], [1, 1]];

      neighborOffsets.forEach(([dc, dr]) => {
        const neighborKey = `${col + dc},${row + dr}`;
        const neighborIdx = nodeMap.get(neighborKey);
        if (neighborIdx !== undefined && neighborIdx > idx) {
          node.neighbors.push(neighborIdx);
        }
      });
    });

    // Security pulse state - slower, more deliberate
    let activePulse: SecurityPulse | null = null;
    let lastPulseTime = 0;
    const pulseInterval = 12000; // 12 seconds between pulses (slower)
    const pulseDuration = 3500; // 3.5 seconds per pulse (longer)

    const triggerPulse = (time: number) => {
      const eligibleNodes = nodes.filter(n =>
        n.x > width * 0.2 && n.x < width * 0.8 &&
        n.y > height * 0.3 && n.y < height * 0.7
      );

      if (eligibleNodes.length === 0) return;

      const selectedIdx = Math.floor((time / 1000) % eligibleNodes.length);
      const node = eligibleNodes[selectedIdx];

      activePulse = {
        x: node.x,
        y: node.y,
        startTime: time,
        duration: pulseDuration,
      };
      lastPulseTime = time;
    };

    // Slower drift for more serious feel
    const driftCycleDuration = 200000; // 200 seconds
    const driftAmplitudeX = 10;
    const driftAmplitudeY = 15;

    let startTime = performance.now();

    const draw = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // Deeper gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#050507');
      gradient.addColorStop(0.5, '#08080d');
      gradient.addColorStop(1, '#050507');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Calculate time drift
      let driftX = 0;
      let driftY = 0;
      if (!prefersReducedMotion) {
        const driftProgress = (elapsed % driftCycleDuration) / driftCycleDuration;
        const driftAngle = driftProgress * Math.PI * 2;
        driftX = Math.sin(driftAngle) * driftAmplitudeX;
        driftY = Math.cos(driftAngle * 0.7) * driftAmplitudeY;
      }

      ctx.save();
      ctx.translate(driftX, driftY);

      // Draw connection lines - even more subtle
      ctx.strokeStyle = `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, 0.05)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      nodes.forEach((node) => {
        node.neighbors.forEach((neighborIdx) => {
          const neighbor = nodes[neighborIdx];
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(neighbor.x, neighbor.y);
        });
      });
      ctx.stroke();

      // Draw nodes
      nodes.forEach((node) => {
        let opacity = 0.12;
        let radius = 1.5;
        let glowRadius = 0;

        if (activePulse && !prefersReducedMotion) {
          const pulseElapsed = currentTime - activePulse.startTime;
          if (pulseElapsed < activePulse.duration) {
            const pulseProgress = pulseElapsed / activePulse.duration;
            const pulseRadius = pulseProgress * 220;
            const dist = Math.hypot(node.x - activePulse.x, node.y - activePulse.y);

            if (dist < pulseRadius && dist > pulseRadius - 45) {
              const intensity = 1 - Math.abs(dist - (pulseRadius - 22)) / 22;
              const fade = 1 - pulseProgress;
              opacity = 0.12 + intensity * fade * 0.5;
              glowRadius = intensity * fade * 8;
            }
          }
        }

        if (glowRadius > 0) {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
          const pulseProgress = activePulse ? (currentTime - activePulse.startTime) / activePulse.duration : 0;
          const r = Math.round(pulseColorStart.r + (pulseColorEnd.r - pulseColorStart.r) * pulseProgress);
          const g = Math.round(pulseColorStart.g + (pulseColorEnd.g - pulseColorStart.g) * pulseProgress);
          const b = Math.round(pulseColorStart.b + (pulseColorEnd.b - pulseColorStart.b) * pulseProgress);
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.3)`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor.r}, ${nodeColor.g}, ${nodeColor.b}, ${opacity})`;
        ctx.fill();
      });

      // Draw security pulse ring
      if (activePulse && !prefersReducedMotion) {
        const pulseElapsed = currentTime - activePulse.startTime;
        if (pulseElapsed < activePulse.duration) {
          const pulseProgress = pulseElapsed / activePulse.duration;
          const easeProgress = 1 - Math.pow(1 - pulseProgress, 2);
          const pulseRadius = easeProgress * 220;
          const fade = 1 - pulseProgress;

          const r = Math.round(pulseColorStart.r + (pulseColorEnd.r - pulseColorStart.r) * pulseProgress);
          const g = Math.round(pulseColorStart.g + (pulseColorEnd.g - pulseColorStart.g) * pulseProgress);
          const b = Math.round(pulseColorStart.b + (pulseColorEnd.b - pulseColorStart.b) * pulseProgress);

          ctx.beginPath();
          ctx.arc(activePulse.x, activePulse.y, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${fade * 0.2})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Subtle origin glow
          const originGlow = ctx.createRadialGradient(
            activePulse.x, activePulse.y, 0,
            activePulse.x, activePulse.y, 25
          );
          originGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${fade * 0.35})`);
          originGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = originGlow;
          ctx.beginPath();
          ctx.arc(activePulse.x, activePulse.y, 25, 0, Math.PI * 2);
          ctx.fill();
        } else {
          activePulse = null;
        }
      }

      ctx.restore();

      if (!prefersReducedMotion && currentTime - lastPulseTime > pulseInterval && !activePulse) {
        triggerPulse(currentTime);
      }

      // Stronger vignette for security feel
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.25,
        width / 2, height / 2, height * 0.85
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(draw);
    };

    setTimeout(() => triggerPulse(performance.now()), 3000);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#050507' }}
      aria-hidden="true"
    />
  );
}
