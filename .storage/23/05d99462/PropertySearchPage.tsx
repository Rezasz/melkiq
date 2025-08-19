import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Building2, Calendar, DollarSign, Eye, Heart } from "lucide-react";

interface PropertySearchPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function PropertySearchPage({ onNavigate }: PropertySearchPageProps) {
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    area: '',
    unitType: '',
    status: '',
    developer: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock property data
  const mockProperties = [
    {
      id: 1,
      name: "برج الماس",
      area: "Dubai Marina",
      city: "Dubai",
      developer: "Emaar",
      priceFrom: 850000,
      priceTo: 1500000,
      unitType: "1-3 BR",
      status: "Ready",
      completionDate: "2023",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg",
      features: ["نمای دریا", "استخر", "باشگاه"]
    },
    {
      id: 2,
      name: "ویلاهای طلایی",
      area: "Emirates Hills",
      city: "Dubai",
      developer: "DAMAC",
      priceFrom: 2500000,
      priceTo: 4500000,
      unitType: "4-6 BR Villa",
      status: "Under Construction",
      completionDate: "Q2 2025",
      image: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg",
      features: ["باغ خصوصی", "گاراژ", "نمای گلف"]
    },
    {
      id: 3,
      name: "آپارتمان‌های مدرن",
      area: "Business Bay",
      city: "Dubai",
      developer: "Binghatti",
      priceFrom: 650000,
      priceTo: 1200000,
      unitType: "Studio-2 BR",
      status: "Presale",
      completionDate: "Q4 2026",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      features: ["مرکز شهر", "متروی نزدیک", "امکانات ورزشی"]
    },
    {
      id: 4,
      name: "برج نور",
      area: "Downtown Dubai",
      city: "Dubai",
      developer: "Sobha",
      priceFrom: 1800000,
      priceTo: 3200000,
      unitType: "2-4 BR",
      status: "Ready",
      completionDate: "2024",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
      features: ["نمای برج خلیفه", "لوکس", "مرکز خرید"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property => property.priceFrom >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.priceTo <= parseInt(filters.maxPrice));
    }

    if (filters.area) {
      filtered = filtered.filter(property => property.area === filters.area);
    }

    if (filters.status) {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    setFilteredProperties(filtered);
  }, [searchTerm, filters, properties]);

  const formatPrice = (price: number) => {
    return (price / 1000000).toFixed(1) + 'M AED';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-500';
      case 'Under Construction': return 'bg-yellow-500';
      case 'Presale': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Ready': return 'آماده تحویل';
      case 'Under Construction': return 'در حال ساخت';
      case 'Presale': return 'پیش‌فروش';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-4">
            <span className="gradient-text">جستجوی املاک</span>
          </h1>
          <p className="text-xl text-stone-400 max-w-3xl mx-auto">
            بیش از {properties.length} ملک منتخب در بهترین مناطق دبی
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card className="bg-navy-800 border-gold-500/20">
            <CardContent className="p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
                <Input
                  placeholder="جستجو بر اساس نام، منطقه یا سازنده..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 bg-navy-700 border-gold-500/30 text-stone-100 text-lg py-3"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div>
                  <Input
                    placeholder="حداقل قیمت"
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    className="bg-navy-700 border-gold-500/30 text-stone-100"
                  />
                </div>
                <div>
                  <Input
                    placeholder="حداکثر قیمت"
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    className="bg-navy-700 border-gold-500/30 text-stone-100"
                  />
                </div>
                <div>
                  <Select value={filters.area} onValueChange={(value) => setFilters({...filters, area: value})}>
                    <SelectTrigger className="bg-navy-700 border-gold-500/30 text-stone-100">
                      <SelectValue placeholder="منطقه" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dubai Marina">Dubai Marina</SelectItem>
                      <SelectItem value="Downtown Dubai">Downtown Dubai</SelectItem>
                      <SelectItem value="Business Bay">Business Bay</SelectItem>
                      <SelectItem value="Emirates Hills">Emirates Hills</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                    <SelectTrigger className="bg-navy-700 border-gold-500/30 text-stone-100">
                      <SelectValue placeholder="وضعیت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ready">آماده تحویل</SelectItem>
                      <SelectItem value="Under Construction">در حال ساخت</SelectItem>
                      <SelectItem value="Presale">پیش‌فروش</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    className="w-full btn-secondary"
                    onClick={() => {
                      setFilters({
                        minPrice: '',
                        maxPrice: '',
                        area: '',
                        unitType: '',
                        status: '',
                        developer: ''
                      });
                      setSearchTerm('');
                    }}
                  >
                    <Filter className="ml-2 h-4 w-4" />
                    حذف فیلترها
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-stone-400">
            {filteredProperties.length} ملک یافت شد
          </p>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <Card key={i} className="bg-navy-800 border-gold-500/20">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="bg-navy-700 h-48 rounded-lg mb-4"></div>
                    <div className="bg-navy-700 h-6 rounded mb-2"></div>
                    <div className="bg-navy-700 h-4 rounded mb-4"></div>
                    <div className="bg-navy-700 h-10 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="property-card group cursor-pointer" onClick={() => onNavigate('property-detail', property)}>
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getStatusColor(property.status)} text-white`}>
                      {getStatusText(property.status)}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Button variant="ghost" size="icon" className="bg-navy-900/50 hover:bg-navy-900/70 text-white">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-stone-100 mb-2">{property.name}</h3>
                    <div className="flex items-center text-stone-400 mb-2">
                      <MapPin className="h-4 w-4 ml-1" />
                      <span>{property.area}, {property.city}</span>
                    </div>
                    <p className="text-gold-400 font-semibold">توسط {property.developer}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-400">قیمت:</span>
                      <span className="text-xl font-bold text-stone-100">
                        {formatPrice(property.priceFrom)} - {formatPrice(property.priceTo)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-400">نوع واحد:</span>
                      <span className="text-stone-100">{property.unitType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-400">تحویل:</span>
                      <span className="text-stone-100">{property.completionDate}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-stone-300 mb-2">ویژگی‌ها:</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs border-gold-500/30 text-stone-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="btn-primary flex-1">
                      <Eye className="ml-2 h-4 w-4" />
                      مشاهده جزئیات
                    </Button>
                    <Button variant="outline" className="btn-secondary" onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('contact');
                    }}>
                      تماس
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}