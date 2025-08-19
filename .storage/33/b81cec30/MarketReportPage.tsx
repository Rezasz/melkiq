import { Button } from "@/components/ui/button";

interface MarketReportPageProps {
  onNavigate: (page: string) => void;
}

export default function MarketReportPage({ onNavigate }: MarketReportPageProps) {
  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-luxury font-bold gradient-text mb-4">
            گزارش بازار
          </h1>
          <p className="text-stone-400 mb-6">گزارش کامل بازار در حال توسعه است.</p>
          <Button onClick={() => onNavigate('home')} className="btn-primary">
            بازگشت به خانه
          </Button>
        </div>
      </div>
    </div>
  );
}