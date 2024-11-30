// Import berbagai modul React dan React Router DOM
import { Link, useNavigate, useLocation } from "react-router-dom"; // Untuk navigasi dan pembuatan tautan
import { useState, useEffect } from "react"; // Untuk mengelola state dan efek samping
import { useTheme } from "../contexts/ThemeContext"; // Mengakses konteks tema (dark mode atau light mode)
import { Sun, Moon } from 'lucide-react'; // Ikon untuk tema terang dan gelap

// Komponen Header menerima props `categories` (daftar kategori) dan `onCategoryChange` (fungsi perubahan kategori)
const Header = ({ categories = [], onCategoryChange }) => {
  const navigate = useNavigate(); // Untuk navigasi secara programatik
  const location = useLocation(); // Untuk mendapatkan informasi lokasi saat ini
  const [dropdownOpen, setDropdownOpen] = useState(false); // Mengontrol status dropdown kategori
  const { isDarkMode, toggleTheme } = useTheme(); // Mengakses dan mengontrol status tema
  const [isScrolled, setIsScrolled] = useState(false); // Status apakah halaman telah digulir atau tidak

  // Fungsi untuk mengecek apakah pengguna menggulir halaman
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0); // Tetapkan `isScrolled` ke `true` jika scrollY lebih besar dari 0
  };

  // Tambahkan dan hapus event listener pada saat mount dan unmount komponen
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Dengarkan peristiwa scroll
    return () => window.removeEventListener("scroll", handleScroll); // Bersihkan listener saat komponen dilepas
  }, []);

  // Fungsi untuk menangani pemilihan kategori
  const handleCategorySelect = (category) => {
    onCategoryChange(category); // Panggil fungsi perubahan kategori
    setDropdownOpen(false); // Tutup dropdown setelah kategori dipilih

    // Navigasi ke rute kategori spesifik atau ke semua kategori
    if (category && category !== "Semua Kategori") {
      navigate(`/kategori/${category}`); // Navigasi ke kategori tertentu
    } else {
      navigate('/kategori'); // Navigasi ke semua kategori
    }
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Hapus status login dari localStorage
    navigate("/login"); // Arahkan pengguna ke halaman login
  };

  // Render komponen Header
  return (
    // Header dengan kelas yang diubah berdasarkan tema dan status scroll
    <header className={`header ${isDarkMode ? "dark-mode" : "light-mode"} ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        {/* Container untuk logo atau judul */}
        <div className="logo-title-container">
          <h1 className="title-header">NovelMe:v</h1> {/* Judul aplikasi */}
        </div>

        {/* Navigasi utama */}
        <nav className="navigation">
          <ul className="nav-links">
            {/* Tautan ke halaman utama */}
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>

            {/* Tautan ke halaman About */}
            <li>
              <Link to="/about" className="nav-link">About</Link>
            </li>

            {/* Dropdown kategori */}
            <li className="kategori-container">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown saat tombol diklik
                className="kategori-toggle"
                aria-expanded={dropdownOpen} // ARIA untuk aksesibilitas
                aria-haspopup="true"
              >
                Kategori
              </button>

              {/* Dropdown hanya muncul jika `dropdownOpen` true */}
              {dropdownOpen && (
                <ul className="kategori-dropdown">
                  {categories.map((category) => ( // Render daftar kategori
                    <li
                      key={category} // Setiap elemen harus memiliki kunci unik
                      className="kategori-item"
                      onClick={() => handleCategorySelect(category)} // Panggil fungsi saat kategori dipilih
                    >
                      {category} {/* Nama kategori */}
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Tautan ke halaman Admin Dashboard */}
            <li>
              <Link to="/pengelola" className="nav-link">Admin Dashboard</Link>
            </li>

            {/* Tombol logout */}
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>

            {/* Tombol untuk mengubah tema */}
            <li>
              <button
                onClick={toggleTheme} // Panggil fungsi untuk mengubah tema
                className={`theme-toggle ${isDarkMode ? "dark-mode" : "light-mode"}`} // Kelas sesuai tema
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} // ARIA untuk aksesibilitas
              >
                {/* Tampilkan ikon Sun untuk mode gelap, Moon untuk mode terang */}
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; // Ekspor komponen Header sebagai default
