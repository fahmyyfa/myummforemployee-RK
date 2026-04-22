# myUMM for Employee

Aplikasi dashboard mobile terintegrasi untuk dosen dan karyawan Universitas Muhammadiyah Malang yang dibangun menggunakan Flutter dan Supabase.

---

## 🔗 Link Akses Aplikasi

| Nama File / Platform | Tautan (Link) |
| :--- | :--- |
| **Source Code** | [GitHub Repository](https://github.com/fahmyyfa/myummforemployee-RK) |
| **Download APK** | [Google Drive / GitHub Release](LINK_APK_ANDA) |
| **Online Emulator** | [Appetize.io Demo](LINK_ONLINE_EMULATOR) |

---

## 🚀 Tech Stack

- **Framework:** Flutter
- **Language:** Dart
- **State Management:** Riverpod
- **Navigation:** go_router
- **Backend:** Supabase (Auth, PostgreSQL, Storage)

---

## 🧪 Pengujian Kualitas Aplikasi (Daily Project 6)

Pengujian ini dilakukan berdasarkan aspek kualitas perangkat lunak (ISO 25010) untuk memastikan sistem berjalan sesuai spesifikasi teknis.

| Aspek Kualitas | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Functional Suitability** | Melakukan presensi melalui scan QR Code di lokasi kerja. | Sistem berhasil mencatat koordinat dan jam kehadiran ke database. | Sesuai Harapan | ✅ Pass |
| **Usability** | Navigasi menu Jadwal Kuliah dan pemilihan semester. | Pengguna dapat menemukan jadwal spesifik dalam kurang dari 3 klik. | Sesuai Harapan | ✅ Pass |
| **Performance Efficiency** | Memuat data "Informasi Kegiatan" dari Supabase. | Data muncul di dashboard dalam waktu kurang dari 2 detik. | Sesuai Harapan | ✅ Pass |
| **Security** | Mengakses halaman profil tanpa sesi login yang valid. | Sistem otomatis menolak akses dan mengarahkan kembali ke halaman Login. | Sesuai Harapan | ✅ Pass |
| **Maintainability** | Integrasi kode antar modul (Aktivitas & Kinerja). | Penambahan data di modul Aktivitas otomatis memperbarui skor di modul Kinerja. | Sesuai Harapan | ✅ Pass |

---

## 🛠 Cara Menjalankan Secara Lokal

1. Clone repository ini:
   ```bash
   git clone [https://github.com/USERNAME/REPO_NAME.git](https://github.com/USERNAME/REPO_NAME.git)
