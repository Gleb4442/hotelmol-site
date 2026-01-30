"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import DemoRequestModal from "@/components/DemoRequestModal";

interface DemoModalContextType {
    openDemoModal: () => void;
    closeDemoModal: () => void;
    isDemoModalOpen: boolean;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openDemoModal = () => setIsOpen(true);
    const closeDemoModal = () => setIsOpen(false);

    return (
        <DemoModalContext.Provider value={{ openDemoModal, closeDemoModal, isDemoModalOpen: isOpen }}>
            {children}
            <DemoRequestModal open={isOpen} onOpenChange={setIsOpen} />
        </DemoModalContext.Provider>
    );
}

export function useDemoModal() {
    const context = useContext(DemoModalContext);
    if (context === undefined) {
        throw new Error("useDemoModal must be used within a DemoModalProvider");
    }
    return context;
}
