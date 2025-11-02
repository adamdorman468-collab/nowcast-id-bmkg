// components/Map.js
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import { useEffect, useMemo } from 'react';

// Style untuk poligon
const defaultStyle = { fillColor: '#d9534f', color: '#d9534f', weight: 2, opacity: 1, fillOpacity: 0.3 };
const selectedStyle = { fillColor: '#0070f3', color: '#0070f3', weight: 3, opacity: 1, fillOpacity: 0.5 };

// Komponen helper BARU: Animasi "Fly To"
function FlyToSelected({ selectedWarning }) {
  const map = useMap();

  useEffect(() => {
    if (selectedWarning && selectedWarning.polygons.length > 0) {
      // Ambil semua titik dari poligon pertama untuk warning terpilih
      const firstPolygon = selectedWarning.polygons[0];
      if (firstPolygon.length > 0) {
        // 'flyTo' adalah animasi, 'fitBounds' adalah snap
        map.flyTo(firstPolygon[0], 11); // Terbang ke titik pertama, zoom level 11
        // Alternatif: map.fitBounds(firstPolygon);
      }
    }
  }, [selectedWarning, map]);

  return null;
}

// Komponen helper: Auto-zoom ke semua warning saat pertama load
function FitAllBounds({ allWarnings }) {
  const map = useMap();
  useEffect(() => {
    if (allWarnings && allWarnings.length > 0) {
      const allPoints = allWarnings.flatMap(w => w.polygons.flat());
      if (allPoints.length > 0) {
        map.fitBounds(allPoints, { padding: [50, 50] }); // Beri padding
      }
    }
  }, [allWarnings, map]); // Hanya jalan sekali saat data load
  return null;
}

export default function DashboardMap({ allWarnings, selectedWarning }) {
  // Memoize ID agar tidak re-render semua poligon saat ID berubah
  const selectedWarningId = useMemo(() => selectedWarning?.id, [selectedWarning]);

  if (!allWarnings) {
    return <div>Memuat data peta...</div>;
  }

  return (
    <MapContainer
      center={[-2.5489, 118.0149]} // Pusat Indonesia
      zoom={5}
      scrollWheelZoom={true}
      className="leaflet-container" // Ini akan kita buat full-height
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Render SEMUA poligon */}
      {allWarnings.map(warning => (
        <MultiPolygonRenderer
          key={warning.id}
          polygons={warning.polygons}
          isSelected={warning.id === selectedWarningId}
        />
      ))}
      
      {/* Komponen helper untuk auto-zoom */}
      {!selectedWarningId && <FitAllBounds allWarnings={allWarnings} />}
      <FlyToSelected selectedWarning={selectedWarning} />

    </MapContainer>
  );
}

// Helper kecil agar pathOptions tidak re-render
function MultiPolygonRenderer({ polygons, isSelected }) {
  const style = isSelected ? selectedStyle : defaultStyle;
  return (
    <>
      {polygons.map((coords, index) => (
        <Polygon key={index} positions={coords} pathOptions={style} />
      ))}
    </>
  );
}