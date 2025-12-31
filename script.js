const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('menu-container');
const music = document.getElementById('bg-music');
const backBtn = document.getElementById('back-btn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// DATABASE PESAN
const allMessages = {
    'bapak': [
        "Assalamualaikum Bapak...",
        "Terima Kasih Sudah Menjadi Nahkoda Hebat",
        "Yang Tak Pernah Lelah Membimbing Kami",
        "Maaf Jika Anakmu Ini Masih Banyak Kurangnya",
        "Semoga Bapak Selalu Diberi Kesehatan",
        "Dipanjangkan Umurnya & Dilancarkan Rezekinya",
        "Tetaplah Jadi Cinta Pertama Keluarga Ini",
        "❤️ Kami Sayang Bapak ❤️",
        "✨ SELAMAT TAHUN BARU 2026 ✨"
    ],
    'mamah': [
        "Assalamualaikum Mamahku Sayang...",
        "Wanita Paling Kuat & Paling Sabar",
        "Terima Kasih Atas Setiap Doa di Sepertiga Malammu",
        "Yang Membuat Kami Bisa Bertahan Sampai Kini",
        "Maaf Kalau Sering Bikin Mamah Khawatir",
        "Sehat Selalu Ya Mah, Jangan Sakit-sakit",
        "Surga Kami Ada di Telapak Kakimu",
        "❤️ Kami Sayang Mamah ❤️",
        "✨ SELAMAT TAHUN BARU 2026 ✨"
    ],
    'diva': [
        "Halo Diva, Wanita Cantik Kebanggaan...",
        "Tahun Ini Pasti Berat Ya? Tapi Kamu Hebat",
        "Terima Kasih Sudah Berjuang Sejauh Ini",
        "Kerja Keras Boleh, Tapi Jangan Lupa Istirahat",
        "Bahagiakan Dirimu Sendiri Juga Ya Div",
        "Semoga Tahun Depan Gaji & Karir Makin Naik",
        "Tetap Rendah Hati & Sayang Keluarga",
        "❤️ Semangat Terus Diva ❤️",
        "✨ SELAMAT TAHUN BARU 2026 ✨"
    ],
    'faris': [
        "Hei Faris, Jagoan Keluarga...",
        "Perjalananmu Masih Panjang Ris",
        "Dunia Gak Cuma Sebatas Layar HP",
        "Ayo Buktikan Kalau Kamu Bisa Berprestasi",
        "Jadilah Laki-laki yang Bisa Diandalkan",
        "Sekolah yang Benar, Ibadah yang Rajin",
        "Buat Bapak & Mamah Tersenyum Bangga",
        "❤️ Masa Depanmu Cerah Faris ❤️",
        "✨ SELAMAT TAHUN BARU 2026 ✨"
    ]
};

// Variabel Global
let messages = []; 
let fireworks = [];
let particles = [];
let msgIndex = 0;
let msgOpacity = 0;
let msgState = "in"; 
let timer = 0;
let animationId;

// --- FUNGSI START ---
function startShow(name) {
    messages = allMessages[name];
    msgIndex = 0;
    msgState = "in";
    msgOpacity = 0;
    menu.style.display = 'none';
    backBtn.style.display = 'block';
    canvas.style.display = 'block';
    music.play().catch(e => console.log("Gagal putar lagu:", e));
    animate();
}

// --- FUNGSI KEMBALI ---
function goBack() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = 'none';
    backBtn.style.display = 'none';
    menu.style.display = 'block';
    fireworks = [];
    particles = [];
}

// --- KELAS KEMBANG API ---
class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * (canvas.height / 2.5); 
        this.speed = 4 + Math.random() * 4; 
        this.hue = Math.random() * 360;
    }
    update() { this.y -= this.speed; }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, hue) {
        this.x = x; this.y = y; this.hue = hue;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1; this.decay = Math.random() * 0.02 + 0.01; this.gravity = 0.05; 
    }
    update() {
        this.vx *= 0.96; this.vy *= 0.96; this.vy += this.gravity;
        this.x += this.vx; this.y += this.vy; this.alpha -= this.decay;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); 
        ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
        ctx.fill();
        ctx.restore();
    }
}

// --- FUNGSI UKURAN FONT ---
function getResponsiveFontSize(text, isSpecial) {
    let baseSize = Math.min(canvas.width / 15, 40); 
    // Font khusus neon: Monoton atau cursive
    ctx.font = isSpecial ? `500 ${baseSize}px "Monoton", cursive` : `bold ${baseSize}px "Segoe UI", sans-serif`;
    
    let textWidth = ctx.measureText(text).width;
    let maxWidth = canvas.width * 0.90; 

    if (textWidth > maxWidth) {
        baseSize = baseSize * (maxWidth / textWidth);
    }
    
    if (isSpecial) return baseSize * 1.5; // Neon sedikit lebih besar
    return baseSize;
}

// --- FUNGSI GAMBAR TEKS (EFEK NEON) ---
function drawText() {
    if (msgIndex >= messages.length) msgIndex = messages.length - 1;
    let currentText = messages[msgIndex];
    let isSpecial = currentText.includes("2026");

    ctx.save();
    ctx.globalAlpha = msgOpacity;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    let fontSize = getResponsiveFontSize(currentText, isSpecial);

    if (isSpecial) {
        // --- EFEK NEON WARNA-WARNI BERKEDIP ---
        
        // Gunakan font bergaya neon (pastikan import di HTML nanti)
        ctx.font = `500 ${fontSize}px "Monoton", cursive`;

        // 1. Warna Neon Berubah-ubah
        // Warna utama berubah seiring waktu (seperti siklus pelangi)
        let hue = (Date.now() / 20) % 360;
        let neonColor = `hsl(${hue}, 100%, 50%)`;
        let neonGlowColor = `hsl(${hue}, 100%, 70%)`;

        // 2. Efek Berkedip (Flicker)
        // Intensitas cahaya berubah acak untuk simulasi lampu neon asli
        let flicker = 0.8 + Math.random() * 0.2; 

        // 3. Gambar Glow (Pendaran Cahaya)
        ctx.shadowColor = neonGlowColor;
        ctx.shadowBlur = 30 * flicker; // Blur ikut berkedip
        ctx.fillStyle = neonColor;
        ctx.fillText(currentText, canvas.width / 2, canvas.height / 2);
        
        // 4. Gambar Teks Utama (Tabung Neon)
        // Lapisan kedua untuk mempertegas bentuk tabung
        ctx.shadowBlur = 10 * flicker;
        ctx.strokeStyle = "white"; // Bagian tengah tabung neon biasanya putih terang
        ctx.lineWidth = 2;
        ctx.strokeText(currentText, canvas.width / 2, canvas.height / 2);

    } else {
        // Teks Biasa
        ctx.font = `bold ${fontSize}px "Segoe UI", sans-serif`;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(0, 198, 255, 0.5)";
        ctx.shadowBlur = 10;
        ctx.fillText(currentText, canvas.width / 2, canvas.height / 2);
    }
    
    ctx.restore();

    // Logika Transisi
    if (msgState === "in") {
        msgOpacity += 0.01; 
        if (msgOpacity >= 1) { msgOpacity = 1; msgState = "wait"; timer = 0; }
    } else if (msgState === "wait") {
        timer++;
        let waitTime = isSpecial ? 500 : 180; 
        if (timer > waitTime) { 
             if (!isSpecial) msgState = "out"; 
        }
    } else if (msgState === "out") {
        msgOpacity -= 0.01; 
        if (msgOpacity <= 0) { 
            msgOpacity = 0; 
            if (msgIndex < messages.length - 1) { msgIndex++; msgState = "in"; }
        }
    }
}

function animate() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.05) fireworks.push(new Firework());
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update(); fireworks[i].draw();
        if (fireworks[i].y <= fireworks[i].targetY) {
            for (let j = 0; j < 40; j++) particles.push(new Particle(fireworks[i].x, fireworks[i].y, fireworks[i].hue));
            fireworks.splice(i, 1);
        }
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(); particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
    }
    drawText();
    animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});