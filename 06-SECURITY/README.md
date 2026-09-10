# 06 - Security

## Deskripsi

Bagian Security berisi dokumentasi langkah-langkah keamanan yang diterapkan pada project Binar Komputer Tegal untuk membantu melindungi aplikasi, data pengguna, dan layanan yang digunakan.

## Penerapan Keamanan

Beberapa aspek keamanan yang diperhatikan dalam project:

* Melindungi data pengguna.
* Menjaga keamanan akun dan akses sistem.
* Tidak menyimpan informasi sensitif secara langsung di dalam source code.
* Membatasi akses terhadap server dan layanan yang digunakan.
* Melakukan pengujian terhadap sistem sebelum digunakan.

## Keamanan Data

Data yang diperoleh melalui Google Form digunakan sesuai dengan kebutuhan proses pendaftaran.

Informasi yang bersifat pribadi tidak dimasukkan ke dalam repository secara sembarangan.

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

## Pengujian Keamanan

Keamanan sistem diperiksa melalui proses testing untuk memastikan aplikasi dapat berjalan dengan baik dan tidak membocorkan informasi sensitif.

## Status

Dokumentasi keamanan menjadi bagian dari proses pengembangan dan pengujian project Binar Komputer Tegal.

## Struktur

```text
06-SECURITY/
└── README.md
```
