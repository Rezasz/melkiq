import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, Bed, Bath, Car, Calendar, Phone, Heart, Share2, Camera, ArrowRight, ArrowLeft, CheckCircle, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Property {
  property_id: number;
  property_name: string;
  area_name: string;
  developer_name: string;
  min_price_aed: number;
  max_price_aed: number;
  normalized_type: string;
  readiness: string;
  property_cover_image_url: string;
  units_area_from_m2: number;
  units_area_to_m2: number;
  completion_datetime: string;
  status: string;
  furnishing: string;
  interior_images: string;
  lobby_images: string;
  architecture_images: string;
  brochure_url: string;
  layouts_pdf: string;
  developer_website: string;
  service_charge: string;
}

interface PropertyDetailProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function PropertyDetail({ onNavigate }: PropertyDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showViewingDialog, setShowViewingDialog] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone_number: '',
    email: '',
    property_name: ''
  });
  const [viewingForm, setViewingForm] = useState({
    name: '',
    phone_number: '',
    property_name: '',
    viewing_date: '',
    viewing_time: ''
  });

  // Fetch property details
  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reelly_units_property_flat')
        .select('*')
        .eq('property_id', id)
        .single();
      
      if (error) {
        console.error('Error fetching property:', error);
        return;
      }
      
      setProperty(data);
      setContactForm(prev => ({ ...prev, property_name: data?.property_name || '' }));
      setViewingForm(prev => ({ ...prev, property_name: data?.property_name || '' }));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get all images
  const getAllImages = () => {
    if (!property) return [];
    
    const images = [];
    if (property.property_cover_image_url) images.push(property.property_cover_image_url);
    if (property.interior_images) images.push(...property.interior_images.split(',').map(img => img.trim()));
    if (property.lobby_images) images.push(...property.lobby_images.split(',').map(img => img.trim()));
    if (property.architecture_images) images.push(...property.architecture_images.split(',').map(img => img.trim()));
    
    return images.filter(img => img && img !== '');
  };

  const images = getAllImages();

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([contactForm]);
      
      if (error) {
        toast.error('خطا در ارسال اطلاعات');
        return;
      }
      
      toast.success('اطلاعات شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
      setShowContactDialog(false);
      setContactForm({ name: '', phone_number: '', email: '', property_name: property?.property_name || '' });
    } catch (error) {
      toast.error('خطا در ارسال اطلاعات');
    }
  };

  // Handle viewing request submission
  const handleViewingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('viewing_requests')
        .insert([{
          ...viewingForm,
          viewing_datetime: `${viewingForm.viewing_date}T${viewingForm.viewing_time}:00.000Z`
        }]);
      
      if (error) {
        toast.error('خطا در ثبت درخواست بازدید');
        return;
      }
      
      toast.success('درخواست بازدید شما ثبت شد. به زودی برای تایید زمان با شما تماس خواهیم گرفت.');
      setShowViewingDialog(false);
      setViewingForm({ name: '', phone_number: '', property_name: property?.property_name || '', viewing_date: '', viewing_time: '' });
    } catch (error) {
      toast.error('خطا در ثبت درخواست بازدید');
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M AED`;
    }
    return `${(price / 1000).toFixed(0)}K AED`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar onNavigate={onNavigate} />
        <div className="pt-24 flex items-center justify-center h-96">
          <div className="text-white text-xl">در حال بارگذاری...</div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar onNavigate={onNavigate} />
        <div className="pt-24 text-center">
          <h1 className="text-2xl text-white mb-4">ملک یافت نشد</h1>
          <Button onClick={() => onNavigate('properties')} className="btn-primary">
            بازگشت به لیست املاک
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar onNavigate={onNavigate} />
      
      {/* Hero Section with Image Gallery */}
      <section className="pt-16">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={property.property_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/800/500';
                }}
              />
              {images.length > 1 && (
                <>
                  <Button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    size="icon"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    size="icon"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-accent-pink' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className={`${property.readiness === 'Ready' ? 'bg-green-500' : 'bg-accent-pink'} text-white`}>
                  {property.readiness === 'Ready' ? 'آماده' : 'پیش فروش'}
                </Badge>
                <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-accent-pink/80 text-white">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-accent-pink/80 text-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-black/70 text-white">
                  <Camera className="h-4 w-4 ml-1" />
                  {images.length} تصویر
                </Badge>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-grey-400/20 flex items-center justify-center">
              <Building2 className="h-24 w-24 text-grey-400" />
            </div>
          )}
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-luxury font-bold text-white mb-2">
                  {property.property_name}
                </h1>
                <div className="flex items-center text-grey-300 mb-4">
                  <MapPin className="h-5 w-5 ml-2" />
                  <span className="text-lg">{property.area_name}</span>
                </div>
                <div className="flex items-center text-grey-300 mb-6">
                  <Building2 className="h-5 w-5 ml-2" />
                  <span>{property.developer_name}</span>
                  {property.developer_website && (
                    <a href={property.developer_website} target="_blank" rel="noopener noreferrer" className="text-accent-pink hover:underline mr-2">
                      وبسایت سازنده
                    </a>
                  )}
                </div>
              </div>

              {/* Price */}
              <Card className="bg-dark-800 border-accent-pink/20 mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold gradient-text mb-2">
                        {formatPrice(property.min_price_aed)}
                      </p>
                      {property.max_price_aed && property.max_price_aed > property.min_price_aed && (
                        <p className="text-grey-400">
                          تا {formatPrice(property.max_price_aed)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-grey-400">متراژ</p>
                      <p className="text-xl font-semibold text-white">
                        {property.units_area_from_m2 ? `${property.units_area_from_m2?.toFixed(0)} m²` : 'نامشخص'}
                      </p>
                      {property.units_area_to_m2 && property.units_area_to_m2 > property.units_area_from_m2 && (
                        <p className="text-sm text-grey-400">
                          تا {property.units_area_to_m2?.toFixed(0)} m²
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Features */}
              <Card className="bg-dark-800 border-grey-400/20 mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">مشخصات ملک</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-accent-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Building2 className="h-6 w-6 text-accent-pink" />
                      </div>
                      <p className="text-grey-400 text-sm">نوع</p>
                      <p className="text-white font-semibold">{property.normalized_type || 'نامشخص'}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-accent-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Calendar className="h-6 w-6 text-accent-pink" />
                      </div>
                      <p className="text-grey-400 text-sm">تحویل</p>
                      <p className="text-white font-semibold">
                        {property.completion_datetime ? new Date(property.completion_datetime).getFullYear() : 'نامشخص'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-accent-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="h-6 w-6 text-accent-pink" />
                      </div>
                      <p className="text-grey-400 text-sm">وضعیت</p>
                      <p className="text-white font-semibold">{property.status || 'نامشخص'}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-accent-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Star className="h-6 w-6 text-accent-pink" />
                      </div>
                      <p className="text-grey-400 text-sm">مبلمان</p>
                      <p className="text-white font-semibold">{property.furnishing || 'غیر مبله'}</p>
                    </div>
                  </div>
                  {property.service_charge && (
                    <div className="mt-4 pt-4 border-t border-grey-400/20">
                      <p className="text-grey-400">هزینه سرویس: <span className="text-white">{property.service_charge}</span></p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Downloads */}
              {(property.brochure_url || property.layouts_pdf) && (
                <Card className="bg-dark-800 border-grey-400/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">فایل‌های قابل دانلود</h3>
                    <div className="flex gap-4">
                      {property.brochure_url && (
                        <Button asChild className="btn-secondary">
                          <a href={property.brochure_url} target="_blank" rel="noopener noreferrer">
                            دانلود بروشور
                          </a>
                        </Button>
                      )}
                      {property.layouts_pdf && (
                        <Button asChild className="btn-secondary">
                          <a href={property.layouts_pdf} target="_blank" rel="noopener noreferrer">
                            دانلود پلان‌ها
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-dark-800 border-accent-pink/20 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">تماس با مشاور</h3>
                  <div className="space-y-4">
                    <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                      <DialogTrigger asChild>
                        <Button className="btn-primary w-full">
                          <Phone className="ml-2 h-5 w-5" />
                          درخواست تماس
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-dark-800 border-accent-pink/20">
                        <DialogHeader>
                          <DialogTitle className="text-white">درخواست تماس</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                          <div>
                            <Label className="text-white">نام و نام خانوادگی</Label>
                            <Input
                              required
                              value={contactForm.name}
                              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                              className="bg-dark-900 border-grey-400/20 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">شماره تماس</Label>
                            <Input
                              required
                              value={contactForm.phone_number}
                              onChange={(e) => setContactForm({...contactForm, phone_number: e.target.value})}
                              className="bg-dark-900 border-grey-400/20 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">ایمیل (اختیاری)</Label>
                            <Input
                              type="email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                              className="bg-dark-900 border-grey-400/20 text-white"
                            />
                          </div>
                          <Button type="submit" className="btn-primary w-full">
                            ارسال درخواست
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showViewingDialog} onOpenChange={setShowViewingDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="btn-secondary w-full">
                          درخواست بازدید
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-dark-800 border-accent-pink/20">
                        <DialogHeader>
                          <DialogTitle className="text-white">درخواست بازدید</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleViewingSubmit} className="space-y-4">
                          <div>
                            <Label className="text-white">نام و نام خانوادگی</Label>
                            <Input
                              required
                              value={viewingForm.name}
                              onChange={(e) => setViewingForm({...viewingForm, name: e.target.value})}
                              className="bg-dark-900 border-grey-400/20 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">شماره تماس</Label>
                            <Input
                              required
                              value={viewingForm.phone_number}
                              onChange={(e) => setViewingForm({...viewingForm, phone_number: e.target.value})}
                              className="bg-dark-900 border-grey-400/20 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">تاریخ بازدید</Label>
                            <Input
                              type="date"
                              required
                              value={viewingForm.viewing_date}
                              onChange={(e) => setViewingForm({...viewingForm, viewing_date: e.target.value})}
                              className="bg-dark-900 border-grey-400/20 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">زمان بازدید</Label>
                            <Input
                              type="time"
                              required
                              value={viewingForm.viewing_time}
                              onChange={(e) => setViewingForm({...viewingForm, viewing_time: e.target.value})}
                              className="bg-dark-900 border-grey-400/20 text-white"
                            />
                          </div>
                          <Button type="submit" className="btn-primary w-full">
                            ثبت درخواست بازدید
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <div className="pt-4 border-t border-grey-400/20">
                      <p className="text-sm text-grey-400 mb-2">تماس مستقیم:</p>
                      <p className="text-white font-semibold">+971 50 123 4567</p>
                      <p className="text-white">info@melkiq.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}