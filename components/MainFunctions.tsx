"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function MainFunctions() {
  const { t } = useTranslation();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const features = [
    {
      key: "personalConcierge",
      title: t("roomie.features.personalConcierge.title"),
      description: t("roomie.features.personalConcierge.description")
    },
    {
      key: "multilingual",
      title: t("roomie.features.multilingual.title"),
      description: t("roomie.features.multilingual.description")
    },
    {
      key: "security",
      title: t("roomie.features.security.title"),
      description: t("roomie.features.security.description")
    },
    {
      key: "upsell",
      title: t("roomie.features.upsell.title"),
      description: t("roomie.features.upsell.description")
    },
    {
      key: "conversations",
      title: t("roomie.features.conversations.title"),
      description: t("roomie.features.conversations.description")
    }
  ];

  const toggleFeature = (key: string) => {
    setExpandedKey(expandedKey === key ? null : key);
  };

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-bold mb-6 text-foreground"
          >
            {t("roomie.features.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("roomie.features.subtitle")}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {features.map((feature, index) => {
            const isExpanded = expandedKey === feature.key;
            return (
              <motion.div 
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-3xl border transition-all duration-300 ${
                  isExpanded 
                    ? "bg-white border-primary/20 shadow-[0_20px_50px_rgba(7,82,160,0.08)]" 
                    : "bg-slate-50/50 border-slate-200/60 hover:bg-white hover:border-primary/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
                }`}
              >
                <button
                  onClick={() => toggleFeature(feature.key)}
                  className="w-full px-8 py-8 flex items-center justify-between group outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-3xl"
                >
                  <span className={`text-xl md:text-2xl font-bold text-left transition-colors ${
                    isExpanded ? "text-primary" : "text-slate-900 group-hover:text-primary"
                  }`}>
                    {feature.title}
                  </span>
                  <div className={`flex-shrink-0 ml-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isExpanded 
                      ? "bg-primary border-primary text-white" 
                      : "bg-white border-slate-200 text-slate-400 group-hover:border-primary/30 group-hover:text-primary"
                  }`}>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
                        <div className="h-px w-12 bg-primary/20 mb-6" />
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
