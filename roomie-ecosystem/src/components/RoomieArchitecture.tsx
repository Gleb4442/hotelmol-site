import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  Bot,
  LayoutDashboard,
  KeyRound,
  QrCode,
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';

const features = [
  {
    id: 'entry',
    title: 'Точка входа',
    description: 'Максимально простая (SMS, QR).',
    icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    details: [QrCode, Smartphone]
  },
  {
    id: 'ai',
    title: 'Roomie AI',
    description: 'Контекстно-зависимый чат-бот, который не просто отвечает на FAQ, но и работает как активный продавец услуг отеля.',
    icon: Bot,
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    details: [MessageSquare, Sparkles, Bot]
  },
  {
    id: 'ui',
    title: 'Адаптивный интерфейс',
    description: 'UI перестраивается в реальном времени. Экран "до заезда" отличается от экрана "вечером в номере".',
    icon: LayoutDashboard,
    gradient: 'from-emerald-500 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    details: [LayoutDashboard]
  },
  {
    id: 'checkin',
    title: 'Pre-Check-In',
    description: 'Ликвидация главной боли гостя — очередей на ресепшене.',
    icon: KeyRound,
    gradient: 'from-orange-500 to-amber-400',
    glowColor: 'rgba(249, 115, 22, 0.15)',
    details: [Clock, KeyRound]
  }
];

export default function RoomieArchitecture() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  const activeFeatureData = features.find(f => f.id === activeFeature);

  return (
    <section className="py-24 bg-slate-50 text-slate-900 min-h-screen flex items-center font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Экосистема Roomie
            <span className="block text-slate-500 text-2xl md:text-3xl mt-4 font-medium tracking-normal">
              Трехуровневая архитектура продукта
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed"
          >
            Продукт не является монолитом; это взаимосвязанная SaaS-экосистема, где каждый уровень усиливает другие и формирует глубокую "липкость" (stickiness) как для B2B, так и для B2C сегментов.
          </motion.p>
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
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 relative z-10 group ${isActive
                        ? ''
                        : 'bg-transparent border border-transparent hover:bg-slate-100/50'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFeatureBackground"
                        className="absolute inset-0 bg-white border border-slate-200 shadow-lg rounded-2xl -z-10"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center space-x-5">
                      <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                          ? `bg-gradient-to-br ${feature.gradient} shadow-md`
                          : 'bg-slate-100 group-hover:bg-slate-200'
                        }`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-lg transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                          {feature.title}
                        </h4>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Display */}
          <div className="lg:col-span-7 relative lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="aspect-square md:aspect-[4/3] bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden relative p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-xl"
            >
              {/* Dynamic Background Glow */}
              <div
                className="absolute inset-0 transition-colors duration-1000 ease-in-out"
                style={{
                  background: `radial-gradient(circle at center, ${activeFeatureData?.glowColor} 0%, transparent 70%)`
                }}
              />

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
              </div>

              <AnimatePresence mode="wait">
                {features.map((feature) => (
                  feature.id === activeFeature && (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                      className="relative z-10 max-w-lg w-full flex flex-col items-center"
                    >
                      <div className={`w-28 h-28 mx-auto mb-10 rounded-3xl bg-gradient-to-br ${feature.gradient} p-[2px] shadow-lg`}>
                        <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                          <feature.icon className="w-12 h-12 text-slate-800" />
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900">{feature.title}</h3>
                      <p className="text-xl text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="mt-12 flex justify-center gap-6">
                        {feature.details.map((DetailIcon, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1, type: "spring" }}
                            className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm backdrop-blur-md"
                          >
                            <DetailIcon className="w-6 h-6 text-slate-500" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
