# 🚀 Integrasi Supabase - Portfolio Saya

## Langkah-Langkah Setup

### 1️⃣ Buat Akun Supabase
- Kunjungi [https://supabase.com](https://supabase.com)
- Sign up atau login dengan GitHub
- Buat project baru

### 2️⃣ Dapatkan Credentials
- Di Supabase Dashboard, pergi ke **Settings > API**
- Copy **Project URL** dan **anon public key**
- Paste ke file `.env.local`:
  ```
  VITE_SUPABASE_URL=YOUR_PROJECT_URL
  VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
  ```

### 3️⃣ Setup Database
- Di Supabase Dashboard, buka **SQL Editor**
- Copy-paste semua kode dari `SUPABASE_SETUP.sql`
- Run query

### 4️⃣ Setup Storage Bucket (Optional - untuk media upload)
- Pergi ke **Storage** > **New Bucket**
- Nama: `portfolio-media`
- Buat sebagai **Public**
- Di Policies, pastikan authenticated users bisa upload/download

### 5️⃣ Setup Authentication
- Pergi ke **Authentication > Providers**
- Enable **Email Provider** (sudah default)
- Di **Email Templates**, customize jika diperlukan

### 6️⃣ Test Aplikasi
```bash
npm run dev
```
- Klik tombol LOGIN di pojok kanan bawah
- Register akun baru atau login
- Edit portfolio Anda
- Klik SAVE - data akan tersimpan ke Supabase
- Refresh halaman - data akan load kembali

---

## 🔒 Fitur Keamanan

✅ **Row Level Security (RLS)** - User hanya bisa akses data mereka sendiri  
✅ **Authentication** - Hanya user terautentikasi yang bisa edit  
✅ **Encrypted Database** - Data tersimpan aman di Supabase  

---

## 📁 File Structure Baru

```
src/
├── lib/
│   ├── supabaseClient.js       # Inisialisasi Supabase
│   └── usePortfolio.js         # Hook & auth functions
├── components/
│   └── AuthModal.jsx           # Modal login/register
├── App.jsx                     # Updated dengan Supabase
└── ...
```

---

## 🎯 Fitur yang Tersedia

1. **Register/Login** - Create akun baru atau masuk
2. **Save Portfolio** - Semua perubahan disimpan ke Supabase
3. **Auto Load** - Data otomatis muncul saat login
4. **Multi-user** - Tiap user punya portfolio sendiri
5. **Logout** - Clear session dan data

---

## 🔧 Troubleshooting

### Error: "Can't read VITE_SUPABASE_URL"
- Pastikan file `.env.local` ada di root folder
- Format harus: `VITE_SUPABASE_URL=...` (tanpa spasi)
- Restart dev server setelah update env

### Error: "CORS error"
- Di Supabase Settings > API, tambah domain Anda di CORS Whitelist
- Untuk development: `http://localhost:5173` atau port Vite Anda

### Data tidak tersimpan
- Pastikan user sudah login
- Check Supabase console jika ada error di database
- Lihat browser console untuk error detail

---

## 📝 API Functions Available

```javascript
import { 
  usePortfolioData,        // Hook untuk load/save data
  loginWithEmail,          // Login
  registerWithEmail,       // Register
  logout,                  // Logout
  getCurrentUser,          // Get current user
  onAuthStateChange        // Listen to auth changes
} from './lib/usePortfolio';
```

---

## 🌐 Deploy ke Vercel/Netlify

1. Push code ke GitHub
2. Connect repository ke Vercel/Netlify
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

---

## 📞 Bantuan Lebih Lanjut

- Docs Supabase: https://supabase.com/docs
- Tutorial Auth: https://supabase.com/docs/guides/auth
- Vite Env: https://vitejs.dev/guide/env-and-mode.html

---

**Happy Coding! 🎉**
