import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const links = [
  "Home", "About", "Education", "Skills", "Projects",
  "Certifications", "LeetCode", "Contact",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    // Explicit mapping to avoid any lowercase/uppercase mismatches
    const idMap: { [key: string]: string } = {
      "Home": "home",
      "About": "about",
      "Education": "education",
      "Skills": "skills",
      "Projects": "projects",
      "Certifications": "certifications",
      "LeetCode": "leetcode",
      "Contact": "contact",
    };

    const targetId = idMap[id] || id.toLowerCase();

    // First close the menu
    setOpen(false);

    // Use a small timeout to allow state update and then scroll
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const offset = 80; // height of the navbar
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-foreground/[0.05] backdrop-blur-xl bg-background/80">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <motion.div
          className="flex items-center gap-3 group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => scrollTo("home")}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-lg group-hover:rotate-180 transition-transform duration-700 ease-out border border-white/10" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="z-10 transition-all duration-500">
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
              <path
                d="M4 4V20M4 12H12M12 4V20M14 4H18C20 4 21 5 21 7V9C21 11 20 12 18 12H14M14 12H18C20 12 21 13 21 15V17C21 19 20 20 18 20H14V4Z"
                stroke="url(#logo-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-white transition-colors duration-500"
              />
            </svg>
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/40 to-accent/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.2em] uppercase leading-none text-foreground">Het</span>
            <span className="text-[11px] font-medium tracking-[0.3em] uppercase leading-tight text-primary mt-0.5">Barasara</span>
          </div>
        </motion.div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
            </button>
          ))}
        </div>

        {/* Social icons & Theme */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeSwitcher />
          <div className="w-[1px] h-4 bg-white/10 mx-1" />
          {[
            { icon: Github, href: "https://github.com/hetbarasara-maker" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/het-barasara-12a331383" },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <ThemeSwitcher />
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-foreground/[0.05] backdrop-blur-xl overflow-hidden bg-background/95"
          >
            <div className="flex flex-col p-4 gap-2">
              {links.map((link) => (
                <motion.button
                  key={link}
                  whileTap={{ scale: 0.96, x: 4 }}
                  onClick={() => scrollTo(link)}
                  className="text-left px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all"
                >
                  {link}
                </motion.button>
              ))}
              <div className="flex gap-6 px-3 pt-4 pb-2 border-t border-foreground/[0.05] mt-2">
                <a href="https://github.com/hetbarasara-maker" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/het-barasara-12a331383" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
