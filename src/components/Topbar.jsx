import React, { useState } from 'react';

export default function Topbar({ currentTab, currentUser, onLogout, onNotificationClick }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const getTabLabel = (tab) => {
    const labels = {
      'dashboard': 'Dashboard Eksekutif',
      'proker': 'Program Kerja & Kegiatan',
      'kalender': 'Kalender Kegiatan Komunitas',
      'tugas': 'Tugas, Timeline & Deadline',
      'berkas': 'Penyetoran & Arsip Dokumen',
      'riwayat-berkas': 'Riwayat Dokumen & Audit',
      'verifikasi': 'Verifikasi Berkas Berjenjang',
      'presensi': 'Presensi Digital & QR Rapat',
      'poin': 'Poin Keaktifan Beasiswa',
      'rekap': 'Rekapitulasi & Ekspor Laporan',
      'notifikasi': 'Pusat Pemberitahuan Sistem',
      'profil': 'Profil & Portofolio Penerima',
      'admin-control': 'Panel Kontrol Administrasi',
      'tes-koneksi': 'Diagnostik & Status Server',
    };
    return labels[tab] || 'Portal GenBI';
  };

  const getTabIcon = (tab) => {
    const icons = {
      'dashboard': 'space_dashboard',
      'proker': 'assignment',
      'kalender': 'calendar_month',
      'tugas': 'pending_actions',
      'berkas': 'cloud_upload',
      'riwayat-berkas': 'folder_shared',
      'verifikasi': 'rule_folder',
      'presensi': 'how_to_reg',
      'poin': 'military_tech',
      'rekap': 'table_chart',
      'notifikasi': 'notifications',
      'profil': 'person',
      'admin-control': 'admin_panel_settings',
      'tes-koneksi': 'sync_alt',
    };
    return icons[tab] || 'home';
  };

  return (
    <>
      <style>{`
        @keyframes bellSwing {
          0%, 100% { transform: rotate(0); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-12deg); }
          60% { transform: rotate(7deg); }
          80% { transform: rotate(-4deg); }
        }

        @keyframes pulseGlowGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0); }
        }

        @keyframes lightSweepTopbar {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .topbar-glass {
          height: 64px;
          background: rgba(247, 248, 252, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(42, 54, 132, 0.08);
          box-shadow: 0 4px 20px rgba(42, 54, 132, 0.03);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          position: sticky;
          top: 0;
          z-index: 30;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.25s ease;
        }

        .topbar-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(42, 54, 132, 0.1) 0%, rgba(242, 186, 24, 0.15) 100%);
          border: 1px solid rgba(42, 54, 132, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2a3684;
          box-shadow: 0 2px 8px rgba(42, 54, 132, 0.08);
          transition: transform 0.2s ease;
        }

        .topbar-icon-box:hover {
          transform: scale(1.06) rotate(4deg);
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .topbar-search-input {
          height: 40px;
          width: 250px;
          padding: 0 38px 0 40px;
          border-radius: 12px;
          border: 1.5px solid rgba(42, 54, 132, 0.12);
          background: #ffffff;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'Montserrat', sans-serif;
          color: #0f172a;
          outline: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .topbar-search-input:focus {
          border-color: #2a3684;
          width: 320px;
          box-shadow: 0 0 0 4px rgba(42, 54, 132, 0.12), 0 4px 12px rgba(42, 54, 132, 0.08);
        }

        .topbar-search-input::placeholder {
          color: #94a3b8;
          font-weight: 500;
        }

        .search-shortcut {
          position: absolute;
          right: 12px;
          padding: 2px 6px;
          border-radius: 6px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 10px;
          font-weight: 700;
          pointer-events: none;
        }

        .action-icon-button {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(42, 54, 132, 0.1);
          background: #ffffff;
          color: #2a3684;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
        }

        .action-icon-button:hover {
          background: #2a3684;
          color: #ffffff;
          border-color: #2a3684;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(42, 54, 132, 0.25);
        }

        .action-icon-button:hover .bell-icon {
          animation: bellSwing 0.8s ease-in-out;
        }

        .notification-ping-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #bc123b;
          border: 2px solid #ffffff;
          box-shadow: 0 0 8px rgba(188, 18, 59, 0.7);
        }

        .user-top-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 12px 5px 6px;
          border-radius: 99px;
          background: #ffffff;
          border: 1.5px solid rgba(42, 54, 132, 0.12);
          box-shadow: 0 2px 8px rgba(42, 54, 132, 0.05);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-top-chip:hover {
          border-color: #2a3684;
          box-shadow: 0 4px 14px rgba(42, 54, 132, 0.12);
          transform: translateY(-1px);
        }

        .pulse-live-indicator {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border-radius: 99px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #15803d;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulseGlowGreen 2s infinite;
        }
      `}</style>

      <header className="topbar-glass">
        {/* Left: Breadcrumb & Context */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="topbar-icon-box">
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              {getTabIcon(currentTab)}
            </span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 16, fontWeight: 800,
                color: '#0f172a', letterSpacing: '-0.02em',
              }}>
                {getTabLabel(currentTab)}
              </span>
              <span style={{
                fontSize: 10, fontWeight: 700,
                padding: '2px 8px', borderRadius: 99,
                background: 'rgba(42, 54, 132, 0.08)',
                color: '#2a3684',
                border: '1px solid rgba(42, 54, 132, 0.15)',
              }}>
                GENBI UNM
              </span>
            </div>
            <div style={{
              fontSize: 11, color: '#64748b',
              fontWeight: 500, marginTop: 1,
            }}>
              Bank Indonesia Wilayah Sulawesi Selatan • Tahun 2026/2027
            </div>
          </div>
        </div>

        {/* Center: Live Sync Status (Visible on medium+ screens) */}
        <div className="hidden lg:flex items-center">
          <div className="pulse-live-indicator">
            <span className="pulse-dot" />
            <span>CLOUD SYNC AKTIF • GOOGLE DRIVE BI</span>
          </div>
        </div>

        {/* Right: Search, Notification & User Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Quick Search */}
          <div className="search-container hidden md:flex">
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute', left: 12, fontSize: 18,
                color: searchFocused ? '#2a3684' : '#94a3b8',
                pointerEvents: 'none', transition: 'color 0.2s',
              }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Cari proker, berkas, anggota..."
              className="topbar-search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {!searchFocused && !searchValue && (
              <span className="search-shortcut">⌘K</span>
            )}
          </div>

          {/* Notification Button */}
          <button
            type="button"
            className="action-icon-button"
            onClick={onNotificationClick}
            title="Lihat Notifikasi"
          >
            <span className="material-symbols-outlined bell-icon" style={{ fontSize: 20 }}>
              notifications
            </span>
            <span className="notification-ping-dot" />
          </button>

          {/* User Profile Chip */}
          <div
            className="user-top-chip"
            onClick={onLogout}
            title="Klik untuk keluar / ganti akun"
          >
            <div style={{
              width: 30, height: 30, borderRadius: 50,
              background: 'linear-gradient(135deg, #2a3684 0%, #192257 100%)',
              border: '2px solid #f2ba18',
              boxShadow: '0 0 8px rgba(242, 186, 24, 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#f2ba18', fontSize: 12, fontWeight: 800,
            }}>
              {(currentUser.name || 'G')[0]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 4 }}>
              <span style={{
                fontSize: 12, fontWeight: 700, color: '#0f172a',
                lineHeight: 1.2, maxWidth: 120, overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {currentUser.name?.split(' ')[0] || 'Pengguna'}
              </span>
              <span style={{
                fontSize: 9.5, fontWeight: 700,
                color: '#bc123b', lineHeight: 1.1,
              }}>
                {currentUser.roleTitle || 'Anggota'}
              </span>
            </div>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16, color: '#94a3b8', marginLeft: 2 }}
            >
              expand_more
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
