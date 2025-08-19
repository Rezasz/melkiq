import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3, PieChart, ArrowRight } from "lucide-react";

interface MarketInsightsProps {
  onNavigate: (page: string) => void;
}

export default function MarketInsights({ onNavigate }: MarketInsightsProps) {
  const insights = [
    {
      title: "رشد قیمت املاک",
      value: "+12.5%",
      description: "رشد سالانه قیمت املاک در دبی",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "حجم معاملات",
      value: "45,230",
      description: "تعداد معاملات در سه ماهه اول",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-400",
    },
    {
      title: "میانگین ROI",
      value: "8.7%",
      description: "بازده سرمایه‌گذاری ساలانه",
      trend: "stable",
      icon: PieChart,
      color: "text-gold-400",
    },
    {
      title: "نرخ اجاره",
      value: "+6.2%",
      description: "افزایش نرخ اجاره نسبت به سال قبل",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-400",
    },
  ];

  const marketTrends = [
    {
      area: "Downtown Dubai",
      avgPrice: "2,850,000",
      change: "+8.5%",
      trend: "up",
    },
    {
      area: "Dubai Marina",
      avgPrice: "1,950,000",
      change: "+12.3%",
      trend: "up",
    },
    {
      area: "Business Bay",
      avgPrice: "1,350,000",
      change: "+15.7%",
      trend: "up",
    },
    {
      area: "Dubai Creek Harbour",
      avgPrice: "1,650,000",
      change: "+18.2%",
      trend: "up",
    },
  ];

  return (
    <section className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
            <span className="gradient-text">تحلیل بازار املاک</span>
          </h2>
          <p className="text-xl text-stone-400 max-w-3xl mx-auto">
            آخرین اطلاعات و تحلیل‌های بازار املاک دبی با تکنولوژی هوش مصنوعی
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card key={index} className="bg-navy-800 border-gold-500/20 hover:border-gold-500/40 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className={`h-8 w-8 ${insight.color}`} />
                    {insight.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
                    {insight.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-stone-100 mb-2">
                    {insight.value}
                  </div>
                  <CardTitle className="text-lg text-stone-200 mb-2">
                    {insight.title}
                  </CardTitle>
                  <p className="text-sm text-stone-400">
                    {insight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Market Trends by Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-stone-100 mb-6">
              روند قیمت در مناطق مختلف
            </h3>
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <Card key={index} className="bg-navy-800 border-gold-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-stone-100">
                          {trend.area}
                        </h4>
                        <p className="text-stone-400">
                          میانگین قیمت: {trend.avgPrice} AED
                        </p>
                      </div>
                      <div className="text-left">
                        <div className={`text-lg font-bold ${
                          trend.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {trend.change}
                        </div>
                        {trend.trend === 'up' ? (
                          <TrendingUp className="h-5 w-5 text-green-400 mr-auto" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-400 mr-auto" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-stone-100 mb-6">
              پیش‌بینی‌های هوش مصنوعی
            </h3>
            <Card className="bg-gradient-to-br from-navy-800 to-navy-700 border-gold-500/20">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-navy-900/50 rounded-lg">
                    <div>
                      <h4 className="text-lg font-semibold text-stone-100">
                        پیش‌بینی رشد قیمت
                      </h4>
                      <p className="text-stone-400">۶ ماه آینده</p>
                    </div>
                    <div className="text-2xl font-bold text-green-400">+7.2%</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-navy-900/50 rounded-lg">
                    <div>
                      <h4 className="text-lg font-semibold text-stone-100">
                        بهترین زمان خرید
                      </h4>
                      <p className="text-stone-400">بر اساس تحلیل الگوها</p>
                    </div>
                    <div className="text-lg font-bold text-gold-400">الان</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-navy-900/50 rounded-lg">
                    <div>
                      <h4 className="text-lg font-semibold text-stone-100">
                        منطقه پیشنهادی
                      </h4>
                      <p className="text-stone-400">بیشترین پتانسیل رشد</p>
                    </div>
                    <div className="text-lg font-bold text-blue-400">Business Bay</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-2xl p-8 border border-gold-500/30">
            <h3 className="text-2xl font-bold text-stone-100 mb-4">
              گزارش‌های تخصصی بازار
            </h3>
            <p className="text-stone-400 mb-6 max-w-2xl mx-auto">
              دسترسی به گزارش‌های کامل و تحلیل‌های عمیق بازار املاک دبی با استفاده از هوش مصنوعی
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-primary"
                onClick={() => onNavigate('insights')}
              >
                <BarChart3 className="ml-2 h-5 w-5" />
                مشاهده تحلیل‌ها
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary"
                onClick={() => onNavigate('business-intelligence')}
              >
                گزارش‌های کسب و کار
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}