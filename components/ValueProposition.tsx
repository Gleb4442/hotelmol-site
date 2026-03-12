"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Users, BarChart3, ShieldCheck, Zap, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import { MdLightbulbOutline } from "react-icons/md";

interface ValueItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    logic: string;
    implementation: string;
    accent: string;
}

const valueItems: ValueItem[] = [
    {
        id: "retention",
        title: "Постоянные гости vs Случайные бронирования",
        icon: <Users className="w-6 h-6" />,
        logic: "Экономика простая: стоимость удержания существующего гостя в 5–7 раз ниже стоимости привлечения нового через OTA. К тому же постоянный гость в среднем тратит на 36% больше.",
        implementation: "Мы выстраиваем долгосрочные отношения: захватываем контакт при бронировании, монетизируем данные во время пребывания и создаем персонализированный опыт.",
        accent: "from-blue-500 to-indigo-600"
    },
    {
        id: "revenue",
        title: "Upsell и cross-sell без нагрузки на персонал",
        icon: <BarChart3 className="w-6 h-6" />,
        logic: "Гости часто не знают о дополнительных услугах отеля или стесняются спросить. Традиционные методы (буклеты) имеют крайне низкую конверсию.",
        implementation: "Ненавязчивое предложение услуг в нужный момент через чат. Персонализированные рекомендации спа или ресторана, увеличивающие средний чек.",
        accent: "from-emerald-500 to-teal-600"
    },
    {
        id: "loyalty",
        title: "Репутация и лояльность в режиме реального времени",
        icon: <ShieldCheck className="w-6 h-6" />,
        logic: "Негативный опыт часто остается невысказанным до публикации отзыва. Упущенная возможность исправить ситуацию стоит вам репутации.",
        implementation: "Проактивный сбор обратной связи во время проживания. Мгновенное уведомление менеджера о проблемах для их решения до выезда гостя.",
        accent: "from-purple-500 to-pink-600"
    },
    {
        id: "efficiency",
        title: "Комиссии OTA vs Прямые бронирования",
        icon: <Zap className="w-6 h-6" />,
        logic: "Рутинные запросы отнимают до 40% времени персонала, снижая качество сервиса. Человеческий фактор приводит к потере важных бронирований.",
        implementation: "Автоматизация 80% типовых запросов через AI. Мгновенные ответы 24/7. Персонал фокусируется на живом общении и премиальном сервисе.",
        accent: "from-amber-500 to-orange-600"
    },
    {
        id: "implementation",
        title: "Умные AI-кампании вместо массовых рассылок",
        icon: <MdLightbulbOutline className="w-6 h-6" />,
        logic: "Внедрение новых технологий обычно ассоциируется с долгими настройками и сложной интеграцией, пугающей персонал.",
        implementation: "Запуск за 1 день без IT-специалистов. Простая интеграция с существующими PMS/CRM. Интуитивный интерфейс, понятный с первой минуты.",
        accent: "from-rose-500 to-red-600"
    }
];

export default function ValueProposition() {
    const [activeTab, setActiveTab] = useState<string | null>(valueItems[0].id);

    return (
        <section className="py-24 relative overflow-hidden bg-[#0a0a0b]">
            {/* Animated Mesh Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        x: [0, -50, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full" 
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            Какую ценность мы даем
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto">
                            Технологии, которые превращают расходы на персонал в инвестицию в лояльность гостей
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto space-y-4">
                    {valueItems.map((item, index) => {
                        const isActive = activeTab === item.id;
                        return (
                            <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "relative rounded-[2rem] transition-all duration-500 overflow-hidden",
                                    isActive 
                                        ? "bg-white/10 backdrop-blur-3xl shadow-2xl border border-white/20" 
                                        : "bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:bg-white/[0.06] hover:border-white/10"
                                )}
                            >
                                <button
                                    onClick={() => setActiveTab(isActive ? null : item.id)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                            isActive 
                                                ? `bg-gradient-to-br ${item.accent} shadow-lg shadow-blue-500/20 scale-110` 
                                                : "bg-white/5 text-zinc-400"
                                        )}>
                                            <div className={cn(isActive ? "text-white" : "text-zinc-400")}>
                                                {item.icon}
                                            </div>
                                        </div>
                                        <span className={cn(
                                            "text-lg md:text-xl transition-all duration-500",
                                            isActive
                                                ? "font-bold text-white"
                                                : "font-medium text-zinc-400 group-hover:text-zinc-200"
                                        )}>
                                            {item.title}
                                        </span>
                                    </div>
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                                        isActive ? "bg-white/10 rotate-180" : "bg-white/5"
                                    )}>
                                        <ChevronDown className={cn(
                                            "w-6 h-6 transition-colors duration-500",
                                            isActive ? "text-white" : "text-zinc-500"
                                        )} />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 md:p-10 pt-0 md:pt-0 border-t border-white/10 mt-2">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                                    {/* Logic Column */}
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="space-y-4"
                                                    >
                                                        <div className="flex items-center gap-3 text-rose-400">
                                                            <AlertCircle className="w-5 h-5" />
                                                            <span className="text-xs uppercase font-bold tracking-[0.2em]">Проблема</span>
                                                        </div>
                                                        <p className="text-lg text-zinc-300 leading-relaxed font-light">
                                                            {item.logic}
                                                        </p>
                                                    </motion.div>

                                                    {/* Implementation Column */}
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="space-y-4"
                                                    >
                                                        <div className="flex items-center gap-3 text-emerald-400">
                                                            <CheckCircle2 className="w-5 h-5" />
                                                            <span className="text-xs uppercase font-bold tracking-[0.2em]">Решение</span>
                                                        </div>
                                                        <p className="text-lg text-zinc-300 leading-relaxed font-light">
                                                            {item.implementation}
                                                        </p>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}
