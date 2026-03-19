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
               <div className="relative flex flex-row items-center justify-between gap-4 px-6 py-5 rounded-3xl border border-white/50 bg-white/5 backdrop-blur-xl shadow-sm overflow-hidden">
                  
                  <div className="flex flex-col items-center md:items-start relative z-10">
                    <h2 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-foreground whitespace-nowrap">
                      {t(titleKey)}
                    </h2>
                  </div>

                  <a
                    href={downloadUrl}
                    download={downloadName}
                    className="flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-primary/20 w-10 h-10 text-primary transition-colors hover:bg-primary/10 flex-shrink-0"
                    aria-label={t("presentation.download")}
                  >
                    <Download className="w-5 h-5" />
                  </a>
               </div>
            </div>
        </div>
      </div>
    </PremiumBackground>
  );
}
