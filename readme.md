# Family New Year Greeting 2026 🎉

Kartu ucapan digital tahun baru berbasis web (HTML5 Canvas) yang dirancang khusus untuk keluarga. Proyek ini menampilkan animasi kembang api, efek teks *Ethereal Moonlight*, dan pemutar musik latar belakang dengan performa yang ringan.

## 🌟 Fitur Utama

* **Menu Pilihan Personal:** Opsi pesan khusus untuk Bapak, Mamah, Diva, dan Faris.
* **Animasi Kembang Api:** Dibuat menggunakan HTML5 Canvas tanpa membebani kinerja laptop (High Performance).
* **Efek Teks Spesial:** Teks "Selamat Tahun Baru 2026" memiliki efek *Ethereal Moonlight* (bercahaya lembut & bernapas) yang elegan.
* **Musik Latar:** Integrasi pemutar musik otomatis (memerlukan interaksi klik awal).
* **Responsif:** Tampilan menyesuaikan ukuran layar laptop atau browser.

## 📂 Struktur File

Pastikan semua file ini berada dalam **satu folder yang sama**:

```text
📁 Project_Animasi/
├── 📄 index.html      # Kerangka utama & Menu
├── 🎨 style.css       # Desain tampilan & Tombol
├── 📜 script.js       # Logika animasi, Partikel & Teks
├── 🎵 lagu.mp3        # File musik (Banda Neira - Sampai Jadi Debu)
└── 📝 README.md       # Dokumentasi ini
🚀 Cara Menjalankan
Pastikan semua file (index.html, style.css, script.js, dan file .mp3) sudah ada dalam satu folder.

Penting: Pastikan nama file lagu di folder sesuai dengan yang tertulis di index.html.

Disarankan: Ubah nama file lagu menjadi lagu.mp3 agar lebih mudah.

Klik kanan pada file index.html.

Pilih Open with > Google Chrome (atau Microsoft Edge).

Pilih nama anggota keluarga pada menu untuk memulai animasi.

⚙️ Cara Kustomisasi
1. Mengganti Lagu
Buka file index.html dan cari bagian ini:

HTML

<audio id="bg-music" loop>
    <source src="lagu.mp3" type="audio/mpeg">
</audio>
2. Mengubah Pesan / Ucapan
Buka file script.js dan edit bagian allMessages. Kamu bisa mengubah teks di dalam tanda kutip:

JavaScript

const allMessages = {
    'bapak': [
        "Pesan Baris 1",
        "Pesan Baris 2",
        // ...
    ],
    // ...
};
3. Mengubah Efek Visual
Jika ingin mengubah warna atau kecepatan animasi, cari variabel di dalam script.js pada bagian Firework atau drawText.

💻 Tech Stack
HTML5 (Structure & Audio)

CSS3 (Styling & Glassmorphism UI)

JavaScript ES6 (Canvas Rendering & Logic)

Dibuat dengan ❤️ untuk Keluarga Tercinta. Tahun Baru 2026