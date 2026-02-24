import { Printer, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ActionButtons = () => {
  const handlePrint = () => window.print();

  const handleDownload = () => {
    // Simple approach: trigger print dialog which allows save as PDF
    window.print();
  };

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <Printer size={16} />
        <span className="hidden sm:inline">प्रिंट करें</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <Download size={16} />
        <span className="hidden sm:inline">PDF डाउनलोड</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
