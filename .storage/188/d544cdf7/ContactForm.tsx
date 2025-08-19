import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    property_name: 'تماس عمومی'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([formData]);
      
      if (error) {
        toast.error('خطا در ارسال پیام');
        return;
      }
      
      toast.success('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.');
      setFormData({
        name: '',
        email: '',
        phone_number: '',
        property_name: 'تماس عمومی'
      });
    } catch (error) {
      toast.error('خطا در ارسال پیام');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
            <span className="gradient-text">تماس با مشاورین MelkIQ</span>
          </h2>
          <p className="text-xl text-stone-400 max-w-3xl mx-auto">
            برای مشاوره رایگان و دریافت بهترین پیشنهادات املاک دبی با ما در تماس باشید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-dark-900 border-accent-pink/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-stone-100 text-center">
                فرم تماس سریع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-stone-200 mb-2 block">
                    نام و نام خانوادگی *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-dark-900 border-accent-pink/20 text-white focus:border-accent-pink"
                    placeholder="نام و نام خانوادگی"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-stone-200 mb-2 block">
                    شماره تماس *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    className="bg-dark-900 border-accent-pink/20 text-white focus:border-accent-pink"
                    placeholder="+971 50 123 4567"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-stone-200 mb-2 block">
                    ایمیل (اختیاری)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-dark-900 border-accent-pink/20 text-white focus:border-accent-pink"
                    placeholder="your@email.com"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>در حال ارسال...</>
                  ) : (
                    <>
                      <Send className="ml-2 h-5 w-5" />
                      ارسال درخواست تماس
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-dark-900 border-accent-pink/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <Phone className="h-6 w-6 text-accent-pink" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-100">تماس مستقیم</h3>
                    <p className="text-stone-400">۲۴ ساعته پاسخگو</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-stone-200 font-semibold">+971 50 123 4567</p>
                  <p className="text-stone-200">+971 4 555 0123</p>
                  <p className="text-stone-400">دفتر مرکزی دبی</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-900 border-accent-pink/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <Mail className="h-6 w-6 text-accent-pink" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-100">ایمیل</h3>
                    <p className="text-stone-400">پاسخ سریع تضمینی</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-stone-200">info@melkiq.com</p>
                  <p className="text-stone-200">sales@melkiq.com</p>
                  <p className="text-stone-400">پشتیبانی: support@melkiq.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-900 border-accent-pink/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-accent-pink/20 to-gold-500/20 w-12 h-12 rounded-full flex items-center justify-center ml-4">
                    <MapPin className="h-6 w-6 text-accent-pink" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-100">دفتر مرکزی</h3>
                    <p className="text-stone-400">دبی، امارات متحده عربی</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-stone-200">Business Bay, Dubai</p>
                  <p className="text-stone-200">Floor 25, Office 2501</p>
                  <p className="text-stone-400">ساعات کاری: ۹ صبح تا ۶ عصر</p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-accent-pink/10 to-gold-500/10 p-6 rounded-lg border border-accent-pink/20">
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 text-accent-pink ml-2" />
                <h3 className="text-lg font-semibold text-stone-100">تضمین MelkIQ</h3>
              </div>
              <ul className="space-y-2 text-stone-300">
                <li>• مشاوره رایگان و تخصصی</li>
                <li>• بهترین قیمت‌های بازار</li>
                <li>• پشتیبانی کامل تا دریافت ویزای طلایی</li>
                <li>• ۲۵+ سال تجربه در بازار املاک</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}