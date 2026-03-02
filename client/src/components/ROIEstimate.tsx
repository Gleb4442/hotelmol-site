"use client";
import { useState, useMemo } from "react";
import { Calculator, ArrowRight, TrendingUp, Utensils, BedDouble } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ROIEstimate() {
  const { t, language } = useTranslation();
  const [rooms, setRooms] = useState<number>(50);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  // Parse rooms from input
  const parsedRooms = isNaN(rooms) || rooms < 1 ? 0 : rooms;

  // Base values from CSV
  const OTA_SAVINGS_PER_ROOM = 53;
  const FB_ONLINE_PER_ROOM = 80;
  const UPSELL_PER_ROOM = 50;
  const TOTAL_PER_ROOM = OTA_SAVINGS_PER_ROOM + FB_ONLINE_PER_ROOM + UPSELL_PER_ROOM;

  const monthlyIncome = parsedRooms * TOTAL_PER_ROOM;
  const annualIncome = monthlyIncome * 12;

  // Formatter for currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-16 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md mb-6 shadow-xl">
            <Calculator className="h-10 w-10 text-white" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
            {t("roi.title")}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t("roi.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-12 bg-white/5 p-6 lg:p-10 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
          {/* Input Section */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center h-full space-y-6">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
              <label htmlFor="roomsInput" className="block text-xl font-medium text-white mb-4">
                {t("roi.calculator.roomsLabel")}
              </label>
              <div className="relative">
                <Input
                  id="roomsInput"
                  type="number"
                  min="1"
                  value={rooms || ""}
                  onChange={(e) => setRooms(parseInt(e.target.value) || 0)}
                  className="w-full text-3xl font-bold h-16 bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:ring-white rounded-xl ps-6"
                  placeholder="50"
                  style={{ fontSize: '1.5rem' }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl border border-white/10 flex flex-col space-y-2">
              <span className="text-white/80 text-lg uppercase tracking-wider font-semibold text-center mt-2">{t("roi.calculator.monthlyIncome")}</span>
              <span className="text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-md py-4">
                {formatCurrency(monthlyIncome)}
              </span>
              <span className="text-white text-center font-medium bg-white/20 py-2 rounded-lg mx-4">
                {t("roi.calculator.annualIncome")}: {formatCurrency(annualIncome)}
              </span>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="mt-4 w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              {showBreakdown ? "Скрыть детали" : "Показать детали"}
            </Button>
          </div>

          {/* Breakdown Section */}
          {showBreakdown && (
            <div className="col-span-1 lg:col-span-7 flex flex-col space-y-4">
              <h3 className="text-2xl text-white font-serif font-bold mb-2 ml-2">Breakdown</h3>

              {/* Source 1 */}
              <div className="bg-white/10 hover:bg-white/15 transition-colors p-5 rounded-2xl border border-white/10 flex items-center shadow-lg">
                <div className="bg-white/20 p-4 rounded-xl mr-5">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-white font-semibold">{t("roi.calculator.source1")}</h4>
                  <p className="text-white/70">{t("roi.calculator.perRoom")}: €{OTA_SAVINGS_PER_ROOM}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl text-white font-bold block">{formatCurrency(OTA_SAVINGS_PER_ROOM * parsedRooms)}</span>
                  <span className="text-white/60 text-sm">/ mo</span>
                </div>
              </div>

              {/* Source 2 */}
              <div className="bg-white/10 hover:bg-white/15 transition-colors p-5 rounded-2xl border border-white/10 flex items-center shadow-lg">
                <div className="bg-white/20 p-4 rounded-xl mr-5">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-white font-semibold">{t("roi.calculator.source2")}</h4>
                  <p className="text-white/70">{t("roi.calculator.perRoom")}: €{FB_ONLINE_PER_ROOM}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl text-white font-bold block">{formatCurrency(FB_ONLINE_PER_ROOM * parsedRooms)}</span>
                  <span className="text-white/60 text-sm">/ mo</span>
                </div>
              </div>

              {/* Source 3 */}
              <div className="bg-white/10 hover:bg-white/15 transition-colors p-5 rounded-2xl border border-white/10 flex items-center shadow-lg">
                <div className="bg-white/20 p-4 rounded-xl mr-5">
                  <BedDouble className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-white font-semibold">{t("roi.calculator.source3")}</h4>
                  <p className="text-white/70">{t("roi.calculator.perRoom")}: €{UPSELL_PER_ROOM}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl text-white font-bold block">{formatCurrency(UPSELL_PER_ROOM * parsedRooms)}</span>
                  <span className="text-white/60 text-sm">/ mo</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center relative mt-16 pt-8 border-t border-white/10">
        <p className="text-white/90 text-xl font-medium mb-6 mt-4">Ready to unlock your potential revenue?</p>
        <Button
          size="lg"
          asChild
          className="w-full sm:w-auto h-16 px-10 bg-white text-primary hover:bg-white/90 text-xl font-bold shadow-2xl rounded-full transform hover:scale-105 transition-all duration-300"
        >
          <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer" className="flex items-center">
            Talk to a Human <ArrowRight className="ml-3 w-6 h-6" />
          </a>
        </Button>
        <p className="mt-4 text-white/70 text-sm font-medium">
          {t("text.callFree")}
        </p>
      </div>
    </section>
  );
}
