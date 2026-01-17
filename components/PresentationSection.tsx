"use client";
import { useTranslation } from "@/lib/TranslationContext";
import { Download } from "lucide-react";

export default function PresentationSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-stretch justify-center gap-4">
            <div className="px-8 py-4 rounded-2xl blue-shimmer-block flex items-center">
              <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                {t("presentation.title")}
              </h2>
            </div>

            <a
              href="/assets/presentation.pdf"
              download="Hotelmol_Presentation.pdf"
              className="inline-flex items-center justify-center rounded-2xl blue-shimmer-block aspect-square px-4"
              aria-label={t("presentation.download")}
            >
              <Download className="w-8 h-8 text-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
