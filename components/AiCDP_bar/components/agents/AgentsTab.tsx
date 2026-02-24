import React from "react";
import { BrainCircuit, Activity, Clock } from "lucide-react";
import { AI_AGENTS_FEED } from "../../data/mockData";

interface AgentsTabProps {
  setSelectedAIEvent: (event: any) => void;
}

export const AgentsTab: React.FC<AgentsTabProps> = ({ setSelectedAIEvent }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          ИИ-Агенты (Оркестрация)
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Мониторинг автономных агентов, отвечающих за апсейл, коммуникацию и
          удержание.
        </p>
      </div>

      {/* Agents Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            name: "Upsell Agent",
            status: "Active",
            tasks: 142,
            conversion: "12.4%",
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            name: "Concierge Agent",
            status: "Active",
            tasks: 856,
            conversion: "N/A",
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            name: "Retention Agent",
            status: "Learning",
            tasks: 45,
            conversion: "8.1%",
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((agent) => (
          <div
            key={agent.name}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-40"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <BrainCircuit className={agent.color} size={20} />
                <h3 className="font-bold text-gray-900">{agent.name}</h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${agent.bg} ${agent.color}`}
              >
                {agent.status}
              </span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Выполнено задач</span>
                <span className="font-bold">{agent.tasks}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Конверсия (Success Rate)</span>
                <span className="font-bold">{agent.conversion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Activity size={20} className="text-indigo-600" /> Полный лог
            операций (Audit Trail)
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {AI_AGENTS_FEED.map((event) => (
            <div
              key={event.id}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setSelectedAIEvent(event)}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex items-center gap-4 w-1/3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold shrink-0">
                    {event.guest.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {event.action}
                    </h4>
                    <p className="text-sm text-gray-500">Для: {event.guest}</p>
                  </div>
                </div>

                <div className="w-1/3 text-sm text-gray-600 italic line-clamp-2">
                  "{event.thinking[0]}..."
                </div>

                <div className="w-1/3 flex justify-end items-center gap-4">
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-medium bg-white px-2 py-1 rounded-md border border-gray-100">
                    <Clock size={12} /> {event.time}
                  </span>
                  <button className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg hover:bg-indigo-100 transition-colors whitespace-nowrap">
                    Детали логики
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
