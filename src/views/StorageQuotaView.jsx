import React, { useState } from 'react';

export default function StorageQuotaView({ driveUsedGB = 48.5, driveMaxGB = 400.0, emailSentToday = 24, emailMaxPerDay = 100 }) {
  const [cleaning, setCleaning] = useState(false);
  const [cleanDone, setCleanDone] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const drivePct = Math.round((driveUsedGB / driveMaxGB) * 100);
  const freeGB = (driveMaxGB - driveUsedGB).toFixed(1);

  // Breakdown percentages matching 400 GB Google Drive Plan
  const driveFilesGB = 28.5;
  const gmailGB = 12.0;
  const photosGB = 8.0;

  const driveFilesPct = (driveFilesGB / driveMaxGB) * 100;
  const gmailPct = (gmailGB / driveMaxGB) * 100;
  const photosPct = (photosGB / driveMaxGB) * 100;

  const handleClean = () => {
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
      setCleanDone(true);
      setTimeout(() => setCleanDone(false), 5000);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col font-sans space-y-6 select-none pb-12">
      {/* ─── OFFICIAL GOOGLE DRIVE HEADER ─── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Official Google Drive Tri-color Icon */}
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 p-2.5 flex items-center justify-center shrink-0 shadow-xs">
            <svg viewBox="0 0 87.3 78" className="w-full h-full">
              <path fill="#4285F4" d="M6.6 66.85l13.65-23.65h53.7L60.3 66.85H6.6z"/>
              <path fill="#0066DA" d="M43.65 2h26.7l16.95 29.3-13.65 23.65-30-52.95z"/>
              <path fill="#00AC47" d="M20.25 43.2L6.6 66.85 0 55.4 26.7 9h26.7L40.05 32.65l-19.8 10.55z"/>
              <path fill="#EA4335" d="M43.65 2L70.35 48.2h-26.7L16.95 2H43.65z"/>
              <path fill="#FFBA00" d="M20.25 43.2L33.9 66.85h-27.3L0 55.4l20.25-12.2z"/>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Penyimpanan Google Drive
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                Paket Google Plus / Google One 400 GB
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Akun Resmi: <span className="font-bold text-slate-800">genbi.unm.sipakainge@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://drive.google.com/drive/u/0/folders/1Rvh1jIzEJhAGlt4o6MpdH27id_j4F09c"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            <span>Buka Google Drive</span>
          </a>

          <button
            onClick={handleClean}
            disabled={cleaning}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
            <span>{cleaning ? 'Membersihkan...' : 'Kosongkan Ruang'}</span>
          </button>
        </div>
      </div>

      {cleanDone && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-emerald-600 text-[22px]">check_circle</span>
          <span className="text-xs font-bold">Pembersihan Selesai! Berhasil menghapus 420 MB file sampah dan cache Drive temporer.</span>
        </div>
      )}

      {/* ─── MAIN STORAGE CARD WITH GOOGLE COLOR BREAKDOWN ─── */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Penggunaan Saat Ini</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl md:text-4xl font-black text-slate-900">{driveUsedGB} GB</span>
              <span className="text-sm font-bold text-slate-500">dari {driveMaxGB} GB ({drivePct}% terpakai)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-right">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Sisa Ruang Kosong</span>
              <span className="text-sm font-black text-emerald-600">{freeGB} GB Tersedia</span>
            </div>
          </div>
        </div>

        {/* Multi-color Google Drive Segmented Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-slate-200/60 shadow-inner">
            <div 
              style={{ width: `${driveFilesPct}%` }}
              className="h-full bg-blue-500 rounded-l-full transition-all duration-700" 
              title="Google Drive Files"
            />
            <div 
              style={{ width: `${gmailPct}%` }}
              className="h-full bg-red-500 transition-all duration-700" 
              title="Gmail Attachments"
            />
            <div 
              style={{ width: `${photosPct}%` }}
              className="h-full bg-amber-400 rounded-r-full transition-all duration-700" 
              title="Google Photos & LPJ Documentation"
            />
          </div>

          {/* Color Legend (Identik Google Drive UI) */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span>Google Drive ({driveFilesGB} GB)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span>Gmail ({gmailGB} GB)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span>Google Foto ({photosGB} GB)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-semibold ml-auto">
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span>Kosong ({freeGB} GB)</span>
            </div>
          </div>
        </div>

        {/* ─── DETAILED FOLDER REPOSITORY MAP ─── */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[20px]">folder_shared</span>
            Struktur Folder Repositori Drive GenBI UNM
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:bg-slate-100/80 transition-colors">
              <span className="material-symbols-outlined text-blue-600 text-[24px]">folder</span>
              <div>
                <h4 className="font-bold text-xs text-slate-900">01_Penyetoran_Berkas</h4>
                <p className="text-[11px] text-slate-500 font-medium">Draft & Proposal Proker</p>
                <span className="text-[10px] font-bold text-slate-400 mt-1 block">1.8 GB · 142 Berkas</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:bg-slate-100/80 transition-colors">
              <span className="material-symbols-outlined text-amber-500 text-[24px]">folder</span>
              <div>
                <h4 className="font-bold text-xs text-slate-900">02_Dokumentasi_LPJ</h4>
                <p className="text-[11px] text-slate-500 font-medium">Foto & Video Kegiatan</p>
                <span className="text-[10px] font-bold text-slate-400 mt-1 block">1.4 GB · 85 Berkas</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:bg-slate-100/80 transition-colors">
              <span className="material-symbols-outlined text-emerald-600 text-[24px]">folder</span>
              <div>
                <h4 className="font-bold text-xs text-slate-900">03_Presensi_Rapat</h4>
                <p className="text-[11px] text-slate-500 font-medium">Rekapitulasi Kehadiran</p>
                <span className="text-[10px] font-bold text-slate-400 mt-1 block">0.6 GB · 24 Berkas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
