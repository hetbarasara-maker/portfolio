import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  {
    title: "Introduction to Generative AI Studio",
    issuer: "Google Cloud x Simplilearn",
    year: "2025",
    link: "https://drive.google.com/file/d/1yz0LNNKvNwIHIQ1FPE6-JeD3MI4c7ZII/view?usp=sharing"
  },
  {
    title: "Introduction to MERN Stack",
    issuer: "Simplilearn",
    year: "2026",
    link: "https://drive.google.com/file/d/1YnsK-m-Zzp0tVNMRYSZOpAgnOHASL6qN/view?usp=sharing"
  },
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    year: "2025",
    link: "https://drive.google.com/file/d/11v6Iyy5sNBXon7yDiG51ZjluP7TniQRZ/view?usp=sharing"
  },
  {
    title: "Bug in Manual Testing (Webinar)",
    issuer: "TOPS Technologies",
    year: "2024",
    link: "https://drive.google.com/file/d/16RhswpX_ssWBrGYVuq6CEVke2vKhBXWW/view?usp=sharing"
  },
  {
    title: "Front End Development",
    issuer: "TOPS Technologies",
    year: "2024",
    link: "https://drive.google.com/file/d/16SU753OhL7RwvuL-cue9xfjoO6zeNHHf/view?usp=sharing"
  },
  {
    title: "How to Protect your Website from Hackers",
    issuer: "TOPS Technologies",
    year: "2024",
    link: "https://drive.google.com/file/d/16TAZeMA3oAULqsCcX6X7g2O7XFD7_3p9/view?usp=sharing"
  },
];

export default function CertificationsSection() {
  return (
    <SectionWrapper id="certifications" title="Certifications" subtitle="Professional credentials">
      <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {certs.map((cert, i) => (
          <motion.a
            key={cert.title}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-card-hover p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
          >
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Award size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors leading-tight mb-1">{cert.title}</h3>
                <p className="text-muted-foreground text-[11px] font-mono-display uppercase tracking-widest">{cert.issuer} • {cert.year}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <span className="text-[9px] font-mono-display font-bold uppercase tracking-widest text-primary/0 group-hover:text-primary transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 flex items-center gap-1">
                View Certificate <ExternalLink size={10} />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
