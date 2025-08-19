import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, TrendingUp, Search, Filter, Heart, Phone, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { Property, formatPrice, parseImageUrl, getUniqueValues, m2ToSqft } from "@/utils/supabase";

interface PropertiesProps {
  onNavigate: (page: string, data?: unknown) => void;
}

export default function Properties({ onNavigate }: PropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("price_asc");

  // Fetch properties from database
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // Premium developers list - only show projects from these developers
      const premiumDevelopers = [
        'Emaar',
        'Nakheel',
        'DAMAC',
        'Dubai Properties',
        'Meraas',
        'Sobha',
        'Binghatti',
        'Azizi',
        'Danube',
        'Select Group',
        'Arada',
        'Omniyat',
        'Al Barari',
        'Time Properties',
        'Falconcity of Wonders',
        'MAG',
        'Al Habtoor Group',
        'Dubai Holding',
        'RAK Properties',
        'Tiger Group',
        'Samana',
        'Nshama Group',
        'Al Futtaim Real Estate Group',
        'ALDAR',
        'Ellington'
      ];

      const { data, error } = await supabase
        .from('reelly_units_property_flat')
        .select(`
          row_id,
          property_id,
          property_name,
          property_slug,
          area_name,
          city,
          country,
          completion_datetime,
          status,
          sale_status,
          has_escrow,
          is_partner_project,
          min_price_aed,
          max_price_aed,
          furnishing,
          readiness,
          developer_name,
          developer_id,
          property_cover_image_url,
          unit_type,
          normalized_type,
          units_area_from_m2,
          units_area_to_m2
        `)
        .not('property_cover_image_url', 'is', null)
        .in('developer_name', premiumDevelopers)
        .limit(1000); // Fetch up to 1000 for client-side filtering

      if (error) {
        console.error('Error fetching properties:', error);
        return;
      }
      
      setProperties(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort properties
  const filterAndSortProperties = () => {
    let filtered = [...properties];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(property =>
        property.property_name.toLowerCase().includes(term) ||
        property.area_name.toLowerCase().includes(term) ||
        property.developer_name.toLowerCase().includes(term)
      );
    }

    // Apply area filter
    if (selectedArea && selectedArea !== 'all') {
      filtered = filtered.filter(property => property.area_name === selectedArea);
    }

    // Apply type filter
    if (selectedType && selectedType !== 'all') {
      filtered = filtered.filter(property => property.normalized_type === selectedType);
    }

    // Apply developer filter
    if (selectedDeveloper && selectedDeveloper !== 'all') {
      filtered = filtered.filter(property => property.developer_name === selectedDeveloper);
    }

    // Apply price range filter
    if (priceRange && priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(property => {
        const price = property.min_price_aed || 0;
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    // Apply status filter
    if (status && status !== 'all') {
      filtered = filtered.filter(property => property.status === status);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return (a.min_price_aed || 0) - (b.min_price_aed || 0);
        case 'price_desc':
          return (b.min_price_aed || 0) - (a.min_price_aed || 0);
        case 'area_asc':
          return (a.units_area_from_m2 || 0) - (b.units_area_from_m2 || 0);
        case 'area_desc':
          return (b.units_area_from_m2 || 0) - (a.units_area_from_m2 || 0);
        case 'name_asc':
          return a.property_name.localeCompare(b.property_name);
        case 'name_desc':
          return b.property_name.localeCompare(a.property_name);
        default:
          // Prioritize "On sale" properties
          if (a.sale_status === 'On sale' && b.sale_status !== 'On sale') return -1;
          if (b.sale_status === 'On sale' && a.sale_status !== 'On sale') return 1;
          return (a.min_price_aed || 0) - (b.min_price_aed || 0);
      }
    });

    setFilteredProperties(filtered);
  };

  // Re-filter when filters change
  useEffect(() => {
    filterAndSortProperties();
  }, [properties, searchTerm, selectedArea, selectedType, selectedDeveloper, priceRange, status, sortBy]);

  // Get unique values for filters
  const uniqueAreas = getUniqueValues(properties, 'area_name') as string[];
  const uniqueTypes = getUniqueValues(properties, 'normalized_type') as string[];
  const uniqueDevelopers = getUniqueValues(properties, 'developer_name') as string[];
  const uniqueStatuses = getUniqueValues(properties, 'status') as string[];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navbar */}
      <Navbar onNavigate={onNavigate} />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-4">
              <span className="gradient-text">جستجوی املاک</span>
            </h1>
            <p className="text-xl text-grey-300 max-w-3xl mx-auto">
              بهترین املاک دبی را با قیمت‌های واقعی بازار کشف کنید
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-dark-800 border-b border-grey-400/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-grey-400" />
                <Input
                  placeholder="جستجوی نام پروژه، منطقه یا سازنده..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-dark-900 border-grey-400/20 text-white"
                />
              </div>
            </div>

            {/* Area Filter */}
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="bg-dark-900 border-grey-400/20 text-white">
                <SelectValue placeholder="منطقه" />
              </SelectTrigger>
              <SelectContent className="bg-dark-900 border-grey-400/20">
                <SelectItem value="all">همه مناطق</SelectItem>
                {uniqueAreas.slice(0, 10).map((area) => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-dark-900 border-grey-400/20 text-white">
                <SelectValue placeholder="نوع ملک" />
              </SelectTrigger>
              <SelectContent className="bg-dark-900 border-grey-400/20">
                <SelectItem value="all">همه انواع</SelectItem>
                {uniqueTypes.slice(0, 8).map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-dark-900 border-grey-400/20 text-white">
                <SelectValue placeholder="محدوده قیمت" />
              </SelectTrigger>
              <SelectContent className="bg-dark-900 border-grey-400/20">
                <SelectItem value="all">همه قیمت‌ها</SelectItem>
                <SelectItem value="0-500000">تا 500K AED</SelectItem>
                <SelectItem value="500000-1000000">500K - 1M AED</SelectItem>
                <SelectItem value="1000000-2000000">1M - 2M AED</SelectItem>
                <SelectItem value="2000000-5000000">2M - 5M AED</SelectItem>
                <SelectItem value="5000000">بالای 5M AED</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-dark-900 border-grey-400/20 text-white">
                <SelectValue placeholder="وضعیت پروژه" />
              </SelectTrigger>
              <SelectContent className="bg-dark-900 border-grey-400/20">
                <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                {uniqueStatuses.slice(0, 8).map((statusItem) => (
                  <SelectItem key={statusItem} value={statusItem}>{statusItem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-dark-800 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-grey-300">
                  {filteredProperties.length} ملک از {properties.length} ملک یافت شد
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-dark-900 border-grey-400/20 text-white">
                    <SelectValue placeholder="مرتب‌سازی" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-900 border-grey-400/20">
                    <SelectItem value="price_asc">قیمت: کم به زیاد</SelectItem>
                    <SelectItem value="price_desc">قیمت: زیاد به کم</SelectItem>
                    <SelectItem value="area_asc">متراژ: کم به زیاد</SelectItem>
                    <SelectItem value="area_desc">متراژ: زیاد به کم</SelectItem>
                    <SelectItem value="name_asc">نام: الف تا ی</SelectItem>
                    <SelectItem value="name_desc">نام: ی تا الف</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <Card key={property.row_id} className="bg-dark-800 border-grey-400/20 hover:border-accent-pink/40 transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <div className="aspect-video bg-grey-400/20 overflow-hidden">
                        {property.property_cover_image_url ? (
                          <img
                            src={parseImageUrl(property.property_cover_image_url)}
                            alt={property.property_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/api/placeholder/400/250';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="h-12 w-12 text-grey-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Badge className={`${property.sale_status === 'On sale' ? 'bg-green-500' : 'bg-accent-pink'} text-white`}>
                          {property.sale_status === 'On sale' ? 'در دسترس' : property.sale_status}
                        </Badge>
                        {property.has_escrow && (
                          <Badge className="bg-blue-500 text-white text-xs">
                            اسکرو
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-3 left-3">
                        <Button size="icon" variant="ghost" className="bg-black/50 hover:bg-accent-pink/80 text-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white line-clamp-1">
                          {property.property_name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center text-grey-400 mb-3">
                        <MapPin className="h-4 w-4 ml-1" />
                        <span className="text-sm">{property.area_name}</span>
                      </div>

                      <div className="flex items-center text-grey-400 mb-3">
                        <Building2 className="h-4 w-4 ml-1" />
                        <span className="text-sm">{property.developer_name}</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold gradient-text">
                            {formatPrice(property.min_price_aed)}
                          </p>
                          {property.max_price_aed && property.max_price_aed > property.min_price_aed && (
                            <p className="text-sm text-grey-400">
                              تا {formatPrice(property.max_price_aed)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-grey-400">متراژ</p>
                          <p className="font-semibold text-white">
                            {property.units_area_from_m2 ? `${m2ToSqft(property.units_area_from_m2)} sqft` : 'نامشخص'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-4">
                        <Button className="btn-primary flex-1" size="sm">
                          <Phone className="ml-1 h-4 w-4" />
                          تماس
                        </Button>
                        <Button 
                          variant="outline" 
                          className="btn-secondary flex-1" 
                          size="sm"
                          onClick={() => window.location.href = `/property/${property.property_id}`}
                        >
                          <Eye className="ml-1 h-4 w-4" />
                          جزئیات
                        </Button>
                      </div>

                      <Separator className="mb-3 bg-grey-400/20" />
                      
                      <div className="flex items-center justify-between text-sm text-grey-400">
                        <span>نوع: {property.normalized_type || 'نامشخص'}</span>
                        <span>{property.furnishing || 'غیر مبله'}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Show more info */}
              {filteredProperties.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Building2 className="h-24 w-24 text-grey-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">هیچ ملکی یافت نشد</h3>
                  <p className="text-grey-400 mb-4">لطفاً فیلترهای خود را تغییر دهید</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedArea("");
                      setSelectedType("");
                      setSelectedDeveloper("");
                      setPriceRange("");
                      setStatus("");
                    }}
                    className="btn-secondary"
                  >
                    پاک کردن فیلترها
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}