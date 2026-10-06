import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Clock, MapPin, Users, ChevronLeft, ChevronRight, 
  Sparkles, CheckCircle2, AlertCircle, Compass, Share2, Plus, X, ArrowRight
} from 'lucide-react';
import { DEPUTI_LIST } from '../data/mockData';

export default function KalenderView({ programs }) {
  const [currentMonth, setCurrentMonth] = useState('Oktober 2026');
  const [filterDeputi, setFilterDeputi] = useState('ALL');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'stream'
  const [showAddModal, setShowAddModal] = useState(false);

  const [events, setEvents] = useState([
    { 
      id: 1, day: 3, title: 'Rapat Kerja Wilayah & Koordinasi BPH', 
      time: '09:00 - 12:00 WITA', deputi: 'BPH GenBI', color: '#3b82f6', 
      location: 'Ruang Rapat Utama Lt. 3 Bank Indonesia', 
      category: 'Rapat Pleno', countdown: 'Sedang Berlangsung Hari Ini',
      notes: 'Pembahasan sinkronisasi kalender proker semester ganjil dan evaluasi serapan anggaran.'
    },
    { 
      id: 2, day: 5, title: 'Workshop Desain Konten & Social Media Branding', 
      time: '13:30 - 16:30 WITA', deputi: 'Multimedia', color: '#8b5cf6', 
      location: 'Lab Multimedia & Komputer Kampus UNM Gunungsari', 
      category: 'Workshop', countdown: '2 Hari Lagi',
      notes: 'Wajib membawa laptop dengan software Figma atau Adobe Photoshop terinstall.'
    },
    { 
      id: 3, day: 9, title: 'Tenggat LPJ Workshop Desain & Finansial', 
      time: '23:59 WITA', deputi: 'Multimedia', color: '#ef4444', 
      location: 'Portal Penyetoran Berkas Digital', 
      category: 'Deadline Berkas', countdown: '6 Hari Lagi',
      notes: 'Batas akhir unggah nota kuitansi bermaterai dan daftar hadir 45 peserta.'
    },
    { 
      id: 4, day: 12, title: 'Sosialisasi CBP Rupiah & Edukasi QRIS', 
      time: '08:00 - 13:00 WITA', deputi: 'Pendidikan', color: '#10b981', 
      location: 'Pasar Tradisional Pa\'baeng-baeng Makassar', 
      category: 'Sosialisasi Lapangan', countdown: '9 Hari Lagi',
      notes: 'Pendampingan pedagang pasar beralih ke transaksi nontunai QRIS resmi BI.'
    },
    { 
      id: 5, day: 19, title: 'GenBI Mengajar: Literasi Keuangan Usia Dini', 
      time: '09:00 - 12:00 WITA', deputi: 'Pendidikan', color: '#f59e0b', 
      location: 'SD Inpres Batua Raya', 
      category: 'Pengabdian', countdown: '16 Hari Lagi',
      notes: 'Pemberian materi menabung cerdas dan pengenalan ciri keaslian uang Rupiah.'
    },
    { 
      id: 6, day: 25, title: 'Aksi Bersih Pantai & Konservasi Mangrove', 
      time: '06:30 - 11:00 WITA', deputi: 'Lingkungan', color: '#06b6d4', 
      location: 'Pesisir Pantai Tanjung Bayang', 
      category: 'Aksi Lingkungan', countdown: '22 Hari Lagi',
      notes: 'Kolaborasi komunitas peduli lingkungan dan penanaman 200 bibit mangrove.'
    },
    { 
      id: 7, day: 30, title: 'Rapat Pleno Evaluasi Kinerja Bulanan', 
      time: '19:30 - 22:00 WITA', deputi: 'BPH GenBI', color: '#6366f1', 
      location: 'Online Zoom Cloud Meeting BI', 
      category: 'Evaluasi', countdown: '27 Hari Lagi',
      notes: 'Laporan progres masing-masing kordep dan audit kuota kehadiran anggota.'
    }
  ]);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const filteredEvents = events.filter(e => {
    if (filterDeputi !== 'ALL' && e.deputi !== filterDeputi) return false;
    if (selectedDay !== null && e.day !== selectedDay) return false;
    return true;
  });

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* ─── THEMED HERO: EVENT HORIZON & SCHEDULE STUDIO ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white shadow-2xl border border-emerald-800/40">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-24 w-60 h-60 rounded-full bg-teal-400/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
              <Compass size={14} className="text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
              DYNAMIC SCHEDULE STUDIO • TIMEZONE: WITA (MAKASSAR)
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Event Horizon & Kalender
            </h1>
            <p className="text-xs md:text-sm text-emerald-200/80 leading-relaxed">
              Jadwal tersinkronisasi kegiatan kepengurusan, webinar Bank Indonesia, audit berkas, dan agenda lapangan. Setiap agenda terhubung dengan presensi QR otomatis.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-4 border-r border-white/10">
              <p className="text-[10px] uppercase font-bold text-emerald-300">Agenda Bulan Ini</p>
              <p className="text-2xl font-black text-white">{events.length}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-[10px] uppercase font-bold text-emerald-300">Kegiatan Hari Ini</p>
              <p className="text-2xl font-black text-amber-400">1 Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONTROLS & MONTH SELECTOR ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setCurrentMonth('September 2026')}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 text-xs font-black text-emerald-800 uppercase tracking-wider">{currentMonth}</span>
            <button 
              onClick={() => setCurrentMonth('November 2026')}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button 
            onClick={() => { setSelectedDay(null); setCurrentMonth('Oktober 2026'); }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
          >
            Hari Ini (Tgl 3)
          </button>
        </div>

        {/* Deputi Filter & View Mode */}
        <div className="flex items-center gap-3">
          <select 
            value={filterDeputi} 
            onChange={(e) => setFilterDeputi(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 border-0 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">Semua Deputi & BPH</option>
            <option value="BPH GenBI">BPH GenBI</option>
            <option value="Multimedia">Multimedia</option>
            <option value="Pendidikan">Pendidikan</option>
            <option value="Lingkungan">Lingkungan</option>
          </select>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'calendar' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              Grid Bulan
            </button>
            <button
              onClick={() => setViewMode('stream')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'stream' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              Stream Agenda
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition-all"
          >
            <Plus size={15} />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {/* ─── VIEW 1: INTERACTIVE 3D MONTH GRID ─── */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main 7x5 Calendar Grid */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4">
            {/* Days of week header */}
            <div className="grid grid-cols-7 text-center text-xs font-black uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d, i) => (
                <span key={d} className={i === 0 ? 'text-rose-500' : ''}>{d}</span>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Padding for Thursday start in Oct 2026 */}
              <div className="h-20 sm:h-24 rounded-2xl bg-slate-50/50 opacity-40"></div>
              <div className="h-20 sm:h-24 rounded-2xl bg-slate-50/50 opacity-40"></div>
              <div className="h-20 sm:h-24 rounded-2xl bg-slate-50/50 opacity-40"></div>
              <div className="h-20 sm:h-24 rounded-2xl bg-slate-50/50 opacity-40"></div>

              {daysInMonth.map(day => {
                const dayEvents = events.filter(e => e.day === day);
                const isToday = day === 3;
                const isSelected = selectedDay === day;

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                    className={`h-20 sm:h-24 p-2 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/30'
                        : isToday
                        ? 'border-emerald-500 bg-emerald-50/30 shadow-sm'
                        : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isToday ? 'bg-emerald-600 text-white font-black' : 'text-slate-700'
                      }`}>
                        {day}
                      </span>
                      {isToday && (
                        <span className="hidden sm:inline-block text-[9px] font-black text-emerald-600 uppercase">Hari Ini</span>
                      )}
                    </div>

                    {/* Event indicators */}
                    <div className="space-y-1 overflow-hidden">
                      {dayEvents.map(e => (
                        <div
                          key={e.id}
                          onClick={(ev) => { ev.stopPropagation(); setSelectedEvent(e); }}
                          className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white truncate shadow-xs cursor-pointer hover:opacity-90"
                          style={{ backgroundColor: e.color }}
                          title={e.title}
                        >
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side Agenda Stream for Selected Day or Month */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <CalendarIcon size={16} className="text-emerald-600" />
                  {selectedDay ? `Agenda Tanggal ${selectedDay} Oktober` : 'Agenda Terdekat'}
                </h3>
                {selectedDay && (
                  <button 
                    onClick={() => setSelectedDay(null)}
                    className="text-xs text-emerald-600 font-bold hover:underline"
                  >
                    Lihat Semua
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-3">
                {filteredEvents.map(e => (
                  <div
                    key={e.id}
                    onClick={() => setSelectedEvent(e)}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group bg-slate-50/50"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span 
                        className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: e.color }}
                      >
                        {e.deputi}
                      </span>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {e.countdown}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {e.title}
                    </h4>

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                      <Clock size={12} className="text-slate-400" />
                      <span>{e.time}</span>
                    </div>
                  </div>
                ))}

                {filteredEvents.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                    Tidak ada agenda untuk filter ini.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Helper */}
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
              <Sparkles size={18} className="text-emerald-600 shrink-0" />
              <p className="text-[11px] text-emerald-900 font-medium leading-relaxed">
                Setiap kehadiran di agenda rapat otomatis menambah <strong>+15 Poin</strong> ke profil keaktifanmu.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── VIEW 2: STREAM AGENDAS WITH LIVE COUNTDOWN ─── */}
      {viewMode === 'stream' && (
        <div className="space-y-4">
          {events.map(e => (
            <div
              key={e.id}
              onClick={() => setSelectedEvent(e)}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 font-black shadow-md"
                  style={{ backgroundColor: e.color }}
                >
                  <span className="text-lg leading-none">{e.day}</span>
                  <span className="text-[9px] uppercase tracking-wider">OKT</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {e.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      • {e.deputi}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{e.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock size={13} /> {e.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={13} /> {e.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-extrabold">
                  ⏱️ {e.countdown}
                </span>
                <span className="p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── MODAL DETAIL EVENT ─── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span 
                  className="px-3 py-1 rounded-full text-xs font-bold text-white mb-2 inline-block"
                  style={{ backgroundColor: selectedEvent.color }}
                >
                  {selectedEvent.deputi}
                </span>
                <h3 className="text-xl font-black text-slate-900">{selectedEvent.title}</h3>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-800">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CalendarIcon size={14} className="text-emerald-600" />
                <span>Tanggal: <strong>{selectedEvent.day} Oktober 2026</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock size={14} className="text-emerald-600" />
                <span>Waktu: <strong>{selectedEvent.time}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin size={14} className="text-emerald-600" />
                <span>Lokasi: <strong>{selectedEvent.location}</strong></span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-700">Catatan Khusus Panitia:</p>
              <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                {selectedEvent.notes}
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => alert('Jadwal berhasil diekspor ke format kalender .ics')}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
              >
                Sync ke Google Calendar
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL TAMBAH AGENDA ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Tambah Agenda Kegiatan</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 text-slate-400 hover:text-slate-800">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Nama Agenda</label>
                <input type="text" placeholder="Misal: Pelatihan Public Speaking BI" className="w-full mt-1 p-2.5 rounded-xl border border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700">Tanggal</label>
                  <input type="date" className="w-full mt-1 p-2.5 rounded-xl border border-slate-200" />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Waktu</label>
                  <input type="text" placeholder="09:00 - 12:00 WITA" className="w-full mt-1 p-2.5 rounded-xl border border-slate-200" />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700">Lokasi</label>
                <input type="text" placeholder="Kantor Perwakilan BI Sulsel" className="w-full mt-1 p-2.5 rounded-xl border border-slate-200" />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600">Batal</button>
              <button 
                onClick={() => {
                  alert('Agenda baru berhasil ditambahkan ke kalender terpadu!');
                  setShowAddModal(false);
                }} 
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Simpan Agenda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
