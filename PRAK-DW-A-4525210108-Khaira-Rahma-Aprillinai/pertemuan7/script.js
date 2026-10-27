/* Validasi form registrasi event (client-side).
   Catatan: validasi di sini hanya untuk kenyamanan pengguna (UX).
   Semua aturan WAJIB diulang di server. */

(function () {
  'use strict';

  var MAX_FILE_MB = 2;
  var ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'pdf'];

  var form = document.getElementById('form');
  var summary = document.getElementById('summary');
  var success = document.getElementById('success');
  var alasan = document.getElementById('alasan');
  var counter = document.getElementById('counter');

  /* ---------- Aturan validasi: tiap fungsi mengembalikan pesan error atau '' ---------- */
  var rules = {
    // 1. Wajib diisi + hanya huruf + panjang minimal
    nama: function () {
      var v = form.nama.value.trim();
      if (!v) return 'Nama lengkap wajib diisi.';
      if (v.length < 3) return 'Nama minimal 3 karakter.';
      if (!/^[A-Za-z .'-]+$/.test(v)) return 'Nama hanya boleh berisi huruf dan spasi.';
      return '';
    },
    // 2. Format email
    email: function () {
      var v = form.email.value.trim();
      if (!v) return 'Email wajib diisi.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Format email tidak valid (contoh: nama@email.com).';
      return '';
    },
    // 3. Pola nomor HP Indonesia
    hp: function () {
      var v = form.hp.value.trim();
      if (!v) return 'No. HP wajib diisi.';
      if (!/^08\d{8,11}$/.test(v)) return 'No. HP harus diawali 08 dan terdiri dari 10–13 digit angka.';
      return '';
    },
    // 4. Radio wajib dipilih
    tipe: function () {
      if (!form.querySelector('input[name="tipe"]:checked')) return 'Pilih salah satu tipe peserta.';
      return '';
    },
    // 5. Select wajib dipilih
    sesi: function () {
      if (!form.sesi.value) return 'Silakan pilih sesi event.';
      return '';
    },
    // 6. Checkbox: minimal 1, maksimal 3
    topik: function () {
      var n = form.querySelectorAll('input[name="topik"]:checked').length;
      if (n < 1) return 'Pilih minimal 1 topik.';
      if (n > 3) return 'Pilih maksimal 3 topik.';
      return '';
    },
    // 7. Textarea: panjang minimal & maksimal
    alasan: function () {
      var v = form.alasan.value.trim();
      if (!v) return 'Alasan mengikuti event wajib diisi.';
      if (v.length < 20) return 'Alasan minimal 20 karakter (saat ini ' + v.length + ').';
      if (v.length > 300) return 'Alasan maksimal 300 karakter.';
      return '';
    },
    // 8. Upload: wajib ada, tipe file, ukuran file
    bukti: function () {
      var f = form.bukti.files[0];
      if (!f) return 'Bukti pendaftaran wajib diunggah.';
      var ext = f.name.split('.').pop().toLowerCase();
      if (ALLOWED_EXT.indexOf(ext) === -1) return 'Tipe file tidak diizinkan. Gunakan JPG, PNG, atau PDF.';
      if (f.size > MAX_FILE_MB * 1024 * 1024) return 'Ukuran file melebihi ' + MAX_FILE_MB + ' MB.';
      return '';
    },
    // 9. Checkbox persetujuan
    setuju: function () {
      if (!form.setuju.checked) return 'Kamu harus menyetujui syarat & ketentuan.';
      return '';
    }
  };

  var order = ['nama', 'email', 'hp', 'tipe', 'sesi', 'topik', 'alasan', 'bukti', 'setuju'];

  /* ---------- Tampilkan / bersihkan error ---------- */
  function showError(name, msg) {
    var wrap = form.querySelector('[data-field="' + name + '"]');
    var out = document.getElementById('err-' + name);
    out.textContent = msg;
    wrap.classList.toggle('invalid', !!msg);
    var ctrl = wrap.querySelector('input, select, textarea');
    if (ctrl) ctrl.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function check(name) {
    var msg = rules[name]();
    showError(name, msg);
    return msg;
  }

  /* ---------- Validasi saat pengguna berpindah field ---------- */
  order.forEach(function (name) {
    var wrap = form.querySelector('[data-field="' + name + '"]');
    wrap.addEventListener('change', function () { check(name); });
    wrap.addEventListener('focusout', function (e) {
      if (e.target.matches('input[type="text"], input[type="email"], input[type="tel"], textarea')) check(name);
    });
  });

  /* ---------- Penghitung karakter textarea ---------- */
  alasan.addEventListener('input', function () {
    counter.textContent = alasan.value.length + ' / 300';
    counter.classList.toggle('over', alasan.value.length > 300);
  });

  /* ---------- Submit ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.hidden = true;

    var errors = [];
    order.forEach(function (name) {
      var msg = check(name);
      if (msg) errors.push(name);
    });

    if (errors.length) {
      summary.hidden = false;
      summary.textContent = 'Ada ' + errors.length + ' kolom yang belum benar. Periksa tanda merah di bawah.';
      var first = form.querySelector('[data-field="' + errors[0] + '"]');
      var ctrl = first.querySelector('input, select, textarea');
      if (ctrl) ctrl.focus({ preventScroll: true });
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    summary.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'start' });
    form.reset();
    counter.textContent = '0 / 300';
  });

  /* ---------- Reset ---------- */
  form.addEventListener('reset', function () {
    order.forEach(function (name) { showError(name, ''); });
    summary.hidden = true;
    counter.textContent = '0 / 300';
  });
})();
