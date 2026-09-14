# 06 - Security

## Deskripsi

Bagian Security berisi dokumentasi langkah-langkah keamanan yang diterapkan pada project Binar Komputer Tegal untuk membantu melindungi aplikasi, data pengguna, source code, dan layanan yang digunakan.

## Penerapan Keamanan

Beberapa aspek keamanan yang diperhatikan dalam project:

* Melindungi data pengguna.
* Menjaga keamanan akun dan akses sistem.
* Tidak menyimpan informasi sensitif secara langsung di dalam source code.
* Membatasi akses terhadap server dan layanan yang digunakan.
* Melakukan backup terhadap data dan konfigurasi penting.
* Melakukan logging dan monitoring untuk membantu mengetahui aktivitas sistem.
* Melakukan pengujian terhadap sistem sebelum digunakan.

## 1. Firewall / Access Control

Akses terhadap server dan layanan sistem dibatasi agar hanya layanan yang diperlukan saja yang dapat diakses.

Beberapa penerapan yang diperhatikan:

* Membatasi akses terhadap server hanya untuk pengguna yang memiliki izin.
* Tidak membuka layanan server yang tidak diperlukan.
* Menggunakan access control untuk membatasi akses terhadap sumber daya sistem.
* Memastikan layanan yang digunakan hanya dapat diakses sesuai kebutuhan project.

## 2. Backup & Recovery

Backup digunakan untuk membantu menjaga data dan konfigurasi penting agar dapat dipulihkan apabila terjadi kehilangan data atau kesalahan sistem.

Backup dapat dilakukan terhadap:

* Source code project.
* File konfigurasi yang tidak mengandung credential sensitif.
* Data dan konfigurasi layanan yang diperlukan.

Source code project disimpan menggunakan repository GitHub sehingga perubahan dapat dilacak dan dipulihkan melalui riwayat commit apabila diperlukan.

## 3. Logging / Monitoring

Logging dan monitoring digunakan untuk membantu mengetahui aktivitas serta kondisi sistem.

Pada project, monitoring dapat dilakukan dengan memeriksa:

* Riwayat perubahan source code melalui Git.
* Aktivitas dan hasil pengujian sistem.
* Proses pengiriman email otomatis dari Google Apps Script.
* Error atau masalah yang muncul pada aplikasi dan layanan.

Logging membantu proses pemeriksaan apabila terjadi kesalahan atau gangguan pada sistem.

## 4. Role-Based Access

Akses terhadap project disesuaikan dengan kebutuhan pengguna.

Pembagian akses dilakukan berdasarkan peran:

| Peran         | Hak Akses                                                         |
| ------------- | ----------------------------------------------------------------- |
| Developer     | Mengembangkan dan melakukan perubahan pada source code project    |
| Administrator | Mengelola konfigurasi dan layanan yang digunakan                  |
| Pengguna      | Mengakses website, AI Assistant, dan mengisi formulir pendaftaran |

Pembatasan hak akses digunakan untuk mengurangi risiko perubahan atau penggunaan sistem oleh pihak yang tidak memiliki izin.

## Keamanan Data

Data yang diperoleh melalui Google Form digunakan sesuai dengan kebutuhan proses pendaftaran.

Informasi yang bersifat pribadi tidak dimasukkan ke dalam repository secara sembarangan.

Data pengguna harus dikelola dengan memperhatikan keamanan dan kebutuhan project.

## Keamanan Source Code

File konfigurasi yang mengandung informasi sensitif, seperti password, token, atau credential, tidak boleh diunggah ke repository publik.

Contoh file yang perlu diperhatikan:

```text
.env
config.php
credentials.json
```

Jika terdapat informasi sensitif, data tersebut harus disimpan secara aman dan tidak dibagikan melalui repository.

## Keamanan Server

Akses terhadap server perlu dibatasi hanya untuk pengguna yang memiliki izin.

Layanan server yang tidak diperlukan sebaiknya tidak dibuka untuk akses publik.

Konfigurasi server juga perlu diperiksa secara berkala untuk mengurangi risiko kesalahan konfigurasi.

## Pengujian Keamanan

Keamanan sistem diperiksa melalui proses testing untuk memastikan aplikasi dapat berjalan dengan baik dan tidak membocorkan informasi sensitif.

Pengujian dilakukan terhadap:

* Akses terhadap sistem.
* Data pengguna.
* Source code.
* Layanan server.
* Proses automation.

## Status

Dokumentasi keamanan menjadi bagian dari proses pengembangan dan pengujian project Binar Komputer Tegal.

Aspek keamanan yang didokumentasikan meliputi:

* Firewall / Access Control
* Backup & Recovery
* Logging / Monitoring
* Role-Based Access
* Keamanan Data
* Keamanan Source Code
* Keamanan Server
* Pengujian Keamanan

## Struktur

```text
06-SECURITY/

└── README.md
```
