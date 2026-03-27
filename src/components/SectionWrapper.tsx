import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, title, subtitle, children, className = "" }: Props) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <div className="container mx-auto px-4">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="section-heading glow-text">{title}</h2>
            {subtitle && <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
