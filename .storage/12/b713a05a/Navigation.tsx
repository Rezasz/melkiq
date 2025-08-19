import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Building, MapPin, Users, TrendingUp, Info, Phone, FileText } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'خانه', icon: Home },
    { id: 'properties', label: 'املاک', icon: Building },
    { id: 'off-plan', label: 'پروژه‌های جدید', icon: TrendingUp },
    { id: 'communities', label: 'مناطق', icon: MapPin },
    { id: 'developers', label: 'سازندگان', icon: Users },
    { id: 'insights', label: 'تحلیل بازار', icon: FileText },
    { id: 'services', label: 'خدمات', icon: Info },
    { id: 'about', label: 'درباره ما', icon: Info },
    { id: 'contact', label: 'تماس', icon: Phone },
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleNavigation('home')}
          >
            <div className="text-2xl font-luxury font-bold gradient-text">
              ایوان پراپرتیز
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-reverse space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-gold-400 border-b-2 border-gold-400'
                      : 'text-stone-300 hover:text-gold-400'
                  }`}
                >
                  <Icon className="h-4 w-4 ml-1" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-stone-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-navy-900 border-gold-500/20">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className={`flex items-center space-x-reverse space-x-3 px-4 py-3 text-right rounded-lg transition-colors duration-200 ${
                          currentPage === item.id
                            ? 'bg-gold-500/20 text-gold-400'
                            : 'text-stone-300 hover:bg-navy-800 hover:text-gold-400'
                        }`}
                      >
                        <Icon className="h-5 w-5 ml-3" />
                        <span className="text-lg">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}