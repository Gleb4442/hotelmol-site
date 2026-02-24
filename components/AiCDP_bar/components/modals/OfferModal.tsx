import React, { useRef } from "react";
import { MessageSquare, X, Loader2, Copy, Send } from "lucide-react";

interface OfferModalProps {
  offerModalGuest: any;
  setOfferModalGuest: (guest: any) => void;
  isGenerating: boolean;
  apiError: string;
  generatedOffer: string;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  offerModalGuest,
  setOfferModalGuest,
  isGenerating,
  apiError,
  generatedOffer,
}) => {
  const copyTextRef = useRef<HTMLDivElement>(null);

  if (!offerModalGuest) return null;

  const copyToClipboard = () => {
    if (copyTextRef.current) {
      const text = copyTextRef.current.innerText;
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Текст скопирован в буфер обмена!");
      } catch (err) {
        console.error("Copy failed", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 transform transition-all">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100 p-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 mb-2">
              <MessageSquare size={20} />
              <span className="font-semibold text-sm uppercase tracking-wider">
                Gemini 2.5 AI Assistant
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Оффер для {offerModalGuest.name}
            </h3>
            <div className="flex gap-2 mt-2 flex-wrap">
              {offerModalGuest.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-1 bg-white/60 text-indigo-800 rounded border border-indigo-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setOfferModalGuest(null)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <Loader2 size={32} className="text-indigo-600 animate-spin" />
              <p className="text-sm font-medium text-gray-600">
                Анализ профиля и генерация оффера...
              </p>
            </div>
          ) : apiError ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
              {apiError}
            </div>
          ) : (
            <div className="space-y-4">
              <div
                ref={copyTextRef}
                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm text-gray-800 leading-relaxed whitespace-pre-wrap"
              >
                {generatedOffer}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Copy size={16} /> Скопировать
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:bg-[#20bd5a] transition-colors shadow-sm shadow-green-500/20">
                  <Send size={16} /> Отправить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
