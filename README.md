# ADANIX — Interactive Full-Stack Developer Portfolio

A modern, interactive, proof-of-work developer portfolio built with React 19, Vite 8, TypeScript, Tailwind CSS v4, Three.js, and Lucide React. Engineered under the **Zero-Toolchain on Host** paradigm and designed for static hosting deployment (such as GitHub Pages or custom static domains).

---

## 1. Quick Start (Development)

Proyek ini dapat dijalankan menggunakan Node.js lokal maupun lingkungan kontainer Docker terisolasi.

### Opsi A: Menggunakan Docker (Rekomendasi / Zero-Toolchain)
```bash
# Menjalankan dev server di background
docker compose up -d

# Melihat log dev server
docker compose logs -f

# Menghentikan kontainer
docker compose down
```

### Opsi B: Menggunakan Node.js Lokal
```bash
# Install dependensi
npm install

# Menjalankan dev server
npm run dev
```

Akses dev server melalui browser di `http://localhost:5173` (atau sesuai konfigurasi host/port lingkungan Anda).

---

## 2. Production Build

Untuk memvalidasi typecheck dan menghasilkan static production bundle:
```bash
npm run build
```
*(Atau via Docker: `docker exec my-devrusuh npm run build`)*

Output static distribution files akan disimpan di direktori `dist/`.

---

## 3. Konfigurasi Konten & Data Terpusat

Seluruh data konten dikelola secara modular pada direktori `src/data/`:

| File Konfigurasi | Deskripsi Data yang Dikelola |
| :--- | :--- |
| `src/data/site.ts` | Brand, headline, subheadline, verified email, dan URL GitHub profile. |
| `src/data/projects.ts` | Daftar proyek unggulan, demo credentials, feature highlights, dan link repositori. |
| `src/data/capabilities.ts` | Matriks problem-solution, badge kategori, dan pemetaan proyek pendukung. |
| `src/data/technologies.ts` | Daftar teknologi terverifikasi, kategori, dan deskripsi peran arsitektur. |
| `src/data/workflow.ts` | 5 fase metodologi engineering (Understand, Plan, Develop, Test, Deploy). |
| `src/data/navigation.ts` | Label dan ID anchor navbar. |

### Mengubah Email atau GitHub
Buka `src/data/site.ts` dan sesuaikan nilainya:
```typescript
export const siteConfig: SiteConfig = {
  // ...
  email: "email-anda@domain.com",
  github: "https://github.com/UsernameAnda",
};
```

---

## 4. Pengaturan Contact Form (Formspree Endpoint)

Website ini adalah static frontend murni tanpa database backend internal. Pengiriman pesan form kontak menggunakan provider formulir eksternal yang aman:

1. Buat form baru di penyedia formulir (misalnya [Formspree](https://formspree.io/)).
2. Salin form endpoint yang diberikan.
3. Buat file `.env` di root direktori proyek:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```
4. Restart development server.
*(Catatan: Jika endpoint belum diisi, form secara otomatis menampilkan status unconfigured yang informatif dan menyediakan fallback tombol direct email `mailto:`).*

---

## 5. Deployment ke GitHub Pages

Proyek ini telah dilengkapi GitHub Actions workflow pada `.github/workflows/deploy.yml`.

### Langkah Deployment:
1. Push branch `main` ke repository GitHub Anda.
2. Buka repository di browser: **Settings** → **Pages**.
3. Pada opsi **Build and deployment** → **Source**, pilih **GitHub Actions**.
4. Workflow akan otomatis berjalan pada setiap push untuk menguji, mengompilasi, dan mempublikasikan static assets.

### Menyesuaikan Base Path
Secara default, Vite mendukung base path yang dinamis:
- Jika menggunakan root domain / custom domain: base path dapat diset ke `'/'`.
- Jika menggunakan default GitHub Pages project path (`username.github.io/repo-name/`): tentukan environment variable `VITE_BASE=/repo-name/` saat build, atau sesuaikan nilai default pada `vite.config.ts`.

---

## 6. Prinsip & Integritas Konten

- **Authentic Proof of Work**: Tidak memuat statistik palsu, pendidikan konvensional, testimonial rekayasa, atau riwayat kerja fiktif.
- **Dedicated Communication Channels**: Hanya menyediakan Contact Form, Verified Email, dan Verified GitHub.
- **Zero-Toolchain Flexibility**: Kompatibel untuk dieksekusi di kontainer terisolasi maupun runner CI/CD standar.
