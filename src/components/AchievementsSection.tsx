import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Trophy, Star, GitBranch } from "lucide-react";

const achievements = [
  { icon: Trophy, title: "Hackathon Finalist", desc: "Top 5 finish in National Level Hackathon 2024 with 500+ participants." },
  { icon: Star, title: "Coding Competition", desc: "Ranked in top 1% in university coding competitions for 2 consecutive years." },
  { icon: GitBranch, title: "Open Source", desc: "Active contributor to 10+ open source projects with 50+ merged PRs." },
];

export default function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" title="Achievements" subtitle="Milestones and recognitions">
      <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            whileHover={{ y: -4 }}
            className="glass-card-hover p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon size={22} className="text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
