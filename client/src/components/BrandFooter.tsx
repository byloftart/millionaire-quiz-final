interface BrandFooterProps {
  hint?: string;
  className?: string;
}

export function BrandFooter({ hint, className = "" }: BrandFooterProps) {
  return (
    <footer className={`relative z-10 text-center ${className}`}>
      {hint ? <p className="text-sm sm:text-base text-[#4A4A4A] mb-2">{hint}</p> : null}
      <div className="brand-sign-wrap">
        <span className="brand-sign">LOFT ART</span>
      </div>
    </footer>
  );
}
