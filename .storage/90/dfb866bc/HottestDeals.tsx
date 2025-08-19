import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, TrendingUp, Star } from "lucide-react";

interface HottestDealsProps {
  onNavigate?: (page: string, data?: unknown) => void;
}

export default function HottestDeals({ onNavigate }: HottestDealsProps) {
  const deals = [
    {
      id: 1,
      title: "Emaar Grand Polo",
      location: "Dubai Creek Harbour",
      developer: "Emaar",
      startingPrice: "1,200,000",
      completionDate: "Q4 2026",
      paymentPlan: "70/30",
      roi: "8.5%",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
      highlights: ["دسترسی به مرکز شهر", "نمای کریک", "امکانات لوکس"],
      badge: "پیش‌فروش",
    },
    {
      id: 2,
      title: "DAMAC Islands",
      location: "Dubailand",
      developer: "DAMAC",
      startingPrice: "900,000",
      completionDate: "Q2 2027",
      paymentPlan: "80/20",
      roi: "9.2%",
      image: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg",
      highlights: ["جزیره خصوصی", "ساحل اختصاصی", "طراحی منحصر به فرد"],
      badge: "جدید",
    },
    {
      id: 3,
      title: "Binghatti Flare",
      location: "Business Bay",
      developer: "Binghatti",
      startingPrice: "750,000",
      completionDate: "Q1 2026",
      paymentPlan: "60/40",
      roi: "7.8%",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      highlights: ["مرکز کسب و کار", "طراحی مدرن", "بازده عالی"],
      badge: "محدود",
    },
  ];

  return (
    <section id="hottest-deals" className="py-20 bg-navy-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
            <span className="gradient-text">بهترین پیشنهادات</span>
          </h2>
          <p className="text-xl text-stone-400 max-w-3xl mx-auto">
            منتخبی از بهترین فرصت‌های سرمایه‌گذاری در پروژه‌های جدید دبی
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <Card key={deal.id} className="property-card group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gold-500 text-navy-900 hover:bg-gold-600">
                    {deal.badge}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-navy-900/80 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="flex items-center text-gold-400">
                    <TrendingUp className="h-4 w-4 ml-1" />
                    <span className="text-sm font-semibold">ROI {deal.roi}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-stone-100 mb-2">{deal.title}</h3>
                  <div className="flex items-center text-stone-400 mb-2">
                    <MapPin className="h-4 w-4 ml-1" />
                    <span>{deal.location}</span>
                  </div>
                  <p className="text-gold-400 font-semibold">توسط {deal.developer}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">قیمت شروع:</span>
                    <span className="text-xl font-bold text-stone-100">
                      {deal.startingPrice} AED
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">تکمیل:</span>
                    <span className="text-stone-100">{deal.completionDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400">پرداخت:</span>
                    <span className="text-stone-100">{deal.paymentPlan}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-stone-300 mb-2">ویژگی‌های کلیدی:</h4>
                  <div className="flex flex-wrap gap-2">
                    {deal.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gold-500/30 text-stone-300">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="btn-primary flex-1"
                    onClick={() => onNavigate?.(deal.title.toLowerCase().replace(' ', '-'))}
                  >
                    جزئیات پروژه
                  </Button>
                  <Button 
                    variant="outline" 
                    className="btn-secondary"
                    onClick={() => onNavigate?.('contact')}
                  >
                    تماس
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="btn-primary text-lg px-8 py-4"
            onClick={() => onNavigate('off-plan')}
          >
            مشاهده همه پروژه‌های جدید
          </Button>
        </div>
      </div>
    </section>
  );
}