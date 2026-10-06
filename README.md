# Sistem Monitoring, Program Kerja & Penyetoran Berkas
### Komunitas Penerima Beasiswa Bank Indonesia (GenBI)

[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-Supabase%20%2F%20PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Storage](https://img.shields.io/badge/Storage-Google%20Drive%20API-4285F4?style=flat-square&logo=googledrive)](https://developers.google.com/drive)
[![Hosting](https://img.shields.io/badge/Deployment-Vercel%20Free%20Tier-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📌 Ringkasan Proyek

Platform web terpusat untuk memfasilitasi administrasi, monitoring program kerja, penyetoran berkas, presensi rapat, serta evaluasi keaktifan sekitar **80 anggota** komunitas penerima beasiswa Bank Indonesia yang terbagi ke dalam **5 deputi**.

Sistem ini didesain khusus agar **100% berjalan di atas infrastruktur gratis (*Free Tier*)**, memanfaatkan akun Google GenBI (Gmail biasa 15 GB) sebagai penyimpanan berkas tanpa membebani limit serverless ataupun biaya langganan bulanan.

---

## 🎯 Masalah & Solusi

| Masalah Sebelumnya | Solusi Sistem Ini |
|---|---|
| Berkas (proposal, LPJ, nota, KHS) tercecer di WhatsApp / email | Tersimpan otomatis dan terstruktur rapi di **Google Drive GenBI** |
| Tidak ada satu kalender kegiatan terpadu | **Kalender & Dashboard Program Kerja** untuk semua anggota |
| Rekap kehadiran dan keaktifan dibuat manual di spreadsheet | **Presensi digital QR/Kode** terhubung langsung ke **Poin Keaktifan** |
| Verifikasi bertumpuk dan tidak transparan | **Alur verifikasi 2 tahap** per deputi dengan riwayat revisi dan audit trail |
| Keterbatasan kuota storage & email gratis | **Client-side compression**, **Resumable Drive upload**, dan **Email Prioritized Queue** |

---

## 🏛️ Struktur Komunitas & 5 Deputi

Sistem mengelola 5 deputi utama dengan struktur kepengurusan:
1. **Multimedia Management**
2. **Public Relation**
3. **PSDM (Pengembangan Sumber Daya Manusia)**
4. **Pendidikan**
5. **Lingkungan Hidup**

Setiap deputi dipimpin oleh **1 Koordinator Deputi** dan **1 Sekretaris Koordinator** sebagai verifikator berkas dan pengelola deputi.

---

## 👥 Hierarki 7 Level Peran & Matriks Akses

### Peran Utama Sistem
1. **Level 1 - Ketua**: Otoritas tertinggi, persetujuan program kerja, pengesahan LPJ, override verifikasi, manajemen akun.
2. **Level 2 - Wakil Ketua**: Supervisi deputi, persetujuan proker bersama Ketua, verifikasi berkas pengurus.
3. **Level 3 - Sekretaris Umum (Sekum)**: Pusat administrasi, katalog berkas, periode kepengurusan, arsip dan rekap komunitas.
4. **Level 4 - Bendahara Umum (Bendum)**: Verifikasi berkas keuangan kegiatan dari bendahara panitia, rekapitulasi keuangan.
5. **Level 5 - Koordinator Deputi (Kordep)**: Memimpin proker deputi, verifikasi berkas tahap 2 (persetujuan).
6. **Level 6 - Sekretaris Koordinator (Sekor)**: Admin deputi, verifikasi berkas tahap 1 (kelengkapan), presensi & pengingat deputi.
7. **Level 7 - Anggota**: Melihat kalender, menyetor berkas tugas, presensi rapat, menjadi panitia kegiatan.

### Peran Kepanitiaan (Per Kegiatan)
Penugasan dinamis lintas deputi pada satu kegiatan:
- **Ketua Pelaksana**: Mengatur panitia, mengubah detail kegiatan, menandai kegiatan selesai.
- **Sekretaris Panitia**: Mengunggah proposal, surat-menyurat, LPJ narasi, dan dokumentasi.
- **Bendahara Panitia**: Mengunggah RAB, nota/kwitansi, LPJ keuangan (diverifikasi Bendum).
- **Anggota Seksi**: Mengunggah dokumentasi/laporan sesuai bidangnya.

---

## 🚀 Fitur Unggulan

### 1. Manajemen Program Kerja & Kalender Terpadu
- Status siklus: `RENCANA` → `DIAJUKAN` → `DISETUJUI` → `BERLANGSUNG` → `SELESAI` → `MENUNGGU_LPJ` → `LPJ_DISAHKAN`.
- Otomatis membuat checklist berkas pra-kegiatan (proposal, RAB) dan pasca-kegiatan (LPJ & dokumentasi) saat status berubah menjadi `SELESAI` dengan tenggat waktu (H+14).

### 2. Penyetoran & Verifikasi Berjenjang (2-Tahap)
- **Tahap 1 (Sekor)**: Pemeriksaan kelengkapan dokumen.
- **Tahap 2 (Kordep)**: Persetujuan isi dokumen.
- Jalur khusus keuangan langsung menuju **Bendahara Umum**.
- Pengesahan akhir LPJ kegiatan oleh **Ketua**.
- Catatan revisi transparan, tanda terima digital, dan riwayat versi berkas.

### 3. Presensi Rapat & Poin Keaktifan
- Presensi rapat digital menggunakan **Dynamic QR Code** atau kode token acak dengan batas kadaluarsa 15 menit.
- Fitur pengajuan izin / sakit dengan unggah bukti pendukung.
- Perhitungan poin keaktifan otomatis (kehadiran rapat, ketepatan penyetoran berkas, keterlibatan kepanitiaan) dengan eskalasi ambang peringatan bertingkat.

### 4. Direct Upload ke Google Drive (Hemat Kuota & Bebas Limit Vercel)
- File diunggah langsung dari browser pengguna ke folder Google Drive GenBI via *Google Drive Resumable Upload API*.
- Serverless Vercel hanya membuat sesi unggah (*session URI*) dan menyimpan `drive_file_id` di database Supabase (menghindari limit payload 4.5 MB Vercel).
- Kompresi foto otomatis di browser (target ≤ 1 MB).

---

## 🛠️ Arsitektur Teknologi (*Free-Tier Stack*)

```
[ Browser / Klien ]
   │
   ├─► Kompresi Foto (Client Canvas API)
   ├─► Resumable Upload Berkas ────────────► [ Google Drive GenBI (15 GB) ]
   │                                                 ▲
   ▼ (Payload metadata & ID)                         │ Session URI
[ Next.js API / Serverless (Vercel) ] ───────────────┘
   │
   ├─► Autentikasi & RLS Data ─────────────► [ Supabase (PostgreSQL 500 MB) ]
   │
   └─► Antrean Notifikasi Email ───────────► [ Google Apps Script / Gmail SMTP ]
                                             (Maks 100 email/hari)
```

| Komponen | Layanan / Teknologi | Keterangan Free Tier |
|---|---|---|
| **Frontend & Backend** | Next.js 14 (App Router), TypeScript, Tailwind CSS | Vercel Hobby (Gratis) |
| **Database & Auth** | Supabase (PostgreSQL + Row-Level Security) | Free 500 MB database |
| **File Storage** | Google Drive API (OAuth 2.0 Service/Refresh Token) | Akun Google GenBI 15 GB |
| **Notifikasi Email** | Gmail API / Google Apps Script Web App | 100 penerima/hari (akun biasa) |
| **Icons & UI** | Lucide React, Radix UI, TanStack Table | Ringan & aksesibel |

---

## 📂 Struktur Direktori

```text
├── public/                 # Static assets, logo GenBI & Bank Indonesia
├── src/
│   ├── app/                # Next.js App Router (Pages & API Routes)
│   │   ├── (auth)/         # Halaman login, register, reset password
│   │   ├── (dashboard)/    # Dashboard layout per peran
│   │   │   ├── admin/      # Akses Ketua, Sekum, Bendum
│   │   │   ├── deputi/     # Akses Kordep & Sekor
│   │   │   └── member/     # Akses Anggota
│   │   ├── proker/         # Kalender, detail kegiatan, panitia
│   │   ├── berkas/         # Antrean verifikasi, upload berkas, LPJ
│   │   ├── presensi/       # Scanner QR, rapat, rekap poin
│   │   └── api/            # API endpoints (Drive session, webhook, cron)
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Button, Modal, Card, Table, Input
│   │   ├── drive/          # File uploader & preview modal
│   │   └── qr/             # QR Generator & Camera Scanner
│   ├── lib/                # Konfigurasi & integrasi pihak ketiga
│   │   ├── supabase/       # Supabase client & server helper
│   │   ├── google-drive/   # Google OAuth, Drive API helper
│   │   └── email/          # Email queue & template generator
│   ├── types/              # TypeScript interfaces & database types
│   └── utils/              # Helper format tanggal, kalkulasi poin, image compress
├── supabase/
│   ├── migrations/         # Skema tabel SQL & RLS policies
│   └── seed.sql            # Data awal (5 Deputi, Katalog Berkas, Superadmin)
├── .env.example            # Template variabel lingkungan
├── package.json
└── tsconfig.json
```

---

## ⚡ Panduan Instalasi & Menjalankan Proyek

### 1. Prasyarat Sistem
- **Node.js** v18.17.0 atau versi yang lebih baru
- Akun **Google Cloud Console** (untuk mengaktifkan Google Drive API & OAuth 2.0)
- Akun **Supabase** (untuk database PostgreSQL & Auth)

### 2. Kloning Repositori
```bash
git clone https://github.com/komunitas-genbi/monitoring-berkas.git
cd monitoring-berkas
```

### 3. Instalasi Dependensi
```bash
npm install
```

### 4. Konfigurasi Variabel Lingkungan
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi nilai variabel sesuai dengan konfigurasi layanan:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Drive API (OAuth 2.0 Akun GenBI)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REFRESH_TOKEN=your-google-refresh-token
GOOGLE_DRIVE_ROOT_FOLDER_ID=your-root-folder-id-on-drive

# Email Notifikasi (Apps Script / Gmail SMTP)
GMAIL_APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/.../exec

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di alamat [http://localhost:3000](http://localhost:3000).

---

## 🗄️ Struktur Folder Google Drive Otomatis

Sistem secara otomatis membuat hierarki folder di Google Drive GenBI sehingga pengurus tidak perlu merapikan dokumen secara manual:

```text
Google Drive (GenBI Root)
└── Periode 2026-2027/
    ├── 01_Berkas_Rutin/
    │   ├── Multimedia_Management/
    │   ├── Public_Relation/
    │   ├── PSDM/
    │   ├── Pendidikan/
    │   └── Lingkungan_Hidup/
    ├── 02_Program_Kerja/
    │   ├── 2026-03_Seminar_Nasional_BI/
    │   │   ├── Proposal/
    │   │   ├── LPJ_Narasi/
    │   │   ├── LPJ_Keuangan/
    │   │   └── Dokumentasi/
    │   └── ...
    ├── 03_Keuangan_Umum/
    └── 04_Arsip_Cadangan/
```

---

## 📈 Roadmap Pengembangan

| Fase | Target | Fokus Utama |
|---|---|---|
| **Fase 0** | Minggu 1 - 2 | Persiapan akun komunitas (Google Cloud, Supabase, Vercel), uji upload Drive API, finalisasi struktur peran. |
| **Fase 1** | Minggu 3 - 8 | **MVP**: Login 7 level, manajemen 5 deputi, kalender proker, direct upload Drive, alur verifikasi 2 tahap. |
| **Fase 2** | Minggu 9 - 12 | Presensi rapat QR/kode, modul poin keaktifan, pengingat email & digest kuota hemat. |
| **Fase 3** | Minggu 13 - 15 | Jalur LPJ paralel (narasi & keuangan), pengesahan Ketua, ekspor rekapitulasi data (Excel/PDF/ZIP). |
| **Fase 4** | Berkelanjutan | Penguatan keamanan, evaluasi semester, dan fitur arsip akhir periode otomatis. |

---

## 📄 Dokumen Spesifikasi Lengkap

Dokumen rancangan sistem dan spesifikasi kebutuhan rinci (PRD v1.4) dapat diakses pada berkas:
👉 [`sistem-monitoring-penyetoran-berkas-komunitas-beasiswa-bi.md`](./sistem-monitoring-penyetoran-berkas-komunitas-beasiswa-bi.md)

---

## 🤝 Kontribusi & Pemeliharaan

Sistem ini dikelola bersama oleh Badan Pengurus Harian dan Pengurus Teknis Komunitas Penerima Beasiswa Bank Indonesia. Untuk panduan kontribusi kode dan pelaporan bug:
- Silakan buat *Issue* baru untuk diskusi fitur atau kendala teknis.
- Buat *Pull Request* dari cabang fitur mandiri (`feature/nama-fitur`).
- Pastikan minimal **2 admin teknis** memegang akses kredensial demi kelangsungan antar-periode kepengurusan.
