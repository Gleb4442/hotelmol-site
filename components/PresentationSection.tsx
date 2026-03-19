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
    <PremiumBackground className="py-20 md:py-28 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
            <div className="relative group max-w-2xl w-full">
               {/* Enhanced liquid glass background glow with drift animation */}
               <div className="absolute -inset-10 bg-gradient-to-r from-[#38bdf8]/40 via-[#818cf8]/20 to-[#38bdf8]/40 blur-[100px] opacity-40 group-hover:opacity-70 transition-opacity duration-700 animate-[liquid-drift_15s_ease-in-out_infinite]" />
               
               <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-10 py-10 rounded-[3rem] border border-white/50 bg-white/5 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.06),inset_0_0_0_1px_rgba(255,255,255,0.5)] overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_rgba(56,189,248,0.15)] hover:-translate-y-2">
                  
                  {/* Subtle glass texture / shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
                  <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none animate-[shimmer_15s_infinite_linear]" />

                  <div className="flex flex-col items-center md:items-start gap-2 relative z-10">
                    <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground transition-all duration-300 group-hover:text-primary/90">
                      {t(titleKey)}
                    </h2>
                    <p className="text-muted-foreground font-medium text-sm md:text-base opacity-80">
                      {t("presentation.download")}
                    </p>
                  </div>

                  <a
                    href={downloadUrl}
                    download={downloadName}
                    className="relative inline-flex items-center justify-center p-[2px] rounded-2xl group/btn overflow-hidden transition-all duration-300 active:scale-95"
                    aria-label={t("presentation.download")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] animate-[spin_3s_linear_infinite] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center justify-center bg-white dark:bg-slate-950 rounded-[calc(1rem-2px)] px-8 py-4 text-primary font-bold transition-all duration-300 group-hover/btn:bg-transparent group-hover/btn:text-white">
                      <Download className="w-6 h-6 mr-3" />
                      <span>{t("presentation.download")}</span>
                    </div>
                  </a>
               </div>
            </div>
        </div>
      </div>
    </PremiumBackground>
  );
}
