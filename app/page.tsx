"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import HowRoomieWorks from "@/components/HowRoomieWorks";
import IntegrationTicker from "@/components/IntegrationTicker";
import IndustryImpactSection from "@/components/IndustryImpactSection";
import HotelQRBenefits from "@/components/HotelQRBenefits";
import ValueProposition from "@/components/ValueProposition";
import AIDashboardSection from "@/components/AIDashboardSection";
import ROIEstimateLight from "@/components/ROIEstimateLight";
import PresentationSection from "@/components/PresentationSection";
import ChatFAQSection from "@/components/ChatFAQSection";
import LLMSummary from "@/components/LLMSummary";
import SEO, { organizationSchema } from "@/components/SEO";
import Onboarding from "@/components/Onboarding";
import HotelmolIs from "@/components/HotelmolIs";

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
            <HowRoomieWorks />
            <IntegrationTicker />
            <HotelmolIs />
            <ValueProposition />
            <AIDashboardSection />
            <ChatFAQSection />
            <ROIEstimateLight />
            <PresentationSection />
        </>
    );
}
