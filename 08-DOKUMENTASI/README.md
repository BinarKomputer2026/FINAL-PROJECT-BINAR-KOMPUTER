# 08 - Dokumentasi

## Deskripsi

Dokumentasi ini menjelaskan arsitektur dan komponen utama sistem Binar Komputer Tegal.

Sistem terdiri dari website, AI Assistant, Google Form, automation, email notification, server, dan dokumentasi keamanan yang saling mendukung proses pelayanan dan pendaftaran.

## Arsitektur Sistem

Arsitektur sistem Binar Komputer Tegal terdiri dari beberapa bagian utama:

### 1. Lapisan Pengguna (User Layer)

Lapisan ini merupakan pihak yang berinteraksi dengan sistem.

Komponen:

* Siswa / Calon Siswa
* Admin / Pembimbing Binar Komputer
* Pengunjung / Publik

### 2. Lapisan Antarmuka (Interface Layer)

Lapisan ini menyediakan media interaksi antara pengguna dengan sistem.

Komponen:

* Website Binar Komputer
* AI Assistant Binar
* Google Form Pendaftaran

Website digunakan sebagai media informasi mengenai Binar Komputer dan program yang tersedia.

AI Assistant digunakan untuk membantu pengunjung mendapatkan informasi mengenai program atau layanan ketika membutuhkan informasi dengan cepat.

Google Form digunakan sebagai media pengumpulan data pendaftaran.

### 3. Lapisan Aplikasi & Automation

Lapisan ini menangani proses aplikasi dan automation.

Komponen:

* AI Assistant
* Google Apps Script
* Automation Email

Google Apps Script digunakan untuk memproses data yang masuk dari Google Form melalui trigger `onFormSubmit(e)`.

Setelah data pendaftaran diterima, sistem menjalankan proses automation untuk mengirimkan email konfirmasi kepada pendaftar.

### 4. Lapisan Data

Lapisan ini menangani data yang digunakan oleh sistem.

Komponen:

* Google Sheets
* Knowledge Base AI
* Data Pendaftaran

Google Sheets digunakan sebagai tempat penyimpanan data hasil pengisian Google Form.

Knowledge Base AI digunakan sebagai sumber informasi untuk membantu AI Assistant memberikan respons mengenai layanan dan program Binar Komputer.

### 5. Lapisan Server

Lapisan server digunakan untuk mendukung layanan dan dokumentasi teknis project.

Komponen:

* Server
* Konfigurasi layanan
* Dokumentasi server

Konfigurasi server disesuaikan dengan kebutuhan sistem dan layanan yang digunakan dalam project.

### 6. Lapisan Keamanan (Security Layer)

Keamanan diterapkan pada komponen sistem yang membutuhkan perlindungan.

Komponen:

* Access Control
* Backup & Recovery
* Logging / Monitoring
* Role-Based Access
* Perlindungan data pengguna
* Perlindungan source code

Security Layer digunakan untuk membantu membatasi akses, menjaga keamanan data, melindungi source code, serta mendukung proses pemulihan apabila terjadi masalah.

## Alur Sistem

Secara umum, alur sistem pendaftaran Binar Komputer adalah:

```text
Pengunjung
    ↓
Website / Google Form
    ↓
Pengisian Data Pendaftaran
    ↓
Google Sheets
    ↓
Google Apps Script
    ↓
Automation
    ↓
Email Konfirmasi
```

Sedangkan alur penggunaan AI Assistant:

```text
Pengunjung
    ↓
AI Assistant
    ↓
Knowledge Base
    ↓
Informasi Program / Layanan
    ↓
Respons kepada Pengunjung
```

## Komponen Project

Struktur utama project terdiri dari:

```text
01-WEBSITE/
├── images/
├── index.html
├── kursus.html
└── style.css

02-AI-ASSISTANT/
├── sounds/
├── index.html
├── knowledge.js
├── script.js
└── style.css

03-GOOGLE-FORM/
└── .gitkeep

04-AUTOMATION/
├── .gitkeep
└── Code.gs

05-SERVER/
└── README.md

06-SECURITY/
└── README.md

07-TESTING/
└── README.md

08-DOKUMENTASI/
└── README.md
```

## Integrasi Sistem

Komponen project saling terhubung untuk mendukung proses pelayanan dan pendaftaran.

Integrasi utama:

```text
Website
   ↓
Informasi Program
   ↓
Google Form
   ↓
Google Sheets
   ↓
Google Apps Script
   ↓
Email Konfirmasi
```

AI Assistant berfungsi sebagai pendukung informasi bagi pengunjung sehingga informasi mengenai program dapat diperoleh dengan lebih cepat.

## Dokumentasi Pengujian

Pengujian sistem dilakukan untuk memastikan setiap komponen dapat berjalan sesuai fungsi yang dirancang.

Pengujian mencakup:

* Website
* AI Assistant
* Google Form
* Google Sheets
* Automation
* Email Notification
* Server
* Security

Hasil pengujian digunakan sebagai bahan evaluasi sebelum sistem digunakan.

## Kesimpulan

Project Binar Komputer Tegal mengintegrasikan website, AI Assistant, Google Form, Google Sheets, automation, dan email notification dalam satu sistem yang mendukung proses penyampaian informasi dan pendaftaran.

Dokumentasi arsitektur digunakan untuk membantu memahami hubungan antar komponen serta mempermudah proses pengembangan, pengujian, dan pemeliharaan project.
