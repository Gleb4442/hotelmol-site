"use client";
import { useState, useEffect } from "react";
import { Calculator, ArrowRight, TrendingUp, Utensils, BedDouble, ArrowLeft, Sun, Share2, Check } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function ROIEstimate() {
  const { t, language } = useTranslation();
  const txt = (ru: string, en: string) => language === 'ru' ? ru : en;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rooms, setRooms] = useState<number>(25);
  const [optimism, setOptimism] = useState<number>(65);

  const [customOta, setCustomOta] = useState<number>(0);
  const [customFnb, setCustomFnb] = useState<number>(0);
  const [customUpsell, setCustomUpsell] = useState<number>(0);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlRooms = params.get('rooms');
      const urlOta = params.get('ota');
      const urlFnb = params.get('fnb');
      const urlUpsell = params.get('upsell');
      const urlStep = params.get('step');

      if (urlRooms && !isNaN(parseInt(urlRooms))) {
        setRooms(parseInt(urlRooms));
      }

      if (urlStep === '3') {
        if (urlOta && !isNaN(parseInt(urlOta))) setCustomOta(parseInt(urlOta));
        if (urlFnb && !isNaN(parseInt(urlFnb))) setCustomFnb(parseInt(urlFnb));
        if (urlUpsell && !isNaN(parseInt(urlUpsell))) setCustomUpsell(parseInt(urlUpsell));
        setStep(3);

        // Ensure smooth scroll to calculator if hash is missing or page just loaded
        setTimeout(() => {
          const el = document.getElementById('roi-calculator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, []);

  const parsedRooms = isNaN(rooms) || rooms < 1 ? 0 : rooms;

  const otaPerRoom = 57;
  const fnbPerRoom = Math.round(125 + (optimism / 100) * (214 - 125));
  const upsellPerRoom = 50;

  const totalPerRoom = otaPerRoom + fnbPerRoom + upsellPerRoom;
  const monthlyIncome = parsedRooms * totalPerRoom;
  const annualIncome = monthlyIncome * 12;

  const formatCurrencyCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const goToStep3 = () => {
    setCustomOta(otaPerRoom);
    setCustomFnb(fnbPerRoom);
    setCustomUpsell(upsellPerRoom);
    setStep(3);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('rooms', parsedRooms.toString());
    url.searchParams.set('ota', customOta.toString());
    url.searchParams.set('fnb', customFnb.toString());
    url.searchParams.set('upsell', customUpsell.toString());
    url.searchParams.set('step', '3');
    url.hash = 'roi-calculator';

    const shareUrl = url.toString();

    if (navigator.share) {
      navigator.share({
        title: txt('Потенциал выручки отеля', 'Hotel Revenue Potential'),
        text: txt('Посмотри этот расчет дополнительных продаж!', 'Check out this revenue calculator!'),
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    }
  };

  const BASE_REV_PER_ROOM = 3360;
  const baseRevenue = parsedRooms * BASE_REV_PER_ROOM;
  const otaTotal = customOta * parsedRooms;
  const fnbTotal = customFnb * parsedRooms;
  const upsellTotal = customUpsell * parsedRooms;
  const totalCombined = baseRevenue + otaTotal + fnbTotal + upsellTotal;

  const extraTotal = otaTotal + fnbTotal + upsellTotal;
  const marginIncrease = baseRevenue > 0 ? ((extraTotal / baseRevenue) * 100).toFixed(1) : "0.0";

  return (
    <div className="relative min-h-[80vh] flex flex-col w-full overflow-hidden items-center justify-center pt-8 pb-20 px-4 sm:px-6 z-10" id="roi-calculator">
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            margin-top: -12px; 
            box-shadow: 0 4px 12px rgba(31, 128, 219, 0.25);
            transition: transform 0.2s ease;
        }
        .custom-range::-webkit-slider-thumb:hover { transform: scale(1.1); }
        .custom-range::-moz-range-thumb {
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(31, 128, 219, 0.25);
            transition: transform 0.2s ease;
            border: none;
        }
        .custom-range::-moz-range-thumb:hover { transform: scale(1.1); }
        .custom-range::-webkit-slider-runnable-track {
            width: 100%;
            height: 8px;
            cursor: pointer;
            background: transparent;
            border-radius: 9999px;
        }
        .custom-range::-moz-range-track {
            width: 100%;
            height: 8px;
            cursor: pointer;
            background: transparent;
            border-radius: 9999px;
        }
        .receipt-edge-light {
            background: linear-gradient(-45deg, transparent 16px, #ffffff 16px), linear-gradient(45deg, transparent 16px, #ffffff 16px);
            background-repeat: repeat-x;
            background-size: 32px 32px;
        }
        .receipt-edge-dark {
            background: linear-gradient(-45deg, transparent 16px, #1e293b 16px), linear-gradient(45deg, transparent 16px, #1e293b 16px);
            background-repeat: repeat-x;
            background-size: 32px 32px;
        }
      `}} />

      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#1f80db]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#88C0D0]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 transition-all duration-500">

        {step <= 2 && (
          <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500">
            {/* Top Block: Estimated Potential */}
            <section className="relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-white to-[#E1F0FF]/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm p-8 sm:p-12 lg:p-16 text-center group transition-all duration-300">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1f80db_1px,transparent_1px)] [background-size:24px_24px]"></div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <h2 className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-bold uppercase tracking-widest mb-2">
                  {txt("Потенциал выручки в месяц", "Estimated Monthly Potential")}
                </h2>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
                  <span className="text-[#1f80db]">{formatCurrencyCurrency(monthlyIncome)}</span>
                </h1>
                <div className="mt-4 px-6 py-2 bg-[#E1F0FF] dark:bg-[#1f80db]/20 rounded-full border border-[#E1F0FF] dark:border-[#1f80db]/30">
                  <p className="text-slate-900 dark:text-slate-100 text-lg font-semibold">
                    {txt("Потенциал выручки в год", "Estimated Annual Potential")}: <span className="text-[#1f80db] font-bold">{formatCurrencyCurrency(annualIncome)}</span>
                  </p>
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm mt-4 font-medium max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap">
                  {txt("Основано на", "Based on your")}
                  <div className="relative inline-flex items-center">
                    <input
                      type="number"
                      value={rooms || ""}
                      onChange={(e) => setRooms(parseInt(e.target.value) || 0)}
                      className="w-16 h-8 text-center font-bold text-[#1f80db] bg-[#1f80db]/10 border-none rounded-md focus:ring-2 focus:ring-[#1f80db]/50 text-base sm:text-sm p-0 m-0"
                    />
                  </div>
                  {txt("номерах и текущих трендах рынка.", "rooms and current market trends.")}
                </div>

                {step === 1 && (
                  <button
                    onClick={() => setStep(2)}
                    className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E1F0FF] text-[#1f80db] dark:bg-[#1f80db]/20 dark:hover:bg-[#1f80db] hover:bg-[#1f80db] hover:text-white text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    {txt("Детали", "Details")}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </section>

            {/* Middle Block: 3 Detail Cards (Step 2) */}
            {step === 2 && (
              <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
                <DetailCard
                  icon={<Calculator className="w-8 h-8" />}
                  bg="bg-[#E1F0FF] dark:bg-[#1f80db]/20"
                  iconColor="text-[#1f80db]"
                  title={t("roi.calculator.source1")}
                  value={otaPerRoom * parsedRooms}
                  perRoom={otaPerRoom}
                  txt={txt}
                  language={language}
                />
                <DetailCard
                  icon={<Utensils className="w-8 h-8" />}
                  bg="bg-purple-50 dark:bg-purple-900/30"
                  iconColor="text-purple-500"
                  title={t("roi.calculator.source2")}
                  value={fnbPerRoom * parsedRooms}
                  perRoom={fnbPerRoom}
                  txt={txt}
                  language={language}
                />
                <DetailCard
                  icon={<TrendingUp className="w-8 h-8" />}
                  bg="bg-emerald-50 dark:bg-emerald-900/30"
                  iconColor="text-emerald-500"
                  title={t("roi.calculator.source3")}
                  value={upsellPerRoom * parsedRooms}
                  perRoom={upsellPerRoom}
                  txt={txt}
                  language={language}
                />
              </section>
            )}

            {/* Bottom Block: Optimism Slider */}
            <section className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 dark:bg-orange-500/20 text-orange-400 rounded-full">
                    <Sun className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{txt("Уровень оптимизма", "Optimism Level")}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{txt("Настройте агрессивность прогноза", "Adjust how aggressive our forecast should be.")}</p>
                  </div>
                </div>
                <div className="px-5 py-2 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-600 min-w-[80px] text-center">
                  {optimism}%
                </div>
              </div>

              <div className="relative w-full h-12 flex items-center px-2">
                <input
                  className="w-full appearance-none bg-transparent z-20 focus:outline-none custom-range"
                  max="100"
                  min="0"
                  type="range"
                  value={optimism}
                  onChange={(e) => setOptimism(parseInt(e.target.value))}
                />
                <div className="absolute left-0 right-0 h-2 bg-slate-100 dark:bg-slate-700 rounded-full mx-2 -z-10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1f80db] to-[#88C0D0] rounded-full" style={{ width: `${optimism}%` }}></div>
                </div>
              </div>
              <div className="flex justify-between px-2 mt-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>{txt("Консервативно", "Conservative")}</span>
                <span>{txt("Оптимистично", "Hopeful")}</span>
              </div>

              {step === 2 && (
                <div className="mt-8 flex justify-center animate-in fade-in duration-300">
                  <button
                    onClick={goToStep3}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
                  >
                    {txt("Калькулятор точек роста", "Custom Revenue Calculator")}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* --- Step 3: Breakdown receipt --- */}
        {step === 3 && (
          <main className="flex flex-col lg:flex-row w-full gap-8 lg:gap-16 items-start relative animate-in slide-in-from-right-8 duration-500">
            {/* Left Panel: Controls */}
            <div className="flex flex-col flex-1 w-full gap-8">
              <div className="flex flex-col gap-2 relative">
                <button
                  onClick={() => setStep(2)}
                  className="absolute -top-10 left-0 flex items-center gap-1 text-sm font-bold text-[#1f80db] hover:text-[#1f80db]/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> {txt("Назад", "Back")}
                </button>
                <h1 className="text-slate-900 dark:text-white text-4xl font-bold tracking-tight">{txt("Точки роста", "Revenue Growth Sources")}</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-lg">
                  {txt("Настройте показатели дополнительных продаж и сэкономленных комиссий, чтобы увидеть ваш потенциал увеличения выручки.", "Adjust the additional sales and saved commissions to see your potential revenue growth.")}
                </p>
              </div>

              {/* Expense Inputs Group */}
              <div className="flex flex-col gap-6 mt-4">
                <CustomInputRow
                  icon={<Calculator className="w-5 h-5 leading-none" />}
                  title={t("roi.calculator.source1")}
                  desc={txt("Сумма, сэкономленная за счет прямых бронирований (минуя Booking.com и др.)", "Amount saved through direct bookings (bypassing OTAs)")}
                  value={customOta}
                  onChange={setCustomOta}
                  txt={txt}
                />
                <CustomInputRow
                  icon={<Utensils className="w-5 h-5 leading-none" />}
                  title={t("roi.calculator.source2")}
                  desc={txt("Доход от продажи еды и напитков через цифровое меню отеля", "Revenue from food and beverage via the digital hotel menu")}
                  value={customFnb}
                  onChange={setCustomFnb}
                  txt={txt}
                />
                <CustomInputRow
                  icon={<TrendingUp className="w-5 h-5 leading-none" />}
                  title={t("roi.calculator.source3")}
                  desc={txt("Повышение категории номера, парковка, ранний заезд и др.", "Room upgrades, parking, early check-in, etc.")}
                  value={customUpsell}
                  onChange={setCustomUpsell}
                  txt={txt}
                />
              </div>
            </div>

            {/* Right Panel: Live Receipt */}
            <div className="flex-1 w-full flex justify-center lg:justify-end lg:pt-12 relative z-10 sm:px-6 md:px-0">
              <div className="relative w-full max-w-md">
                {/* Receipt Paper */}
                <div className="bg-white dark:bg-slate-800 rounded-t-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 relative z-20 pb-8">
                  {/* Header */}
                  <div className="bg-[#fafbfc] dark:bg-slate-900 rounded-t-[2rem] p-8 border-b border-dashed border-gray-200 dark:border-slate-700 text-center">
                    <div className="mx-auto w-12 h-12 bg-[#1f80db]/10 rounded-full flex items-center justify-center mb-4 text-[#1f80db]">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{txt("Потенциал выручки", "Revenue Potential")}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{txt("С учетом внедрения доп. услуг", "Including new additional services")}</p>
                  </div>

                  {/* Body */}
                  <div className="p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-200">
                      <span className="text-slate-500 dark:text-slate-400">{txt("Базовая выручка", "Base Revenue")}</span>
                      <span className="font-bold font-mono tracking-tight text-lg">€{formatCurrency(baseRevenue)}</span>
                    </div>
                    <div className="h-px bg-gray-100 dark:bg-slate-700 my-2"></div>

                    <ReceiptRow dotColor="bg-emerald-400" title={txt("Экономия OTA", "OTA Savings")} value={otaTotal} formatCurrency={formatCurrency} />
                    <ReceiptRow dotColor="bg-teal-400" title={txt("F&B меню", "F&B Menu")} value={fnbTotal} formatCurrency={formatCurrency} />
                    <ReceiptRow dotColor="bg-cyan-400" title={txt("Upsell", "Upsell")} value={upsellTotal} formatCurrency={formatCurrency} />

                    <div className="border-b-2 border-dashed border-gray-200 dark:border-slate-700 my-4 relative">
                      <div className="absolute -left-[42px] -top-3 w-6 h-6 bg-slate-50 dark:bg-[#111921] rounded-full"></div>
                      <div className="absolute -right-[42px] -top-3 w-6 h-6 bg-slate-50 dark:bg-[#111921] rounded-full"></div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{txt("Итоговая сумма", "Total Revenue")}</span>
                        <span className="text-3xl font-bold text-[#1f80db] tracking-tight font-mono">€{formatCurrency(totalCombined)}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-right mt-1">
                        {txt("Рост выручки", "Revenue Growth")}: <span className="font-bold text-emerald-500">+{marginIncrease}%</span>
                      </p>
                    </div>
                  </div>

                  {/* Share Action */}
                  <div className="px-8 pb-4 pt-2">
                    <button
                      onClick={handleShare}
                      className="w-full py-4 bg-[#E1F0FF] hover:bg-[#1f80db]/20 dark:bg-[#1f80db]/20 dark:hover:bg-[#1f80db]/30 text-[#1f80db] font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                    >
                      {shareStatus === 'copied' ? (
                        <><Check className="w-5 h-5 text-emerald-500" /> {txt("Скопировано!", "Copied!")}</>
                      ) : (
                        <><Share2 className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" /> {txt("Поделиться", "Share Result")}</>
                      )}
                    </button>
                  </div>
                </div>
                {/* Zig Zag Bottom */}
                <div className="absolute bottom-[-32px] left-0 w-full h-[32px] receipt-edge-light dark:receipt-edge-dark"></div>
                {/* Receipt Shadow/Depth Element */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/5 dark:bg-black/20 blur-xl rounded-full -z-10"></div>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

// Subcomponents
function DetailCard({ icon, bg, iconColor, title, value, perRoom, txt, language }: any) {
  const formatExt = (v: number) => new Intl.NumberFormat(language === 'en' ? 'en-US' : 'ru-RU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col gap-6 cursor-default group">
      <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{title}</h3>
        <div className="mt-1 flex flex-col">
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            {formatExt(value)}
            <span className="text-base font-medium text-slate-500 dark:text-slate-400 ml-1">/ mo</span>
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {txt(`за номер/мес: €${perRoom}`, `per room/mo: €${perRoom}`)}
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomInputRow({ icon, title, desc, value, onChange, txt }: any) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="bg-[#E1F0FF] dark:bg-[#1f80db]/20 w-10 h-10 flex items-center justify-center rounded-full text-[#1f80db] shrink-0 mt-0.5">
            {icon}
          </div>
          <div>
            <label className="text-slate-900 dark:text-white font-bold text-lg cursor-pointer block">{title}</label>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 max-w-[220px] leading-tight">{desc}</p>
          </div>
        </div>
        <div className="flex items-center bg-slate-50 dark:bg-slate-900 rounded-full px-4 py-2 border border-transparent focus-within:border-[#1f80db]/30 focus-within:bg-white dark:focus-within:bg-slate-800 transition-colors">
          <span className="text-slate-500 font-medium mr-1">€</span>
          <input
            className="bg-transparent border-none p-0 w-16 text-right font-bold text-slate-900 dark:text-white focus:ring-0 text-lg placeholder:text-gray-300"
            type="number"
            value={value || ""}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          />
          <span className="text-slate-500 dark:text-slate-400 text-xs ml-2 font-medium whitespace-nowrap">
            {txt("/ номер", "/ room")}
          </span>
        </div>
      </div>
    </div>
  );
}

function ReceiptRow({ dotColor, title, value, formatCurrency }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
        {title}
      </span>
      <span className="font-medium text-emerald-600 dark:text-emerald-400 font-mono text-base">
        +€{formatCurrency(value)}
      </span>
    </div>
  );
}
