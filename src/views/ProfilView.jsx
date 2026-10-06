import React, { useState } from 'react';
import { 
  User, Mail, Phone, School, Award, ShieldCheck, QrCode, 
  Download, Edit3, CheckCircle2, Sparkles, X, Share2, Star
} from 'lucide-react';

export default function ProfilView({ currentUser, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('kta'); // 'kta' | 'biodata' | 'beasiswa'
  const [formData, setFormData] = useState({
    name: currentUser.name || 'Ahmad Fauzan',
    email: currentUser.email || 'fauzan@student.unm.ac.id',
    phone: '0812-3456-7890',
    univ: 'Universitas Negeri Makassar (UNM)',
    major: 'Pendidikan Teknik Informatika & Komputer (2024)',
    memberId: 'GBI-UNM-2026-042',
    bio: 'Penerima Beasiswa Bank Indonesia Tahun 2026. Berdedikasi dalam transformasi digital, pengelolaan multimedia, dan sosialisasi QRIS.'
  });
  const [toast, setToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setCurrentUser({ ...currentUser, name: formData.name, email: formData.email });
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-md flex items-center justify-between text-emerald-950 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <span className="text-xs font-bold">Profil berhasil diperbarui dan disinkronkan ke basis data lokal.</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700">Tersimpan</span>
        </div>
      )}

      {/* ─── THEMED HERO: DIGITAL IDENTITY & HOLOGRAPHIC PASS ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-slate-800">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-60 h-60 rounded-full bg-blue-500/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles size={14} className="text-amber-400" />
              DIGITAL IDENTITY PASS • BEASISWA BANK INDONESIA
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Profil Anggota & KTA Digital
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Kartu Tanda Anggota (KTA) digital resmi Bank Indonesia Wilayah Sulawesi Selatan. Digunakan untuk identifikasi kegiatan, barcode presensi rapat, dan evaluasi beasiswa.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all cursor-pointer"
            >
              <Edit3 size={15} />
              <span>{isEditing ? 'Batal Edit' : 'Edit Biodata'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── NAVIGATION PILLS (KTA DIGITAL vs BIODATA vs EVALUASI) ─── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white shadow-sm border border-slate-200/80">
        <button
          onClick={() => setActiveTab('kta')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'kta' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🪪 Kartu Tanda Anggota (KTA) Digital
        </button>
        <button
          onClick={() => setActiveTab('biodata')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'biodata' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          📝 Informasi Biodata & Kontak
        </button>
        <button
          onClick={() => setActiveTab('beasiswa')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'beasiswa' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🎓 Status Evaluasi Beasiswa BI
        </button>
      </div>

      {/* ─── TAB 1: HOLOGRAPHIC KTA DIGITAL PASS ─── */}
      {activeTab === 'kta' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Holographic Card View (7 cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="holo-card w-full max-w-md p-7 text-white select-none">
              {/* Shimmer Overlay */}
              <div className="holo-shimmer-overlay"></div>

              {/* Card Header */}
              <div className="relative z-10 flex items-start justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center font-black text-amber-300 text-sm">
                    BI
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-wider uppercase text-amber-300">
                      BANK INDONESIA
                    </h3>
                    <p className="text-[10px] text-slate-300 font-semibold tracking-wide">
                      GENERASI BARU INDONESIA (GenBI)
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">KOMISARIAT</span>
                  <p className="text-[11px] font-black text-white">UNM MAKASSAR</p>
                </div>
              </div>

              {/* Card Body with Photo & Info */}
              <div className="relative z-10 py-6 flex items-center gap-5">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-amber-400/60 shadow-xl bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                    ✓
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <p className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                    {currentUser.roleTitle}
                  </p>
                  <h4 className="text-lg font-black text-white truncate">{formData.name}</h4>
                  <p className="text-xs text-slate-300 font-medium truncate">{formData.major}</p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-amber-200 border border-white/10">
                      ID: {formData.memberId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer with QR & Validity */}
              <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">BERLAKU HINGGA</p>
                  <p className="text-xs font-black text-amber-300">OKTOBER 2027</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white rounded-lg">
                    <QrCode size={30} className="text-slate-950" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action & Perks Info (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-5">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck size={18} className="text-indigo-600" />
              Otoritas & Fungsi KTA Digital
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="text-lg">⚡</span>
                <p>
                  <strong>Presensi QR Real-time:</strong> Kode QR pada KTA memuat token dinamis yang diverifikasi otomatis pada scanner absensi rapat pleno.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="text-lg">🏛️</span>
                <p>
                  <strong>Akses Gedung Bank Indonesia:</strong> Tunjukkan KTA digital ini pada pos keamanan KPw BI Sulsel saat menghadiri rapat kerja.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <span className="text-lg">🌟</span>
                <p>
                  <strong>Sertifikasi Kepengurusan:</strong> Bukti resmi penerima beasiswa unggulan Bank Indonesia periode 2026/2027.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert('Mengunduh KTA Digital GenBI dalam format PDF Resolusi Tinggi...')}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download size={15} />
                <span>Unduh KTA Digital (PDF / Cetak)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: BIODATA FORM & EDITING ─── */}
      {activeTab === 'biodata' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Biodata Lengkap Anggota</h3>
            <span className="text-xs text-slate-400">Status: Terdaftar di Database Wilayah</span>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs font-semibold disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Email Kampus / Akun Mahasiswa</label>
              <input
                type="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs font-semibold disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Nomor Kontak WhatsApp</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs font-semibold disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Perguruan Tinggi</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.univ}
                onChange={e => setFormData({ ...formData, univ: e.target.value })}
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs font-semibold disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Program Studi & Angkatan</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.major}
                onChange={e => setFormData({ ...formData, major: e.target.value })}
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs font-semibold disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Bio Kepengurusan & Dedikasi</label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs font-semibold disabled:bg-slate-50 disabled:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            {isEditing && (
              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30"
                >
                  Simpan Perubahan
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* ─── TAB 3: STATUS BEASISWA EVALUASI ─── */}
      {activeTab === 'beasiswa' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900">Kelayakan Beasiswa Lanjutan</h3>
              <p className="text-xs text-slate-500">Evaluasi performa berkala Bank Indonesia Kantor Perwakilan Sulawesi Selatan</p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              STATUS: LAYAK LANJUT (PRIME)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">IPK Minimal (3.00)</span>
              <p className="text-2xl font-black text-slate-900">3.88</p>
              <p className="text-[11px] text-emerald-600 font-semibold">✓ Memenuhi syarat akademik</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Poin Keaktifan Minimal (100)</span>
              <p className="text-2xl font-black text-indigo-600">{currentUser.points || 128} Poin</p>
              <p className="text-[11px] text-emerald-600 font-semibold">✓ +28 poin di atas standar</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Rasio Presensi Rapat</span>
              <p className="text-2xl font-black text-emerald-600">100%</p>
              <p className="text-[11px] text-emerald-600 font-semibold">✓ 6 dari 6 rapat pleno hadir</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
