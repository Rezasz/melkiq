import { useState, useEffect } from 'react';
import { Bot, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RealEstateChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Load Zapier chatbot script dynamically
      const script = document.createElement('script');
      script.src = 'https://zapier.com/apps/embed/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
          </Button>
          
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-800 hover:bg-navy-700 text-stone-400 hover:text-stone-200 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </Button>
          
          {!isOpen && (
            <div className="absolute bottom-full right-0 mb-2 p-3 bg-navy-800 text-stone-100 rounded-lg shadow-lg min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-medium mb-1">دستیار هوشمند املاک</p>
              <p className="text-xs text-stone-400">پاسخگویی ۲۴ ساعته</p>
            </div>
          )}
        </div>
      </div>

      {/* Chatbot Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gold-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-gold-500 to-gold-600 p-4 text-navy-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-reverse space-x-2">
                <Bot className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">مشاور املاک ایوان</h3>
                  <p className="text-sm opacity-90">آنلاین</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-navy-900 hover:bg-navy-900/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="h-full bg-stone-50">
            {/* Simulated Chatbot Interface */}
            <div className="p-4 space-y-4">
              <div className="bg-gold-100 p-3 rounded-lg">
                <p className="text-navy-900 text-sm">
                  سلام! من دستیار هوشمند املاک ایوان هستم. چطور می‌تونم کمکتون کنم؟
                </p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full text-right justify-start text-sm h-auto py-2 px-3"
                  onClick={() => console.log('Property search clicked')}
                >
                  🏠 جستجوی ملک مناسب
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-right justify-start text-sm h-auto py-2 px-3"
                  onClick={() => console.log('Price inquiry clicked')}
                >
                  💰 استعلام قیمت
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-right justify-start text-sm h-auto py-2 px-3"
                  onClick={() => console.log('Investment advice clicked')}
                >
                  📈 مشاوره سرمایه‌گذاری
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-right justify-start text-sm h-auto py-2 px-3"
                  onClick={() => console.log('Market analysis clicked')}
                >
                  📊 تحلیل بازار
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center space-x-reverse space-x-2">
                  <input 
                    type="text" 
                    placeholder="سوال خود را بپرسید..." 
                    className="flex-1 p-2 border rounded-lg text-sm"
                  />
                  <Button size="sm" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}