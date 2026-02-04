# 🔧 Fix Tailwind PostCSS Error

Error yang Anda alami:
```
[vite:css] [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
```

## 📋 Solusi Cepat

Tailwind CSS v4 memerlukan paket terpisah untuk PostCSS. 

### Option 1: Downgrade Tailwind ke v3 (Recommended - Stabil)

```bash
npm uninstall tailwindcss
npm install tailwindcss@3 postcss autoprefixer
```

Atau update di `package.json`:
```json
"devDependencies": {
  "tailwindcss": "^3.4.17"
}
```

### Option 2: Upgrade ke Tailwind v4 + @tailwindcss/postcss

```bash
npm uninstall tailwindcss
npm install tailwindcss@latest @tailwindcss/postcss
```

Lalu update `postcss.config.js`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

## ✅ Verifikasi Setup

1. Pastikan `postcss.config.js` di root folder
2. Pastikan `tailwind.config.js` ada
3. Pastikan `src/index.css` memiliki:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Restart dev server:
   ```bash
   npm run dev
   ```

---

**Rekomendasi: Gunakan Tailwind v3 untuk stabilitas maksimal!**
