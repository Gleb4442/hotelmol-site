"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationProvider } from "@/lib/TranslationContext";
import { CookieBannerProvider } from "@/lib/CookieBannerContext";
import { Toaster } from "@/components/ui/toaster";
import CookieBanner from "@/components/CookieBanner";
// Dynamically import HotelTrendsBanner to avoid hydration mismatch and SSR issues
import dynamic from 'next/dynamic';
const HotelTrendsBanner = dynamic(() => import("@/components/HotelTrendsBanner"), { ssr: false });
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
                            <HotelTrendsBanner />
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
