# Top 100 Active Farcaster Users

Mini app untuk menampilkan top 100 pengguna Farcaster paling aktif secara real-time menggunakan Neynar API.

---

## Fitur

- Menampilkan 100 pengguna dengan jumlah cast terbanyak
- Update real-time dengan WebSocket Neynar
- Dibangun dengan Next.js 14, Tailwind CSS, dan Socket.io-client
- Deploy otomatis ke Vercel via GitHub Actions

---

## Setup Lokal

1. Clone repo ini  
   ```bash
   git clone https://github.com/username/top-farcaster-users.git
   cd top-farcaster-users
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Buat file `.env.local` dan isi dengan:  
   ```
   NEXT_PUBLIC_NEYNAR_API_KEY=your_neynar_api_key_here
   ```

4. Jalankan development server  
   ```bash
   npm run dev
   ```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Deploy ke Vercel

1. Push kode ke GitHub (branch `main`)  
2. Buat project di [vercel.com](https://vercel.com) dan hubungkan ke repo ini  
3. Tambahkan secret environment variables di repo GitHub:  
   - `VERCEL_TOKEN`  
   - `VERCEL_ORG_ID`  
   - `VERCEL_PROJECT_ID`  
4. Workflow GitHub Actions akan otomatis build & deploy ke Vercel setiap push ke `main`

---

## Struktur File Penting

- `app/components/TopUsers.tsx` — Komponen utama yang fetch data & realtime update  
- `.github/workflows/deploy.yml` — Workflow deploy otomatis  
- `.env.local` — Simpan API key Neynar di sini  

---

## Catatan

- Pastikan API Key Neynar aktif dan punya akses realtime  
- Sesuaikan secrets GitHub dengan data project Vercel kamu  

---

Kalau ada pertanyaan atau butuh bantuan, tinggal bilang ya!