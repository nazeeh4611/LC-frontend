import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function TopBar() {
  return (
    <div className="hidden border-b border-border-hairline bg-bg-secondary md:block">
      <Container className="flex h-9 items-center justify-between text-xs text-ink-muted">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Mail size={12} className="text-gold-bright" />
            info@louiscalteninternational.com
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={12} className="text-gold-bright" />
            +91 89906 07390
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-gold-bright" />
            India
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Facebook size={13} className="hover:text-gold-bright transition-colors cursor-pointer" />
          <Linkedin size={13} className="hover:text-gold-bright transition-colors cursor-pointer" />
          <Instagram size={13} className="hover:text-gold-bright transition-colors cursor-pointer" />
        </div>
      </Container>
    </div>
  );
}
