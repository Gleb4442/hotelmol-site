"use client";

import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { POLICY_VERSION } from "@/lib/constants/consent";

export interface Consents {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface StoredConsent {
  version: string;
  action: string;
  consents: Consents;
}

const LS_SESSION_KEY = "cookie_consent_session_id";
const LS_CONSENT_KEY = "cookie_consent_given";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem(LS_SESSION_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(LS_SESSION_KEY, sessionId);
  }
  return sessionId;
}

function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_CONSENT_KEY);
    if (!raw) return null;
    const parsed: StoredConsent = JSON.parse(raw);
    if (parsed.version !== POLICY_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  const [hasConsented, setHasConsented] = useState(true); // true initially to avoid flash
  const [currentConsents, setCurrentConsents] = useState<Consents | null>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setHasConsented(true);
      setCurrentConsents(stored.consents);
    } else {
      setHasConsented(false);
      setCurrentConsents(null);
    }
  }, []);

  const submitConsent = useCallback(
    async (action: "accepted" | "rejected" | "partial", consents: Consents) => {
      const sessionId = getSessionId();

      try {
        const res = await fetch("/api/cookie-consents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            policy_version: POLICY_VERSION,
            action,
            consents,
          }),
        });

        if (!res.ok) {
          console.error("Failed to submit consent:", await res.text());
        }
      } catch (err) {
        console.error("Failed to submit consent:", err);
      }

      // Save to localStorage regardless of API result (UX cache)
      const stored: StoredConsent = { version: POLICY_VERSION, action, consents };
      localStorage.setItem(LS_CONSENT_KEY, JSON.stringify(stored));
      setHasConsented(true);
      setCurrentConsents(consents);
    },
    []
  );

  const withdrawConsent = useCallback(async () => {
    const sessionId = getSessionId();
    const allFalse: Consents = {
      necessary: true, // necessary is always true by spec, but action is "withdrawn"
      analytics: false,
      marketing: false,
      functional: false,
    };

    try {
      await fetch("/api/cookie-consents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          policy_version: POLICY_VERSION,
          action: "withdrawn",
          consents: allFalse,
        }),
      });
    } catch (err) {
      console.error("Failed to withdraw consent:", err);
    }

    localStorage.removeItem(LS_CONSENT_KEY);
    setHasConsented(false);
    setCurrentConsents(null);
  }, []);

  return { hasConsented, currentConsents, submitConsent, withdrawConsent };
}
