# Document Control - PT Energi Batubara Lestari

Aplikasi web untuk memantau dan mengelola dokumen Sistem Manajemen Terintegrasi **ISO 9001, ISO 14001, dan ISO 45001** di PT Energi Batubara Lestari (EBL). Seluruh aplikasi berada dalam **satu file** (`index.html`) dan berjalan langsung di browser, sehingga bisa dipublikasikan lewat GitHub Pages tanpa server.

> **Status:** versi awal. Data masih disimpan di browser, belum di server. Lihat bagian [Penyimpanan data](#penyimpanan-data) dan [Rencana pengembangan](#rencana-pengembangan).

## Fitur

**Halaman depan**
- Logo EBL dan ilustrasi tambang batubara beranimasi (dump truck hauling, ekskavator, conveyor, stockpile). Animasi berhenti otomatis bagi pengguna yang mengaktifkan pengaturan "kurangi gerakan".
- Dua pintu masuk: **Lihat dokumen** (Viewer, tanpa login) dan **Masuk sebagai User** (Document Controller, dengan login).

**Daftar dokumen**
- 12 folder dokumen ISO dan menu **SEMUA DOKUMEN** untuk melihat seluruh dokumen sekaligus.
- Pencarian, filter standar ISO, dan filter hasil review.
- Ringkasan per folder dan progres review.
- Detail dokumen dengan pratinjau PDF.

**Khusus User (Document Controller)**
- Unggah dokumen baru (PDF, DOC/DOCX, XLS/XLSX).
- **Edit dokumen** dan catat sebagai **Revisi ke-N** lengkap dengan catatan perubahan.
- **Riwayat revisi**: tanggal, pengubah, catatan, rincian perubahan, dan file tiap revisi.
- **Review dokumen** dengan hasil *Perlu Update* atau *Tidak Perlu Update*, nama reviewer, dan catatan.
- Hapus dokumen dan unduh file.
- Tombol **Folder SharePoint** dan kolom link file SharePoint per dokumen.

**Khusus Viewer**
- Hanya melihat: daftar, detail, riwayat revisi, dan pratinjau PDF.
- Tombol unggah, edit, review, hapus, dan unduh tidak ditampilkan.

## Folder dokumen

1. SK Tim ISO & SNI
2. Kebijakan Mutu K3L & Pencapaian
3. Proses Bisnis
4. Isu Eksternal dan Internal
5. Kebutuhan dan Harapan Stakeholder
6. Identifikasi Peraturan & Perundangan
7. HIRADC dan IBPR
8. Struktur Organisasi dan Jobdesc
9. Manual Mutu K3L
10. Sertifikat Training AW dan IA
11. Dokumen Departemen - Site
12. Dokumen Departemen - HO

## Peran pengguna

| Peran | Cara masuk | Hak akses |
|---|---|---|
| Viewer | Tombol **Lihat dokumen** (tanpa login) | Lihat saja. Unduh dinonaktifkan secara bawaan. |
| User (Document Controller) | **Masuk sebagai User** dengan username dan kata sandi | Unggah, edit dan revisi, review, hapus, unduh. |

Username akun User: `docoebl` (tidak membedakan huruf besar dan kecil). Kata sandi tidak dicantumkan di sini. Simpan dan bagikan lewat jalur yang aman.

## Teknologi

- HTML, CSS, dan JavaScript dalam satu file, tanpa proses build.
- [Tailwind CSS](https://tailwindcss.com) (CDN) untuk gaya.
- [Alpine.js](https://alpinejs.dev) 3 untuk interaksi.
- [Lucide](https://lucide.dev) untuk ikon.
- Font Bricolage Grotesque, IBM Plex Sans, dan IBM Plex Mono dari Google Fonts.
- Logo dan ilustrasi tertanam di dalam `index.html` sehingga tidak ada file gambar terpisah.

Aplikasi membutuhkan koneksi internet untuk memuat CDN dan font.

## Menjalankan dan mempublikasikan

**Mencoba di komputer lokal**

Buka `index.html` langsung di browser. Fitur login membutuhkan koneksi aman (`https://`) atau `localhost`. Kalau login gagal saat dibuka dari file lokal, jalankan server sederhana:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

**Publikasi lewat GitHub Pages**

1. Unggah `index.html` (dan `README.md`) ke repositori GitHub.
2. Buka **Settings > Pages**, pilih branch utama dan folder root, lalu simpan.
3. Setiap `index.html` diganti dan di-commit, GitHub Pages memperbarui situs secara otomatis.

## Konfigurasi

Semua pengaturan ada di bagian atas blok `<script>` terakhir di `index.html`.

| Pengaturan | Fungsi |
|---|---|
| `USERS` | Daftar akun User. Kata sandi disimpan sebagai hash SHA-256, bukan teks biasa. |
| `VIEWER_CAN_DOWNLOAD` | `false` (bawaan): Viewer tidak bisa mengunduh. `true`: Viewer bisa mengunduh. |
| `SHAREPOINT_FOLDER_URL` | Alamat folder SharePoint untuk tombol **Folder SharePoint**. |
| `VIEWER_CAN_OPEN_SHAREPOINT` | `true` (bawaan): Viewer boleh membuka link SharePoint. `false`: hanya User. |

**Mengganti kata sandi atau menambah akun**

Hash dibuat dari teks `ebl:` diikuti kata sandi, lalu di-SHA-256.

```bash
printf 'ebl:KATA_SANDI_BARU' | sha256sum
```

Salin hasilnya ke kolom `hash` pada `USERS`:

```js
const USERS = [
    { username: 'docoebl', name: 'Document Controller EBL', role: 'admin', hash: 'HASIL_SHA256' }
];
```

Gunakan `role: 'admin'` untuk akun User. Akun dengan peran lain tidak bisa masuk lewat pintu User.

## Penyimpanan data

Perilaku saat ini:

- **Daftar dokumen** (nomor, judul, versi, status, riwayat revisi, hasil review, link SharePoint) disimpan di `localStorage` browser. Data tetap ada setelah refresh dan setelah `index.html` diganti, tetapi **hanya di browser dan komputer yang sama**.
- **File yang diunggah** disimpan di memori browser dan **hilang saat halaman di-refresh**. Karena itu file asli sebaiknya diunggah ke folder SharePoint, lalu linknya ditempel di kolom *Link file di SharePoint*.
- Dokumen contoh bawaan hanya dimuat sekali saat pertama dibuka. Setelah itu, data di browser yang dipakai.
- Membersihkan data situs di browser akan menghapus daftar dokumen.

## Alur kerja yang disarankan

1. Document Controller masuk lewat **Masuk sebagai User**.
2. Unggah file dokumen ke folder SharePoint lewat tombol **Folder SharePoint**, lalu salin link berbagi file tersebut.
3. Klik **Unggah Dokumen Baru**, isi data dokumen, tempel link SharePoint, lalu simpan.
4. Saat dokumen berubah, klik ikon pensil, perbarui data dan link file, isi catatan perubahan, lalu **Simpan Revisi**. Aplikasi mencatatnya sebagai Revisi ke-1, ke-2, dan seterusnya.
5. Gunakan tombol **Review** untuk menandai dokumen *Perlu Update* atau *Tidak Perlu Update*.

## Keamanan

Aplikasi ini adalah situs statis, jadi **semua kode, termasuk pengecekan login, bisa dibaca dan dilewati** oleh orang yang paham teknis. Login dan peran Viewer hanya berfungsi sebagai penghalang tampilan, bukan pengamanan sungguhan.

- Jangan menyimpan dokumen rahasia di dalam aplikasi ini sebelum login dipindahkan ke server.
- Viewer masuk tanpa login, jadi siapa pun yang tahu alamat situsnya bisa melihat daftar dokumen.
- Link folder SharePoint tertanam di kode halaman. Pastikan izin berbagi foldernya diset ke orang tertentu atau anggota organisasi, bukan "siapa saja yang punya link".
- Folder SharePoint saat ini berada di OneDrive pribadi seorang karyawan. Sebaiknya dipindahkan ke situs tim SharePoint agar tidak hilang bila akun dinonaktifkan.

## Rencana pengembangan

- Penyimpanan bersama di server (misalnya Supabase) agar semua departemen melihat data yang sama, disertai login yang diverifikasi di server dan backup.
- Unggah otomatis ke SharePoint lewat Microsoft Graph dengan login akun Microsoft perusahaan.
- Notifikasi dokumen yang perlu direview atau diperbarui.
- Ekspor daftar dokumen ke Excel.

## Struktur repositori

```
.
├── index.html   # seluruh aplikasi (tampilan, logika, logo, dan ilustrasi)
└── README.md    # dokumen ini
```

## Kepemilikan

Dikembangkan untuk PT Energi Batubara Lestari, bagian dari Hasnur Group. Logo dan nama perusahaan adalah milik PT Energi Batubara Lestari.
