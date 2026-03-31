import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Canvas dimensions
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles: Particle[] = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
        const connectionDistance = 150;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(79, 70, 229, 0.5)"; // Modern Indigo/Primary color
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Gradient background
            const gradient = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, Math.max(width, height)
            );
            gradient.addColorStop(0, "#0a0a0c");
            gradient.addColorStop(1, "#020203");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            // Draw connections
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;
                        ctx.strokeStyle = `rgba(129, 140, 248, ${opacity * 0.2})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        // Initial load timer
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2800);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
                >
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                    />

                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                            className="mb-6 flex flex-col items-center"
                        >
                            <div className="relative mb-8">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-primary rounded-full animate-spin"
                                    style={{ animationDuration: '3s' }}
                                />
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center text-primary font-mono-display text-xl sm:text-2xl font-bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                >
                                    HB
                                </motion.div>
                            </div>

                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        delay: 1.2,
                                        duration: 0.8,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white font-mono-display uppercase italic"
                                >
                                    HET <span className="text-primary glow-text">BARASARA</span>
                                </motion.h1>
                            </div>

                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "100%", opacity: 1 }}
                                transition={{ delay: 1.8, duration: 1 }}
                                className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-4 max-w-[300px] w-full"
                            />

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                transition={{ delay: 2.2, duration: 0.5 }}
                                className="mt-6 text-[10px] sm:text-xs uppercase tracking-[0.5em] text-muted-foreground font-mono-display ml-[0.5em]"
                            >
                                Full Stack Developer & Problem Solver
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Vignette effect */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
