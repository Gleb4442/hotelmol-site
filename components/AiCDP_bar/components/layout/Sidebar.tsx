import React from "react";
import {
  LayoutDashboard,
  Users,
  Bot,
  BedDouble,
  Settings,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileMenuOpen,
  activeTab,
  setActiveTab,
  setIsMobileMenuOpen,
}) => {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="h-20 flex items-center px-6 border-b border-gray-50 hidden lg:flex">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg shadow-indigo-500/30">
            <Sparkles size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Roomie
            <span className="text-gray-400 font-normal text-sm">
              {" "}
              / HotelMol
            </span>
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Управление
        </div>
        {[
          { id: "dashboard", icon: LayoutDashboard, label: "Обзор (CDP)" },
          { id: "agents", icon: Bot, label: "ИИ-Агенты" },
          { id: "guests", icon: Users, label: "Профили гостей" },
          { id: "rooms", icon: BedDouble, label: "Smart Бронирование" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activeTab === item.id ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
          >
            <item.icon
              size={20}
              className={
                activeTab === item.id ? "text-indigo-600" : "text-gray-400"
              }
            />
            {item.label}
          </button>
        ))}

      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 shrink-0">
            <img
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=Gleb&backgroundColor=e2e8f0`}
              alt="CEO"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Gleb (Founder)
            </p>
            <p className="text-xs text-gray-500">General Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
