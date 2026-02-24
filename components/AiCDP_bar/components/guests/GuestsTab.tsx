import React from "react";
import { Filter, Download, Sparkles, MoreHorizontal } from "lucide-react";
import { CDP_GUESTS_DB } from "../../data/mockData";

interface GuestsTabProps {
  handleGenerateOffer: (guest: any) => void;
}

export const GuestsTab: React.FC<GuestsTabProps> = ({
  handleGenerateOffer,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            База гостей (CDP)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Единый профиль 360° на основе истории, PMS и мобильного приложения.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter size={16} /> Фильтры
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} /> Экспорт CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Гость
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  LTV / Визиты
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Источник
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Теги предпочтений (Level 2)
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Статус
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {CDP_GUESTS_DB.map((guest) => (
                <tr
                  key={guest.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {guest.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {guest.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {guest.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {guest.ltv}
                    </div>
                    <div className="text-xs text-gray-500">
                      {guest.stays} визитов
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${guest.source.includes("Direct") ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {guest.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[250px]">
                      {guest.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-gray-100 text-gray-600 rounded px-2 py-1 border border-gray-200 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {guest.lastStay}
                    </div>
                    <div className="text-xs text-gray-500">{guest.status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleGenerateOffer(guest)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-lg mr-2 transition-colors"
                      title="Сгенерировать оффер"
                    >
                      <Sparkles size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-lg transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
