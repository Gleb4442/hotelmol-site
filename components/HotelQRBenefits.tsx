import React, { useState, useEffect } from 'react';
import { QrCode, Smartphone, Award, UtensilsCrossed, MousePointerClick, Wallet, Zap, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HotelQRBenefits = () => {
    const tableData = [
        {
            id: 1,
            caseName: "Mandarin Oriental",
            usage: "20 отелей глобально",
            orders: "+39%",
            ordersDesc: "к объёму мобильных заказов",
            revenueLabel: "Выручка",
            revenueIcon: <Wallet className="w-4 h-4" />,
            revenue: "+54%",
            revenueDesc: "к выручке F&B room service",
            effect: "Значительный рост доходности сервиса в номерах",
            icon: <img src="/assets/mandarin-oriental-logo.png" alt="Mandarin Oriental logo" className="w-auto h-14 max-h-[56px] object-contain filter grayscale opacity-70" />,
            glowColor: "from-orange-50 to-amber-50"
        },
        {
            id: 2,
            caseName: "Radisson Dubai",
            usage: "Интеграция заказа и оплаты в номерах",
            orders: "+20%",
            ordersDesc: "рост продаж после внедрения",
            revenueLabel: "Персонал",
            revenueIcon: <Users className="w-4 h-4" />,
            revenue: "Снижение",
            revenueDesc: "ошибок в заказах и ускорение обработки",
            effect: "Больше времени на персонализированный сервис",
            icon: <img src="/assets/radisson-blu-logo.svg" alt="Radisson Blu logo" className="w-auto h-14 max-h-[56px] object-contain filter grayscale opacity-70" />,
            glowColor: "from-cyan-50 to-blue-50"
        },
        {
            id: 3,
            caseName: "Fairmont Doha",
            usage: "5* отель, in-room dining",
            orders: "+78.6%",
            ordersDesc: "к объёму заказов",
            revenueLabel: "Выручка",
            revenueIcon: <Wallet className="w-4 h-4" />,
            revenue: "+72.5%",
            revenueDesc: "к выручке in-room",
            effect: "23–32% заказов через цифру",
            icon: <img src="/assets/fairmont-logo.svg" alt="Fairmont logo" className="w-auto h-14 max-h-[56px] object-contain filter grayscale opacity-70" />,
            glowColor: "from-sky-50 to-blue-50"
        },
        {
            id: 4,
            caseName: "Ritz-Carlton Dubai",
            usage: "Роскошный сервис",
            orders: "+106%",
            ordersDesc: "к объёму мобильных заказов YoY",
            revenueLabel: "Выручка",
            revenueIcon: <Wallet className="w-4 h-4" />,
            revenue: "+128%",
            revenueDesc: "к F&B-выручке YoY",
            effect: "Экспоненциальный рост мобильных заказов",
            icon: <img src="/assets/ritz-carlton-logo.png" alt="Ritz-Carlton logo" className="w-auto h-14 max-h-[56px] object-contain filter grayscale opacity-70" />,
            glowColor: "from-slate-50 to-blue-50"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % tableData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [tableData.length]);

    const activeCase = tableData[activeIndex];

    return (
        <div className="relative min-h-[70vh] bg-[#F7F6F2] overflow-hidden flex items-center justify-center p-4 md:p-8 font-sans selection:bg-blue-200 selection:text-blue-900 border-y border-slate-200/50 -mb-6">
            {/* Анимированный фон */}
            <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70"></div>
            <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70"></div>

            <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
                {/* Заголовок */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl lg:text-[45px] font-extrabold text-slate-800 mb-4 tracking-tight">
                        Эффективность онлайн-меню
                    </h2>
                    <p className="text-slate-600 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
                        Реальные показатели роста выручки и лояльности после внедрения цифровых решений.
                    </p>
                </div>

                {/* Основной контейнер карусели */}
                <div className="relative w-full min-h-[380px] md:min-h-[320px] flex items-center justify-center mb-12">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeCase.id}
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                opacity: { duration: 0.3 }
                            }}
                            className="w-full relative rounded-[32px] p-8 md:p-10 bg-white shadow-[0_20px_60px_-15px_rgba(7,82,160,0.08)] border border-slate-200/60 overflow-hidden"
                        >
                            {/* Градиентный фон внутри карточки */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${activeCase.glowColor} opacity-40`} />

                            <div className="relative z-10">
                                {/* Шапка карточки */}
                                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                                    <div className="p-2 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center w-20 h-20 shrink-0">
                                        {activeCase.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                                            {activeCase.caseName}
                                        </h3>
                                        <p className="text-[#0752A0] font-semibold text-sm uppercase tracking-wide opacity-80">{activeCase.usage}</p>
                                    </div>
                                </div>

                                {/* Метрики (Заказы и Выручка) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                    {/* Метрика 1 */}
                                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 shadow-sm">
                                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                                            <MousePointerClick className="w-4 h-4" />
                                            <span className="text-[10px] uppercase tracking-widest font-bold">Удовлетворенность</span>
                                        </div>
                                        <div className="text-3xl font-black text-slate-900 mb-1">
                                            {activeCase.orders}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium">{activeCase.ordersDesc}</div>
                                    </div>

                                    {/* Метрика 2 */}
                                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 shadow-sm">
                                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                                            {activeCase.revenueIcon}
                                            <span className="text-[10px] uppercase tracking-widest font-bold">{activeCase.revenueLabel}</span>
                                        </div>
                                        <div className="text-3xl font-black text-[#0752A0] mb-1">
                                            {activeCase.revenue}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium">{activeCase.revenueDesc}</div>
                                    </div>

                                    {/* Эффект */}
                                    <div className="sm:col-span-2 lg:col-span-1 bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 shadow-sm flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-3 text-slate-400">
                                            <Zap className="w-4 h-4" />
                                            <span className="text-[10px] uppercase tracking-widest font-bold">Эффект</span>
                                        </div>
                                        <div className="text-sm font-bold text-slate-700 leading-tight">
                                            {activeCase.effect}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Ряд бейджей снизу */}
                <div className="flex flex-wrap justify-center gap-4 px-4">
                    {tableData.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveIndex(index)}
                            className={`group relative flex items-center justify-center p-1 rounded-2xl transition-all duration-300 border-2
                                ${activeIndex === index
                                    ? 'bg-white border-[#0752A0] shadow-md scale-110'
                                    : 'bg-white/50 border-transparent hover:border-slate-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105'
                                }
                            `}
                        >
                            <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                                {React.cloneElement(item.icon as React.ReactElement, {
                                    className: `w-full h-full object-contain transition-all duration-300 ${activeIndex === index ? 'filter-none opacity-100' : ''}`
                                })}
                            </div>

                            {/* Индикатор прогресса для активного бейджа */}
                            {activeIndex === index && (
                                <motion.div
                                    layoutId="badge-indicator"
                                    className="absolute -bottom-1 left-2 right-2 h-1 bg-[#0752A0] rounded-full"
                                    initial={false}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelQRBenefits;
