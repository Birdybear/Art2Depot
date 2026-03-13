import { Mail, ArrowUp } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-16 px-4 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              <span className="text-foreground">ART</span>
              <span className="text-primary">2</span>
              <span className="text-foreground">DEPOT</span>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A small 3D printing farm delivering big results. Quality output, personal attention, every time.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-4 text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Custom Services</a>
              <a href="#print-to-order" className="text-sm text-muted-foreground hover:text-primary transition-colors">Print to Order</a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-4 text-foreground">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:3DPO@art2depot.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Orders: 3DPO@art2depot.com</span>
              </a>
              <a
                href="mailto:Support@art2depot.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Support: Support@art2depot.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Art2Depot. All rights reserved.
          </p>
          <a
            href="#"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top <ArrowUp className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
