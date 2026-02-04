# 🔧 Fix untuk Save Feature Tidak Bekerja

## 📋 Masalah
Fitur SAVE di portfolio builder tidak berfungsi karena:
1. ❌ SQL schema lama pakai `portfolios` table dengan `user_id` (pakai authentication)
2. ❌ App.jsx masih pakai local state, tidak connect ke Supabase
3. ❌ Admin access pakai hardcoded password (17jan2003), bukan Supabase auth

## ✅ Solusi yang Diterapkan

### 1. **Update SQL Schema** (SUPABASE_SETUP.sql)
- ❌ Hapus: `portfolios` table dengan user_id & RLS user-specific
- ✅ Buat: `portfolio_content` table dengan:
  - `id = 1` (single row untuk semua data)
  - `data JSONB` (simpan seluruh portfolio)
  - PUBLIC access (tanpa user authentication)

### 2. **Update App.jsx**
- ✅ Import `supabase` client
- ✅ Add `useEffect` untuk load data saat mount
- ✅ Update `handleSave()` untuk save ke Supabase

## 🚀 Langkah Setup (3 menit)

### Step 1: Jalankan SQL Baru
1. Buka https://supabase.com dashboard
2. Pilih project Anda
3. Buka **SQL Editor**
4. **Delete** kode lama (atau langsung paste kode baru)
5. Copy & paste SELURUH kode dari `SUPABASE_SETUP.sql`
6. Click **Run**

**Output yang diharapkan:**
```
DROP TABLE IF EXISTS portfolios CASCADE
DROP TABLE IF EXISTS portfolio_content CASCADE
CREATE TABLE portfolio_content
INSERT INTO portfolio_content
ALTER TABLE portfolio_content ENABLE ROW LEVEL SECURITY
CREATE POLICY "Allow Public Read"
CREATE POLICY "Allow Public Insert"
CREATE POLICY "Allow Public Update"
CREATE POLICY "Allow Public Delete"
```

### Step 2: Test Aplikasi
```bash
npm run dev
```

1. Buka http://localhost:5173
2. Klik footer 3x → login dengan password `17jan2003`
3. Klik **EDIT**
4. Edit sesuatu (misal: ubah title di hero section)
5. Klik **SAVE**
6. Lihat popup: "✅ Perubahan Berhasil Disimpan!"
7. **Refresh page** (F5)
8. Data harus tetap ada ✓

## 🔍 Debugging

### ✅ Check di Browser Console
Seharusnya muncul:
```
✅ Data loaded from Supabase
✅ Data saved to Supabase successfully
```

### ❌ Jika Error "Cannot read property 'from'"
- Check `.env.local` ada di root folder
- Pastikan format benar: `VITE_SUPABASE_URL=...` dan `VITE_SUPABASE_ANON_KEY=...`
- Restart dev server: `npm run dev`

### ❌ Jika Error "Relation 'portfolio_content' does not exist"
- SQL belum dijalankan di Supabase
- Kembali ke Step 1 dan jalankan SQL

### ❌ Jika Data hilang setelah refresh
- Database credentials salah
- Check `.env.local` match dengan Supabase dashboard
- Coba: Buka Supabase console > SQL Editor > `SELECT * FROM portfolio_content;`
  - Seharusnya ada 1 row dengan id = 1

## 📝 Struktur Data (JSONB)

Data yang disimpan di `portfolio_content.data`:
```javascript
{
  theme: { primary, secondary, accent, bg, fonts: { title, body } },
  socials: [ { id, type, url }, ... ],
  decorations: [ { id, type, x, y, size, color, opacity, animation }, ... ],
  nav: { logoText, logoImage, menu: [ ... ] },
  footer: { text, tagline },
  sections: [ { id, type, page, animation, data: { ... } }, ... ]
}
```

## 🎯 Perbedaan dari Setup Sebelumnya

| Aspek | Sebelumnya | Sekarang |
|-------|-----------|---------|
| **Auth** | Per-user dengan email/password | Hardcoded password (17jan2003) |
| **Table** | `portfolios` (per user) | `portfolio_content` (single shared) |
| **Data** | Per-user portfolio | Single portfolio (id=1) |
| **RLS** | User-specific policies | Public access (password di frontend) |
| **Scalability** | Multi-user ready | Single site builder mode |

## 💡 Tips

1. **Backup manual**: Copy paste output dari `SELECT * FROM portfolio_content;` ke file text
2. **Multiple portfolios**: Nanti bisa add rows dengan id = 2, 3, 4, dst
3. **Media size**: Base64 images bisa membuat row besar. Limit sekitar 500KB per image optimal
4. **Deploy**: Environment variables di Vercel/Netlify harus di-set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 🎉 Selesai!

Portfolio Anda sekarang cloud-connected dan data akan otomatis tersimpan saat klik SAVE.

---

**Terakhir update:** Feb 4, 2026
**Status:** ✅ Ready to Use
