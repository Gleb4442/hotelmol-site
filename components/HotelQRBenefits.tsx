"use client";
import React from 'react';
import { QrCode, Smartphone, Award, UtensilsCrossed, MousePointerClick, Wallet, Zap } from 'lucide-react';

const HotelQRBenefits = () => {
    const tableData = [
        {
            id: 1,
            caseName: "Hilton Fugu (Китай)",
            usage: "Развернуто в 160+ отелях",
            orders: "4.8/5.0",
            ordersDesc: "рейтинг удовлетворенности",
            revenue: "+30%",
            revenueDesc: "y/o/y рост выручки In-Room",
            effect: "Рост чека визуальным апселлом",
            icon: <QrCode className="w-6 h-6 text-blue-600" />,
            glowColor: "from-blue-200/60 to-indigo-100/60"
        },
        {
            id: 2,
            caseName: "Radisson Dubai",
            usage: "Интеграция заказа и оплаты в номерах",
            orders: "+20%",
            ordersDesc: "рост продаж после внедрения",
            revenue: "Снижение",
            revenueDesc: "ошибок и ускорение обработки",
            effect: "Больше времени на персонализированный сервис",
            icon: <Smartphone className="w-6 h-6 text-cyan-600" />,
            glowColor: "from-cyan-200/60 to-blue-100/60"
        },
        {
            id: 3,
            caseName: "Fairmont Doha",
            usage: "5* отель, in-room dining",
            orders: "+78.6%",
            ordersDesc: "к объёму заказов",
            revenue: "+72.5%",
            revenueDesc: "к выручке in-room",
            effect: "23–32% заказов через цифру",
            icon: <Award className="w-6 h-6 text-sky-500" />,
            glowColor: "from-sky-200/60 to-blue-100/60"
        },
        {
            id: 4,
            caseName: "Общий тренд F&B",
            usage: "Рестораны и F&B-зоны",
            orders: "До 30%",
            ordersDesc: "рост выручки",
            revenue: "Upsell",
            revenueDesc: "рост среднего чека",
            effect: "Повышение оборачиваемости, нет очередей",
            icon: <UtensilsCrossed className="w-6 h-6 text-indigo-600" />,
            glowColor: "from-indigo-200/60 to-purple-100/60"
        }
    ];

    return (
        <div className="relative min-h-[80vh] bg-slate-50 overflow-hidden flex items-center justify-center p-4 md:p-8 font-sans selection:bg-blue-200 selection:text-blue-900 border-y border-slate-200/50 -mb-6">
            {/* Анимированный фон (Светлые акварельные сферы) */}
            <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70"></div>
            <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-cyan-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 md:w-96 h-72 md:h-96 bg-indigo-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70"></div>

            <div className="relative z-10 max-w-6xl w-full">
                {/* Заголовок */}
                <div className="text-center mb-12 opacity-100">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight drop-shadow-sm">
                        Эффективность онлайн-меню
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-light">
                        Реальные показатели роста выручки и лояльности после внедрения цифровых решений.
                    </p>
                </div>

                {/* Сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tableData.map((row) => (
                        <div key={row.id}
                            className={`relative rounded-3xl p-6 md:p-8 backdrop-blur-xl bg-white/70 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] opacity-100`}
                        >
                            {/* Эффект общего свечения карточки при наведении */}
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${row.glowColor} opacity-0 pointer-events-none`}></div>

                            <div className="relative z-10 flex flex-col h-full">

                                {/* Шапка карточки */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                                        {row.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 tracking-wide">
                                            {row.caseName}
                                        </h3>
                                        <p className="text-slate-500 text-sm font-medium mt-1">{row.usage}</p>
                                    </div>
                                </div>

                                {/* Метрики (Заказы и Выручка) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 flex-grow">

                                    {/* Эффект 1: ЗАКАЗЫ (вспыхивает первым) */}
                                    <div className={`relative overflow-hidden rounded-2xl p-4 ease-out border backdrop-blur-sm bg-white/80 border-slate-100 translate-y-0 shadow-sm`}>
                                        {/* Световой блик */}
                                        <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] pointer-events-none -translate-x-[150%]`}></div>
                                        <div className="relative z-10">
                                            <div className={`flex items-center gap-2 mb-2 text-slate-400`}>
                                                <MousePointerClick className="w-4 h-4" />
                                                <span className="text-xs uppercase tracking-widest font-bold">Заказы</span>
                                            </div>
                                            <div className={`text-2xl font-black mb-1 text-slate-800`}>
                                                {row.orders}
                                            </div>
                                            <div className={`text-xs leading-snug text-slate-500`}>{row.ordersDesc}</div>
                                        </div>
                                    </div>

                                    {/* Эффект 2: ВЫРУЧКА (вспыхивает вторым) */}
                                    <div className={`relative overflow-hidden rounded-2xl p-4 ease-out border backdrop-blur-sm bg-white/80 border-slate-100 translate-y-0 shadow-sm`}>
                                        {/* Световой блик */}
                                        <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] pointer-events-none -translate-x-[150%]`}></div>
                                        <div className="relative z-10">
                                            <div className={`flex items-center gap-2 mb-2 text-slate-400`}>
                                                <Wallet className="w-4 h-4" />
                                                <span className="text-xs uppercase tracking-widest font-bold">Выручка</span>
                                            </div>
                                            <div className={`text-2xl font-black mb-1 text-slate-800`}>
                                                {row.revenue}
                                            </div>
                                            <div className={`text-xs leading-snug text-slate-500`}>{row.revenueDesc}</div>
                                        </div>
                                    </div>

                                </div>

                                {/* Эффект 3: ДОП. ЭФФЕКТ (вспыхивает третьим) */}
                                <div className={`relative overflow-hidden rounded-2xl p-4 mt-auto ease-out border backdrop-blur-sm bg-white/80 border-slate-100 translate-y-0 shadow-sm`}>
                                    {/* Световой блик */}
                                    <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] pointer-events-none -translate-x-[150%]`}></div>
                                    <div className="relative z-10">
                                        <div className={`flex items-center gap-2 mb-2 text-slate-400`}>
                                            <Zap className="w-4 h-4" />
                                            <span className="text-xs uppercase tracking-widest font-bold">Эффект</span>
                                        </div>
                                        <div className={`text-sm font-medium text-slate-600`}>
                                            {row.effect}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HotelQRBenefits;
