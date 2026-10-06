import React, { useState } from 'react';
import { resetAllState, INITIAL_USERS } from '../data/mockData';

export default function AdminControlView({
  currentUser,
  users,
  setUsers,
  programs,
  setPrograms,
  submissions,
  setSubmissions,
  meetings,
  setMeetings
}) {
  const [activeSubTab, setActiveSubTab] = useState('users'); // 'users', 'submissions', 'programs', 'reset'
  const [editingUser, setEditingUser] = useState(null);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1 = pilih opsi, 2 = konfirmasi

  // 1. Handlers for Users
  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    setNotificationMsg(`✅ Data anggota '${editingUser.nama || editingUser.name}' berhasil dikoreksi!`);
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  const handleAddUser = () => {
    const newUser = {
      id: `u-${Date.now()}`,
      nama: 'Anggota Baru',
      name: 'Anggota Baru',
      email: `anggota${users.length + 1}@genbi.org`,
      role: 'anggota',
      roleLevel: 7,
      roleTitle: 'Anggota',
      deputi: 'Multimedia Management',
      points: 20
    };
    setUsers([...users, newUser]);
    setEditingUser(newUser);
  };

  const handleDeleteUser = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data anggota ini?')) {
      setUsers(users.filter(u => u.id !== id));
      setNotificationMsg('✅ Anggota berhasil dihapus dari sistem.');
      setTimeout(() => setNotificationMsg(''), 4000);
    }
  };

  // 2. Handlers for Submissions Override
  const handleUpdateSubmissionStatus = (subId, newStatus, adminNote) => {
    setSubmissions(submissions.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: newStatus,
          adminNotes: adminNote || s.adminNotes || 'Dikoreksi langsung oleh Admin Utama',
          stage: newStatus === 'DISETUJUI' ? 'Disahkan Admin' : newStatus === 'PERLU_REVISI' ? 'Perlu Revisi' : 'Ditolak'
        };
      }
      return s;
    }));
    setEditingSubmission(null);
    setNotificationMsg('✅ Status penyetoran berkas berhasil diperbaiki oleh Admin.');
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  // 3. Handler Reset Sistem
  const handleResetAll = () => {
    const fresh = resetAllState();
    setUsers(fresh.users);
    setPrograms(fresh.programs);
    setSubmissions(fresh.submissions);
    setMeetings(fresh.meetings);
    setShowResetConfirm(false);
    setResetStep(1);
    setNotificationMsg('✅ Sistem berhasil direset! Semua data absen, proker, dan berkas telah dikosongkan. Poin semua anggota kembali ke 0.');
    setTimeout(() => setNotificationMsg(''), 6000);
  };

  const handleResetPointsOnly = () => {
    setUsers(users.map(u => ({ ...u, points: 0 })));
    setShowResetConfirm(false);
    setResetStep(1);
    setNotificationMsg('✅ Semua poin keaktifan anggota berhasil direset ke 0.');
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  const handleResetAbsenOnly = () => {
    setMeetings([]);
    // Reset poin dari presensi (kurangi semua poin terkait absen)
    setUsers(users.map(u => ({ ...u, points: 0 })));
    setShowResetConfirm(false);
    setResetStep(1);
    setNotificationMsg('✅ Semua riwayat absen dan poin presensi berhasil direset ke 0.');
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  return (
    <div className="space-y-6 select-none font-sans pb-12">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-primary-container to-slate-900 text-white rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
              <span className="material-symbols-outlined text-[32px] text-amber-400">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight">Pusat Kendali Admin Utama</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                  Full Override Control
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Koreksi data anggota, perbaiki kesalahan penyetoran berkas, override status proker & kendali penuh sistem.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/10 text-xs">
            <span className="px-3 py-1.5 font-bold text-white">Admin Aktif:</span>
            <span className="px-3 py-1.5 bg-amber-400 text-slate-950 font-black rounded-xl">
              {currentUser.nama || currentUser.name}
            </span>
          </div>
        </div>
      </div>

      {/* Notification Message */}
      {notificationMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
            <span>{notificationMsg}</span>
          </div>
          <button onClick={() => setNotificationMsg('')} className="text-emerald-600 hover:text-emerald-900">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Admin Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'users'
              ? 'bg-primary text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">group</span>
          <span>Kelola Anggota ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('submissions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'submissions'
              ? 'bg-primary text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">folder_managed</span>
          <span>Koreksi Berkas ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('programs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'programs'
              ? 'bg-primary text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
          <span>Override Proker ({programs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reset')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'reset'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          <span>Reset Sistem</span>
        </button>
      </div>

      {/* 1. TAB: KELOLA ANGGOTA */}
      {activeSubTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">manage_accounts</span>
              Daftar Anggota & Koreksi Peran
            </h3>
            <button
              onClick={handleAddUser}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>+ Tambah Anggota Baru</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-3.5">Nama Anggota</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5">Peran & Level</th>
                    <th className="p-3.5">Deputi</th>
                    <th className="p-3.5">Poin</th>
                    <th className="p-3.5 text-right">Aksi Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">
                        {u.nama || u.name}
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                        {u.email}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-700 border border-purple-200'
                            : u.role === 'ketua_deputi'
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : u.role === 'sekertaris_deputi'
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {u.roleTitle}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-600">
                        {u.deputi || 'Multimedia Management'}
                      </td>
                      <td className="p-3.5 font-bold text-emerald-600">
                        {u.points || 20} Pts
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => setEditingUser(u)}
                          className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-[11px] transition-all cursor-pointer"
                        >
                          Edit / Koreksi
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold text-[11px] transition-all cursor-pointer"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB: KOREKSI BERKAS */}
      {activeSubTab === 'submissions' && (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">fact_check</span>
            Override Penyetoran Berkas & Koreksi Pengesahan
          </h3>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-3.5">Judul Dokumen</th>
                    <th className="p-3.5">Pengunggah</th>
                    <th className="p-3.5">Status Saat Ini</th>
                    <th className="p-3.5">Catatan Admin</th>
                    <th className="p-3.5 text-right">Kendali Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {submissions.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">
                        {s.documentTitle}
                        <span className="block text-[10px] text-slate-400 font-mono font-normal">
                          {s.prokerTitle}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-slate-700">
                        {s.uploaderName}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                          s.status === 'DISETUJUI'
                            ? 'bg-emerald-100 text-emerald-700'
                            : s.status === 'PERLU_REVISI'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 italic max-w-xs truncate">
                        {s.adminNotes || s.reviewNotes || '-'}
                      </td>
                      <td className="p-3.5 text-right space-x-1.5">
                        <button
                          onClick={() => handleUpdateSubmissionStatus(s.id, 'DISETUJUI', 'Disetujui Langsung Oleh Admin Utama')}
                          className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold text-[10px] transition-all cursor-pointer"
                        >
                          ✓ Paksa Disetujui
                        </button>
                        <button
                          onClick={() => handleUpdateSubmissionStatus(s.id, 'PERLU_REVISI', 'Minta Revisi Berkas')}
                          className="px-2 py-1 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white font-bold text-[10px] transition-all cursor-pointer"
                        >
                          ⚠️ Minta Revisi
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB: OVERRIDE PROKER */}
      {activeSubTab === 'programs' && (
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">checklist</span>
            Override Status Program Kerja
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map(p => (
              <div key={p.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{p.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">Ketua: {p.chairman} · Anggaran: Rp {p.budget?.toLocaleString('id-ID')}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">
                    {p.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-600">Ubah Status Proker:</span>
                  <select
                    value={p.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setPrograms(programs.map(pr => pr.id === p.id ? { ...pr, status: newStatus } : pr));
                      setNotificationMsg(`✅ Status proker '${p.title}' diubah ke ${newStatus}.`);
                      setTimeout(() => setNotificationMsg(''), 4000);
                    }}
                    className="h-8 px-2 rounded-lg bg-slate-100 text-xs font-bold text-slate-800 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="BERLANGSUNG">BERLANGSUNG</option>
                    <option value="DISETUJUI">DISETUJUI</option>
                    <option value="MENUNGGU_LPJ">MENUNGGU_LPJ</option>
                    <option value="SELESAI">SELESAI</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB: RESET SISTEM */}
      {activeSubTab === 'reset' && (
        <div className="space-y-6">
          <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
            <span className="material-symbols-outlined text-red-600 text-[28px] mt-0.5">warning</span>
            <div>
              <h3 className="text-sm font-black text-red-800">Zona Berbahaya — Reset Data Sistem</h3>
              <p className="text-xs text-red-700 mt-1 leading-relaxed">
                Opsi di bawah ini bersifat permanen dan tidak dapat dibatalkan. Pastikan Anda benar-benar ingin mengosongkan data sebelum melanjutkan. Gunakan hanya di awal periode baru.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Reset Total */}
            <div className="p-5 bg-white border-2 border-red-200 rounded-2xl space-y-3 hover:border-red-400 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-600 text-[20px]">delete_sweep</span>
                </div>
                <h4 className="text-sm font-black text-slate-900">Reset Total Sistem</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Menghapus <strong>semua data</strong>: absen, program kerja, berkas, dan mereset poin semua anggota ke <strong>0</strong>. Data anggota tetap ada.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Semua riwayat absen dihapus</li>
                <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Semua program kerja dihapus</li>
                <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Semua berkas/submissions dihapus</li>
                <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Poin semua anggota → 0</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Data anggota tetap tersimpan</li>
              </ul>
              <button
                onClick={() => { setShowResetConfirm('all'); setResetStep(1); }}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-red-600/20"
              >
                Reset Total Sistem
              </button>
            </div>

            {/* Reset Absen Saja */}
            <div className="p-5 bg-white border-2 border-orange-200 rounded-2xl space-y-3 hover:border-orange-400 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-600 text-[20px]">event_busy</span>
                </div>
                <h4 className="text-sm font-black text-slate-900">Reset Absen & Poin</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Menghapus semua riwayat absen/pertemuan dan mereset poin semua anggota ke 0. Program kerja dan berkas tidak terpengaruh.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Semua riwayat absen dihapus</li>
                <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Poin semua anggota → 0</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Program kerja tetap ada</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Berkas tetap ada</li>
              </ul>
              <button
                onClick={() => { setShowResetConfirm('absen'); setResetStep(1); }}
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-orange-500/20"
              >
                Reset Absen & Poin Saja
              </button>
            </div>

            {/* Reset Poin Saja */}
            <div className="p-5 bg-white border-2 border-amber-200 rounded-2xl space-y-3 hover:border-amber-400 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-600 text-[20px]">leaderboard</span>
                </div>
                <h4 className="text-sm font-black text-slate-900">Reset Poin Saja</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hanya mereset poin keaktifan semua anggota ke 0. Riwayat absen dan data lainnya tetap tersimpan.
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li className="flex items-center gap-1.5"><span className="text-red-500">✕</span> Poin semua anggota → 0</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Riwayat absen tetap ada</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Program kerja tetap ada</li>
                <li className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Berkas tetap ada</li>
              </ul>
              <button
                onClick={() => { setShowResetConfirm('points'); setResetStep(1); }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-amber-500/20"
              >
                Reset Poin Keaktifan Saja
              </button>
            </div>
          </div>

          {/* Info statistik saat ini */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-black text-slate-700 mb-3">Status Data Saat Ini</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                <p className="text-xl font-black text-slate-900">{meetings.length}</p>
                <p className="text-[11px] text-slate-500 font-semibold">Rapat / Pertemuan</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                <p className="text-xl font-black text-slate-900">{programs.length}</p>
                <p className="text-[11px] text-slate-500 font-semibold">Program Kerja</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                <p className="text-xl font-black text-slate-900">{submissions.length}</p>
                <p className="text-[11px] text-slate-500 font-semibold">Berkas Tersimpan</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                <p className="text-xl font-black text-slate-900">{users.reduce((a, u) => a + (u.points || 0), 0)}</p>
                <p className="text-[11px] text-slate-500 font-semibold">Total Poin Semua Anggota</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI RESET */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-200 space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-600 text-[22px]">warning</span>
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Konfirmasi Reset</h3>
                <p className="text-xs text-slate-500">
                  {showResetConfirm === 'all' && 'Reset total — semua data akan dihapus'}
                  {showResetConfirm === 'absen' && 'Reset absen & poin semua anggota'}
                  {showResetConfirm === 'points' && 'Reset poin keaktifan semua anggota'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-xs text-red-800 font-semibold leading-relaxed">
                ⚠️ Tindakan ini <strong>tidak dapat dibatalkan</strong>. Data yang dihapus tidak bisa dipulihkan. Pastikan Anda sudah melakukan backup jika diperlukan.
              </p>
            </div>

            <p className="text-xs text-slate-600">
              Apakah Anda yakin ingin melanjutkan?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => { setShowResetConfirm(false); setResetStep(1); }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Batal, Kembali
              </button>
              <button
                onClick={() => {
                  if (showResetConfirm === 'all') handleResetAll();
                  else if (showResetConfirm === 'absen') handleResetAbsenOnly();
                  else if (showResetConfirm === 'points') handleResetPointsOnly();
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black cursor-pointer shadow-md shadow-red-600/25"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">edit</span>
                Koreksi Data Anggota
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-700">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={editingUser.nama || editingUser.name || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, nama: e.target.value, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Peran Akses (Role)</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => {
                    const r = e.target.value;
                    let lvl = 7;
                    let title = 'Anggota';
                    if (r === 'admin') { lvl = 1; title = 'Admin Utama'; }
                    else if (r === 'ketua_deputi') { lvl = 5; title = 'Ketua Deputi MM'; }
                    else if (r === 'sekertaris_deputi') { lvl = 6; title = 'Sekertaris Deputi MM'; }
                    setEditingUser({ ...editingUser, role: r, roleLevel: lvl, roleTitle: title });
                  }}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50"
                >
                  <option value="admin">Admin Utama (Ahmad Fauzan)</option>
                  <option value="ketua_deputi">Ketua Deputi MM (Ayu Suci Ibrahim)</option>
                  <option value="sekertaris_deputi">Sekertaris Deputi MM (Uci Adityantikasari)</option>
                  <option value="anggota">Anggota</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Poin Keaktifan</label>
                <input
                  type="number"
                  value={editingUser.points || 0}
                  onChange={(e) => setEditingUser({ ...editingUser, points: parseInt(e.target.value) || 0 })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-md"
                >
                  Simpan Perbaikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
