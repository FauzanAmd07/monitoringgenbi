// Mock data and State Engine for Sistem Monitoring GenBI
// References: sistem-monitoring-penyetoran-berkas-komunitas-beasiswa-bi.md

export const DEPUTI_LIST = [
  { id: 'multimedia', name: 'Multimedia Management', shortName: 'MM', color: '#3b82f6', icon: 'Video' },
  { id: 'pr', name: 'Public Relation', shortName: 'PR', color: '#8b5cf6', icon: 'Megaphone' },
  { id: 'psdm', name: 'PSDM (Pengembangan SDM)', shortName: 'PSDM', color: '#ec4899', icon: 'Users' },
  { id: 'pendidikan', name: 'Pendidikan', shortName: 'PDK', color: '#10b981', icon: 'GraduationCap' },
  { id: 'lingkungan', name: 'Lingkungan Hidup', shortName: 'LH', color: '#14b8a6', icon: 'Leaf' }
];

export const ROLE_HIERARCHY = {
  1: { level: 1, title: 'Ketua', badge: 'BPH Inti', canOverride: true, scope: 'Komunitas' },
  2: { level: 2, title: 'Wakil Ketua', badge: 'BPH Inti', canOverride: false, scope: 'Komunitas' },
  3: { level: 3, title: 'Sekretaris Umum', badge: 'BPH Inti', canOverride: false, scope: 'Komunitas' },
  4: { level: 4, title: 'Bendahara Umum', badge: 'BPH Inti', canOverride: false, scope: 'Keuangan' },
  5: { level: 5, title: 'Koordinator Deputi', badge: 'Pengurus Deputi', canOverride: false, scope: 'Deputi' },
  6: { level: 6, title: 'Sekretaris Koordinator', badge: 'Admin Deputi', canOverride: false, scope: 'Deputi' },
  7: { level: 7, title: 'Anggota', badge: 'Member', canOverride: false, scope: 'Pribadi' }
};

export const INITIAL_USERS = [
  { id: 'u-1', name: 'Ahmad Fauzan', nama: 'Ahmad Fauzan', role: 'admin', roleLevel: 1, roleTitle: 'Admin Utama', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'ahmad.fauzan@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-2', name: 'Ayu Suci Ibrahim', nama: 'Ayu Suci Ibrahim', role: 'ketua_deputi', roleLevel: 5, roleTitle: 'Ketua Deputi MM', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'ayu.suci@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-3', name: 'Uci Adityantikasari', nama: 'Uci Adityantikasari', role: 'sekertaris_deputi', roleLevel: 6, roleTitle: 'Sekertaris Deputi MM', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'uci.adityanti@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-4', name: 'Muh. Fahril Alfarezki', nama: 'Muh. Fahril Alfarezki', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'fahril.alfarezki@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-5', name: 'Muhammad Fauzan', nama: 'Muhammad Fauzan', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'muh.fauzan@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-6', name: 'Nurul Maulida Muhlis', nama: 'Nurul Maulida Muhlis', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'nurul.maulida@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-7', name: 'Safitriani', nama: 'Safitriani', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'safitriani@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-8', name: 'Firgiawan Listianto', nama: 'Firgiawan Listianto', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'firgiawan@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-9', name: 'Ferdiansyah', nama: 'Ferdiansyah', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'ferdiansyah@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-10', name: 'Ayu Lestari', nama: 'Ayu Lestari', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'ayu.lestari@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-11', name: 'Sahrani', nama: 'Sahrani', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'sahrani@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-12', name: 'Juhariah Ningrum', nama: 'Juhariah Ningrum', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'juhariah@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-13', name: 'Arnil S.L.', nama: 'Arnil S.L.', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'arnil@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-14', name: 'azzika adzahila', nama: 'azzika adzahila', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'azzika@genbi.org', password: 'GenBI2026!', points: 0 },
  { id: 'u-15', name: 'Andi Syahratul Aeni', nama: 'Andi Syahratul Aeni', role: 'anggota', roleLevel: 7, roleTitle: 'Anggota', deputi: 'Multimedia Management', deputiId: 'multimedia', email: 'andi.syahratul@genbi.org', password: 'GenBI2026!', points: 0 }
];

export const INITIAL_PROGRAMS = [];

export const INITIAL_SUBMISSIONS = [];

export const INITIAL_MEETINGS = [];

// LocalStorage Persistence Engine
// V4: Reset awal periode — semua poin mulai dari 0, data kosong
const STORAGE_KEY = 'GENBI_MONITORING_STATE_V4';

export function getStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
  }
  return {
    currentUser: INITIAL_USERS[0],
    users: INITIAL_USERS,
    programs: INITIAL_PROGRAMS,
    submissions: INITIAL_SUBMISSIONS,
    meetings: INITIAL_MEETINGS,
    driveUsedGB: 0,
    driveMaxGB: 400.0,
    emailSentToday: 0,
    emailMaxPerDay: 100
  };
}

export function saveStoredState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
}

/**
 * Reset total: hapus semua data (absen, proker, berkas) dan kembalikan
 * semua poin user ke 0. Setelah dipanggil, reload halaman untuk efek penuh.
 */
export function resetAllState() {
  const freshState = {
    currentUser: INITIAL_USERS[0],
    users: INITIAL_USERS,
    programs: [],
    submissions: [],
    meetings: [],
    driveUsedGB: 0,
    driveMaxGB: 400.0,
    emailSentToday: 0,
    emailMaxPerDay: 100
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(freshState));
  } catch (err) {
    console.error('Failed to reset state', err);
  }
  return freshState;
}
