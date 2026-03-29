"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/TranslationContext";
import { CheckCircle2, Clock, AlertCircle, Sun, ArrowRight } from "lucide-react";

export default function TaskManagementShowcase() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-background"
      data-testid="section-task-management"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("roomie.taskManagement.title" as any)}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("roomie.taskManagement.description" as any)}
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative mx-auto max-w-md">
            {/* Device frame */}
            <div className="relative rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-900 shadow-2xl shadow-primary/10 overflow-hidden">
              {/* Status bar */}
              <div className="h-6 bg-slate-900 flex items-center justify-center">
                <div className="w-20 h-4 rounded-full bg-slate-800" />
              </div>

              {/* Screen content */}
              <div className="bg-[#F7F5F1] p-4 space-y-4">
                {/* Dashboard header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {t("roomie.taskManagement.dashboardTitle" as any)}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {t("roomie.taskManagement.dashboardSubtitle" as any)}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center shadow-md">
                    <Sun className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  <Card className="p-2.5 bg-white border-0 shadow-sm rounded-xl text-center">
                    <p className="text-lg font-bold text-primary">12</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {t("roomie.taskManagement.statActive" as any)}
                    </p>
                  </Card>
                  <Card className="p-2.5 bg-white border-0 shadow-sm rounded-xl text-center">
                    <p className="text-lg font-bold text-emerald-500">28</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {t("roomie.taskManagement.statDone" as any)}
                    </p>
                  </Card>
                  <Card className="p-2.5 bg-white border-0 shadow-sm rounded-xl text-center">
                    <p className="text-lg font-bold text-amber-500">3</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {t("roomie.taskManagement.statUrgent" as any)}
                    </p>
                  </Card>
                </div>

                {/* Task items */}
                <div className="space-y-2">
                  <Card className="p-3 bg-white border-0 shadow-sm rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="h-2.5 w-3/4 bg-slate-200 rounded" />
                        <div className="h-2 w-1/2 bg-slate-100 rounded mt-1.5" />
                      </div>
                      <span className="text-[10px] font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Done</span>
                    </div>
                  </Card>
                  <Card className="p-3 bg-white border-0 shadow-sm rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="h-2.5 w-2/3 bg-slate-200 rounded" />
                        <div className="h-2 w-2/5 bg-slate-100 rounded mt-1.5" />
                      </div>
                      <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                  </Card>
                  <Card className="p-3 bg-white border-0 shadow-sm rounded-xl border-l-2 !border-l-amber-400">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="h-2.5 w-4/5 bg-slate-200 rounded" />
                        <div className="h-2 w-1/3 bg-slate-100 rounded mt-1.5" />
                      </div>
                      <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Urgent</span>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Home indicator */}
              <div className="h-5 bg-[#F7F5F1] flex items-center justify-center">
                <div className="w-28 h-1 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              size="lg"
              asChild
              className="!rounded-full bg-[#0752A0] hover:bg-[#0752A0]/90 text-white shadow-lg"
            >
              <a href="https://tour.hotelmol.com" target="_blank" rel="noopener noreferrer">
                {t("roomie.taskManagement.cta" as any)} <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
