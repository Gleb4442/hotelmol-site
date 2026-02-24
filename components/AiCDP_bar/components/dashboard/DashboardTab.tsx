import React from "react";
import {
  Bot,
  Users,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Clock,
  BrainCircuit,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { KPIS, AI_AGENTS_FEED, GUESTS_IN_HOUSE } from "../../data/mockData";

interface DashboardTabProps {
  setActiveTab: (tab: string) => void;
  setSelectedAIEvent: (event: any) => void;
  handleGenerateOffer: (guest: any) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  setActiveTab,
  setSelectedAIEvent,
  handleGenerateOffer,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {KPIS.map((kpi, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-gray-50 rounded-xl">
                <kpi.icon size={22} className="text-indigo-600" />
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ${
                  kpi.trend === "up"
                    ? "text-green-700 bg-green-50"
                    : "text-red-700 bg-red-50"
                }`}
              >
                {kpi.trend === "up" ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {kpi.change}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-gray-500 text-sm font-medium">{kpi.title}</h4>
              <p className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">
                {kpi.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Bot size={20} className="text-indigo-600" /> Действия
                  ИИ-Агентов (Live)
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Обоснования (LLM Thinking) и результаты
                </p>
              </div>
              <button
                onClick={() => setActiveTab("agents")}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                Все действия <ChevronRight size={16} />
              </button>
            </div>
            <div className="divide-y divide-gray-50 bg-gray-50/30">
              {AI_AGENTS_FEED.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedAIEvent(event)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                        {event.guest.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base group-hover:text-indigo-600 transition-colors">
                          {event.action}
                        </h4>
                        <p className="text-sm text-gray-500 font-medium">
                          Гость: {event.guest}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1 font-medium bg-white px-2 py-1 rounded-md border border-gray-100">
                      <Clock size={12} /> {event.time}
                    </span>
                  </div>
                  <div className="ml-13 pl-3 border-l-2 border-indigo-100 mt-3 relative">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-300"></div>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed italic">
                      "{event.thinking[0]} {event.thinking[1]}..."
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button className="text-xs font-semibold text-indigo-600 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                        <BrainCircuit size={14} /> Посмотреть ход мыслей ИИ
                      </button>
                      {event.status === "converted" && (
                        <span className="text-xs font-medium text-green-700 flex items-center gap-1">
                          <CheckCircle2 size={14} /> {event.revenue}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users size={20} className="text-indigo-600" /> In-House Гости
              </h2>
              <p className="text-sm text-gray-500 mt-1">Обогащенные профили</p>
            </div>
            <div className="divide-y divide-gray-50">
              {GUESTS_IN_HOUSE.map((guest, idx) => (
                <div
                  key={idx}
                  className="p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{guest.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Номер {guest.room} • {guest.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded uppercase tracking-wide">
                        {guest.loyalty}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        LTV: {guest.ltv}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {guest.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleGenerateOffer(guest)}
                    className="w-full flex justify-center items-center gap-2 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-100 rounded-lg text-xs font-semibold text-indigo-700 transition-colors"
                  >
                    <Sparkles size={14} /> Создать оффер (Gemini)
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => setActiveTab("guests")}
                className="w-full py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
              >
                Открыть базу гостей (CDP)
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-lg border border-indigo-800 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp size={100} />
            </div>
            <h3 className="text-indigo-200 text-sm font-semibold tracking-wide uppercase mb-1">
              Ключевая метрика (P0)
            </h3>
            <p className="text-xl font-bold mb-4">Конверсия OTA в Прямые</p>
            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Прямые (Roomie)</span>
                  <span className="font-bold">25%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-indigo-400 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">OTA (Booking, etc.)</span>
                  <span className="font-bold text-gray-400">75%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
