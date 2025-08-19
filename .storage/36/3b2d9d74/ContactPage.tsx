import ContactForm from "./ContactForm";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-navy-900 pt-20">
      <ContactForm onNavigate={onNavigate} />
    </div>
  );
}