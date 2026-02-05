import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

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
      className="flex items-center gap-2 bg-white/90 hover:bg-white border-slate-200 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex h-3 w-5 overflow-hidden rounded-sm border border-slate-200">
        {language === "ru" ? (
          <>
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-blue-500" />
            <span className="flex-1 bg-red-500" />
          </>
        ) : (
          <>
            <span className="flex-1 bg-sky-500" />
            <span className="flex-1 bg-red-500" />
            <span className="flex-1 bg-green-500" />
          </>
        )}
      </div>
      <span className="hidden sm:inline text-xs font-semibold">
        {language === "ru" ? "AZ" : "RU"}
      </span>
    </Button>
  );
}
