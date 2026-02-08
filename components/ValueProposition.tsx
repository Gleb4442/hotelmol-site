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
        title: "Операционная эффективность",
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
        title: "Быстрый запуск",
        icon: <Rocket className="w-5 h-5 text-red-400" />,
        logic: "Внедрение новых технологий обычно ассоциируется с долгими настройками, обучением персонала и сложной интеграцией.",
        implementation: "Запуск за 1 день без участия IT-специалистов. Простая интеграция с существующими системами. Интуитивно понятный интерфейс, не требующий долгого обучения."
    }
];

export default function ValueProposition() {
    const [activeTab, setActiveTab] = useState(valueItems[0].id);

    const activeItem = valueItems.find(item => item.id === activeTab) || valueItems[0];

    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-zinc-950">
            {/* Background gradients/blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-white/60 mb-6">
                        Какую ценность мы даем
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-white/60 max-w-2xl mx-auto">
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
                                    "relative group min-w-[280px] lg:min-w-0 flex-shrink-0 text-center p-4 rounded-xl transition-all duration-300 border backdrop-blur-md overflow-hidden snap-center",
                                    activeTab === item.id
                                        ? "bg-white dark:bg-white/10 border-blue-500/20 shadow-lg dark:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
                                        : "bg-white/50 dark:bg-white/5 border-zinc-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-zinc-300 dark:hover:border-white/10"
                                )}
                            >
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="active-glow"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"
                                        initial={false}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                <div className="relative flex items-center justify-center gap-4">
                                    <span className={cn(
                                        "font-bold text-lg transition-colors duration-300 whitespace-nowrap lg:whitespace-normal",
                                        activeTab === item.id ? "text-blue-600 dark:text-white" : "text-zinc-600 dark:text-white/60 group-hover:text-zinc-900 dark:group-hover:text-white/80"
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
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 gap-6 h-full"
                            >
                                {/* Logic Card */}
                                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Lightbulb className="w-24 h-24 text-white" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                                <Lightbulb className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white/90">Логика</h3>
                                        </div>
                                        <p className="text-lg text-white/70 leading-relaxed">
                                            {activeItem.logic}
                                        </p>
                                    </div>
                                </div>

                                {/* Implementation Card */}
                                <div className="group relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Rocket className="w-24 h-24 text-white" />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                                <Rocket className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white/90">Реализация</h3>
                                        </div>
                                        <p className="text-lg text-white/80 leading-relaxed">
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
