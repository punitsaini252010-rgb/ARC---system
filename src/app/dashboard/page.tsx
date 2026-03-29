// app/dashboard/page.tsx
"use client";
import { motion } from 'framer-motion';
import AliveDesert from '@/components/world/AliveDesert';

const RANK_LEVELS =;

export default function ARCOperatingSystem() {
  return (
    <main className="relative min-h-screen overflow-hidden text-amber-950">
      <AliveDesert />

      <div className="relative z-10 grid grid-cols-12 gap-6 p-10 max-w-screen-2xl mx-auto h-screen">
        {/* Navigation (Whop Dynamic) */}
        <div className="col-span-1 bg-white/10 backdrop-blur-2xl rounded-[60px] p-6 border border-white/20 flex flex-col items-center gap-12 shadow-xl">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-glow border-4 border-white" />
          <div className="space-y-10 mt-6">
             <div className="w-10 h-10 bg-amber-900/10 rounded-2xl hover:bg-amber-400 transition-colors cursor-pointer" />
             <div className="w-10 h-10 bg-amber-900/10 rounded-2xl hover:bg-amber-400 transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Community Feed (Skool/Forum Style) */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="col-span-7">
          <div className="p-10 rounded-[50px] bg-white/15 backdrop-blur-3xl border border-white/30 shadow-2xl h-[85vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-10">Oasis Command</h2>
            <div className="space-y-8">
              <div className="p-8 bg-white/20 rounded-[35px] border border-white/20 hover:scale-[1.02] transition-transform">
                <p className="font-bold text-xl leading-relaxed">
                  "Season 1 just went live. Top 10 users this week unlock the Mythic Sand Crate. Start your engine."
                </p>
                <div className="mt-6 flex gap-4">
                  <span className="px-5 py-2 bg-amber-900 text-amber-100 rounded-full text-sm font-black">DROP LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ranked Leaderboard (PUBG Progression) */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="col-span-4 space-y-6">
          <div className="p-10 rounded-[50px] bg-white/20 backdrop-blur-3xl border border-white/30 shadow-2xl">
            <h3 className="text-2xl font-black uppercase text-amber-700 tracking-widest mb-8">Matchmaking</h3>
            <div className="space-y-6">
              {RANK_LEVELS.map((user, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-amber-900/5 rounded-3xl border border-amber-900/10">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{user.icon}</span>
                    <div>
                      <p className="font-black text-lg">{user.name}</p>
                      <p className="text-xs font-bold text-amber-600 tracking-widest">{user.rank}</p>
                    </div>
                  </div>
                  <span className="text-xl font-black">{user.stats}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-12 py-5 bg-amber-900 text-amber-100 rounded-[30px] font-black uppercase shadow-2xl hover:bg-amber-400 hover:text-amber-950 transition-all active:scale-95">
              Enter Battlezone
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

  
