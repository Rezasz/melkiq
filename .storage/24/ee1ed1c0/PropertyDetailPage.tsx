import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PropertyDetailPageProps {
  onNavigate: (page: string) => void;
}

export default function PropertyDetailPage({ onNavigate }: PropertyDetailPageProps) {
  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Button onClick={() => onNavigate('properties')} className="mb-6 btn-secondary">
          <ArrowRight className="ml-2 h-4 w-4" />
          بازگشت به لیست املاک
        </Button>
        <div className="text-center py-20">
          <h1 className="text-4xl font-luxury font-bold gradient-text mb-4">
            جزئیات ملک
          </h1>
          <p className="text-stone-400">این صفحه در حال توسعه است.</p>
        </div>
      </div>
    </div>
  );
}