"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Lightbulb, Rocket, Users, BarChart3, ShieldCheck, Zap } from "lucide-react";

interface ValueItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    logic: string;
    implementation: string;
}

const valueItems: ValueItem[] = [
    {
        id: "retention",
        title: "Постоянные гости и случайные бронирования",
        icon: <Users className="w-5 h-5 text-blue-400" />,
        logic: "Экономика простая: стоимость удержания существующего гостя в 5–7 раз ниже стоимости привлечения нового через OTA. К тому же постоянный гость в среднем тратит на 36% больше во время пребывания. Это создает устойчивость для бизнеса и дает уверенность для вас в завтрашнем дне.",
        implementation: "Мы выстраиваем долгосрочные отношения между вами и гостем. Захватываем контакт во время первого бронирования, монетизируем собранные данные во время пребывания и создаем персонализированный опыт, чтобы гость вернулся снова."
    },
    {
        id: "efficiency",
        title: "Комиссии OTA",
        icon: <Zap className="w-5 h-5 text-yellow-400" />,
        logic: "Рутинные запросы отнимают до 40% времени персонала, снижая качество обслуживания важных гостей. Человеческий фактор приводит к ошибкам и потере информации.",
        implementation: "Автоматизация обработки 80% типовых запросов через AI. Мгновенные ответы 24/7 без перерывов и выходных. Персонал фокусируется на живом общении и решении нестандартных задач."
    },
    {
        id: "revenue",
        title: "Рост выручки (Upsell)",
        icon: <BarChart3 className="w-5 h-5 text-green-400" />,
        logic: "Гости часто не знают о дополнительных услугах отеля или стесняются спросить. Традиционные методы продаж (буклеты, стойка) имеют низкую конверсию.",
        implementation: "Ненавязчивое предложение услуг в нужный момент через чат. Персонализированные рекомендации спа, ресторана или трансфера, увеличивающие средний чек."
    },
    {
        id: "loyalty",
        title: "Лояльность и отзывы",
        icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
        logic: "Негативный опыт часто остается невысказанным до момента публикации отзыва. Упущенная возможность исправить ситуацию здесь и сейчас стоит репутации.",
        implementation: "Проактивный сбор обратной связи во время проживания. Мгновенное уведомление менеджера о проблемах для их решения до выезда гостя."
    },
    {
        id: "implementation",
        title: "Перевод на direct bookings",
        icon: <Rocket className="w-5 h-5 text-red-400" />,
        logic: "Внедрение новых технологий обычно ассоциируется с долгими настройками, обучением персонала и сложной интеграцией.",
        implementation: "Запуск за 1 день без участия IT-специалистов. Простая интеграция с существующими системами. Интуитивно понятный интерфейс, не требующий долгого обучения."
    }
];

export default function ValueProposition() {
    const [activeTab, setActiveTab] = useState(valueItems[0].id);

    const activeItem = valueItems.find(item => item.id === activeTab) || valueItems[0];

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                        Какую ценность мы даем
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Технологии, которые превращают расходы в инвестиции
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Navigation (Switchers) */}
                    <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x">
                        {valueItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "relative group min-w-[280px] lg:min-w-0 flex-shrink-0 text-center p-4 rounded-xl transition-all duration-300 border snap-center hover:scale-[1.02]",
                                    activeTab === item.id
                                        ? "bg-white dark:bg-zinc-900 border-blue-500/30 shadow-sm"
                                        : "bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                                )}
                            >
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="active-glow"
                                        className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10"
                                        initial={false}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                <div className="relative flex items-center justify-center gap-4">
                                    <span className={cn(
                                        "font-bold text-lg transition-colors duration-300 whitespace-nowrap lg:whitespace-normal",
                                        activeTab === item.id ? "text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-300"
                                    )}>
                                        {item.title}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Content Area */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 gap-6 h-full"
                            >
                                {/* Logic Card */}
                                <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                                        <Lightbulb className="w-24 h-24 text-blue-600 dark:text-blue-400" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Логика</h3>
                                        </div>
                                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {activeItem.logic}
                                        </p>
                                    </div>
                                </div>

                                {/* Implementation Card */}
                                <div className="group relative bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-2xl p-6 md:p-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                                        <Rocket className="w-24 h-24 text-blue-600 dark:text-blue-400" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-400/10 rounded-lg">
                                                <Rocket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Реализация</h3>
                                        </div>
                                        <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                            {activeItem.implementation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
