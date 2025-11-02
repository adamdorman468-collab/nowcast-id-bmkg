# Nowcast ID ⛈️

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)
![Vercel Deploy](https://vercel.com/button)

Dashboard interaktif *real-time* untuk memvisualisasikan peringatan cuaca aktif (Nowcast) dari **BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)**. Proyek ini mem-parsing data live XML/CAP untuk menampilkan area peringatan berbasis poligon yang presisi di atas peta, memberikan pandangan langsung dan jelas terhadap potensi bahaya cuaca di seluruh Indonesia.

![Screenshot Nowcast ID Dashboard](public/screenshot.png)
*(PENTING: Ambil screenshot dashboard Anda, simpan sebagai `screenshot.png` di dalam folder `public/`, lalu pastikan path-nya benar seperti di atas)*

---

## 🎓 Sertifikasi IBM SkillsBuild x Hacktiv8

Proyek ini dikembangkan sebagai **Capstone Project** (Proyek Akhir) untuk kursus sertifikasi **Code Generation Using IBM Granite** yang diselenggarakan oleh IBM SkillsBuild dan Hacktiv8.

README ini dan seluruh struktur proyek sengaja dirancang agar "super detil dan jelas" untuk memenuhi semua persyaratan kelulusan sertifikasi. Proyek ini menunjukkan kemahiran dalam:
1.  **Pengembangan Berbantuan AI:** Menggunakan *tool* Generative AI untuk akselerasi *code generation* dan *debugging*.
2.  **Manajemen Proyek:** Merencanakan fitur, mengelola *dependencies*, dan menyusun arsitektur proyek.
3.  **Implementasi Full-Stack:** Membangun backend (API) dan frontend (UI) yang fungsional dan terintegrasi.

#### Peran AI (IBM Granite) dalam Proyek Ini
Proyek ini dibangun dengan asistensi intensif dari *tool* AI Code Generation (sebagai bagian dari kurikulum sertifikasi). Peran AI meliputi:
* **Generasi Kode Awal:** Membuat *boilerplate* untuk komponen React, API Routes Next.js, dan struktur CSS.
* **Debugging Kompleks:** Membantu memecahkan masalah sulit terkait *parsing* XML ke JSON dan integrasi *dynamic import* React-Leaflet dengan Next.js.
* **Refactoring:** Me-*refactor* kode dari *prototype* awal menjadi kode yang bersih, modular, dan profesional (misalnya, memisahkan `Layout`, `Context`, dan `Map`).
* **Penulisan Dokumentasi:** Membantu menyusun dokumentasi teknis ini (`README.md`).

---

## 🚀 Demo Live

### **[>> Klik di sini untuk mengunjungi Dashboard Live <<](https://nowcast-id.vercel.app)**

*(Ganti `nowcast-id.vercel.app` dengan URL Vercel Anda yang sebenarnya setelah deploy)*

---

## ✨ Fitur Utama

* **Dashboard Real-time:** Mengambil data terbaru dari RSS feed BMKG secara otomatis setiap 5 menit menggunakan **SWR**.
* **Peta Interaktif (Leaflet):** Menampilkan *semua* poligon peringatan aktif di seluruh Indonesia dalam satu peta terpusat.
* **Visualisasi Presisi:** Merender data `<polygon>` dari file CAP untuk menunjukkan dengan tepat kecamatan mana saja yang terdampak.
* **Click-to-Fly:** Klik peringatan di sidebar, dan peta akan secara otomatis "terbang" (animasi `flyTo`) dan zoom ke lokasi peringatan tersebut.
* **Info Box Dinamis:** Menampilkan informasi detail (waktu berlaku, waktu berakhir, deskripsi) untuk peringatan yang sedang dipilih.
* **Backend Efisien (Serverless):** Menggunakan Next.js API Routes sebagai *proxy* backend. Ini penting untuk:
    1.  Meng-konversi data XML/CAP yang "sulit" dari BMKG menjadi JSON yang "mudah" untuk frontend.
    2.  Menyimpan data di *cache* (via `memory-cache`) untuk menghormati *rate limit* 60 permintaan/menit dari API BMKG dan mempercepat *load time*.
* **Mode Gelap/Terang:** Tombol *toggle* tema yang *seamless* dan mengingat pilihan pengguna (via `localStorage` dan React Context).
* **Halaman "Tentang" Profesional:** Halaman statis yang menjelaskan detail proyek, teknologi, sumber data, dan profil pengembang (Adam Dorman).

---

## 🛠️ Tumpukan Teknologi & Alat

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-000000?style=for-the-badge&logo=Vercel&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)

* **Framework:** Next.js 14 (Pages Router)
* **UI Library:** React.js
* **Pemetaan:** Leaflet & React-Leaflet
* **Pengambilan Data (Klien):** SWR (untuk *data fetching* dan revalidasi otomatis)
* **Parsing Data (Server):** `fast-xml-parser`
* **Caching (Server):** `memory-cache`
* **Manajemen State (Global):** React Context (untuk Tema)
* **Styling:** CSS Variables (Flexbox, Grid) & Font "Inter"
* **Deployment:** Vercel

---

## 📊 Sumber Data

Aplikasi ini bergantung penuh pada data publik resmi (Open Data) yang disediakan oleh **BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)**.

* **Endpoint RSS Feed:** `https://www.bmkg.go.id/alerts/nowcast/id`
* **Format Data:** RSS Feed dengan link ke file XML CAP (Common Alerting Protocol).
* **Kewajiban:** Atribusi penuh kepada BMKG wajib dicantumkan, yang telah dipenuhi di halaman "Tentang" dan *footer* proyek ini.

---

## 📁 Struktur Proyek

Struktur folder ini dirancang agar rapi, profesional, dan skalabel, sesuai dengan *best practice* Next.js:
nowcast-id/ ├── components/ # Komponen React (Layout, Peta, Tombol Tema) ├── context/ # React Context (ThemeContext.js) ├── pages/ # Halaman & Rute Aplikasi │ ├── api/ # Backend API Serverless │ │ ├── dashboard-data.js # (Mengambil & mem-parsing semua data BMKG) │ │ └── ... │ ├── _app.js # Layout global aplikasi (Inject CSS, Context) │ ├── index.js # Halaman Dashboard utama (Peta + Sidebar) │ └── tentang.js # Halaman statis 'Tentang' ├── public/ # Aset statis (favicon, foto profil, screenshot.png) ├── styles/ # CSS Global (globals.css) ├── .gitignore # File yang diabaikan Git (node_modules, .next) ├── LICENSE # Lisensi MIT ├── next.config.mjs # Konfigurasi Next.js ├── package.json # Daftar dependensi & skrip (npm) └── README.md # Dokumentasi ini

## ⚙️ Menjalankan Secara Lokal (Getting Started)

Untuk menjalankan proyek ini di komputer Anda:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/adamdorman468-collab/nowcast-id.git](https://github.com/adamdorman468-collab/nowcast-id.git)
    cd nowcast-id
    ```
    *(Pastikan Anda mengganti `nowcast-id` dengan nama repo Anda yang sebenarnya)*

2.  **Install semua dependensi:**
    (Proyek ini menggunakan `npm`)
    ```bash
    npm install
    ```
    *Ini akan menginstal: `next`, `react`, `leaflet`, `swr`, `fast-xml-parser`, dll.*

3.  **Jalankan server development:**
    ```bash
    npm run dev
    ```

4.  **Buka di browser:**
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat aplikasi berjalan.

---

## 👨‍💻 Pengembang (Author)

Proyek ini dirancang, dikembangkan, dan di-deploy oleh:

**Adam Dorman**
* Mahasiswa S1 Sistem Informasi
* UPN "Veteran" Jakarta (Angkatan 2024)
* **LinkedIn:** [linkedin.com/in/adamdorman68](https://www.linkedin.com/in/adamdorman68/)
* **GitHub:** [@adamdorman468-collab](https://github.com/adamdorman468-collab)

---

## 📄 License

Proyek ini dilisensikan di bawah **MIT License**. Lihat file [LICENSE](LICENSE) untuk detail lengkapnya.
