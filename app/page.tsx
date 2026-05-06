"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import dynamicImport from "next/dynamic";
import Hero from "@/components/Hero";
import ChatFAQSection from "@/components/ChatFAQSection";
import LLMSummary from "@/components/LLMSummary";
import SEO, { organizationSchema } from "@/components/SEO";
import Onboarding from "@/components/Onboarding";
import LazyOnView from "@/components/LazyOnView";

const ProblemSection = dynamicImport(() => import("@/components/ProblemSection"), { ssr: false });
const IndustryImpactSection = dynamicImport(() => import("@/components/IndustryImpactSection"), { ssr: false });
const HotelQRBenefits = dynamicImport(() => import("@/components/HotelQRBenefits"), { ssr: false });
const HotelmolIs = dynamicImport(() => import("@/components/HotelmolIs"), { ssr: false });
const HowRoomieWorks = dynamicImport(() => import("@/components/HowRoomieWorks"), { ssr: false });
const AIDashboardSection = dynamicImport(() => import("@/components/AIDashboardSection"), { ssr: false });
const IntegrationTicker = dynamicImport(() => import("@/components/IntegrationTicker"), { ssr: false });
const ROIEstimateLight = dynamicImport(() => import("@/components/ROIEstimateLight"), { ssr: false });

export default function Home() {
    return (
        <>
            <Onboarding />
            <SEO
                title="AI-Powered Hotel Guest Communication"
                description="Transform your hotel operations with Roomie, the AI assistant that handles guest communications 24/7 in 100+ languages. Boost efficiency and guest satisfaction."
                structuredData={organizationSchema}
            />
            <Hero />
            <LLMSummary />
            <LazyOnView minHeight={620}>
                <ProblemSection />
            </LazyOnView>
            <LazyOnView minHeight={760}>
                <IndustryImpactSection />
            </LazyOnView>
            <LazyOnView minHeight={720}>
                <HotelQRBenefits />
            </LazyOnView>
            <LazyOnView minHeight={680}>
                <HotelmolIs />
            </LazyOnView>
            <LazyOnView minHeight={680}>
                <HowRoomieWorks />
            </LazyOnView>
            <LazyOnView minHeight={520}>
                <AIDashboardSection />
            </LazyOnView>
            <LazyOnView minHeight={260}>
                <IntegrationTicker />
            </LazyOnView>
            <LazyOnView minHeight={720}>
                <ROIEstimateLight />
            </LazyOnView>
            <ChatFAQSection variant="hotelier" />
        </>
    );
}
