"use client";
import React from 'react';
import { Smartphone, UtensilsCrossed, ClipboardList, Award, CheckCircle2, Search, ArrowLeft, ShoppingBasket, Home, BellRing, Receipt, User, Bed, Droplets, Plus } from 'lucide-react';

const PhoneFrame = ({ children, caption }: { children: React.ReactNode, caption: string }) => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative w-[300px] h-[600px] bg-white rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] border-[10px] border-slate-900 overflow-hidden shrink-0">
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-slate-900 rounded-full z-50"></div>
      <div className="h-full w-full overflow-hidden bg-white">
        {children}
      </div>
    </div>
    <p className="text-slate-600 text-center font-bold text-lg max-w-[280px]">
      {caption}
    </p>
  </div>
);

const HotelmolIs = () => {
  return (
    <section className="py-24 bg-[#F7F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl lg:text-[45px] font-extrabold text-slate-800 text-center mb-16 tracking-tight">
          hotelmol — это...
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 place-items-center">
          
          {/* Screen 1: Online Menu (index.html3) */}
          <PhoneFrame caption="Онлайн меню">
            <div className="flex flex-col h-full font-sans text-slate-900 text-[10px]">
                <div className="pt-8 px-3 pb-2 border-b border-slate-100 flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <ArrowLeft className="size-3" />
                    </div>
                    <div className="flex-1 bg-slate-100 rounded-lg px-2 py-1 flex items-center gap-1">
                        <Search className="size-3 text-slate-400" />
                        <span className="text-slate-400">Search...</span>
                    </div>
                </div>
                <div className="p-3 space-y-4 overflow-y-auto no-scrollbar">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full whitespace-nowrap">All Dishes</span>
                        <span className="px-3 py-1 bg-white border border-slate-200 rounded-full whitespace-nowrap">Appetizers</span>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC720mJdCE3xcT7c8owH7jUbAL8aHSB09xsGRmtBtCDOB2VX5Fe82NYo8mgKp31eJycx-MpG7uQfo_XOD2BrjEB8_NM_WAcvlhvGWOI2lI_OT8c3WwakHabxBxmrMSiyFA841322c7pcLb4tb5JEIr7pDerg3o1WVpDQ8usT68WppyVlRH3JijH1rhainiyIT4-tQ_TbR7antRnNs3AtfhNJU8MN-_WwSm6zdB3D_reAkwio3zV4xMOhp7LvDQMAkH2Bf-5k4nsNNu4" className="w-full h-24 object-cover" />
                        <div className="p-2">
                            <div className="flex justify-between font-bold">
                                <span>Truffle Risotto</span>
                                <span className="text-blue-600">$45.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9q1q1DB9m_4trG-Bycj-ZBPnD1hG5DDOEfBBcAqXtKYMn-8alPqrpzWw-vhs18lid7WgpO2lAeFgRbNPC0CiDkTDE9pCyr_IUHGsqwd-ZsYFDTyGFvEjWo7W9KcLu_C_kj6JklICIZpDy22cQs8TjDeZ4Cl98EcUo6bGhVk1qKc6MOKuzVp7jTFHtbeMDY1eI2nCGnwC-Dl0jfot9r_KP7GFes2GRYmeqhMHSi5RvDoK85oASlF-v5GzdZndZNVQZZxUz26gGmQ-7" className="w-full h-24 object-cover" />
                        <div className="p-2">
                            <div className="flex justify-between font-bold">
                                <span>A5 Wagyu Steak</span>
                                <span className="text-blue-600">$120.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoelgNvrBi-WtNBkRNlQGgexYCtWUaCR7iEaUtv8IMPwJojroZIp6HY1v30LAHpYGqrjo4yWPAzVpXLy7I2I_hjEvclJtKVBKnbF0wPkxAdA0C25cMbHjgtYsaFub6EN_UNrdcSycJ7NRBcWLZ0yvy5b9M_r9c5l6rpF7lMiQZ9a8KTwRMGrhz-I4WI3U-9_lMPKMXIp-oyK3HcnTmVqrs0GQ7xUhste40N1VayeQbrs0r62dvlqxTB_mOma5vwva9qcokwWzXLFqL" className="w-full h-24 object-cover" />
                        <div className="p-2">
                            <div className="flex justify-between font-bold">
                                <span>Hokkaido Scallops</span>
                                <span className="text-blue-600">$55.00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-auto p-3">
                    <div className="bg-blue-600 text-white rounded-xl p-2 flex justify-between items-center shadow-lg shadow-blue-200">
                        <div className="flex items-center gap-1">
                            <ShoppingBasket className="size-3" />
                            <span>3 items</span>
                        </div>
                        <span className="font-bold">$210.00</span>
                    </div>
                </div>
                <div className="p-3 pb-4">
                    <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-slate-100 p-2 flex justify-around">
                        <Home className="size-4 text-slate-400" />
                        <BellRing className="size-4 text-blue-600" />
                        <Receipt className="size-4 text-slate-400" />
                        <User className="size-4 text-slate-400" />
                    </div>
                </div>
            </div>
          </PhoneFrame>

          {/* Screen 2: Task Management (index.html4) */}
          <PhoneFrame caption="Task Management система">
            <div className="flex flex-col h-full bg-[#f4f5f7] font-sans text-slate-900 text-[10px]">
                <header className="pt-8 px-4 pb-2 flex items-center justify-between">
                    <div className="size-6 bg-slate-200 flex items-center justify-center rounded-full">
                        <ArrowLeft className="size-3" />
                    </div>
                    <h1 className="text-blue-700 font-bold uppercase tracking-tight">Housekeeping</h1>
                    <div className="size-6 text-slate-400">?</div>
                </header>
                <main className="p-4 space-y-3">
                    <div className="bg-white p-3 rounded-xl flex items-center justify-between border-2 border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="size-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                <ClipboardList className="size-4" />
                            </div>
                            <div>
                                <p className="font-bold">Fresh Towels</p>
                                <p className="text-[8px] text-slate-400">Set of 2 Cotton Towels</p>
                            </div>
                        </div>
                        <CheckCircle2 className="size-4 text-emerald-500" />
                    </div>
                    <div className="bg-white p-3 rounded-xl flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="size-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                <Smartphone className="size-4" />
                            </div>
                            <div>
                                <p className="font-bold">Room Cleaning</p>
                                <p className="text-[8px] text-slate-400">Complete deep clean</p>
                            </div>
                        </div>
                        <div className="size-4 rounded-full bg-slate-100 flex items-center justify-center"><Plus className="size-3 text-slate-400" /></div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-xl flex items-center justify-between border-2 border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="size-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                <Bed className="size-4" />
                            </div>
                            <div>
                                <p className="font-bold">Extra Pillows</p>
                                <p className="text-[8px] text-slate-400">Hypoallergenic foam</p>
                            </div>
                        </div>
                        <CheckCircle2 className="size-4 text-emerald-500" />
                    </div>

                    <div className="bg-white p-3 rounded-xl flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="size-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                <Droplets className="size-4" />
                            </div>
                            <div>
                                <p className="font-bold">Toiletries Refill</p>
                                <p className="text-[8px] text-slate-400">Luxury soaps & shampoos</p>
                            </div>
                        </div>
                        <div className="size-4 rounded-full bg-slate-100 flex items-center justify-center"><Plus className="size-3 text-slate-400" /></div>
                    </div>
                    <div className="mt-8">
                        <h3 className="font-bold mb-2">Ask AI Agent</h3>
                        <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 border border-slate-200 flex items-center">
                            <span className="text-slate-400 flex-1 px-2">Tell AI what you need...</span>
                            <div className="size-6 bg-blue-600 rounded-full flex items-center justify-center text-white">→</div>
                        </div>
                    </div>
                </main>
                <div className="mt-auto p-4 space-y-2">
                    <div className="bg-white rounded-xl p-2 border border-slate-100 flex items-center justify-between font-bold shadow-sm">
                        <div>
                            <p className="text-[7px] text-slate-400 uppercase">Cart Total</p>
                            <p>2 Items</p>
                        </div>
                        <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-[8px]">Place Order →</div>
                    </div>
                    <div className="bg-white rounded-full p-1.5 flex justify-around shadow-lg">
                        <div className="flex items-center gap-1 text-slate-400"><Home className="size-4" /></div>
                        <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full"><BellRing className="size-4" /> <span className="text-[7px] font-bold">SERVICES</span></div>
                        <div className="flex items-center gap-1 text-slate-400"><Receipt className="size-4" /></div>
                        <div className="flex items-center gap-1 text-slate-400"><User className="size-4" /></div>
                    </div>
                </div>
            </div>
          </PhoneFrame>

          {/* Screen 3: Loyalty Program (index.html5) */}
          <PhoneFrame caption="Программа лояльности">
            <div className="flex flex-col h-full bg-white font-sans text-slate-900 text-[10px]">
                <header className="pt-8 px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <ArrowLeft className="size-4 text-slate-600" />
                    <h1 className="text-blue-700 font-extrabold uppercase tracking-tight">Membership Tiers</h1>
                    <div className="size-4 text-slate-400">?</div>
                </header>
                <main className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <p className="text-[7px] text-slate-400 uppercase font-bold">Tier Level</p>
                            <p className="text-lg font-extrabold">Gold</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <p className="text-[7px] text-slate-400 uppercase font-bold">Points</p>
                            <p className="text-lg font-extrabold">9,450</p>
                        </div>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FDF4F0] to-[#E7D0C5] p-3 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="bg-white/40 px-2 rounded-full text-[6px] font-black uppercase tracking-widest text-orange-900 border border-white/50">Level 01</span>
                            <h3 className="text-orange-950 text-sm font-black">Bronze</h3>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1 text-orange-900"><CheckCircle2 className="size-2 opacity-50" /> <span className="text-[8px] font-semibold">Standard Free Wi-Fi</span></div>
                            <div className="flex items-center gap-1 text-orange-900"><CheckCircle2 className="size-2 opacity-50" /> <span className="text-[8px] font-semibold">Member-Only Rates</span></div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F1F2F4] to-[#E2E4E9] p-3 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="bg-white/40 px-2 rounded-full text-[6px] font-black uppercase tracking-widest text-slate-700 border border-white/50">Level 02</span>
                            <h3 className="text-slate-900 text-sm font-black">Silver</h3>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1 text-slate-700"><CheckCircle2 className="size-2 opacity-50" /> <span className="text-[8px] font-bold">All Bronze Benefits</span></div>
                            <div className="flex items-center gap-1 text-slate-700"><CheckCircle2 className="size-2 opacity-50" /> <span className="text-[8px] font-semibold">High-Speed Wi-Fi</span></div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-200 p-3 ring-1 ring-amber-300 shadow-md">
                        <div className="flex justify-between items-center mb-2">
                            <span className="bg-white/70 px-2 rounded-full text-[6px] font-black uppercase tracking-widest text-amber-900 border border-white/80">Active Now</span>
                            <h3 className="text-amber-950 text-lg font-black">Gold</h3>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1 text-amber-950"><CheckCircle2 className="size-2 opacity-60" /> <span className="text-[8px] font-bold">All Silver Benefits</span></div>
                            <div className="flex items-center gap-1 text-amber-950"><CheckCircle2 className="size-2 opacity-60" /> <span className="text-[8px] font-semibold">Late Checkout (2 PM)</span></div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-slate-50 p-3 opacity-80 border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[6px] font-black uppercase tracking-widest text-slate-500">Level 04</span>
                            <h3 className="text-slate-800 text-sm font-black">Platinum</h3>
                        </div>
                        <div className="h-1 w-full bg-slate-200 rounded-full mt-2">
                            <div className="h-full bg-blue-600 w-[63%] rounded-full"></div>
                        </div>
                    </div>
                </main>
                <div className="mt-auto p-4">
                    <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-slate-100 p-2 flex justify-around">
                        <Home className="size-4 text-slate-400" />
                        <BellRing className="size-4 text-slate-400" />
                        <Receipt className="size-4 text-slate-400" />
                        <User className="size-4 text-blue-600" />
                    </div>
                </div>
            </div>
          </PhoneFrame>

        </div>
      </div>
    </section>
  );
};

export default HotelmolIs;
