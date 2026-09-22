# 05 - Server

## Deskripsi

Server digunakan sebagai bagian dari infrastruktur project Binar Komputer Tegal untuk menyediakan layanan web server dan menjalankan aplikasi website pada lingkungan Linux.

Server dibangun menggunakan Ubuntu Server yang dijalankan melalui VirtualBox pada komputer pengembangan.

## Teknologi Server

Teknologi yang digunakan:

* Ubuntu Server
* Apache2
* PHP
* OpenSSH Server
* VirtualBox

## Arsitektur Server

```text
Windows Host
     |
     | VirtualBox
     ↓
Ubuntu Server
     |
     ├── OpenSSH Server
     |       ↓
     |   Remote Access
     |
     └── Apache2
             ↓
            PHP
             ↓
      Website Binar Komputer
```

## 1. Ubuntu Server

Ubuntu Server digunakan sebagai sistem operasi Linux untuk menjalankan layanan server.

Ubuntu Server dijalankan menggunakan VirtualBox sehingga lingkungan server dapat dipisahkan dari sistem operasi utama.

## 2. SSH Server

OpenSSH Server digunakan agar server Ubuntu dapat diakses melalui Command Prompt Windows.

Akses dilakukan menggunakan port forwarding VirtualBox:

```text
Windows localhost:2222
        ↓
Ubuntu SSH port 22
```

Perintah yang digunakan untuk melakukan koneksi:

```bash
ssh -p 2222 username@127.0.0.1
```

Dengan konfigurasi tersebut, administrator dapat menjalankan perintah server dari Command Prompt Windows tanpa harus mengetik langsung melalui terminal VirtualBox.

## 3. Apache Web Server

Apache2 digunakan sebagai web server untuk melayani permintaan HTTP dari browser.

Apache berjalan pada Ubuntu Server menggunakan port 80.

Port forwarding VirtualBox digunakan agar web server dapat diakses dari Windows melalui:

```text
http://127.0.0.1:8080
```

Arsitektur akses:

```text
Browser Windows
      ↓
127.0.0.1:8080
      ↓
VirtualBox
      ↓
Ubuntu Server:80
      ↓
Apache2
```

## 4. PHP

PHP digunakan sebagai lingkungan pemrosesan aplikasi pada sisi server.

PHP diintegrasikan dengan Apache menggunakan:

```text
libapache2-mod-php
```

Pengujian dilakukan dengan membuat file PHP sederhana dan mengaksesnya melalui browser.

Hasil pengujian menunjukkan bahwa PHP dapat diproses oleh Apache dengan baik.

## 5. Website Binar Komputer

Website pengujian server ditempatkan pada:

```text
/var/www/binar
```

File utama:

```text
/var/www/binar/index.php
```

Apache dikonfigurasi menggunakan Virtual Host:

```text
/etc/apache2/sites-available/binar.conf
```

Konfigurasi tersebut mengarahkan Apache ke:

```text
/var/www/binar
```

## 6. Pengujian Server

Pengujian dilakukan untuk memastikan seluruh layanan server berjalan.

### Pemeriksaan Apache

Perintah:

```bash
sudo systemctl status apache2
```

Hasil:

```text
Active: active (running)
```

### Pemeriksaan konfigurasi Apache

Perintah:

```bash
sudo apache2ctl configtest
```

Hasil:

```text
Syntax OK
```

### Pengujian halaman website

Perintah:

```bash
curl http://localhost
```

Hasil menampilkan halaman:

```text
Binar Komputer Tegal
Web Server Ubuntu berhasil berjalan.
Apache dan PHP telah terintegrasi.
```

Website juga dapat diakses melalui browser Windows menggunakan:

```text
http://127.0.0.1:8080
```

## 7. Struktur Server

```text
Ubuntu Server
│
├── /var/www/
│   └── binar/
│       └── index.php
│
├── /etc/apache2/
│   ├── sites-available/
│   │   └── binar.conf
│   │
│   └── conf-available/
│       └── servername.conf
│
└── OpenSSH Server
```

## 8. Keamanan

Akses server dilakukan melalui SSH dan membutuhkan username serta password Ubuntu.

Server digunakan pada lingkungan VirtualBox untuk kebutuhan pengembangan dan pengujian project.

File konfigurasi dan kredensial yang bersifat rahasia tidak disimpan di repository GitHub.

## 9. Status Implementasi

| Komponen                  | Status          |
| ------------------------- | --------------- |
| Ubuntu Server             | Berhasil        |
| VirtualBox                | Berhasil        |
| OpenSSH Server            | Berhasil        |
| SSH dari Windows CMD      | Berhasil        |
| Apache2                   | Berhasil        |
| PHP                       | Berhasil        |
| Virtual Host Apache       | Berhasil        |
| Website Binar pada Apache | Berhasil        |
| MySQL                     | Belum digunakan |
| Node.js Server            | Belum digunakan |
| Postfix                   | Belum digunakan |
| Dovecot                   | Belum digunakan |
| Roundcube                 | Belum digunakan |

## Kesimpulan

Server Linux untuk project Binar Komputer Tegal telah berhasil dibuat menggunakan Ubuntu Server pada VirtualBox.

Server dapat diakses dari Windows melalui SSH dan dapat menjalankan website menggunakan Apache2 dan PHP.

Implementasi server ini digunakan sebagai lingkungan pengembangan dan pengujian untuk mendukung project Binar Komputer Tegal.
