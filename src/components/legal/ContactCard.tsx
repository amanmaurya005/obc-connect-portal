import { Mail, Phone, MapPin } from "lucide-react";

const ContactCard = () => {
  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8">
      <h3 className="font-hindi text-xl font-bold text-foreground mb-1">संपर्क करें</h3>
      <p className="text-sm text-muted-foreground mb-5">Contact Support</p>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <Mail size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">ईमेल</p>
            <p className="text-sm font-medium text-foreground">contact@obcmahasabha.org</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <Phone size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">फोन</p>
            <p className="text-sm font-medium text-foreground">+91 XXXXX XXXXX</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
            <MapPin size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">पता</p>
            <p className="text-sm font-medium text-foreground">नई दिल्ली, भारत</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
