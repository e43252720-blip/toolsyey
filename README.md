# Tools Mahasiswa FEB Indonesia

Kerangka proyek Next.js 14 (App Router, TypeScript, Tailwind CSS) terintegrasi Supabase untuk aplikasi produktivitas mahasiswa Fakultas Ekonomi & Bisnis.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Auth, Database, Storage)
- Deploy target: Vercel

## Struktur Direktori Utama
- `app/layout.tsx` – layout global + navbar
- `app/page.tsx` – landing page
- `app/dashboard/page.tsx` – ringkasan tugas & shortcut tools
- `app/assignments` – list dan detail tugas (+ upload file)
- `app/tools/page.tsx` – kalkulator IP, planner SKS, simulasi keuangan, checklist maba
- `app/helper` – pencarian panduan tugas berbasis template Supabase
- `app/admin/templates/page.tsx` – CRUD template panduan
- `app/profile/page.tsx` – profil mahasiswa
- `app/api` – API routes untuk assignments, upload, helper, profile
- `lib/supabaseClient.ts` – inisialisasi klien Supabase (server + service role)

## Menjalankan Lokal
1. Salin `.env.example` menjadi `.env.local` lalu isi kredensial Supabase:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
2. Instal dependensi dan jalankan dev server:
   ```bash
   npm install
   npm run dev
   ```

## Skema Tabel Supabase
- `profiles`: id (PK, references auth.users), nama_lengkap, kampus, fakultas, prodi, created_at
- `assignments`: id (uuid, PK), user_id (FK auth.users), judul, mata_kuliah, jenis_tugas, deadline, deskripsi, status, created_at
- `assignment_files`: id (uuid, PK), assignment_id (FK assignments), file_name, file_url, created_at
- `task_templates`: id (uuid, PK), mata_kuliah, jenis_tugas, judul_template, isi_panduan, created_at
- Storage bucket: `assignment-files` untuk upload tugas.

Semua teks UI menggunakan bahasa Indonesia dan tidak memakai layanan AI berbayar.
