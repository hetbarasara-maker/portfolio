import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { GraduationCap } from "lucide-react";

const education = [
  {
    year: "2025 – Present",
    title: "B.Tech in Information Technology",
    school: "Rai University x CodingGita",
    desc: "Currently pursuing advanced studies in Information Technology with a focus on practical coding and software development."
  },
  {
    year: "2022 – 2025",
    title: "Diploma in Information Technology",
    school: "Ganpat University",
    desc: "Completed specialized technical education in Information Technology, building a strong foundation in core IT concepts."
  },
  {
    year: "2020 – 2022",
    title: "Secondary School Certificate (10th)",
    school: "Navyug Vidhyalaya",
    desc: "Completed foundational education with a focus on science and mathematics."
  },
];

export default function EducationSection() {
  return (
    <SectionWrapper id="education" title="Education" subtitle="My academic journey">
      <div className="max-w-2xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-foreground/[0.08]" />

        {education.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.2, 0, 0, 1] }}
            className="relative pl-16 pb-10 last:pb-0"
          >
            {/* Dot */}
            <div className="absolute left-[18px] top-1 w-3 h-3 rounded-full bg-primary" style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.5)" }} />

            <span className="font-mono-display text-xs text-primary/80 tracking-wider uppercase">{item.year}</span>
            <div className="glass-card-hover p-5 mt-2">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap size={16} className="text-primary" />
                <h3 className="font-semibold text-sm">{item.title}</h3>
              </div>
              <p className="text-muted-foreground text-xs mb-1">{item.school}</p>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
