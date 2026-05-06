"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import dynamicImport from "next/dynamic";
import Hero from "@/components/Hero";
import ChatFAQSection from "@/components/ChatFAQSection";
import LLMSummary from "@/components/LLMSummary";
import SEO, { organizationSchema } from "@/components/SEO";
import Onboarding from "@/components/Onboarding";

const ProblemSection = dynamicImport(() => import("@/components/ProblemSection"));
const IndustryImpactSection = dynamicImport(() => import("@/components/IndustryImpactSection"));
const HotelQRBenefits = dynamicImport(() => import("@/components/HotelQRBenefits"));
const HotelmolIs = dynamicImport(() => import("@/components/HotelmolIs"));
const HowRoomieWorks = dynamicImport(() => import("@/components/HowRoomieWorks"));
const AIDashboardSection = dynamicImport(() => import("@/components/AIDashboardSection"));
const IntegrationTicker = dynamicImport(() => import("@/components/IntegrationTicker"));
const ROIEstimateLight = dynamicImport(() => import("@/components/ROIEstimateLight"));

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
            <ProblemSection />
            <IndustryImpactSection />
            <HotelQRBenefits />
            <HotelmolIs />
            <HowRoomieWorks />
            <AIDashboardSection />
            <IntegrationTicker />
            <ROIEstimateLight />
            <ChatFAQSection variant="hotelier" />
        </>
    );
}
