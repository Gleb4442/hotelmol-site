import { useState } from 'react';
import {
  Smartphone,
  Bot,
  LayoutDashboard,
  KeyRound,
  QrCode,
  MessageSquare,
  Clock,
  Sparkles,
  Globe,
  Instagram,
  MessageCircle
} from 'lucide-react';

const features = [
  {
    id: 'entry',
    title: 'Точка входа',
    description: 'Максимально простая (SMS, QR в номере, Чат на сайте отеля, Instagram).',
    icon: Globe,
    details: [Globe, Instagram, MessageCircle, QrCode]
  },
  {
    id: 'ai',
    title: 'Roomie AI',
    description: 'Контекстно-зависимый чат-бот, который не просто отвечает на FAQ, но и работает как активный продавец услуг отеля.',
    icon: Bot,
    details: [MessageSquare, Sparkles, Bot]
  },
  {
    id: 'ui',
    title: 'Адаптивный интерфейс',
    description: 'UI перестраивается в реальном времени. Экран "до заезда" отличается от экрана "вечером в номере".',
    icon: LayoutDashboard,
    details: [LayoutDashboard]
  },
  {
    id: 'checkin',
    title: 'Pre-Check-In',
    description: 'Ликвидация главной боли гостя — очередей на ресепшене.',
    icon: KeyRound,
    details: [Clock, KeyRound]
  }
];

export default function RoomieArchitecture() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  const activeFeatureData = features.find(f => f.id === activeFeature);

  return (
    <section className="pt-[147px] pb-24 bg-slate-50 text-slate-900 min-h-screen flex items-center font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Экосистема Roomie
            <span className="block text-slate-500 text-2xl md:text-3xl mt-4 font-medium tracking-normal">
              Трехуровневая архитектура продукта
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Продукт не является монолитом; это взаимосвязанная SaaS-экосистема, где каждый уровень усиливает другие и формирует глубокую "липкость" (stickiness) как для B2B, так и для B2C сегментов.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: List */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-4 relative">
              {/* Vertical line connecting items */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-200 z-0 hidden md:block"></div>

              {features.map((feature, index) => {
                const isActive = activeFeature === feature.id;
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`w-full text-left p-5 rounded-2xl relative z-10 transition-none ${isActive ? 'bg-white border border-slate-200 shadow-sm' : 'bg-transparent border border-transparent hover:bg-slate-100/50'
                      }`}
                  >
                    <div className="relative z-10 flex items-center space-x-5">
                      <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-none ${isActive ? 'bg-slate-800' : 'bg-slate-100'
                        }`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg transition-none ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                          {feature.title}
                        </h4>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Display */}
          <div className="lg:col-span-7 relative lg:sticky lg:top-24">
            <div className="aspect-square md:aspect-[4/3] bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden relative p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-md transition-none">

              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
              </div>

              {activeFeatureData && (
                <div className="relative z-10 max-w-lg w-full flex flex-col items-center">
                  <div className="w-28 h-28 mx-auto mb-10 rounded-3xl bg-slate-100 shadow-sm flex items-center justify-center">
                    <activeFeatureData.icon className="w-12 h-12 text-slate-800" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900">{activeFeatureData.title}</h3>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {activeFeatureData.description}
                  </p>

                  <div className="mt-12 flex justify-center gap-6">
                    {activeFeatureData.details.map((DetailIcon, idx) => (
                      <div
                        key={idx}
                        className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm"
                      >
                        <DetailIcon className="w-6 h-6 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
