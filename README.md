# ADANIX — Interactive Full-Stack Developer Portfolio

A modern, interactive, proof-of-work developer portfolio built with React 19, Vite 8, TypeScript, Tailwind CSS v4, Three.js, and Lucide React. Engineered strictly under the **Zero-Toolchain on Host** paradigm and designed for seamless static deployment to GitHub Pages.

---

## 1. Quick Start (Zero-Toolchain on Host)

All node processes, builds, and development servers run inside containerized environments using Docker image `node:22-alpine`.

### Menjalankan Development Server
Development server sudah diorkestrasi melalui `docker-compose.yml`:
```bash
# Start container dev server (background)
docker compose up -d

# Memantau logs dev server
docker compose logs -f

# Menghentikan container
docker compose down
```
Server dapat diakses di:
- **Tailscale/Lokal:** `http://100.108.222.30:5173`
- **Domain Publik Live Preview:** `https://devrusuh.adanix.my.id`

### Menambah atau Memperbarui Dependensi NPM
Jalankan container ephemeral tanpa menginstall Node.js di host:
```bash
docker run --rm -u 1000:1000 -v $(pwd):/app -w /app node:22-alpine npm install <nama-package>
```

---

## 2. Production Build

Untuk memverifikasi static bundle sebelum deployment:
```bash
docker exec my-devrusuh npm run build
```
Output static production files akan otomatis dihasilkan pada direktori `dist/` dengan base path `/portofolio/`.

---

## 3. Cara Mengubah Konten Portfolio

Seluruh konten dikelola terpusat pada direktori `src/data/` agar modular dan mudah diperbarui tanpa menyentuh file styling/layout:

| File Konfigurasi | Deskripsi Data yang Dikelola |
| :--- | :--- |
| `src/data/site.ts` | Brand, headline, subheadline, verified email, dan URL GitHub profile. |
| `src/data/projects.ts` | Daftar project (SIMORSA, NIXSI, Takjil), demo credentials, feature highlights, dan live links. |
| `src/data/capabilities.ts` | Matriks problem-solution, badge kategori, dan pemetaan project pendukung. |
| `src/data/technologies.ts` | Daftar teknologi terverifikasi, kategori, deskripsi peran arsitektur, dan provenance implementasi. |
| `src/data/workflow.ts` | 5 fase metodologi engineering (Understand, Plan, Develop, Test, Deploy). |
| `src/data/navigation.ts` | Label dan ID anchor navbar. |

### Mengubah Email atau GitHub
Buka `src/data/site.ts` dan perbarui field berikut:
```typescript
export const siteConfig: SiteConfig = {
  // ...
  email: "email-anda@gmail.com",
  github: "https://github.com/UsernameAnda",
};
```

---

## 4. Mengatur Contact Form (Formspree Endpoint)

Portfolio ini tidak menggunakan backend database server sendiri, melainkan static endpoint submission yang aman.

1. Buka [Formspree](https://formspree.io/) dan buat form baru.
2. Salin Form Endpoint ID yang diberikan (contoh: `https://formspree.io/f/mqkvrzqe`).
3. Buat file `.env` di root proyek:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mqkvrzqe
   ```
4. Restart container:
   ```bash
   docker compose restart
   ```
*Catatan: Bila endpoint belum diisi, form secara otomatis menampilkan status unconfigured dan menyediakan direct link `mailto:` tanpa menghasilkan false success.*

---

## 5. Deployment ke GitHub Pages

Proyek ini telah dilengkapi GitHub Actions workflow pada `.github/workflows/deploy.yml`.

### Langkah Aktivasi di GitHub:
1. Push repository ke GitHub: `git push origin main`.
2. Buka repository di browser: `https://github.com/Adanix/portofolio`.
3. Buka tab **Settings** → **Pages**.
4. Pada bagian **Build and deployment** → **Source**, pilih **GitHub Actions**.
5. Setiap kali ada commit baru ke branch `main`, workflow akan otomatis menguji, mengompilasi, dan mempublikasikan website ke `https://adanix.github.io/portofolio/`.

### Mengubah Base Path jika Nama Repository Berubah
Jika nama repository diganti (misalnya menjadi `portfolio` atau root user pages `username.github.io`):
1. Buka `vite.config.ts`.
2. Ubah fallback base path:
   ```typescript
   base: process.env.VITE_BASE || (process.env.NODE_ENV === 'production' ? '/nama-repo-baru/' : '/'),
   ```
   *(Bila menggunakan custom domain atau root pages, gunakan `'/'`).*
3. Sesuaikan juga environment variable `VITE_BASE` pada `.github/workflows/deploy.yml`.

---

## 6. Arsitektur & Aturan Integritas Konten

- **Zero-Toolchain on Host**: VPS host tetap murni tanpa Node.js/toolchain lokal.
- **Strict Content Authenticity**: Tidak memuat statistik palsu, pendidikan, testimonial palsu, atau riwayat kerja fiktif.
- **Three-Channel Communication Only**: Hanya menyediakan Contact Form, Verified Email, dan Verified GitHub.
