"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntegrationTicker from "@/components/IntegrationTicker";
import AIDashboardSection from "@/components/AIDashboardSection";
import ROIEstimate from "@/components/ROIEstimate";
import PresentationSection from "@/components/PresentationSection";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";
import ChatFAQSection from "@/components/ChatFAQSection";
import LLMSummary from "@/components/LLMSummary";
import SEO, { organizationSchema } from "@/components/SEO";

export default function Home() {
    const [demoModalOpen, setDemoModalOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <SEO
                title="AI-Powered Hotel Guest Communication"
                description="Transform your hotel operations with Roomie, the AI assistant that handles guest communications 24/7 in 100+ languages. Boost efficiency and guest satisfaction."
                structuredData={organizationSchema}
            />
            <Header onDemoClick={() => setDemoModalOpen(true)} />
            <main className="flex-grow">
                <Hero />
                <LLMSummary />
                <IntegrationTicker />
                <AIDashboardSection />
                <ChatFAQSection />
                <ROIEstimate />
                <PresentationSection />
            </main>
            <Footer />
            <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
        </div>
    );
}
