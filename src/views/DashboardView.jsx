import React, { useState, useEffect } from 'react';

/* ─── Animated Counter Hook with Ease-Out Expo ─── */
function useAnimatedCounter(target, duration = 1400, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
}

/* ─── Live Clock Component ─── */
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (n) => String(n).padStart(2, '0');
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline',
        fontVariantNumeric: 'tabular-nums',
        fontSize: 16, fontWeight: 800, color: '#0f172a',
      }}>
        <span>{fmt(time.getHours())}:{fmt(time.getMinutes())}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#f2ba18', marginLeft: 2 }}>
          :{fmt(time.getSeconds())}
        </span>
      </div>
      <div style={{ width: 1, height: 16, background: '#cbd5e1' }} />
      <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>
        {days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}
      </div>
    </div>
  );
}

export default function DashboardView({
  currentUser,
  programs = [],
  submissions = [],
  meetings = [],
  setCurrentTab
}) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [dashboardTab, setDashboardTab] = useState('ikhtisar'); // 'ikhtisar' | 'proker' | 'berkas'
  const [selectedProkerId, setSelectedProkerId] = useState(programs[0]?.id || null);

  const pendingSubs = submissions.filter(s => s.status?.includes('MENUNGGU'));
  const approvedSubs = submissions.filter(s => s.status === 'DISETUJUI' || s.status === 'SELESAI' || s.status === 'LPJ_DISAHKAN');
  const activeProkers = programs.filter(p => p.status === 'BERLANGSUNG' || p.status === 'DISETUJUI');

  const animActiveProkers = useAnimatedCounter(activeProkers.length, 1200, 100);
  const animPending = useAnimatedCounter(pendingSubs.length, 1200, 200);
  const animPoints = useAnimatedCounter(currentUser?.points || 128, 1400, 300);
  const animMeetings = useAnimatedCounter(meetings.length, 1200, 400);

  const statCards = [
    {
      id: 'proker',
      label: 'Program Kerja Aktif',
      value: animActiveProkers,
      suffix: 'kegiatan',
      trend: '+2 program bulan ini',
      accentColor: '#2a3684',
      bgLight: 'rgba(42, 54, 132, 0.04)',
      icon: 'rocket_launch',
      footerText: 'Terdekat: 5 Okt 2026',
      tabTarget: 'proker',
      spark: [3, 4, 3, 6, 5, 8, activeProkers.length]
    },
    {
      id: 'berkas',
      label: 'Antrean Verifikasi Berkas',
      value: animPending,
      suffix: 'berkas',
      trend: `${approvedSubs.length} berkas disahkan`,
      accentColor: '#bc123b',
      bgLight: 'rgba(188, 18, 59, 0.04)',
      icon: 'rule_folder',
      footerText: pendingCountText(pendingSubs.length),
      tabTarget: currentUser?.roleLevel <= 6 ? 'verifikasi' : 'berkas',
      spark: [1, 2, 4, 3, 5, 2, pendingSubs.length]
    },
    {
      id: 'poin',
      label: 'Poin Keaktifan Beasiswa',
      value: animPoints,
      suffix: 'poin',
      trend: 'Peringkat #04 Terbaik',
      accentColor: '#f2ba18',
      bgLight: 'rgba(242, 186, 24, 0.06)',
      icon: 'military_tech',
      footerText: 'Target Semester: 150 Poin',
      tabTarget: 'poin',
      spark: [20, 45, 60, 85, 100, 115, currentUser?.points || 128]
    },
    {
      id: 'presensi',
      label: 'Tingkat Kehadiran Rapat',
      value: animMeetings,
      suffix: 'sesi rapat',
      trend: '100% Tepat Waktu',
      accentColor: '#1e2968',
      bgLight: 'rgba(30, 41, 104, 0.04)',
      icon: 'groups',
      footerText: `${meetings.filter(m => m.status === 'SELESAI').length} rapat rampung`,
      tabTarget: 'presensi',
      spark: [1, 1, 2, 2, 3, 4, meetings.length]
    }
  ];

  function pendingCountText(count) {
    if (count === 0) return 'Semua berkas telah tertinjau';
    return `${count} dokumen menunggu persetujuan`;
  }

  const quickLaunchers = [
    { label: 'Setor Berkas LPJ', icon: 'cloud_upload', tab: 'berkas', color: '#2a3684', desc: 'Unggah laporan proker' },
    { label: 'Presensi Rapat QR', icon: 'qr_code_scanner', tab: 'presensi', color: '#16a34a', desc: 'Scan kehadiran kegiatan' },
    { label: 'Poin & Peringkat', icon: 'military_tech', tab: 'poin', color: '#f2ba18', desc: 'Leaderboard beasiswa' },
    { label: 'Tenggat Tugas', icon: 'pending_actions', tab: 'tugas', color: '#bc123b', desc: 'Cek deadline LPJ' },
    { label: 'Kalender Agenda', icon: 'calendar_month', tab: 'kalender', color: '#1e2968', desc: 'Jadwal kegiatan BI' },
    { label: 'Rekapitulasi Data', icon: 'table_chart', tab: 'rekap', color: '#475569', desc: 'Ekspor laporan resmi' },
  ];

  const filteredPrograms = programs.filter(p => {
    if (activeFilter === 'ALL') return true;
    return p.deputiId === activeFilter;
  });

  return (
    <>
      <style>{`
        @keyframes fadeInSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dash-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          font-family: 'Montserrat', sans-serif;
          animation: fadeInSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Executive Header */
        .dash-exec-header {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          padding: 24px 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 10px 24px -6px rgba(42, 54, 132, 0.04);
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
          overflow: hidden;
        }

        .dash-exec-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2a3684 0%, #f2ba18 50%, #bc123b 100%);
        }

        .exec-tab-btn {
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          border: 1px solid transparent;
          background: transparent;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .exec-tab-btn:hover {
          color: #2a3684;
          background: #f1f5f9;
        }

        .exec-tab-btn.active {
          background: #2a3684;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(42, 54, 132, 0.2);
        }

        /* KPI Card */
        .kpi-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e8ecf4;
          padding: 22px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03), 0 8px 20px -4px rgba(42, 54, 132, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .kpi-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: 0 12px 28px -6px rgba(42, 54, 132, 0.09);
        }

        .kpi-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
        }

        /* Launcher Item */
        .launcher-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #eef2f6;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .launcher-card:hover {
          border-color: #2a3684;
          background: #f8fafc;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px -3px rgba(42, 54, 132, 0.08);
        }

        /* Proker List Card */
        .proker-item-row {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #edf1f7;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          transition: all 0.2s ease;
        }

        .proker-item-row:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }

        /* Filter chip */
        .filter-chip {
          padding: 5px 12px;
          border-radius: 99px;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #64748b;
          transition: all 0.15s ease;
        }

        .filter-chip:hover {
          border-color: #2a3684;
          color: #2a3684;
        }

        .filter-chip.active {
          background: #2a3684;
          border-color: #2a3684;
          color: #ffffff;
        }
      `}</style>

      <div className="dash-container">
        {/* ─── 1. EXECUTIVE WELCOME & CONTEXT BANNER ─── */}
        <section className="dash-exec-header">
          <div style={{
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: '#2a3684',
                  background: 'rgba(42, 54, 132, 0.08)',
                  padding: '3px 10px', borderRadius: 99,
                }}>
                  PORTAL EKSEKUTIF KEPENGURUSAN
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: '#bc123b',
                  background: 'rgba(188, 18, 59, 0.08)',
                  padding: '3px 10px', borderRadius: 99,
                }}>
                  PERIODE 2026/2027
                </span>
              </div>
              <h1 style={{
                fontSize: 24, fontWeight: 800, color: '#0f172a',
                letterSpacing: '-0.02em', margin: 0, lineHeight: 1.25,
              }}>
                Selamat Datang, {currentUser?.name || 'Pengurus'}
              </h1>
              <p style={{
                fontSize: 13, color: '#64748b', fontWeight: 500,
                marginTop: 4, marginBottom: 0,
              }}>
                Portal Pemantauan Program Kerja & Tata Kelola Berkas Komunitas Penerima Beasiswa Bank Indonesia UNM.
              </p>
            </div>

            {/* Clock & Status */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: '10px 18px',
            }}>
              <LiveClock />
            </div>
          </div>

          {/* Role Directive Ribbon */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 16,
            background: 'linear-gradient(90deg, #f8fafd 0%, #f1f5fb 100%)',
            border: '1px solid #e2eaf5',
            borderRadius: 12,
            padding: '12px 18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#2a3684', color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>assignment_ind</span>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#2a3684', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Wewenang Peran: {currentUser?.roleTitle || 'Anggota'}
                </span>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: '#334155', margin: '2px 0 0' }}>
                  {currentUser?.roleLevel === 1 && 'Akses Penuh Pengesahan LPJ, Verifikasi Akhir, dan Manajemen Program Kerja Wilayah.'}
                  {currentUser?.roleLevel === 4 && 'Pemeriksaan kelengkapan nota kuitansi, bukti bayar kegiatan, dan audit anggaran proker.'}
                  {currentUser?.roleLevel === 5 && 'Verifikasi tahap ke-2 dokumen LPJ program kerja deputi sebelum diserahkan ke BPH.'}
                  {currentUser?.roleLevel === 6 && 'Pemeriksaan tahap awal kelengkapan administrasi dan format laporan pengurus deputi.'}
                  {currentUser?.roleLevel > 6 && 'Pastikan menyetor laporan kegiatan tepat waktu dan aktif dalam agenda rapat mingguan.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCurrentTab(currentUser?.roleLevel <= 6 ? 'verifikasi' : 'berkas')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 8,
                background: '#2a3684', color: '#ffffff',
                border: 'none', fontSize: 12, fontWeight: 700,
                fontFamily: 'Montserrat', cursor: 'pointer',
                flexShrink: 0, transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1e2968'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#2a3684'; }}
            >
              <span>{currentUser?.roleLevel <= 6 ? 'Tinjau Antrean' : 'Setor Berkas'}</span>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </button>
          </div>

          {/* Interactive Navigation Switcher */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            borderTop: '1px solid #f1f5f9', paddingTop: 14,
          }}>
            <button
              type="button"
              className={`exec-tab-btn ${dashboardTab === 'ikhtisar' ? 'active' : ''}`}
              onClick={() => setDashboardTab('ikhtisar')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>dashboard</span>
              <span>Ikhtisar Eksekutif</span>
            </button>
            <button
              type="button"
              className={`exec-tab-btn ${dashboardTab === 'proker' ? 'active' : ''}`}
              onClick={() => setDashboardTab('proker')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>assignment</span>
              <span>Milestone Program Kerja</span>
            </button>
            <button
              type="button"
              className={`exec-tab-btn ${dashboardTab === 'berkas' ? 'active' : ''}`}
              onClick={() => setDashboardTab('berkas')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>rule_folder</span>
              <span>Alur Verifikasi LPJ</span>
            </button>
          </div>
        </section>

        {/* ─── 2. EXECUTIVE 4 KPI METRIC CARDS ─── */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
        }}>
          {statCards.map((card) => (
            <div
              key={card.id}
              className="kpi-card"
              onClick={() => setCurrentTab(card.tabTarget)}
            >
              <div className="kpi-accent-bar" style={{ background: card.accentColor }} />

              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{
                    fontSize: 11.5, fontWeight: 700, color: '#64748b',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}>
                    {card.label}
                  </span>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: card.bgLight, color: card.accentColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                      {card.icon}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                    {card.value}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>
                    {card.suffix}
                  </span>
                </div>

                <div style={{
                  fontSize: 11, fontWeight: 700, color: card.accentColor,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <span>●</span>
                  <span>{card.trend}</span>
                </div>
              </div>

              <div style={{
                marginTop: 18, paddingTop: 12,
                borderTop: '1px solid #f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontSize: 11.5, color: '#64748b', fontWeight: 500,
              }}>
                <span>{card.footerText}</span>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#94a3b8' }}>
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* ─── 3. MAIN DASHBOARD CONTENT AREA ─── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 5fr)',
          gap: 24,
        }}>
          {/* LEFT COLUMN: Dynamic Tab Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* TAB A: Ikhtisar Eksekutif / Proker Highlights */}
            {dashboardTab === 'ikhtisar' && (
              <div style={{
                background: '#ffffff', borderRadius: 20,
                border: '1px solid #e2e8f0', padding: 24,
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: 18,
                  flexWrap: 'wrap', gap: 12,
                }}>
                  <div>
                    <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      Agenda & Program Kerja Prioritas
                    </h2>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0' }}>
                      Status progres dan kelengkapan dokumen LPJ kegiatan per deputi
                    </p>
                  </div>

                  {/* Filter chips */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    {['ALL', 'multimedia', 'pendidikan', 'lingkungan'].map((dep) => (
                      <button
                        key={dep}
                        type="button"
                        className={`filter-chip ${activeFilter === dep ? 'active' : ''}`}
                        onClick={() => setActiveFilter(dep)}
                      >
                        {dep === 'ALL' ? 'Semua Deputi' : dep.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Proker Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {filteredPrograms.slice(0, 4).map((p) => {
                    const verifiedCount = p.checklists?.filter(c => c.status === 'DISAHKAN').length || 0;
                    const totalCheck = p.checklists?.length || 1;
                    const percent = Math.round((verifiedCount / totalCheck) * 100);

                    return (
                      <div key={p.id} className="proker-item-row">
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{
                              fontSize: 10, fontWeight: 700,
                              padding: '2px 8px', borderRadius: 6,
                              background: '#f1f5f9', color: '#475569',
                              textTransform: 'uppercase',
                            }}>
                              {p.deputiId}
                            </span>
                            <span style={{
                              fontSize: 11, fontWeight: 700,
                              color: p.status === 'BERLANGSUNG' ? '#16a34a' : (p.status === 'DISETUJUI' ? '#2a3684' : '#d97706'),
                            }}>
                              ● {p.status}
                            </span>
                          </div>
                          <h4 style={{
                            fontSize: 13.5, fontWeight: 700, color: '#0f172a',
                            margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {p.title}
                          </h4>
                          <span style={{ fontSize: 11, color: '#64748b', marginTop: 2, display: 'block' }}>
                            📅 {p.startDate} • PIC: {p.chairman || 'Koordinator Deputi'}
                          </span>
                        </div>

                        {/* Progress */}
                        <div style={{ width: 140, flexShrink: 0, textAlign: 'right' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>
                            {percent}% Dokumen Disahkan
                          </span>
                          <div style={{
                            width: '100%', height: 6, borderRadius: 99,
                            background: '#e2e8f0', marginTop: 4, overflow: 'hidden',
                          }}>
                            <div style={{
                              height: '100%', width: `${percent}%`,
                              borderRadius: 99,
                              background: percent === 100 ? '#16a34a' : '#2a3684',
                              transition: 'width 0.6s ease',
                            }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB B: Milestone Program Kerja Details */}
            {dashboardTab === 'proker' && (
              <div style={{
                background: '#ffffff', borderRadius: 20,
                border: '1px solid #e2e8f0', padding: 24,
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: '0 0 14px' }}>
                  Roadmap Milestone Kegiatan GenBI 2026/2027
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {programs.map((p, idx) => (
                    <div
                      key={p.id}
                      style={{
                        padding: 16, borderRadius: 14,
                        border: '1px solid #eef2f6', background: '#fafbfc',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10,
                          background: '#2a3684', color: '#ffffff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, fontWeight: 800,
                        }}>
                          {idx + 1}
                        </div>
                        <div>
                          <p style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                            {p.title}
                          </p>
                          <p style={{ fontSize: 11, color: '#64748b', margin: '2px 0 0' }}>
                            Anggaran: Rp {(p.budget || 2500000).toLocaleString('id-ID')} • Target: {p.targetParticipants || '100 Peserta'}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentTab('proker')}
                        style={{
                          padding: '6px 14px', borderRadius: 8,
                          background: '#ffffff', border: '1px solid #cbd5e1',
                          color: '#2a3684', fontSize: 11.5, fontWeight: 700,
                          cursor: 'pointer', fontFamily: 'Montserrat',
                        }}
                      >
                        Detail Proker
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB C: Alur Verifikasi Berkas LPJ */}
            {dashboardTab === 'berkas' && (
              <div style={{
                background: '#ffffff', borderRadius: 20,
                border: '1px solid #e2e8f0', padding: 24,
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                  Matriks Verifikasi Dokumen Berjenjang
                </h2>
                <p style={{ fontSize: 12, color: '#64748b', marginBottom: 20 }}>
                  Prosedur audit kepatuhan arsip dokumen Bank Indonesia Sulawesi Selatan
                </p>

                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 12, marginBottom: 20,
                }}>
                  {[
                    { step: '1. Pengunggahan', desc: 'Anggota / Panitia', status: 'Selesai', color: '#16a34a' },
                    { step: '2. Review Sekor', desc: 'Verifikasi Format', status: 'Aktif', color: '#2a3684' },
                    { step: '3. Audit Bendahara', desc: 'Nota & Bukti Transaksi', status: 'Menunggu', color: '#f2ba18' },
                    { step: '4. Pengesahan BPH', desc: 'Arsip Final Google Drive', status: 'Menunggu', color: '#bc123b' }
                  ].map((s, i) => (
                    <div
                      key={s.step}
                      style={{
                        padding: 14, borderRadius: 12,
                        background: '#f8fafc', border: `1.5px solid ${s.color}30`,
                        borderTop: `3px solid ${s.color}`,
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 800, color: s.color, textTransform: 'uppercase' }}>
                        {s.status}
                      </span>
                      <h4 style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a', margin: '4px 0 2px' }}>
                        {s.step}
                      </h4>
                      <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Submissions Queue */}
            <div style={{
              background: '#ffffff', borderRadius: 20,
              border: '1px solid #e2e8f0', padding: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 16,
              }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Dokumen & Berkas Masuk Terkini
                  </h3>
                  <p style={{ fontSize: 11.5, color: '#64748b', margin: '2px 0 0' }}>
                    Daftar pengunggahan dokumen yang memerlukan tindak lanjut
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentTab('riwayat-berkas')}
                  style={{
                    background: 'none', border: 'none', color: '#2a3684',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: 4,
                  }}
                >
                  <span>Lihat Seluruhnya</span>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {submissions.slice(0, 3).map((sub) => (
                  <div
                    key={sub.id}
                    style={{
                      padding: 14, borderRadius: 12,
                      background: '#f8fafc', border: '1px solid #eef2f6',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: '#eef2ff', color: '#2a3684',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>description</span>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{
                          fontSize: 13, fontWeight: 700, color: '#0f172a',
                          margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {sub.title}
                        </p>
                        <p style={{ fontSize: 11, color: '#64748b', margin: '2px 0 0' }}>
                          Oleh {sub.uploaderName} • {sub.submittedAt}
                        </p>
                      </div>
                    </div>

                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      padding: '3px 10px', borderRadius: 99,
                      background: sub.status?.includes('MENUNGGU') ? 'rgba(188, 18, 59, 0.08)' : 'rgba(22, 163, 74, 0.08)',
                      color: sub.status?.includes('MENUNGGU') ? '#bc123b' : '#16a34a',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {sub.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Quick Launchers & Executive Widgets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Quick Launcher Hub */}
            <div style={{
              background: '#ffffff', borderRadius: 20,
              border: '1px solid #e2e8f0', padding: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                Pusat Pintasan Aksi
              </h3>
              <p style={{ fontSize: 11.5, color: '#64748b', margin: '0 0 16px' }}>
                Akses cepat ke seluruh kanal operasional kepengurusan
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {quickLaunchers.map((item) => (
                  <div
                    key={item.label}
                    className="launcher-card"
                    onClick={() => setCurrentTab(item.tab)}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: `${item.color}15`, color: item.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                        {item.icon}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: 11, color: '#64748b', margin: '2px 0 0' }}>
                        {item.desc}
                      </p>
                    </div>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#cbd5e1' }}>
                      arrow_forward_ios
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cloud Drive Storage Widget */}
            <div style={{
              background: '#ffffff', borderRadius: 20,
              border: '1px solid #e2e8f0', padding: 24,
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span className="material-symbols-outlined" style={{ color: '#2a3684', fontSize: 22 }}>
                  cloud_sync
                </span>
                <div>
                  <h4 style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Repositori Cloud Bank Indonesia
                  </h4>
                  <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>
                    Google Drive Terenkripsi AES-256
                  </p>
                </div>
              </div>

              <div style={{
                background: '#f8fafc', borderRadius: 12, padding: 14,
                border: '1px solid #eef2f6', marginBottom: 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: '#334155' }}>
                  <span>Penyimpanan Terpakai</span>
                  <span style={{ color: '#2a3684' }}>14.2 GB / 100 GB</span>
                </div>
                <div style={{
                  width: '100%', height: 6, borderRadius: 99,
                  background: '#e2e8f0', marginTop: 8, overflow: 'hidden',
                }}>
                  <div style={{
                    width: '14.2%', height: '100%',
                    background: 'linear-gradient(90deg, #2a3684, #f2ba18)',
                    borderRadius: 99,
                  }} />
                </div>
              </div>

              <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                Seluruh dokumen resmi LPJ tersinkronisasi otomatis dengan folder arsip BPH KPw Bank Indonesia Provinsi Sulawesi Selatan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
