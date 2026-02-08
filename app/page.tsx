"use client";

import Hero from "@/components/Hero";
import HowRoomieWorks from "@/components/HowRoomieWorks";
import IntegrationTicker from "@/components/IntegrationTicker";
import BenefitsSection from "@/components/BenefitsSection";
import ValueProposition from "@/components/ValueProposition";
import AIDashboardSection from "@/components/AIDashboardSection";
import ROIEstimate from "@/components/ROIEstimate";
import PresentationSection from "@/components/PresentationSection";
import ChatFAQSection from "@/components/ChatFAQSection";
import LLMSummary from "@/components/LLMSummary";
import SEO, { organizationSchema } from "@/components/SEO";

export default function Home() {
    return (
        <>
            <SEO
                title="AI-Powered Hotel Guest Communication"
                description="Transform your hotel operations with Roomie, the AI assistant that handles guest communications 24/7 in 100+ languages. Boost efficiency and guest satisfaction."
                structuredData={organizationSchema}
            />
            <Hero />
            <LLMSummary />
            <HowRoomieWorks />
            <IntegrationTicker />
            <ValueProposition />
            <BenefitsSection />
            <AIDashboardSection />
            <ChatFAQSection />
            <ROIEstimate />
            <PresentationSection />
        </>
    );
}
