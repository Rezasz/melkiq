import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, MapPin, Users, Star, Search, Phone, MessageCircle, Shield, Award, Clock, Globe } from "lucide-react";
import HottestDeals from "@/components/HottestDeals";
import MarketInsights from "@/components/MarketInsights";
import ContactForm from "@/components/ContactForm";

interface IndexProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function Index({ onNavigate }: IndexProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Search,
      title: "جستجوی هوشمند",
      description: "پیدا کردن ملک مناسب با استفاده از الگوریتم‌های پیشرفته",
    },
    {
      icon: TrendingUp,
      title: "تحلیل بازار",
      description: "گزارش‌های جامع و پیش‌بینی‌های دقیق بازار املاک",
    },
    {
      icon: Shield,
      title: "مشاوره حقوقی",
      description: "راهنمایی کامل در فرآیند خرید و اسناد قانونی",
    },
    {
      icon: Award,
      title: "مدیریت سرمایه",
      description: "بهینه‌سازی پرتفوی املاک و بیشینه‌سازی بازده",
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "پشتیبانی ۲۴/۷",
      description: "همیشه در کنار شما هستیم",
    },
    {
      icon: Globe,
      title: "تجربه بین‌المللی",
      description: "خدمات به زبان‌های مختلف",
    },
    {
      icon: Star,
      title: "کیفیت برتر",
      description: "بالاترین استانداردهای خدمات",
    },
    {
      icon: Users,
      title: "تیم متخصص",
      description: "مشاوران با تجربه و حرفه‌ای",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-[url('/assets/dubai_dc.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-luxury font-bold mb-6">
              <span className="gradient-text">IQ ملک</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-stone-300 font-light">
              پلتفرم هوشمند املاک دبی
            </p>
            <p className="text-lg md:text-xl mb-8 text-stone-400 max-w-3xl mx-auto">
              با تکنولوژی هوش مصنوعی، بهترین فرصت‌های سرمایه‌گذاری در بازار املاک دبی را پیدا کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="btn-primary text-xl px-8 py-4"
                onClick={() => onNavigate('properties')}
              >
                <Search className="ml-2 h-6 w-6" />
                جستجوی ملک
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary text-xl px-8 py-4"
                onClick={() => scrollToSection('hottest-deals')}
              >
                <TrendingUp className="ml-2 h-6 w-6" />
                بهترین پیشنهادات
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-slide-in-right">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">1000+</div>
              <p className="text-stone-400">ملک موجود</p>
            </div>
            <div className="text-center animate-slide-in-right delay-100">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">50+</div>
              <p className="text-stone-400">سازنده معتبر</p>
            </div>
            <div className="text-center animate-slide-in-right delay-200">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">15+</div>
              <p className="text-stone-400">منطقه پوشش</p>
            </div>
            <div className="text-center animate-slide-in-right delay-300">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">2000+</div>
              <p className="text-stone-400">مشتری راضی</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hottest Deals Section */}
      <HottestDeals onNavigate={onNavigate} />

      {/* Services Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
              <span className="gradient-text">خدمات ما</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              مجموعه کاملی از خدمات املاک با کیفیت بالا و تکنولوژی پیشرفته
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="bg-navy-800 border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gold-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-500/30 transition-colors">
                      <Icon className="h-8 w-8 text-gold-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-100 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-stone-400">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <MarketInsights onNavigate={onNavigate} />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
              <span className="gradient-text">چرا ملک IQ؟</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              تجربه‌ای متفاوت و منحصر به فرد در دنیای املاک دبی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-r from-gold-500/20 to-gold-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-gold-500/30 group-hover:to-gold-600/30 transition-all duration-300">
                    <Icon className="h-10 w-10 text-gold-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-stone-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
              <span className="gradient-text">نظرات مشتریان</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              تجربه مشتریان راضی ما از خدمات ملک IQ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "احمد محمدی",
                role: "سرمایه‌گذار",
                comment: "تیم ملک IQ با حرفه‌ای‌ترین شیوه کمکم کردند تا بهترین ملک رو پیدا کنم. واقعاً راضی هستم.",
                rating: 5
              },
              {
                name: "فاطمه رضایی",
                role: "خریدار خانه",
                comment: "پلتفرم بسیار قدرتمند و کاربر پسند. تحلیل‌های بازار خیلی دقیق و مفیده.",
                rating: 5
              },
              {
                name: "علی اکبری",
                role: "مشتری VIP",
                comment: "از خدمات مشاوره‌ای و پشتیبانی ۲۴ ساعته بسیار راضی هستم. پیشنهاد می‌کنم.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-navy-800 border-gold-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-stone-300 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t border-gold-500/20 pt-4">
                    <p className="font-semibold text-stone-100">{testimonial.name}</p>
                    <p className="text-stone-400 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm onNavigate={onNavigate} />

      {/* Footer */}
      <footer className="bg-navy-900 border-t border-gold-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-luxury font-bold gradient-text mb-4">
                IQ ملک
              </h3>
              <p className="text-stone-400 mb-4 max-w-md">
                پلتفرم هوشمند املاک دبی که با استفاده از تکنولوژی‌های نوین، بهترین تجربه خرید املاک را به شما ارائه می‌دهد.
              </p>
              <div className="flex space-x-reverse space-x-4">
                <Button variant="outline" size="icon" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/20">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-gold-500/30 text-gold-400 hover:bg-gold-500/20">
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-stone-100 mb-4">دسترسی سریع</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => onNavigate('properties')}
                  className="block text-stone-400 hover:text-gold-400 transition-colors"
                >
                  جستجوی املاک
                </button>
                <button 
                  onClick={() => onNavigate('off-plan')}
                  className="block text-stone-400 hover:text-gold-400 transition-colors"
                >
                  پروژه‌های جدید
                </button>
                <button 
                  onClick={() => onNavigate('insights')}
                  className="block text-stone-400 hover:text-gold-400 transition-colors"
                >
                  تحلیل بازار
                </button>
                <button 
                  onClick={() => onNavigate('about')}
                  className="block text-stone-400 hover:text-gold-400 transition-colors"
                >
                  درباره ما
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-stone-100 mb-4">اطلاعات تماس</h4>
              <div className="space-y-2 text-stone-400">
                <p>دبی، امارات متحده عربی</p>
                <p>+971 4 123 4567</p>
                <p>info@eivanproperties.ae</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gold-500/20 mt-12 pt-8 text-center">
            <p className="text-stone-400">
              © 2024 ملک IQ. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}