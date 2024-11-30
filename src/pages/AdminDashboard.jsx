// Mengimpor hook 'useState' dari React dan komponen lainnya yang diperlukan
import { useState } from "react";
import NovelManagement from "./NovelManagement.jsx"; // Komponen untuk mengelola novel
import UserManagement from "./UserManagement.jsx"; // Komponen untuk mengelola pengguna
import AdminComments from "./AdminComments.jsx"; // Komponen untuk mengelola komentar
import { useTheme } from "../contexts/ThemeContext.jsx"; // Mengimpor context untuk pengaturan tema

// Komponen utama AdminDashboard untuk mengelola seluruh tampilan dashboard admin
const AdminDashboard = () => {
  // State untuk menentukan tab yang aktif
  const [activeTab, setActiveTab] = useState("novels"); // Default aktif pada tab 'novels'
  
  // Mengambil nilai tema (dark mode atau tidak) dari context
  const { isDarkMode } = useTheme();

  // Fungsi untuk mendapatkan komponen aktif berdasarkan tab yang dipilih
  const getActiveComponent = () => {
    switch (activeTab) {
      case "novels":
        return <NovelManagement />; // Jika tab novels yang aktif, tampilkan komponen NovelManagement
      case "users":
        return <UserManagement />; // Jika tab users yang aktif, tampilkan komponen UserManagement
      case "comments":
        return <AdminComments />; // Jika tab comments yang aktif, tampilkan komponen AdminComments
      default:
        return null; // Default jika tidak ada tab yang aktif
    }
  };

  return (
    <div className={`admin-dashboard ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <h1>Admin Dashboard</h1> {/* Judul halaman dashboard admin */}
      
      {/* Kontainer untuk tombol tab, digunakan untuk berpindah antara novel, pengguna, dan komentar */}
      <div className="tab-buttons">
        <button
          className={`${activeTab === "novels" ? "active" : ""} ${isDarkMode ? "dark-mode" : "light-mode"}`}
          onClick={() => setActiveTab("novels")} // Mengubah tab aktif menjadi 'novels'
        >
          Manage Novels
        </button>
        <button
          className={`${activeTab === "users" ? "active" : ""} ${isDarkMode ? "dark-mode" : "light-mode"}`}
          onClick={() => setActiveTab("users")} // Mengubah tab aktif menjadi 'users'
        >
          Manage Users
        </button>
        <button
          className={`${activeTab === "comments" ? "active" : ""} ${isDarkMode ? "dark-mode" : "light-mode"}`}
          onClick={() => setActiveTab("comments")} // Mengubah tab aktif menjadi 'comments'
        >
          Manage Comments
        </button>
      </div>
      
      {/* Menampilkan komponen sesuai dengan tab yang aktif */}
      {getActiveComponent()}
    </div>
  );
};

// Mengekspor komponen AdminDashboard agar bisa digunakan di tempat lain
export default AdminDashboard;