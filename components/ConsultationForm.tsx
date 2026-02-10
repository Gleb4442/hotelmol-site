"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function ConsultationForm() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">

                    <h2 className="font-serif text-3xl lg:text-5xl font-bold mb-6 tracking-tight">
                        {t("consultation.title")}
                    </h2>

                    <p className="text-xl text-muted-foreground font-medium mb-10 max-w-2xl mx-auto">
                        {t("consultation.subtitle")}
                    </p>

                    <div className="flex flex-col items-center justify-center relative">
                        <Button
                            size="lg"
                            asChild
                            className="h-16 px-10 text-lg font-bold rounded-full bg-[#0752A0] hover:bg-[#0752A0]/90 text-white shadow-[0_10px_30px_rgba(7,82,160,0.3)] hover:shadow-[0_15px_40px_rgba(7,82,160,0.4)] transition-all duration-300 active:scale-95"
                        >
                            <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer">
                                {t("button.talkToHuman")}
                            </a>
                        </Button>

                        <p className="mt-6 text-sm text-muted-foreground font-medium">
                            {t("text.callFree")}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
