# 05 - Server

## Deskripsi

Bagian Server digunakan untuk mendukung proses penyimpanan, pengolahan, dan pelayanan aplikasi Binar Komputer Tegal.

Server digunakan sebagai lingkungan untuk menjalankan layanan website dan layanan pendukung lainnya.

## Komponen Server

Komponen yang digunakan dalam project antara lain:

* Apache / Web Server
* PHP
* MySQL
* Node.js
* Postfix
* Dovecot
* Roundcube

## Fungsi Server

Server berfungsi untuk:

1. Menjalankan website Binar Komputer Tegal.
2. Menyediakan layanan database untuk aplikasi.
3. Menjalankan aplikasi berbasis Node.js.
4. Menyediakan layanan email.
5. Menyediakan akses email melalui webmail.
6. Menghubungkan berbagai komponen sistem agar dapat digunakan secara terintegrasi.

## Layanan Email

Project menggunakan beberapa layanan untuk mendukung sistem email:

```text
Postfix
   ↓
SMTP
   ↓
Pengiriman Email

Dovecot
   ↓
IMAP / POP3
   ↓
Penerimaan Email

Roundcube
   ↓
Webmail
   ↓
Akses Email melalui Browser
```

## Database

MySQL digunakan sebagai database untuk menyimpan data yang diperlukan oleh aplikasi.

## Web Server

Web server digunakan untuk melayani permintaan dari browser dan menjalankan aplikasi yang terdapat pada server.

## Node.js

Node.js digunakan untuk menjalankan bagian aplikasi yang membutuhkan lingkungan JavaScript pada sisi server.

## Status

Server telah dikonfigurasi sebagai bagian dari infrastruktur project dan digunakan untuk mendukung website serta layanan email.

## Struktur

```text
05-SERVER/
└── README.md
```
