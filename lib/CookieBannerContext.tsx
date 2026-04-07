"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useCookieConsent, Consents } from "@/hooks/useCookieConsent";

interface CookieBannerContextType {
  isCookieBannerVisible: boolean;
  setCookieBannerVisible: (visible: boolean) => void;
  hasConsented: boolean;
  currentConsents: Consents | null;
  submitConsent: (
    action: "accepted" | "rejected" | "partial",
    consents: Consents
  ) => Promise<void>;
  withdrawConsent: () => Promise<void>;
}

const CookieBannerContext = createContext<CookieBannerContextType | undefined>(
  undefined
);

export function CookieBannerProvider({ children }: { children: ReactNode }) {
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);
  const { hasConsented, currentConsents, submitConsent, withdrawConsent } =
    useCookieConsent();

  const handleWithdraw = async () => {
    await withdrawConsent();
    setIsCookieBannerVisible(true);
  };

  return (
    <CookieBannerContext.Provider
      value={{
        isCookieBannerVisible,
        setCookieBannerVisible: setIsCookieBannerVisible,
        hasConsented,
        currentConsents,
        submitConsent,
        withdrawConsent: handleWithdraw,
      }}
    >
      {children}
    </CookieBannerContext.Provider>
  );
}

export function useCookieBanner() {
  const context = useContext(CookieBannerContext);
  if (context === undefined) {
    throw new Error("useCookieBanner must be used within CookieBannerProvider");
  }
  return context;
}
