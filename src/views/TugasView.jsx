import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Circle, Clock, Flame, Play, Pause, RotateCcw, 
  Plus, AlertCircle, Sparkles, Filter, X, ArrowRight, Zap, Target
} from 'lucide-react';

export default function TugasView({ currentUser, setCurrentTab }) {
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [activeTabStatus, setActiveTabStatus] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [earnedXpToast, setEarnedXpToast] = useState(null);

  // ─── BUILT-IN POMODORO FOCUS TIMER WIDGET ───
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState('FOCUS'); // 'FOCUS' | 'BREAK'

  useEffect(() => {
    let interval = null;
    if (pomodoroRunning && pomodoroSeconds > 0) {
      interval = setInterval(() => setPomodoroSeconds(s => s - 1), 1000);
    } else if (pomodoroSeconds === 0) {
      setPomodoroRunning(false);
      if (pomodoroMode === 'FOCUS') {
        alert('🎉 Sesi Fokus 25 menit selesai! Istirahat 5 menit sekarang.');
        setPomodoroMode('BREAK');
        setPomodoroSeconds(5 * 60);
      } else {
        alert('☕ Waktu istirahat selesai! Mulai sesi fokus kembali.');
        setPomodoroMode('FOCUS');
        setPomodoroSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroRunning, pomodoroSeconds, pomodoroMode]);

  const fmtTimer = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Unggah Dokumen LPJ Workshop Desain Multimedia',
      category: 'Penyetoran Berkas',
      dueDate: '09 Okt 2026',
      dueTime: '23:59 WITA',
      priority: 'URGENT',
      stage: 'IN_PROGRESS',
      deputi: 'Multimedia',
      reward: '+35 XP',
      desc: 'Sertakan nota kuitansi bermaterai dan daftar absensi 45 peserta.'
    },
    {
      id: 2,
      title: 'Review Draf Rundown Sosialisasi QRIS Pasar Tradisional',
      category: 'Koordinasi Acara',
      dueDate: '04 Okt 2026',
      dueTime: '17:00 WITA',
      priority: 'HIGH',
      stage: 'TODO',
      deputi: 'Pendidikan',
      reward: '+20 XP',
      desc: 'Koordinasi dengan divisi Humas terkait sound system dan banner BI.'
    },
    {
      id: 3,
      title: 'Verifikasi Absensi QR Rapat Pleno Wilayah #3',
      category: 'Presensi',
      dueDate: '06 Okt 2026',
      dueTime: '12:00 WITA',
      priority: 'MEDIUM',
      stage: 'TODO',
      deputi: 'BPH GenBI',
      reward: '+15 XP',
      desc: 'Sinkronisasi token QR dengan database presensi anggota.'
    },
    {
      id: 4,
      title: 'Finalisasi Feed Instagram Info Beasiswa Tahap II',
      category: 'Publikasi',
      dueDate: '01 Okt 2026',
      dueTime: '18:00 WITA',
      priority: 'MEDIUM',
      stage: 'COMPLETED',
      deputi: 'Multimedia',
      reward: '+25 XP',
      desc: 'Desain carousel 4 slide dan reels teaser 30 detik telah dipublikasikan.'
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDeputi, setNewTaskDeputi] = useState(currentUser.deputiId || 'Multimedia');
  const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id !== id) return t;
      const nextStage = t.stage === 'COMPLETED' ? 'TODO' : 'COMPLETED';
      if (nextStage === 'COMPLETED') {
        setEarnedXpToast(t.reward);
        setTimeout(() => setEarnedXpToast(null), 3500);
      }
      return { ...t, stage: nextStage };
    }));
  };

  const advanceTaskStage = (id, newStage) => {
    setTasks(tasks.map(t => {
      if (t.id !== id) return t;
      if (newStage === 'COMPLETED') {
        setEarnedXpToast(t.reward);
        setTimeout(() => setEarnedXpToast(null), 3500);
      }
      return { ...t, stage: newStage };
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const task = {
      id: Date.now(),
      title: newTaskTitle,
      category: 'Tugas Operasional',
      dueDate: '12 Okt 2026',
      dueTime: '18:00 WITA',
      priority: newTaskPriority,
      stage: 'TODO',
      deputi: newTaskDeputi,
      reward: '+20 XP',
      desc: 'Tugas kepengurusan terdaftar mandiri.'
    };
    setTasks([task, ...tasks]);
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (filterPriority !== 'ALL' && t.priority !== filterPriority) return false;
    if (activeTabStatus === 'TODO' && t.stage === 'COMPLETED') return false;
    if (activeTabStatus === 'COMPLETED' && t.stage !== 'COMPLETED') return false;
    return true;
  });

  const completedCount = tasks.filter(t => t.stage === 'COMPLETED').length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="w-full flex flex-col font-sans space-y-6">
      {/* XP Toast Notification */}
      {earnedXpToast && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-amber-500 text-slate-950 font-black shadow-2xl flex items-center gap-3 animate-bounce">
          <Zap size={22} className="text-slate-950 fill-current" />
          <span>Tugas Selesai! Kamu Mendapatkan {earnedXpToast}</span>
        </div>
      )}

      {/* ─── THEMED HERO: HYPER-PRODUCTIVITY COMMAND DECK ─── */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 text-white shadow-2xl border border-amber-800/40">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/4 -bottom-24 w-60 h-60 rounded-full bg-orange-500/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
              <Flame size={14} className="text-amber-400 fill-current animate-pulse" />
              FOCUS COMMAND DECK • PRODUCTIVITY ENGINE
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
              Tugas & Deadline Tanggung Jawab
            </h1>
            <p className="text-xs md:text-sm text-amber-200/80 leading-relaxed">
              Eksekusi setiap action item kepengurusan tanpa distraksi. Kumpulkan XP keaktifan dan tingkatkan streak produktivitasmu.
            </p>
          </div>

          {/* Interactive Built-in Pomodoro Focus Dial */}
          <div className="flex items-center gap-5 bg-white/5 backdrop-blur-md p-4 md:p-5 rounded-3xl border border-white/10 shrink-0">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                {pomodoroMode === 'FOCUS' ? '🎯 FOCUS TIMER' : '☕ BREAK TIME'}
              </span>
              <p className="text-3xl font-mono font-black text-white tracking-widest my-0.5">
                {fmtTimer(pomodoroSeconds)}
              </p>
              <span className="text-[10px] text-amber-200/60 font-semibold">25 Min Work Cycle</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setPomodoroRunning(!pomodoroRunning)}
                className={`p-2.5 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  pomodoroRunning 
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30' 
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={pomodoroRunning ? 'Pause' : 'Start'}
              >
                {pomodoroRunning ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
              </button>
              <button
                onClick={() => { setPomodoroRunning(false); setPomodoroSeconds(25 * 60); setPomodoroMode('FOCUS'); }}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Task Completion Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-bold">Progres Hari Ini:</span>
            <span className="font-extrabold text-white">{completedCount} dari {tasks.length} Selesai ({progressPct}%)</span>
          </div>
          <div className="w-full sm:w-64 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── CONTROLS & STATUS TOGGLE ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTabStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTabStatus === 'ALL' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Semua ({tasks.length})
            </button>
            <button
              onClick={() => setActiveTabStatus('TODO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTabStatus === 'TODO' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Belum ({tasks.length - completedCount})
            </button>
            <button
              onClick={() => setActiveTabStatus('COMPLETED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTabStatus === 'COMPLETED' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600'
              }`}
            >
              Selesai ({completedCount})
            </button>
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 border-0 focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">Semua Prioritas</option>
            <option value="URGENT">Mendesak (Urgent)</option>
            <option value="HIGH">Tinggi (High)</option>
            <option value="MEDIUM">Normal</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/25 transition-all"
        >
          <Plus size={16} />
          <span>Tambah Tugas Baru</span>
        </button>
      </div>

      {/* ─── TASK MATRIX CARDS ─── */}
      <div className="space-y-3">
        {filteredTasks.map(t => {
          const isDone = t.stage === 'COMPLETED';
          const isUrgent = t.priority === 'URGENT';

          return (
            <div
              key={t.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone 
                  ? 'bg-slate-50/70 border-slate-200 opacity-75' 
                  : isUrgent 
                  ? 'bg-white border-amber-300 shadow-md ring-1 ring-amber-400/20' 
                  : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTaskStatus(t.id)}
                  className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                    isDone 
                      ? 'bg-emerald-600 text-white' 
                      : 'border-2 border-slate-300 hover:border-amber-500 text-transparent hover:text-amber-500'
                  }`}
                >
                  <CheckCircle2 size={16} className={isDone ? 'stroke-current' : ''} />
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {t.category}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      • {t.deputi}
                    </span>
                    {isUrgent && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 animate-pulse">
                        Mendesak
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm md:text-base font-bold ${
                    isDone ? 'line-through text-slate-400' : 'text-slate-900'
                  }`}>
                    {t.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                    {t.desc}
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <Clock size={12} /> {t.dueDate} ({t.dueTime})
                    </span>
                    <span className="font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      Reward: {t.reward}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Action Switcher */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {t.stage === 'TODO' && (
                  <button
                    onClick={() => advanceTaskStage(t.id, 'IN_PROGRESS')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    Kerjakan Sekarang
                  </button>
                )}
                {t.stage === 'IN_PROGRESS' && (
                  <button
                    onClick={() => advanceTaskStage(t.id, 'COMPLETED')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Tandai Selesai
                  </button>
                )}
                {isDone && (
                  <button
                    onClick={() => toggleTaskStatus(t.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Buka Kembali
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── MODAL TAMBAH TUGAS ─── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Buat Tugas Kepengurusan Baru</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 text-slate-400 hover:text-slate-800">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Judul / Kewajiban</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Siapkan materi presentasi LPJ Triwulan"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700">Deputi</label>
                  <select
                    value={newTaskDeputi}
                    onChange={e => setNewTaskDeputi(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-200"
                  >
                    <option value="Multimedia">Multimedia</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Lingkungan">Lingkungan</option>
                    <option value="BPH GenBI">BPH GenBI</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Tingkat Prioritas</label>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-200"
                  >
                    <option value="MEDIUM">Normal</option>
                    <option value="HIGH">Tinggi</option>
                    <option value="URGENT">Mendesak</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold shadow-md shadow-amber-600/30"
                >
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
