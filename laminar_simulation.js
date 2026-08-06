/* ==========================================================================
   Laminar Flow Simulation - HTML5 Canvas Fluid Streamline Engine
   Author: Laminar Flow Ventures
   Theme: Subtle, Faint & Elegant Ambient Fluid Motion
   ========================================================================== */

class LaminarSimulation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.particles = [];
        this.streamlines = [];
        this.particleCount = 140;
        this.streamlineCount = 24;
        
        this.mode = 'laminar'; // 'laminar', 'vortex', 'turbulent'
        this.baseVelocity = 2.8;
        this.time = 0;
        
        this.mouse = {
            x: -1000,
            y: -1000,
            targetX: -1000,
            targetY: -1000,
            active: false
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.targetX = e.clientX - rect.left;
            this.mouse.targetY = e.clientY - rect.top;
            this.mouse.active = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.active = false;
        });

        this.createParticles();
        this.createStreamlines();
        this.animate();
    }
    
    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.createStreamlines();
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 1.8 + 0.8,
                speed: Math.random() * 0.7 + 0.4,
                alpha: Math.random() * 0.18 + 0.05, // Ultra faint & soft
                hue: Math.random() * 30 + 195
            });
        }
    }
    
    createStreamlines() {
        this.streamlines = [];
        const spacing = this.height / (this.streamlineCount + 1);
        for (let i = 0; i <= this.streamlineCount; i++) {
            this.streamlines.push({
                baseY: spacing * (i + 0.5),
                amplitude: Math.random() * 8 + 4,
                frequency: 0.004 + Math.random() * 0.002
            });
        }
    }
    
    updateMouse() {
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.1;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.1;
    }
    
    getVelocityField(x, y) {
        let vx = this.baseVelocity;
        let vy = 0;
        
        if (this.mouse.active) {
            const dx = x - this.mouse.x;
            const dy = y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 220;
            
            if (dist < maxDist) {
                const force = (1 - dist / maxDist);
                if (this.mode === 'laminar') {
                    const angle = Math.atan2(dy, dx);
                    vy += Math.sin(angle) * force * 3.5;
                    vx += Math.cos(angle) * force * 1.2;
                } else if (this.mode === 'vortex') {
                    vy += -dx * force * 0.04;
                    vx += dy * force * 0.04;
                } else if (this.mode === 'turbulent') {
                    vy += (Math.sin(x * 0.05 + this.time * 5) + Math.cos(y * 0.05)) * force * 6;
                    vx += (Math.cos(y * 0.05 + this.time * 5)) * force * 3;
                }
            }
        }
        
        if (this.mode === 'turbulent') {
            vy += Math.sin(x * 0.01 + y * 0.01 + this.time) * 1.0;
        }
        
        return { vx, vy };
    }

    drawStreamlines() {
        const resolution = 25;
        this.streamlines.forEach((line, idx) => {
            this.ctx.beginPath();
            this.ctx.lineWidth = idx % 3 === 0 ? 1.0 : 0.6; // Very thin, delicate lines
            
            const gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
            gradient.addColorStop(0, 'rgba(0, 119, 255, 0.02)');
            gradient.addColorStop(0.5, 'rgba(0, 119, 255, 0.08)'); // Very faint stream trace
            gradient.addColorStop(1, 'rgba(0, 184, 217, 0.02)');
            this.ctx.strokeStyle = gradient;

            let currY = line.baseY;
            this.ctx.moveTo(0, currY);

            for (let x = 0; x < this.width; x += resolution) {
                const vel = this.getVelocityField(x, currY);
                currY += vel.vy * 0.8 + Math.sin(x * line.frequency + this.time) * 0.4;
                this.ctx.lineTo(x, currY);
            }

            this.ctx.stroke();
        });
    }

    drawParticles() {
        this.particles.forEach((p) => {
            const vel = this.getVelocityField(p.x, p.y);
            p.x += vel.vx * p.speed;
            p.y += vel.vy * p.speed;

            if (p.x > this.width) {
                p.x = -10;
                p.y = Math.random() * this.height;
            }
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            this.ctx.fillStyle = `hsla(${p.hue}, 80%, 50%, ${p.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.strokeStyle = `hsla(${p.hue}, 80%, 50%, ${p.alpha * 0.4})`;
            this.ctx.lineWidth = p.size * 0.7;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p.x - vel.vx * 3, p.y - vel.vy * 3);
            this.ctx.stroke();
        });
    }

    animate() {
        this.time += 0.015;
        this.updateMouse();

        // Clear Canvas with soft clean fade
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.drawStreamlines();
        this.drawParticles();

        requestAnimationFrame(() => this.animate());
    }
    
    setMode(newMode) {
        this.mode = newMode;
    }
    
    setSpeed(speedVal) {
        this.baseVelocity = parseFloat(speedVal);
    }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.laminarSim = new LaminarSimulation('laminar-canvas');
});
