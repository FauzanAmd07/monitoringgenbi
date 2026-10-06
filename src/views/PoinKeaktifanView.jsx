import React, { useState } from 'react';
import { 
  Trophy, Award, Crown, Sparkles, Zap, Star, ShieldCheck, 
  TrendingUp, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { DEPUTI_LIST } from '../data/mockData';

export default function PoinKeaktifanView({ currentUser, users }) {
  const userScore = currentUser?.points || 128;
  const userRank = currentUser?.rank || '04';

  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' | 'badges' | 'history'

  const pointActivities = [
    { id: 1, title: 'Presensi Rapat Koordinasi Deputi Multimedia #4', category: 'Presensi Rapat', date: '28 Sep 2026', points: '+15 Poin', status: 'Terverifikasi' },
    { id: 2, title: 'Penyetoran Proposal Workshop Desain Konten', category: 'Penyetoran Berkas', date: '20 Sep 2026', points: '+25 Poin', status: 'Terverifikasi' },
    { id: 3, title: 'Kehadiran Sosialisasi QRIS Bank Indonesia', category: 'Kegiatan Wajib', date: '15 Sep 2026', points: '+30 Poin', status: 'Terverifikasi' },
    { id: 4, title: 'Kepanitiaan GenBI Mengajar - Divisi Acara', category: 'Kepanitiaan', date: '10 Sep 2026', points: '+40 Poin', status: 'Terverifikasi' },
    { id: 5, title: 'Penyetoran LPJ Konsumsi & Perlengkapan', category: 'Penyetoran Berkas', date: '05 Sep 2026', points: '+18 Poin', status: 'Terverifikasi' }
  ];

  const badges = [
    { id: 1, name: 'Master of Proker', desc: 'Menuntaskan minimal 3 program kerja tepat waktu', icon: '🏆', unlocked: true, tier: 'GOLD' },
    { id: 2, name: 'Punctual King', desc: '100% presensi rapat tanpa pernah terlambat', icon: '⚡', unlocked: true, tier: 'DIAMOND' },
    { id: 3, name: 'CBP Specialist', desc: 'Edukator Cinta Bangga Paham Rupiah terakreditasi', icon: '💎', unlocked: true, tier: 'PLATINUM' },
    { id: 4, name: 'Social Impact Hero', desc: 'Memimpin aksi sosial kemasyarakatan GenBI', icon: '🌟', unlocked: false, tier: 'LOCKED' },
    { id: 5, name: 'Vault Keeper', desc: 'Mengarsipkan seluruh dokumen LPJ tanpa revisi', icon: '🛡️', unlocked: false, tier: 'LOCKED' }
  ];

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const top1 = sortedUsers[0] || { name: 'Ahmad Fauzan', points: 145, deputiId: 'multimedia' };
  const top2 = sortedUsers[1] || { name: 'Siti Rahma', points: 138, deputiId: 'pendidikan' };
  const top3 = sortedUsers[2] || { name: 'Muh. Ikhsan', points: 130, deputiId: 'lingkungan' };

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* ─── THEMED HERO: ESPORTS CHAMPIONSHIP ARENA & HALL OF FAME ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-amber-950 via-slate-900 to-yellow-950 text-white shadow-2xl border border-amber-800/40">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-amber-500/25 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-60 h-60 rounded-full bg-yellow-400/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
              <Crown size={14} className="text-amber-400 fill-current animate-bounce" />
              HALL OF FAME • GENBI GAMIFICATION ARENA
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Poin Keaktifan & Leaderboard
            </h1>
            <p className="text-xs md:text-sm text-amber-200/80 leading-relaxed">
              Penghargaan kontribusi mahasiswa penerima beasiswa Bank Indonesia. Kumpulkan poin dari presensi rapat, kepengurusan proker, dan ketepatan LPJ.
            </p>
          </div>

          {/* User Score Card Badge */}
          <div className="bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 flex items-center gap-5 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center font-black text-2xl shadow-xl shadow-amber-500/20">
              #{userRank}
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-300">Peringkat Keaktifanmu</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-white">{userScore}</span>
                <span className="text-xs text-amber-300 font-bold">/ 150 Poin</span>
              </div>
              <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                <TrendingUp size={12} /> +18 Poin bulan ini (PRIME)
              </p>
            </div>
          </div>
        </div>

        {/* Level Rank Stepper */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-300 font-bold">Level Saat Ini: <strong className="text-white">Anggota Aktif Unggul</strong></span>
            <span className="text-amber-200 font-mono font-bold">{Math.round((userScore/150)*100)}% Menuju Tier Duta Teladan</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, Math.round((userScore/150)*100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── 3D CHAMPIONSHIP PODIUM (TOP 3) ─── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            Podium Kehormatan Tiga Besar Periode Ganjil
          </h2>
          <span className="text-xs font-bold text-slate-500">
            Diperbarui Real-time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-end">
          {/* 2nd Place Silver */}
          <div className="order-2 md:order-1 bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-between space-y-4 hover:shadow-lg transition-all">
            <div className="space-y-1">
              <span className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-black mx-auto text-sm shadow-inner">
                #2
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-2">{top2.name}</h3>
              <p className="text-[11px] text-slate-500 uppercase font-semibold">Deputi {top2.deputiId || 'Pendidikan'}</p>
            </div>
            <div className="w-full py-2.5 rounded-2xl bg-slate-200 text-slate-800 font-black text-lg">
              {top2.points} Poin
            </div>
          </div>

          {/* 1st Place Gold Champion */}
          <div className="order-1 md:order-2 podium-gold p-8 rounded-3xl text-center flex flex-col items-center justify-between space-y-4 shadow-xl relative overflow-hidden scale-105">
            <div className="crown-float text-3xl">👑</div>
            <div className="space-y-1">
              <span className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black mx-auto text-base shadow-lg">
                #1
              </span>
              <h3 className="text-base font-black text-slate-950 mt-2">{top1.name}</h3>
              <p className="text-xs text-amber-900 uppercase font-black">Deputi {top1.deputiId || 'Multimedia'}</p>
            </div>
            <div className="w-full py-3 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl shadow-md">
              {top1.points} Poin
            </div>
          </div>

          {/* 3rd Place Bronze */}
          <div className="order-3 md:order-3 bg-amber-50/50 p-6 rounded-3xl border border-amber-200 text-center flex flex-col items-center justify-between space-y-4 hover:shadow-lg transition-all">
            <div className="space-y-1">
              <span className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-black mx-auto text-sm shadow-inner">
                #3
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-2">{top3.name}</h3>
              <p className="text-[11px] text-slate-500 uppercase font-semibold">Deputi {top3.deputiId || 'Lingkungan'}</p>
            </div>
            <div className="w-full py-2.5 rounded-2xl bg-amber-200 text-amber-950 font-black text-lg">
              {top3.points} Poin
            </div>
          </div>
        </div>
      </div>

      {/* ─── TAB NAVIGATION: BADGES & RIWAYAT POIN ─── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'leaderboard' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600'
              }`}
            >
              Klasemen Lengkap
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'badges' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600'
              }`}
            >
              Lencana / Badges ({badges.filter(b => b.unlocked).length}/{badges.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'history' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-600'
              }`}
            >
              Riwayat Poin Saya
            </button>
          </div>
        </div>

        {/* VIEW 1: FULL LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-2">
            {sortedUsers.map((u, i) => (
              <div
                key={u.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  u.id === currentUser.id 
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30' 
                    : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                    #{i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{u.name}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{u.roleTitle} • {u.deputiId || 'BPH'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-amber-600">{u.points} Poin</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: BADGES SHOWCASE */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map(b => (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  b.unlocked 
                    ? 'bg-amber-50/40 border-amber-200' 
                    : 'bg-slate-50 border-slate-200 opacity-50'
                }`}
              >
                <span className="text-3xl shrink-0">{b.icon}</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-slate-900">{b.name}</h4>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      {b.tier}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{b.desc}</p>
                  <p className="text-[10px] font-bold text-emerald-600 pt-1">
                    {b.unlocked ? '✓ Telah Terbuka' : '🔒 Belum Memenuhi Syarat'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: USER HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-2">
            {pointActivities.map(a => (
              <div
                key={a.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">{a.title}</p>
                  <p className="text-[10px] text-slate-400">{a.category} • {a.date}</p>
                </div>
                <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {a.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
