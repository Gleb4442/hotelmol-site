"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationProvider } from "@/lib/TranslationContext";
import { CookieBannerProvider } from "@/lib/CookieBannerContext";
import { Toaster } from "@/components/ui/toaster";
import CookieBanner from "@/components/CookieBanner";
import MobileAIInput from "@/components/MobileAIInput";
import ScrollToTop from "@/components/ScrollToTop";
import AskAIWidget from "@/components/AskAIWidget";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CookieBannerProvider>
            <QueryClientProvider client={queryClient}>
                <TranslationProvider>
                    <TooltipProvider>
                        {children}
                        <div className="hide-on-menu-open">
                            <Toaster />
                            <CookieBanner />
                            <MobileAIInput />
                            <AskAIWidget />
                            <ScrollToTop />
                        </div>
                    </TooltipProvider>
                </TranslationProvider>
            </QueryClientProvider>
        </CookieBannerProvider>
    );
}
