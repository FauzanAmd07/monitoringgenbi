import React, { useState } from 'react';
import genbiSulselLogo from '../../GENBI SULSEL.png';

export default function LoginModal({ users, onLogin, isOpen, onClose }) {
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || 'u-1');
  const [password, setPassword] = useState('GenBI2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }

    const user = users.find(u => u.id === selectedUserId);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <>
      <style>{`
        @keyframes modalOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalCardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        background: 'rgba(10, 15, 42, 0.65)',
        backdropFilter: 'blur(12px)',
        -webkit-backdrop-filter: blur(12px)',
        fontFamily: "'Montserrat', sans-serif",
        animation: 'modalOverlayIn 0.25s ease',
      }}>
        <div style={{
          position: 'relative', width: '100%', maxWidth: 440,
          background: '#ffffff', borderRadius: 20,
          border: '1.5px solid rgba(42, 54, 132, 0.15)',
          boxShadow: '0 24px 60px rgba(10, 15, 42, 0.35)',
          overflow: 'hidden',
          animation: 'modalCardIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {/* Top accent */}
          <div style={{
            height: 4,
            background: 'linear-gradient(90deg, #2a3684 0%, #f2ba18 50%, #bc123b 100%)',
          }} />

          {/* Close */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{
                position: 'absolute', top: 14, right: 14,
                width: 32, height: 32, borderRadius: 8,
                border: 'none', background: '#f1f5f9',
                color: '#64748b', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
            </button>
          )}

          <div style={{ padding: '32px 30px 26px' }}>
            {/* Header */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center', marginBottom: 24,
            }}>
              <div style={{
                padding: 10, background: '#ffffff',
                borderRadius: 14, border: '2px solid rgba(242, 186, 24, 0.6)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                marginBottom: 14,
              }}>
                <img
                  src={genbiSulselLogo}
                  alt="Logo GenBI"
                  style={{ height: 46, width: 'auto', objectFit: 'contain' }}
                />
              </div>
              <h2 style={{
                fontSize: 20, fontWeight: 900, color: '#0f172a',
                letterSpacing: '-0.02em', margin: 0,
              }}>
                Ganti Akun / <span style={{ color: '#2a3684' }}>Masuk Portal</span>
              </h2>
              <p style={{
                fontSize: 11.5, color: '#64748b', fontWeight: 500, marginTop: 4,
              }}>
                Portal Resmi Komunitas GenBI UNM Sipakainge
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {errorMsg && (
                <div style={{
                  padding: '10px 14px', borderRadius: 10,
                  background: 'rgba(188, 18, 59, 0.1)',
                  border: '1px solid rgba(188, 18, 59, 0.3)',
                  color: '#bc123b', fontSize: 12, fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>error</span>
                  {errorMsg}
                </div>
              )}

              {/* User selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontSize: 12, fontWeight: 700, color: '#334155',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2a3684' }}>person</span>
                  Pilih Akun Pengurus
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedUserId}
                    onChange={(e) => {
                      setSelectedUserId(e.target.value);
                      setErrorMsg('');
                    }}
                    style={{
                      width: '100%', height: 44, padding: '0 40px 0 14px',
                      borderRadius: 12, border: '1.5px solid #e2e8f0',
                      background: '#f8f9fc', color: '#0f172a',
                      fontSize: 13, fontWeight: 600,
                      fontFamily: "'Montserrat', sans-serif",
                      appearance: 'none', cursor: 'pointer', outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#2a3684'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
                  >
                    {users.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.roleTitle} — {u.nama || u.name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined" style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)', fontSize: 18,
                    color: '#2a3684', pointerEvents: 'none',
                  }}>unfold_more</span>
                </div>
              </div>

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontSize: 12, fontWeight: 700, color: '#334155',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#2a3684' }}>lock</span>
                  Kata Sandi
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
                    style={{
                      width: '100%', height: 44, padding: '0 44px 0 14px',
                      borderRadius: 12, border: '1.5px solid #e2e8f0',
                      background: '#f8f9fc', color: '#0f172a',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 13, fontWeight: 500, outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#2a3684'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: 10, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none',
                      color: '#2a3684', cursor: 'pointer', padding: 4,
                      display: 'flex',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: '100%', height: 46, marginTop: 4,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #2a3684 0%, #192257 60%, #bc123b 100%)',
                  color: '#ffffff', fontWeight: 800, fontSize: 13,
                  fontFamily: "'Montserrat', sans-serif",
                  border: '1px solid rgba(242, 186, 24, 0.3)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8,
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 16px rgba(42, 54, 132, 0.35)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>
                Masuk ke Dashboard
              </button>
            </form>

            {/* Footer */}
            <div style={{
              marginTop: 22, paddingTop: 16,
              borderTop: '1px solid #f1f5f9',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: 10.5, color: '#94a3b8', fontWeight: 600, margin: 0,
              }}>
                © GenBI UNM Sipakainge · Wilayah Sulawesi Selatan
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
