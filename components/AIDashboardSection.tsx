"use client";
import { useTranslation } from "@/lib/TranslationContext";

import PremiumBackground from "./PremiumBackground";

export default function AIDashboardSection() {
  const { t } = useTranslation();

  return (
    <PremiumBackground
      className="py-12 md:py-16 lg:py-20"
      data-testid="section-ai-dashboard"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl lg:text-[45px] font-bold text-foreground mb-4">
            {t("home.aiDashboard.title")}
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            {t("home.aiDashboard.description")}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-border max-w-5xl mx-auto">
          <img
            src="/hotel-dashboard.png"
            alt="Hotel Dashboard — централізована AI-панель"
            loading="lazy"
            decoding="async"
            className="w-full h-auto block"
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          {t("home.aiDashboard.subtitle")}
        </p>
      </div>
    </PremiumBackground>
  );
}
