"use client";
import { useState, useMemo, useEffect } from "react";
import { Calculator, ArrowRight, TrendingUp, Utensils, Hotel, Share, Check, Loader2, Sun, Sparkles, Receipt, PiggyBank } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ROIEstimate() {
  const { t, language } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rooms, setRooms] = useState<number>(25);
  const [optimism, setOptimism] = useState<number>(65);
  const [isCalculating, setIsCalculating] = useState(false);

  // Manual overrides for Step 3
  const [otaOverride, setOtaOverride] = useState<number>(140);
  const [fnbOverride, setFnbOverride] = useState<number>(208);
  const [upsellOverride, setUpsellOverride] = useState<number>(84);

  // Constants & Math from CSV/Templates
  const ADR = 150;
  const OCCUPANCY = 0.75;
  const DAYS_IN_MONTH = 30;
  const BASE_REVENUE_PER_ROOM = ADR * OCCUPANCY * DAYS_IN_MONTH;

  // Formula values from CSV
  const OTA_FIXED = 57;
  const FB_CONS = 125;
  const FB_MOD = 169;
  const FB_OPT = 214;
  const UPSELL_BASELINE = 50;

  // Interpolate F&B based on optimism (0-100)
  const interpolatedFB = useMemo(() => {
    if (optimism <= 50) {
      return FB_CONS + (FB_MOD - FB_CONS) * (optimism / 50);
    } else {
      return FB_MOD + (FB_OPT - FB_MOD) * ((optimism - 50) / 50);
    }
  }, [optimism]);

  const monthlyPotentialPerRoom = OTA_FIXED + interpolatedFB + UPSELL_BASELINE;
  const totalMonthlyPotential = rooms * monthlyPotentialPerRoom;
  const totalAnnualPotential = totalMonthlyPotential * 12;

  // Step 3 Calculations
  const baseMonthlyTotal = rooms * BASE_REVENUE_PER_ROOM;
  const extraOta = otaOverride * rooms;
  const extraFnb = fnbOverride * rooms;
  const extraUpsell = upsellOverride * rooms;
  const finalTotal = baseMonthlyTotal + extraOta + extraFnb + extraUpsell;
  const growthMargin = (((extraOta + extraFnb + extraUpsell) / baseMonthlyTotal) * 100).toFixed(1);

  // Non-linear Slider Math for Step 1
  const valToPercent = (v: number) => {
    if (v <= 100) return ((v - 5) / 95) * 50;
    if (v <= 200) return 50 + ((v - 100) / 100) * (50 / 3);
    return (50 + 50 / 3) + ((v - 200) / 300) * (100 / 3);
  };

  const percentToVal = (p: number) => {
    if (p <= 50) return 5 + (p / 50) * 95;
    if (p <= 50 + (50 / 3)) return 100 + ((p - 50) / (50 / 3)) * 100;
    return 200 + ((p - (50 + 50 / 3)) / (100 / 3)) * 300;
  };

  const currentPercent = valToPercent(rooms);

  // Formatters
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleNextStep = () => {
    if (step === 1) {
      setIsCalculating(true);
      setTimeout(() => {
        setStep(2);
        setIsCalculating(false);
      }, 1500);
    } else if (step === 2) {
      setStep(3);
    }
  };

  return (
    <section className="py-16 lg:py-28 relative overflow-hidden bg-background-light dark:bg-background-dark font-display">
      {/* Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
        {step === 1 && (
          <div className="w-full max-w-2xl mx-auto">
            <section className="relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-white to-primary-soft/50 shadow-soft p-8 sm:p-14 lg:p-16 text-center border border-white/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1f80db_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>

              <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                  {language === 'ru' ? 'Сколько номеров в вашем отеле?' : 'How many rooms in your hotel?'}
                </h1>

                <div className="flex items-center justify-center min-h-[140px] mb-12">
                  <input
                    type="number"
                    value={rooms}
                    min="5"
                    max="500"
                    onChange={(e) => setRooms(Math.max(0, parseInt(e.target.value) || 0))}
                    onBlur={() => setRooms(Math.max(5, Math.min(500, rooms)))}
                    className="w-full max-w-[350px] text-center bg-transparent border-none outline-none text-8xl sm:text-[10rem] text-slate-900 dark:text-white tracking-tighter tabular-nums transition-all duration-300 focus:ring-0 p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  />
                </div>

                <div className="w-full max-w-md mx-auto mb-14">
                  <div className="relative w-full h-12 flex items-center px-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.1"
                      value={currentPercent}
                      onChange={(e) => setRooms(Math.round(percentToVal(parseFloat(e.target.value))))}
                      className="w-full appearance-none bg-transparent z-20 focus:outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-10 [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-lg"
                    />
                    <div className="absolute left-0 right-0 h-3 bg-slate-100 dark:bg-slate-700 rounded-full mx-2 -z-10 overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-75"
                        style={{ width: `${currentPercent}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between px-3 mt-4 text-sm font-bold text-text-soft/60 uppercase tracking-wider">
                    <span>5</span>
                    <span>500+</span>
                  </div>
                </div>

                <Button
                  onClick={handleNextStep}
                  disabled={isCalculating}
                  className="w-full sm:w-auto h-auto flex items-center justify-center gap-3 px-10 py-4 sm:px-12 sm:py-5 rounded-full bg-primary text-white hover:bg-[#1a73c7] hover:shadow-glow hover:-translate-y-1 text-lg sm:text-xl font-bold transition-all duration-300 active:scale-95"
                >
                  {isCalculating ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    <>
                      {language === 'ru' ? 'Рассчитать' : 'Calculate'}
                      <ArrowRight className="h-6 w-6" />
                    </>
                  )}
                </Button>
              </div>
            </section>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-white to-primary-soft/50 shadow-soft p-8 sm:p-12 lg:p-16 text-center group border border-white/50">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1f80db_1px,transparent_1px)] [background-size:24px_24px]"></div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <h2 className="text-text-soft text-sm sm:text-base font-bold uppercase tracking-widest mb-2">
                  {language === 'ru' ? 'Общий годовой потенциал' : 'Estimated Annual Potential'}
                </h2>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
                  <span className="text-primary">{formatCurrency(totalAnnualPotential)}</span>
                </h1>
                <div className="mt-4 px-6 py-2 bg-primary-soft/50 rounded-full border border-primary-soft">
                  <p className="text-text-main text-lg font-semibold">
                    {language === 'ru' ? 'Ежемесячно:' : 'Monthly:'} <span className="text-primary font-bold">{formatCurrency(totalMonthlyPotential)}</span>
                  </p>
                </div>
                <p className="text-text-soft text-sm mt-4 font-medium max-w-2xl mx-auto">
                  {language === 'ru'
                    ? `На базе ваших ${rooms} номеров и текущих рыночных трендов.`
                    : `Based on your ${rooms} rooms and current market trends.`}
                </p>
                <Button
                  variant="ghost"
                  onClick={handleNextStep}
                  className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-soft text-primary hover:bg-primary hover:text-white text-sm font-bold transition-all duration-300 active:scale-95"
                >
                  {language === 'ru' ? 'Детали' : 'Details'}
                  <ArrowRight className="h-[18px] w-[18px]" />
                </Button>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 sm:p-8 shadow-soft border border-slate-100 dark:border-slate-700 mt-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 text-orange-400 rounded-full">
                    <Sun className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {language === 'ru' ? 'Уровень оптимизма' : 'Optimism Level'}
                    </h3>
                    <p className="text-text-soft text-sm mt-0.5">
                      {language === 'ru' ? 'Настройте агрессивность прогноза' : 'Adjust how aggressive our forecast should be.'}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-primary-soft text-primary font-bold border border-primary/20 min-w-[70px] text-center">
                  {optimism}%
                </div>
              </div>
              <div className="relative w-full h-12 flex items-center px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={optimism}
                  onChange={(e) => setOptimism(parseInt(e.target.value))}
                  className="w-full appearance-none bg-transparent z-20 focus:outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary"
                />
                <div className="absolute left-0 right-0 h-2 bg-slate-100 dark:bg-slate-700 rounded-full mx-2 -z-10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${optimism}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between px-2 mt-2 text-xs font-bold text-text-soft uppercase tracking-wider">
                <span>{language === 'ru' ? 'Консервативно' : 'Conservative'}</span>
                <span>{language === 'ru' ? 'Оптимистично' : 'Hopeful'}</span>
              </div>
            </section>
          </div>
        )}

        {step === 3 && (
          <main className="flex-grow flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto gap-8 lg:gap-16 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Left Panel: Controls */}
            <div className="flex flex-col flex-1 w-full gap-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 dark:text-white text-4xl font-bold tracking-tight">
                  {language === 'ru' ? 'Точки роста' : 'Growth Points'}
                </h1>
                <p className="text-text-soft text-lg font-normal leading-relaxed max-w-lg">
                  {language === 'ru'
                    ? 'Настройте показатели дополнительных продаж и сэкономленных комиссий, чтобы увидеть ваш потенциал увеличения выручки.'
                    : 'Adjust upsell and commission saving metrics to see your revenue potential.'}
                </p>
              </div>

              <div className="flex flex-col gap-6 mt-4">
                {/* OTA Savings */}
                <div className="group bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-light w-10 h-10 flex items-center justify-center rounded-full text-primary shrink-0 mt-0.5">
                        <PiggyBank className="h-5 w-5" />
                      </div>
                      <div>
                        <label className="text-slate-900 dark:text-white font-bold text-lg cursor-pointer" htmlFor="ota-savings">
                          {language === 'ru' ? 'Экономия OTA-комиссий' : 'OTA Commission Savings'}
                        </label>
                        <p className="text-text-soft text-xs mt-1 max-w-[220px] leading-tight">
                          {language === 'ru' ? 'Сумма, сэкономленная за счет прямых бронирований' : 'Amount saved through direct bookings'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center bg-background-light dark:bg-slate-700 rounded-full px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-colors">
                      <span className="text-text-soft font-medium mr-1">€</span>
                      <input
                        id="ota-savings"
                        type="number"
                        value={otaOverride}
                        onChange={(e) => setOtaOverride(parseInt(e.target.value) || 0)}
                        className="bg-transparent border-none p-0 w-16 text-right font-bold text-slate-900 dark:text-white focus:ring-0 text-lg"
                      />
                      <span className="text-text-soft text-xs ml-2 font-medium whitespace-nowrap">/ {language === 'ru' ? 'номер' : 'room'}</span>
                    </div>
                  </div>
                </div>

                {/* F&B */}
                <div className="group bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-light w-10 h-10 flex items-center justify-center rounded-full text-primary shrink-0 mt-0.5">
                        <Utensils className="h-5 w-5" />
                      </div>
                      <div>
                        <label className="text-slate-900 dark:text-white font-bold text-lg cursor-pointer" htmlFor="fnb-revenue">
                          {language === 'ru' ? 'F&B через онлайн-меню' : 'F&B via Online Menu'}
                        </label>
                        <p className="text-text-soft text-xs mt-1 max-w-[220px] leading-tight">
                          {language === 'ru' ? 'Доход от продажи еды и напитков через цифровое меню' : 'Revenue from F&B sales via digital menu'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center bg-background-light dark:bg-slate-700 rounded-full px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-colors">
                      <span className="text-text-soft font-medium mr-1">€</span>
                      <input
                        id="fnb-revenue"
                        type="number"
                        value={fnbOverride}
                        onChange={(e) => setFnbOverride(parseInt(e.target.value) || 0)}
                        className="bg-transparent border-none p-0 w-16 text-right font-bold text-slate-900 dark:text-white focus:ring-0 text-lg"
                      />
                      <span className="text-text-soft text-xs ml-2 font-medium whitespace-nowrap">/ {language === 'ru' ? 'номер' : 'room'}</span>
                    </div>
                  </div>
                </div>

                {/* Upsell */}
                <div className="group bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-light w-10 h-10 flex items-center justify-center rounded-full text-primary shrink-0 mt-0.5">
                        <Hotel className="h-5 w-5" />
                      </div>
                      <div>
                        <label className="text-slate-900 dark:text-white font-bold text-lg cursor-pointer" htmlFor="upsell-revenue">
                          {language === 'ru' ? 'Upsell услуги' : 'Upsell Services'}
                        </label>
                        <p className="text-text-soft text-xs mt-1 max-w-[220px] leading-tight">
                          {language === 'ru' ? 'Повышение категории номера, парковка, ранний заезд' : 'Upgrades, parking, early check-in etc.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center bg-background-light dark:bg-slate-700 rounded-full px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-colors">
                      <span className="text-text-soft font-medium mr-1">€</span>
                      <input
                        id="upsell-revenue"
                        type="number"
                        value={upsellOverride}
                        onChange={(e) => setUpsellOverride(parseInt(e.target.value) || 0)}
                        className="bg-transparent border-none p-0 w-16 text-right font-bold text-slate-900 dark:text-white focus:ring-0 text-lg"
                      />
                      <span className="text-text-soft text-xs ml-2 font-medium whitespace-nowrap">/ {language === 'ru' ? 'номер' : 'room'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="mt-4 self-start rounded-full px-8"
              >
                {language === 'ru' ? 'Назад' : 'Back'}
              </Button>
            </div>

            {/* Right Panel: Live Receipt */}
            <div className="flex-1 w-full flex justify-center lg:justify-end lg:pt-12 relative z-10">
              <div className="relative w-full max-w-md">
                <div className="bg-white dark:bg-slate-900 rounded-t-[2rem] shadow-soft relative z-20 pb-8 overflow-hidden">
                  <div className="bg-[#fafbfc] dark:bg-slate-800/50 rounded-t-[2rem] p-8 border-b border-dashed border-gray-200 dark:border-slate-700 text-center">
                    <div className="mx-auto size-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {language === 'ru' ? 'Потенциал выручки' : 'Revenue Potential'}
                    </h3>
                    <p className="text-sm text-text-soft mt-1">
                      {language === 'ru' ? 'С учетом внедрения доп. услуг' : 'Including additional services'}
                    </p>
                  </div>

                  <div className="p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-slate-900 dark:text-white">
                      <span className="text-text-soft">{language === 'ru' ? 'Базовая выручка' : 'Base Revenue'}</span>
                      <span className="font-bold font-mono tracking-tight">{formatCurrency(baseMonthlyTotal)}</span>
                    </div>
                    <div className="h-px bg-gray-100 dark:bg-slate-800 my-2"></div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-soft flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-emerald-400"></span>
                        {language === 'ru' ? 'Экономия OTA' : 'OTA Savings'}
                      </span>
                      <span className="font-medium text-emerald-600 font-mono">+{formatCurrency(extraOta)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-soft flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-teal-400"></span>
                        {language === 'ru' ? 'F&B меню' : 'F&B Menu'}
                      </span>
                      <span className="font-medium text-emerald-600 font-mono">+{formatCurrency(extraFnb)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-text-soft flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-cyan-400"></span>
                        {language === 'ru' ? 'Upsell' : 'Upsell'}
                      </span>
                      <span className="font-medium text-emerald-600 font-mono">+{formatCurrency(extraUpsell)}</span>
                    </div>

                    <div className="border-b-2 border-dashed border-gray-200 dark:border-slate-700 my-4 relative">
                      <div className="absolute -left-[42px] -top-3 size-6 bg-background-light dark:bg-background-dark rounded-full"></div>
                      <div className="absolute -right-[42px] -top-3 size-6 bg-background-light dark:bg-background-dark rounded-full"></div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold uppercase tracking-widest text-text-soft">
                          {language === 'ru' ? 'Итоговая сумма' : 'Total Amount'}
                        </span>
                        <span className="text-3xl font-bold text-primary tracking-tight font-mono whitespace-nowrap">
                          {formatCurrency(finalTotal)}
                        </span>
                      </div>
                      <p className="text-xs text-text-soft text-right mt-1">
                        {language === 'ru' ? 'Рост выручки:' : 'Revenue Growth:'} <span className="font-bold text-emerald-500">+{growthMargin}%</span>
                      </p>
                    </div>
                  </div>

                  <div className="px-8 pb-4 pt-2">
                    <Button
                      onClick={() => {
                        const url = window.location.href;
                        navigator.clipboard.writeText(url);
                        alert(language === 'ru' ? 'Ссылка скопирована!' : 'Link copied!');
                      }}
                      className="w-full py-6 bg-primary-light dark:bg-primary-soft/10 hover:bg-primary/20 text-primary font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Share className="h-5 w-5" />
                      {language === 'ru' ? 'Поделиться' : 'Share'}
                    </Button>
                  </div>
                </div>
                {/* Zig Zag Bottom Implementation with CSS pseudo-element or SVG */}
                <div className="absolute bottom-[-20px] left-0 w-full h-8 overflow-hidden z-20 pointer-events-none">
                  <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 0 L5 10 L10 0 L15 10 L20 0 L25 10 L30 0 L35 10 L40 0 L45 10 L50 0 L55 10 L60 0 L65 10 L70 0 L75 10 L80 0 L85 10 L90 0 L95 10 L100 0 V20 H0 Z" fill="white" className="dark:fill-slate-900" />
                  </svg>
                </div>
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/5 blur-xl rounded-full -z-10"></div>
              </div>
            </div>
          </main>
        )}
      </div>

      {step < 3 && (
        <div className="flex flex-col items-center justify-center relative mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-400 text-xl font-medium mb-6 mt-4 text-center">
            {language === 'ru' ? 'Готовы раскрыть свой потенциал выручки?' : 'Ready to unlock your potential revenue?'}
          </p>
          <Button
            size="lg"
            asChild
            className="w-full sm:w-auto h-16 px-10 bg-primary text-white hover:bg-primary/90 text-xl font-bold shadow-soft rounded-full transform hover:scale-105 transition-all duration-300"
          >
            <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer" className="flex items-center">
              {language === 'ru' ? 'Поговорить с экспертом' : 'Talk to a Human'} <ArrowRight className="ml-3 w-6 h-6" />
            </a>
          </Button>
          <p className="mt-4 text-slate-500 dark:text-slate-500 text-sm font-medium">
            {t("text.callFree")}
          </p>
        </div>
      )}
    </section>
  );
}
