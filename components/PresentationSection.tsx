"use client";
import { useTranslation } from "@/lib/TranslationContext";

export default function PresentationSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="px-8 py-4 rounded-2xl blue-shimmer-block mb-8">
            <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              {t("presentation.title")}
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("presentation.description")}
          </p>

          <a
            href="/assets/presentation.pdf"
            download="Hotelmol_Presentation.pdf"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {t("presentation.download")}
          </a>

        </div>
      </div>
    </section>
  );
}
