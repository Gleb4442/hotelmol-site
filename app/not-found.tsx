"use client";

import Link from "next/link";
import { Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/TranslationContext";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import PremiumBackground from "@/components/PremiumBackground";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title={t("notFound.title")}
                description="Page not found. The page you are looking for does not exist."
                noindex={true}
            />

            <main className="flex-grow flex items-center justify-center pt-20 text-center">
                <PremiumBackground className="w-full h-full flex items-center justify-center py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-12"
                            >
                                <h1 className="font-serif text-[120px] md:text-[180px] font-bold text-primary/10 mb-[-40px] md:mb-[-60px] leading-none">
                                    {t("notFound.error")}
                                </h1>
                                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                                    {t("notFound.title")}
                                </h2>
                                <p className="text-lg md:text-xl text-muted-foreground/80 mb-10 max-w-xl mx-auto">
                                    {t("notFound.message")}
                                </p>

                                <p className="text-base font-medium text-slate-500 mb-8 uppercase tracking-widest">
                                    {t("notFound.suggestion")}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link href="/">
                                        <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium min-w-[200px]">
                                            <Home className="w-5 h-5 mr-2" />
                                            {t("notFound.home")}
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-medium min-w-[200px] border-slate-200 hover:border-primary/30">
                                            <Mail className="w-5 h-5 mr-2" />
                                            {t("notFound.contact")}
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </PremiumBackground>
            </main>
        </div>
    );
}
