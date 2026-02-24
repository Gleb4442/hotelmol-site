/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { DashboardTab } from "./components/dashboard/DashboardTab";
import { GuestsTab } from "./components/guests/GuestsTab";
import { AgentsTab } from "./components/agents/AgentsTab";
import { RoomsTab } from "./components/rooms/RoomsTab";
import { OfferModal } from "./components/modals/OfferModal";
import { AIModal } from "./components/modals/AIModal";
import { fetchOpenAIWithRetry } from "./services/openaiService";

export default function AiCDP_App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedAIEvent, setSelectedAIEvent] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [offerModalGuest, setOfferModalGuest] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOffer, setGeneratedOffer] = useState("");
  const [apiError, setApiError] = useState("");

  const handleGenerateOffer = async (guest: any) => {
    setOfferModalGuest(guest);
    setIsGenerating(true);
    setGeneratedOffer("");
    setApiError("");
    const prompt = `Сгенерируй персональное предложение для следующего гостя:
    Имя: ${guest.name}
    Цель визита: ${guest.type || "Отдых"}
    Предпочтения (Теги): ${guest.tags.join(", ")}
    Уровень лояльности: ${guest.loyalty || "Standard"}
    Номер комнаты: ${guest.room || "Не назначен"}`;

    try {
      const resultText = await fetchOpenAIWithRetry(prompt);
      setGeneratedOffer(resultText);
    } catch (error) {
      setApiError(
        "Произошла ошибка при связи с ИИ. Пожалуйста, попробуйте позже.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full w-full min-h-[700px] bg-[#F9FAFB] flex font-sans text-gray-900">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden pt-16 lg:pt-0 bg-[#F9FAFB]">
        <Header
          activeTab={activeTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === "dashboard" && (
              <DashboardTab
                setActiveTab={setActiveTab}
                setSelectedAIEvent={setSelectedAIEvent}
                handleGenerateOffer={handleGenerateOffer}
              />
            )}
            {activeTab === "guests" && (
              <GuestsTab handleGenerateOffer={handleGenerateOffer} />
            )}
            {activeTab === "agents" && (
              <AgentsTab setSelectedAIEvent={setSelectedAIEvent} />
            )}
            {activeTab === "rooms" && <RoomsTab />}
          </div>
        </div>
      </main>

      <AIModal
        selectedAIEvent={selectedAIEvent}
        setSelectedAIEvent={setSelectedAIEvent}
      />

      <OfferModal
        offerModalGuest={offerModalGuest}
        setOfferModalGuest={setOfferModalGuest}
        isGenerating={isGenerating}
        apiError={apiError}
        generatedOffer={generatedOffer}
      />
    </div>
  );
}
