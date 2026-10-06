import React, { useState } from 'react';
import genbiSulselLogo from '../../GENBI SULSEL.png';

export default function Sidebar({
  currentTab,
  setCurrentTab,
  currentUser,
  users,
  setCurrentUser,
  submissions = [],
  onLogout
}) {
  const pendingCount = submissions.filter(sub => {
    if (currentUser?.roleLevel === 6) return sub.status === 'MENUNGGU_VERIFIKASI_1' && (!currentUser.deputiId || sub.deputiId === currentUser.deputiId);
    if (currentUser?.roleLevel === 5) return sub.status === 'MENUNGGU_VERIFIKASI_2' && (!currentUser.deputiId || sub.deputiId === currentUser.deputiId);
    if (currentUser?.roleLevel === 4) return sub.status === 'MENUNGGU_BENDAHARA';
    if (currentUser?.roleLevel === 1) return sub.status?.includes('MENUNGGU');
    return false;
  }).length;

  const navSections = [
    {
      title: 'Utama',
      items: [
        { id: 'dashboard', label: 'Dashboard Eksekutif', icon: 'space_dashboard' }
      ]
    },
    {
      title: 'Kegiatan & Agenda',
      items: [
        { id: 'proker', label: 'Program Kerja', icon: 'assignment', visible: currentUser?.roleLevel <= 6 },
        { id: 'kalender', label: 'Kalender Kegiatan', icon: 'calendar_month' },
        { id: 'tugas', label: 'Tugas & Deadline', icon: 'pending_actions', badge: '3', badgeType: 'gold' }
      ]
    },
    {
      title: 'Arsip & Berkas',
      items: [
        { id: 'berkas', label: 'Penyetoran Berkas', icon: 'cloud_upload' },
        { id: 'riwayat-berkas', label: 'Riwayat Dokumen', icon: 'folder_shared' },
        {
          id: 'verifikasi',
          label: 'Verifikasi Berkas',
          icon: 'rule_folder',
          badge: pendingCount > 0 ? pendingCount : null,
          badgeType: 'crimson',
          visible: currentUser?.roleLevel <= 6
        }
      ]
    },
    {
      title: 'Keaktifan Anggota',
      items: [
        { id: 'presensi', label: 'Presensi Rapat', icon: 'how_to_reg' },
        { id: 'poin', label: 'Poin Keaktifan', icon: 'military_tech' }
      ]
    },
    {
      title: 'Administrasi',
      items: [
        { id: 'admin-control', label: 'Panel Kontrol Admin', icon: 'admin_panel_settings', visible: currentUser?.roleLevel === 1 },
        { id: 'tes-koneksi', label: 'Status Koneksi', icon: 'sync_alt', visible: currentUser?.roleLevel === 1 },
        { id: 'rekap', label: 'Rekapitulasi Data', icon: 'table_chart', visible: currentUser?.roleLevel <= 5 },
        { id: 'notifikasi', label: 'Notifikasi Sistem', icon: 'notifications', badge: '2', badgeType: 'gold' },
        { id: 'profil', label: 'Profil Pengurus', icon: 'person' }
      ]
    }
  ];

  return (
    <>
      <style>{`
        .sidebar-exec {
          width: 256px;
          background: #12183a;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          height: 100vh;
          overflow: hidden;
          position: relative;
          user-select: none;
          font-family: 'Montserrat', sans-serif;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 40;
        }

        .sidebar-nav-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-nav-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-nav-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 99px;
        }
        .sidebar-nav-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .nav-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          color: rgba(226, 232, 240, 0.75);
          position: relative;
          border: 1px solid transparent;
          background: transparent;
          text-align: left;
          outline: none;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          transform: translateX(3px);
        }

        .nav-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-weight: 700;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .nav-btn.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15%;
          height: 70%;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: #f2ba18;
        }

        .nav-btn .nav-icon {
          font-size: 19px;
          color: rgba(203, 213, 225, 0.7);
          transition: color 0.18s ease;
        }

        .nav-btn:hover .nav-icon {
          color: #ffffff;
        }

        .nav-btn.active .nav-icon {
          color: #f2ba18;
        }

        .nav-badge-crimson {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 6px;
          background: #bc123b;
          color: #ffffff;
          line-height: 14px;
        }

        .nav-badge-gold {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 6px;
          background: rgba(242, 186, 24, 0.15);
          border: 1px solid rgba(242, 186, 24, 0.3);
          color: #f2ba18;
          line-height: 14px;
        }

        .user-footer-box {
          padding: 12px 14px;
          margin: 10px 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: background 0.2s ease;
        }

        .user-footer-box:hover {
          background: rgba(255, 255, 255, 0.07);
        }

        .logout-btn-exec {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(226, 232, 240, 0.7);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s ease;
        }

        .logout-btn-exec:hover {
          background: rgba(188, 18, 59, 0.2);
          border-color: rgba(188, 18, 59, 0.5);
          color: #ff8fa5;
        }
      `}</style>

      <aside className="sidebar-exec">
        {/* Brand Header */}
        <div style={{
          padding: '18px 16px 14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              padding: 5,
              background: '#ffffff',
              borderRadius: 10,
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img
                src={genbiSulselLogo}
                alt="Logo GenBI Sulsel"
                style={{ height: 30, width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                fontSize: 13.5, fontWeight: 800, color: '#ffffff',
                letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>
                GenBI Sulsel
              </div>
              <div style={{
                fontSize: 9.5, fontWeight: 700,
                color: '#f2ba18',
                letterSpacing: '0.06em', marginTop: 2,
                textTransform: 'uppercase',
              }}>
                UNM Sipakainge
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div
          className="sidebar-nav-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '14px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {navSections.map(section => {
            const visibleItems = section.items.filter(item => item.visible !== false);
            if (visibleItems.length === 0) return null;

            return (
              <div key={section.title}>
                <div style={{
                  fontSize: 10, fontWeight: 800,
                  color: 'rgba(226, 232, 240, 0.4)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '0 12px', marginBottom: 5,
                }}>
                  {section.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {visibleItems.map(item => {
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`nav-btn ${isActive ? 'active' : ''}`}
                        onClick={() => setCurrentTab(item.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                          <span className="material-symbols-outlined nav-icon">
                            {item.icon}
                          </span>
                          <span style={{
                            overflow: 'hidden', textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <span className={item.badgeType === 'crimson' ? 'nav-badge-crimson' : 'nav-badge-gold'}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* User Profile Footer */}
        <div className="user-footer-box">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#2a3684',
                border: '1.5px solid #f2ba18',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f2ba18', fontSize: 12, fontWeight: 800,
                flexShrink: 0,
              }}>
                {(currentUser?.name || 'G')[0]}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: '#ffffff',
                  lineHeight: 1.25, overflow: 'hidden',
                  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {currentUser?.name || 'Pengguna'}
                </div>
                <div style={{
                  fontSize: 10, color: '#cbd5e1',
                  fontWeight: 500, lineHeight: 1.2, marginTop: 1,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: '#22c55e', display: 'inline-block',
                  }} />
                  {currentUser?.roleTitle || 'Anggota'}
                </div>
              </div>
            </div>
            <button
              className="logout-btn-exec"
              onClick={() => { if (onLogout) onLogout(); }}
              title="Keluar / Ganti Akun"
              type="button"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
