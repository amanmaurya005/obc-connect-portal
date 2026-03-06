import { Printer, Download } from "lucide-react";

const ActionButtons = () => {
  const handlePrint = () => window.print();

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 text-sm 
        border rounded-md 
        text-gray-600 hover:text-black 
        hover:bg-gray-100 
        transition-all duration-200"
      >
        <Printer size={16} />
        <span className="hidden sm:inline">प्रिंट करें</span>
      </button>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 text-sm 
        border rounded-md 
        text-gray-600 hover:text-black 
        hover:bg-gray-100 
        transition-all duration-200"
      >
        <Download size={16} />
        <span className="hidden sm:inline">PDF डाउनलोड</span>
      </button>
    </div>
  );
};

export default ActionButtons;