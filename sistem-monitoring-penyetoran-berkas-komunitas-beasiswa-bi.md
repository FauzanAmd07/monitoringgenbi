# Sistem Monitoring, Program Kerja & Penyetoran Berkas
## Komunitas Penerima Beasiswa Bank Indonesia

> Dokumen spesifikasi kebutuhan dan rancangan sistem (versi 1.4 / draf)
> Pembaruan: akun Google GenBI dikonfirmasi **Gmail biasa**; batas ruang Drive dan kuota email disesuaikan dalam rancangan.

---

## 1. Latar Belakang

Komunitas penerima beasiswa Bank Indonesia memiliki sekitar 80 anggota yang terbagi dalam lima deputi. Setiap periode kepengurusan, komunitas menjalankan banyak program kerja dan memiliki kewajiban administratif berulang: laporan, bukti partisipasi, proposal, LPJ, dokumentasi, dan laporan keuangan kegiatan. Selama ini proses tersebut berjalan lewat grup chat, email, dan formulir terpisah sehingga:

- Anggota tidak punya satu tempat untuk melihat **program kerja yang akan datang**.
- Berkas (proposal, LPJ, dokumentasi, nota) tersebar dan sulit dilacak setelah kegiatan selesai.
- Pengurus sulit mengetahui siapa yang sudah dan belum menyetor.
- Tidak ada riwayat verifikasi yang jelas, dan rekap harus dibuat manual.

## 2. Tujuan

1. Menyediakan **satu pusat informasi program kerja**: kalender kegiatan, panitia, status, dan berkas pendukungnya.
2. Memusatkan **penyetoran berkas**, termasuk LPJ dan dokumentasi setelah kegiatan selesai.
3. Memantau kepatuhan dan keaktifan anggota (berkas dan kehadiran rapat) secara transparan.
4. Mempercepat verifikasi lewat jalur yang jelas di tiap deputi.
5. Menghasilkan rekap dan arsip periode kepengurusan secara otomatis.
6. Berjalan sepenuhnya di atas layanan **gratis**.

## 3. Profil Komunitas dan Keputusan yang Sudah Dikonfirmasi

| Hal | Keputusan |
|---|---|
| Jumlah anggota | Sekitar 80 orang pada periode ini |
| Deputi | Multimedia Management, Public Relation, PSDM, Pendidikan, Lingkungan Hidup |
| Struktur tiap deputi | 1 Koordinator Deputi + 1 Sekretaris Koordinator + anggota |
| Verifikator | Admin tiap deputi (Koordinator Deputi dan Sekretaris Koordinator) |
| Kanal notifikasi | Email |
| Anggaran | Gratis (memakai free tier) |
| Pembangunan | Web dibuat dari nol |
| Domain | Belum ada; memakai alamat gratis dari layanan hosting (misalnya `nama-proyek.vercel.app`) |
| Penyimpanan berkas | **Google Drive milik GenBI**; database hanya menyimpan data teks dan ID berkas |
| Akun Google GenBI | **Gmail biasa**: ruang 15 GB gratis (dibagi Gmail, Drive, Foto) dan kuota email 100 penerima/hari |
| Masa simpan data | Satu periode kepengurusan |
| Format / ketentuan resmi dari BI | Tidak ada |
| Konsekuensi keterlambatan | Boleh, melalui sistem poin keaktifan yang memanfaatkan presensi rapat |
| Berkas keuangan | Semua hal keuangan, termasuk keuangan program kerja; Bendahara Panitia berkoordinasi dengan Bendahara Umum |
| Cakupan tambahan | Seluruh jenis kegiatan tercatat; setelah selesai, LPJ dan dokumentasi disetor di sistem |

### Keputusan Desain yang Diambil (karena diserahkan ke perancang)

| Hal | Keputusan | Alasan |
|---|---|---|
| Jalur verifikasi | **2 tahap**: Sekretaris Koordinator (kelengkapan) lalu Koordinator Deputi (persetujuan). Sekretaris Umum tidak memiliki antrean verifikasi, hanya akses arsip | Logis, selaras dengan keputusan "verifikator = admin deputi", dan tidak membebani Sekum |
| LPJ program kerja | Dua jalur paralel (narasi/dokumentasi dan keuangan), lalu **pengesahan Ketua** | Ketua bertanggung jawab atas seluruh kegiatan komunitas |
| Panitia lintas deputi | Berkas kegiatan diverifikasi oleh **deputi penyelenggara**, bukan deputi asal anggota | Penanggung jawab kegiatan adalah deputi penyelenggara |
| Konflik kepentingan | Jika verifikator termasuk panitia kegiatan tersebut, tahap itu otomatis naik ke level di atasnya | Mencegah memverifikasi pekerjaan sendiri |
| 2FA / OTP | **Tidak wajib** di versi awal; pakai kata sandi kuat dan pembatasan percobaan login. Dapat diaktifkan nanti | Menghemat kuota email gratis dan menjaga kemudahan login |
| Akses berkas di Drive | Berkas sensitif (transkrip, keuangan) **privat** dan dibuka lewat aplikasi atau izin per email; dokumentasi non-sensitif boleh berupa tautan | Menjaga privasi tanpa menyulitkan berbagi dokumentasi |
| Reset kata sandi | Dapat dilakukan **admin** (Sekum / Sekor) dengan kata sandi sementara, selain lewat email | Mengurangi ketergantungan pada kuota email |

## 4. Ruang Lingkup

### Termasuk (In Scope)
- Akun dan 7 level peran, serta peran kepanitiaan per kegiatan.
- **Modul program kerja dan kegiatan**: kalender, panitia, status, checklist berkas.
- Penyetoran berkas rutin, LPJ, dokumentasi, dan berkas keuangan kegiatan.
- Verifikasi berjenjang dan arsip per periode kepengurusan.
- **Presensi rapat** dan **poin keaktifan**.
- **Integrasi Google Drive GenBI** sebagai tempat penyimpanan seluruh berkas.
- Dashboard monitoring, notifikasi email, rekap dan ekspor.

### Tidak Termasuk (Out of Scope) untuk Versi 1
- Pembukuan / pengelolaan kas (sistem hanya menyimpan **berkas** keuangan, bukan menghitung saldo).
- Integrasi dengan sistem internal Bank Indonesia.
- Aplikasi mobile native (cukup web responsif) dan notifikasi WhatsApp.

## 5. Hierarki Peran dan Tahapan Login

Sistem memiliki **7 level peran**. Setiap akun memiliki satu peran utama, dan setelah login pengguna diarahkan ke dashboard sesuai perannya.

| Level | Peran | Tugas dalam Sistem |
|---|---|---|
| 1 | **Ketua** | Otoritas tertinggi: memantau seluruh komunitas, menyetujui program kerja, mengesahkan LPJ, memberi keputusan akhir (override), mengelola akun dan peran |
| 2 | **Wakil Ketua** | Mendampingi dan menggantikan Ketua, mensupervisi seluruh deputi, menyetujui program kerja, memverifikasi berkas pengurus |
| 3 | **Sekretaris Umum** | Pusat administrasi: jenis berkas, periode, penugasan, akun anggota, arsip, rekap dan laporan |
| 4 | **Bendahara Umum** | Memverifikasi dan merekap seluruh berkas keuangan, termasuk keuangan program kerja dari bendahara panitia |
| 5 | **Koordinator Deputi** | Memimpin satu deputi: mengelola program kerja deputinya, memberi persetujuan (tahap 2) |
| 6 | **Sekretaris Koordinator** | Admin deputi: memeriksa kelengkapan berkas (tahap 1), mengelola presensi dan pengingat deputinya |
| 7 | **Anggota** | Melihat kalender dan tugas, menyetor berkas, hadir rapat, menjadi panitia kegiatan |

> Level 1-4 dapat disebut Badan Pengurus Harian (BPH) dan tidak termasuk anggota deputi. Level 5-6 adalah pengurus deputi. Semua pengurus juga memiliki kewajiban menyetor berkas, dan **tidak boleh memverifikasi berkasnya sendiri**.

### 5.1 Tahapan Login

```
[1] Halaman Login (email + kata sandi)
        |
        v
[2] Autentikasi kredensial
        |  gagal --> pesan error, batas percobaan (kunci sementara)
        v
[3] Cek status akun
        |  Menunggu persetujuan / Nonaktif --> akses ditolak + info kontak Sekretaris Umum
        v
[4] Cek peran (role_level) dan deputi akun
        |
        +--> Level 1  Ketua                  --> Dashboard Ketua
        +--> Level 2  Wakil Ketua            --> Dashboard Wakil Ketua
        +--> Level 3  Sekretaris Umum        --> Dashboard Sekretaris Umum
        +--> Level 4  Bendahara Umum         --> Dashboard Bendahara Umum
        +--> Level 5  Koordinator Deputi     --> Dashboard Deputi (admin)
        +--> Level 6  Sekretaris Koordinator --> Dashboard Deputi (admin)
        +--> Level 7  Anggota                --> Dashboard Anggota
        v
[5] Login pertama kali? --> wajib ganti kata sandi dan lengkapi profil
```

**Aturan akun:**
- Akun anggota dibuat lewat undangan email atau pendaftaran mandiri, lalu disetujui Sekretaris Umum atau Sekretaris Koordinator deputi terkait.
- Akun pengurus (level 1-6) hanya dapat dibuat atau diubah perannya oleh Ketua dan Sekretaris Umum.
- Pergantian pengurus dilakukan dengan mengubah peran akun, bukan menghapus akun, agar riwayat tetap tersimpan.
- Seluruh login dan perubahan peran masuk ke log aktivitas.

### 5.2 Peran Kepanitiaan (per Kegiatan)

Peran ini **bukan level login**, melainkan penugasan sementara pada satu kegiatan. Panitia dapat berasal dari deputi mana pun.

| Peran Panitia | Hak dalam Kegiatan |
|---|---|
| **Ketua Pelaksana** | Mengubah detail kegiatan, menyusun panitia, mengubah status kegiatan menjadi Selesai, melihat semua berkas kegiatan |
| **Sekretaris Panitia** | Mengunggah proposal, surat, LPJ narasi, dan dokumentasi |
| **Bendahara Panitia** | Mengunggah RAB, nota/kwitansi, bukti transfer, dan LPJ keuangan; berkoordinasi dengan Bendahara Umum |
| **Anggota Panitia / Seksi** | Melihat kegiatan, mengunggah dokumentasi bagian seksinya |

### 5.3 Matriks Hak Akses

Keterangan: ✔ = penuh, **(D)** = terbatas pada deputi sendiri, **(K)** = terbatas pada berkas keuangan, **(P)** = hanya pada kegiatan yang diikuti sebagai panitia, ✖ = tidak ada akses.

| Fitur | Ketua | Wakil Ketua | Sekum | Bendum | Kordep | Sekor | Anggota |
|---|---|---|---|---|---|---|---|
| Dashboard seluruh komunitas | ✔ | ✔ | ✔ | (K) | (D) | (D) | ✖ |
| Dashboard pribadi | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Lihat kalender dan daftar program kerja | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Buat / ubah program kerja | ✔ | ✔ | ✔ | ✖ | (D) | (D) | (P) |
| Setujui program kerja | ✔ | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ |
| Unggah berkas pribadi | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Unggah LPJ / dokumentasi kegiatan | (P) | (P) | (P) | (P) | (P) | (P) | (P) |
| Unggah berkas keuangan kegiatan | ✖ | ✖ | ✖ | ✔ | ✖ | ✖ | (P) |
| Kelola akun dan peran | ✔ | ✖ | ✔ | ✖ | ✖ | ✖ | ✖ |
| Setujui pendaftaran anggota | ✔ | ✖ | ✔ | ✖ | ✖ | (D) | ✖ |
| Kelola jenis berkas dan periode | ✔ | ✖ | ✔ | (K) | ✖ | ✖ | ✖ |
| Buat penugasan berkas | ✔ | ✖ | ✔ | (K) | (D) | ✖ | ✖ |
| Verifikasi tahap 1 (kelengkapan) | ✖ | ✖ | ✖ | ✖ | ✖ | (D) | ✖ |
| Verifikasi tahap 2 (persetujuan) | ✖ | ✖ | ✖ | ✖ | (D) | ✖ | ✖ |
| Verifikasi berkas keuangan | ✖ | ✖ | ✖ | (K) | ✖ | ✖ | ✖ |
| Verifikasi berkas pengurus | ✔ | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ |
| Pengesahan LPJ kegiatan | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ | ✖ |
| Override keputusan verifikasi | ✔ | ✖ | ✖ | ✖ | ✖ | ✖ | ✖ |
| Buat rapat dan buka presensi | ✔ | ✔ | ✔ | ✖ | (D) | (D) | (P) |
| Rekap presensi dan poin | ✔ | ✔ | ✔ | ✖ | (D) | (D) | pribadi |
| Kirim pengumuman / pengingat | ✔ | ✔ | ✔ | (K) | (D) | (D) | ✖ |
| Laporan dan ekspor data | ✔ | ✔ | ✔ | (K) | (D) | (D) | ✖ |
| Akses arsip periode | ✔ | ✔ | ✔ | (K) | (D) | (D) | pribadi |
| Log aktivitas (audit trail) | ✔ | ✖ | ✔ | ✖ | ✖ | ✖ | ✖ |

**Hak tambahan (asumsi):** Koordinator dan Sekretaris Koordinator **Deputi PSDM** mendapat akses baca-saja ke rekap kehadiran dan poin seluruh anggota, sesuai fungsi pembinaan anggota.

## 6. Kebutuhan Fungsional

### 6.1 Autentikasi dan Akun
- Login email dan kata sandi dengan pengalihan dashboard sesuai peran (Bagian 5.1).
- Reset kata sandi lewat email **atau** oleh admin (kata sandi sementara), serta pembatasan percobaan login.
- Profil anggota: nama, NIM, universitas, program studi, angkatan, deputi, kontak.

### 6.2 Program Kerja dan Kegiatan
Semua jenis kegiatan tercatat di sini agar seluruh anggota tahu **kegiatan apa yang akan datang**, dan setelah selesai menjadi tempat menyetor LPJ serta dokumentasi.

**Data kegiatan:**
- Nama, deskripsi dan tujuan, deputi penyelenggara.
- Jenis: Program Kerja Deputi, Program Kerja Gabungan (lintas deputi), Kegiatan Umum Komunitas, Kegiatan Eksternal / Undangan.
- Tanggal mulai-selesai, lokasi atau tautan daring, target peserta.
- Rencana anggaran, daftar panitia beserta perannya, status.

**Fitur utama:**
- **Kalender dan daftar "Program Kerja Mendatang"** yang tampil di dashboard semua pengguna, dengan filter deputi, bulan, dan status.
- Input **rencana program kerja satu periode** sekaligus (dapat impor dari Excel/CSV).
- **Checklist berkas otomatis** per kegiatan:
  - *Pra-kegiatan:* proposal, RAB, surat/undangan, susunan panitia.
  - *Pasca-kegiatan:* LPJ narasi, LPJ keuangan, dokumentasi, daftar hadir, laporan evaluasi.
- Saat kegiatan ditandai **Selesai**, sistem otomatis membuka tugas LPJ dan dokumentasi untuk panitia dengan tenggat standar (usulan H+14, dapat diatur).
- **Dokumentasi:** unggah foto (dikompres otomatis), tautan album/video (Google Drive, YouTube, Instagram), materi, publikasi, dan daftar hadir peserta; ditampilkan sebagai galeri per kegiatan.
- Pengingat email ke panitia (H-7, H-1 kegiatan) dan pengingat LPJ mendekati tenggat.
- Riwayat seluruh kegiatan satu periode sebagai arsip.

**Status kegiatan:**
`RENCANA` → `DIAJUKAN` → `DISETUJUI` → `BERLANGSUNG` → `SELESAI` → `MENUNGGU_LPJ` → `LPJ_DISAHKAN` (juga `DITUNDA` dan `DIBATALKAN`)

### 6.3 Penyetoran Berkas
- Daftar tugas penyetoran beserta tenggat dan statusnya.
- Unggah berkas (satu atau lebih) disertai catatan, pratinjau sebelum kirim.
- Unggah ulang saat diminta revisi (riwayat versi tersimpan).
- Tanda terima digital setelah berkas terkirim.
- Berkas tersimpan otomatis di **folder Google Drive GenBI** yang tersusun per periode, deputi, dan kegiatan (lihat Bagian 10.2); pengguna tidak perlu mengatur folder sendiri.

**Katalog berkas awal (dapat diubah oleh Sekum / Bendum):**

| Kategori | Contoh Berkas | Pengunggah | Jalur Verifikasi |
|---|---|---|---|
| Rutin anggota | Laporan kegiatan, bukti partisipasi, transkrip / KHS, surat aktif kuliah | Anggota | Sekor → Kordep deputi anggota |
| Kegiatan (narasi) | Proposal, surat, LPJ narasi, dokumentasi, evaluasi | Sekretaris / Ketua Pelaksana | Sekor → Kordep deputi penyelenggara |
| Kegiatan (keuangan) | RAB, nota / kwitansi, bukti transfer, LPJ keuangan | Bendahara Panitia | Bendahara Umum |
| Pengurus | Laporan kinerja, berkas pengurus lainnya | Pengurus | Lihat Bagian 7.4 |

### 6.4 Verifikasi Berjenjang
- Antrean berkas per verifikator dengan filter dan pencarian, pratinjau berkas di dalam sistem.
- Tindakan: **Setujui**, **Minta Revisi** (wajib disertai alasan), atau **Tolak**.
- Verifikasi massal untuk berkas yang jelas valid, serta catatan internal yang tidak terlihat anggota.
- Sekretaris Koordinator dan Koordinator Deputi dapat saling menggantikan jika salah satu berhalangan.

### 6.5 Presensi Rapat dan Poin Keaktifan

**Presensi rapat:**
- Jenis rapat: rapat pleno / besar, rapat deputi, rapat panitia, rapat BPH.
- Pembuat rapat mengisi judul, jadwal, lokasi atau tautan, dan jenis rapat (peserta wajib terisi otomatis).
- Presensi lewat **kode QR atau kode unik** yang hanya berlaku pada jendela waktu tertentu (misalnya sampai 15 menit setelah rapat mulai).
- Status: Hadir, Terlambat, Izin, Sakit, Alpa. Izin dan sakit diajukan lewat form dengan alasan, lalu disetujui Sekretaris Koordinator atau Koordinator Deputi.
- Rekap kehadiran per anggota, per rapat, dan per deputi.

**Poin keaktifan** (contoh awal, bobot ditetapkan pengurus dan dapat diubah):

| Aktivitas | Poin |
|---|---|
| Hadir rapat tepat waktu | +2 |
| Hadir rapat terlambat | +1 |
| Izin / sakit disetujui | 0 |
| Alpa tanpa keterangan | -2 |
| Berkas disetor tepat waktu dan disetujui | +3 |
| Berkas disetor terlambat | +1 |
| Berkas tidak disetor sampai batas toleransi | -3 |
| Menjadi panitia kegiatan | +5 |
| Peran inti kepanitiaan (ketua pelaksana, sekretaris, bendahara) | +8 |

**Eskalasi keterlambatan (usulan):**
1. Skor di bawah ambang pertama → peringatan email dari Sekretaris Koordinator.
2. Ambang kedua → peringatan dari Koordinator Deputi.
3. Ambang ketiga → dilaporkan ke Deputi PSDM dan Ketua untuk pembinaan sesuai aturan internal komunitas.

### 6.6 Monitoring dan Dashboard
**Dashboard Pengurus (sesuai cakupan peran)**
- Persentase pengumpulan berkas per periode, jenis berkas, dan deputi.
- Daftar anggota yang belum menyetor atau terlambat.
- Status kegiatan: berapa yang berjalan, menunggu LPJ, dan LPJ yang belum disahkan.
- Berkas menunggu verifikasi dan rata-rata waktu verifikasi.
- Perbandingan antar kelima deputi, grafik tren kepatuhan, dan kehadiran rapat.

**Dashboard Anggota**
- Kegiatan terdekat dan kegiatan yang diikuti sebagai panitia.
- Ringkasan tugas: belum disetor, menunggu verifikasi, perlu revisi, selesai.
- Riwayat kehadiran rapat, poin keaktifan, dan skor kepatuhan pribadi.

### 6.7 Notifikasi Email
Karena belum ada domain dan akun GenBI adalah **Gmail biasa**, email dikirim lewat akun tersebut dengan batas **100 penerima per hari**. Karena itu:
- Email dikirim lewat **antrean berprioritas** dengan penghitung kuota harian; yang melebihi kuota ditunda ke hari berikutnya.
- Urutan prioritas: (1) keamanan dan reset kata sandi, (2) berkas disetujui / diminta revisi dan tugas baru untuk verifikator, (3) pengingat tenggat berkas dan LPJ (H-7, H-3, H-1, terlambat; hanya untuk yang belum menyetor), (4) ringkasan (digest) mingguan "kegiatan mendatang".
- Kuota dihitung **per penerima**, bukan per email, sehingga mengirim satu email ke banyak alamat (misalnya lewat BCC) tidak menghemat kuota.
- Satu digest ke 80 anggota memakai 80% kuota harian. Karena itu digest dijadwalkan pada hari khusus yang sepi (misalnya Minggu) atau dibagi dua kelompok (sekitar 40 per hari), dan sistem menyisakan cadangan minimal 20% kuota untuk email penting.
- Hindari pengumuman broadcast ke seluruh anggota lebih dari sekali sehari; gunakan pengumuman di dalam aplikasi.
- **Notifikasi di dalam aplikasi menjadi kanal utama**, email sebagai pelengkap.
- Jika kebutuhan melebihi kuota, opsi lanjutan: akun Workspace atau domain sendiri dengan layanan email transaksional.

### 6.8 Pelaporan dan Ekspor
- Rekap berkas, kegiatan, kehadiran, dan poin per periode, per anggota, dan per deputi.
- Ekspor Excel/CSV dan PDF, serta unduh seluruh berkas satu kegiatan atau satu periode sebagai ZIP.
- **Laporan akhir periode kepengurusan** otomatis dan ekspor arsip lengkap untuk serah terima.
- Log aktivitas (audit trail).

### 6.9 Modul Tambahan (Tahap Lanjutan)
- Papan pengumuman dari pengurus.
- Pustaka dokumen: template proposal, template LPJ, SOP, panduan penggunaan sistem.
- Evaluasi anggota per semester berdasarkan poin keaktifan.

## 7. Alur Proses Utama

### 7.1 Siklus Hidup Program Kerja

```
Kordep / Sekor menginput program kerja (RENCANA)
            |
            v
Diajukan --> Ketua / Wakil Ketua menyetujui
            |
            v
DISETUJUI: muncul di kalender seluruh anggota; panitia disusun
            |
            v
Pra-kegiatan: proposal / RAB diunggah dan diverifikasi
            |
            v
BERLANGSUNG (pengingat email H-7 dan H-1)
            |
            v
SELESAI (diubah Ketua Pelaksana / Kordep)
            |
            v
Sistem otomatis membuka tugas: LPJ narasi, LPJ keuangan, dokumentasi (tenggat H+14)
            |
            v
Verifikasi jalur paralel (Bagian 7.3)
            |
            v
Ketua mengesahkan  -->  LPJ_DISAHKAN  -->  Terarsip
```

### 7.2 Verifikasi Berkas Rutin Anggota

```
ANGGOTA mengunggah berkas        Status: MENUNGGU_TAHAP_1
            |
            v
SEKRETARIS KOORDINATOR (deputi anggota): cek kelengkapan dan format
      |                 |
   lengkap       tidak lengkap --> PERLU_REVISI --> kembali ke anggota
      |
      v                            Status: MENUNGGU_TAHAP_2
KOORDINATOR DEPUTI: persetujuan isi
      |            |             |
  setujui    minta revisi      tolak
      |
      v
DISETUJUI  (otomatis terarsip; Sekretaris Umum dapat melihat arsip)
```

### 7.3 LPJ Program Kerja (Dua Jalur Paralel)

```
            Kegiatan SELESAI
                  |
      +-----------+-------------+
      |                         |
 JALUR NARASI                JALUR KEUANGAN
 Sekretaris Panitia          Bendahara Panitia
 (LPJ narasi + dokumentasi)  (LPJ keuangan, nota, bukti)
      |                         |
 Sekor deputi penyelenggara  Bendahara Umum
 (kelengkapan)               (verifikasi)
      |                         |
 Kordep deputi penyelenggara     |
 (persetujuan)                   |
      |                         |
      +-----------+-------------+
                  |
        Kedua jalur DISETUJUI
                  |
                  v
     KETUA mengesahkan LPJ  -->  Terarsip
```

- LPJ dianggap **lengkap** setelah kedua jalur disetujui; baru kemudian diajukan untuk pengesahan Ketua.
- Wakil Ketua dapat mengesahkan bila Ketua berhalangan.

### 7.4 Berkas Pengurus (Tidak Boleh Verifikasi Diri Sendiri)

| Pengunggah | Diverifikasi oleh |
|---|---|
| Sekretaris Koordinator | Koordinator Deputi |
| Koordinator Deputi | Wakil Ketua |
| Sekretaris Umum, Bendahara Umum | Wakil Ketua |
| Wakil Ketua | Ketua |
| Ketua | Wakil Ketua |

### 7.5 Aturan Tambahan
- Berkas kegiatan dirutekan ke **deputi penyelenggara**, berkas rutin ke **deputi asal anggota**.
- Jika verifikator termasuk panitia kegiatan itu, tahap otomatis naik ke level di atasnya (Sekor → Kordep, Kordep → Wakil Ketua).
- Jika verifikator belum bertindak melewati batas waktu (usulan 3 hari kerja), pengingat dikirim lalu tugas dapat dialihkan ke level di atasnya.
- Ketua dapat melakukan **override** dengan alasan wajib yang tercatat di log.
- Jalur verifikasi disimpan sebagai **konfigurasi**, bukan kode tetap, sehingga bisa diubah lewat pengaturan.

### 7.6 Status Berkas

| Status | Arti |
|---|---|
| `BELUM_DISETOR` | Belum ada unggahan |
| `MENUNGGU_TAHAP_1` | Menunggu cek kelengkapan (Sekretaris Koordinator) |
| `MENUNGGU_TAHAP_2` | Menunggu persetujuan (Koordinator Deputi / Bendahara Umum / Wakil Ketua) |
| `PERLU_REVISI` | Diperiksa dan perlu perbaikan |
| `DISETUJUI` | Valid, diterima, dan terarsip |
| `DITOLAK` | Tidak memenuhi syarat |
| `TERLAMBAT` | Penanda tambahan: disetor melewati tenggat |

## 8. Rancangan Data (Entitas Utama)

| Entitas | Atribut Utama |
|---|---|
| **terms** (periode kepengurusan) | id, nama, tanggal_mulai, tanggal_akhir, status (aktif/arsip) |
| **deputies** | id, term_id, nama_deputi, koordinator_id, sekretaris_koordinator_id |
| **users** | id, nama, email, password_hash, role_level (1-7), deputi_id, status_akun, last_login |
| **members** | id, user_id, nim, universitas, prodi, angkatan, no_hp |
| **events** (kegiatan) | id, term_id, nama, deskripsi, jenis, deputi_penyelenggara_id, tanggal_mulai, tanggal_selesai, lokasi, anggaran_rencana, status |
| **event_committee** | id, event_id, user_id, peran_panitia |
| **event_checklists** | id, event_id, document_type_id, tahap (pra/pasca), tenggat, wajib |
| **document_types** | id, nama, kategori (rutin/kegiatan/keuangan/pengurus), format_diizinkan, maks_ukuran_mb, template_url |
| **collection_periods** | id, term_id, nama, tanggal_mulai, tanggal_tenggat |
| **assignments** | id, document_type_id, collection_period_id, event_id (opsional), sasaran (semua / deputi tertentu / panitia), dibuat_oleh |
| **submissions** | id, assignment_id, user_id, status, submitted_at, is_late, versi |
| **submission_files** | id, submission_id, nama_file, drive_file_id, drive_link, mime_type, ukuran, checksum, jenis (file / tautan_luar), versi |
| **drive_folders** | id, term_id, entitas (periode/deputi/kegiatan/jenis_berkas), entitas_id, drive_folder_id, path |
| **review_flows** | id, document_type_id, urutan_tahap, peran_penanggung_jawab, batas_waktu_hari |
| **reviews** | id, submission_id, tahap, verifikator_id, keputusan, catatan, catatan_internal, is_override, reviewed_at |
| **meetings** | id, term_id, judul, jenis, deputi_id / event_id (opsional), jadwal, kode_presensi, batas_presensi |
| **attendances** | id, meeting_id, user_id, status, waktu_hadir |
| **leave_requests** | id, meeting_id, user_id, jenis (izin/sakit), alasan, status, disetujui_oleh |
| **point_rules** | id, aktivitas, poin |
| **point_logs** | id, user_id, sumber (meeting/submission/event), poin, keterangan, created_at |
| **notifications** | id, user_id, judul, isi, channel (app/email), dibaca, created_at |
| **audit_logs** | id, user_id, aksi, entitas, entitas_id, waktu |

### Relasi Singkat
- Satu **term** memiliki banyak deputi, kegiatan, rapat, dan periode pengumpulan; seluruh data terikat ke term sehingga mudah diarsipkan.
- Satu **deputi** memiliki satu Koordinator, satu Sekretaris Koordinator, dan banyak anggota.
- Satu **event** memiliki banyak panitia, checklist berkas, dan penugasan (assignment) LPJ / dokumentasi.
- Satu **submission** memiliki banyak file (riwayat versi) dan banyak review (satu per tahap).
- Poin keaktifan dihitung dari **attendances** dan **submissions** lewat **point_logs**.

## 9. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| **Keamanan** | Hash kata sandi, HTTPS, kontrol akses berbasis peran (row-level security), validasi tipe dan ukuran file, penyimpanan file privat dengan tautan bertanda waktu |
| **Privasi Data** | Patuh UU Perlindungan Data Pribadi: data hanya untuk keperluan komunitas dan dihapus / diarsipkan sesuai kebijakan retensi |
| **Penyimpanan Berkas** | Seluruh berkas di **Google Drive GenBI**; foto dikompres di browser sebelum diunggah (target ≤ 1 MB), batas ukuran per jenis berkas diatur di sistem, **video hanya berupa tautan** (Drive / YouTube) |
| **Retensi Data** | Data hidup selama **satu periode kepengurusan**; di akhir periode diekspor sebagai arsip lalu diserahkan ke pengurus berikutnya |
| **Backup** | Ekspor database mingguan ke folder Drive khusus backup (berkas sudah berada di Drive); layanan gratis tidak menjamin backup otomatis |
| **Kinerja** | Halaman utama dimuat < 3 detik; skala 80 pengguna sangat ringan |
| **Kegunaan** | Responsif untuk ponsel (presensi dan unggah via HP), antarmuka Bahasa Indonesia |
| **Auditabilitas** | Seluruh tindakan verifikasi, override, dan perubahan peran tercatat |

## 10. Usulan Teknologi dan Arsitektur (Dibangun dari Nol, Layanan Gratis)

Kuota layanan gratis dapat berubah; **cek ulang halaman resmi masing-masing layanan sebelum membangun**. Angka berikut berdasarkan informasi 2026.

### 10.1 Susunan Teknologi

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Tampilan + server | Next.js (React) + Tailwind CSS | Satu proyek untuk antarmuka dan API |
| Hosting | Vercel (free) | Alamat gratis `nama-proyek.vercel.app`, **tidak butuh domain** |
| Database + autentikasi | Supabase (free) | Hanya data teks dan metadata; **berkas tidak disimpan di sini** |
| Penyimpanan berkas | **Google Drive GenBI** (Drive API) | Lihat 10.2 |
| Email | Akun Gmail GenBI | Lihat 10.3 |
| Penjadwal | Vercel Cron / Supabase scheduled jobs | Pengingat, digest, backup mingguan |
| Presensi QR | Pustaka QR JavaScript | Kode berganti berkala |
| Kode sumber | GitHub (repositori privat) | Atas nama akun komunitas |

Karena berkas disimpan di Google Drive, batas penyimpanan file Supabase gratis (1 GB) tidak lagi menjadi masalah; database 500 MB sudah sangat cukup untuk data teks 80 pengguna.

### 10.2 Penyimpanan Berkas ke Google Drive GenBI

**Alur unggah:**

```
Browser anggota
   |-- 1. Minta izin unggah ke server (cek login, peran, tugas, ukuran, tipe berkas)
   |<- 2. Server menyiapkan folder tujuan + "sesi unggah" di Google Drive
   |-- 3. Browser mengunggah berkas LANGSUNG ke Google Drive
   |-- 4. Browser melapor selesai --> server menyimpan drive_file_id ke database
```

**Keputusan teknis:**

| Hal | Keputusan | Alasan |
|---|---|---|
| Cara akses Drive | **OAuth atas nama akun Google GenBI**; refresh token disimpan sebagai rahasia di server | *Service account* tidak memiliki kuota penyimpanan di Drive pribadi biasa, sehingga gagal menulis ke folder My Drive (hanya berfungsi di Shared Drive Google Workspace, yang tidak tersedia di Gmail biasa) |
| Izin (scope) | `drive.file` | Izin paling sempit: aplikasi hanya dapat mengakses berkas dan folder yang ia buat sendiri |
| Status aplikasi OAuth | Setelah masa uji, ubah ke status **In production** | Pada mode Testing, refresh token dapat kedaluwarsa dalam waktu singkat (sekitar 7 hari); verifikasi ketentuan terbaru |
| Cara unggah | **Langsung dari browser ke Drive** (resumable upload) | Fungsi serverless Vercel membatasi ukuran request sekitar 4,5 MB, sehingga unggah lewat server gagal untuk berkas lebih besar |
| Folder | Dibuat otomatis oleh sistem (lihat struktur di bawah) | Anggota tidak perlu mengatur folder |
| Penamaan berkas | `TANGGAL_JENIS_NAMA_vN` (contoh: `20261015_LaporanBulanan_BudiS_v2`) | Mudah dicari langsung di Drive |
| Database | Menyimpan `drive_file_id`, nama, ukuran, dan checksum; bukan isi berkas | Hemat dan memudahkan verifikasi |

**Struktur folder otomatis:**

```
GenBI - Sistem Berkas/
 └─ Periode Kepengurusan 20XX-20XX/
     ├─ 01 Berkas Rutin/
     │    └─ [Deputi]/[Periode Pengumpulan]/[Nama Anggota]/
     ├─ 02 Program Kerja/
     │    └─ [Deputi]/[Nama Kegiatan]/
     │         ├─ Proposal
     │         ├─ LPJ Narasi
     │         ├─ LPJ Keuangan (nota, bukti)
     │         └─ Dokumentasi
     ├─ 03 Berkas Pengurus/
     └─ 99 Backup Database/
```

**Akses lihat dan unduh:**

| Jenis berkas | Pengaturan |
|---|---|
| Sensitif (transkrip, berkas keuangan, berkas pribadi) | Folder **privat**. Dibuka lewat aplikasi (server memeriksa hak akses) untuk berkas kecil, atau lewat izin Drive per email verifikator yang bertugas |
| Dokumentasi non-sensitif (foto kegiatan) | Boleh dibagikan sebagai tautan atau folder yang dibagikan ke anggota |

**Perkiraan kebutuhan ruang (asumsi, perlu dihitung ulang):** sekitar 80 anggota × 12 berkas/tahun × 1 MB ≈ 1 GB, ditambah dokumentasi kegiatan (misalnya 40 kegiatan × 100 foto × 1 MB ≈ 4 GB). Total sekitar 5 GB per periode.

**Karena akun Gmail biasa (15 GB dibagi Gmail, Drive, dan Foto):**
- Gunakan akun Google GenBI **khusus untuk sistem**, tidak untuk surat-menyurat harian atau cadangan Foto, agar ruang tidak terpakai hal lain.
- Dashboard Sekretaris Umum menampilkan **pemakaian ruang Drive**, dengan peringatan otomatis saat mencapai sekitar 70%.
- Foto dikompres di browser (target ≤ 1 MB), video dan album besar hanya berupa tautan ke tempat lain.
- Di akhir periode: ekspor arsip lengkap, pindahkan ke Drive arsip terpisah, lalu bersihkan dari akun aktif agar ruang kembali lega untuk periode berikutnya.
- Jika ruang tetap kurang, opsi lanjutan: membeli paket penyimpanan Google tambahan atau memeriksa kelayakan program Google untuk organisasi nirlaba (Workspace gratis); cek syarat terbaru.

### 10.3 Email Tanpa Domain

| Opsi | Kuota | Catatan |
|---|---|---|
| **Gmail akun GenBI lewat Apps Script (dipilih)** | **100 penerima/hari** (Gmail biasa); Workspace akan memberi 1.500/hari | Tanpa domain, mudah disiapkan |
| Gmail SMTP langsung dari server | Mengikuti kuota harian Gmail (cek ketentuan terbaru) | Perlu verifikasi 2 langkah dan *app password* |
| Layanan email transaksional (mis. Resend) | Gratis 3.000/bulan dan maks 100/hari | **Butuh domain terverifikasi**; dipertimbangkan setelah komunitas punya domain |

**Keputusan:** mulai dengan akun Gmail GenBI. Pengiriman dirancang sebagai antrean berprioritas dengan penghitung kuota (lihat Bagian 6.7). Email bawaan Supabase hanya cocok untuk uji coba, sehingga harus diganti SMTP kustom atau dihindari dengan alur **akun dibuat admin dan reset kata sandi oleh admin**. Memiliki domain sendiri dapat dilakukan nanti tanpa mengubah rancangan lain.

### 10.4 Batasan Layanan Gratis yang Harus Diantisipasi

| Batasan | Dampak | Mitigasi |
|---|---|---|
| Supabase free: database 500 MB; proyek **dijeda setelah 1 minggu tanpa aktivitas** | Sistem bisa berhenti bila sepi | Penggunaan rutin (presensi, pengingat terjadwal) menjaga proyek aktif; pantau pemakaian |
| Vercel: ukuran request fungsi sekitar 4,5 MB | Unggah lewat server gagal untuk berkas besar | Unggah langsung ke Drive (Bagian 10.2) |
| Vercel Hobby ditujukan untuk penggunaan non-komersial | Perlu sesuai ketentuan layanan | Periksa ketentuan Hobby; komunitas non-komersial umumnya sesuai |
| Gmail: 100 penerima/hari (akun biasa) | Notifikasi massal tertunda | Antrean berprioritas, digest mingguan, notifikasi dalam aplikasi |
| Drive 15 GB (akun biasa), dibagi dengan Gmail dan Foto | Ruang cepat habis oleh foto | Kompres foto, video hanya tautan, pantau kuota, bersihkan Gmail / Foto |
| Tidak ada backup otomatis pada paket gratis | Risiko kehilangan data | Ekspor database mingguan ke folder backup di Drive |

### 10.5 Kepemilikan Akun dan Serah Terima

Karena sistem dibangun dari nol dan berjalan antar-periode, kepemilikan akun harus jelas:

| Akun | Aturan |
|---|---|
| Google GenBI (Drive + Gmail + OAuth) | Milik komunitas, bukan pribadi; aktifkan verifikasi 2 langkah dan pemulihan ke minimal 2 pengurus |
| GitHub, Vercel, Supabase | Dibuat atas email komunitas atau dimiliki organisasi; minimal 2 admin teknis |
| Kredensial dan rahasia (token OAuth, kunci API) | Disimpan di pengelola kata sandi bersama, tidak di dalam kode atau grup chat |
| Serah terima periode | Dokumen panduan teknis, ekspor arsip, dan pergantian admin teknis dijadwalkan tiap akhir periode |

### 10.6 Urutan Pembangunan

1. Siapkan akun dan proyek: GitHub, Vercel, Supabase, serta proyek Google Cloud untuk OAuth Drive.
2. Rancang skema database, peran, dan aturan hak akses (row-level security), lalu buat login 7 peran.
3. **Uji coba integrasi Drive lebih awal**: unggah langsung ke folder otomatis, simpan `drive_file_id`, dan buka berkas kembali (bagian paling berisiko).
4. Modul deputi dan anggota (impor sekitar 80 anggota).
5. Program kerja dan kalender.
6. Penugasan berkas, unggah, dan verifikasi dua tahap.
7. LPJ dua jalur dan pengesahan Ketua.
8. Presensi rapat dan poin keaktifan.
9. Antrean email dan digest.
10. Dashboard, laporan, dan arsip akhir periode.

## 11. Rancangan Halaman (Sitemap)

```
Publik
 └─ Login / Reset Password / Pendaftaran Anggota

Level 7 - Anggota
 ├─ Dashboard Pribadi (kegiatan terdekat, tugas, poin)
 ├─ Kalender & Daftar Program Kerja
 │   └─ Detail Kegiatan (panitia, berkas, dokumentasi)
 ├─ Tugas & Tenggat (+ Unggah Berkas)
 ├─ Riwayat Penyetoran & Catatan Revisi
 ├─ Presensi Rapat (scan QR / kode) & Pengajuan Izin
 ├─ Kegiatan Saya (sebagai panitia): unggah LPJ / dokumentasi
 ├─ Notifikasi
 └─ Profil

Level 6 - Sekretaris Koordinator  (semua menu Anggota +)
 ├─ Dashboard Deputi
 ├─ Antrean Verifikasi Tahap 1
 ├─ Pengelolaan Program Kerja Deputi
 ├─ Buat Rapat Deputi, Rekap Presensi & Persetujuan Izin
 ├─ Persetujuan Pendaftaran Anggota Deputi
 └─ Rekap & Pengingat Deputi

Level 5 - Koordinator Deputi  (semua menu Anggota +)
 ├─ Dashboard Deputi
 ├─ Antrean Persetujuan Tahap 2
 ├─ Pengelolaan Program Kerja & Penugasan Deputi
 ├─ Rekap Presensi & Poin Deputi
 └─ Laporan Deputi

Level 4 - Bendahara Umum  (semua menu Anggota +)
 ├─ Dashboard Keuangan
 ├─ Antrean Verifikasi Berkas Keuangan (dari bendahara panitia)
 ├─ Jenis Berkas & Penugasan Keuangan
 └─ Rekap & Laporan Keuangan Kegiatan

Level 3 - Sekretaris Umum  (semua menu Anggota +)
 ├─ Dashboard Seluruh Komunitas
 ├─ Manajemen Akun, Peran & Deputi
 ├─ Program Kerja Umum, Jenis Berkas, Periode & Penugasan
 ├─ Rapat & Rekap Presensi / Poin
 ├─ Arsip Periode, Laporan, Ekspor & ZIP
 └─ Log Aktivitas

Level 2 - Wakil Ketua  (semua menu Anggota +)
 ├─ Dashboard Seluruh Komunitas & Perbandingan Antar Deputi
 ├─ Persetujuan Program Kerja
 ├─ Antrean Verifikasi Berkas Pengurus
 └─ Rekap Presensi / Poin & Laporan

Level 1 - Ketua  (semua menu Anggota +)
 ├─ Dashboard Eksekutif
 ├─ Persetujuan Program Kerja & Pengesahan LPJ
 ├─ Manajemen Akun, Peran & Pengaturan Alur Verifikasi
 ├─ Antrean Berkas Pengurus & Override Keputusan
 ├─ Laporan, Ekspor & Arsip Periode
 └─ Log Aktivitas
```

## 12. Indikator Keberhasilan (KPI)

| Indikator | Target Awal |
|---|---|
| Tingkat pengumpulan berkas tepat waktu | ≥ 85% |
| LPJ kegiatan masuk dan disahkan sesuai tenggat | ≥ 90% |
| Kegiatan memiliki dokumentasi lengkap di sistem | 100% |
| Rata-rata waktu verifikasi per tahap | ≤ 3 hari kerja |
| Rapat yang presensinya tercatat digital | 100% |
| Anggota aktif menggunakan sistem | ≥ 90% |
| Waktu penyusunan rekap bulanan | dari hitungan hari menjadi menit |

## 13. Rencana Pengembangan (Roadmap)

| Fase | Fokus | Estimasi |
|---|---|---|
| **Fase 0 - Persiapan** | Siapkan akun komunitas (Google, GitHub, Vercel, Supabase), uji coba unggah ke Google Drive, finalisasi katalog berkas, tenggat LPJ, bobot poin, dan daftar pengguna per deputi | 2 minggu |
| **Fase 1 - MVP** | Login 7 peran, deputi, kalender program kerja dan panitia, unggah ke Drive, verifikasi 2 tahap, LPJ dan dokumentasi | 6-8 minggu |
| **Fase 2 - Presensi & Otomasi** | Presensi rapat (QR), poin keaktifan, pengingat dan digest email | 3-4 minggu |
| **Fase 3 - Monitoring** | Dashboard per peran, laporan, ekspor, jalur LPJ paralel dan pengesahan Ketua | 2-3 minggu |
| **Fase 4 - Penguatan** | Pengumuman, pustaka dokumen, evaluasi semester, arsip akhir periode | menyesuaikan |

**Uji coba:** pilot di satu deputi (misalnya satu program kerja nyata) sebelum dipakai seluruh anggota. Karena data hidup satu periode, sistem sebaiknya sudah berjalan sedini mungkin di awal periode.

## 14. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Anggota enggan beralih dari cara lama | Adopsi rendah | Sosialisasi, panduan singkat, jadikan sistem satu-satunya kanal resmi, hubungkan dengan poin keaktifan |
| Kuota email Gmail harian habis | Notifikasi tertunda | Antrean berprioritas, digest mingguan, notifikasi dalam aplikasi |
| Ruang Google Drive penuh | Unggahan gagal | Kompres foto, video via tautan, pantau kuota, siapkan akun dengan ruang lebih besar bila perlu |
| Token OAuth Drive kedaluwarsa / dicabut (misalnya sandi akun diganti) | Seluruh unggahan berhenti | Status aplikasi In production, pemantauan error, panduan pembuatan ulang token, minimal 2 admin teknis |
| Berkas terhapus atau dipindah manual di Drive | Tautan di sistem rusak | Folder dikelola sistem, hanya admin teknis yang memegang akses langsung, ekspor backup berkala, pengecekan integritas berkala |
| Proyek gratis dijeda / data hilang | Sistem tidak dapat diakses | Aktivitas rutin, backup mingguan ke Drive, dokumentasi pemulihan |
| Verifikator menumpuk atau berhalangan | Verifikasi lambat | Dua admin per deputi yang saling menggantikan, batas waktu dan eskalasi otomatis |
| Panitia lintas deputi membingungkan | Berkas salah jalur | Routing otomatis ke deputi penyelenggara |
| Pergantian kepengurusan / pengembang | Sistem tidak terawat | Dokumentasi, akun admin lebih dari satu, ekspor arsip, serah terima terjadwal |
| Kebocoran data pribadi | Reputasi dan hukum | Kontrol akses ketat, penyimpanan privat, kebijakan privasi jelas |
| Poin dianggap tidak adil | Penolakan anggota | Bobot disepakati bersama, transparan, bisa dilihat pribadi, jalur keberatan ke Deputi PSDM |

## 15. Hal yang Masih Perlu Dikonfirmasi

1. **Siapa pemegang akun Google GenBI**, dan apakah akun itu dapat dikhususkan untuk sistem (bukan dipakai harian)?
2. **Siapa yang membangun dan merawat sistem** (minimal 2 orang agar tidak bergantung pada satu orang)?
3. **Kebijakan akses berkas**: apakah setuju berkas sensitif privat (dibuka lewat aplikasi / izin per email) dan dokumentasi non-sensitif boleh berupa tautan?
4. **Tenggat standar LPJ** setelah kegiatan (usulan H+14) dan aturan internal yang berlaku.
5. **Daftar berkas rutin anggota** yang benar-benar diwajibkan (katalog di Bagian 6.3 masih contoh).
6. **Bobot poin dan ambang peringatan**, serta konsekuensi lanjutannya.
7. Apakah program kerja perlu **persetujuan Ketua / Wakil Ketua** sebelum tampil di kalender (di dokumen ini: ya).
8. Apakah sistem hanya menyimpan **berkas** keuangan (bukan pembukuan), dan apakah iuran / kas internal ikut dicatat?
9. Apakah Deputi PSDM boleh melihat rekap kehadiran dan poin seluruh anggota?
10. Tanggal mulai dan akhir **periode kepengurusan** ini.
11. Apakah **2FA** diperlukan untuk pengurus inti (saat ini: tidak wajib)?
12. Jika ruang Drive atau kuota email tidak cukup, apakah komunitas terbuka pada opsi lanjutan (domain sendiri, penyimpanan tambahan, atau Workspace nirlaba)?

## 16. Glosarium

| Istilah | Arti |
|---|---|
| **Deputi** | Bidang kerja dalam komunitas, dipimpin Koordinator Deputi (Multimedia Management, Public Relation, PSDM, Pendidikan, Lingkungan Hidup) |
| **BPH** | Badan Pengurus Harian: Ketua, Wakil Ketua, Sekretaris Umum, Bendahara Umum |
| **Program Kerja (Proker)** | Kegiatan terencana yang dilaksanakan komunitas atau deputi |
| **LPJ** | Laporan Pertanggungjawaban kegiatan (narasi dan keuangan) |
| **Panitia** | Tim pelaksana satu kegiatan, dapat lintas deputi |
| **Verifikasi tahap 1 / 2** | Pemeriksaan kelengkapan (Sekretaris Koordinator) dan persetujuan (Koordinator Deputi) |
| **Override** | Pembatalan atau perubahan keputusan verifikasi oleh Ketua, tercatat di log |
| **Poin keaktifan** | Skor gabungan kehadiran rapat, ketepatan berkas, dan keterlibatan kepanitiaan |
| **Digest** | Satu email ringkasan yang menggantikan banyak email terpisah |
| **Resumable upload** | Cara unggah ke Google Drive langsung dari browser lewat sesi unggah yang disiapkan server |
| **Refresh token** | Kunci akses jangka panjang akun Google GenBI yang dipakai server untuk mengakses Drive |
| **drive_file_id** | Pengenal unik berkas di Google Drive yang disimpan di database |
| **Periode kepengurusan (term)** | Masa jabatan satu kepengurusan; seluruh data diikat ke periode ini |

---

*Dokumen ini merupakan draf dan dapat disesuaikan dengan kebutuhan serta aturan internal komunitas.*
