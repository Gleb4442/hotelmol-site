"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Users, BarChart3, ShieldCheck, Zap, ChevronDown } from "lucide-react";
import { MdLightbulbOutline, MdRocketLaunch } from "react-icons/md";

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
        icon: <MdRocketLaunch className="w-5 h-5 text-red-400" />,
        logic: "Внедрение новых технологий обычно ассоциируется с долгими настройками, обучением персонала и сложной интеграцией.",
        implementation: "Запуск за 1 день без участия IT-специалистов. Простая интеграция с существующими системами. Интуитивно понятный интерфейс, не требующий долгого обучения."
    }
];

export default function ValueProposition() {
    const [activeTab, setActiveTab] = useState<string | null>(valueItems[0].id);

    return (
        <section className="py-24 relative overflow-hidden bg-[#F7F6F2] dark:bg-zinc-950/50">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                        Какую ценность мы даем
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Технологии, которые превращают расходы в инвестиции
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800">
                    {valueItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <div key={item.id} className="group relative">
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 dark:bg-blue-500 z-10" />
                                )}
                                <button
                                    onClick={() => setActiveTab(isActive ? null : item.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-6 text-left transition-colors duration-200 focus:outline-none",
                                        isActive
                                            ? "bg-white dark:bg-zinc-900"
                                            : "bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                    )}
                                >
                                    <span className={cn(
                                        "text-lg transition-colors",
                                        isActive
                                            ? "font-bold text-zinc-900 dark:text-zinc-100"
                                            : "font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
                                    )}>
                                        {item.title}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "w-6 h-6 transition-transform duration-300",
                                            isActive
                                                ? "text-blue-600 dark:text-blue-500 rotate-180"
                                                : "text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                                        )}
                                    />
                                </button>

                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-zinc-50 dark:bg-zinc-950/30 p-6 md:p-8 border-t border-zinc-100 dark:border-zinc-800">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Logic Card */}
                                                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                                                <MdLightbulbOutline className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Логика</h3>
                                                                <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                                                    {item.logic}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Implementation Card */}
                                                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                                                <MdRocketLaunch className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">Реализация</h3>
                                                                <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                                                    {item.implementation}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}
