// pages/api/list-peringatan.js
import { XMLParser } from 'fast-xml-parser';
import cache from 'memory-cache';

// URL RSS Feed dari BMKG
const BMKG_RSS_URL = 'https://www.bmkg.go.id/alerts/nowcast/id';
const CACHE_KEY = 'bmkg-rss-feed';
const CACHE_TIME = 1000 * 60 * 5; // Cache selama 5 menit

export default async function handler(req, res) {
  // 1. Cek cache terlebih dahulu
  const cachedData = cache.get(CACHE_KEY);
  if (cachedData) {
    console.log('Mengambil data RSS dari cache...');
    return res.status(200).json(cachedData);
  }

  console.log('Mengambil data RSS baru dari BMKG...');
  try {
    // 2. Ambil data XML dari BMKG
    const response = await fetch(BMKG_RSS_URL);
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

    // 4. Proses data agar lebih rapi (opsional tapi disarankan)
    // Memastikan 'item' selalu berupa array, bahkan jika hanya ada 1 peringatan
    let items = [];
    if (jsonData.rss && jsonData.rss.channel && jsonData.rss.channel.item) {
      if (Array.isArray(jsonData.rss.channel.item)) {
        items = jsonData.rss.channel.item;
      } else {
        items = [jsonData.rss.channel.item]; // Ubah objek tunggal menjadi array
      }
    }
    
    // Ekstrak ID unik dari link untuk URL yang lebih bersih
    const processedData = items.map((item) => {
      const urlParts = item.link.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const id = fileName.replace('.xml', '');
      return {
        ...item,
        id: id,
      };
    });

    // 5. Simpan ke cache
    cache.put(CACHE_KEY, processedData, CACHE_TIME);

    // 6. Kembalikan data JSON
    res.status(200).json(processedData);
  } catch (error) {
    console.error('Error di API list-peringatan:', error);
    res.status(500).json({ error: error.message });
  }
}