// Fungsi untuk mengambil item dari localStorage berdasarkan key
export const getStorageItem = (key) => {
  // Mengecek apakah kode dijalankan di browser (karena localStorage hanya tersedia di browser)
  if (typeof window !== 'undefined') {
    // Mengambil item dari localStorage menggunakan key yang diberikan
    const item = localStorage.getItem(key);
    
    // Jika item ada, mengembalikan data yang telah di-parse dari JSON ke objek JavaScript
    // Jika item tidak ada, mengembalikan null
    return item ? JSON.parse(item) : null;
  }
  
  // Jika dijalankan di server-side (di luar browser), mengembalikan null
  return null;
};

// Fungsi untuk menyimpan item ke localStorage
export const setStorageItem = (key, value) => {
  // Mengecek apakah kode dijalankan di browser
  if (typeof window !== 'undefined') {
    // Menyimpan data ke localStorage setelah mengubahnya menjadi string JSON
    localStorage.setItem(key, JSON.stringify(value));
  }
};
