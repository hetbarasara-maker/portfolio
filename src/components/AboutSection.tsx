import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { User, MapPin, BookOpen, Code2, Lightbulb, Rocket } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const highlights = [
  { icon: User, title: "Full Name", desc: "Het Barasara" },
  { icon: BookOpen, title: "Education", desc: "B.Tech in Information Technology" },
  { icon: MapPin, title: "Location", desc: "Ahmedabad, Gujarat, India" },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About Me" subtitle="Passionate developer crafting digital experiences">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="glass-card p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left"
        >
          <div className="relative shrink-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-60 rounded-2xl overflow-hidden border border-white/10 glass-card p-0">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-lg">
              I'm a fullstack developer with a passion for creating beautiful, functional web applications. With experience spanning frontend frameworks like React and Next.js to backend systems with Node.js and databases, I bring ideas to life through code.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              When I'm not coding, you'll find me solving algorithmic challenges, contributing to open source, or exploring the latest in cloud computing and DevOps.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="flex flex-col">
                <span className="text-xs text-primary font-mono-display uppercase tracking-wider">Experience</span>
                <span className="text-xl font-bold italic">Fresher</span>
              </div>
              <div className="w-px h-10 bg-white/10 mx-2" />
              <div className="flex flex-col">
                <span className="text-xs text-primary font-mono-display uppercase tracking-wider">Projects</span>
                <span className="text-xl font-bold italic">5+ Built</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
              className="glass-card-hover p-5 flex gap-4 items-start"
            >
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
