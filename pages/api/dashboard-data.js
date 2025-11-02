// pages/api/dashboard-data.js
import { XMLParser } from 'fast-xml-parser';
import cache from 'memory-cache';

const BMKG_RSS_URL = 'https://www.bmkg.go.id/alerts/nowcast/id';
const CACHE_KEY = 'bmkg-dashboard-data';
const CACHE_TIME = 1000 * 60 * 5; // Cache selama 5 menit

// Helper untuk mengambil dan mem-parsing satu file CAP
async function getCapDetail(item) {
  try {
    const response = await fetch(item.link);
    if (!response.ok) return null; // Abaikan jika gagal
    const xmlData = await response.text();
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
    const jsonData = parser.parse(xmlData);
    const info = jsonData.alert.info;

    // Ekstrak poligon
    let parsedPolygons = [];
    if (info.area && info.area.polygon) {
      const polygons = Array.isArray(info.area.polygon) ? info.area.polygon : [info.area.polygon];
      parsedPolygons = polygons.map((polyString) => {
        return polyString.split(' ').map((coordPair) => {
          const [lat, lon] = coordPair.split(',').map(Number);
          return [lat, lon];
        });
      });
    }

    // Gabungkan data RSS (item) dengan data CAP (info)
    return {
      id: item.id, // ID unik dari RSS
      title: item.title,
      pubDate: item.pubDate,
      headline: info.headline,
      description: info.description,
      effective: info.effective,
      expires: info.expires,
      event: info.event,
      web: info.web,
      polygons: parsedPolygons,
    };
  } catch (error) {
    console.error(`Gagal mengambil detail CAP: ${item.link}`, error);
    return null;
  }
}

export default async function handler(req, res) {
  // 1. Cek cache
  const cachedData = cache.get(CACHE_KEY);
  if (cachedData) {
    console.log('Mengambil data DASHBOARD dari cache...');
    return res.status(200).json(cachedData);
  }

  console.log('Mengambil data DASHBOARD baru dari BMKG...');
  try {
    // 2. Ambil daftar RSS utama
    const response = await fetch(BMKG_RSS_URL);
    if (!response.ok) throw new Error('Gagal mengambil RSS feed');
    const xmlData = await response.text();
    
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const rssJson = parser.parse(xmlData);

    let items = [];
    if (rssJson.rss && rssJson.rss.channel && rssJson.rss.channel.item) {
      items = Array.isArray(rssJson.rss.channel.item) 
        ? rssJson.rss.channel.item 
        : [rssJson.rss.channel.item];
    }

    // Proses item RSS untuk menambahkan ID unik
    const processedItems = items.map((item) => {
      const urlParts = item.link.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const id = fileName.replace('.xml', '');
      return { ...item, id };
    });

    // 3. Ambil SEMUA detail CAP secara paralel
    const detailPromises = processedItems.map(getCapDetail);
    const allDetails = await Promise.all(detailPromises);

    // 4. Filter data yang gagal diambil (null)
    const validData = allDetails.filter(data => data !== null && data.polygons.length > 0);

    // 5. Simpan ke cache
    cache.put(CACHE_KEY, validData, CACHE_TIME);

    // 6. Kembalikan data JSON besar untuk dashboard
    res.status(200).json(validData);

  } catch (error) {
    console.error('Error di API dashboard-data:', error);
    res.status(500).json({ error: error.message });
  }
}