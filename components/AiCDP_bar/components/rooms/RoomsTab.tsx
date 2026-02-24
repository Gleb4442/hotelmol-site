import React from "react";
import { Tags } from "lucide-react";
import { ROOM_TAGS_MODEL } from "../../data/mockData";

export const RoomsTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Smart Бронирование (Level 2)
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Фрагментарная модель комнат (подобно IHG Concerto). Отказ от
          классических категорий в пользу атрибутов.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* База атрибутов */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Tags size={18} className="text-indigo-600" /> Каталог атрибутов
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Вид из окна (Views)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ROOM_TAGS_MODEL.views.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100 cursor-pointer hover:bg-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Расположение (Location)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ROOM_TAGS_MODEL.location.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100 cursor-pointer hover:bg-purple-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Удобства (Amenities)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ROOM_TAGS_MODEL.amenities.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100 cursor-pointer hover:bg-emerald-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Инвентарь номеров по тегам */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">
                Инвентарь номеров & Теги
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Поиск номера..."
                  className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="p-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                    >
                      Номер
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                    >
                      Статус
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                    >
                      Теги номера (AI Match)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {[
                    {
                      room: "401",
                      status: "Очищен",
                      tags: ["Ocean View", "High Floor", "Balcony", "King Bed"],
                    },
                    {
                      room: "402",
                      status: "Занят (S. Jenkins)",
                      tags: ["Ocean View", "Quiet Zone", "Extra Bed Capable"],
                    },
                    {
                      room: "310",
                      status: "Требует уборки",
                      tags: ["City View", "Workspace", "Connecting Rooms"],
                    },
                    {
                      room: "105",
                      status: "Очищен",
                      tags: [
                        "Courtyard",
                        "Accessible",
                        "Low Floor",
                        "Pet-Friendly",
                      ],
                    },
                    {
                      room: "501",
                      status: "Очищен",
                      tags: ["Ocean View", "High Floor", "Bathtub", "Suite"],
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {row.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-md ${row.status.includes("Занят") ? "bg-indigo-100 text-indigo-800" : row.status === "Очищен" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {row.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-md border border-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
