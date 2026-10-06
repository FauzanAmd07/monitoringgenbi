import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import LoadingScreen from './components/LoadingScreen';
import LoginSlide from './components/LoginSlide';
import DashboardView from './views/DashboardView';
import ProkerView from './views/ProkerView';
import KalenderView from './views/KalenderView';
import TugasView from './views/TugasView';
import BerkasView from './views/BerkasView';
import RiwayatBerkasView from './views/RiwayatBerkasView';
import VerifikasiView from './views/VerifikasiView';
import PresensiView from './views/PresensiView';
import PoinKeaktifanView from './views/PoinKeaktifanView';
import RekapView from './views/RekapView';
import NotifikasiView from './views/NotifikasiView';
import ProfilView from './views/ProfilView';
import AdminControlView from './views/AdminControlView';
import TestPage from './app/page';
import { supabase } from './lib/supabase';
import { getStoredState, saveStoredState } from './data/mockData';

export default function App() {
  const [initialData] = useState(() => getStoredState());

  const [currentUser, setCurrentUser] = useState(initialData.currentUser);
  const [users, setUsers] = useState(initialData.users);
  const [programs, setPrograms] = useState(initialData.programs);
  const [submissions, setSubmissions] = useState(initialData.submissions);
  const [meetings, setMeetings] = useState(initialData.meetings);

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [showLoading, setShowLoading] = useState(true);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  // Persist state on mutations
  useEffect(() => {
    saveStoredState({
      currentUser,
      users,
      programs,
      submissions,
      meetings
    });
  }, [currentUser, users, programs, submissions, meetings]);

  // Sync users with Supabase automatically
  useEffect(() => {
    async function syncUsersFromSupabase() {
      try {
        const { data, error } = await supabase.from('users').select('*');
        if (!error && data && data.length > 0) {
          const formattedUsers = data.map((u, idx) => {
            const lowerNama = (u.nama || '').toLowerCase();
            let role = 'anggota';
            let roleLevel = 7;
            let roleTitle = 'Anggota';

            if (lowerNama.includes('ahmad')) {
              role = 'admin';
              roleLevel = 1;
              roleTitle = 'Admin Utama';
            } else if (lowerNama.includes('ayu suci')) {
              role = 'ketua_deputi';
              roleLevel = 5;
              roleTitle = 'Ketua Deputi MM';
            } else if (lowerNama.includes('uci')) {
              role = 'sekertaris_deputi';
              roleLevel = 6;
              roleTitle = 'Sekertaris Deputi MM';
            }

            return {
              id: u.id || `u-${idx + 1}`,
              nama: u.nama,
              name: u.nama,
              email: u.email,
              password: u.password || 'GenBI2026!',
              role,
              roleLevel,
              roleTitle,
              deputi: u.deputi,
              deputiId: 'multimedia',
              points: 25
            };
          });
          setUsers(formattedUsers);
        }
      } catch (err) {
        console.log('Supabase sync fallback to local users:', err);
      }
    }
    syncUsersFromSupabase();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setHasLoggedIn(true);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setHasLoggedIn(false);
  };

  // 1. STAGE 1: Layar Pembuka / Cinematic Loading Screen
  if (showLoading) {
    return (
      <LoadingScreen 
        user={currentUser} 
        onComplete={() => setShowLoading(false)} 
      />
    );
  }

  // 2. STAGE 2: Fullscreen Slide Halaman Login (Muncul persis setelah Loading Screen selesai, sebelum ke Dashboard)
  if (!hasLoggedIn) {
    return (
      <LoginSlide
        users={users}
        onLogin={handleLogin}
      />
    );
  }

  // 3. STAGE 3: Dashboard Utama (Hanya dapat diakses setelah pengguna berhasil Login)
  return (
    <div style={{
      display: 'flex', height: '100vh', width: '100vw',
      overflow: 'hidden', fontFamily: "'Montserrat', sans-serif",
      WebkitFontSmoothing: 'antialiased', color: '#0f172a',
      background: '#f7f8fc',
      position: 'relative',
    }}>
      {/* ── Dynamic Ambient Background Aura for Wow factor ── */}
      <div style={{
        position: 'fixed', top: '-15%', right: '10%',
        width: '550px', height: '550px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(42, 54, 132, 0.08) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-10%', left: '20%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(188, 18, 59, 0.06) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', top: '35%', right: '2%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(242, 186, 24, 0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        users={users}
        setCurrentUser={setCurrentUser}
        submissions={submissions}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        minWidth: 0, overflowY: 'auto', background: 'transparent',
        position: 'relative', zIndex: 1,
      }}>
        <Topbar 
          currentTab={currentTab} 
          currentUser={currentUser} 
          onLogout={handleLogout}
          onNotificationClick={() => setCurrentTab('notifikasi')}
        />

        <main style={{
          flex: 1, padding: '28px 32px 64px',
          maxWidth: 1360, margin: '0 auto', width: '100%',
        }}>
          {currentTab === 'dashboard' && (
            <DashboardView
              currentUser={currentUser}
              programs={programs}
              submissions={submissions}
              meetings={meetings}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'proker' && (
            <ProkerView
              currentUser={currentUser}
              programs={programs}
              setPrograms={setPrograms}
            />
          )}

          {currentTab === 'kalender' && (
            <KalenderView
              programs={programs}
            />
          )}

          {currentTab === 'tugas' && (
            <TugasView
              currentUser={currentUser}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'berkas' && (
            <BerkasView
              currentUser={currentUser}
              submissions={submissions}
              setSubmissions={setSubmissions}
            />
          )}

          {currentTab === 'riwayat-berkas' && (
            <RiwayatBerkasView
              submissions={submissions}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'verifikasi' && (
            <VerifikasiView
              currentUser={currentUser}
              submissions={submissions}
              setSubmissions={setSubmissions}
            />
          )}

          {currentTab === 'presensi' && (
            <PresensiView
              currentUser={currentUser}
              users={users}
              setUsers={setUsers}
              meetings={meetings}
              setMeetings={setMeetings}
            />
          )}

          {currentTab === 'poin' && (
            <PoinKeaktifanView
              currentUser={currentUser}
              users={users}
            />
          )}

          {currentTab === 'admin-control' && (
            <AdminControlView
              currentUser={currentUser}
              users={users}
              setUsers={(newUsers) => {
                setUsers(newUsers);
                // Jika currentUser ada dalam daftar baru, sinkronisasi poin
                const updatedCurrent = newUsers.find(u => u.id === currentUser.id);
                if (updatedCurrent) setCurrentUser(updatedCurrent);
              }}
              programs={programs}
              setPrograms={setPrograms}
              submissions={submissions}
              setSubmissions={setSubmissions}
              meetings={meetings}
              setMeetings={setMeetings}
            />
          )}


          {currentTab === 'tes-koneksi' && (
            <div style={{
              background: '#ffffff', padding: 24, borderRadius: 16,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #eef0f4',
            }}>
              <TestPage />
            </div>
          )}

          {currentTab === 'rekap' && (
            <RekapView
              programs={programs}
              submissions={submissions}
              users={users}
              meetings={meetings}
            />
          )}

          {currentTab === 'notifikasi' && (
            <NotifikasiView
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'profil' && (
            <ProfilView
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        </main>
      </div>
    </div>
  );
}
