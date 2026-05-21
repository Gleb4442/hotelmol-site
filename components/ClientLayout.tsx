"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";
import PageTransition from "@/components/PageTransition";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [demoModalOpen, setDemoModalOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header onDemoClick={() => setDemoModalOpen(true)} />
            <main className="flex-grow">
                <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
        </div>
    );
}
