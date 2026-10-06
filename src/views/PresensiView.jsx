import React, { useState, useEffect } from 'react';
import { 
  QrCode, Clock, CheckCircle2, UserCheck, X, Sparkles, 
  MapPin, Radio, AlertCircle, ShieldCheck, Check, Plus, Calendar
} from 'lucide-react';
import { DEPUTI_LIST } from '../data/mockData';

export default function PresensiView({ currentUser, users, setUsers, meetings, setMeetings }) {
  const active = meetings.find(m => m.status === 'BERLANGSUNG');
  const [countdown, setCountdown] = useState(active?.expiresInSeconds || 720);
  const [showIzin, setShowIzin] = useState(false);
  const [izinReason, setIzinReason] = useState('');
  const [showBuatRapat, setShowBuatRapat] = useState(false);
  const [rapatForm, setRapatForm] = useState({
    title: '',
    date: new Date().toLocaleDateString('id-ID'),
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    location: 'KPw Bank Indonesia Sulsel',
    durasiMenit: 60
  });

  useEffect(() => {
    if (!active || countdown <= 0) return;
    const t = setInterval(() => setCountdown(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, [active, countdown]);

  const fmt = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const attended = active?.attendees.find(a => a.id === currentUser.id);

  const handlePresensi = () => {
    if (!active || attended) return;
    const pts = countdown > 0 ? 2 : 1;
    const entry = { 
      id: currentUser.id, 
      name: currentUser.name, 
      status: countdown > 0 ? 'HADIR' : 'TERLAMBAT', 
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), 
      pointsAdded: pts 
    };
    setMeetings(meetings.map(m => m.id === active.id ? { 
      ...m, 
      attendedCount: m.attendedCount + 1, 
      attendees: [entry, ...m.attendees] 
    } : m));
    setUsers(users.map(u => u.id === currentUser.id ? { 
      ...u, 
      points: u.points + pts 
    } : u));
  };

  const handleIzin = (e) => {
    e.preventDefault();
    if (!active) return;
    const entry = { 
      id: currentUser.id, 
      name: currentUser.name, 
      status: 'IZIN', 
      time: '-', 
      notes: izinReason, 
      pointsAdded: 0 
    };
    setMeetings(meetings.map(m => m.id === active.id ? { 
      ...m, 
      attendees: [entry, ...m.attendees] 
    } : m));
    setShowIzin(false); 
    setIzinReason('');
  };

  const handleBuatRapat = (e) => {
    e.preventDefault();
    // Akhiri rapat sebelumnya jika masih berlangsung
    const updatedMeetings = meetings.map(m =>
      m.status === 'BERLANGSUNG' ? { ...m, status: 'SELESAI' } : m
    );
    const token = 'GBI-' + Math.floor(1000 + Math.random() * 9000);
    const newMeeting = {
      id: `m-${Date.now()}`,
      title: rapatForm.title || 'Rapat Koordinasi Deputi MM',
      date: rapatForm.date,
      time: rapatForm.time,
      location: rapatForm.location,
      status: 'BERLANGSUNG',
      attendedCount: 0,
      attendees: [],
      qrToken: token,
      expiresInSeconds: (parseInt(rapatForm.durasiMenit) || 60) * 60
    };
    setMeetings([newMeeting, ...updatedMeetings]);
    setCountdown(newMeeting.expiresInSeconds);
    setShowBuatRapat(false);
    setRapatForm({
      title: '',
      date: new Date().toLocaleDateString('id-ID'),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      location: 'KPw Bank Indonesia Sulsel',
      durasiMenit: 60
    });
  };

  const handleAkhiriRapat = () => {
    if (!active) return;
    if (confirm(`Akhiri rapat "${active.title}"? Presensi akan ditutup.`)) {
      setMeetings(meetings.map(m =>
        m.id === active.id ? { ...m, status: 'SELESAI' } : m
      ));
    }
  };

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* ─── THEMED HERO: SMART BIOMETRIC & RADAR ATTENDANCE ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white shadow-2xl border border-emerald-800/40">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-60 h-60 rounded-full bg-teal-400/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
              <Radio size={14} className="text-emerald-400 animate-pulse" />
              SMART BIOMETRIC HUB • RADAR PRESENSI DIGITAL
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Presensi Rapat & Kegiatan
            </h1>
            <p className="text-xs md:text-sm text-emerald-200/80 leading-relaxed">
              Sistem presensi dinamis berbasis QR Code terenkripsi dan geolokasi Bank Indonesia. Setiap kehadiran tepat waktu otomatis menambah poin keaktifanmu.
            </p>
          </div>

      {/* Geofence + Tombol Buat Rapat untuk Admin/Ketua */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-emerald-300">Geofence Lokasi</p>
                <p className="text-xs font-bold text-white">KPw Bank Indonesia Sulsel</p>
                <span className="text-[10px] text-emerald-400 font-semibold">✓ Radius 45m (Valid Terdeteksi)</span>
              </div>
            </div>
            {currentUser.roleLevel <= 6 && (
              <button
                onClick={() => setShowBuatRapat(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Plus size={16} />
                {active ? 'Buat Rapat Baru' : 'Mulai Sesi Rapat'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── ACTIVE MEETING CONTAINER ─── */}
      {active && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QR Code Scanner Box with Laser Beam */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <Clock size={13} />
              <span>Sisa Waktu Sesi: {fmt(countdown)}</span>
            </div>

            {/* Glowing QR Box with Laser Scan Effect */}
            <div className="relative p-4 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 shadow-2xl overflow-hidden w-64 h-64 flex items-center justify-center">
              {/* Laser Line */}
              <div className="laser-scanner-line"></div>

              {/* High Contrast QR SVG */}
              <svg viewBox="0 0 100 100" width="180" height="180" className="relative z-10">
                <rect width="100" height="100" fill="#ffffff" rx="10" />
                <rect x="5" y="5" width="25" height="25" fill="#064e3b" />
                <rect x="9" y="9" width="17" height="17" fill="#ffffff" />
                <rect x="13" y="13" width="9" height="9" fill="#064e3b" />
                
                <rect x="70" y="5" width="25" height="25" fill="#064e3b" />
                <rect x="74" y="9" width="17" height="17" fill="#ffffff" />
                <rect x="78" y="13" width="9" height="9" fill="#064e3b" />
                
                <rect x="5" y="70" width="25" height="25" fill="#064e3b" />
                <rect x="9" y="74" width="17" height="17" fill="#ffffff" />
                <rect x="13" y="78" width="9" height="9" fill="#064e3b" />
                
                {/* Random QR Pattern Dots */}
                <rect x="36" y="12" width="8" height="6" fill="#064e3b" />
                <rect x="48" y="12" width="14" height="6" fill="#064e3b" />
                <rect x="36" y="24" width="10" height="8" fill="#064e3b" />
                <rect x="50" y="24" width="6" height="12" fill="#064e3b" />
                <rect x="40" y="44" width="20" height="14" fill="#064e3b" />
                <rect x="68" y="44" width="14" height="14" fill="#064e3b" />
                <rect x="36" y="70" width="10" height="14" fill="#064e3b" />
                <rect x="52" y="74" width="14" height="12" fill="#064e3b" />
                <rect x="72" y="74" width="18" height="14" fill="#064e3b" />
              </svg>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-semibold">Kode Token Alternatif:</p>
              <p className="font-mono text-2xl font-black text-emerald-800 tracking-wider">
                {active.qrToken || 'GBI-8820'}
              </p>
            </div>
          </div>

          {/* Action & Attendees Stream (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                    SEDANG BERLANGSUNG
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-2">{active.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {active.date} • {active.time} • {active.location}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400">Total Hadir</span>
                  <p className="text-2xl font-black text-emerald-600">{active.attendedCount} Anggota</p>
                </div>
              </div>

              {/* Status Member Attendance */}
              {attended ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-black text-emerald-950">Kehadiran Kamu Telah Tercatat!</p>
                      <p className="text-[11px] text-emerald-700">Waktu: {attended.time} • Status: {attended.status}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold">
                    +{attended.pointsAdded} Poin Diterima
                  </span>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-slate-800">Belum Tercatat Hadir</p>
                    <p className="text-[11px] text-slate-500">Klik tombol di samping untuk konfirmasi presensi mandiri.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowIzin(true)}
                      className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
                    >
                      Ajukan Izin / Sakit
                    </button>
                    <button
                      onClick={handlePresensi}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30"
                    >
                      Konfirmasi Hadir Sekarang
                    </button>
                  </div>
                </div>
              )}

              {/* Attendees Live Feed */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Daftar Hadir Terkini ({active.attendees.length})
                </h4>

                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-2">
                  {active.attendees.map(a => (
                    <div
                      key={a.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[11px]">
                          {a.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-bold text-slate-800">{a.name}</p>
                          <p className="text-[10px] text-slate-400">Tercatat: {a.time}</p>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        a.status === 'HADIR' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : a.status === 'IZIN'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL AJUKAN IZIN ─── */}
      {showIzin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Formulir Permohonan Izin / Sakit</h3>
              <button onClick={() => setShowIzin(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleIzin} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Alasan Tidak Dapat Hadir</label>
                <textarea
                  required
                  rows={3}
                  value={izinReason}
                  onChange={(e) => setIzinReason(e.target.value)}
                  placeholder="Misal: Sedang ada ujian tengah semester atau tugas luar kota..."
                  className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIzin(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
                >
                  Kirim Izin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── EMPTY STATE: Belum Ada Rapat Aktif ─── */}
      {!active && (
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200/90 flex flex-col items-center justify-center text-center space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center">
            <Calendar size={36} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800">Belum Ada Sesi Rapat Aktif</h3>
            <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Tidak ada rapat yang sedang berlangsung saat ini. 
              {currentUser.roleLevel <= 6 
                ? ' Klik tombol "Mulai Sesi Rapat" di atas untuk membuka sesi presensi baru.' 
                : ' Tunggu admin atau ketua memulai sesi rapat.'}
            </p>
          </div>
          {currentUser.roleLevel <= 6 && (
            <button
              onClick={() => setShowBuatRapat(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Plus size={18} />
              Mulai Sesi Rapat Baru
            </button>
          )}

          {/* Riwayat Rapat Terakhir */}
          {meetings.filter(m => m.status !== 'BERLANGSUNG').length > 0 && (
            <div className="w-full pt-4 border-t border-slate-100 space-y-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Riwayat Rapat Sebelumnya</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {meetings.filter(m => m.status !== 'BERLANGSUNG').slice(0, 5).map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="text-left">
                      <p className="font-bold text-slate-800">{m.title}</p>
                      <p className="text-slate-400">{m.date} • {m.location}</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-slate-200 text-slate-600 font-bold text-[10px]">
                      {m.attendedCount || m.attendees?.length || 0} Hadir
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tombol Akhiri Rapat (untuk admin/ketua saat rapat sedang berlangsung) */}
      {active && currentUser.roleLevel <= 6 && (
        <div className="flex justify-end">
          <button
            onClick={handleAkhiriRapat}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 text-red-600 hover:text-white font-bold text-xs transition-all cursor-pointer"
          >
            <X size={14} />
            Akhiri Sesi Rapat
          </button>
        </div>
      )}

      {/* ─── MODAL BUAT RAPAT BARU ─── */}
      {showBuatRapat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Buka Sesi Rapat Baru</h3>
                <p className="text-xs text-slate-500">Isi detail rapat untuk membuka sesi presensi</p>
              </div>
              <button onClick={() => setShowBuatRapat(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleBuatRapat} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Nama / Judul Rapat</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Rapat Koordinasi Bulanan Deputi MM"
                  value={rapatForm.title}
                  onChange={e => setRapatForm({ ...rapatForm, title: e.target.value })}
                  className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Tanggal</label>
                  <input
                    type="date"
                    value={rapatForm.date}
                    onChange={e => setRapatForm({ ...rapatForm, date: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Jam Mulai</label>
                  <input
                    type="time"
                    value={rapatForm.time}
                    onChange={e => setRapatForm({ ...rapatForm, time: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Lokasi Rapat</label>
                <input
                  type="text"
                  value={rapatForm.location}
                  onChange={e => setRapatForm({ ...rapatForm, location: e.target.value })}
                  className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Durasi Presensi (menit)</label>
                <select
                  value={rapatForm.durasiMenit}
                  onChange={e => setRapatForm({ ...rapatForm, durasiMenit: e.target.value })}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value={15}>15 menit</option>
                  <option value={30}>30 menit</option>
                  <option value={60}>60 menit (default)</option>
                  <option value={90}>90 menit</option>
                  <option value={120}>120 menit</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBuatRapat(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-md shadow-emerald-600/30 hover:bg-emerald-700 cursor-pointer"
                >
                  Mulai Sesi Presensi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
