// =====================================================================
//  PENGATURAN Document Control - PT Energi Batubara Lestari
//  Hanya file ini yang perlu diubah. index.html tidak perlu disentuh.
//  Panduan lengkap: README.md
// =====================================================================
window.EBL_CONFIG = {

    // -----------------------------------------------------------------
    // 1) REALTIME (Firebase)
    //    Kosong  = mode lokal (data dari data.json, tidak realtime).
    //    Terisi  = mode realtime: semua pengguna melihat perubahan saat
    //              itu juga, dan kata sandi diperiksa oleh Firebase.
    //    Cara mendapatkan kedua nilai ini ada di README.md bagian B.
    // -----------------------------------------------------------------
    cloud: {
        dbUrl: '',          // contoh: 'https://nama-proyek-default-rtdb.asia-southeast1.firebasedatabase.app'
        apiKey: '',         // contoh: 'AIzaSy................................'
        emailDomain: 'ebl.app'   // akun Firebase dibuat sebagai username@ebl.app
    },

    // -----------------------------------------------------------------
    // 2) AKUN
    //    username : huruf kecil, tanpa spasi.
    //    role     : 'admin' (Document Controller), 'dept' (Departemen),
    //               atau 'viewer' (lihat saja).
    //    hash     : hanya dipakai pada mode lokal. Buat lewat
    //               tools/buat-hash.html, lalu tempel di sini.
    //               Pada mode realtime, kata sandi diatur di Firebase.
    // -----------------------------------------------------------------
    users: [
        { username: 'docoebl', name: 'Document Controller EBL', role: 'admin',  hash: '153fcc75f06a65f2f67b288da3769e045977e8cf8ef092dc190e8b1180bb495f' },
        { username: 'viewer',  name: 'Viewer',                  role: 'viewer', hash: '5d851a0db798dda14cc31e28064c2691c4b8ac2688975a1e9e7b018a69b555c2' },
        { username: 'dept',    name: 'Departemen',              role: 'dept',   hash: '148e0f2bcf942e75ea92409cb0046ed01574b4346ec0b49f8cba48cd57edfe5c' }
    ]
};
