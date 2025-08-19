import { useState } from 'react';
import { Scale, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AILawyerWidget() {
  const [isVisible, setIsVisible] = useState(true);

  const handleAILawyerClick = () => {
    // Open AI Lawyer chatbot in a new popup window
    const popupUrl = "https://zapier.com/apps/chatbot/ai-lawyer";
    const popup = window.open(
      popupUrl, 
      'aiLawyer', 
      'width=400,height=600,scrollbars=yes,resizable=yes'
    );
    
    if (popup) {
      popup.focus();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-24 z-50">
      <div className="relative group">
        <Button
          onClick={handleAILawyerClick}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Scale className="h-6 w-6" />
        </Button>
        
        <Button
          onClick={() => setIsVisible(false)}
          variant="ghost"
          size="sm"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy-800 hover:bg-navy-700 text-stone-400 hover:text-stone-200 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-3 w-3" />
        </Button>
        
        <div className="absolute bottom-full right-0 mb-2 p-3 bg-navy-800 text-stone-100 rounded-lg shadow-lg min-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-medium mb-1">مشاور حقوقی هوشمند</p>
          <p className="text-xs text-stone-400">راهنمایی قانونی رایگان</p>
        </div>
      </div>
    </div>
  );
}