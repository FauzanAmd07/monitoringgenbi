import React, { useState } from 'react';
import genbiSulselLogo from '../../GENBI SULSEL.png';

/* ═══════════════════════════════════════════════════════════════
   GenBI UNM Sipakainge — Executive Gateway Authentication
   Bank Indonesia Institutional Design: Pure, Dignified, Zero Neon
   Primary #2a3684 | Secondary #bc123b | Tertiary #f2ba18 | Neutral #f7f8fc
   ═══════════════════════════════════════════════════════════════ */

export default function LoginSlide({ users, onLogin }) {
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || 'u-1');
  const [password, setPassword] = useState('GenBI2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password) {
      setErrorMsg('Silakan masukkan kata sandi Anda.');
      return;
    }

    const user = users.find(u => u.id === selectedUserId);
    const expectedPassword = user?.password || 'GenBI2026!';

    if (password !== expectedPassword && password !== 'GenBI2026!') {
      setErrorMsg('Kata sandi tidak sesuai. Silakan gunakan password default GenBI2026!');
      return;
    }

    if (user) {
      setIsSubmitting(true);
      setTimeout(() => onLogin(user), 350);
    }
  };

  const selectedUserObj = users.find(u => u.id === selectedUserId) || users[0];

  const getRoleBadgeStyle = (roleLevel) => {
    if (roleLevel === 1) return { bg: '#fffbeb', color: '#b45309', border: '#fde68a' };
    if (roleLevel <= 3) return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' };
    if (roleLevel <= 6) return { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' };
    return { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' };
  };

  const badgeStyle = getRoleBadgeStyle(selectedUserObj?.roleLevel);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Montserrat', sans-serif",
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0a0f28 0%, #121945 50%, #0d1332 100%)',
    }}>
      <style>{`
        @keyframes modalEnter {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .login-card-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
          margin: 20px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          animation: modalEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .exec-input-field {
          width: 100%;
          height: 46px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #0f172a;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .exec-input-field:focus {
          border-color: #2a3684;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(42, 54, 132, 0.1);
        }

        .exec-login-btn {
          width: 100%;
          height: 48px;
          border-radius: 12px;
          background: #2a3684;
          border: 1px solid #1e2868;
          color: #ffffff;
          font-family: 'Montserrat', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(42, 54, 132, 0.2);
        }

        .exec-login-btn:hover:not(:disabled) {
          background: #1e2868;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(42, 54, 132, 0.3);
        }

        .exec-role-pill {
          padding: 6px 12px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          transition: all 0.15s ease;
        }

        .exec-role-pill:hover {
          border-color: #2a3684;
          color: #2a3684;
          background: #f1f5f9;
        }

        .exec-role-pill.active {
          background: #2a3684;
          border-color: #2a3684;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(42, 54, 132, 0.2);
        }
      `}</style>

      {/* Subtle geometric pattern background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.7, pointerEvents: 'none',
      }} />

      {/* ── Main Clean Executive Card ── */}
      <div
        className="login-card-container"
        style={{
          opacity: isSubmitting ? 0.8 : 1,
          transform: isSubmitting ? 'scale(0.99)' : 'scale(1)',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Top Gold & Navy Accent Line */}
        <div style={{
          height: 4,
          background: 'linear-gradient(90deg, #2a3684 0%, #f2ba18 60%, #bc123b 100%)',
        }} />

        <div style={{ padding: '34px 32px 28px' }}>
          {/* Header branding */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
            marginBottom: 24,
          }}>
            <div style={{
              padding: '10px 16px', background: '#f8fafc',
              borderRadius: 16,
              border: '1.5px solid #e2e8f0',
              marginBottom: 14,
            }}>
              <img
                src={genbiSulselLogo}
                alt="Logo GenBI Sulsel"
                style={{ height: 42, width: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '3px 12px', borderRadius: 99,
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              PORTAL RESMI BANK INDONESIA SULAWESI SELATAN
            </div>

            <h1 style={{
              fontSize: 22, fontWeight: 800,
              color: '#0f172a', letterSpacing: '-0.02em',
              lineHeight: 1.25, margin: 0,
            }}>
              GenBI UNM <span style={{ color: '#2a3684' }}>Sipakainge</span>
            </h1>
            <p style={{
              fontSize: 12, color: '#64748b',
              fontWeight: 500, marginTop: 4,
            }}>
              Sistem Tata Kelola Program Kerja & Pengesahan LPJ
            </p>
          </div>

          {/* Quick role shortcuts */}
          <div style={{ marginBottom: 18 }}>
            <span style={{
              fontSize: 11, fontWeight: 700,
              color: '#475569',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              display: 'block', marginBottom: 8,
            }}>
              Akses Cepat Pengguna Demo:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {users.slice(0, 4).map(u => (
                <button
                  key={u.id}
                  type="button"
                  className={`exec-role-pill ${selectedUserId === u.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedUserId(u.id);
                    setErrorMsg('');
                  }}
                >
                  {u.roleTitle?.split(' ')[0]} - {u.nama?.split(' ')[0] || u.name?.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Error Message */}
            {errorMsg && (
              <div style={{
                padding: '10px 14px', borderRadius: 10,
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c', fontSize: 12, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 8,
                animation: 'shakeError 0.3s ease',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#bc123b' }}>
                  error
                </span>
                {errorMsg}
              </div>
            )}

            {/* Select User Dropdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{
                fontSize: 12, fontWeight: 700, color: '#334155',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2a3684' }}>
                    account_circle
                  </span>
                  Pilih Akun Pengurus ({users.length} Terdaftar)
                </span>
              </label>

              <div style={{ position: 'relative' }}>
                <select
                  value={selectedUserId}
                  onChange={(e) => {
                    setSelectedUserId(e.target.value);
                    setErrorMsg('');
                  }}
                  className="exec-input-field"
                  style={{
                    padding: '0 40px 0 14px',
                    appearance: 'none', cursor: 'pointer',
                  }}
                >
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.roleTitle} — {u.nama || u.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', right: 12, top: '50%',
                  transform: 'translateY(-50%)', fontSize: 20,
                  color: '#64748b', pointerEvents: 'none',
                }}>
                  unfold_more
                </span>
              </div>
            </div>

            {/* Selected User Info Preview Badge */}
            {selectedUserObj && (
              <div style={{
                padding: '10px 14px', borderRadius: 12,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: '#2a3684',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff', fontSize: 12, fontWeight: 800,
                  }}>
                    {(selectedUserObj.roleTitle || 'U')[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                      {selectedUserObj.nama || selectedUserObj.name}
                    </p>
                    <p style={{ fontSize: 11, color: '#64748b', margin: 0, lineHeight: 1.2, marginTop: 2 }}>
                      {selectedUserObj.roleTitle} • {selectedUserObj.deputi || 'BPH'}
                    </p>
                  </div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 800,
                  padding: '3px 10px', borderRadius: 99,
                  background: badgeStyle.bg,
                  color: badgeStyle.color,
                  border: `1px solid ${badgeStyle.border}`,
                }}>
                  Wewenang #{selectedUserObj.roleLevel}
                </span>
              </div>
            )}

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{
                fontSize: 12, fontWeight: 700, color: '#334155',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2a3684' }}>
                    lock
                  </span>
                  Kata Sandi Portal
                </span>
                <span style={{ fontSize: 11, color: '#2a3684', fontWeight: 600 }}>
                  Default: GenBI2026!
                </span>
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Masukkan kata sandi..."
                  required
                  className="exec-input-field"
                  style={{ padding: '0 46px 0 14px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: '#64748b', cursor: 'pointer',
                    padding: 4, display: 'flex',
                  }}
                  title={showPassword ? 'Sembunyikan' : 'Tampilkan'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 19 }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="exec-login-btn"
              style={{ marginTop: 4 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                {isSubmitting ? 'sync' : 'login'}
              </span>
              <span>{isSubmitting ? 'Mengautentikasi...' : 'Masuk ke Portal Eksekutif'}</span>
            </button>
          </form>

          {/* Institutional footer highlights */}
          <div style={{
            marginTop: 20, paddingTop: 14,
            borderTop: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 10.5, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#2a3684' }}>security</span>
              Sistem Enkripsi BI
            </span>
            <span style={{ fontSize: 10.5, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#16a34a' }}>cloud_done</span>
              Google Drive Terverifikasi
            </span>
            <span style={{ fontSize: 10.5, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#bc123b' }}>verified</span>
              Audit Berjenjang
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
