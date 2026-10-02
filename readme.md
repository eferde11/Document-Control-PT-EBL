# Document Control - PT Energi Batubara Lestari

Aplikasi web untuk memantau dan mengelola dokumen Sistem Manajemen Terintegrasi **ISO 9001, ISO 14001, dan ISO 45001** di PT Energi Batubara Lestari (EBL).

Website ini **tidak menyimpan file dokumen**. File asli disimpan di **SharePoint**, dan website hanya menyimpan data dokumen serta **link SharePoint**-nya. Seluruh aplikasi berada dalam satu file (`index.html`) dan berjalan di browser, sehingga bisa dipublikasikan lewat GitHub Pages tanpa server.

> **Status:** versi awal. Daftar dokumen masih disimpan di browser, belum di server. Lihat [Penyimpanan data](#penyimpanan-data) dan [Rencana pengembangan](#rencana-pengembangan).

## Fitur

**Halaman depan**
- Logo EBL dan ilustrasi tambang batubara beranimasi. Animasi berhenti otomatis bagi pengguna yang mengaktifkan pengaturan "kurangi gerakan".
- Dua pintu masuk: **Lihat dokumen** (Viewer, tanpa login) dan **Masuk sebagai User** (Document Controller, dengan login).

**Daftar dokumen**
- 13 folder dokumen, termasuk **Temuan Audit ISO**, dan menu **SEMUA DOKUMEN**.
- Pencarian, filter standar ISO, dan filter hasil review.
- Ringkasan per folder dan progres review.
- Tombol **Buka** membuka dokumen langsung di SharePoint.
- Detail dokumen berisi status, hasil review, hasil approval, dan riwayat revisi.

**Khusus User (Document Controller)**
- **Tambah dokumen** dengan menempel link SharePoint.
- **Approval:** pilih **Approved** atau **Tidak Approved**, lengkap dengan nama approver dan catatan. Status dokumen ikut berubah.
- **Review:** hasil *Perlu Update* atau *Tidak Perlu Update*, nama reviewer, dan catatan.
- **Edit dokumen** dan catat sebagai **Revisi ke-N** dengan catatan perubahan. Link SharePoint tiap revisi tersimpan di riwayat.
- Hapus dokumen.
- Tombol **Folder SharePoint** membuka folder tujuan penyimpanan file.

**Khusus Viewer**
- Hanya melihat daftar, detail, dan riwayat revisi, serta membuka link SharePoint.
- Tombol tambah, approval, review, edit, dan hapus tidak ditampilkan.

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
13. Temuan Audit ISO

## Status dokumen

| Status | Arti |
|---|---|
| In Review | Dokumen baru didaftarkan dan belum diputuskan. |
| Approved | Disetujui lewat tombol **Approval**. |
| Tidak Approved | Tidak disetujui lewat tombol **Approval**. |
| Obsolete | Dokumen tidak berlaku lagi (diatur lewat **Edit**). |

## Peran pengguna

| Peran | Cara masuk | Hak akses |
|---|---|---|
| Viewer | Tombol **Lihat dokumen** (tanpa login) | Lihat saja dan buka link SharePoint. |
| User (Document Controller) | **Masuk sebagai User** dengan username dan kata sandi | Tambah, approval, review, edit dan revisi, hapus. |

Username akun User: `docoebl` (tidak membedakan huruf besar dan kecil). Kata sandi tidak dicantumkan di sini. Simpan dan bagikan lewat jalur yang aman.

## Alur kerja

1. Document Controller masuk lewat **Masuk sebagai User**.
2. Klik **Folder SharePoint**, unggah file dokumen ke folder yang sesuai, lalu salin link berbagi file tersebut.
3. Klik **Tambah Dokumen**, isi data dokumen, tempel link SharePoint, lalu simpan. Dokumen berstatus *In Review*.
4. Klik **Approval** untuk menetapkan **Approved** atau **Tidak Approved**.
5. Klik **Review** untuk menandai *Perlu Update* atau *Tidak Perlu Update*.
6. Saat dokumen berubah, unggah file revisi ke SharePoint, klik ikon pensil, tempel link terbaru, isi catatan, lalu **Simpan Revisi**. Aplikasi mencatatnya sebagai Revisi ke-1, ke-2, dan seterusnya.
7. Temuan audit ISO didaftarkan di folder **13. Temuan Audit ISO** dengan cara yang sama.

## Teknologi

- HTML, CSS, dan JavaScript dalam satu file, tanpa proses build.
- [Tailwind CSS](https://tailwindcss.com) (CDN), [Alpine.js](https://alpinejs.dev) 3, dan [Lucide](https://lucide.dev).
- Font Bricolage Grotesque, IBM Plex Sans, dan IBM Plex Mono dari Google Fonts.
- Logo dan ilustrasi tertanam di `index.html`, jadi tidak ada file gambar terpisah.

Aplikasi membutuhkan koneksi internet untuk memuat CDN dan font.

## Menjalankan dan mempublikasikan

**Mencoba di komputer lokal:** buka `index.html` di browser. Login membutuhkan koneksi aman (`https://`) atau `localhost`. Kalau login gagal saat dibuka dari file lokal:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

**GitHub Pages:**

1. Unggah `index.html` dan `README.md` ke repositori GitHub.
2. Buka **Settings > Pages**, pilih branch utama dan folder root, lalu simpan.
3. Setiap `index.html` diganti dan di-commit, situs diperbarui otomatis.

## Konfigurasi

Pengaturan ada di bagian atas blok `<script>` terakhir di `index.html`.

| Pengaturan | Fungsi |
|---|---|
| `USERS` | Daftar akun User. Kata sandi disimpan sebagai hash SHA-256, bukan teks biasa. |
| `SHAREPOINT_FOLDER_URL` | Alamat folder SharePoint untuk tombol **Folder SharePoint**. |
| `VIEWER_CAN_OPEN_SHAREPOINT` | `true` (bawaan): Viewer boleh membuka link SharePoint. `false`: hanya User. |

**Mengganti kata sandi atau menambah akun:** hash dibuat dari teks `ebl:` diikuti kata sandi, lalu di-SHA-256.

```bash
printf 'ebl:KATA_SANDI_BARU' | sha256sum
```

Salin hasilnya ke kolom `hash` pada `USERS`:

```js
const USERS = [
    { username: 'docoebl', name: 'Document Controller EBL', role: 'admin', hash: 'HASIL_SHA256' }
];
```

Gunakan `role: 'admin'` untuk akun User.

## Penyimpanan data

- **File dokumen** disimpan di SharePoint, bukan di website. Mengganti `index.html` tidak berpengaruh pada file.
- **Daftar dokumen** (nomor, judul, versi, status, approval, review, riwayat revisi, link SharePoint) disimpan di `localStorage` browser. Data tetap ada setelah refresh dan setelah `index.html` diganti, tetapi **hanya di browser dan komputer yang sama**. Komputer lain tidak melihat dokumen yang ditambahkan.
- Dokumen contoh bawaan hanya dimuat sekali saat pertama dibuka. Dokumen contoh belum punya link SharePoint, jadi tombol **Buka** muncul setelah admin menambahkan link lewat **Edit**.
- Membersihkan data situs di browser akan menghapus daftar dokumen.

## Keamanan

Aplikasi ini adalah situs statis, jadi **semua kode, termasuk pengecekan login, bisa dibaca dan dilewati** oleh orang yang paham teknis. Login dan peran Viewer hanya berfungsi sebagai penghalang tampilan.

- Keamanan file sebenarnya ditentukan oleh **izin berbagi di SharePoint**. Atur link berbagi ke orang tertentu atau anggota organisasi, bukan "siapa saja yang punya link".
- Viewer masuk tanpa login, jadi siapa pun yang tahu alamat situsnya bisa melihat daftar dokumen dan link SharePoint-nya.
- Link folder SharePoint tertanam di kode halaman.
- Folder SharePoint saat ini berada di OneDrive pribadi seorang karyawan. Sebaiknya dipindahkan ke situs tim SharePoint agar tidak hilang bila akun dinonaktifkan.
- Jangan menyimpan dokumen rahasia di website ini sebelum login dipindahkan ke server.

## Rencana pengembangan

- Penyimpanan bersama di server (misalnya Supabase) agar semua departemen melihat daftar yang sama, disertai login yang diverifikasi di server dan backup.
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
