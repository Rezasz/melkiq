import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  onNavigate?: (page: string) => void;
}

export default function ContactForm({ onNavigate }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "پیام شما ارسال شد",
        description: "به زودی با شما تماس خواهیم گرفت",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
      
    } catch (error) {
      toast({
        title: "خطا در ارسال پیام",
        description: "لطفاً دوباره تلاش کنید",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "تلفن",
      value: "+971 4 123 4567",
      link: "tel:+97141234567"
    },
    {
      icon: Mail,
      title: "ایمیل",
      value: "info@eivanproperties.ae",
      link: "mailto:info@eivanproperties.ae"
    },
    {
      icon: MapPin,
      title: "آدرس",
      value: "Dubai Marina, UAE",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-navy-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold mb-6">
            <span className="gradient-text">تماس با ما</span>
          </h2>
          <p className="text-xl text-stone-400 max-w-3xl mx-auto">
            مشاوران متخصص ما آماده پاسخگویی به سوالات شما هستند
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-navy-900 border-gold-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-stone-100">
                پیام خود را ارسال کنید
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-100 mb-2">
                    پیام شما ارسال شد!
                  </h3>
                  <p className="text-stone-400">
                    تیم ما در کمترین زمان ممکن با شما تماس خواهد گرفت
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-stone-200">نام و نام خانوادگی</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-navy-800 border-gold-500/30 text-stone-100 mt-2"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-stone-200">شماره تماس</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-navy-800 border-gold-500/30 text-stone-100 mt-2"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-stone-200">ایمیل</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-navy-800 border-gold-500/30 text-stone-100 mt-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-stone-200">پیام شما</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="bg-navy-800 border-gold-500/30 text-stone-100 mt-2"
                      placeholder="پیام خود را اینجا تایپ کنید..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-primary w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy-900 ml-2"></div>
                        در حال ارسال...
                      </div>
                    ) : (
                      <>
                        <Send className="ml-2 h-5 w-5" />
                        ارسال پیام
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-stone-100 mb-6">
                اطلاعات تماس
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-reverse space-x-4">
                      <div className="bg-gold-500/20 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-gold-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-stone-100 mb-1">
                          {info.title}
                        </h4>
                        <a 
                          href={info.link}
                          className="text-stone-400 hover:text-gold-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Office Hours */}
            <Card className="bg-navy-900 border-gold-500/20">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-stone-100 mb-4">
                  ساعات کاری
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-stone-400">شنبه - پنج‌شنبه:</span>
                    <span className="text-stone-100">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">جمعه:</span>
                    <span className="text-stone-100">14:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">پشتیبانی آنلاین:</span>
                    <span className="text-green-400">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-stone-100">
                راه‌های سریع ارتباط
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open('https://wa.me/971123456789', '_blank')}
                >
                  <Phone className="ml-2 h-5 w-5" />
                  واتساپ
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                  onClick={() => window.open('tel:+971123456789', '_blank')}
                >
                  <Phone className="ml-2 h-5 w-5" />
                  تماس فوری
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}