import React, { useState } from 'react';
import { 
  Calendar, MapPin, Users, Wallet, Plus, ChevronRight, FileText, X, 
  Sparkles, CheckCircle2, Circle, AlertCircle, LayoutGrid, Kanban, 
  BarChart3, Filter, ArrowUpRight, Check
} from 'lucide-react';
import { DEPUTI_LIST } from '../data/mockData';

export default function ProkerView({ currentUser, programs, setPrograms }) {
  const [filterDeputi, setFilterDeputi] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'kanban' | 'timeline'
  const [selectedProker, setSelectedProker] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '', deputiId: currentUser.deputiId || 'pendidikan', startDate: '', endDate: '',
    location: '', targetParticipants: '', budget: 2500000, chairman: currentUser.name
  });

  const filtered = programs.filter(p => {
    if (filterDeputi !== 'ALL' && p.deputiId !== filterDeputi) return false;
    if (filterStatus !== 'ALL' && p.status !== filterStatus) return false;
    return true;
  });

  // Calculate live statistics
  const totalBudget = programs.reduce((acc, p) => acc + (p.budget || 0), 0);
  const activeCount = programs.filter(p => p.status === 'BERLANGSUNG' || p.status === 'DISETUJUI').length;
  const completedCount = programs.filter(p => p.status === 'LPJ_DISAHKAN' || p.status === 'SELESAI').length;

  const handleCreate = (e) => {
    e.preventDefault();
    const newProker = {
      id: `proker-${Date.now()}`, 
      title: formData.title || 'Program Inovatif Baru', 
      deputiId: formData.deputiId,
      type: 'Program Kerja Unggulan', 
      startDate: formData.startDate || '2026-11-20',
      endDate: formData.endDate || formData.startDate || '2026-11-20',
      location: formData.location || 'Aula Mini Bank Indonesia', 
      targetParticipants: formData.targetParticipants || '100 Peserta',
      budget: parseInt(formData.budget) || 2500000, 
      status: 'DIAJUKAN',
      chairman: formData.chairman, 
      secretary: 'Sekretaris Pelaksana', 
      treasurer: 'Bendahara Pelaksana',
      checklists: [
        { name: 'Proposal Kegiatan', status: 'MENUNGGU_UPLOAD', drivePath: null },
        { name: 'RAB & Rincian Anggaran', status: 'MENUNGGU_UPLOAD', drivePath: null }
      ]
    };
    setPrograms([newProker, ...programs]);
    setShowAddModal(false);
    setFormData({ 
      title: '', deputiId: currentUser.deputiId || 'pendidikan', startDate: '', endDate: '', 
      location: '', targetParticipants: '', budget: 2500000, chairman: currentUser.name 
    });
  };

  const handleToggleChecklist = (prokerId, index) => {
    const updated = programs.map(p => {
      if (p.id !== prokerId) return p;
      const newChecklists = [...p.checklists];
      const cur = newChecklists[index];
      newChecklists[index] = {
        ...cur,
        status: cur.status === 'DISAHKAN' ? 'MENUNGGU_UPLOAD' : 'DISAHKAN'
      };
      return { ...p, checklists: newChecklists };
    });
    setPrograms(updated);
    if (selectedProker?.id === prokerId) {
      setSelectedProker(updated.find(p => p.id === prokerId));
    }
  };

  const handleUpdateStatus = (prokerId, newStatus) => {
    const updated = programs.map(p => {
      if (p.id !== prokerId) return p;
      let checklists = [...p.checklists];
      if ((newStatus === 'MENUNGGU_LPJ' || newStatus === 'SELESAI') && !checklists.some(c => c.name === 'LPJ Narasi')) {
        checklists.push(
          { name: 'LPJ Narasi', status: 'MENUNGGU_UPLOAD', drivePath: null },
          { name: 'LPJ Keuangan & Nota Kuitansi', status: 'MENUNGGU_UPLOAD', drivePath: null },
          { name: 'Dokumentasi & Galeri Foto', status: 'MENUNGGU_UPLOAD', drivePath: null }
        );
      }
      return { ...p, status: newStatus, checklists };
    });
    setPrograms(updated);
    if (selectedProker?.id === prokerId) setSelectedProker(updated.find(p => p.id === prokerId));
  };

  const statusBadge = (s) => {
    switch (s) {
      case 'BERLANGSUNG':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>Berlangsung</span>;
      case 'LPJ_DISAHKAN':
      case 'SELESAI':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-600 border border-blue-500/30"><Check size={12} /> LPJ Disahkan</span>;
      case 'MENUNGGU_LPJ':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 border border-amber-500/30"><AlertCircle size={12} /> Menunggu LPJ</span>;
      case 'DISETUJUI':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-600 border border-indigo-500/30">Disetujui BPH</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-500/15 text-slate-600 border border-slate-500/30">Tahap Pengajuan</span>;
    }
  };

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* ─── THEMED HERO: MISSION CONTROL & VENTURE ROADMAP ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white shadow-2xl border border-indigo-800/40">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-violet-600/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-60 h-60 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide">
              <Sparkles size={14} className="text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
              MISSION CONTROL • PROGRAM KERJA GENBI 2026/2027
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Venture & Proker Roadmap
            </h1>
            <p className="text-xs md:text-sm text-indigo-200/80 leading-relaxed">
              Arsitektur operasional dan monitoring real-time setiap program dedikasi Bank Indonesia. Pantau milestone, serapan anggaran, dan akuntabilitas berkas dalam satu kendali.
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="flex flex-wrap items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="px-3 border-r border-white/10">
              <p className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Total Anggaran</p>
              <p className="text-xl md:text-2xl font-black text-amber-300">Rp {(totalBudget / 1000000).toFixed(1)}Jt</p>
            </div>
            <div className="px-3 border-r border-white/10">
              <p className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Proker Berjalan</p>
              <p className="text-xl md:text-2xl font-black text-emerald-400">{activeCount} Proker</p>
            </div>
            <div className="px-3">
              <p className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Tuntas / LPJ</p>
              <p className="text-xl md:text-2xl font-black text-sky-400">{completedCount} Proker</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONTROLS, VIEW MODES & FILTERS ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80">
        {/* Deputi & Status Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterDeputi('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterDeputi === 'ALL' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({programs.length})
            </button>
            {DEPUTI_LIST.map(d => (
              <button
                key={d.id}
                onClick={() => setFilterDeputi(d.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filterDeputi === d.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                {d.name}
              </button>
            ))}
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 border-0 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">Semua Status</option>
            <option value="BERLANGSUNG">Sedang Berlangsung</option>
            <option value="DISETUJUI">Disetujui</option>
            <option value="MENUNGGU_LPJ">Menunggu LPJ</option>
            <option value="LPJ_DISAHKAN">LPJ Selesai</option>
          </select>
        </div>

        {/* View Switcher & Action Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Card Grid"
            >
              <LayoutGrid size={15} />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Kanban Pipeline"
            >
              <Kanban size={15} />
              <span className="hidden sm:inline">Pipeline</span>
            </button>
          </div>

          {currentUser.roleLevel <= 6 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Plus size={16} />
              <span>Ajukan Proker</span>
            </button>
          )}
        </div>
      </div>

      {/* ─── VIEW 1: INTERACTIVE CARDS MATRIX ─── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => {
            const dep = DEPUTI_LIST.find(d => d.id === p.deputiId);
            const done = p.checklists.filter(c => c.status === 'DISAHKAN').length;
            const pct = Math.round((done / p.checklists.length) * 100);

            return (
              <div
                key={p.id}
                onClick={() => setSelectedProker(p)}
                className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Accent Top Bar */}
                <div 
                  className="h-1.5 w-full" 
                  style={{ background: `linear-gradient(90deg, ${dep?.color || '#4f46e5'}, #818cf8)` }} 
                />

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Deputi & Status Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span 
                        className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider"
                        style={{ backgroundColor: `${dep?.color}15`, color: dep?.color }}
                      >
                        {dep?.name || 'Umum'}
                      </span>
                      {statusBadge(p.status)}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-3">
                      {p.title}
                    </h3>

                    {/* Metadata Grid */}
                    <div className="space-y-2 text-xs text-slate-500 mb-5">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{p.startDate} {p.endDate && p.endDate !== p.startDate ? `— ${p.endDate}` : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-slate-400" />
                        <span className="truncate">{p.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={13} className="text-slate-400" />
                        <span>Ketua: <strong className="text-slate-700">{p.chairman}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wallet size={13} className="text-slate-400" />
                        <span className="font-semibold text-emerald-600">Rp {p.budget.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checklist & Progress Bottom */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">Milestone Berkas</span>
                      <span className="font-extrabold text-indigo-600">{pct}% ({done}/{p.checklists.length})</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hover footer peek */}
                <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-bold group-hover:bg-indigo-50/60 transition-colors">
                  <span>Buka Detail & Audit</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── VIEW 2: KANBAN PIPELINE ─── */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {['DIAJUKAN', 'DISETUJUI', 'BERLANGSUNG', 'MENUNGGU_LPJ'].map(statusCol => {
            const items = programs.filter(p => p.status === statusCol);
            return (
              <div key={statusCol} className="kanban-col">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="text-xs font-extrabold tracking-wider uppercase text-slate-700">
                    {statusCol.replace(/_/g, ' ')}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                    {items.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {items.map(p => {
                    const dep = DEPUTI_LIST.find(d => d.id === p.deputiId);
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProker(p)}
                        className="kanban-card group"
                      >
                        <span 
                          className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2 uppercase"
                          style={{ backgroundColor: `${dep?.color}15`, color: dep?.color }}
                        >
                          {dep?.name}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-2">
                          {p.title}
                        </h5>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                          <span>Rp {(p.budget/1000).toLocaleString('id-ID')}k</span>
                          <span className="font-semibold text-slate-700">{p.startDate}</span>
                        </div>
                      </div>
                    );
                  })}
                  {items.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                      Kosong
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── MODAL DETAIL PROKER & AUDIT TRAIL ─── */}
      {selectedProker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 mb-2 inline-block">
                  {DEPUTI_LIST.find(d => d.id === selectedProker.deputiId)?.name || 'Deputi'}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  {selectedProker.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProker(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Proker Detail Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Ketua Panitia</p>
                <p className="text-xs font-bold text-slate-800">{selectedProker.chairman}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Anggaran</p>
                <p className="text-xs font-bold text-emerald-600">Rp {selectedProker.budget.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Lokasi</p>
                <p className="text-xs font-bold text-slate-800 truncate">{selectedProker.location}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Tanggal</p>
                <p className="text-xs font-bold text-slate-800">{selectedProker.startDate}</p>
              </div>
            </div>

            {/* Interactive Milestone Checklists */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-indigo-600" />
                  Milestone & Berkas Wajib
                </h4>
                <span className="text-xs text-slate-500">Klik untuk verifikasi kelengkapan</span>
              </div>

              <div className="space-y-2">
                {selectedProker.checklists.map((c, i) => (
                  <div
                    key={c.name}
                    onClick={() => handleToggleChecklist(selectedProker.id, i)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {c.status === 'DISAHKAN' ? (
                        <CheckCircle2 size={18} className="text-emerald-600" />
                      ) : (
                        <Circle size={18} className="text-slate-300" />
                      )}
                      <span className={`text-xs font-bold ${c.status === 'DISAHKAN' ? 'text-slate-800 line-through' : 'text-slate-700'}`}>
                        {c.name}
                      </span>
                    </div>
                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                      c.status === 'DISAHKAN' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {c.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Status Override for Leaders */}
            {currentUser.roleLevel <= 5 && (
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-700 mb-2">Transisikan Status Proker (BPH Otoritas):</p>
                <div className="flex flex-wrap gap-2">
                  {['DIAJUKAN', 'DISETUJUI', 'BERLANGSUNG', 'MENUNGGU_LPJ', 'LPJ_DISAHKAN'].map(s => (
                    <button
                      key={s}
                      onClick={() => handleUpdateStatus(selectedProker.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedProker.status === s 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MODAL AJUKAN PROKER BARU ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Ajukan Proker Inovatif</h3>
                <p className="text-xs text-slate-500">Isi rancangan awal program kerja deputi</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl text-slate-400 hover:text-slate-800">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Nama Program Kerja</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Seminar Edukasi CBP Rupiah 2026"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Deputi Pengusung</label>
                  <select
                    value={formData.deputiId}
                    onChange={e => setFormData({ ...formData, deputiId: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    {DEPUTI_LIST.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Anggaran (Rp)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Lokasi Kegiatan</label>
                  <input
                    type="text"
                    placeholder="Aula Bank Indonesia"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30"
                >
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
