import { useLanguage, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const languages: Array<{ code: Language; label: string; flag: string }> = [
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "az", label: "AZ", flag: "🇦🇿" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="triviz-pill p-1 flex items-center gap-1"
      role="group"
      aria-label="Language switcher"
    >
      {languages.map((item) => {
        const isActive = language === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            className={cn(
              "min-w-[62px] h-8 px-2.5 rounded-full border-2 text-xs sm:text-sm font-semibold transition-all",
              isActive
                ? "bg-[#609DED] text-white border-[#343434] shadow-[0_2px_0_#343434]"
                : "bg-white text-[#343434] border-transparent hover:border-[#343434]/40"
            )}
            aria-pressed={isActive}
          >
            <span className="mr-1" aria-hidden="true">
              {item.flag}
            </span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
