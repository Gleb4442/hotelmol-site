"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/lib/TranslationContext";
import { Calendar, Star, Bed, ArrowRight } from "lucide-react";

export default function BookingShowcase() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gradient-to-b from-background via-primary/[0.03] to-background"
      data-testid="section-booking-showcase"
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
            {t("roomie.booking.title" as any)}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("roomie.booking.description" as any)}
          </p>
        </motion.div>

        {/* Mockup */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Phone / Screen Mockup */}
          <div className="relative mx-auto max-w-md">
            {/* Device frame */}
            <div className="relative rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-900 shadow-2xl shadow-primary/10 overflow-hidden">
              {/* Status bar */}
              <div className="h-6 bg-slate-900 flex items-center justify-center">
                <div className="w-20 h-4 rounded-full bg-slate-800" />
              </div>

              {/* Screen content */}
              <div className="bg-[#F7F5F1] p-4 space-y-4">
                {/* Screen header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800">
                    {t("roomie.booking.screenTitle" as any)}
                  </h3>
                  <Calendar className="w-5 h-5 text-primary" />
                </div>

                {/* Room cards */}
                {[1, 2, 3].map((room) => (
                  <Card
                    key={room}
                    className="p-3 bg-white border border-slate-200/80 rounded-2xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-3">
                      {/* Room image placeholder */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                        <Bed className="w-8 h-8 text-primary/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs text-slate-500">4.{room + 5}</span>
                        </div>
                        <div className="h-3 w-3/4 bg-slate-200 rounded mb-1.5" />
                        <div className="h-2 w-1/2 bg-slate-100 rounded mb-2" />
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-bold text-primary">
                            ${room * 45 + 55}
                            <span className="text-xs font-normal text-slate-400">/night</span>
                          </div>
                          <div className="w-16 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-[10px] font-semibold text-primary">Book</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Bottom tabs */}
                <div className="flex items-center justify-around pt-2 border-t border-slate-200/60">
                  <div className="w-8 h-1 rounded-full bg-primary" />
                  <div className="w-8 h-1 rounded-full bg-slate-200" />
                  <div className="w-8 h-1 rounded-full bg-slate-200" />
                </div>
              </div>

              {/* Home indicator */}
              <div className="h-5 bg-[#F7F5F1] flex items-center justify-center">
                <div className="w-28 h-1 rounded-full bg-slate-300" />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -right-4 top-1/4 z-20"
              animate={isInView ? { y: [0, -8, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Card className="px-3 py-2 bg-white/95 backdrop-blur-sm shadow-lg border border-primary/20 rounded-xl">
                <p className="text-xs font-semibold text-primary">
                  {t("roomie.booking.badge1" as any)}
                </p>
              </Card>
            </motion.div>

            <motion.div
              className="absolute -left-4 bottom-1/3 z-20"
              animate={isInView ? { y: [0, 10, 0] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Card className="px-3 py-2 bg-white/95 backdrop-blur-sm shadow-lg border border-primary/20 rounded-xl">
                <p className="text-xs font-semibold text-primary">
                  {t("roomie.booking.badge2" as any)}
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
