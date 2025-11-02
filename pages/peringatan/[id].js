// pages/peringatan/[id].js
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import dynamic from 'next/dynamic';

// Fetcher function (tidak berubah)
const fetcher = (url) => fetch(url).then((res) => res.json());

// Peta (tidak berubah)
const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

export default function PeringatanDetail() {
  const router = useRouter();
  const { url } = router.query;

  const { data: detail, error } = useSWR(
    url ? `/api/detail-peringatan?url=${encodeURIComponent(url)}` : null,
    fetcher
  );

  return (
    <>
      <Head>
        <title>
          {detail ? detail.headline : 'Detail Peringatan'} | BMKG Nowcast
        </title>
      </Head>

      <div> {/* Wrapper untuk konten */}
        <Link href="/" className="back-link">
          &larr; Kembali ke Daftar Peringatan
        </Link>

        {error && (
          <div className="status-message error-message">
            Gagal memuat detail peringatan.
          </div>
        )}

        {!detail && !error && (
          <div className="status-message">
            Memuat detail...
          </div>
        )}

        {detail && (
          <div className="detail-container">
            <h1>{detail.headline}</h1>
            
            <p style={{ fontSize: '1.1rem', marginTop: '-1rem', marginBottom: '1.5rem'}}>
              {detail.description}
            </p>

            {/* Layout Grid Info yang Baru */}
            <div className="detail-info">
              <strong>Jenis Kejadian</strong>
              <span><code>{detail.event}</code></span>

              <strong>Waktu Efektif</strong>
              <span>{new Date(detail.effective).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'long' })}</span>

              <strong>Waktu Berakhir</strong>
              <span>{new Date(detail.expires).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'long' })}</span>

              {detail.web && (
                <>
                  <strong>Infografik</strong>
                  <span><a href={detail.web} target="_blank" rel="noopener noreferrer">Lihat Peta Infografik</a></span>
                </>
              )}
            </div>

            <h2 style={{ marginTop: '2rem', borderTop: '1px solid var(--card-border)', paddingTop: '2rem' }}>
              Peta Wilayah Terdampak
            </h2>
            
            <MapWithNoSSR polygons={detail.polygons} />
          </div>
        )}
      </div>
    </>
  );
}