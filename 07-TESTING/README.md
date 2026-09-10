# 07 - Testing

## Deskripsi

Testing dilakukan untuk memastikan setiap bagian dari project Binar Komputer Tegal dapat berjalan sesuai dengan fungsi yang telah dirancang.

## Pengujian Google Form

Google Form diuji dengan melakukan pengisian data pendaftaran.

Data yang dimasukkan meliputi:

* Email
* Nama lengkap
* Program yang diminati
* Waktu belajar yang diinginkan

Hasil pengujian:

```text
Google Form berhasil menerima data pendaftaran.
```

## Pengujian Automation

Automation diuji setelah data dikirim melalui Google Form.

Alur pengujian:

```text
Mengisi Google Form
        ↓
Submit Form
        ↓
Data masuk Google Sheets
        ↓
Trigger onFormSubmit(e)
        ↓
Email otomatis dikirim
```

Hasil pengujian:

```text
Berhasil.
Email konfirmasi diterima secara otomatis setelah
pendaftaran melalui Google Form.
```

## Pengujian Email

Email yang dikirim berisi:

* Nama pendaftar
* Ucapan terima kasih
* Program yang diminati
* Waktu belajar yang diinginkan
* Informasi bahwa tim Binar Komputer Tegal akan menghubungi pendaftar

Hasil:

```text
Email konfirmasi berhasil diterima.
```

## Kesimpulan

Berdasarkan pengujian yang telah dilakukan, Google Form dan Automation dapat bekerja sesuai dengan fungsi yang dirancang.

Data pendaftaran berhasil masuk ke Google Sheets dan sistem berhasil mengirimkan email konfirmasi secara otomatis kepada pendaftar.

## Struktur

```text
07-TESTING/
└── README.md
```
