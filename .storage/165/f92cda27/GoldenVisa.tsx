import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, Award, Users, GraduationCap, Heart, Building, Phone, CheckCircle, Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

interface GoldenVisaProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function GoldenVisa({ onNavigate }: GoldenVisaProps) {
  const benefits = [
    {
      icon: Shield,
      title: "اقامت ۱۰ ساله قابل تمدید",
      description: "در یکی از امن‌ترین و پررونق‌ترین کشورهای جهان"
    },
    {
      icon: Building,
      title: "مالکیت ۱۰۰٪ کسب‌وکار و املاک",
      description: "آزادی کامل در سرمایه‌گذاری در امارات"
    },
    {
      icon: GraduationCap,
      title: "بهترین سیستم آموزشی",
      description: "دسترسی به دانشگاه‌های معتبر برای فرزندان"
    },
    {
      icon: Heart,
      title: "پیشرفته‌ترین خدمات درمانی",
      description: "بهره‌مندی از بهترین امکانات پزشکی و بیمه‌ای"
    },
    {
      icon: Crown,
      title: "سبک زندگی لاکچری",
      description: "میزبانی لوکس‌ترین برندها و رستوران‌های دنیا"
    },
    {
      icon: CheckCircle,
      title: "بدون نیاز به اسپانسر",
      description: "استقلال کامل در تمدید اقامت"
    }
  ];

  const packages = [
    {
      title: "پکیج شخصی",
      price: "۲ میلیون درهم",
      features: [
        "ویزای طلایی شخصی رایگان",
        "اقامت ۱۰ ساله",
        "پشتیبانی کامل MelkIQ",
        "مشاوره حقوقی رایگان"
      ],
      icon: Crown,
      popular: false
    },
    {
      title: "پکیج خانوادگی",
      price: "۵ میلیون درهم",
      features: [
        "ویزای طلایی برای تمام خانواده",
        "اقامت ۱۰ ساله برای همه",
        "پشتیبانی اختصاصی",
        "مشاوره سرمایه‌گذاری",
        "خدمات پس از فروش"
      ],
      icon: Users,
      popular: true
    }
  ];

  const whyChooseUs = [
    "بیش از ۲۵ سال تجربه واقعی در بازار املاک خاورمیانه",
    "استفاده از هوش مصنوعی و تحلیل داده‌های پیشرفته",
    "تیمی متخصص از ابتدا تا دریافت ویزا",
    "پشتیبانی کامل در تمامی مراحل"
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navbar */}
      <Navbar onNavigate={onNavigate} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[url('/assets/london-dubai.avif')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Badge className="bg-gradient-to-r from-accent-pink to-gold-500 text-white text-lg px-6 py-2">
              <Crown className="ml-2 h-5 w-5" />
              پیشنهاد ویژه MelkIQ
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-luxury font-bold mb-6">
            <span className="gradient-text">ویزای طلایی دبی</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-grey-300 font-light">
            کلید ورود به زندگی لوکس و آینده‌ای مطمئن
          </p>
          <p className="text-lg md:text-xl mb-8 text-grey-400 max-w-4xl mx-auto leading-relaxed">
            تصور کنید در شهری زندگی می‌کنید که هر روز الهام‌بخش ثروت، امنیت و پیشرفت است. شهری که در آن سرمایه‌گذاری شما نه تنها ارزش مالی دارد، بلکه دروازه‌ای است برای داشتن اقامت پایدار و فرصت‌های بی‌پایان.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="btn-primary text-xl px-8 py-4"
              onClick={() => {
                const element = document.getElementById('contact-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Crown className="ml-2 h-6 w-6" />
              دریافت مشاوره رایگان
            </Button>
            <Button 
              variant="outline" 
              className="btn-secondary text-xl px-8 py-4"
              onClick={() => {
                const element = document.getElementById('packages');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowRight className="ml-2 h-6 w-6" />
              مشاهده پکیج‌ها
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
              <span className="gradient-text">چرا ویزای طلایی دبی انتخابی بی‌نظیر است؟</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              ویزای طلایی امارات یک برنامه اقامتی ویژه است که تنها به برترین سرمایه‌گذاران و نخبگان اعطا می‌شود
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-dark-900 border-accent-pink/20 hover:border-accent-pink/40 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-accent-pink/30 group-hover:to-gold-500/30 transition-colors">
                      <Icon className="h-8 w-8 text-accent-pink" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-100 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-stone-400">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exclusive Offer Packages */}
      <section id="packages" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
              <span className="gradient-text">پیشنهاد ویژه MelkIQ</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              ما فراتر از فروش ملک عمل می‌کنیم؛ ما دروازه ورود شما به دنیای لوکس دبی و آینده‌ای مطمئن برای خانواده‌تان هستیم
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <Card key={index} className={`relative ${pkg.popular ? 'border-accent-pink bg-gradient-to-b from-dark-900 to-accent-pink/5' : 'bg-dark-800 border-grey-400/20'} transition-all duration-300 hover:border-accent-pink/40`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-accent-pink to-gold-500 text-white px-4 py-2">
                        <Star className="ml-1 h-4 w-4" />
                        پیشنهاد ویژه
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-10 w-10 text-accent-pink" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-100 mb-2">{pkg.title}</h3>
                    <div className="text-3xl font-bold gradient-text mb-6">{pkg.price}</div>
                    <ul className="space-y-3 mb-8 text-right">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-stone-300">
                          <CheckCircle className="h-5 w-5 text-accent-pink ml-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={pkg.popular ? "btn-primary w-full" : "btn-secondary w-full"}
                      onClick={() => {
                        const element = document.getElementById('contact-section');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <Phone className="ml-2 h-5 w-5" />
                      مشاوره رایگان
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose MelkIQ */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
              <span className="gradient-text">چرا MelkIQ را انتخاب کنید؟</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-8 h-8 rounded-full flex items-center justify-center mt-1 ml-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-accent-pink" />
                </div>
                <p className="text-stone-300 text-lg">{reason}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-stone-300 mb-8 italic">
              با MelkIQ، خرید ملک تنها یک معامله نیست؛ <span className="gradient-text font-bold">یک سرمایه‌گذاری هوشمندانه برای آینده شما و نسل‌های بعدی است.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-8">
            <span className="gradient-text">آینده‌ای که شایسته‌اش هستید</span>
          </h2>
          <p className="text-xl text-stone-300 max-w-4xl mx-auto leading-relaxed mb-12">
            تصور کنید خانواده‌تان با آرامش در بهترین مدارس، بهترین مراکز خرید و بهترین امکانات پزشکی دبی زندگی می‌کنند. شما با اطمینان از رشد سرمایه‌تان، از فرصت‌های جهانی لذت می‌برید و در یکی از پویاترین اقتصادهای دنیا حضور دارید.
          </p>
          <p className="text-2xl gradient-text font-bold mb-8">
            این همان آینده‌ای است که MelkIQ برای شما می‌سازد.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact-section" className="py-20 bg-gradient-to-r from-accent-pink/10 to-dark-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-8">
            <span className="gradient-text">مسیر خود را آغاز کنید</span>
          </h2>
          <p className="text-xl text-stone-300 mb-8 max-w-3xl mx-auto">
            همین امروز با ما تماس بگیرید و مسیر خود را به سوی <span className="gradient-text font-bold">اقامت طلایی دبی</span> و سبک زندگی لوکس آغاز کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="btn-primary text-xl px-8 py-4"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('home');
                  setTimeout(() => {
                    const contactEl = document.getElementById('contact');
                    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
            >
              <Phone className="ml-2 h-6 w-6" />
              تماس فوری
            </Button>
            <Button 
              variant="outline" 
              className="btn-secondary text-xl px-8 py-4"
              onClick={() => onNavigate('properties')}
            >
              <Building className="ml-2 h-6 w-6" />
              مشاهده املاک
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}