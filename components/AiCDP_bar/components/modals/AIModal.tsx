import React from "react";
import { BrainCircuit, X, CheckCircle2 } from "lucide-react";

interface AIModalProps {
  selectedAIEvent: any;
  setSelectedAIEvent: (event: any) => void;
}

export const AIModal: React.FC<AIModalProps> = ({
  selectedAIEvent,
  setSelectedAIEvent,
}) => {
  if (!selectedAIEvent) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 transform transition-all">
        <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <BrainCircuit size={20} />
              <span className="font-semibold text-sm uppercase tracking-wider">
                Логика ИИ-Агента
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {selectedAIEvent.action}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Гость: {selectedAIEvent.guest}
            </p>
          </div>
          <button
            onClick={() => setSelectedAIEvent(null)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-100 before:via-indigo-100 before:to-transparent">
            {selectedAIEvent.thinking.map((step: string, idx: number) => (
              <div
                key={idx}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-50 text-indigo-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="text-xs font-bold">{idx + 1}</span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-600" size={24} />
              <div>
                <p className="text-sm font-semibold text-green-900">
                  Результат операции
                </p>
                <p className="text-sm text-green-700">
                  {selectedAIEvent.conversion}
                </p>
              </div>
            </div>
            {selectedAIEvent.revenue !== "-" && (
              <span className="text-lg font-bold text-green-700">
                {selectedAIEvent.revenue}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
