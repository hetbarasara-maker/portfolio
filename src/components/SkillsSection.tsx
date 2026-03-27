import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const categories = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "Tailwind", "React", "Next.js"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "PHP", "Java"],
  },
  {
    title: "Programming",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Database",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Postman", "Figma", "Netlify"],
  },
];

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" title="Skills" subtitle="Technologies I work with">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: ci * 0.1, ease: [0.2, 0, 0, 1] }}
            whileHover={{ y: -4 }}
            className="gradient-border-wrapper"
          >
            <div className="bg-card p-5 rounded-[11px] h-full text-center sm:text-left">
              <h3 className="font-semibold text-sm mb-4 text-primary font-mono-display tracking-wider uppercase">{cat.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground border border-foreground/[0.05] font-mono-display">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
