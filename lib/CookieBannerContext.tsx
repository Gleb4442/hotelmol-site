"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface CookieBannerContextType {
  isCookieBannerVisible: boolean;
  setCookieBannerVisible: (visible: boolean) => void;
}

const CookieBannerContext = createContext<CookieBannerContextType | undefined>(undefined);

export function CookieBannerProvider({ children }: { children: React.ReactNode }) {
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    if (typeof window !== "undefined") {
      try {
        const consent = localStorage.getItem("cookieConsent");
        setIsCookieBannerVisible(!consent);
      } catch (e) {
        console.error("Local storage access denied", e);
        setIsCookieBannerVisible(true); // Default to showing banner if access fails
      }
    }
  }, []);

  return (
    <CookieBannerContext.Provider value={{ isCookieBannerVisible, setCookieBannerVisible: setIsCookieBannerVisible }}>
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
