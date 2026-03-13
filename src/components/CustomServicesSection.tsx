import { motion } from "framer-motion";
import { Paintbrush, Cog, Package, Wrench } from "lucide-react";

const services = [
  {
    icon: Cog,
    title: "Prototyping",
    desc: "Rapid iteration from CAD to physical part. Test fit, form, and function before committing to production.",
  },
  {
    icon: Paintbrush,
    title: "Art & Cosplay",
    desc: "Props, figurines, cosplay armor — we bring digital art into the real world with stunning detail.",
  },
  {
    icon: Package,
    title: "Small Batch Runs",
    desc: "Need 10, 50, or 100 identical parts? Our farm handles batch orders with consistency.",
  },
  {
    icon: Wrench,
    title: "Custom Engineering",
    desc: "Jigs, fixtures, replacement parts — functional prints designed to solve real problems.",
  },
];

const CustomServicesSection = () => {
  return (
    <section id="services" className="py-24 px-4 bg-card relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Custom <span className="text-primary text-glow">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond standard prints — we offer tailored solutions for unique projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 p-6 rounded-lg border border-border bg-background/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                <svc.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-2">{svc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomServicesSection;
