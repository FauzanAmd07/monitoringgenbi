import React, { useState } from 'react';
import { 
  Bell, CheckCheck, Sparkles, AlertCircle, Clock, Award, 
  Calendar, HardDrive, ArrowRight, Trash2, Filter
} from 'lucide-react';

export default function NotifikasiView({ setCurrentTab }) {
  const [filterTab, setFilterTab] = useState('ALL');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Berkas LPJ Workshop Perlu Revisi',
      desc: 'Sekum GenBI: "Lampiran kuitansi belum distempel basah dan nota konsumsi kurang 1 lembar."',
      time: '15 menit yang lalu',
      category: 'berkas',
      unread: true,
      urgent: true,
      icon: AlertCircle,
      iconBg: 'bg-rose-100 text-rose-600',
      actionText: 'Buka Penyetoran Berkas',
      actionTab: 'berkas'
    },
    {
      id: 2,
      title: 'Pengingat Batas Penyetoran Berkas LPJ',
      desc: 'Tenggat penyetoran LPJ Kegiatan Periode Ganjil tersisa 4 hari lagi (Jumat, 9 Oktober 2026).',
      time: '1 jam yang lalu',
      category: 'berkas',
      unread: true,
      urgent: false,
      icon: Clock,
      iconBg: 'bg-amber-100 text-amber-600',
      actionText: 'Lihat Tenggat',
      actionTab: 'tugas'
    },
    {
      id: 3,
      title: 'Poin Keaktifan Diterbitkan (+30 Poin)',
      desc: 'Presensi Rapat Koordinasi Deputi #4 telah diverifikasi. Total poinmu kini 128 Poin.',
      time: '3 jam yang lalu',
      category: 'keaktifan',
      unread: true,
      urgent: false,
      icon: Award,
      iconBg: 'bg-purple-100 text-purple-600',
      actionText: 'Cek Poin',
      actionTab: 'poin'
    },
    {
      id: 4,
      title: 'Agenda Baru: Rapat Pleno Triwulan II',
      desc: 'BPH GenBI menjadwalkan Rapat Pleno Evaluasi pada hari Sabtu, 10 Oktober 2026 pukul 19:30 WITA.',
      time: 'Kemarin, 14:20 WITA',
      category: 'kegiatan',
      unread: false,
      urgent: false,
      icon: Calendar,
      iconBg: 'bg-blue-100 text-blue-600',
      actionText: 'Lihat Kalender',
      actionTab: 'kalender'
    },
    {
      id: 5,
      title: 'Pemberitahuan Kuota Google Drive',
      desc: 'Penyimpanan Drive GenBI terpakai 12.8 GB dari kuota gratis 15.0 GB (85%). Harap lakukan kompresi berkas.',
      time: '2 hari yang lalu',
      category: 'sistem',
      unread: false,
      urgent: false,
      icon: HardDrive,
      iconBg: 'bg-teal-100 text-teal-600',
      actionText: 'Lihat Kuota Drive',
      actionTab: 'storage'
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const filtered = notifications.filter(n => {
    if (filterTab === 'UNREAD') return n.unread;
    if (filterTab === 'BERKAS') return n.category === 'berkas';
    if (filterTab === 'KEGIATAN') return n.category === 'kegiatan';
    if (filterTab === 'KEAKTIFAN') return n.category === 'keaktifan';
    return true;
  });

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* ─── THEMED HERO: BROADCAST RADAR & SMART FEED ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-purple-800/40">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-60 h-60 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold tracking-wide">
              <Bell size={14} className="text-purple-400 animate-bounce" />
              SMART BROADCAST RADAR • PUSAT PEMBERITAHUAN
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Pusat Notifikasi & Agenda
            </h1>
            <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed">
              Peringatan tenggat LPJ, konfirmasi penerbitan poin keaktifan, jadwal rapat baru, dan catatan verifikasi berkas dari BPH.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10 cursor-pointer"
              >
                <CheckCheck size={16} />
                <span>Tandai Semua Dibaca</span>
              </button>
            )}
            <div className="bg-purple-600 px-4 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-purple-600/30">
              {unreadCount} Belum Dibaca
            </div>
          </div>
        </div>
      </div>

      {/* ─── FILTER TABS ─── */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-white shadow-sm border border-slate-200/80 overflow-x-auto">
        <button
          onClick={() => setFilterTab('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            filterTab === 'ALL' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Semua ({notifications.length})
        </button>
        <button
          onClick={() => setFilterTab('UNREAD')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            filterTab === 'UNREAD' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Belum Dibaca ({unreadCount})
        </button>
        <button
          onClick={() => setFilterTab('BERKAS')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            filterTab === 'BERKAS' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Berkas & LPJ
        </button>
        <button
          onClick={() => setFilterTab('KEGIATAN')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            filterTab === 'KEGIATAN' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Jadwal Kegiatan
        </button>
        <button
          onClick={() => setFilterTab('KEAKTIFAN')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            filterTab === 'KEAKTIFAN' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Poin Keaktifan
        </button>
      </div>

      {/* ─── NOTIFICATION FEED ITEMS ─── */}
      <div className="space-y-3">
        {filtered.map(n => {
          const IconComponent = n.icon;

          return (
            <div
              key={n.id}
              onClick={() => n.actionTab && setCurrentTab(n.actionTab)}
              className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group ${
                n.unread 
                  ? 'bg-white border-purple-300 shadow-md ring-1 ring-purple-400/20' 
                  : 'bg-white/80 border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${n.iconBg}`}>
                  <IconComponent size={22} />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {n.title}
                    </h3>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{n.desc}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">{n.time}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                {n.actionText && (
                  <span className="text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:underline">
                    <span>{n.actionText}</span>
                    <ArrowRight size={13} />
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => deleteNotification(n.id, e)}
                  className="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Hapus Notifikasi"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-2">
            <p className="text-sm font-bold text-slate-700">Tidak ada notifikasi dalam kategori ini.</p>
            <p className="text-xs text-slate-400">Semua pemberitahuan telah Anda tangani dengan baik.</p>
          </div>
        )}
      </div>
    </div>
  );
}
