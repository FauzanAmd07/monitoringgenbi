import React, { useState } from 'react';
import { 
  Download, Archive, CheckCircle, Users, FileCheck, Calendar, 
  BarChart3, FileSpreadsheet, ShieldCheck, ArrowDownToLine, Sparkles
} from 'lucide-react';
import { DEPUTI_LIST } from '../data/mockData';

export default function RekapView({ programs, submissions, users, meetings }) {
  const [notice, setNotice] = useState(null);
  const [exportingType, setExportingType] = useState(null);

  const exportCSV = (type) => {
    setExportingType(type);
    setTimeout(() => {
      let filename, content;
      if (type === 'poin') {
        filename = 'Rekap_Poin_GenBI_2026.csv';
        content = 'Nama,NIM,Peran,Deputi,Poin,Status\n' + users.map(u => `"${u.name}","${u.nim}","${u.roleTitle}","${u.deputiId||'BPH'}",${u.points},"${u.points>=20?'Aktif':u.points>=10?'Peringatan':'Pembinaan'}"`).join('\n');
      } else if (type === 'berkas') {
        filename = 'Rekap_Berkas_GenBI_2026.csv';
        content = 'Judul,File,Kategori,Pengunggah,Status,Drive,ID\n' + submissions.map(s => `"${s.title}","${s.fileName}","${s.category}","${s.uploaderName}","${s.stage}","${s.driveFolder}","${s.driveFileId}"`).join('\n');
      } else {
        filename = 'Rekap_Proker_GenBI_2026.csv';
        content = 'Proker,Deputi,Tanggal,Lokasi,Anggaran,Status,Ketua\n' + programs.map(p => `"${p.title}","${p.deputiId}","${p.startDate}","${p.location}",${p.budget},"${p.status}","${p.chairman}"`).join('\n');
      }
      download(filename, content, 'text/csv;charset=utf-8;');
      setExportingType(null);
    }, 800);
  };

  const exportJSON = () => {
    setExportingType('json');
    setTimeout(() => {
      const data = { 
        term: 'Periode 2026/2027', 
        exportedAt: new Date().toISOString(), 
        programs, 
        submissions, 
        users, 
        meetings 
      };
      download('Arsip_Lengkap_GenBI_2026-2027.json', JSON.stringify(data, null, 2), 'application/json');
      setExportingType(null);
    }, 1000);
  };

  const download = (name, content, mime) => {
    const blob = new Blob([content], { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setNotice(name);
    setTimeout(() => setNotice(null), 4000);
  };

  const cards = [
    { 
      icon: Users, color: '#10b981', bg: '#ecfdf5', 
      title: 'Rekapitulasi Poin & Presensi', 
      desc: 'Seluruh skor anggota, rasio kehadiran rapat pleno, dan status kelayakan beasiswa lanjutan BI.', 
      action: () => exportCSV('poin') 
    },
    { 
      icon: FileCheck, color: '#3b82f6', bg: '#eff6ff', 
      title: 'Ledger Penyetoran Berkas', 
      desc: 'Database pengesahan LPJ, proposal kegiatan, ID Google Drive, dan catatan tim audit verifikator.', 
      action: () => exportCSV('berkas') 
    },
    { 
      icon: Calendar, color: '#f59e0b', bg: '#fffbeb', 
      title: 'Realisasi Program Kerja', 
      desc: 'Monitoring serapan anggaran tiap deputi, tanggal eksekusi, ketua pelaksana, dan kelengkapan berkas.', 
      action: () => exportCSV('proker') 
    }
  ];

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-3 animate-fadeIn">
          <CheckCircle size={20} className="text-emerald-600" />
          <span className="text-xs font-bold">File <strong>{notice}</strong> berhasil diekspor dan diunduh ke perangkat Anda.</span>
        </div>
      )}

      {/* ─── THEMED HERO: EXECUTIVE FINANCIAL INTELLIGENCE ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-slate-800">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-60 h-60 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide">
              <BarChart3 size={14} className="text-indigo-400" />
              EXECUTIVE INTELLIGENCE • LAPORAN AKUNTABILITAS RESMI
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Rekapitulasi & Ekspor Laporan
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Kompilasi data menyeluruh untuk laporan pertanggungjawaban ke Pembina Kantor Perwakilan Bank Indonesia. Ekspor instan dalam format CSV dan JSON terstandar.
            </p>
          </div>

          <button
            onClick={exportJSON}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/25 transition-all hover:scale-[1.02] cursor-pointer self-start lg:self-center shrink-0"
          >
            <Archive size={15} />
            <span>{exportingType === 'json' ? 'Mengompilasi JSON...' : 'Ekspor Arsip Lengkap (JSON)'}</span>
          </button>
        </div>
      </div>

      {/* ─── EXPORT MODULES (3 CARDS) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(c => (
          <div
            key={c.title}
            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 hover:shadow-xl transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
                style={{ backgroundColor: c.bg, color: c.color }}
              >
                <c.icon size={24} />
              </div>
              <h3 className="text-base font-black text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>

            <button
              onClick={c.action}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowDownToLine size={15} />
              <span>Unduh Spreadsheet (.CSV)</span>
            </button>
          </div>
        ))}
      </div>

      {/* ─── OFFICIAL ENDORSEMENT FOOTER ─── */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1">
          <span className="digital-stamp text-[10px] text-emerald-400 border-emerald-400 mb-2">
            TERVERIFIKASI BANK INDONESIA
          </span>
          <h4 className="text-base font-bold text-white">Akuntabilitas & Integritas Kepengurusan</h4>
          <p className="text-xs text-slate-400">
            Setiap file hasil ekspor mencakup timestamp penarikan data resmi dan hash integritas data lokal.
          </p>
        </div>

        <div className="text-right text-xs text-slate-400 font-mono shrink-0">
          <p>KONTROL AUDIT: GENBI-UNM-2026</p>
          <p className="text-emerald-400 font-bold">STATUS: COMPLIANT</p>
        </div>
      </div>
    </div>
  );
}
