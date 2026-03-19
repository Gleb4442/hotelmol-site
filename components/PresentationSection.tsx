"use client";
import { useTranslation } from "@/lib/TranslationContext";
import { Download } from "lucide-react";

import { TranslationKey } from "@/lib/translations";
import PremiumBackground from "./PremiumBackground";

interface PresentationSectionProps {
  titleKey?: TranslationKey;
  downloadUrl?: string;
  downloadName?: string;
}

export default function PresentationSection({ 
  titleKey = "presentation.title",
  downloadUrl = "/assets/presentation.pdf",
  downloadName = "Hotelmol_Presentation.pdf"
}: PresentationSectionProps) {
  const { t } = useTranslation();

  return (
    <PremiumBackground className="py-12 md:py-16 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
            <div className="relative group max-w-xl w-full">
               <div className="relative flex flex-row items-center justify-between gap-4 px-6 py-5 rounded-3xl border border-white/40 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden transition-all duration-300">
                  
                  {/* Glass highlight texture */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  
                  <div className="flex flex-col items-center md:items-start relative z-10">
                    <h2 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-foreground whitespace-nowrap">
                      {t(titleKey)}
                    </h2>
                  </div>

                  <a
                    href={downloadUrl}
                    download={downloadName}
                    className="relative flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-primary/20 w-11 h-11 text-primary transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0 overflow-hidden group/btn"
                    aria-label={t("presentation.download")}
                  >
                    {/* Periodic glare effect */}
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[25deg] -translate-x-full animate-[shimmer-sweep_6s_ease-in-out_infinite] pointer-events-none" />
                    
                    <Download className="w-5 h-5 relative z-10" />
                  </a>
               </div>
            </div>
        </div>
      </div>
    </PremiumBackground>
  );
}
