import React, { useState } from 'react';
import {
  UploadCloud, FileText, CheckCircle2, ShieldCheck, AlertCircle,
  HardDrive, Lock, Sparkles, FolderSync, ArrowRight, Eye, RefreshCw, X
} from 'lucide-react';
import { DEPUTI_LIST } from '../data/mockData';

export default function BerkasView({ currentUser, submissions, setSubmissions }) {
  const [selectedProgram, setSelectedProgram] = useState('Workshop Desain Konten & Social Media GenBI');
  const [docType, setDocType] = useState('Laporan Pertanggungjawaban (LPJ) & Nota Kuitansi');
  const [docTitle, setDocTitle] = useState('LPJ_Workshop_Desain_Deputi_Multimedia_Final.pdf');
  const [notes, setNotes] = useState('Dokumen lengkap dengan tanda tangan basah Kordep, lembar pengesahan, dan rincian kuitansi asli.');
  const [selectedFile, setSelectedFile] = useState({
    name: 'LPJ_Workshop_Desain_Deputi_Multimedia_Final.pdf',
    size: '14.2 MB',
    date: 'Siap unggah'
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scanStep, setScanStep] = useState(''); // 'scanning' | 'hashing' | 'done'
  const [toast, setToast] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setSelectedFile({
        name: file.name,
        size: `${sizeMB} MB`,
        date: 'Dipilih dari perangkat'
      });
      setDocTitle(file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setSelectedFile({
        name: file.name,
        size: `${sizeMB} MB`,
        date: 'Dipilih dari perangkat'
      });
      setDocTitle(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Pilih file berkas terlebih dahulu.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);
    setScanStep('Memeriksa integritas berkas & sertifikasi digital...');

    setTimeout(() => {
      setUploadProgress(45);
      setScanStep('Enkripsi AES-256 & hashing SHA-256 Google Drive...');
    }, 600);

    setTimeout(() => {
      setUploadProgress(85);
      setScanStep('Sinkronisasi ke repositori /Periode 2026-2027/02_Proker/ ...');
    }, 1200);

    setTimeout(() => {
      setUploadProgress(100);
      setScanStep('Penyetoran sukses!');
      finishSubmission();
    }, 1800);
  };

  const finishSubmission = () => {
    const isFinancial = docType.includes('Keuangan') || docType.includes('Nota');
    const newSubmission = {
      id: `sub-${Date.now()}`,
      uploaderName: currentUser.name,
      uploaderId: currentUser.id,
      deputiId: currentUser.deputiId || 'multimedia',
      category: isFinancial ? 'Kegiatan Keuangan' : 'Kegiatan Narasi',
      title: docTitle || 'Berkas Laporan GenBI',
      fileName: selectedFile?.name || 'Dokumen_GenBI.pdf',
      fileSize: selectedFile?.size || '5.2 MB',
      driveFolder: `/Periode 2026-2027/02_Proker/${currentUser.deputiId || 'Umum'}/`,
      driveFileId: `drv_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      submittedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      deadline: '09 Okt 2026',
      status: isFinancial ? 'MENUNGGU_BENDAHARA' : 'MENUNGGU_VERIFIKASI_1',
      stage: isFinancial ? 'Verifikasi Keuangan Bendahara' : 'Pemeriksaan Sekretaris Umum',
      notes: notes,
      verifikator: isFinancial ? 'Bendahara Umum' : 'Sekum GenBI',
      points: '+35 Poin'
    };

    setSubmissions([newSubmission, ...submissions]);
    setDriveUsedGB(prev => Math.round((prev + 0.015) * 1000) / 1000);
    setIsUploading(false);
    setToast(newSubmission);
    setTimeout(() => setToast(null), 6000);
  };

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-xl flex items-center justify-between text-emerald-950 animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs font-black">Berkas Berhasil Terarsip di Google Drive BI!</p>
              <p className="text-[11px] text-emerald-700">ID Drive: {toast.driveFileId} • Status: {toast.stage}</p>
            </div>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white">
            {toast.points}
          </span>
        </div>
      )}

      {/* ─── THEMED HERO: BANK INDONESIA DIGITAL VAULT ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 text-white shadow-2xl border border-blue-800/40">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-60 h-60 rounded-full bg-cyan-400/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
              <ShieldCheck size={14} className="text-blue-400" />
              BANK INDONESIA DIGITAL VAULT • PROTOKOL ARSIP RESMI
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Penyetoran & Arsip Berkas
            </h1>
            <p className="text-xs md:text-sm text-blue-200/80 leading-relaxed">
              Kanal resmi pengunggahan dokumen kepengurusan, LPJ, proposal kegiatan, dan bukti kwitansi. Setiap dokumen diindeks otomatis dengan enkripsi cloud.
            </p>
          </div>


        </div>
      </div>

      {/* ─── MAIN VAULT UPLOAD INTERFACE ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form Box (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Formulir Penyetoran Berkas</h2>
              <p className="text-xs text-slate-500">Pilih berkas dan isi atribut metadata untuk validasi BPH</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
              Periode 2026/2027
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Interactive Drag and Drop Vault Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`relative rounded-3xl p-8 border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer ${isDragOver
                  ? 'border-blue-500 bg-blue-50/60 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/50'
                }`}
            >
              <input
                type="file"
                id="vaultFileInput"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
              />

              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-inner">
                <UploadCloud size={32} />
              </div>

              <h4 className="text-sm font-bold text-slate-800">
                Tarik & Lepas File di Sini, atau <span className="text-blue-600 underline">Jelajahi File</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Format didukung: PDF, DOCX, XLSX, ZIP (Maksimal 25 MB per dokumen)
              </p>

              {selectedFile && (
                <div className="mt-4 p-3 bg-blue-50/80 rounded-2xl border border-blue-200/60 flex items-center gap-3 text-left max-w-md w-full">
                  <FileText size={24} className="text-blue-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-900 truncate">{selectedFile.name}</p>
                    <p className="text-[11px] text-slate-500">{selectedFile.size} • {selectedFile.date}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setPreviewModal(true); }}
                    className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
                    title="Pratinjau Berkas"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Document Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Jenis Dokumen</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Laporan Pertanggungjawaban (LPJ) & Nota Kuitansi">LPJ Kegiatan & Nota Kuitansi</option>
                  <option value="Proposal Kegiatan & RAB">Proposal Kegiatan & RAB</option>
                  <option value="Surat Keputusan (SK) & Surat Tugas">Surat Keputusan (SK) & Surat Tugas</option>
                  <option value="Daftar Hadir & Dokumentasi Foto">Daftar Hadir & Dokumentasi Foto</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Terkait Program Kerja</label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Workshop Desain Konten & Social Media GenBI">Workshop Desain Konten & Social Media</option>
                  <option value="Sosialisasi CBP Rupiah Pasar Tradisional">Sosialisasi CBP Rupiah Pasar Tradisional</option>
                  <option value="GenBI Mengajar: Literasi Keuangan">GenBI Mengajar: Literasi Keuangan</option>
                  <option value="Aksi Bersih Pantai & Konservasi Mangrove">Aksi Bersih Pantai & Konservasi</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Catatan Khusus untuk Verifikator</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full mt-1.5 p-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Rincikan kelengkapan lembar pengesahan atau catatan penting..."
              />
            </div>

            {/* Uploading Progress Screen */}
            {isUploading && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                  <span className="flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin text-blue-600" />
                    {scanStep}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] cursor-pointer"
              >
                <FolderSync size={16} />
                <span>Simpan & Verifikasikan ke Cloud</span>
              </button>
            </div>
          </form>
        </div>

        {/* Vault Rules & Security Checklist (1 col) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200/90 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Lock size={16} className="text-blue-600" />
              Protokol Standar Penyetoran
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800">1. Stempel & TTD Asli</p>
                <p className="text-slate-500 leading-relaxed">
                  Semua berkas LPJ wajib memuat tanda tangan basah/digital tersertifikasi dari Ketua Panitia dan Kordep.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800">2. Nota Kuitansi Terlampir</p>
                <p className="text-slate-500 leading-relaxed">
                  Pengeluaran di atas Rp 5.000.000 wajib bermaterai Rp 10.000 dan disertai bukti transaksi valid.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800">3. Ketepatan Waktu (+10 Poin)</p>
                <p className="text-slate-500 leading-relaxed">
                  Penyetoran maksimal H+7 setelah kegiatan selesai memberikan poin loyalitas tambahan.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
            <Sparkles size={20} className="text-blue-600 shrink-0" />
            <p className="text-[11px] text-blue-900 font-semibold leading-relaxed">
              Berkas yang telah diunggah akan otomatis masuk antrean verifikasi BPH & Pembina Bank Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* ─── MODAL PRATINJAU DOKUMEN ─── */}
      {previewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                <h3 className="text-sm font-black text-slate-900">Simulasi Pratinjau Dokumen</h3>
              </div>
              <button onClick={() => setPreviewModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <div className="h-64 rounded-2xl bg-slate-100 border border-slate-200 p-6 flex flex-col items-center justify-center text-center space-y-2">
              <span className="digital-stamp">FORMAT TERVALIDASI BI</span>
              <p className="text-xs font-bold text-slate-700 mt-2">{selectedFile?.name}</p>
              <p className="text-[11px] text-slate-500 font-mono">MD5 HASH: c8f3a9e10d2948b89e...</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewModal(false)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/30"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
