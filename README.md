# MyUMM for Employee - University Staff Mobile Application

![Flutter](https://img.shields.io/badge/Flutter-%2302569B.svg?style=for-the-badge&logo=Flutter&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Riverpod](https://img.shields.io/badge/Riverpod-7459f7?style=for-the-badge&logo=riverpod&logoColor=white)

MyUMM for Employee adalah aplikasi mobile berbasis Flutter yang dirancang khusus untuk meningkatkan efisiensi kerja staf akademik (Dosen) dan staf administratif (Karyawan) di lingkungan Universitas Muhammadiyah Malang. Aplikasi ini mengintegrasikan presensi terpadu, pengelolaan akademik, serta pemantauan kinerja harian dalam satu platform yang minimalis dan modern.

## 🚀 Fitur Utama

### 1. Dashboard Berbasis Peran (Role-Based Access)
Aplikasi secara dinamis menyesuaikan fitur berdasarkan peran pengguna yang terdaftar di database:
* **Role Dosen:** Berfokus pada Tridarma Perguruan Tinggi, mencakup jadwal kuliah, laporan OBE, perwalian, bimbingan tugas akhir, dan agenda mengajar terdekat.
* **Role Karyawan:** Berfokus pada efisiensi manajerial, mencakup catatan harian, IKK, modul pelatihan, mutasi, dan administrasi keuangan.

### 2. Pusat Presensi Terpadu
* **Presensi Harian:** Pencatatan kehadiran harian staf menggunakan integrasi data terpusat.
* **Scan QR Code:** Fitur pemindaian barcode instan untuk kehadiran pada kegiatan, rapat, atau acara universitas.

### 3. Manajemen Kinerja & Riwayat
* **Log Aktivitas:** Input uraian aktivitas harian beserta bukti pendukung untuk transparansi kinerja.
* **Capaian Akademik:** Pemantauan poin KUM, publikasi ilmiah, aktivitas sosial, dan pelatihan secara real-time.
* **Riwayat Komprehensif:** Rekam jejak pendidikan, kepangkatan, kepanitiaan, hingga organisasi.

## 🛠️ Stack Teknologi

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | Flutter (Dart) |
| **State Management** | Riverpod |
| **Navigation** | go_router |
| **Backend/Database** | Supabase (PostgreSQL, Storage, Auth) |
| **Aesthetic Style** | Minimalist Modern & Clean Design |

## 🧪 Hasil Pengujian Aplikasi

Pengujian dilakukan berdasarkan aspek kualitas yang telah ditentukan pada fase desain (Daily Project 6):

| Fitur Utama | Aspek Kualitas | Hasil yang Diharapkan | Status |
| :--- | :--- | :--- | :--- |
| **Autentikasi & Role** | *Functionality* | Berhasil membedakan dashboard Dosen dan Karyawan tanpa tertukar. | **Pass** |
| **Presensi QR** | *Functionality* | Data presensi tersimpan secara *real-time* ke tabel database Supabase. | **Pass** |
| **Dashboard Akademik** | *Usability* | Layout rapi tanpa *RenderFlex Overflow* pada judul mata kuliah yang panjang. | **Pass** |
| **Informasi Kegiatan** | *Reliability* | Menampilkan *placeholder* jika data kosong tanpa menyebabkan aplikasi *crash*. | **Pass** |
| **Capaian Akademik** | *Functionality* | Menampilkan data poin KUM dan publikasi sesuai dengan filter ID pengguna. | **Pass** |

## ⚙️ Panduan Instalasi

1. **Clone Repositori**
   ```bash
   git clone [https://github.com/username/myumm-employee.git](https://github.com/username/myumm-employee.git)
