/* Validasi form registrasi Kursus Florist (sisi klien).
   Catatan: validasi di sini hanya untuk UX. Validasi final WAJIB diulang di server. */
(function () {
  'use strict';

  var MAX_FILE = 2 * 1024 * 1024; // 2 MB
  var ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'pdf'];
  var ALLOWED_MIME = ['image/jpeg', 'image/png', 'application/pdf'];
  var MIN_ALASAN = 20;
  var MAX_ALASAN = 300;

  var form = document.getElementById('form');
  var summary = document.getElementById('summary');
  var success = document.getElementById('success');
  var counter = document.getElementById('counter');
  var alasanEl = document.getElementById('alasan');

  var LABELS = {
    nama: 'Nama lengkap', email: 'Email', hp: 'No. HP', level: 'Level peserta',
    sesi: 'Jadwal kelas', materi: 'Materi', alasan: 'Alasan', bukti: 'Bukti', setuju: 'Persetujuan'
  };

  function val(name) { return form.elements[name].value; }
  function checkedCount(name) { return form.querySelectorAll('input[name="' + name + '"]:checked').length; }

  /* Tiap validator mengembalikan pesan error, atau '' jika valid. */
  var validators = {
    nama: function () {
      var v = val('nama').trim();
      if (!v) return 'Nama lengkap wajib diisi.';
      if (v.length < 3) return 'Nama minimal 3 karakter.';
      if (!/^[A-Za-z\u00C0-\u024F\s.'-]+$/.test(v)) return 'Nama hanya boleh berisi huruf, spasi, titik, apostrof, atau tanda hubung.';
      return '';
    },
    email: function () {
      var v = val('email').trim();
      if (!v) return 'Email wajib diisi.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Format email tidak valid (contoh: nama@email.com).';
      return '';
    },
    hp: function () {
      var v = val('hp').trim();
      if (!v) return 'No. HP wajib diisi.';
      if (!/^(\+62|62|0)8[1-9][0-9]{7,11}$/.test(v)) return 'No. HP harus nomor Indonesia yang valid (diawali 08 / +628, 10-13 digit), tanpa spasi atau huruf.';
      return '';
    },
    level: function () {
      return checkedCount('level') === 0 ? 'Pilih salah satu level peserta.' : '';
    },
    sesi: function () {
      return val('sesi') === '' ? 'Pilih jadwal kelas.' : '';
    },
    materi: function () {
      var n = checkedCount('materi');
      if (n === 0) return 'Pilih minimal 1 materi.';
      if (n > 3) return 'Maksimal 3 materi yang boleh dipilih (saat ini ' + n + ').';
      return '';
    },
    alasan: function () {
      var len = val('alasan').trim().length;
      if (len === 0) return 'Alasan wajib diisi.';
      if (len < MIN_ALASAN) return 'Alasan minimal ' + MIN_ALASAN + ' karakter (saat ini ' + len + ').';
      if (len > MAX_ALASAN) return 'Alasan maksimal ' + MAX_ALASAN + ' karakter (saat ini ' + len + ').';
      return '';
    },
    bukti: function () {
      var input = form.elements.bukti;
      var f = input.files && input.files[0];
      if (!f) return 'Bukti transfer / KTP wajib diunggah.';
      var ext = (f.name.split('.').pop() || '').toLowerCase();
      if (ALLOWED_EXT.indexOf(ext) === -1) return 'Format file harus JPG, PNG, atau PDF.';
      if (f.type && ALLOWED_MIME.indexOf(f.type) === -1) return 'Tipe file tidak sesuai dengan ekstensinya.';
      if (f.size === 0) return 'File kosong (0 KB).';
      if (f.size > MAX_FILE) return 'Ukuran file ' + (f.size / 1024 / 1024).toFixed(2) + ' MB, melebihi batas 2 MB.';
      return '';
    },
    setuju: function () {
      return form.elements.setuju.checked ? '' : 'Kamu harus menyetujui syarat & ketentuan.';
    }
  };

  var ORDER = ['nama', 'email', 'hp', 'level', 'sesi', 'materi', 'alasan', 'bukti', 'setuju'];

  function setError(name, msg) {
    var wrap = form.querySelector('[data-field="' + name + '"]');
    var out = document.getElementById('err-' + name);
    if (out) out.textContent = msg;
    if (wrap) wrap.classList.toggle('invalid', !!msg);
  }

  function validateField(name) {
    var msg = validators[name]();
    setError(name, msg);
    return msg;
  }

  function validateAll() {
    var errors = [];
    ORDER.forEach(function (name) {
      var msg = validateField(name);
      if (msg) errors.push({ name: name, msg: msg });
    });
    return errors;
  }

  function showSummary(errors) {
    if (!errors.length) { summary.hidden = true; summary.innerHTML = ''; return; }
    var html = '<strong>Ada ' + errors.length + ' kolom yang perlu diperbaiki:</strong><ul>';
    errors.forEach(function (e) {
      html += '<li>' + LABELS[e.name] + ': ' + e.msg + '</li>';
    });
    summary.innerHTML = html + '</ul>';
    summary.hidden = false;
  }

  function focusFirst(name) {
    var wrap = form.querySelector('[data-field="' + name + '"]');
    var target = wrap && wrap.querySelector('input, select, textarea');
    if (target) {
      target.focus({ preventScroll: true });
      wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function updateCounter() {
    var len = alasanEl.value.length;
    counter.textContent = len + ' / ' + MAX_ALASAN;
    counter.classList.toggle('over', len > MAX_ALASAN);
  }

  /* ----- Event ----- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.hidden = true;
    var errors = validateAll();
    showSummary(errors);
    if (errors.length) { focusFirst(errors[0].name); return; }

    var nama = val('nama').trim();
    // reset dulu: event 'reset' menyembunyikan pesan sukses, jadi pesan ditampilkan SETELAH reset
    form.reset();
    ORDER.forEach(function (n) { setError(n, ''); });
    updateCounter();
    success.textContent = 'Terima kasih, ' + nama + '! Pendaftaran berhasil dikirim (simulasi, belum terhubung ke server).';
    success.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  form.addEventListener('reset', function () {
    ORDER.forEach(function (n) { setError(n, ''); });
    summary.hidden = true;
    success.hidden = true;
    setTimeout(updateCounter, 0);
  });

  // Validasi langsung per kolom saat user selesai mengisi
  ORDER.forEach(function (name) {
    var els = form.querySelectorAll('[name="' + name + '"]');
    Array.prototype.forEach.call(els, function (el) {
      var evt = (el.type === 'radio' || el.type === 'checkbox' || el.tagName === 'SELECT' || el.type === 'file') ? 'change' : 'blur';
      el.addEventListener(evt, function () { validateField(name); });
    });
  });

  alasanEl.addEventListener('input', function () {
    updateCounter();
    if (alasanEl.closest('.field').classList.contains('invalid')) validateField('alasan');
  });

  updateCounter();

  // Diekspos untuk pengujian otomatis
  window.__formValidators = validators;
})();
