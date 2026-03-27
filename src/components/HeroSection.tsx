import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const techIcons = [
  { name: "React", color: "#61dafb" },
  { name: "JS", color: "#f7df1e" },
  { name: "TS", color: "#3178c6" },
  { name: "Node", color: "#339933" },
  { name: "Git", color: "#f05032" },
  { name: "HTML", color: "#e34f26" },
  { name: "CSS", color: "#1572b6" },
];

function OrbitIcon({ name, color, index, total }: { name: string; color: string; index: number; total: number }) {
  const startAngle = (360 / total) * index;
  const duration = 20 + index * 2;
  const radius = 240;

  // Pre-calculate positions using CSS custom properties won't work with motion,
  // so we use keyframes with calculated positions
  const keyframes = Array.from({ length: 61 }, (_, i) => {
    const angle = startAngle + (360 * i) / 60;
    const rad = (angle * Math.PI) / 180;
    const sin = Math.sin(rad);
    return {
      x: Math.cos(rad) * radius,
      y: sin * radius * 0.85, // increased vertical stretch to pass above/below photo
      scale: 1 + sin * 0.15, // Bottom half (sin > 0) is closer/larger
      zIndex: sin >= 0 ? 5 : 1 // Always below photo (z-30), slight depth difference for 3D feel
    };
  });

  return (
    <motion.div
      className="absolute glass-card flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-xs font-bold font-mono-display"
      style={{
        top: "calc(50% - 20px)",
        left: "calc(50% - 20px)",
        color,
        boxShadow: `0 0 15px ${color}33`,
      }}
      animate={{
        x: keyframes.map((k) => k.x),
        y: keyframes.map((k) => k.y),
        scale: keyframes.map((k) => k.scale),
        zIndex: keyframes.map((k) => k.zIndex),
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {name}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 sm:pt-16 relative overflow-x-clip overflow-y-visible">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]" style={{ background: "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--accent)))" }} />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center py-8 lg:py-0">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="text-center lg:text-left z-20 pt-8 sm:pt-0"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-[9px] sm:text-xs font-mono-display tracking-wider text-primary border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ background: "hsl(var(--primary) / 0.08)" }}
          >
            Fullstack Developer Portfolio
          </motion.span>

          <h1 className="text-[clamp(1.875rem,8vw,3.75rem)] font-bold tracking-tight leading-[1.2] mb-6">
            Building the next <br className="hidden sm:block" />
            <span className="text-primary glow-text">generation</span>{" "}
            of the web.
          </h1>

          <p className="text-muted-foreground text-xs sm:text-lg max-w-md mb-8 leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0 text-center lg:text-left">
            A passionate software developer building scalable and modern web applications with cutting-edge technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center sm:items-stretch px-4 sm:px-0">
            <div className="flex gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="flex-1 sm:flex-none px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-shadow duration-300"
                style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.4)" }}
              >
                About <ArrowRight size={14} className="sm:size-4" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3 rounded-lg border border-primary/40 text-primary font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors duration-300"
              >
                Resume <span className="opacity-70">↓</span>
              </motion.a>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-6 py-3 rounded-lg border border-foreground/10 text-foreground font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:border-primary/30 transition-colors duration-300"
            >
              View Projects <ExternalLink size={14} className="sm:size-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right orbit visual */}
        <motion.div
          className="relative h-[280px] sm:h-[450px] flex items-center justify-center overflow-visible mt-4 sm:mt-8 lg:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Orbit rings - adjusted sizes for mobile */}
          <div className="absolute w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] rounded-full border border-foreground/[0.06]" />
          <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-foreground/[0.04] hidden sm:block" />

          {/* Center sphere replaced with Profile Photo */}
          <div className="relative z-30 group">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition duration-1000"></div>
            <div
              className="w-48 h-48 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-primary/30 relative z-10"
              style={{
                boxShadow: "0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.2)",
              }}
            >
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>

          {/* Orbiting icons - smarter mobile scaling */}
          <div className="absolute inset-0 flex items-center justify-center scale-[0.65] sm:scale-100 origin-center transition-all duration-700">
            {techIcons.map((icon, i) => (
              <OrbitIcon key={icon.name} {...icon} index={i} total={techIcons.length} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
