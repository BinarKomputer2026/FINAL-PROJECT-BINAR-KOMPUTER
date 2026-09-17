# 04 - Automation

## Deskripsi

Automation digunakan untuk mengotomatiskan proses setelah calon siswa mengisi Google Form.

Sistem memanfaatkan Google Apps Script untuk membaca data pendaftaran dari Google Sheets dan mengirimkan email secara otomatis.

## Alur Automation

```text
Calon Siswa
     ↓
Google Form
     ↓
Google Sheets
     ↓
Google Apps Script
     ↙                 ↘
Email Pendaftar      Email Admin
Konfirmasi           Notifikasi
```

## Proses Automation

Setelah calon siswa mengisi Google Form:

1. Data pendaftaran masuk ke Google Sheets.
2. Google Apps Script menjalankan fungsi `onFormSubmit(e)`.
3. Sistem mengambil data menggunakan `e.namedValues`.
4. Sistem mengirim email konfirmasi kepada pendaftar.
5. Sistem mengirim notifikasi pendaftaran baru kepada admin.
6. Admin dapat melihat data pendaftaran secara lengkap melalui Google Sheets.

## Data yang Digunakan

Data yang digunakan dalam proses automation meliputi:

* EMAIL
* NAMA LENGKAP
* PROGRAM YANG DIMINATI
* WAKTU BELAJAR YANG DIINGINKAN

## Email Konfirmasi Pendaftar

Pendaftar menerima email otomatis setelah mengisi Google Form.

Isi email mencakup:

* Nama pendaftar
* Program yang diminati
* Waktu belajar yang diinginkan
* Informasi bahwa data telah diterima oleh Binar Komputer Tegal

## Notifikasi Admin

Admin menerima email otomatis ketika terdapat pendaftaran baru.

Notifikasi berisi:

* Nama lengkap pendaftar
* Email pendaftar
* Program yang diminati
* Waktu belajar yang diinginkan

Admin kemudian dapat membuka Google Sheets untuk melihat data pendaftaran secara lebih lengkap.

## Google Apps Script

Automation menggunakan fungsi:

```javascript
function onFormSubmit(e)
```

Fungsi tersebut dijalankan ketika terdapat data baru yang masuk melalui Google Form.

Data dibaca menggunakan:

```javascript
const data = e.namedValues;
```

Kemudian email dikirim menggunakan:

```javascript
MailApp.sendEmail()
```

## Integrasi Platform

Automation menghubungkan beberapa platform:

```text
Google Form
     ↓
Google Sheets
     ↓
Google Apps Script
     ↓
Email Pendaftar
     +
Email Admin
```

Integrasi ini membantu mengurangi proses manual dan membuat admin lebih cepat mengetahui adanya pendaftaran baru.

## Pengujian

Automation telah diuji dengan melakukan pengisian Google Form.

Hasil pengujian:

* Data berhasil masuk ke Google Sheets.
* Email konfirmasi berhasil diterima oleh pendaftar.
* Email notifikasi berhasil diterima oleh admin.
* Data yang dikirim sesuai dengan data pendaftaran.

## Status

Automation dan integrasi dasar telah berhasil diterapkan dan diuji.

Fitur yang tersedia:

* Google Form → Google Sheets
* Google Sheets → Google Apps Script
* Google Apps Script → Email Pendaftar
* Google Apps Script → Email Admin
