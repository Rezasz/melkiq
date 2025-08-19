import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Calendar, 
  Building, 
  Car, 
  Star, 
  Phone, 
  Globe, 
  Users, 
  Dumbbell, 
  Trees, 
  Waves,
  Home,
  ArrowLeft,
  ExternalLink,
  Play
} from 'lucide-react';

export default function TopProjects() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const project = {
    id: 2860,
    name: "Selvara 3",
    developer: "Emaar",
    area: "Grand Polo Club and Resort",
    country: "United Arab Emirates",
    minPrice: 6490000,
    currency: "AED",
    completionDate: "2029-05-31",
    status: "Presale",
    saleStatus: "Start of sales",
    serviceCharge: "3-4 AED/sqft",
    paymentPlan: "10% booking, 70% during construction, 20% on handover",
    architecture: [
      "https://api.reelly.io/vault/ZZLvFZFt/rCj769UqWBnWxvxLO8HngBL141k/ni2EZQ../img74.jpg",
      "https://api.reelly.io/vault/ZZLvFZFt/BAhRsjCXkdBq-2Ve9bXeNI_pbqU/yzd3Jg../img83.jpg",
      "https://api.reelly.io/vault/ZZLvFZFt/qeoO8QagI_i6qla17HQiDtLqPeA/rvu1pA../img111.jpg"
    ],
    interior: [
      "/images/interiordesign.jpg",
      "https://api.reelly.io/vault/ZZLvFZFt/suW2x9YSWNFx1ajcG7SgernjxR8/hPM4zw../img165.jpg",
      "/images/ModernGym.jpg"
    ],
    facilities: [
      { name: "فضای سبز مشترک", icon: Trees },
      { name: "تراس استخر آرام", icon: Swimming },
      { name: "باشگاه ورزشی مدرن", icon: Dumbbell },
      { name: "پاویلیون یوگا", icon: Users },
      { name: "پارک های اجتماعی", icon: Trees },
      { name: "زمین های پولو", icon: Home }
    ],
    unitBlocks: [
      {
        name: "ویلای 4 خوابه - سلوارا 3",
        type: "Villa",
        priceFrom: 6490000,
        areaTo: 355.6,
        parking: 2
      }
    ],
    mapPoints: [
      { name: "مدرسه ساوث ویو دبی", distance: 6.3 },
      { name: "پارک اجتماعی دونز ویلیج", distance: 7.8 },
      { name: "مرکز خرید تاون مال", distance: 9.6 },
      { name: "ساحل مارینا • JBR", distance: 21.3 },
      { name: "فرودگاه بین المللی آل مکتوم", distance: 32.6 },
      { name: "داون تاون دبی", distance: 34.1 }
    ],
    videoUrl: "https://www.youtube.com/watch?v=XwmRo_wL2NE",
    brochureUrl: "https://drive.google.com/file/d/1jY87jbRS0ccm5xGMsTiG3xzQRFKgF3OS/view?usp=sharing"
  };

  const allImages = [...project.architecture, ...project.interior];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/00971545401000', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-grey-100">
      {/* Header */}
      <div className="bg-dark-900/95 backdrop-blur-sm border-b border-accent-pink/20 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                onClick={() => window.history.back()}
                variant="ghost"
                className="text-grey-300 hover:text-accent-pink"
              >
                <ArrowLeft className="ml-2 h-4 w-4" />
                بازگشت
              </Button>
              <div>
                <h1 className="text-3xl font-bold gradient-text">پروژه های برتر</h1>
                <p className="text-grey-400 mt-1">بهترین پروژه های املاک دبی</p>
              </div>
            </div>
            <Badge className="bg-accent-pink/20 text-accent-pink border-accent-pink/30">
              پروژه منحصر به فرد
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Project Card */}
        <Card className="mb-8 bg-dark-800/50 border-accent-pink/20 backdrop-blur-sm">
          <CardContent className="p-0">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video rounded-t-lg overflow-hidden">
                <img
                  src={allImages[selectedImageIndex]}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="absolute bottom-4 left-4 flex space-x-2 space-x-reverse">
                {allImages.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-12 rounded border-2 overflow-hidden ${
                      selectedImageIndex === index 
                        ? 'border-accent-pink' 
                        : 'border-grey-600 hover:border-grey-400'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {allImages.length > 5 && (
                  <div className="w-16 h-12 bg-dark-900/80 rounded border-2 border-grey-600 flex items-center justify-center text-xs text-grey-300">
                    +{allImages.length - 5}
                  </div>
                )}
              </div>

              {/* Video Button */}
              <Button
                onClick={() => window.open(project.videoUrl, '_blank')}
                className="absolute top-4 right-4 bg-dark-900/80 hover:bg-dark-900 text-white"
                size="sm"
              >
                <Play className="ml-2 h-4 w-4" />
                ویدیو
              </Button>
            </div>

            {/* Project Info */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">{project.name}</h2>
                  <div className="flex items-center text-grey-400 mb-4">
                    <Building className="ml-2 h-5 w-5" />
                    <span className="ml-4">{project.developer}</span>
                    <MapPin className="ml-6 h-5 w-5" />
                    <span className="mr-2">{project.area}</span>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="border-accent-pink/50 text-accent-pink">
                      {project.saleStatus}
                    </Badge>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-grey-400 text-sm">قیمت شروع از</p>
                  <p className="text-3xl font-bold gradient-text">
                    {formatPrice(project.minPrice)} {project.currency}
                  </p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-dark-700/50 rounded-lg p-4 text-center">
                  <Calendar className="h-6 w-6 text-accent-pink mx-auto mb-2" />
                  <p className="text-grey-400 text-sm">تکمیل پروژه</p>
                  <p className="text-white font-semibold">می 2029</p>
                </div>
                <div className="bg-dark-700/50 rounded-lg p-4 text-center">
                  <Home className="h-6 w-6 text-accent-pink mx-auto mb-2" />
                  <p className="text-grey-400 text-sm">نوع واحد</p>
                  <p className="text-white font-semibold">ویلای 4 خوابه</p>
                </div>
                <div className="bg-dark-700/50 rounded-lg p-4 text-center">
                  <Car className="h-6 w-6 text-accent-pink mx-auto mb-2" />
                  <p className="text-grey-400 text-sm">پارکینگ</p>
                  <p className="text-white font-semibold">2 خودرو</p>
                </div>
                <div className="bg-dark-700/50 rounded-lg p-4 text-center">
                  <Building className="h-6 w-6 text-accent-pink mx-auto mb-2" />
                  <p className="text-grey-400 text-sm">متراژ</p>
                  <p className="text-white font-semibold">تا 356 متر مربع</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleWhatsAppContact}
                  className="btn-primary flex-1"
                >
                  <Phone className="ml-2 h-4 w-4" />
                  تماس با مشاور
                </Button>
                <Button 
                  onClick={() => window.open(project.brochureUrl, '_blank')}
                  variant="outline" 
                  className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10 flex-1"
                >
                  <ExternalLink className="ml-2 h-4 w-4" />
                  دانلود بروشور
                </Button>
              </div>

              <Separator className="bg-grey-700 mb-8" />

              {/* Facilities */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">امکانات و تسهیلات</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.facilities.map((facility, index) => {
                    const Icon = facility.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 space-x-reverse bg-dark-700/30 rounded-lg p-4">
                        <Icon className="h-6 w-6 text-accent-pink" />
                        <span className="text-grey-300">{facility.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator className="bg-grey-700 mb-8" />

              {/* Location */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">موقعیت مکانی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.mapPoints.map((point, index) => (
                    <div key={index} className="flex items-center justify-between bg-dark-700/30 rounded-lg p-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <MapPin className="h-5 w-5 text-accent-pink" />
                        <span className="text-grey-300">{point.name}</span>
                      </div>
                      <span className="text-accent-pink font-semibold">{point.distance} کیلومتر</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-grey-700 mb-8" />

              {/* Payment Plan */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">شرایط پرداخت</h3>
                <div className="bg-dark-700/30 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-accent-pink/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <span className="text-accent-pink font-bold text-xl">10%</span>
                      </div>
                      <p className="text-white font-semibold">پیش پرداخت</p>
                      <p className="text-grey-400 text-sm">هنگام رزرو</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-accent-pink/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <span className="text-accent-pink font-bold text-xl">70%</span>
                      </div>
                      <p className="text-white font-semibold">طی ساخت</p>
                      <p className="text-grey-400 text-sm">اقساط ماهانه</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-accent-pink/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <span className="text-accent-pink font-bold text-xl">20%</span>
                      </div>
                      <p className="text-white font-semibold">تحویل</p>
                      <p className="text-grey-400 text-sm">هنگام دریافت کلید</p>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-grey-400">
                      هزینه سرویس: <span className="text-accent-pink">{project.serviceCharge}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-accent-pink/10 to-accent-blue/10 border-accent-pink/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">علاقه مند به این پروژه هستید؟</h3>
            <p className="text-grey-300 mb-6">
              مشاورین ما آماده ارائه مشاوره رایگان و بازدید از پروژه می باشند
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsAppContact}
                className="btn-primary"
                size="lg"
              >
                <Phone className="ml-2 h-5 w-5" />
                تماس فوری با مشاور
              </Button>
              <Button 
                onClick={() => window.open(project.brochureUrl, '_blank')}
                variant="outline"
                className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink/10"
                size="lg"
              >
                <ExternalLink className="ml-2 h-5 w-5" />
                مشاهده کاتالوگ کامل
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}