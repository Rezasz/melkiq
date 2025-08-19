import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const menuItems = [
    { label: "خانه", action: () => onNavigate('home') },
    { label: "داغ ترین پیشنهادها", action: () => scrollToSection('hottest-deals') },
    { label: "پروژه های برتر", action: () => onNavigate('top-projects') },
    { label: "ویزای طلایی", action: () => onNavigate('golden-visa') },
    { label: "خدمات ما", action: () => scrollToSection('services') },
    { label: "تماس با مشاورین", action: () => scrollToSection('contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-accent-pink/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-xl font-luxury font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              MelkIQ<br />
              <span className="text-sm">ضریب هوشی ملکی</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-reverse space-x-8">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="text-grey-300 hover:text-accent-pink transition-colors duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('contact')}
                className="btn-primary"
              >
                <Phone className="ml-2 h-4 w-4" />
                تماس
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-grey-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark-900 border-accent-pink/20">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="text-xl font-luxury font-bold gradient-text mb-4">
                    MelkIQ<br />
                    <span className="text-sm">ضریب هوشی ملکی</span>
                  </div>
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="text-right text-grey-300 hover:text-accent-pink transition-colors duration-300 font-medium text-lg py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => {
                      scrollToSection('contact');
                      setIsOpen(false);
                    }}
                    className="btn-primary mt-6"
                  >
                    <Phone className="ml-2 h-4 w-4" />
                    تماس با مشاورین
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}