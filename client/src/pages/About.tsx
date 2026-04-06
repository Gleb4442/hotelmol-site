import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import SEO, { organizationSchema } from "@/components/SEO";
import { useTranslation } from "@/lib/TranslationContext";
import IntegrationRequestModal from "@/components/IntegrationRequestModal";

export default function About() {
  const { t } = useTranslation();
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        structuredData={organizationSchema}
      />
      <Header />

      {/* HERO SECTION */}
      <section className="relative bg-primary py-40 md:py-48 overflow-hidden text-white">
        {/* Subtle premium background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        
        {/* Top shimmer gradient */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-sm">
              {t("about.hero.title")}{" "}
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {t("about.hero.titleAccent")}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              {t("about.hero.subtitle")}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-9 justify-center items-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-8 text-lg shadow-xl"
                  data-testid="button-discuss-integration"
                >
                  {t("about.hero.button.integration")}
                </Button>
              </Link>
              <Link href="/roomie">
                <button className="text-white/80 hover:text-white transition-colors text-lg font-medium" data-testid="button-meet-roomie">
                  {t("about.hero.button.meetRoomie")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DNA & METRICS SECTION */}
      <section className="py-24 md:pb-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <span className="text-lg font-semibold uppercase tracking-widest mb-4 block" style={{ color: "#0752A0" }}>
              {t("about.dna.label")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {t("about.dna.title")}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {t("about.dna.description1")}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t("about.dna.description2")}
            </p>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-24" style={{ backgroundColor: "#20629B" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center px-2">
              <h3 className="text-3xl font-bold text-white mb-6">{t("about.mascot.title")}</h3>
              <blockquote className="text-base md:text-lg lg:text-[21.6px] text-slate-300 leading-relaxed italic break-words">
                "{t("about.mascot.quote")}"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <IntegrationRequestModal open={integrationModalOpen} onOpenChange={setIntegrationModalOpen} />
    </div>
  );
}
