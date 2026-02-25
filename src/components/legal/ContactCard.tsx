import { Mail, Phone, MapPin } from "lucide-react";

const ContactCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
      <h3 className="font-hindi text-xl font-bold text-gray-900 mb-1">संपर्क करें</h3>
      <p className="text-sm text-gray-600 mb-5">Contact Support</p>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <Mail size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">ईमेल</p>
            <p className="text-sm font-medium text-gray-900">info@obcmahasabha.co.in</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <Phone size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">फोन</p>
            <p className="text-sm font-medium text-gray-900">91+ 9549566300</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <MapPin size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600">पता</p>
            <p className="text-sm font-medium text-gray-900">प्लॉट नंबर: 115, 116,
विनायक रेजीडेंसी - I(F3),
विनायक विहार डी, हरनाथपुरा,
कलवार रोड, जयपुर - 302012</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
