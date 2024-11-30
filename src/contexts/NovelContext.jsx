// Mengimpor hook dan fungsi yang diperlukan dari React dan utilitas lainnya
import { createContext, useState, useContext, useEffect } from 'react'; 
import { getStorageItem, setStorageItem } from '../utils/storage'; // Fungsi untuk mengambil dan menyimpan data ke storage
import novels from '../data/novels'; // Data awal untuk novel yang diimpor dari file lain

// Membuat konteks baru untuk novel
const NovelContext = createContext(); 

// Membuat custom hook untuk memudahkan akses ke NovelContext
export const useNovelContext = () => useContext(NovelContext);

// Komponen Provider untuk membungkus bagian aplikasi yang membutuhkan akses ke context novel
export const NovelProvider = ({ children }) => {
  // Mendeklarasikan state novelList untuk menyimpan daftar novel
  const [novelList, setNovelList] = useState([]);

  // Mengambil data novel saat komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil data novel yang disimpan di localStorage (jika ada), atau menggunakan data default dari file novels
    const storedNovels = getStorageItem('novels') || novels;
    // Memperbarui state novelList dengan data yang diambil
    setNovelList(storedNovels);
  }, []); // Empty dependency array, sehingga efek ini hanya dijalankan sekali saat komponen dimuat

  // Fungsi untuk memperbarui daftar novel
  const updateNovels = (updatedNovels) => {
    setNovelList(updatedNovels); // Memperbarui state novelList dengan novel yang baru
    setStorageItem('novels', updatedNovels); // Menyimpan novel yang baru ke localStorage
  };

  // Fungsi untuk menghapus novel berdasarkan id
  const deleteNovel = (id) => {
    // Menghapus novel dengan id yang sesuai dari daftar novel
    const updatedNovels = novelList.filter(novel => novel.id !== id);
    // Memperbarui daftar novel setelah penghapusan
    updateNovels(updatedNovels);
  };

  // Provider yang akan membungkus anak-anak komponen dan memberikan akses ke nilai context
  return (
    <NovelContext.Provider value={{ novelList, updateNovels, deleteNovel }}>
      {children} {/* Bagian aplikasi yang dibungkus oleh provider ini dapat mengakses context novelList, updateNovels, deleteNovel */}
    </NovelContext.Provider>
  );
};
