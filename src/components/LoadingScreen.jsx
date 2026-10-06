import React, { useState, useEffect, useRef, useCallback } from 'react';
import genbiLogo from '../../GENBI SULSEL.png';

/* ═══════════════════════════════════════════════════════════════
   GenBI UNM Sipakainge — Prestigious Executive Splash Screen
   Royal Blue (#2a3684), Gold (#f2ba18), Crimson (#bc123b)
   Clean, institutional, zero neon glow, comfortable & refined
   ═══════════════════════════════════════════════════════════════ */

const STYLES = `
@keyframes logoEnter {
  0%   { opacity: 0; transform: scale(0.92) translateY(12px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes fadeUp {
  0%   { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes progressShimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

@keyframes splashOut {
  0%   { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.02); }
}
`;

export default function LoadingScreen({ user, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [phase, setPhase] = useState('entrance');
  const [showLogo, setShowLogo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const typingRef = useRef(null);
  const statusRef = useRef('');

  /* ── Typewriter effect ── */
  const typeText = useCallback((text, cb) => {
    if (typingRef.current) clearInterval(typingRef.current);
    let i = 0;
    statusRef.current = '';
    setStatusText('');
    typingRef.current = setInterval(() => {
      if (i < text.length) {
        statusRef.current += text[i];
        setStatusText(statusRef.current);
        i++;
      } else {
        clearInterval(typingRef.current);
        cb?.();
      }
    }, 20);
  }, []);

  /* ── Staggered entrance ── */
  useEffect(() => {
    const t1 = setTimeout(() => setShowLogo(true), 150);
    const t2 = setTimeout(() => setShowTitle(true), 450);
    const t3 = setTimeout(() => {
      setShowProgress(true);
      setPhase('loading');
    }, 800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  /* ── Loading steps ── */
  useEffect(() => {
    if (phase !== 'loading') return;

    const steps = [
      { p: 20, text: 'Inisialisasi modul Bank Indonesia...' },
      { p: 42, text: user ? `Mengonfirmasi kredensial ${user.name}...` : 'Memverifikasi sesi anggota...' },
      { p: 68, text: 'Sinkronisasi repositori arsip LPJ...' },
      { p: 88, text: 'Memuat program kerja & indikator kinerja...' },
      { p: 100, text: 'Portal Eksekutif Siap ✓' },
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setProgress(steps[step].p);
        typeText(steps[step].text);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => onComplete?.(), 400);
        }, 400);
      }
    }, 380);

    return () => { clearInterval(interval); if (typingRef.current) clearInterval(typingRef.current); };
  }, [phase, user, onComplete, typeText]);

  const isExiting = phase === 'exit';

  return (
    <>
      <style>{STYLES}</style>
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          fontFamily: "'Montserrat', sans-serif",
          userSelect: 'none', cursor: 'default',
          background: 'linear-gradient(135deg, #0d1230 0%, #151d48 50%, #0c102a 100%)',
          animation: isExiting ? 'splashOut 0.4s ease forwards' : 'none',
        }}
      >
        {/* Subtle executive geometric watermark */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.6, pointerEvents: 'none',
        }} />

        {/* ── Content ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          padding: '0 24px',
        }}>

          {/* Clean Institutional Emblem */}
          {showLogo && (
            <div style={{
              animation: 'logoEnter 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
            }}>
              <div style={{
                padding: '16px 20px',
                background: '#ffffff',
                borderRadius: 20,
                border: '1.5px solid #f2ba18',
                boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={genbiLogo}
                  alt="GenBI UNM Sipakainge"
                  style={{
                    height: 'min(82px, 16vw)', width: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          )}

          {/* Title */}
          {showTitle && (
            <div style={{
              textAlign: 'center', marginTop: 24,
              animation: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 99,
                background: 'rgba(242, 186, 24, 0.12)',
                border: '1px solid rgba(242, 186, 24, 0.3)',
                color: '#f2ba18', fontSize: 10.5, fontWeight: 800,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: 8,
              }}>
                BANK INDONESIA WILAYAH SULAWESI SELATAN
              </div>

              <h1 style={{
                fontSize: 'clamp(20px, 4vw, 30px)',
                fontWeight: 900, letterSpacing: '-0.02em',
                color: '#ffffff', lineHeight: 1.25,
                margin: 0,
              }}>
                GenBI UNM <span style={{ color: '#f2ba18' }}>Sipakainge</span>
              </h1>
              <p style={{
                fontSize: 'clamp(11px, 1.3vw, 12.5px)',
                color: 'rgba(226, 232, 240, 0.75)',
                fontWeight: 600, letterSpacing: '0.04em',
                marginTop: 6,
              }}>
                Sistem Monitoring Program Kerja & Tata Kelola LPJ
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {showProgress && (
            <div style={{
              marginTop: 30, width: 'min(320px, 80vw)',
              animation: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}>
              {/* Bar track */}
              <div style={{
                width: '100%', height: 4, borderRadius: 99,
                background: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  height: '100%', width: `${progress}%`,
                  borderRadius: 99,
                  background: progress >= 100
                    ? '#16a34a'
                    : 'linear-gradient(90deg, #2a3684 0%, #f2ba18 100%)',
                  transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '35%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'progressShimmer 1.6s ease-in-out infinite',
                  }} />
                </div>
              </div>

              {/* Percentage & Status text */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginTop: 10,
              }}>
                <span style={{
                  color: progress >= 100 ? '#4ade80' : 'rgba(226, 232, 240, 0.85)',
                  fontSize: 11.5,
                  fontWeight: 600,
                }}>
                  {statusText}
                  <span style={{
                    display: 'inline-block', width: 2, height: 12,
                    background: progress >= 100 ? '#4ade80' : '#f2ba18',
                    marginLeft: 3, verticalAlign: 'text-bottom',
                    animation: 'blink 0.8s step-end infinite',
                  }} />
                </span>
                <span style={{
                  fontSize: 12, fontWeight: 800,
                  color: progress >= 100 ? '#4ade80' : '#f2ba18',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {progress}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          position: 'absolute', bottom: 22, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 2,
        }}>
          <span style={{
            color: 'rgba(242, 186, 24, 0.65)', fontSize: 10,
            fontWeight: 800, letterSpacing: '0.08em',
          }}>
            KPW BANK INDONESIA PROVINSI SULAWESI SELATAN
          </span>
          <span style={{
            color: 'rgba(226, 232, 240, 0.4)', fontSize: 9.5, fontWeight: 500,
          }}>
            Komunitas Generasi Baru Indonesia • Universitas Negeri Makassar
          </span>
        </div>
      </div>
    </>
  );
}
