import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingUp, 
  Key, 
  Calculator, 
  Shield, 
  Globe, 
  Star,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  Home,
  PiggyBank,
  Users,
  Award
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface ServicesProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const services = [
    {
      id: 1,
      title: "خرید ملک در دبی",
      icon: <Building2 className="h-8 w-8 text-accent-pink" />,
      features: [
        "دسترسی به بهترین پروژه‌های مسکونی، ویلایی و آپارتمانی",
        "پیشنهاد املاک متناسب با بودجه و سلیقه شما با استفاده از الگوریتم‌های هوش مصنوعی",
        "تحلیل آینده‌نگرانه ارزش سرمایه‌گذاری هر ملک"
      ]
    },
    {
      id: 2,
      title: "فروش ملک",
      icon: <TrendingUp className="h-8 w-8 text-accent-pink" />,
      features: [
        "قیمت‌گذاری دقیق با کمک مدل‌های پیش‌بینی مبتنی بر داده‌های واقعی بازار",
        "تبلیغ و بازاریابی هدفمند ملک شما در پلتفرم‌های داخلی و بین‌المللی",
        "استفاده از ابزارهای دیجیتال برای افزایش سرعت فروش"
      ]
    },
    {
      id: 3,
      title: "اجاره و مدیریت املاک",
      icon: <Key className="h-8 w-8 text-accent-pink" />,
      features: [
        "اجاره کوتاه‌مدت و بلندمدت با بیشترین بازدهی",
        "مدیریت کامل ملک شامل دریافت اجاره، تعمیر و نگهداری و ارتباط با مستأجر",
        "گزارش‌های دوره‌ای مبتنی بر هوش مصنوعی برای رصد بازدهی سرمایه"
      ]
    },
    {
      id: 4,
      title: "مشاوره سرمایه‌گذاری املاک",
      icon: <Calculator className="h-8 w-8 text-accent-pink" />,
      features: [
        "تحلیل بازار و شناسایی فرصت‌های طلایی سرمایه‌گذاری",
        "پیش‌بینی رشد ارزش ملک در مناطق مختلف دبی",
        "طراحی پرتفوی سرمایه‌گذاری هوشمندانه بر اساس اهداف مالی شما"
      ]
    },
    {
      id: 5,
      title: "خدمات ویژه ویزای طلایی دبی",
      icon: <Award className="h-8 w-8 text-accent-pink" />,
      features: [
        "دریافت ویزای طلایی ۱۰ ساله برای خریداران املاک بالای ۲ میلیون درهم",
        "ارائه ویزای طلایی رایگان برای تمام اعضای خانواده در خریدهای بالای ۵ میلیون درهم",
        "همراهی کامل در تمامی مراحل قانونی و اداری"
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: <Star className="h-6 w-6 text-accent-pink" />,
      title: "هوش مصنوعی برای پیش‌بینی و تحلیل دقیق بازار",
      description: "استفاده از پیشرفته‌ترین الگوریتم‌های تحلیل داده"
    },
    {
      icon: <Shield className="h-6 w-6 text-accent-pink" />,
      title: "شفافیت کامل در تمامی مراحل خرید، فروش و اجاره",
      description: "بدون کارمزد پنهان و با گزارش‌دهی کامل"
    },
    {
      icon: <Globe className="h-6 w-6 text-accent-pink" />,
      title: "پشتیبانی چندزبانه (انگلیسی، عربی، فارسی، چینی)",
      description: "خدمات به زبان‌های مختلف برای راحتی بیشتر شما"
    },
    {
      icon: <PiggyBank className="h-6 w-6 text-accent-pink" />,
      title: "ایجاد ارزش بلندمدت برای سرمایه‌گذاران و خانواده‌ها",
      description: "تمرکز بر سودآوری و رشد پایدار سرمایه شما"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navbar */}
      <Navbar onNavigate={onNavigate} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-accent-pink/20 text-accent-pink border-accent-pink/20 mb-4">
              خدمات تخصصی املاک
            </Badge>
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              <span className="gradient-text">خدمات MelkIQ</span>
            </h1>
            <p className="text-xl text-grey-300 max-w-4xl mx-auto leading-relaxed">
              ما در MelkIQ تنها یک آژانس املاک سنتی نیستیم؛ ما ترکیبی از تجربه ۲۵ ساله در بازار املاک خاورمیانه و فناوری هوش مصنوعی پیشرفته را در اختیار شما قرار می‌دهیم تا تصمیم‌های شما دقیق‌تر، سریع‌تر و هوشمندانه‌تر باشند.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-luxury font-bold mb-4 text-white">
              خدمات ما
            </h2>
            <p className="text-grey-400 text-lg">
              مجموعه کاملی از خدمات تخصصی املاک برای تمامی نیازهای شما
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="bg-dark-800 border-grey-400/20 hover:border-accent-pink/40 transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent-pink/20 w-16 h-16 rounded-full flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-white">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-grey-300">
                        <CheckCircle className="h-5 w-5 text-accent-pink mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-luxury font-bold mb-4 text-white">
              چرا MelkIQ؟
            </h2>
            <p className="text-grey-400 text-lg">
              مزایای منحصر به فرد همکاری با ما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-dark-900 rounded-lg border border-grey-400/20 hover:border-accent-pink/40 transition-all duration-300">
                <div className="bg-accent-pink/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-grey-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-accent-pink" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">25+</h3>
              <p className="text-grey-400">سال تجربه</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-10 w-10 text-accent-pink" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">1000+</h3>
              <p className="text-grey-400">ملک فروخته شده</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-10 w-10 text-accent-pink" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">98%</h3>
              <p className="text-grey-400">رضایت مشتریان</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-accent-pink" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">500+</h3>
              <p className="text-grey-400">ویزای طلایی صادر شده</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-pink/10 to-gold-500/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-luxury font-bold mb-6 text-white">
            با MelkIQ، خدمات املاک تنها یک معامله نیست
          </h2>
          <p className="text-xl text-grey-300 mb-8 leading-relaxed">
            بلکه یک تجربه هوشمندانه، شفاف و آینده‌محور است.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary" size="lg">
              <Phone className="ml-2 h-5 w-5" />
              تماس با مشاور
            </Button>
            <Button 
              variant="outline" 
              className="btn-secondary" 
              size="lg"
              onClick={() => onNavigate('properties')}
            >
              <Building2 className="ml-2 h-5 w-5" />
              مشاهده املاک
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-luxury font-bold mb-8 text-white">
              آماده همکاری با شما هستیم
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-dark-900 border-accent-pink/20">
                <CardContent className="p-6 text-center">
                  <div className="bg-accent-pink/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-accent-pink" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">تماس مستقیم</h3>
                  <p className="text-grey-400 mb-4">۲۴ ساعته در خدمت شما</p>
                  <p className="text-white font-semibold">+971 50 123 4567</p>
                </CardContent>
              </Card>

              <Card className="bg-dark-900 border-accent-pink/20">
                <CardContent className="p-6 text-center">
                  <div className="bg-accent-pink/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-accent-pink" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">واتساپ</h3>
                  <p className="text-grey-400 mb-4">پاسخ سریع و آنی</p>
                  <p className="text-white font-semibold">+971 50 123 4567</p>
                </CardContent>
              </Card>

              <Card className="bg-dark-900 border-accent-pink/20">
                <CardContent className="p-6 text-center">
                  <div className="bg-accent-pink/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-accent-pink" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">دفتر مرکزی</h3>
                  <p className="text-grey-400 mb-4">Business Bay, Dubai</p>
                  <p className="text-white font-semibold">Floor 25, Office 2501</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}