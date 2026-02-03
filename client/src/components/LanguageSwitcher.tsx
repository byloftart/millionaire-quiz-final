import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === 'ru' ? 'az' : 'ru';
    setLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white/80 hover:bg-white border-gray-200"
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">{language === 'ru' ? 'AZ' : 'RU'}</span>
    </Button>
  );
}
