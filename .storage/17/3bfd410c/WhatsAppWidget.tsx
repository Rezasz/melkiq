import { useState } from 'react';
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(true);

  const handleWhatsAppClick = () => {
    const phoneNumber = "971123456789";
    const message = "سلام، من علاقه‌مند به دریافت اطلاعات بیشتر در مورد املاک شما هستم.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
        
        <Button
          onClick={() => setIsVisible(false)}
          variant="ghost"
          size="sm"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-800 hover:bg-navy-700 text-stone-400 hover:text-stone-200"
        >
          <X className="h-3 w-3" />
        </Button>
        
        <div className="absolute bottom-full left-0 mb-2 p-3 bg-navy-800 text-stone-100 rounded-lg shadow-lg min-w-[200px] opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-medium mb-1">با ما در واتساپ چت کنید</p>
          <p className="text-xs text-stone-400">پاسخگویی سریع و آنلاین</p>
        </div>
      </div>
    </div>
  );
}