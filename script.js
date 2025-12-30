const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const menu = document.getElementById('menu-container');
const music = document.getElementById('bg-music');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===================================================
// DATABASE PESAN (Personalized)
// ===================================================
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
        "Halo Diva, Wanita Karir Kebanggaan...",
        "Tahun Ini Pasti Berat Ya? Tapi Kamu Hebat",
        "Terima Kasih Sudah Berjuang Sejauh Ini",
        "Kerja Keras Boleh, Tapi Jangan Lupa Istirahat",
        "Bahagiakan Dirimu Sendiri Juga Ya Dek",
        "Semoga Tahun Depan Gaji & Karir Makin Naik",
        "Tetap Rendah Hati & Sayang Keluarga",
        "❤️ Semangat Terus Diva ❤️",
        "✨ SELAMAT TAHUN BARU 2026 ✨"
    ],
    'faris': [
        "Hei Faris, Jagoan Keluarga...",
        "Perjalananmu Masih Panjang Dek",
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

// --- FUNGSI START ---
function startShow(name) {
    messages = allMessages[name];
    menu.style.display = 'none';
    canvas.style.display = 'block';
    music.play().catch(e => console.log("Gagal putar lagu:", e));
    animate();
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

// --- FUNGSI GAMBAR TEKS (UPDATE: ETHEREAL MOONLIGHT EFFECT) ---
function drawText() {
    if (msgIndex >= messages.length) msgIndex = messages.length - 1;
    let currentText = messages[msgIndex];
    let isSpecial = currentText.includes("2026");

    ctx.save();
    ctx.globalAlpha = msgOpacity;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let baseFontSize = Math.min(canvas.width / 18, 50);

    if (isSpecial) {
        // --- EFEK CAHAYA BULAN (ETHEREAL) ---
        // Sangat cocok untuk lagu Banda Neira
        
        // 1. Animasi Bernapas (Breathing) yang Sangat Lambat & Lembut
        // Angka 0.0015 membuat denyutannya pelan sekali, menenangkan
        let pulse = 1 + Math.sin(Date.now() * 0.0015) * 0.08; 
        ctx.font = `bold ${baseFontSize * 1.5 * pulse}px "Segoe UI", sans-serif`; 

        // 2. Warna Putih Bersih dengan Pendaran Biru Es (Ice Blue)
        ctx.fillStyle = "#ffffff"; 

        // 3. Glow yang Luas tapi Lembut
        // Shadow berubah perlahan antara Cyan dan Putih
        let glowIntensity = 20 + Math.sin(Date.now() * 0.003) * 10;
        ctx.shadowColor = "rgba(135, 206, 250, 0.8)"; // Light Sky Blue
        ctx.shadowBlur = glowIntensity; 
        
        // Garis tepi tipis agar tulisan tetap terbaca jelas di tengah cahaya
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        ctx.strokeText(currentText, canvas.width / 2, canvas.height / 2);

    } else {
        // Teks Biasa (Putih Simple)
        ctx.font = `bold ${baseFontSize}px "Segoe UI", sans-serif`;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(0, 198, 255, 0.3)";
        ctx.shadowBlur = 10;
    }
    
    ctx.fillText(currentText, canvas.width / 2, canvas.height / 2);
    ctx.restore();

    // Logika Transisi
    if (msgState === "in") {
        msgOpacity += 0.01; 
        if (msgOpacity >= 1) { msgOpacity = 1; msgState = "wait"; timer = 0; }
    } else if (msgState === "wait") {
        timer++;
        let waitTime = isSpecial ? 800 : 180; 
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
    
    if (Math.random() < 0.03) fireworks.push(new Firework());
    
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
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});