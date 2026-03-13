"use client";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/TranslationContext";

export default function AIDashboardSection() {
  const { t } = useTranslation();

  return (
    <section
      className="py-12 md:py-16 lg:py-20 bg-background"
      data-testid="section-ai-dashboard"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("home.aiDashboard.title")}
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            {t("home.aiDashboard.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-border max-w-5xl mx-auto"
        >
          <img
            src="/hotel-dashboard.png"
            alt="Hotel Dashboard — централізована AI-панель"
            className="w-full h-auto block"
          />
        </motion.div>

        <motion.p
          className="text-center text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t("home.aiDashboard.subtitle")}
        </motion.p>
      </div>
    </section>
  );
}
