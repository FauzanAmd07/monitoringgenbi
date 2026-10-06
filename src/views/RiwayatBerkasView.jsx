import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Clock, AlertTriangle, Search, Filter, 
  ArrowUpRight, ExternalLink, ShieldCheck, Download, Sparkles, Folder
} from 'lucide-react';

export default function RiwayatBerkasView({ submissions, setCurrentTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedSub, setSelectedSub] = useState(null);

  const approvedCount = submissions.filter(s => s.status === 'DISETUJUI' || s.status === 'SELESAI').length;
  const pendingCount = submissions.filter(s => s.status?.includes('MENUNGGU')).length;
  const revisionCount = submissions.filter(s => s.status?.includes('REVISI')).length;

  const filtered = submissions.filter(s => {
    if (filterStatus !== 'ALL') {
      if (filterStatus === 'DISETUJUI' && s.status !== 'DISETUJUI' && s.status !== 'SELESAI') return false;
      if (filterStatus === 'MENUNGGU' && !s.status?.includes('MENUNGGU')) return false;
      if (filterStatus === 'REVISI' && !s.status?.includes('REVISI')) return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        s.title?.toLowerCase().includes(q) || 
        s.fileName?.toLowerCase().includes(q) || 
        s.uploaderName?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status, stage) => {
    if (status === 'DISETUJUI' || status === 'SELESAI') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
          <CheckCircle2 size={13} />
          {stage || 'Disahkan'}
        </span>
      );
    }
    if (status?.includes('REVISI')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/15 text-rose-600 border border-rose-500/30">
          <AlertTriangle size={13} />
          {stage || 'Perlu Revisi'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-700 border border-amber-500/30">
        <Clock size={13} className="animate-spin" style={{ animationDuration: '4s' }} />
        {stage || 'Dalam Pemeriksaan'}
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* ─── THEMED HERO: AUDIT TRAIL & DOCUMENT LEDGER ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-teal-950 via-slate-900 to-cyan-950 text-white shadow-2xl border border-teal-800/40">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-60 h-60 rounded-full bg-cyan-400/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold tracking-wide">
              <ShieldCheck size={14} className="text-teal-400" />
              DIGITAL AUDIT TRAIL • TRANSPARANSI REPOSITORI
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Riwayat Penyetoran & Ledger
            </h1>
            <p className="text-xs md:text-sm text-teal-200/80 leading-relaxed">
              Jejak audit berkas terverifikasi Bank Indonesia. Lacak progress verifikasi bertingkat mulai dari Kordep, Bendahara, hingga pengesahan final BPH.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('berkas')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] cursor-pointer self-start lg:self-center shrink-0"
          >
            <span>+ Setor Berkas Baru</span>
          </button>
        </div>

        {/* 4 Summary Metric Capsules */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300">Total Berkas</span>
            <p className="text-2xl font-black text-white">{submissions.length}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300">Telah Disahkan</span>
            <p className="text-2xl font-black text-emerald-400">{approvedCount}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300">Antrean Verifikasi</span>
            <p className="text-2xl font-black text-amber-300">{pendingCount}</p>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300">Perlu Revisi</span>
            <p className="text-2xl font-black text-rose-400">{revisionCount}</p>
          </div>
        </div>
      </div>

      {/* ─── SEARCH & FILTER CONTROLS ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama berkas, judul LPJ, atau pengunggah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 text-xs font-medium text-slate-800 border-0 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === 'ALL' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Semua ({submissions.length})
            </button>
            <button
              onClick={() => setFilterStatus('DISETUJUI')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === 'DISETUJUI' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Sah ({approvedCount})
            </button>
            <button
              onClick={() => setFilterStatus('MENUNGGU')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === 'MENUNGGU' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Antrean ({pendingCount})
            </button>
            <button
              onClick={() => setFilterStatus('REVISI')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === 'REVISI' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Revisi ({revisionCount})
            </button>
          </div>
        </div>
      </div>

      {/* ─── DOCUMENT AUDIT TRAIL STREAM ─── */}
      <div className="space-y-4">
        {filtered.map(sub => {
          const isDone = sub.status === 'DISETUJUI' || sub.status === 'SELESAI';
          const isRev = sub.status?.includes('REVISI');

          return (
            <div
              key={sub.id}
              onClick={() => setSelectedSub(sub)}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <FileText size={22} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {sub.category || 'Berkas Proker'}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Disetor oleh <strong className="text-slate-700">{sub.uploaderName}</strong>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      • {sub.submittedAt || '01 Okt 2026'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {sub.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="font-mono text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      ID: {sub.driveFileId}
                    </span>
                    <span className="flex items-center gap-1">
                      <Folder size={12} className="text-slate-400" />
                      {sub.driveFolder || '/02_Proker/'}
                    </span>
                    <span>{sub.fileName} ({sub.fileSize || '5.2 MB'})</span>
                  </div>

                  {sub.reviewNotes && (
                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-900 mt-2 font-medium">
                      <strong>Catatan Tim Audit:</strong> "{sub.reviewNotes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center gap-4 shrink-0 self-end lg:self-center">
                {getStatusBadge(sub.status, sub.stage)}
                <span className="p-2 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-2">
            <p className="text-sm font-bold text-slate-700">Tidak ada berkas yang sesuai filter.</p>
            <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau status filter.</p>
          </div>
        )}
      </div>

      {/* ─── MODAL DETAIL AUDIT BERKAS ─── */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full mb-2 inline-block">
                  Audit Verifikasi Berkas
                </span>
                <h3 className="text-lg font-black text-slate-900">{selectedSub.title}</h3>
              </div>
              <button onClick={() => setSelectedSub(null)} className="p-1.5 text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Pengunggah:</span>
                <span className="font-bold text-slate-800">{selectedSub.uploaderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nama File:</span>
                <span className="font-bold text-slate-800">{selectedSub.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lokasi Google Drive:</span>
                <span className="font-mono text-slate-800">{selectedSub.driveFolder}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Drive File ID:</span>
                <span className="font-mono text-teal-700 font-bold">{selectedSub.driveFileId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status Terkini:</span>
                <span className="font-bold text-slate-800">{selectedSub.stage || selectedSub.status}</span>
              </div>
            </div>

            {selectedSub.notes && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-700">Catatan Pengunggah:</p>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                  {selectedSub.notes}
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => alert(`Mengunduh file ${selectedSub.fileName} dari Google Drive...`)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>Unduh File</span>
              </button>
              <button
                onClick={() => setSelectedSub(null)}
                className="px-5 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold shadow-md shadow-teal-600/30"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
