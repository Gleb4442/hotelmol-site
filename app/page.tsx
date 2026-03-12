"use client";

// Force static generation for better caching
export const dynamic = 'force-static';

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import HowRoomieWorks from "@/components/HowRoomieWorks";
import IntegrationTicker from "@/components/IntegrationTicker";
import IndustryImpactSection from "@/components/IndustryImpactSection";
import HotelQRBenefits from "@/components/HotelQRBenefits";
import ValueProposition from "@/components/ValueProposition";
import AIDashboardSection from "@/components/AIDashboardSection";
import ROIEstimate from "@/components/ROIEstimate";
import PresentationSection from "@/components/PresentationSection";
import ChatFAQSection from "@/components/ChatFAQSection";
import LLMSummary from "@/components/LLMSummary";
import SEO, { organizationSchema } from "@/components/SEO";
import Onboarding from "@/components/Onboarding";

const RevealSection = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
    >
        {children}
    </motion.div>
);

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
            
            <RevealSection>
                <LLMSummary />
            </RevealSection>
            
            <RevealSection>
                <ProblemSection />
            </RevealSection>
            
            <RevealSection>
                <HowRoomieWorks />
            </RevealSection>
            
            <div className="py-20 md:py-32 bg-white dark:bg-[#0a0a0b]">
                <IntegrationTicker />
            </div>
            
            <RevealSection>
                <IndustryImpactSection />
            </RevealSection>
            
            <RevealSection>
                <HotelQRBenefits />
            </RevealSection>
            
            <ValueProposition />
            
            <RevealSection>
                <AIDashboardSection />
            </RevealSection>
            
            <RevealSection>
                <ChatFAQSection />
            </RevealSection>
            
            <ROIEstimate />
            
            <RevealSection>
                <PresentationSection />
            </RevealSection>
        </>
    );
}
