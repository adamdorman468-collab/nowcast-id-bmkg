// pages/index.js
import Head from 'next/head';
import useSWR from 'swr';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const DashboardMapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const [selectedWarning, setSelectedWarning] = useState(null);
  const { data: allWarnings, error } = useSWR('/api/dashboard-data', fetcher, {
    refreshInterval: 300000, // 5 menit
  });

  const formatTanggal = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', { timeStyle: 'short' });
  };

  return (
    <>
      <Head>
        <title>Dashboard Peringatan Dini BMKG</title>
      </Head>

      {/* Wrapper ini akan mengisi .page-content */}
      <div className="dashboard-page-wrapper">

        <div className="dashboard-layout">
        
          <aside className="dashboard-sidebar">
            <div className="sidebar-header">
              <h2>Peringatan Dini Aktif</h2>
              <p>
                {error ? 'Gagal memuat' : !allWarnings ? 'Memuat...' : `${allWarnings.length} peringatan aktif`}
              </p>
            </div>

            <div className="sidebar-list">
              {allWarnings && allWarnings.map(warning => (
                <div
                  key={warning.id}
                  className={`sidebar-item ${selectedWarning?.id === warning.id ? 'selected' : ''}`}
                  onClick={() => setSelectedWarning(warning)}
                >
                  <h3>{warning.title}</h3>
                  <p>{warning.description}</p>
                  <div className="sidebar-item-footer">
                    <span>Berakhir: {formatTanggal(warning.expires)}</span>
                  </div>
                </div>
              ))}
              
              {/* PESAN BARU UNTUK KASUS KOSONG */}
              {allWarnings && allWarnings.length === 0 && (
                <div className="sidebar-no-warning">
                  Tidak ada peringatan dini aktif saat ini.
                </div>
              )}
            </div>
          </aside>

          <section className="dashboard-map-container">
            <DashboardMapWithNoSSR 
              allWarnings={allWarnings} 
              selectedWarning={selectedWarning} 
            />
            {selectedWarning && (
              <div className="map-info-box">
                <h3>{selectedWarning.headline}</h3>
                
                {/* BARIS INI TELAH DIPERBAIKI (TYPO </M DIHAPUS) */}
                <p><strong>Berlaku:</strong> {formatTanggal(selectedWarning.effective)} - {formatTanggal(selectedWarning.expires)}</p>
                
                <p>{selectedWarning.description}</p>
                {selectedWarning.web && (
                  <a href={selectedWarning.web} target="_blank" rel="noopener noreferrer">
                    Lihat Infografik BMKG
                  </a>
                )}
                <button onClick={() => setSelectedWarning(null)}></button>
              </div>
            )}
          </section>

        </div>

      </div>
    </>
  );
}