# Laporan Tugas Praktikum Pertemuan 7: Form Registrasi Kursus Florist

**Mata kuliah:** Desain Web A
**Tema:** Registrasi "Kursus Merangkai Bunga" (versi florist dari form registrasi event)
**File:** `index.html`, `style.css`, `script.js`, folder `screenshots/`

---

## 1. Komponen form

| Komponen | Field |
|---|---|
| Text / email / tel | Nama lengkap, Email, No. HP / WhatsApp |
| Radio | Level peserta (Pemula / Menengah / Profesional) |
| Select | Jadwal kelas (Pagi / Siang) |
| Checkbox | Materi (Hand Bouquet, Flower Box, Standing Flower, Wedding Bouquet) dan persetujuan S&K |
| Textarea | Alasan mengikuti kursus (dengan penghitung karakter) |
| Upload | Bukti transfer / KTP |

## 2. Aturan validasi (9 aturan, syarat minimal 4)

| No | Field | Aturan |
|---|---|---|
| 1 | Nama | Wajib, minimal 3 karakter, hanya huruf, spasi, titik, apostrof, tanda hubung |
| 2 | Email | Wajib, format `nama@domain.tld` |
| 3 | No. HP | Wajib, nomor Indonesia (`08…`, `62…`, `+62…`), 10 sampai 13 digit, tanpa huruf/spasi |
| 4 | Level | Wajib pilih satu |
| 5 | Jadwal | Wajib pilih (tidak boleh opsi kosong) |
| 6 | Materi | Minimal 1 dan maksimal 3 |
| 7 | Alasan | Wajib, 20 sampai 300 karakter |
| 8 | Bukti | Wajib, ekstensi JPG/PNG/PDF, tipe MIME sesuai, tidak kosong, maksimal 2 MB |
| 9 | Persetujuan | Wajib dicentang |

Perilaku UX: validasi per kolom saat blur/change, ringkasan semua error di atas tombol, fokus otomatis ke error pertama, kolom error diberi warna merah.

## 3. Test case validasi

Pengujian dijalankan otomatis di browser sungguhan (Google Chrome via Playwright) pada dua ukuran layar: **desktop 1280 px** dan **mobile 390 px**. Setiap kasus memakai data valid sebagai dasar, lalu hanya **satu field** yang dirusak, kecuali TC-01.

| ID | Field | Input uji | Hasil yang diharapkan | Hasil aktual | Status |
|---|---|---|---|---|---|
| TC-01 | Semua field | Semua dikosongkan, klik Daftar | 9 pesan error, form tidak terkirim | 9 error muncul, ringkasan "Ada 9 kolom yang perlu diperbaiki", tidak terkirim | Lulus |
| TC-02 | Nama | `Sari123@` | Ditolak: hanya boleh huruf | "Nama hanya boleh berisi huruf, spasi, titik, apostrof, atau tanda hubung." | Lulus |
| TC-03 | Email | `sari@` | Ditolak: format tidak valid | "Format email tidak valid (contoh: nama@email.com)." | Lulus |
| TC-04 | No. HP | `08123abc` | Ditolak: format nomor salah | "No. HP harus nomor Indonesia yang valid (diawali 08 / +628, 10-13 digit), tanpa spasi atau huruf." | Lulus |
| TC-05 | Materi | Mencentang 4 materi | Ditolak: maksimal 3 | "Maksimal 3 materi yang boleh dipilih (saat ini 4)." | Lulus |
| TC-06 | Alasan | `Pengen bisa` (11 karakter) | Ditolak: minimal 20 karakter | "Alasan minimal 20 karakter (saat ini 11)." | Lulus |
| TC-07 | Bukti | `malware.exe` | Ditolak: format file | "Format file harus JPG, PNG, atau PDF." | Lulus |
| TC-08 | Bukti | `besar.jpg` (3 MB) | Ditolak: melebihi 2 MB | "Ukuran file 3.00 MB, melebihi batas 2 MB." | Lulus |
| TC-09 | Persetujuan | Tidak dicentang | Ditolak: wajib setuju | "Kamu harus menyetujui syarat & ketentuan." | Lulus |
| TC-10 | Semua | Semua data valid (kontrol) | Tidak ada error, pesan sukses tampil | Tidak ada error, pesan sukses tampil | Lulus |

Hasil di layar mobile sama persis dengan desktop (pesan error identik pada semua kasus), dan tidak ada scroll horizontal di lebar 390 px.

### Screenshot hasil (desktop dan mobile)

Semua screenshot diambil setelah klik "Daftar Sekarang". Kiri: desktop 1280 px (halaman penuh). Kanan: layar mobile 390 px, otomatis terscroll ke kolom error pertama. Versi mobile halaman penuh tersedia di folder `screenshots/` dengan akhiran `-mobile-full.png`.

<div class="case">
<h4>TC-01: Semua kolom kosong</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-01-desktop.png" alt="TC-01 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-01-mobile.png" alt="TC-01 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-02: Nama berisi angka/simbol</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-02-desktop.png" alt="TC-02 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-02-mobile.png" alt="TC-02 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-03: Email tanpa domain</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-03-desktop.png" alt="TC-03 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-03-mobile.png" alt="TC-03 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-04: No. HP berisi huruf dan terlalu pendek</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-04-desktop.png" alt="TC-04 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-04-mobile.png" alt="TC-04 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-05: Memilih 4 materi (maks. 3)</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-05-desktop.png" alt="TC-05 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-05-mobile.png" alt="TC-05 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-06: Alasan terlalu pendek</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-06-desktop.png" alt="TC-06 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-06-mobile.png" alt="TC-06 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-07: Upload file .exe</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-07-desktop.png" alt="TC-07 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-07-mobile.png" alt="TC-07 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-08: Upload file 3 MB (maks. 2 MB)</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-08-desktop.png" alt="TC-08 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-08-mobile.png" alt="TC-08 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-09: Syarat dan ketentuan tidak dicentang</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-09-desktop.png" alt="TC-09 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-09-mobile.png" alt="TC-09 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

<div class="case">
<h4>TC-10: Data valid (kontrol)</h4>
<table class="shots"><tr>
<td class="d"><img src="screenshots/TC-10-desktop.png" alt="TC-10 desktop"><p class="cap">Desktop (1280 px)</p></td>
<td class="m"><img src="screenshots/TC-10-mobile.png" alt="TC-10 mobile"><p class="cap">Mobile (390 px)</p></td>
</tr></table>
</div>

---

## 4. Validasi yang tetap wajib dilakukan di server

Validasi di `script.js` hanya untuk kenyamanan pengguna. Kode JavaScript berjalan di browser yang dikendalikan pengguna, jadi bisa dilewati dengan mematikan JS, mengubah HTML lewat DevTools, atau mengirim request langsung (curl/Postman). Karena itu server harus mengulang dan memperketat semuanya:

1. **Semua aturan format dan wajib isi** (nama, email, HP, alasan) diulang di server. Data dari klien tidak boleh dipercaya.
2. **Whitelist nilai pilihan.** Nilai `level`, `sesi`, dan `materi` harus dicocokkan dengan daftar yang diizinkan. Jumlah materi (1 sampai 3) dicek ulang, karena atribut HTML bisa diubah.
3. **File upload** (paling kritis):
   - Cek ukuran maksimal di server (`upload_max_filesize` / limit framework), bukan hanya `f.size` di JS.
   - Cek tipe file asli dari isi file (magic bytes / `finfo`), bukan dari ekstensi atau `f.type` yang bisa dipalsukan. Atribut `accept` hanya petunjuk.
   - Ganti nama file dengan nama acak, simpan di luar folder publik atau non-eksekusi, agar file `.php`/`.exe` yang menyamar tidak bisa dijalankan.
4. **Keunikan data.** Email atau nomor HP yang sudah terdaftar hanya bisa dicek di server (database).
5. **Ketersediaan kuota** jadwal Pagi/Siang, karena hanya server yang tahu sisa kursi.
6. **Sanitasi output / anti-XSS.** Nama dan alasan harus di-escape saat ditampilkan kembali (misalnya di halaman admin).
7. **Perlindungan request:** token CSRF, rate limiting / CAPTCHA untuk mencegah pendaftaran massal oleh bot.

## 5. Penjelasan perubahan, masalah, dan solusi

| Perubahan | Masalah yang ditemui | Solusi |
|---|---|---|
| Tema diubah dari workshop web ke kursus florist (teks, warna rose + sage, font serif pada judul, materi bunga) | Field "Tipe peserta" dan "Topik" tidak relevan untuk kursus | Diganti menjadi "Level peserta" dan "Materi yang diminati"; "KTM" jadi "Bukti transfer / KTP" |
| Layout responsif mobile-first dengan breakpoint 768 px, 600 px, 360 px | Di layar sempit, grid 2 kolom terlalu sempit dan opsi checkbox/radio sulit ditap | Grid jadi 1 kolom, opsi jadi tombol selebar layar (tinggi minimal 44 px), tombol Daftar/Reset menempel di bawah layar |
| Font input 16 px di mobile | iOS Safari otomatis zoom saat fokus ke input berfont kecil | Ukuran font input diset 16 px pada breakpoint mobile |
| Penghitung karakter alasan tanpa atribut `maxlength` | Dengan `maxlength` pengguna tidak bisa mengetik lebih dari 300, sehingga aturan maks. 300 tidak bisa diuji | `maxlength` dihilangkan, penghitung berubah merah dan validasi JS yang menolak |
| **Bug pesan sukses** (ditemukan saat TC-10) | Setelah data valid dikirim, pesan sukses tidak pernah tampil. `form.reset()` memicu handler `reset` yang menyembunyikan pesan sukses sesaat setelah ditampilkan | Urutan diubah: `form.reset()` dijalankan lebih dulu, baru pesan sukses ditampilkan. TC-10 diuji ulang dan lulus |
| Pengujian otomatis | Mencentang radio/checkbox lewat klik langsung pada input sempat tidak stabil di skrip uji | Skrip uji mengklik label pembungkus lalu memverifikasi status centang |

## 6. Cara menjalankan

Buka `index.html` di browser (tidak perlu server). Untuk melihat tampilan mobile: DevTools (F12), toggle device toolbar (Ctrl+Shift+M), pilih lebar 390 px.
