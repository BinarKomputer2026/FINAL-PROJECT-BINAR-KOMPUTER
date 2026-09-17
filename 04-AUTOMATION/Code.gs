function onFormSubmit(e) {

  const data = e.namedValues;

  const email = data["EMAIL"][0];
  const nama = data["NAMA LENGKAP"][0];
  const program = data["PROGRAM YANG DIMINATI"][0];
  const waktu = data["WAKTU BELAJAR YANG DIINGINKAN"][0];

  // =========================
  // EMAIL UNTUK PENDAFTAR
  // =========================

  const subject = "Pendaftaran Binar Komputer Tegal Berhasil";

  const body =
    "Halo, " + nama + "!\n\n" +

    "Terima kasih sudah mendaftar bimbingan komputer di Binar Komputer Tegal. 🎉\n\n" +

    "Data pendaftaran kamu sudah kami terima dengan rincian:\n\n" +

    "Program yang diminati: " + program + "\n" +
    "Waktu belajar yang diinginkan: " + waktu + "\n\n" +

    "Tim Binar Komputer Tegal akan menghubungi kamu untuk informasi selanjutnya.\n\n" +

    "Terima kasih!\n" +
    "Binar Komputer Tegal";

  MailApp.sendEmail(email, subject, body);


  // =========================
  // NOTIFIKASI UNTUK ADMIN
  // =========================

  const emailAdmin = "dhivaimutmiripwinter@gmail.com";

  const subjectAdmin = "Pendaftaran Baru - Binar Komputer Tegal";

  const bodyAdmin =
    "Halo Admin Binar Komputer Tegal,\n\n" +

    "Ada pendaftaran baru yang masuk melalui Google Form.\n\n" +

    "Nama Lengkap: " + nama + "\n" +
    "Email: " + email + "\n" +
    "Program yang diminati: " + program + "\n" +
    "Waktu belajar yang diinginkan: " + waktu + "\n\n" +

    "Silakan cek Google Sheets untuk melihat data pendaftaran lainnya.\n\n" +

    "Binar Komputer Tegal";

  MailApp.sendEmail(emailAdmin, subjectAdmin, bodyAdmin);

}