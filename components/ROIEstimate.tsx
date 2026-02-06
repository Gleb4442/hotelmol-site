"use client";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function ROIEstimate() {
  const { t } = useTranslation();

  return (
    <section className="py-11 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md mb-6">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              {t("roi.title")}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t("roi.subtitle")}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center relative">
            {/* Arrow pointing to button - hidden on mobile, visible on lg screens */}
            <div className="hidden lg:block absolute left-[calc(50%+180px)] top-1/2 -translate-y-1/2">
              <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white fill-current opacity-80 rotate-12">
                <path d="M10 20 Q 50 5, 90 20" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M85 15 L90 20 L85 25" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>

            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto h-16 px-8 bg-white text-primary hover:bg-white/90 text-lg font-semibold shadow-xl rounded-full"
            >
              <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer">
                {t("button.bookWebCall")} {t("button.talkToHuman")}
                <ArrowRight className="ml-2 h-6 w-6" />
              </a>
            </Button>

            <p className="mt-4 text-white/80 text-sm font-medium">
              {t("text.callFree")}
              <span className="hidden lg:inline-block ml-2 absolute left-[calc(50%+140px)] top-[-20px] -rotate-12 text-xs opacity-70">
                ←
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
