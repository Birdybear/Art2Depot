import { motion } from "framer-motion";
import { Layers, Droplets, Settings, Award } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "FDM Printing",
    desc: "High-strength parts with layer-by-layer precision. PLA, PETG, ABS, TPU and more.",
  },
  {
    icon: Droplets,
    title: "Resin Printing",
    desc: "Ultra-fine detail for miniatures, jewelry, prototypes, and intricate designs.",
  },
  {
    icon: Settings,
    title: "Custom Finishing",
    desc: "Sanding, painting, vapor smoothing — we deliver production-ready results.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    desc: "Every print is inspected and tested before shipping to ensure top-tier output.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            About <span className="text-primary text-glow">Art2Depot</span>
          </h2>
          <p className="text-lg text-secondary-foreground max-w-3xl mx-auto leading-relaxed">
            Art2Depot is a small, dedicated 3D printing service built on years of hands-on
            experience with additive manufacturing. We specialize in delivering{" "}
            <span className="text-primary font-semibold">high-quality output</span> across
            both FDM and resin technologies — from functional prototypes and mechanical parts
            to detailed miniatures and artistic pieces.
          </p>
          <p className="text-lg text-secondary-foreground max-w-3xl mx-auto leading-relaxed mt-4">
            As a small custom service, we give every project personal attention. We don't mass-produce —
            we craft. Our farm runs multiple printers around the clock, allowing fast turnaround without
            sacrificing the precision and care that sets us apart. Whether you need one piece or a hundred,
            we treat every order like it matters — because it does.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{feat.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
