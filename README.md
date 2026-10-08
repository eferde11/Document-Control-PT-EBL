# Document Control - PT Energi Batubara Lestari

Website pengendalian dokumen ISO 9001, 14001, dan 45001. Berjalan di GitHub Pages tanpa server sendiri.

## Isi folder

| File | Fungsi | Perlu diubah? |
| --- | --- | --- |
| `index.html` | Aplikasi utama | Tidak |
| `config.js` | Pengaturan akun dan Firebase | Ya, satu-satunya file yang diubah |
| `firebase-rules.json` | Aturan keamanan database, ditempel ke Firebase | Tidak (kecuali username diganti) |
| `tools/buat-hash.html` | Pembuat hash kata sandi untuk mode lokal | Tidak |
| `data.json` | Data dokumen mode lokal. **Tidak ada di paket ini** supaya data Anda yang sudah ada tidak tertimpa | Biarkan |

Aplikasi punya dua mode. Mode yang aktif tertulis kecil di bawah tombol Masuk.

| | Mode lokal | Mode realtime |
| --- | --- | --- |
| Aktif bila | `dbUrl` dan `apiKey` di `config.js` kosong | Keduanya terisi |
| Data disimpan di | `data.json` di GitHub | Firebase Realtime Database |
| Perubahan terlihat pengguna lain | Setelah `data.json` diunggah ulang | Saat itu juga |
| Kata sandi diperiksa oleh | Hash di `config.js` | Firebase Authentication |

---

## A. Pasang ke GitHub

1. Buka repositori `Document-Control-PT-EBL` di GitHub.
2. Klik **Add file > Upload files**.
3. Seret `index.html`, `config.js`, `firebase-rules.json`, `README.md`, dan folder `tools` ke halaman unggah. Jangan unggah `data.json` baru, biarkan yang lama.
4. Klik **Commit changes**.
5. Tunggu 1 sampai 2 menit, buka website, lalu tekan **Ctrl+Shift+R**.

Setelah langkah ini, login mode lokal sudah berfungsi dengan kata sandi sementara yang Anda terima. Segera ganti (bagian C).

---

## B. Mengaktifkan realtime (Firebase)

Perlu akun Google. Paket gratis Firebase (Spark) cukup untuk pemakaian ini. Nama menu di Firebase Console bisa sedikit berbeda dari yang tertulis di sini.

### 1. Buat proyek

1. Buka https://console.firebase.google.com dan klik **Create a project**.
2. Beri nama, misalnya `doc-control-ebl`. Google Analytics boleh dimatikan.

### 2. Buat database

1. Menu **Build > Realtime Database > Create Database**.
2. Lokasi: **Singapore (asia-southeast1)**.
3. Pilih **Start in locked mode**, lalu **Enable**.
4. Salin alamat database di bagian atas tab Data. Bentuknya seperti
   `https://doc-control-ebl-default-rtdb.asia-southeast1.firebasedatabase.app`. Ini nilai **dbUrl**.

### 3. Pasang aturan keamanan

1. Masih di Realtime Database, buka tab **Rules**.
2. Hapus semua isinya, tempel seluruh isi file `firebase-rules.json`.
3. Klik **Publish**.

Firebase akan memberi peringatan bahwa data bisa dibaca publik. Itu memang disengaja, karena tombol "Lihat dokumen" bekerja tanpa login. Yang bisa menulis hanya akun `docoebl` dan `dept`.

### 4. Aktifkan login dan buat akun

1. Menu **Build > Authentication > Get started**.
2. Tab **Sign-in method**, pilih **Email/Password**, aktifkan, lalu **Save**.
3. Tab **Users**, klik **Add user**, buat tiga akun berikut dengan kata sandi pilihan Anda (minimal 6 karakter):

   | Email di Firebase | Username saat login di website | Hak |
   | --- | --- | --- |
   | `docoebl@ebl.app` | `docoebl` | Document Controller, akses penuh |
   | `dept@ebl.app` | `dept` | Departemen, tambah dan ubah dokumen folder 11 dan 12, isi bukti perbaikan |
   | `viewer@ebl.app` | `viewer` | Lihat saja |

   Email ini tidak perlu benar-benar ada. Di website, pengguna cukup mengetik username.
4. Tab **Settings > User actions**, hilangkan centang **Enable create (sign-up)**, lalu **Save**. Ini mencegah orang luar mendaftar sendiri.

Buat ketiga akun sebelum membagikan link website.

### 5. Ambil apiKey

1. Klik ikon roda gigi di kiri atas, pilih **Project settings**.
2. Di tab **General**, salin **Web API Key**.
3. Kalau belum muncul: gulir ke **Your apps**, klik ikon **</>**, daftarkan aplikasi web dengan nama bebas. Nilai `apiKey` tampil di kode yang ditunjukkan.

### 6. Isi config.js

1. Di GitHub, buka `config.js`, klik ikon pensil.
2. Isi kedua nilai di antara tanda kutip:

   ```js
   cloud: {
       dbUrl: 'https://doc-control-ebl-default-rtdb.asia-southeast1.firebasedatabase.app',
       apiKey: 'AIzaSy................................',
       emailDomain: 'ebl.app'
   },
   ```
3. Klik **Commit changes**.

### 7. Coba

1. Tunggu 1 sampai 2 menit, buka website, tekan **Ctrl+Shift+R**.
2. Di bawah tombol Masuk harus tertulis **Mode realtime (Firebase)**.
3. Login sebagai `docoebl` dengan kata sandi yang dibuat di Firebase.
4. Kalau database masih kosong, muncul tawaran mengimpor isi `data.json` lama. Pilih **OK** agar data lama pindah ke Firebase.
5. Di kanan atas muncul penanda hijau **Realtime**. Buka website di perangkat lain, ubah satu dokumen, dan perubahan muncul di perangkat pertama dalam beberapa detik.

---

## C. Mengganti kata sandi

**Mode realtime:** Firebase Console > Authentication > Users > titik tiga di baris akun > **Reset password**. Tidak ada file yang perlu diunggah.

**Mode lokal:**

1. Buka `tools/buat-hash.html` (klik dua kali file-nya di komputer, atau buka `alamat-website/tools/buat-hash.html`).
2. Pilih akun, ketik kata sandi baru, klik **Buat hash**.
3. Tempel hash ke baris akun tersebut di `config.js`, lalu **Commit changes**.

Jangan menulis kata sandi asli di file mana pun. Repositori ini bisa dibaca publik.

---

## D. Menambah atau mengganti nama akun

1. Tambahkan baris baru di bagian `users` pada `config.js`. `role` harus `admin`, `dept`, atau `viewer`. Username huruf kecil tanpa spasi.
2. Mode realtime: buat juga akunnya di Firebase Authentication sebagai `username@ebl.app`.
3. Mode realtime: aturan di `firebase-rules.json` hanya mengizinkan `docoebl@ebl.app` dan `dept@ebl.app` menulis. Kalau username admin atau departemen diganti atau ditambah, ubah juga email di aturan tersebut lalu **Publish** ulang.

---

## E. Kalau ada masalah

| Gejala | Penyebab dan solusi |
| --- | --- |
| "Username atau kata sandi salah" | Username harus salah satu yang ada di `config.js`. Mode lokal: buat ulang hash lewat `tools/buat-hash.html`. Mode realtime: reset kata sandi di Firebase. |
| "apiKey di config.js tidak valid" | Salin ulang Web API Key, pastikan tidak ada spasi atau karakter terpotong. |
| "Login Email/Password belum diaktifkan" | Ulangi langkah B.4. |
| "Server menolak perubahan (kode 401 atau 403)" | Aturan belum dipasang (B.3), atau akun tidak punya hak menulis. |
| "Gagal membaca data (kode 401)" | Aturan belum dipasang atau `dbUrl` salah. |
| Tertulis "Mode lokal" padahal config sudah diisi | `config.js` belum ter-commit, atau browser masih memakai versi lama. Tunggu 2 menit lalu Ctrl+Shift+R. |
| Penanda bertuliskan "Tersinkron hh:mm:ss", bukan "Realtime" | Jaringan memblokir koneksi langsung. Aplikasi otomatis memeriksa data setiap 10 detik, jadi tetap berfungsi. |
| "Login membutuhkan koneksi aman (https)" | Website dibuka lewat `http://`. Gunakan alamat `https://`. |
| Perubahan file belum terlihat | GitHub Pages perlu 1 sampai 2 menit. Coba jendela penyamaran (incognito). |

---

## Catatan keamanan

- **Mode lokal hanya penghalang tampilan.** Semua pemeriksaan terjadi di browser, sehingga orang yang paham teknis bisa melewatinya. Pakai mode ini hanya sementara.
- **Mode realtime benar-benar membatasi siapa yang bisa mengubah data**, karena penulisan diperiksa oleh server Firebase.
- Pada kedua mode, daftar dokumen dan link SharePoint bisa dibaca siapa pun yang punya alamat website. Isi file tetap dilindungi izin SharePoint.
- `apiKey` Firebase memang dirancang untuk terlihat publik. Yang melindungi data adalah aturan di `firebase-rules.json`.
- Batas paket gratis Firebase: 100 koneksi bersamaan, 1 GB data tersimpan, 10 GB unduhan per bulan.
- Sesekali cadangkan data: Firebase Console > Realtime Database > titik tiga > **Export JSON**.
