"use client";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
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
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto h-16 px-8 bg-white text-primary hover:bg-white/90 text-lg font-semibold shadow-xl rounded-full"
            >
              <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer">
                Talk to a Human
              </a>
            </Button>

            <p className="mt-4 text-white/80 text-sm font-medium">
              {t("text.callFree")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
