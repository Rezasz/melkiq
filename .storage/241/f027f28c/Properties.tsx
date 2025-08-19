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
  // Utility function to shuffle array
  const shuffleArray = (array: Property[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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

      // Premium areas list - only show projects from these areas
      const premiumAreas = [
        "Abu Dhabi",
        "Ajmal Makan City - Sharjah Waterfront",
        "Ajman",
        "Al Arqoub, Ras Al Khaimah",
        "Al Barari",
        "Al Barsha 1",
        "Al Barsha 2",
        "Al Barsha 3",
        "Al Barsha South",
        "Al Faqa, Abu Dhabi",
        "Al Furjan",
        "Al Habtoor City",
        "Al Hamra Village, Ras al Khaimah",
        "Al Hamra Village, Ras Al Khaimah",
        " Al Hamriyah, Sharjah",
        "Al Hamriyah, Sharjah",
        "Aljada Sharjah",
        "Aljada, Sharjah ",
        "Al Jaddaf",
        "Al Jazeera, Ras Al Khaimah",
        "Al Jurf",
        "Al Jurf, Abu Dhabi",
        "Aljurf Gardens",
        "Al Khail Heights",
        "Al Khalidiya, Sharjah",
        "Al Kifaf Area",
        "Al Mamzar, Sharjah",
        "Al Marina, Abu Dhabi",
        "Al Marjan Island, Ras Al Khaimah",
        "Al Maryah Island, Abu Dhabi",
        "Al Raha Beach, Abu Dhabi",
        "Al Rashidiya 1, Ajman",
        "Al Reem Island, Abu Dhabi",
        "Al Rifaah, Sharjah",
        "Al Safa",
        "Al Satwa",
        "Al Seef, Abu Dhabi",
        " Al Shamkha, Abu Dhabi",
        "Al Sufouh 1",
        "Al Sufouh 2",
        "Al Suyoh Suburb, Sharjah",
        "Al Tay, Sharjah",
        "Al Wadi desert, Ras Al Khaimah",
        "Al Warsan",
        "Al Wasl (City Walk)",
        "Al Zahia, Sharjah",
        "Al Zorah, Ajman ",
        "Arabian Gulf",
        "Arabian Ranches",
        "Arabian Ranches 2",
        "Arabian Ranches 3",
        "Arjan",
        "Barsha South",
        "Bluewaters Island",
        "Bukadra",
        "Business Bay",
        "City of Arabia",
        "Complex (Dubailand)",
        "Creekside",
        "Culture Village",
        "Damac Hills",
        "Damac Hills 2",
        "Damac Lagoons",
        "Discovery Gardens",
        "District One",
        "Downtown Dubai",
        "Downtown Jebel Ali",
        "Downtown Umm Al Quwain, Umm Al Quwain",
        "Dubai Creek Harbour",
        "Dubai Design District ",
        "Dubai Festival City",
        "Dubai Golf City",
        "Dubai Harbour",
        "Dubai Healthcare City",
        "Dubai Hills",
        "Dubai Industrial City",
        "Dubai International Financial Centre (DIFC)",
        "Dubai Internet City",
        "Dubai Investment Park",
        "Dubai Investment Park 2",
        "Dubai Islands",
        "Dubailand",
        "Dubai Land",
        "Dubai Land Residence Complex (DLRC)",
        "Dubai Marina",
        "Dubai Maritime City",
        "Dubai Media City",
        "Dubai Production City",
        "Dubai Science Park",
        "Dubai Silicon Oasis",
        "Dubai South",
        "Dubai Sports City",
        "Dubai Studio City",
        "Dubai Water Canal",
        "Dubai Waterfront",
        "Emaar Beachfront",
        "Emaar South",
        "Emirates Hills",
        "Expo City Dubai",
        "Expo Living",
        "Fahid Island, Abu Dhabi",
        "Financial Centre",
        "Ghantoot",
        "Grand Polo Club and Resort",
        "Greenwood",
        "Hayat Islands, Ras Al Khaimah",
        "Hudayriyat Island",
        "International City",
        "International City Phase 2",
        "Jebel Ali",
        "Jumeirah",
        "Jumeirah 2",
        "Jumeirah Beach Residence (JBR)",
        "Jumeirah Garden City",
        "Jumeirah Golf Estates",
        "Jumeirah Heights",
        "Jumeirah Islands",
        "Jumeirah Lake Towers (JLT)",
        "Jumeirah Park",
        "Jumeirah Village Circle (JVC)",
        "Jumeirah Village Triangle (JVT)",
        "Khalifa City, Abu Dhabi",
        "La Mer",
        "Legends",
        "Liwan",
        "Madinat Al Mataar",
        "Madinat Jumeirah Living",
        "Madinat Zayed, Abu Dhabi",
        "Majan",
        "Maryam Island, Sharjah",
        "Masdar City, Abu Dhabi",
        "Mesk District",
        "Meydan City",
        "Mina Al Arab, Ras Al Khaimah",
        "Mina Rashid",
        "Mirdif Hills",
        "Mirdif Tulip",
        "Mohammed Bin Rashid City (MBR)",
        "Motor City",
        "Mudon",
        "Muwaileh Commercial, Sharjah",
        "Nad Al Sheba",
        "Nad Al Sheba 1",
        "Nshama",
        "Old Town",
        "Palm Jebel Ali",
        "Palm Jumeirah",
        "Park Gate Residences",
        "Raha Island, Ras Al Khaimah",
        "Ramhan Island",
        "Ras Al Khaimah",
        "Ras Al Khor",
        "Rashid Yachts and Marina",
        "Reem",
        "Remraam",
        "Riverside",
        "Saadiyat Island, Abu Dhabi",
        "Saih Shuaib 2",
        "Sharjah",
        "Sharjah Waterfront City",
        "Sheikh Zayed Road",
        "Sobha Hartland",
        "Sobha Hartland II",
        "SOON",
        "The Greens",
        "The Lakes",
        "The Meadows",
        "The Oasis by Emaar",
        "The Springs",
        "The Sustainable City",
        "The Valley",
        "The Views",
        "The Villa",
        "The World Islands",
        "Tilal Al Ghaf",
        "Tilal, Sharjah",
        "Town Square",
        "Trade Centre 2",
        "Trade Centre First",
        "Umm Al Quwain",
        "Umm Suqeim 2",
        "Uptown Dubai",
        "Villanova",
        "Wadi Al Safa 4",
        "Wadi Al Safa 5",
        "Wadi Al Safa 7",
        "Warsan 4",
        "Wasl Gate",
        "YAS Island",
        "Yas Island, Abu Dhabi",
        "Za'abeel 1",
        "Zayed City, Abu Dhabi"
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
        .in('area_name', premiumAreas)
        .limit(1000); // Fetch up to 1000 for client-side filtering

      if (error) {
        console.error('Error fetching properties:', error);
        return;
      }
      
      if (data) {
        // Randomize the order of properties
        const randomizedData = shuffleArray(data);
        setProperties(randomizedData);
      } else {
        setProperties([]);
      }
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
              <SelectContent className="bg-dark-900 border-grey-400/20 text-white">
                <SelectItem value="all" className="text-white hover:bg-accent-pink/20">همه مناطق</SelectItem>
                {uniqueAreas.slice(0, 10).map((area) => (
                  <SelectItem key={area} value={area} className="text-white hover:bg-accent-pink/20">{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-dark-900 border-grey-400/20 text-white">
                <SelectValue placeholder="نوع ملک" />
              </SelectTrigger>
              <SelectContent className="bg-dark-900 border-grey-400/20 text-white">
                <SelectItem value="all" className="text-white hover:bg-accent-pink/20">همه انواع</SelectItem>
                {uniqueTypes.slice(0, 8).map((type) => (
                  <SelectItem key={type} value={type} className="text-white hover:bg-accent-pink/20">{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-dark-900 border-grey-400/20 text-white">
                <SelectValue placeholder="محدوده قیمت" />
              </SelectTrigger>
              <SelectContent className="bg-dark-900 border-grey-400/20 text-white">
                <SelectItem value="all" className="text-white hover:bg-accent-pink/20">همه قیمت‌ها</SelectItem>
                <SelectItem value="0-500000" className="text-white hover:bg-accent-pink/20">تا 500K AED</SelectItem>
                <SelectItem value="500000-1000000" className="text-white hover:bg-accent-pink/20">500K - 1M AED</SelectItem>
                <SelectItem value="1000000-2000000" className="text-white hover:bg-accent-pink/20">1M - 2M AED</SelectItem>
                <SelectItem value="2000000-5000000" className="text-white hover:bg-accent-pink/20">2M - 5M AED</SelectItem>
                <SelectItem value="5000000" className="text-white hover:bg-accent-pink/20">بالای 5M AED</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-dark-900 border-grey-400/20 text-white">
                <SelectValue placeholder="وضعیت پروژه" />
              </SelectTrigger>
              <SelectContent className="bg-dark-900 border-grey-400/20 text-white">
                <SelectItem value="all" className="text-white hover:bg-accent-pink/20">همه وضعیت‌ها</SelectItem>
                {uniqueStatuses.slice(0, 8).map((statusItem) => (
                  <SelectItem key={statusItem} value={statusItem} className="text-white hover:bg-accent-pink/20">{statusItem}</SelectItem>
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
                  <SelectContent className="bg-dark-900 border-grey-400/20 text-white">
                    <SelectItem value="price_asc" className="text-white hover:bg-accent-pink/20">قیمت: کم به زیاد</SelectItem>
                    <SelectItem value="price_desc" className="text-white hover:bg-accent-pink/20">قیمت: زیاد به کم</SelectItem>
                    <SelectItem value="area_asc" className="text-white hover:bg-accent-pink/20">متراژ: کم به زیاد</SelectItem>
                    <SelectItem value="area_desc" className="text-white hover:bg-accent-pink/20">متراژ: زیاد به کم</SelectItem>
                    <SelectItem value="name_asc" className="text-white hover:bg-accent-pink/20">نام: الف تا ی</SelectItem>
                    <SelectItem value="name_desc" className="text-white hover:bg-accent-pink/20">نام: ی تا الف</SelectItem>
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