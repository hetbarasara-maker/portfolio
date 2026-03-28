import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { Send, Mail, Github, Linkedin, Youtube } from "lucide-react";
import { useState, FormEvent } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xgopvrqz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here if you have one
    alert("Email copied to clipboard!");
  };

  return (
    <SectionWrapper id="contact" title="Contact" subtitle="Let's work together" className="!pb-8 sm:!pb-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="glass-card p-6 space-y-4"
        >
          {[
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="text-[11px] uppercase tracking-widest text-primary/80 mb-1.5 block font-mono-display">{label}</label>
              <input
                name={key}
                type={type}
                required
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-secondary/50 border border-foreground/[0.08] rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-shadow duration-300"
                style={{ boxShadow: "none" }}
                onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px hsl(var(--primary) / 0.3)`)}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          ))}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-primary/80 mb-1.5 block font-mono-display">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-secondary/50 border border-foreground/[0.08] rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none resize-none transition-shadow duration-300"
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px hsl(var(--primary) / 0.3)`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <motion.button
            whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
            whileTap={{ scale: status === "sending" ? 1 : 0.96 }}
            type="submit"
            disabled={status === "sending"}
            className={`w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${status === "success" ? "bg-green-500 text-white" :
              status === "error" ? "bg-red-500 text-white" :
                "bg-primary text-primary-foreground"
              }`}
            style={{ boxShadow: status === "idle" ? "0 0 15px hsl(var(--primary) / 0.4)" : "none" }}
          >
            {status === "idle" && <><Send size={16} /> Send Message</>}
            {status === "sending" && <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Sending...</span>}
            {status === "success" && "Message Sent!"}
            {status === "error" && "Error - Please try again"}
          </motion.button>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-green-500 font-mono-display text-center uppercase tracking-widest"
            >
              Thank you! I'll get back to you soon.
            </motion.p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="flex flex-col justify-center gap-6 text-center md:text-left"
        >
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                label: "het.barasara.cg@gmail.com",
                href: "mailto:het.barasara.cg@gmail.com",
                onClick: (e: any) => {
                  e.preventDefault();
                  copyToClipboard("het.barasara.cg@gmail.com");
                  window.location.href = "mailto:het.barasara.cg@gmail.com";
                }
              },
              { icon: Github, label: "github.com/hetbarasara-maker", href: "https://github.com/hetbarasara-maker" },
              { icon: Linkedin, label: "linkedin.com/in/het-barasara", href: "https://www.linkedin.com/in/het-barasara-12a331383" },
              { icon: Youtube, label: "@HetBarasara1", href: "https://www.youtube.com/@HetBarasara1" },
            ].map(({ icon: Icon, label, href, onClick }) => (
              <a
                key={label}
                href={href}
                onClick={onClick}
                target={href.startsWith('mailto:') ? undefined : "_blank"}
                rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs sm:text-sm justify-center md:justify-start"
              >
                <Icon size={16} className="sm:size-[18px] shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-foreground/[0.08] text-center px-4">
        <p className="text-muted-foreground/80 text-[10px] sm:text-[12px] font-mono-display uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-opacity">
          © 2026 Het Barasara • Building beyond the screen
        </p>
      </div>
    </SectionWrapper>
  );
}
