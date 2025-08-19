export interface Property {
  row_id: string; // UUID primary key for this row (surrogate key).
  property_id: number; // Property ID from Reelly API.
  property_name: string; // Human-readable name of the property.
  property_slug: string; // URL-friendly slug for the property.
  area_name: string; // Area/district name where the property is located.
  city: string | null; // City of the property (nullable).
  country: string; // Country of the property.
  property_area_unit: string; // Area unit at property level (e.g., sqft, m2).
  completion_datetime: string; // Expected completion date/time of the project.
  status: string; // Overall project status (e.g., Presale, Under construction, Completed).
  sale_status: string; // Sales stage (e.g., Presale(EOI), On sale).
  has_escrow: boolean; // True if the project has an escrow account.
  is_partner_project: boolean; // True if the project is marked as a partner project.
  min_price_aed: number | null; // Minimum price across units for the property (AED).
  max_price_aed: number | null; // Maximum price across units for the property (AED).
  furnishing: string; // Furnishing status/notes (e.g., Fully furnished, Only kitchen).
  service_charge: string; // Service charge text as provided by API (may include units).
  readiness: string; // Readiness/availability text as provided by API.
  property_price_currency: string; // Currency code for property pricing (e.g., AED).
  developer_name: string; // Developer company name.
  developer_id: number; // Developer ID from Reelly API.
  developer_website: string; // Developer website URL.
  property_cover_image_url: string; // JSON string with cover image metadata and URL.
  brochure_url: string; // URL to the property brochure PDF.
  layouts_pdf: string; // URL to property layouts/floorplans PDF.
  unit_block_id: number; // Unit block ID within the property (from Reelly API).
  unit_block_name: string; // Name/title of the unit block (e.g., "Studio Apartments - Aizel Tower").
  unit_type: string; // Unit type label (e.g., Apartments, Townhouse).
  normalized_type: string; // Normalized/generalized unit type for grouping (e.g., Apartments).
  units_price_from_aed: number | null; // Starting price for units in this block (AED).
  units_price_to_aed: number | null; // Max price for units in this block (AED).
  units_area_from_m2: number; // Min unit size in square meters for this block.
  units_area_to_m2: number; // Max unit size in square meters for this block.
  unit_area_unit: string; // Area unit at unit-block level (e.g., sqft, m2).
  typical_unit_image_url: string; // JSON array string of typical unit image URLs for this block.
  interior_images: string | null; // JSON array string of interior image URLs.
  lobby_images: string | null; // JSON array string of lobby image URLs.
  architecture_images: string | null; // JSON array string of architecture image URLs.
  eivan_url: string | null; // Eivan-specific URL.
}

// Utility function to format price
export const formatPrice = (price: number | null): string => {
  if (!price) return "Please Call For The Price";
  
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M AED`;
  }
  if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K AED`;
  }
  return `${price} AED`;
};

// Utility function to parse image URL from JSON string
export const parseImageUrl = (imageJson: string): string => {
  try {
    if (!imageJson) return '';
    
    // Handle case where it's already a direct URL
    if (imageJson.startsWith('http')) {
      return imageJson;
    }
    
    // Try to parse as JSON
    const parsed = JSON.parse(imageJson);
    
    // Handle different JSON structures
    if (typeof parsed === 'string') {
      return parsed;
    }
    
    if (parsed.url) {
      return parsed.url;
    }
    
    if (Array.isArray(parsed) && parsed.length > 0) {
      return typeof parsed[0] === 'string' ? parsed[0] : parsed[0].url || '';
    }
    
    return '';
  } catch (error) {
    // If JSON parsing fails, assume it's a direct URL
    return imageJson || '';
  }
};

// Utility function to parse image array from JSON string
export const parseImageArray = (imageJson: string | null): string[] => {
  try {
    if (!imageJson) return [];
    
    // Handle case where it's already a direct URL
    if (imageJson.startsWith('http')) {
      return [imageJson];
    }
    
    // Try to parse as JSON
    const parsed = JSON.parse(imageJson);
    
    if (Array.isArray(parsed)) {
      return parsed.map(item => 
        typeof item === 'string' ? item : item.url || ''
      ).filter(url => url);
    }
    
    if (typeof parsed === 'string' && parsed.startsWith('http')) {
      return [parsed];
    }
    
    if (parsed.url) {
      return [parsed.url];
    }
    
    return [];
  } catch (error) {
    // If JSON parsing fails and it looks like a URL, return it
    if (imageJson && imageJson.startsWith('http')) {
      return [imageJson];
    }
    return [];
  }
};

// Utility function to format date
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

// Utility function to convert m2 to sqft
export const m2ToSqft = (m2: number): number => {
  return Math.round(m2 * 10.764);
};

// Utility function to get unique values from array
export const getUniqueValues = <T>(arr: T[], key: keyof T): T[keyof T][] => {
  return Array.from(new Set(arr.map(item => item[key]))).filter(Boolean);
};