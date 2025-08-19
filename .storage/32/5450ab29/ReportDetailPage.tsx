import { Button } from "@/components/ui/button";

interface ReportDetailPageProps {
  onNavigate: (page: string) => void;
}

export default function ReportDetailPage({ onNavigate }: ReportDetailPageProps) {
  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-luxury font-bold gradient-text mb-4">
            جزئیات گزارش
          </h1>
          <p className="text-stone-400 mb-6">این صفحه در حال توسعه است.</p>
          <Button onClick={() => onNavigate('business-intelligence')} className="btn-primary">
            بازگشت به گزارش‌ها
          </Button>
        </div>
      </div>
    </div>
  );
}