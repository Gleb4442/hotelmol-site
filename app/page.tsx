"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import nextDynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LLMSummary from "@/components/LLMSummary";
import SEO, { organizationSchema } from "@/components/SEO";
import OnboardingGate from "@/components/OnboardingGate";
import DeferredSection from "@/components/DeferredSection";

const ProblemSection = nextDynamic(() => import("@/components/ProblemSection"), { ssr: false });
const IndustryImpactSection = nextDynamic(() => import("@/components/IndustryImpactSection"), { ssr: false });
const HotelQRBenefits = nextDynamic(() => import("@/components/HotelQRBenefits"), { ssr: false });
const HotelmolIs = nextDynamic(() => import("@/components/HotelmolIs"), { ssr: false });
const HowRoomieWorks = nextDynamic(() => import("@/components/HowRoomieWorks"), { ssr: false });
const AIDashboardSection = nextDynamic(() => import("@/components/AIDashboardSection"), { ssr: false });
const IntegrationTicker = nextDynamic(() => import("@/components/IntegrationTicker"), { ssr: false });
const ROIEstimateLight = nextDynamic(() => import("@/components/ROIEstimateLight"), { ssr: false });
const ChatFAQSection = nextDynamic(() => import("@/components/ChatFAQSection"), { ssr: false });

export default function Home() {
    return (
        <>
            <OnboardingGate />
            <SEO
                title="AI-Powered Hotel Guest Communication"
                description="Transform your hotel operations with Roomie, the AI assistant that handles guest communications 24/7 in 100+ languages. Boost efficiency and guest satisfaction."
                structuredData={organizationSchema}
            />
            <Hero />
            <LLMSummary />
            <DeferredSection minHeight={520}>
                <ProblemSection />
            </DeferredSection>
            <DeferredSection minHeight={720}>
                <IndustryImpactSection />
            </DeferredSection>
            <DeferredSection minHeight={720}>
                <HotelQRBenefits />
            </DeferredSection>
            <DeferredSection minHeight={820}>
                <HotelmolIs />
            </DeferredSection>
            <DeferredSection minHeight={760}>
                <HowRoomieWorks />
            </DeferredSection>
            <DeferredSection minHeight={620}>
                <AIDashboardSection />
            </DeferredSection>
            <DeferredSection minHeight={360}>
                <IntegrationTicker />
            </DeferredSection>
            <DeferredSection minHeight={900}>
                <ROIEstimateLight />
            </DeferredSection>
            <DeferredSection minHeight={760}>
                <ChatFAQSection variant="hotelier" />
            </DeferredSection>
        </>
    );
}
