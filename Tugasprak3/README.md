# Tugas Praktikum Pertemuan 3: Pengenalan CSS (Profil Mahasiswa)

Modifikasi halaman Profil Mahasiswa menggunakan **CSS Inline** dengan minimal 10 property CSS dan 4 format warna yang berbeda.

- **Nama:** Haechan
- **NPM:** _(isi NPM)_
- **Program Studi:** Teknik Informatika
- **Universitas:** Universitas Pancasila
- **Mata Kuliah:** Praktikum Desain Web

---


## Cara Menjalankan

1. Pastikan file `profil_mahasiswa.html` dan folder `images` berada dalam satu folder.
2. Buka `profil_mahasiswa.html` dengan browser (Chrome, Edge, Firefox, dll).
3. Untuk melihat tampilan mobile, tekan `F12`, lalu aktifkan *Toggle device toolbar*.

---

## Ketentuan Tugas dan Pemenuhannya

### 1. Minimal 10 Property CSS Inline

Total ada **18 property** yang digunakan:

| No | Property | Digunakan pada | Fungsi |
|----|----------|----------------|--------|
| 1 | `font-family` | `body` | Mengatur jenis huruf |
| 2 | `background-color` | `body`, header, kutipan | Warna latar |
| 3 | `margin` | `body`, judul, paragraf | Jarak luar elemen |
| 4 | `padding` | `body`, header, isi, kutipan | Jarak dalam elemen |
| 5 | `line-height` | `body`, paragraf, daftar | Jarak antarbaris |
| 6 | `max-width` | kartu utama | Membatasi lebar kartu agar rapi |
| 7 | `border-radius` | kartu, foto, kutipan | Sudut membulat |
| 8 | `box-shadow` | kartu, foto | Efek bayangan |
| 9 | `overflow` | kartu | Menjaga sudut header tetap membulat |
| 10 | `text-align` | header, paragraf "Tentang Saya" | Perataan teks |
| 11 | `color` | judul, paragraf, daftar | Warna teks |
| 12 | `font-size` | judul, paragraf, daftar | Ukuran huruf |
| 13 | `font-weight` | `h1` | Ketebalan huruf |
| 14 | `letter-spacing` | `h1` | Jarak antarhuruf |
| 15 | `border` | foto profil | Bingkai foto |
| 16 | `border-bottom` | `h2` | Garis bawah judul bagian |
| 17 | `border-left` | kutipan | Garis aksen di sisi kiri |
| 18 | `padding-bottom` / `padding-left` | `h2`, `ul` | Jarak dalam pada sisi tertentu |

### 2. Minimal 4 Format Warna Berbeda

Total ada **5 format warna**:

| Format | Contoh pada kode | Digunakan untuk |
|--------|------------------|-----------------|
| Named color | `white`, `cadetblue` | Teks judul, latar header, garis kutipan |
| HEX | `#e3f6f5`, `#2f6f6f`, `#1f4e4e` | Latar halaman, teks isi |
| RGB | `rgb(82, 164, 167)` | Warna judul bagian (`h2`) |
| RGBA | `rgba(31, 78, 78, 0.15)` | Bayangan kartu, latar kutipan |
| HSL | `hsl(182, 45%, 70%)` | Garis bawah `h2`, bingkai foto |

---

## Dokumentasi Sebelum dan Sesudah

### Sebelum

![alt text](<Screenshot (1719).png>)

### Sesudah

![alt text](<Screenshot (1720).png>)

---

## Kesimpulan

Halaman Profil Mahasiswa berhasil dimodifikasi menggunakan CSS Inline dengan **18 property CSS** dan **5 format warna** sehingga memenuhi ketentuan tugas. CSS Inline praktis untuk perubahan cepat, tetapi kurang efisien untuk proyek yang lebih besar karena kodenya berulang dan tidak bisa memakai *media query* maupun *hover*.
