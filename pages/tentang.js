// pages/tentang.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // <-- IMPOR BARU UNTUK FOTO

export default function Tentang() {
  return (
    <>
      <Head>
        <title>Tentang Aplikasi | Nowcast ID</title>
      </Head>

      <div className="container static-page-container">
        <div className="about-page-container">
          
          <h1>Tentang Aplikasi Nowcast ID</h1>
          <p className="subtitle">
            Sebuah Capstone Project untuk memvisualisasikan data Nowcast BMKG secara real-time.
          </p>

          {/* === BAGIAN PENGEMBANG (DIPERBARUI) === */}
          <section>
            <h2>Tentang Pengembang</h2>
            
            {/* Layout Flex Baru: Foto di kiri, Info di kanan */}
            <div className="developer-profile">
              
              {/* FOTO ANDA */}
              <div className="developer-photo">
                <Image 
                  src="/adam-dorman.jpg" // <-- Mengambil dari folder /public
                  alt="Foto Adam Dorman"
                  width={120} // Tentukan ukuran
                  height={120}
                  className="profile-pic"
                />
              </div>

              {/* INFO ANDA */}
              <div className="developer-info-text">
                <p>
                  Aplikasi ini dirancang dan dikembangkan sebagai *Self Project* dan *Capstone Project* oleh:
                </p>
                <p><strong>Nama:</strong> Adam Dorman</p>
                <p><strong>Status:</strong> Mahasiswa S1 Sistem Informasi</p>
                <p><strong>Institusi:</strong> UPN "Veteran" Jakarta (UPNVJ)</p>
                <p><strong>Angkatan:</strong> 2024</p>
                
                {/* LINK BARU (GitHub & LinkedIn) */}
                <div className="developer-links">
                  <a href="https://www.linkedin.com/in/adamdorman68/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <span>|</span>
                  <a href="https://github.com/adamdorman468-collab" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* === BAGIAN SUMBER DATA (TETAP SAMA) === */}
          <section>
            <h2>Sumber Data (Atribusi)</h2>
            <p>
              Seluruh data cuaca yang ditampilkan di aplikasi ini berasal dari sumber data terbuka (Open Data) resmi milik <strong>Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)</strong>.
            </p>
            <p>
              Aplikasi ini bergantung pada layanan Peringatan Dini Cuaca (Nowcast) BMKG yang berbasis Common Alerting Protocol (CAP). Data ini diperbarui setiap saat oleh BMKG untuk memberikan informasi yang akurat dan tepat waktu.
            </p>
            <ul>
              <li><strong>Penyedia Data:</strong> BMKG</li>
              <li><strong>Format Data:</strong> XML (RSS Feed & CAP)</li>
              <li><strong>Akses API:</strong> <a href="https://www.bmkg.go.id/alerts/nowcast/id" target="_blank" rel="noopener noreferrer">BMKG Nowcast Alerts</a></li>
            </ul>
            <p>
              Kredit penuh dan hak cipta data tetap dimiliki oleh BMKG. Aplikasi ini hanya bertindak sebagai platform visualisasi.
            </p>
          </section>

          {/* === BAGIAN TEKNOLOGI (TETAP SAMA) === */}
          <section>
            <h2>Teknologi yang Digunakan</h2>
            <p>Dashboard ini dibangun menggunakan tumpukan teknologi modern (modern tech stack) untuk memastikan kecepatan, skalabilitas, dan pengalaman pengguna yang baik:</p>
            <ul>
              <li><strong>Framework:</strong> Next.js (React)</li>
              <li><strong>Backend API:</strong> Next.js API Routes (Serverless)</li>
              <li><strong>Visualisasi Peta:</strong> Leaflet & React-Leaflet</li>
              <li><strong>Data Fetching:</strong> SWR</li>
              <li><strong>Parsing XML:</strong> fast-xml-parser</li>
              <li><strong>Manajemen State:</strong> React Context (untuk Tema)</li>
              <li><strong>Styling:</strong> CSS Variables (dengan Mode Terang/Gelap)</li>
              <li><strong>Deployment:</strong> Vercel</li>
            </ul>
          </section>

          <Link href="/" className="back-link-about">
            &larr; Kembali ke Dashboard
          </Link>

        </div>
      </div>
    </>
  );
}