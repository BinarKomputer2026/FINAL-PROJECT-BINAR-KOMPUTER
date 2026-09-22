# 08 - Dokumentasi

## Deskripsi

Dokumentasi ini menjelaskan arsitektur, komponen, integrasi, dan alur kerja project Binar Komputer Tegal.

Sistem mengintegrasikan website, AI Assistant, Google Form, Google Sheets, Google Apps Script, email notification, dan Mini Server berbasis Ubuntu Server.

Dokumentasi dibuat untuk membantu proses pemahaman sistem, pengujian, pengembangan, dan pemeliharaan project.

---

## Arsitektur Sistem

Arsitektur sistem Binar Komputer Tegal terdiri dari beberapa lapisan utama.

### 1. Lapisan Pengguna (User Layer)

Lapisan pengguna merupakan pihak yang berinteraksi dengan sistem.

Komponen:

* Siswa / Calon Siswa
* Admin / Pembimbing Binar Komputer
* Pengunjung / Publik

---

### 2. Lapisan Antarmuka (Interface Layer)

Lapisan antarmuka menyediakan media interaksi antara pengguna dengan sistem.

Komponen:

* Website Binar Komputer
* AI Assistant Binar
* Google Form Pendaftaran

Website digunakan sebagai media penyampaian informasi mengenai Binar Komputer dan program yang tersedia.

AI Assistant digunakan untuk membantu pengunjung mendapatkan informasi mengenai program dan layanan Binar Komputer.

Google Form digunakan sebagai media pengumpulan data pendaftaran.

---

### 3. Lapisan Aplikasi & Automation

Lapisan ini menangani proses aplikasi dan automation.

Komponen:

* AI Assistant
* Google Apps Script
* Trigger `onFormSubmit(e)`
* Automation Email

Google Apps Script memproses data yang masuk dari Google Form melalui trigger `onFormSubmit(e)`.

Setelah data diterima, sistem:

1. Membaca data pendaftaran.
2. Membuat ID pendaftaran secara otomatis.
3. Menambahkan status awal pendaftaran.
4. Mencatat waktu pendaftaran.
5. Mengirim email konfirmasi kepada pendaftar.
6. Mengirim email notifikasi kepada admin.

---

### 4. Lapisan Data (Data Layer)

Lapisan data menangani penyimpanan dan sumber informasi yang digunakan oleh sistem.

Komponen:

* Google Sheets
* Knowledge Base AI
* Data Pendaftaran

Google Sheets digunakan sebagai penyimpanan data pendaftaran yang berasal dari Google Form.

Data pendaftaran yang tersimpan meliputi informasi yang diisi oleh calon siswa serta data tambahan dari automation seperti:

* ID Pendaftaran
* Status Pendaftaran
* Waktu Daftar

Knowledge Base AI digunakan sebagai sumber informasi untuk membantu AI Assistant memberikan respons mengenai program dan layanan Binar Komputer.

---

### 5. Lapisan Server (Server Layer)

Lapisan server digunakan untuk menjalankan dan menguji layanan web secara lokal.

Komponen yang telah diimplementasikan:

* Ubuntu Server
* VirtualBox
* OpenSSH Server
* Apache2
* PHP
* Apache Virtual Host

Website Binar ditempatkan pada:

```text
/var/www/binar
```

Apache digunakan sebagai web server dan PHP digunakan untuk menjalankan halaman berbasis PHP.

Akses website server dari Windows dilakukan melalui port forwarding VirtualBox:

```text
Windows
127.0.0.1:8080
       ↓
VirtualBox NAT
       ↓
Ubuntu Server
       ↓
Apache :80
```

Koneksi SSH dari Windows dilakukan melalui:

```text
Windows
127.0.0.1:2222
       ↓
VirtualBox NAT
       ↓
Ubuntu Server
       ↓
SSH :22
```

---

### 6. Lapisan Keamanan (Security Layer)

Keamanan diterapkan pada komponen sistem yang berkaitan dengan data dan source code.

Implementasi keamanan yang dilakukan:

* Perlindungan source code dan file project.
* Tidak menyimpan password atau credential pada repository.
* Penggunaan akses SSH untuk administrasi server.
* Pengujian layanan server secara lokal.
* Pembatasan akses layanan server melalui konfigurasi VirtualBox.

Beberapa fitur keamanan lanjutan belum diimplementasikan, seperti:

* Role-Based Access Control khusus aplikasi.
* Backup server otomatis.
* Server monitoring.
* Logging terpusat.
* Sistem recovery otomatis.

Fitur tersebut tidak dianggap sebagai fitur yang telah berhasil karena belum diimplementasikan dan diuji.

---

## Alur Sistem Pendaftaran

Alur utama pendaftaran adalah:

```text
Pengunjung
    ↓
Website
    ↓
Google Form
    ↓
Pengisian Data Pendaftaran
    ↓
Google Sheets
    ↓
Google Apps Script
    ↓
onFormSubmit(e)
    ↓
Pemrosesan Data
    ↓
┌──────────────────────────┐
│ ID Pendaftaran           │
│ Status Pendaftaran       │
│ Waktu Daftar             │
└──────────────────────────┘
    ↓
┌──────────────────────────┐
│ Email Pendaftar          │
│ Email Admin              │
└──────────────────────────┘
```

Contoh format ID pendaftaran:

```text
BNR-20260922-001
```

Status awal pendaftaran:

```text
Baru
```

---

## Alur AI Assistant

AI Assistant digunakan sebagai media informasi bagi pengunjung.

Alurnya:

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

AI Assistant membantu pengunjung mendapatkan informasi secara cepat tanpa harus selalu menghubungi admin melalui WhatsApp.

---

## Alur Server

Mini Server digunakan sebagai lingkungan server lokal untuk pengembangan dan pengujian.

```text
Windows Host
    ↓
VirtualBox
    ↓
Ubuntu Server
    ↓
Apache2
    ↓
PHP
    ↓
Website Binar
```

Pengujian akses website:

```text
http://127.0.0.1:8080
```

Pengujian SSH:

```text
ssh -p 2222 dhivana@127.0.0.1
```

---

## Struktur Project

Struktur utama project:

```text
FINAL-PROJECT-BINAR-KOMPUTER/
│
├── 01-WEBSITE/
│   ├── images/
│   ├── index.html
│   ├── kursus.html
│   └── style.css
│
├── 02-AI-ASSISTANT/
│   ├── sounds/
│   ├── index.html
│   ├── knowledge.js
│   ├── script.js
│   └── style.css
│
├── 03-GOOGLE-FORM/
│   └── .gitkeep
│
├── 04-AUTOMATION/
│   ├── .gitkeep
│   ├── Code.gs
│   └── README.md
│
├── 05-SERVER/
│   └── README.md
│
├── 06-SECURITY/
│   └── README.md
│
├── 07-TESTING/
│   └── README.md
│
└── 08-DOKUMENTASI/
    └── README.md
```

---

## Integrasi Sistem

Komponen project saling terhubung untuk mendukung proses penyampaian informasi dan pendaftaran.

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
ID + Status + Waktu Daftar
   ↓
Email Pendaftar
   ↓
Email Admin
```

AI Assistant berjalan sebagai komponen pendukung informasi dan tidak menjadi bagian dari proses penyimpanan data pendaftaran.

---

## Dokumentasi Pengujian

Pengujian dilakukan untuk memastikan komponen sistem dapat berjalan sesuai fungsi yang telah diimplementasikan.

Pengujian mencakup:

* Website
* AI Assistant
* Google Form
* Google Sheets
* Google Apps Script
* Automation
* Email Pendaftar
* Email Admin
* Ubuntu Server
* SSH
* Apache2
* PHP
* Virtual Host
* Integrasi Sistem

Dokumentasi hasil pengujian tersedia pada:

```text
07-TESTING/README.md
```

---

## Status Implementasi

| Komponen                  | Status                  |
| ------------------------- | ----------------------- |
| Website                   | Berhasil                |
| AI Assistant              | Berhasil                |
| Google Form               | Berhasil                |
| Google Sheets             | Berhasil                |
| Google Apps Script        | Berhasil                |
| Automation                | Berhasil                |
| ID Pendaftaran            | Berhasil                |
| Status Pendaftaran        | Berhasil                |
| Waktu Daftar              | Berhasil                |
| Email Pendaftar           | Berhasil                |
| Email Admin               | Berhasil                |
| Ubuntu Server             | Berhasil                |
| SSH                       | Berhasil                |
| Apache2                   | Berhasil                |
| PHP                       | Berhasil                |
| Virtual Host              | Berhasil                |
| Admin Dashboard           | Belum diimplementasikan |
| MySQL                     | Belum digunakan         |
| AI Conversation Logging   | Belum diimplementasikan |
| AI Escalation System      | Belum diimplementasikan |
| WhatsApp API Notification | Belum diimplementasikan |
| Server Backup Otomatis    | Belum diimplementasikan |
| Server Monitoring         | Belum diimplementasikan |

---

## Kesimpulan

Project Binar Komputer Tegal mengintegrasikan website, AI Assistant, Google Form, Google Sheets, Google Apps Script, automation email, dan Mini Server Ubuntu dalam satu project.

Sistem pendaftaran telah berhasil menghubungkan Google Form dengan Google Sheets dan Google Apps Script. Automation dapat membuat ID pendaftaran, mencatat status dan waktu pendaftaran, serta mengirimkan email kepada pendaftar dan admin.

Mini Server berbasis Ubuntu Server juga telah berhasil digunakan untuk menjalankan Apache, PHP, SSH, dan Virtual Host sebagai lingkungan server lokal.

Dokumentasi ini menjadi acuan untuk memahami arsitektur, integrasi, pengujian, dan status implementasi setiap komponen project.
