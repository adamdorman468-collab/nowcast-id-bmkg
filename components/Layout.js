// components/Layout.js
import Head from 'next/head';
import ThemeToggleButton from './ThemeToggleButton';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        {/* Judul baru yang sudah kita set */}
        <title>Nowcast ID - Peringatan Dini Cuaca</title>
        <meta name="description" content="Dashboard Peringatan Dini Cuaca BMKG - Self Project oleh Adam Dorman" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="navbar">
        <div className="container navbar-content">
          
          {/* GRUP KIRI BARU */}
          <div className="navbar-left">
            <Link href="/" className="brand-title">
              ⛈️ Nowcast ID
            </Link>
            
            {/* LINK "TENTANG" PINDAH KE SINI */}
            <Link href="/tentang" className="navbar-about-link">
              Tentang Aplikasi
            </Link>
          </div> {/* <-- INI ADALAH </div> YANG HILANG */}

          {/* GRUP KANAN */}
          <ThemeToggleButton />

        </div>
      </header>

      {/* Wrapper untuk konten halaman (dari layout profesional) */}
      <div className="page-content">
        {children}
      </div>

      <footer className="footer">
        <div className="container footer-content">
          
          {/* Link 'Tentang' dihapus dari sini */}
          <div className="footer-links">
            <p>Sumber Data: <strong>BMKG</strong></p>
          </div>
          
          {/* Atribusi Anda */}
          <p className="attribution">
            Dibuat oleh <strong>Adam Dorman</strong> (S1 SI UPNVJ 2024)
            <br />
            Self Project & Capstone Project
          </p>
        </div>
      </footer>
    </>
  );
}