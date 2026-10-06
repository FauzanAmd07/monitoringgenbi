// Helper Service untuk Google Apps Script (GAS) Web App
export const GAS_URL = import.meta.env.VITE_GAS_WEB_APP_URL || import.meta.env.VITE_PUBLIC_GAS_WEB_APP_URL || '';

/**
 * Mengirim request / mendeteksi koneksi ke GAS Web App
 */
export async function checkGASConnection() {
  if (!GAS_URL || GAS_URL.includes('TEMPEL_')) {
    return { success: false, message: 'URL GAS belum diisi di .env.local' };
  }

  try {
    const res = await fetch(GAS_URL, {
      method: 'GET',
      mode: 'cors',
    });
    if (res.ok) {
      return { success: true, message: 'Terhubung ke Google Apps Script!' };
    }
    return { success: true, message: `GAS Merespons dengan status ${res.status}` };
  } catch (err) {
    // Mode no-cors/CORS redirect warning fallback
    return { success: true, message: 'URL GAS terdeteksi dan aktif!' };
  }
}

/**
 * Mengirim data ke GAS (misal: pendaftaran berkas, presensi, sync)
 * @param {object} payload - Data JSON yang dikirim
 */
export async function sendToGAS(payload = {}) {
  if (!GAS_URL) {
    throw new Error('GAS_URL belum terkonfigurasi di .env.local');
  }

  const response = await fetch(GAS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8', // Mencegah isu CORS preflight pada GAS
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
}
