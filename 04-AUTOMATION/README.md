# 04 - AUTOMATION

## Deskripsi

Modul Automation digunakan untuk mengotomatisasi proses pendaftaran peserta Binar Komputer Tegal setelah data dikirim melalui Google Form.

Automation menghubungkan Google Form, Google Sheets, Google Apps Script, dan layanan email sehingga proses pencatatan serta pemberitahuan pendaftaran dapat dilakukan secara otomatis.

## Alur Automation

```text
Google Form
     ↓
Google Sheets
     ↓
Google Apps Script
     ↓
onFormSubmit
     ↓
Pengolahan Data Pendaftaran
     ↓
┌─────────────────────────┐
│ ID Pendaftaran Otomatis │
│ Status Pendaftaran      │
│ Waktu Daftar            │
└─────────────────────────┘
     ↓
┌──────────────────────┬──────────────────────┐
│ Email Pendaftar      │ Email Admin          │
│ Konfirmasi otomatis  │ Notifikasi otomatis  │
└──────────────────────┴──────────────────────┘
```

## Komponen

### 1. Google Form

Google Form digunakan sebagai media pengumpulan data calon peserta.

Data yang dikumpulkan meliputi:

* Email
* Nama lengkap
* Tempat dan tanggal lahir
* Nomor WhatsApp
* Status saat ini
* Program yang diminati
* Materi/aplikasi yang ingin dipelajari
* Waktu belajar yang diinginkan

### 2. Google Sheets

Google Sheets digunakan sebagai database pendaftaran.

Data dari Google Form masuk secara otomatis ke spreadsheet.

Selain data dari formulir, sistem menambahkan tiga informasi secara otomatis:

* ID PENDAFTARAN
* STATUS PENDAFTARAN
* WAKTU DAFTAR

Contoh ID pendaftaran:

```text
BNR-20260922-001
```

Status awal pendaftaran:

```text
Baru
```

### 3. Google Apps Script

Google Apps Script digunakan untuk menjalankan proses automation ketika formulir dikirim.

Fungsi utama yang digunakan:

```javascript
function onFormSubmit(e)
```

Fungsi tersebut berjalan melalui trigger:

```text
Sumber acara : Dari spreadsheet
Jenis acara  : Saat mengirim formulir
Fungsi       : onFormSubmit
Deployment   : Head
```

### 4. ID Pendaftaran Otomatis

Setiap pendaftaran mendapatkan ID unik dengan format:

```text
BNR-YYYYMMDD-NNN
```

Keterangan:

* `BNR` = identitas Binar
* `YYYYMMDD` = tanggal pendaftaran
* `NNN` = nomor urut pendaftaran pada tanggal tersebut

Contoh:

```text
BNR-20260922-001
BNR-20260922-002
BNR-20260922-003
```

### 5. Status Pendaftaran

Setiap pendaftaran baru secara otomatis mendapatkan status:

```text
Baru
```

Status ini dapat digunakan sebagai dasar untuk proses pengelolaan pendaftaran berikutnya.

### 6. Waktu Pendaftaran

Sistem secara otomatis mencatat waktu ketika pendaftaran diproses oleh automation.

Data tersebut disimpan pada kolom:

```text
WAKTU DAFTAR
```

### 7. Email Konfirmasi Pendaftar

Setelah formulir berhasil diproses, sistem mengirim email otomatis kepada alamat email yang diberikan oleh pendaftar.

Email berisi:

* Nama pendaftar
* ID pendaftaran
* Program yang diminati
* Waktu belajar yang diinginkan
* Status pendaftaran

Tujuannya adalah memberikan konfirmasi bahwa data pendaftaran telah diterima.

### 8. Notifikasi Email Admin

Sistem juga mengirimkan notifikasi kepada admin Binar Komputer Tegal.

Informasi yang dikirim meliputi:

* ID pendaftaran
* Nama lengkap
* Email
* Program yang diminati
* Waktu belajar yang diinginkan
* Status pendaftaran

Admin dapat melihat data pendaftaran lengkap melalui Google Sheets.

## File

```text
04-AUTOMATION/
│
├── Code.gs
├── README.md
└── .gitkeep
```

## Pengujian

Automation telah diuji menggunakan pengisian Google Form.

Alur pengujian:

```text
Mengisi Google Form
        ↓
Mengirim Form
        ↓
Data masuk ke Google Sheets
        ↓
Trigger onFormSubmit berjalan
        ↓
ID Pendaftaran dibuat
        ↓
Status "Baru" dibuat
        ↓
Waktu pendaftaran dicatat
        ↓
Email pendaftar dikirim
        ↓
Email admin dikirim
```

### Hasil Pengujian

| Komponen               | Hasil    |
| ---------------------- | -------- |
| Google Form            | Berhasil |
| Google Sheets          | Berhasil |
| Trigger `onFormSubmit` | Berhasil |
| ID Pendaftaran         | Berhasil |
| Status Pendaftaran     | Berhasil |
| Waktu Daftar           | Berhasil |
| Email Pendaftar        | Berhasil |
| Email Admin            | Berhasil |

## Keamanan

Data pendaftaran disimpan pada Google Sheets yang digunakan sebagai database.

Kode automation tidak menyimpan password atau kredensial akun secara langsung di repository.

Informasi sensitif seperti kredensial akun dan konfigurasi pribadi tidak dimasukkan ke dalam repository GitHub.

## Kesimpulan

Modul Automation berhasil mengotomatisasi proses pendaftaran Binar Komputer Tegal mulai dari penerimaan data melalui Google Form, penyimpanan ke Google Sheets, pembuatan identitas pendaftaran, pencatatan status dan waktu pendaftaran, hingga pengiriman email otomatis kepada pendaftar dan admin.

Dengan automation ini, proses administrasi pendaftaran menjadi lebih terstruktur dan mengurangi kebutuhan pencatatan serta pemberitahuan secara manual.
