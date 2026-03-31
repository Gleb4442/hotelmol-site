"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";
import { Plus, Minus } from "lucide-react";

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

        <div className="max-w-3xl mx-auto border-t border-slate-200">
          {features.map((feature, index) => {
            const isExpanded = expandedKey === feature.key;
            return (
              <div 
                key={feature.key}
                className="border-b border-slate-200"
              >
                <button
                  onClick={() => toggleFeature(feature.key)}
                  className="w-full py-8 flex items-center justify-between group transition-colors hover:text-primary outline-none focus-visible:text-primary"
                >
                  <span className="text-xl md:text-2xl font-medium text-left transition-colors">
                    {feature.title}
                  </span>
                  <div className="flex-shrink-0 ml-4">
                    {isExpanded ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-12">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
