import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import StlViewer from "./StlViewer";
import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const orderSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  details: z.string().trim().min(1, "Please describe your order").max(2000),
});

const PrintToOrderSection = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", details: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE) {
      toast({ title: "File too large", description: "Maximum file size is 50MB.", variant: "destructive" });
      return;
    }

    const ext = selected.name.toLowerCase().split(".").pop();
    if (ext !== "stl") {
      toast({ title: "Invalid file", description: "Please upload an STL file.", variant: "destructive" });
      return;
    }

    setFile(selected);
  }, [toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);

    const subject = encodeURIComponent(`Print Order from ${result.data.name}`);
    const body = encodeURIComponent(
      `Name: ${result.data.name}\nEmail: ${result.data.email}\nScale: ${scale}x\nFile: ${file?.name || "No file attached"}\n\nDetails:\n${result.data.details}`
    );
    window.location.href = `mailto:3DPO@art2depot.com?subject=${subject}&body=${body}`;

    setSending(false);
    toast({ title: "Opening email client", description: "Complete sending the email in your mail app." });
  };

  return (
    <section id="print-to-order" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Print to <span className="text-primary text-glow">Order</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your 3D file, adjust the scale, and send us your order. We'll get back to you with a quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <label
                htmlFor="stl-upload"
                className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-card"
              >
                <Upload className="w-5 h-5 text-primary" />
                <span className="text-sm text-secondary-foreground">
                  {file ? file.name : "Upload STL file (max 50MB)"}
                </span>
              </label>
              <input
                id="stl-upload"
                type="file"
                accept=".stl"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <StlViewer file={file} scale={scale} />

            <div className="mt-4">
              <label className="text-sm font-display font-semibold text-secondary-foreground mb-2 block">
                Scale: {scale.toFixed(1)}x
              </label>
              <Slider
                value={[scale]}
                onValueChange={(v) => setScale(v[0])}
                min={0.1}
                max={5}
                step={0.1}
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-display font-semibold text-secondary-foreground mb-1 block">
                  Your Name
                </label>
                <Input
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-card border-border"
                  maxLength={100}
                />
                {errors.name && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-display font-semibold text-secondary-foreground mb-1 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-card border-border"
                  maxLength={255}
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-display font-semibold text-secondary-foreground mb-1 block">
                  Order Details
                </label>
                <Textarea
                  placeholder="Describe your print: material preference, color, quantity, any special requirements..."
                  rows={5}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="bg-card border-border resize-none"
                  maxLength={2000}
                />
                {errors.details && (
                  <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.details}
                  </p>
                )}
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
                <Send className="w-4 h-4 mr-2" />
                Send Order Request
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                This will open your email client to send to{" "}
                <span className="text-primary">3DPO@art2depot.com</span>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrintToOrderSection;
