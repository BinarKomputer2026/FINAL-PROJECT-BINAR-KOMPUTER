# 07 - Testing

## Deskripsi

Testing dilakukan untuk memastikan setiap bagian dari project Binar Komputer Tegal dapat berjalan sesuai dengan fungsi yang telah dirancang.

Pengujian dilakukan pada beberapa modul, yaitu:

* Website
* AI Assistant
* Google Form
* Google Sheets
* Automation
* Email Notification
* Mini Server
* Integrasi antar modul

## 1. Pengujian Website

Website diuji dengan membuka halaman utama dan halaman program kursus.

### Hasil Pengujian

* Halaman website dapat dibuka.
* Navigasi antar halaman dapat digunakan.
* Informasi program kursus dapat ditampilkan.
* Tombol WhatsApp dapat digunakan untuk menghubungi Binar Komputer.
* Tampilan website dapat digunakan pada perangkat desktop dan mobile.

Status: Berhasil

## 2. Pengujian AI Assistant

AI Assistant diuji dengan memberikan pertanyaan mengenai program dan informasi kursus Binar Komputer.

### Hasil Pengujian

* AI Assistant dapat menerima pertanyaan pengguna.
* AI Assistant dapat memberikan jawaban berdasarkan informasi yang tersedia.
* AI Assistant dapat digunakan sebagai alternatif informasi ketika komunikasi melalui WhatsApp mengalami keterlambatan.

Status: Berhasil

## 3. Pengujian Google Form

Google Form diuji dengan melakukan pengisian data pendaftaran.

Data yang digunakan dalam pengujian meliputi:

* Email
* Nama lengkap
* Tempat dan tanggal lahir
* Nomor WhatsApp
* Status saat ini
* Program yang diminati
* Materi/aplikasi yang ingin dipelajari
* Waktu belajar yang diinginkan

### Hasil Pengujian

Data yang dikirim melalui Google Form berhasil masuk ke Google Sheets.

Status: Berhasil

## 4. Pengujian Database Google Sheets

Google Sheets digunakan sebagai tempat penyimpanan data pendaftaran.

### Hasil Pengujian

Setelah formulir dikirim, data pendaftaran berhasil tersimpan pada Google Sheets.

Sistem automation juga menambahkan informasi:

* ID Pendaftaran
* Status Pendaftaran
* Waktu Daftar

Contoh status awal:

`Baru`

Contoh format ID:

`BNR-20260922-001`

Status: Berhasil

## 5. Pengujian Automation

Automation menggunakan Google Apps Script dengan trigger `onFormSubmit`.

Alur pengujian:

```text
Google Form
      ↓
Google Sheets
      ↓
onFormSubmit(e)
      ↓
Pengolahan Data
      ↓
ID + Status + Waktu Daftar
      ↓
Email Pendaftar
      ↓
Email Admin
```

### Hasil Pengujian

Ketika data baru dikirim melalui Google Form:

* Data masuk ke Google Sheets.
* ID pendaftaran dibuat secara otomatis.
* Status pendaftaran otomatis menjadi `Baru`.
* Waktu pendaftaran tercatat otomatis.
* Email konfirmasi dikirim kepada pendaftar.
* Email notifikasi dikirim kepada admin.

Status: Berhasil

## 6. Pengujian Email Pendaftar

Email pendaftar diuji setelah melakukan pengiriman Google Form.

### Hasil Pengujian

Pendaftar menerima email konfirmasi yang berisi informasi pendaftaran, termasuk:

* Nama
* Program yang dipilih
* Waktu belajar yang diinginkan

Status: Berhasil

## 7. Pengujian Notifikasi Admin

Sistem diuji untuk memastikan admin menerima informasi ketika terdapat pendaftaran baru.

### Hasil Pengujian

Admin menerima email notifikasi setelah data pendaftaran berhasil diproses oleh automation.

Status: Berhasil

## 8. Pengujian Mini Server

Mini Server dijalankan menggunakan Ubuntu Server pada VirtualBox.

Komponen yang diuji:

* Ubuntu Server
* OpenSSH Server
* Apache2
* PHP
* Apache Virtual Host
* Port forwarding VirtualBox

### Pengujian SSH

Koneksi dari Windows CMD menuju Ubuntu Server dilakukan menggunakan:

```text
ssh -p 2222 dhivana@127.0.0.1
```

Hasil:

Koneksi SSH berhasil dilakukan.

Status: Berhasil

### Pengujian Apache

Apache diperiksa menggunakan:

```bash
sudo systemctl status apache2
```

Hasil:

Apache berada dalam kondisi `active (running)`.

Status: Berhasil

### Pengujian Konfigurasi Apache

Konfigurasi Apache diperiksa menggunakan:

```bash
sudo apache2ctl configtest
```

Hasil:

```text
Syntax OK
```

Status: Berhasil

### Pengujian Website Server

Website Binar ditempatkan pada:

```text
/var/www/binar
```

Website diuji melalui browser menggunakan:

```text
http://127.0.0.1:8080
```

Hasil:

Halaman Website Binar berhasil ditampilkan melalui Apache pada Ubuntu Server.

Status: Berhasil

### Pengujian PHP

PHP diuji melalui integrasi dengan Apache menggunakan modul:

```text
libapache2-mod-php
```

Hasil:

PHP berhasil berjalan pada Apache Server.

Status: Berhasil

## 9. Pengujian Integrasi Sistem

Pengujian integrasi dilakukan untuk memastikan modul utama dapat bekerja sesuai alur yang dirancang.

### Alur Integrasi Pendaftaran

```text
Pengguna
   ↓
Website
   ↓
Google Form
   ↓
Google Sheets
   ↓
Google Apps Script
   ↓
┌──────────────────────┐
│ ID Pendaftaran       │
│ Status Pendaftaran   │
│ Waktu Pendaftaran    │
└──────────────────────┘
   ↓
┌──────────────────────┐
│ Email Pendaftar      │
│ Email Admin          │
└──────────────────────┘
```

### Hasil Pengujian

Alur pendaftaran dari pengisian Google Form hingga penyimpanan data dan pengiriman email berhasil dilakukan.

Status: Berhasil

## 10. Rekapitulasi Testing

| Modul            | Hasil    |
| ---------------- | -------- |
| Website          | Berhasil |
| AI Assistant     | Berhasil |
| Google Form      | Berhasil |
| Google Sheets    | Berhasil |
| Automation       | Berhasil |
| Email Pendaftar  | Berhasil |
| Email Admin      | Berhasil |
| Ubuntu Server    | Berhasil |
| SSH              | Berhasil |
| Apache2          | Berhasil |
| PHP              | Berhasil |
| Virtual Host     | Berhasil |
| Integrasi Sistem | Berhasil |

## 11. Fitur yang Belum Diimplementasikan

Beberapa fitur yang terdapat dalam rancangan atau pengembangan lanjutan belum digunakan pada implementasi saat ini, yaitu:

* Admin Dashboard
* Database MySQL
* AI conversation logging
* AI escalation system
* WhatsApp API notification
* File sharing server
* Server backup otomatis
* Server monitoring

Fitur-fitur tersebut tidak dimasukkan sebagai fitur berhasil karena belum diimplementasikan dan diuji pada sistem.

## Kesimpulan

Berdasarkan hasil pengujian, modul utama project Binar Komputer Tegal telah dapat berjalan sesuai fungsi yang telah diimplementasikan.

Integrasi pendaftaran berhasil dilakukan mulai dari Google Form, penyimpanan data pada Google Sheets, pemrosesan menggunakan Google Apps Script, pembuatan ID pendaftaran, pencatatan status dan waktu pendaftaran, hingga pengiriman email kepada pendaftar dan admin.

Mini Server berbasis Ubuntu Server juga berhasil menjalankan Apache, PHP, SSH, dan Virtual Host untuk menampilkan Website Binar secara lokal.
