import React, { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [isAutonomous, setIsAutonomous] = useState(true);
  return (
    <>
      {/* Мобильный хедер */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="font-bold text-xl tracking-tight">
            Roomie<span className="text-gray-400 font-normal">.OS</span>
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Десктопный хедер */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            {activeTab === "dashboard" && "AI CDP Dashboard"}
            {activeTab === "agents" && "Мониторинг Агентов"}
            {activeTab === "guests" && "Профили Гостей (CDP)"}
            {activeTab === "rooms" && "Управление Инвентарем"}
          </h1>
          <button
            onClick={() => setIsAutonomous(!isAutonomous)}
            className="text-sm text-gray-500 font-medium flex items-center gap-2 cursor-pointer hover:text-gray-700 transition-colors text-left"
          >
            <span className="relative flex h-2.5 w-2.5">
              {isAutonomous && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isAutonomous ? "bg-green-500" : "bg-amber-500"}`}></span>
            </span>
            {isAutonomous ? "Уровень 3: Автономный режим активен" : "Ручной режим активен"}
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Поиск..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64"
            />
          </div>
          <button className="relative p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>
    </>
  );
};
