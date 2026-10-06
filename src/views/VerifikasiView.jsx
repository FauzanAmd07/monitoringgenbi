import React, { useState } from 'react';
import { 
  ShieldCheck, CheckSquare, Check, RotateCcw, Award, AlertCircle, 
  FileText, ArrowRight, Stamp, X, Sparkles, Filter, CheckCircle2
} from 'lucide-react';

export default function VerifikasiView({ currentUser, submissions, setSubmissions }) {
  const [selectedSub, setSelectedSub] = useState(null);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [stampAnimation, setStampAnimation] = useState(null);

  const queue = submissions.filter(sub => {
    if (currentUser.roleLevel === 6) return sub.status === 'MENUNGGU_VERIFIKASI_1' && (!currentUser.deputiId || sub.deputiId === currentUser.deputiId);
    if (currentUser.roleLevel === 5) return sub.status === 'MENUNGGU_VERIFIKASI_2' && (!currentUser.deputiId || sub.deputiId === currentUser.deputiId);
    if (currentUser.roleLevel === 4) return sub.status === 'MENUNGGU_BENDAHARA';
    if (currentUser.roleLevel <= 2) return sub.status?.includes('MENUNGGU') || sub.status === 'REVISI';
    return false;
  });

  const handleApprove = (subId) => {
    setStampAnimation(subId);
    setTimeout(() => {
      setSubmissions(submissions.map(sub => {
        if (sub.id !== subId) return sub;
        if (currentUser.roleLevel === 6) return { ...sub, status: 'MENUNGGU_VERIFIKASI_2', stage: 'Tahap 2 · Persetujuan Kordep', reviewNotes: 'Kelengkapan format awal terverifikasi. Diteruskan ke Koordinator Deputi.' };
        return { ...sub, status: 'DISETUJUI', stage: 'Selesai & Disahkan', reviewNotes: `Disahkan resmi oleh ${currentUser.roleTitle} (${currentUser.name}).` };
      }));
      setStampAnimation(null);
    }, 700);
  };

  const handleRevision = () => {
    if (!selectedSub || !revisionNotes.trim()) return;
    setSubmissions(submissions.map(sub => sub.id === selectedSub.id ? { 
      ...sub, 
      status: 'REVISI', 
      stage: `Revisi Diperlukan (${currentUser.roleTitle})`, 
      reviewNotes: revisionNotes 
    } : sub));
    setShowRevisionModal(false); 
    setSelectedSub(null); 
    setRevisionNotes('');
  };

  const handleOverride = (subId) => {
    setSubmissions(submissions.map(sub => sub.id === subId ? { 
      ...sub, 
      status: 'DISETUJUI', 
      stage: 'Override Pengesahan Ketua', 
      reviewNotes: `Disahkan langsung dengan hak prerogatif Ketua GenBI.` 
    } : sub));
  };

  const presetNotes = [
    'Format RAB belum sesuai template resmi Bank Indonesia.',
    'Nota kuitansi di atas Rp 5 juta wajib disertai meterai Rp 10.000.',
    'Daftar presensi peserta belum menyertakan tanda tangan ketua panitia.',
    'Dokumentasi foto kegiatan kurang jelas / resolusi rendah.'
  ];

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* ─── THEMED HERO: EXECUTIVE STARGATE DECISION SUITE ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-800/40">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-60 h-60 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
              <Award size={14} className="text-amber-400" />
              EXECUTIVE APPROVAL SUITE • OTORITAS RESMI BI
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Pusat Verifikasi & Pengesahan
            </h1>
            <p className="text-xs md:text-sm text-indigo-200/80 leading-relaxed">
              Kewenangan: <strong className="text-white">{currentUser.roleTitle}</strong> (Tingkat {currentUser.roleLevel}). Pastikan integritas laporan sebelum disahkan ke arsip Bank Indonesia.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex items-center gap-4 shrink-0">
            <div className="text-center px-4 border-r border-white/10">
              <span className="text-[10px] uppercase font-bold text-indigo-300">Antrean Siap Periksa</span>
              <p className="text-3xl font-black text-amber-400">{queue.length}</p>
            </div>
            <div className="text-center px-4">
              <span className="text-[10px] uppercase font-bold text-indigo-300">Tingkat Otoritas</span>
              <p className="text-sm font-bold text-white leading-snug">{currentUser.roleTitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── VERIFICATION QUEUE LIST ─── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <CheckSquare size={18} className="text-indigo-600" />
            Daftar Berkas Menunggu Keputusan Anda
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {queue.length} Dokumen dalam antrean
          </span>
        </div>

        {queue.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner">
              ✓
            </div>
            <h3 className="text-base font-bold text-slate-800">Semua Antrean Telah Bersih!</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Tidak ada dokumen yang menunggu verifikasi pada tingkat wewenang Anda saat ini.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {queue.map(sub => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative overflow-hidden"
              >
                {/* Stamp animation overlay */}
                {stampAnimation === sub.id && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-20 flex items-center justify-center">
                    <span className="digital-stamp text-lg">DISAHKAN RESMI</span>
                  </div>
                )}

                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <FileText size={22} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {sub.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Pengunggah: <strong className="text-slate-800">{sub.uploaderName}</strong>
                      </span>
                      <span className="text-xs font-mono text-indigo-600">
                        ({sub.driveFileId})
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{sub.title}</h3>
                    <p className="text-xs text-slate-500">{sub.fileName} • {sub.fileSize || '4.8 MB'}</p>

                    {sub.notes && (
                      <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
                        "{sub.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Decision Actions */}
                <div className="flex flex-wrap items-center gap-2.5 self-end lg:self-center shrink-0">
                  <button
                    onClick={() => handleApprove(sub.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Check size={15} />
                    <span>Setujui Dokumen</span>
                  </button>

                  <button
                    onClick={() => { setSelectedSub(sub); setShowRevisionModal(true); }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/25 transition-all cursor-pointer"
                  >
                    <RotateCcw size={15} />
                    <span>Minta Revisi</span>
                  </button>

                  {currentUser.roleLevel === 1 && (
                    <button
                      onClick={() => handleOverride(sub.id)}
                      className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-amber-300 font-black text-xs transition-colors"
                      title="Override Prerogatif Ketua"
                    >
                      ★ Override
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── MODAL REVISI DOKUMEN ─── */}
      {showRevisionModal && selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle size={20} className="text-amber-500" />
                <h3 className="text-base font-black text-slate-900">Catatan Perbaikan / Revisi</h3>
              </div>
              <button onClick={() => setShowRevisionModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Pilih Rekomendasi Cepat:</p>
              <div className="space-y-1.5">
                {presetNotes.map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRevisionNotes(n)}
                    className="w-full text-left p-2 rounded-xl text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 hover:border-amber-300 transition-colors"
                  >
                    • {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Tulis Catatan Spesifik:</label>
              <textarea
                rows={3}
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                placeholder="Rincikan bagian dokumen yang wajib diperbaiki sebelum diajukan kembali..."
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRevisionModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={handleRevision}
                disabled={!revisionNotes.trim()}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/30"
              >
                Kirim Catatan Revisi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
