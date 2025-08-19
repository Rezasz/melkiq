import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import GoldenVisa from './pages/GoldenVisa';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Services from './pages/Services';
import TopProjects from './pages/TopProjects';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index onNavigate={(page) => window.location.href = page === 'home' ? '/' : `/${page}`} />} />
          <Route path="/golden-visa" element={<GoldenVisa onNavigate={(page) => window.location.href = page === 'home' ? '/' : `/${page}`} />} />
          <Route path="/properties" element={<Properties onNavigate={(page) => window.location.href = page === 'home' ? '/' : `/${page}`} />} />
          <Route path="/property/:id" element={<PropertyDetail onNavigate={(page) => window.location.href = page === 'home' ? '/' : `/${page}`} />} />
          <Route path="/services" element={<Services onNavigate={(page) => window.location.href = page === 'home' ? '/' : `/${page}`} />} />
          <Route path="/top-projects" element={<TopProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
