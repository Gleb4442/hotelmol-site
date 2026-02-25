"use client";
import React, { useEffect, useState } from 'react';
import { QrCode, Smartphone, Award, UtensilsCrossed, MousePointerClick, Wallet, Zap } from 'lucide-react';

const HotelQRBenefits = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // Обновленные данные: иконки и свечение теперь в синей гамме
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

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative min-h-[80vh] bg-slate-50 overflow-hidden flex items-center justify-center p-4 md:p-8 font-sans selection:bg-blue-200 selection:text-blue-900 border-y border-slate-200/50 -mb-6">
            {/* Пользовательские стили для анимации фоновых сфер */}
            <style dangerouslySetInnerHTML={{ __html: ` @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } } .animate-blob { animation: blob 7s infinite; } .animation-delay-2000 { animation-delay: 2s; } .animation-delay-4000 { animation-delay: 4s; } ` }} />

            {/* Анимированный фон (Светлые акварельные сферы) */}
            <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-cyan-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 md:w-96 h-72 md:h-96 bg-indigo-300/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 max-w-6xl w-full">
                {/* Заголовок */}
                <div className={`transition-all duration-1000 transform text-center mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight drop-shadow-sm">
                        Эффективность онлайн-меню
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-light">
                        Реальные показатели роста выручки и лояльности после внедрения цифровых решений.
                    </p>
                </div>

                {/* Сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tableData.map((row, index) => {
                        const isHovered = hoveredId === row.id;

                        return (
                            <div key={row.id} onMouseEnter={() => setHoveredId(row.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`
                                group relative rounded-3xl p-6 md:p-8 transition-all duration-500 ease-out
                                backdrop-blur-xl bg-white/70 border border-white
                                shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)]
                                hover:-translate-y-2
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                                ${hoveredId && !isHovered ? 'opacity-50 scale-[0.98] blur-[1px]' : 'opacity-100'}
                                `}
                                style={{ transitionDelay: isVisible ? '0ms' : `${index * 150}ms` }}
                            >
                                {/* Эффект общего свечения карточки при наведении */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${row.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                                <div className="relative z-10 flex flex-col h-full">

                                    {/* Шапка карточки */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            {row.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800 tracking-wide transition-colors duration-300 group-hover:text-blue-950">
                                                {row.caseName}
                                            </h3>
                                            <p className="text-slate-500 text-sm font-medium mt-1">{row.usage}</p>
                                        </div>
                                    </div>

                                    {/* Метрики (Заказы и Выручка) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 flex-grow">

                                        {/* Эффект 1: ЗАКАЗЫ (вспыхивает первым) */}
                                        <div className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-500 ease-out border backdrop-blur-sm ${isHovered ? 'bg-blue-50 border-blue-200 shadow-[0_8px_16px_rgba(59,130,246,0.1)] -translate-y-1' : 'bg-white/80 border-slate-100 translate-y-0 shadow-sm'} `} style={{ transitionDelay: isHovered ? '150ms' : '0ms' }}>
                                            {/* Световой блик */}
                                            <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] transition-transform duration-1000 ease-out pointer-events-none ${isHovered ? 'translate-x-[200%]' : '-translate-x-[150%]'} `} style={{ transitionDelay: isHovered ? '150ms' : '0ms' }} />
                                            <div className="relative z-10">
                                                <div className={`flex items-center gap-2 mb-2 transition-colors duration-500 ${isHovered ? 'text-blue-600' : 'text-slate-400'}`}>
                                                    <MousePointerClick className="w-4 h-4" />
                                                    <span className="text-xs uppercase tracking-widest font-bold">Заказы</span>
                                                </div>
                                                <div className={`text-2xl font-black mb-1 transition-all duration-500 ${isHovered ? 'text-blue-900 drop-shadow-[0_0_8px_rgba(255,255,255,1)]' : 'text-slate-800'}`}>
                                                    {row.orders}
                                                </div>
                                                <div className={`text-xs leading-snug transition-colors duration-500 ${isHovered ? 'text-blue-700' : 'text-slate-500'}`}>{row.ordersDesc}</div>
                                            </div>
                                        </div>

                                        {/* Эффект 2: ВЫРУЧКА (вспыхивает вторым) */}
                                        <div className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-500 ease-out border backdrop-blur-sm ${isHovered ? 'bg-cyan-50 border-cyan-200 shadow-[0_8px_16px_rgba(6,182,212,0.1)] -translate-y-1' : 'bg-white/80 border-slate-100 translate-y-0 shadow-sm'} `} style={{ transitionDelay: isHovered ? '300ms' : '0ms' }}>
                                            {/* Световой блик */}
                                            <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] transition-transform duration-1000 ease-out pointer-events-none ${isHovered ? 'translate-x-[200%]' : '-translate-x-[150%]'} `} style={{ transitionDelay: isHovered ? '300ms' : '0ms' }} />
                                            <div className="relative z-10">
                                                <div className={`flex items-center gap-2 mb-2 transition-colors duration-500 ${isHovered ? 'text-cyan-600' : 'text-slate-400'}`}>
                                                    <Wallet className="w-4 h-4" />
                                                    <span className="text-xs uppercase tracking-widest font-bold">Выручка</span>
                                                </div>
                                                <div className={`text-2xl font-black mb-1 transition-all duration-500 ${isHovered ? 'text-cyan-900 drop-shadow-[0_0_8px_rgba(255,255,255,1)]' : 'text-slate-800'}`}>
                                                    {row.revenue}
                                                </div>
                                                <div className={`text-xs leading-snug transition-colors duration-500 ${isHovered ? 'text-cyan-700' : 'text-slate-500'}`}>{row.revenueDesc}</div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Эффект 3: ДОП. ЭФФЕКТ (вспыхивает третьим) */}
                                    <div className={`relative overflow-hidden rounded-2xl p-4 mt-auto transition-all duration-500 ease-out border backdrop-blur-sm ${isHovered ? 'bg-indigo-50 border-indigo-200 shadow-[0_8px_16px_rgba(99,102,241,0.1)] -translate-y-1' : 'bg-white/80 border-slate-100 translate-y-0 shadow-sm'} `} style={{ transitionDelay: isHovered ? '450ms' : '0ms' }}>
                                        {/* Световой блик */}
                                        <div className={`absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] transition-transform duration-1000 ease-out pointer-events-none ${isHovered ? 'translate-x-[250%]' : '-translate-x-[150%]'} `} style={{ transitionDelay: isHovered ? '450ms' : '0ms' }} />
                                        <div className="relative z-10">
                                            <div className={`flex items-center gap-2 mb-2 transition-colors duration-500 ${isHovered ? 'text-indigo-600' : 'text-slate-400'}`}>
                                                <Zap className="w-4 h-4" />
                                                <span className="text-xs uppercase tracking-widest font-bold">Эффект</span>
                                            </div>
                                            <div className={`text-sm font-medium transition-all duration-500 ${isHovered ? 'text-indigo-900 drop-shadow-[0_0_2px_rgba(255,255,255,1)]' : 'text-slate-600'}`}>
                                                {row.effect}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HotelQRBenefits;
