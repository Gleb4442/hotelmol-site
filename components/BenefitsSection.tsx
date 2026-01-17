"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Globe, Clock, BarChart3, Zap } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { cn } from "@/lib/utils";

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const isNumber = /^\+?\d+/.test(value);
  const numericValue = parseInt(value.match(/\d+/)?.[0] || "0");

  useEffect(() => {
    if (!isNumber) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= numericValue) {
          clearInterval(interval);
          return numericValue;
        }
        return prev + Math.ceil(numericValue / 20);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isNumber, numericValue]);

  if (!isNumber) return <>{value}</>;

  return <>{value.replace(/\d+/, count.toString())}</>;
}

export default function BenefitsSection() {
  const { t } = useTranslation();

  const benefits = [
    {
      title: t("home.benefits.directBookings.title"),
      stat: t("home.benefits.directBookings.stat"),
      description: t("home.benefits.directBookings.description"),
    },
    {
      title: t("home.benefits.workload.stat"),
      stat: t("home.benefits.workload.stat"), // Note: using stat as title for better visual if no title given
      description: t("home.benefits.workload.description"),
    },
    {
      title: t("home.benefits.multilingual.title"),
      stat: t("home.benefits.multilingual.stat"),
      description: t("home.benefits.multilingual.description"),
    },
    {
      title: t("home.benefits.upsells.title"),
      stat: t("home.benefits.upsells.stat"),
      description: t("home.benefits.upsells.description"),
    },
    {
      title: t("home.benefits.integration.title"),
      stat: t("home.benefits.integration.stat"),
      description: t("home.benefits.integration.description"),
    },
  ];

  // Adjusting titles for those where stat is the main focus
  benefits[1].title = t("home.benefits.workload.title");

  return (
    <section className="py-24 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {t("home.benefits.badge")}
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {t("home.benefits.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("home.benefits.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8 mb-8">
          {benefits.map((benefit, index) => {
            return (
              <Card
                key={index}
                className={cn(
                  "group relative p-8 lg:p-10 hover-elevate transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden col-span-1 md:col-span-2 lg:col-span-2",
                  index === 3 && "lg:col-start-2",
                  index === 4 && "md:col-start-2 lg:col-start-auto"
                )}
                data-testid={`card-benefit-${index}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                <div className="relative">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-3">
                    <AnimatedCounter value={benefit.stat} />
                  </div>
                  <h3 className="font-semibold text-xl lg:text-2xl mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground/60 text-center italic">
          {t("home.benefits.disclaimer")}
        </p>
      </div>
    </section>
  );
}
