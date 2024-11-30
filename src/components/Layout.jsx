// Mengimpor ThemeProvider dari context ThemeContext untuk memberikan akses ke tema gelap/terang ke seluruh aplikasi
import { ThemeProvider } from '../contexts/ThemeContext';
// Mengimpor komponen Header yang akan ditampilkan di bagian atas halaman
import Header from './Header';
// Mengimpor komponen Footer yang akan ditampilkan di bagian bawah halaman
import Footer from './Footer';

// Komponen Layout menerima prop 'children' yang berisi konten yang akan ditampilkan di dalam layout
const Layout = ({ children }) => {
  return (
    // Membungkus seluruh aplikasi dengan ThemeProvider untuk memberikan akses ke tema
    <ThemeProvider>
      <div className="app-container">
        {/* Menampilkan Header di bagian atas layout */}
        <Header />
        
        {/* Bagian utama konten dari halaman, diisi dengan konten anak yang diterima oleh prop 'children' */}
        <main className="container-page">
          {children}
        </main>
        
        {/* Menampilkan Footer di bagian bawah layout */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

// Mengekspor komponen Layout agar dapat digunakan di bagian lain aplikasi
export default Layout;