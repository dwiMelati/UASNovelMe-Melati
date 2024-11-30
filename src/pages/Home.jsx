// Mengimpor hook 'useState', 'useEffect' dari React, dan 'useNavigate' untuk navigasi
// Mengimpor komponen 'Color' untuk memilih warna berdasarkan judul novel
// Mengimpor context 'useTheme' untuk pengaturan tema (dark/light) dan 'useNovelContext' untuk data novel
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Color from "../components/Color.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useNovelContext } from '../contexts/NovelContext';

// Komponen utama Home
export default function Home() {
  // State untuk menyimpan indeks novel yang sedang ditampilkan di carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Hook untuk navigasi antar halaman
  const navigate = useNavigate();
  
  // Mengambil informasi apakah tema dark mode aktif atau tidak
  const { isDarkMode } = useTheme();
  
  // Mengambil daftar novel dari context 'NovelContext'
  const { novelList } = useNovelContext();

  // Membuat daftar genre berdasarkan kategori novel yang unik
  const genres = [...new Set(novelList.flatMap((novel) => novel.category))];
  
  // Mengurutkan novel berdasarkan ID terbaru dan mengambil 10 novel terakhir
  const latestNovels = [...novelList].sort((a, b) => b.id - a.id).slice(0, 10);
  
  // Mengurutkan novel berdasarkan jumlah dibaca terbanyak dan mengambil 10 novel terpopuler
  const popularNovels = [...novelList]
    .sort((a, b) => parseInt(b.Dibaca) - parseInt(a.Dibaca))
    .slice(0, 10);

  // Mengambil novel dengan kategori "Misteri" dan membatasi hingga 10 novel
  const mysteryNovels = novelList
    .filter((novel) => novel.category.includes("Misteri"))
    .slice(0, 10);
  
  // Mengambil novel dengan kategori "Keluarga" dan membatasi hingga 10 novel
  const familyNovels = novelList
    .filter((novel) => novel.category.includes("Keluarga"))
    .slice(0, 10);
  
  // Menyaring genre yang bukan "Misteri" atau "Keluarga"
  const otherGenres = genres.filter(
    (genre) => genre !== "Misteri" && genre !== "Keluarga"
  );

  // Menggunakan hook 'useEffect' untuk mengubah novel yang ditampilkan setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % novelList.length);
    }, 5000); // Mengubah novel setiap 5 detik
    return () => clearInterval(interval); // Membersihkan interval ketika komponen tidak lagi digunakan
  }, [novelList.length]); // Efek ini akan dijalankan ulang jika jumlah novel berubah

  // Mendapatkan novel yang sedang ditampilkan berdasarkan indeks saat ini
  const currentNovel = novelList[currentIndex] || null;

  // Fungsi untuk menangani klik pada novel dan mengarahkan pengguna ke halaman kategori
  const handleNovelClick = (novel) => {
    navigate('/kategori', { 
      state: { 
        selectedNovel: novel, // Mengirim novel yang dipilih
        showAllCategories: true // Menampilkan semua kategori
      } 
    });
  };

  // Komponen untuk menampilkan daftar novel terpopuler
  const PopularNovelsSection = () => (
    <div className="popular-novels">
      <h2>Novel Terpopuler</h2>
      <div className="novel-scroll">
        {popularNovels.map((novel) => (
          <div
            key={novel.id}
            onClick={() => handleNovelClick(novel)} // Memanggil fungsi klik novel
            className="novel-item cursor-pointer"
            role="button"
            tabIndex={0} // Membuat elemen dapat diakses dengan keyboard
          >
            <div className="novel-image-container">
              <img src={novel.image} alt={novel.title} />
              <div className="novel-title-overlay">
                <p>{novel.title}</p>
              </div>
            </div>
            <span className="read-count">{novel.Dibaca} kali dibaca</span>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Komponen untuk menampilkan daftar novel terbaru
  const LatestNovelsSection = () => (
    <div className="latest-novels">
      <h2>Novel Terbaru</h2>
      <div className="novel-scroll">
        {latestNovels.map((novel) => (
          <div
            key={novel.id}
            onClick={() => handleNovelClick(novel)} // Memanggil fungsi klik novel
            className="novel-item cursor-pointer"
            role="button"
            tabIndex={0} // Membuat elemen dapat diakses dengan keyboard
          >
            <div className="novel-image-container">
              <img src={novel.image} alt={novel.title} />
              <div className="novel-title-overlay">
                <p>{novel.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`home-container ${isDarkMode ? "dark-mode" : "light-mode"}`} // Mengubah class berdasarkan tema
    >
      {/* Menampilkan novel yang sedang dipilih di carousel */}
      {currentNovel && (
        <div
          className={`novel-section ${isDarkMode ? "dark-mode" : "light-mode"}`} // Mengubah class berdasarkan tema
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #000033 0%, #000066 100%)" // Latar belakang untuk dark mode
              : Color(currentNovel.title), // Latar belakang untuk light mode menggunakan warna berdasarkan judul novel
          }}
        >
          <img
            className="novel-image"
            src={currentNovel.image}
            alt={currentNovel.title}
          />
          <div className="text-container">
            <h2 className="novel-title">{currentNovel.title}</h2>
            <p className="novel-description">{currentNovel.description}</p>
            <button
              className={`read-button ${isDarkMode ? "dark-mode" : "light-mode"}`} // Menyesuaikan tombol dengan tema
              onClick={() => handleNovelClick(currentNovel)} // Fungsi untuk membaca novel
            >
              Baca Sekarang
            </button>
          </div>
        </div>
      )}

      {/* Menampilkan novel berdasarkan kategori "Misteri" */}
      <div className="category-section">
        <h2>Novel Misteri</h2>
        <div className="novel-scroll">
          {mysteryNovels.map((novel) => (
            <div
              key={novel.id}
              onClick={() => handleNovelClick(novel)} // Memanggil fungsi klik novel
              className="novel-item cursor-pointer"
              role="button"
              tabIndex={0} // Membuat elemen dapat diakses dengan keyboard
            >
              <div className="novel-image-container">
                <img src={novel.image} alt={novel.title} />
                <div className="novel-title-overlay">
                  <p>{novel.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menampilkan novel berdasarkan kategori "Keluarga" */}
      <div className="category-section">
        <h2>Novel Keluarga</h2>
        <div className="novel-scroll">
          {familyNovels.map((novel) => (
            <div
              key={novel.id}
              onClick={() => handleNovelClick(novel)} // Memanggil fungsi klik novel
              className="novel-item cursor-pointer"
              role="button"
              tabIndex={0} // Membuat elemen dapat diakses dengan keyboard
            >
              <div className="novel-image-container">
                <img src={novel.image} alt={novel.title} />
                <div className="novel-title-overlay">
                  <p>{novel.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menampilkan komponen PopularNovelsSection dan LatestNovelsSection */}
      <PopularNovelsSection />
      <LatestNovelsSection />
    </div>
  );
}
