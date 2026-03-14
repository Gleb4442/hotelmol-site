"use client";
import { useState, useMemo, useEffect } from "react";
import { Calculator, ArrowRight, TrendingUp, Info, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import { Button } from "@/components/ui/button";
import { motion, useSpring } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Custom Counter Component for "rolling" numbers
function Counter({ value, decimal = 0, prefix = "", suffix = "" }: { value: number, decimal?: number, prefix?: string, suffix?: string }) {
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [springValue]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString(undefined, { minimumFractionDigits: decimal, maximumFractionDigits: decimal })}{suffix}
    </span>
  );
}

export default function ROIEstimateLight() {
  const { t, language } = useTranslation();
  const [rooms, setRooms] = useState<number>(50);
  const [isEditingRooms, setIsEditingRooms] = useState(false);
  const [roomInput, setRoomInput] = useState(rooms.toString());

  const handleRoomSubmit = () => {
    const val = parseInt(roomInput);
    if (!isNaN(val) && val >= 5 && val <= 500) {
      setRooms(val);
    } else {
      setRoomInput(rooms.toString());
    }
    setIsEditingRooms(false);
  };

  // Base values from CSV
  const OTA_SAVINGS_PER_ROOM = 53;
  const FB_ONLINE_PER_ROOM = 80;
  const UPSELL_PER_ROOM = 50;
  const TOTAL_PER_ROOM = OTA_SAVINGS_PER_ROOM + FB_ONLINE_PER_ROOM + UPSELL_PER_ROOM;

  const monthlyIncome = rooms * TOTAL_PER_ROOM;
  const annualIncome = monthlyIncome * 12;

  const chartData = useMemo(() => [
    { name: t("roi.calculator.source1"), value: OTA_SAVINGS_PER_ROOM * rooms, color: '#0752A0' },
    { name: t("roi.calculator.source2"), value: FB_ONLINE_PER_ROOM * rooms, color: '#4778A8' },
    { name: t("roi.calculator.source3"), value: UPSELL_PER_ROOM * rooms, color: '#709DC4' },
  ], [rooms, t]);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-[#F7F6F2]">
      {/* Premium Background with Subtle Gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0752A0]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#ACCAE0]/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F6F6F4] border border-grey/10 mb-6 shadow-sm">
            <Calculator className="h-8 w-8 text-[#0752A0]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[45px] font-bold mb-6 text-[#111111] tracking-tight leading-tight">
            {t("roi.title")}
          </h2>
          <p className="text-lg sm:text-xl text-[#8A8A8A] max-w-2xl mx-auto font-light leading-relaxed">
            {t("roi.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          {/* Controls Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-5 space-y-8"
          >
            <div className="relative group overflow-hidden bg-[#F6F6F4] p-8 rounded-[2rem] border border-grey/10 shadow-sm transition-all duration-500 hover:border-grey/20">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <label htmlFor="roomsSlider" className="text-sm font-medium text-[#8A8A8A] uppercase tracking-[0.2em] mb-2 block">
                    {t("roi.calculator.roomsLabel")}
                  </label>
                  <div className="text-5xl font-bold text-[#111111] tabular-nums flex items-baseline gap-2">
                    {isEditingRooms ? (
                      <input
                        type="number"
                        value={roomInput}
                        onChange={(e) => setRoomInput(e.target.value)}
                        onBlur={handleRoomSubmit}
                        onKeyDown={(e) => e.key === "Enter" && handleRoomSubmit()}
                        autoFocus
                        className="w-32 bg-transparent border-b-2 border-[#0752A0] outline-none focus:ring-0 p-0 text-5xl font-bold text-[#111111]"
                        min="5"
                        max="500"
                      />
                    ) : (
                      <span 
                        onClick={() => {
                          setRoomInput(rooms.toString());
                          setIsEditingRooms(true);
                        }}
                        className="cursor-pointer hover:text-[#0752A0] transition-colors decoration-dotted decoration-[#0752A0]/30 hover:underline underline-offset-8"
                        title="Click to edit"
                      >
                        {rooms}
                      </span>
                    )}
                    <span className="text-xl font-light text-[#8A8A8A] lowercase">rooms</span>
                  </div>
                </div>
                <div className="bg-[#0752A0]/10 text-[#0752A0] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#0752A0]/20">
                  Live ROI
                </div>
              </div>

              <div className="relative h-12 flex items-center mb-4">
                <input
                  id="roomsSlider"
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#8A8A8A]/20 rounded-lg appearance-none cursor-pointer accent-[#0752A0] group-hover:accent-[#0752A0]/80 transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, #0752A0 0%, #0752A0 ${(rooms - 5) / (500 - 5) * 100}%, rgba(0,0,0,0.05) ${(rooms - 5) / (500 - 5) * 100}%, rgba(0,0,0,0.05) 100%)`
                  }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-bold text-[#8A8A8A]/40 uppercase tracking-widest px-1">
                <span>5 Rooms</span>
                <span>250 Rooms</span>
                <span>500 Rooms</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0752A0]/10 via-[#0752A0]/5 to-transparent backdrop-blur-3xl p-10 rounded-[2.5rem] border border-[#0752A0]/10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-32 h-32 text-[#0752A0] rotate-12" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-sm font-medium text-[#0752A0] uppercase tracking-[0.3em] mb-4">Total Impact</span>
                <div className="text-6xl lg:text-7xl font-black text-[#111111] mb-6">
                  <Counter value={monthlyIncome} prefix="€" />
                </div>
                <div className="inline-flex items-center gap-2 bg-[#F6F6F4] px-6 py-3 rounded-2xl border border-grey/10 mb-2">
                  <span className="text-[#8A8A8A] text-sm font-medium uppercase tracking-wider">{t("roi.calculator.annualIncome")}</span>
                  <span className="text-[#111111] font-bold text-lg">
                    <Counter value={annualIncome} prefix="€" />
                  </span>
                </div>
                <p className="text-[#8A8A8A] text-xs mt-6 uppercase tracking-widest font-bold">Additional potential revenue</p>
              </div>
            </div>
          </motion.div>

          {/* Visualization Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-7 bg-[#F6F6F4] rounded-[2.5rem] border border-grey/10 p-8 lg:p-12 shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#111111] mb-2">Revenue Breakdown</h3>
                <p className="text-[#8A8A8A] text-sm">Where your growth comes from</p>
              </div>
              <a
                href="/explanation.pdf"
                download
                className="p-3 rounded-2xl bg-white hover:bg-[#F6F6F4] text-[#8A8A8A] hover:text-[#0752A0] border border-grey/10 transition-all duration-300 group relative"
              >
                <Info className="w-5 h-5" />
                <span className="absolute right-0 top-full mt-3 bg-[#111111] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none translate-y-2 group-hover:translate-y-0">
                  {t("roi.calculator.downloadExplanation")}
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-1">
              <div className="h-[280px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={85}
                      outerRadius={110}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', color: '#111111' }}
                      itemStyle={{ color: '#111111' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-[0.2em] mb-1">Estimated ROI</span>
                  <span className="text-2xl font-bold text-[#111111]">+{Math.round((TOTAL_PER_ROOM / 500) * 100)}%</span>
                  <span className="text-[10px] text-[#0752A0] font-bold uppercase mt-1">Growth</span>
                </div>
              </div>

              <div className="space-y-6">
                {chartData.map((source, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-grey/5 hover:border-[#0752A0]/20 transition-all duration-300 group"
                  >
                    <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: source.color }} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#111111] truncate group-hover:text-[#0752A0] transition-colors">{source.name}</h4>
                      <p className="text-[10px] text-[#8A8A8A] uppercase tracking-widest">{t("roi.calculator.perRoom")}: €{[OTA_SAVINGS_PER_ROOM, FB_ONLINE_PER_ROOM, UPSELL_PER_ROOM][idx]}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-md font-bold text-[#111111]">
                        <Counter value={source.value} prefix="€" />
                      </div>
                      <div className="text-[10px] text-[#8A8A8A] truncate">/ MONTH</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative p-12 lg:p-16 rounded-[3rem] bg-gradient-to-r from-[#0752A0]/80 to-[#4778A8]/80 backdrop-blur-3xl border border-white/20 overflow-hidden text-center group shadow-xl"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-all duration-700" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ACCAE0]/20 rounded-full blur-[80px] group-hover:bg-[#ACCAE0]/30 transition-all duration-700" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Ready to unlock your potential revenue?
            </h3>
            <p className="text-lg text-white/90 mb-10 font-light max-w-xl">
              Get a detailed, personalized breakdown for your specific hotel needs from our expert team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button
                size="lg"
                asChild
                className="h-16 px-12 bg-white text-[#111111] hover:bg-[#F6F6F4] text-lg font-bold shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] rounded-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <a href="https://cal.com/gleb.gosha/30min" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Talk to a Human <ArrowRight className="ml-3 w-6 h-6" />
                </a>
              </Button>
              <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span className="text-white font-medium text-sm">{t("text.callFree")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #ffffff;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #0752A0;
          box-shadow: 0 4px 10px rgba(7, 82, 160, 0.2);
          transition: all 0.2s ease-in-out;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 15px rgba(7, 82, 160, 0.3);
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #ffffff;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #0752A0;
          box-shadow: 0 4px 10px rgba(7, 82, 160, 0.2);
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </section>
  );
}
