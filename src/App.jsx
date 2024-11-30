// Mengimpor hook dan komponen yang dibutuhkan
import { Outlet, useLocation, useParams } from "react-router-dom"; // Mengimpor hook untuk routing dan rendering outlet
import { useState, useEffect } from "react"; // Mengimpor hook React untuk state dan efek samping
import { useTheme } from "./contexts/ThemeContext"; // Mengimpor hook untuk mendapatkan tema saat ini (dark/light mode)
import Header from "./components/Header"; // Mengimpor komponen Header
import Footer from "./components/Footer"; // Mengimpor komponen Footer
import { NovelProvider } from './contexts/NovelContext'; // Mengimpor provider untuk mengelola data novel

export default function App() {
  // Mendefinisikan state untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Mengambil lokasi path saat ini dari routing
  const location = useLocation();
  
  // Mengambil parameter kategori dari URL (misalnya: /category/romance)
  const { category } = useParams();
  
  // Mendapatkan status tema dari ThemeContext (dark atau light mode)
  const { isDarkMode } = useTheme();
  
  // Daftar kategori yang tersedia untuk dipilih
  const categories = [
    "Semua Kategori",
    "Misteri",
    "Petualangan",
    "Romantis",
    "Cinta",
    "Fantasi",
    "Keluarga",
    "Fiksi",
    "Sahabat",
    "Sejarah",
    "Grafis",
    "Konflik",
    "Aksi"
  ];

  // Fungsi untuk menangani perubahan kategori yang dipilih
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Mengupdate state kategori yang dipilih
  };

  // Hook useEffect untuk merespons perubahan pada lokasi URL
  useEffect(() => {
    // Jika path tidak mengandung "/category/" atau "/kategori", reset kategori yang dipilih
    if (!location.pathname.startsWith("/category/") && !location.pathname.startsWith("/kategori")) {
      setSelectedCategory(""); // Reset kategori ke default
    }
  }, [location]); // Hook ini akan dijalankan setiap kali lokasi (path) berubah

  // Hook useEffect untuk merespons perubahan kategori yang diambil dari URL parameter
  useEffect(() => {
    // Jika ada kategori dalam URL (parameter), update kategori yang dipilih
    if (category) {
      setSelectedCategory(decodeURIComponent(category)); // Dekode kategori URL dan set ke state
    }
  }, [category]); // Hook ini dijalankan setiap kali parameter kategori diubah

  return (
    // Membungkus seluruh aplikasi dengan NovelProvider, sehingga data novel dapat diakses oleh komponen anak
    <NovelProvider>
      <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}> 
        {/* Menambahkan kelas 'dark-mode' atau 'light-mode' sesuai dengan tema */}
        
        <Header categories={categories} onCategoryChange={handleCategoryChange} /> 
        {/* Komponen Header dengan daftar kategori dan handler untuk memilih kategori */}
        
        <main className="main-content">
          {/* Outlet untuk merender konten dinamis berdasarkan rute, dengan context kategori yang dipilih */}
          <Outlet context={{ selectedCategory }} />
        </main>
        
        <Footer />
        {/* Footer aplikasi */}
      </div>
    </NovelProvider>
  );
}
