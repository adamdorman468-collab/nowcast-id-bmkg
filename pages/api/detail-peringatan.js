// pages/api/detail-peringatan.js
import { XMLParser } from 'fast-xml-parser';
import cache from 'memory-cache';

const CACHE_TIME = 1000 * 60 * 10; // Cache detail lebih lama, 10 menit

export default async function handler(req, res) {
  const { url } = req.query; // Ambil URL CAP dari query parameter

  if (!url) {
    return res.status(400).json({ error: 'Parameter URL diperlukan' });
  }

  // 1. Cek cache
  const cachedData = cache.get(url);
  if (cachedData) {
    console.log(`Mengambil data CAP dari cache: ${url}`);
    return res.status(200).json(cachedData);
  }

  console.log(`Mengambil data CAP baru dari BMKG: ${url}`);
  try {
    // 2. Ambil data XML detail dari BMKG
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Gagal mengambil data: ${response.statusText}`);
    }
    const xmlData = await response.text();

    // 3. Parse XML ke JSON
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
    const jsonData = parser.parse(xmlData);
    const info = jsonData.alert.info;

    // 4. Logika "Canggih": Mem-parsing string poligon menjadi array koordinat
    //    BMKG mengirim <polygon>...</polygon>
    //    Kita ubah "lat,lon lat,lon" menjadi [[lat, lon], [lat, lon]]
    let parsedPolygons = [];
    if (info.area && info.area.polygon) {
      const polygons = Array.isArray(info.area.polygon)
        ? info.area.polygon
        : [info.area.polygon]; // Pastikan selalu array

      parsedPolygons = polygons.map((polyString) => {
        return polyString.split(' ').map((coordPair) => {
          const [lat, lon] = coordPair.split(',').map(Number);
          return [lat, lon]; // Format Leaflet adalah [lat, lon]
        });
      });
    }

    // 5. Siapkan data bersih untuk dikirim ke frontend
    const processedData = {
      headline: info.headline,
      description: info.description,
      effective: info.effective,
      expires: info.expires,
      event: info.event,
      web: info.web, // Link ke infografik
      polygons: parsedPolygons, // Ini data kuncinya!
    };

    // 6. Simpan ke cache
    cache.put(url, processedData, CACHE_TIME);

    // 7. Kembalikan data
    res.status(200).json(processedData);
  } catch (error) {
    console.error('Error di API detail-peringatan:', error);
    res.status(500).json({ error: error.message });
  }
}