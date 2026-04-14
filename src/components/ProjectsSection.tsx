import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { ExternalLink, Github, Youtube, ChevronDown, ChevronUp } from "lucide-react";
import fintrackImg from "@/assets/fintrack.png";

import cafeHeavenImg from "@/assets/cafe-heaven.png";
import mutualFundImg from "@/assets/mutual-fund.png";
import woodcraftImg from "@/assets/woodcraft.png";
import carnestImg from "@/assets/carnest.png";

const projects = [
  {
    title: "FinTrack",
    desc: "A comprehensive personal finance tracker that helps you manage expenses, track savings, and visualize your financial health with interactive charts.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Supabase"],
    image: fintrackImg,
    live: "https://fin-track-ashen.vercel.app/auth/login",
    source: "https://github.com/hetbarasara-maker/FinTrack",
    youtube: "#",
  },
  {
    title: "Mutual Fund Explorer",
    desc: "A powerful platform for discovering, comparing, and analyzing mutual funds. Features real-time fund performance tracking and systematic investment planning (SIP) insights.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    image: mutualFundImg,
    live: "https://mutual-fund-kappa.vercel.app/",
    source: "https://github.com/hetbarasara-maker/mutual_fund",
    youtube: "#",
  },
  {
    title: "CarNest",
    desc: "A premium car interior solutions platform featuring custom-fitted parts, luxury seat covers, and ambient lighting to transform your driving experience.",
    tech: ["React", "Vite", "Tailwind CSS"],
    image: carnestImg,
    live: "https://car-nest-lovat.vercel.app/",
    source: "https://github.com/hetbarasara-maker/car_nest",
    youtube: "#",
  },
  {
    title: "WoodCraft Furniture",
    desc: "A premium e-commerce platform for handcrafted furniture, featuring a sleek modern design, categorised browsing, and a seamless shopping experience.",
    tech: ["HTML", "CSS", "JavaScript", "Netlify"],
    image: woodcraftImg,
    live: "https://woodcraftfurniture.netlify.app/",
    source: "https://github.com/hetbarasara-maker/WoodCraft-furniture-",
    youtube: "#",
  },
  {
    title: "Cafe Heaven",
    desc: "A beautiful, responsive coffee shop website featuring a curated menu, testimonials, and contact section. Built with a premium warm aesthetic.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: cafeHeavenImg,
    live: "https://funny-semifreddo-0560f1.netlify.app/",
    source: "https://github.com/hetbarasara-maker/Cafe-Heaven",
    youtube: "#",
  },
];

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Some things I've built">
      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {projects.slice(0, showAll ? projects.length : 4).map((project, i) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
              className="glass-card-hover overflow-hidden group flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              </div>
              <div className="p-5 flex flex-col flex-grow text-center sm:text-left">
                <h3 className="font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 flex-grow">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4 justify-center sm:justify-start">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[11px] rounded bg-primary/10 text-primary font-mono-display">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                  <motion.a
                    whileTap={{ scale: 0.96 }}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-4 py-2 text-[10px] sm:text-xs rounded-md bg-primary text-primary-foreground flex items-center gap-1.5 hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    <ExternalLink size={12} /> Live Demo
                  </motion.a>
                  <motion.a
                    whileTap={{ scale: 0.96 }}
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-4 py-2 text-[10px] sm:text-xs rounded-md border border-foreground/10 flex items-center gap-1.5 hover:border-primary/30 transition-colors whitespace-nowrap"
                  >
                    <Github size={12} /> Source
                  </motion.a>
                  <motion.a
                    whileTap={{ scale: 0.96 }}
                    href={project.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-4 py-2 text-[10px] sm:text-xs rounded-md border border-destructive/20 text-destructive-foreground flex items-center gap-1.5 hover:bg-destructive/10 transition-colors whitespace-nowrap"
                    style={{ background: 'hsl(var(--destructive) / 0.1)' }}
                  >
                    <Youtube size={12} className="text-[#FF0000]" /> Video
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {projects.length > 4 && (
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            {showAll ? (
              <>Show Less <ChevronUp size={16} /></>
            ) : (
              <>View More <ChevronDown size={16} /></>
            )}
          </motion.button>
        </div>
      )}
    </SectionWrapper>
  );
}
