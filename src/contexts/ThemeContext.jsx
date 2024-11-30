// Mengimpor hook yang dibutuhkan dari React
import { createContext, useState, useContext, useEffect } from 'react';

// Membuat konteks baru untuk tema (dark mode / light mode)
const ThemeContext = createContext();

// Komponen ThemeProvider bertugas untuk membungkus aplikasi dan menyediakan data tema
export const ThemeProvider = ({ children }) => {
  // State untuk menyimpan status apakah dark mode aktif atau tidak, defaultnya false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Hook useEffect untuk memeriksa tema yang disimpan di localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    // Mengambil tema yang disimpan dari localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Jika tema disimpan, set state isDarkMode sesuai dengan nilai tema yang disimpan ('dark' atau 'light')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark'); // Jika tema yang disimpan 'dark', maka set isDarkMode ke true
    }
  }, []); // Dependency array kosong, artinya hanya dijalankan sekali saat komponen dimuat pertama kali

  // Fungsi untuk mengubah tema (toggle antara dark mode dan light mode)
  const toggleTheme = () => {
    const newTheme = !isDarkMode; // Membalikkan nilai isDarkMode
    setIsDarkMode(newTheme); // Memperbarui state isDarkMode dengan nilai baru
    localStorage.setItem('theme', newTheme ? 'dark' : 'light'); // Menyimpan tema baru ke localStorage
  };

  // Menyediakan context ke komponen lain dengan nilai isDarkMode dan fungsi toggleTheme
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children} {/* Komponen anak akan dapat mengakses value dari context ini */}
    </ThemeContext.Provider>
  );
};

// Hook custom untuk mengakses ThemeContext dengan mudah dari komponen lain
export const useTheme = () => useContext(ThemeContext);