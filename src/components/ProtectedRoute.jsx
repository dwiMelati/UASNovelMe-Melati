// Mengimpor komponen Navigate dari react-router-dom untuk melakukan navigasi secara programatik
// Mengimpor hook useLocation untuk mendapatkan lokasi saat ini dari URL
import { Navigate, useLocation } from "react-router-dom";

// Komponen ProtectedRoute menerima prop 'children' yang berisi komponen anak dan 'adminOnly' yang menentukan apakah hanya admin yang dapat mengakses rute ini
export default function ProtectedRoute({ children, adminOnly = false }) {
  // Mengecek apakah pengguna sudah login dengan memeriksa nilai 'isLoggedIn' di localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // Mengecek apakah pengguna memiliki status admin dengan memeriksa nilai 'isAdmin' di localStorage
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  
  // Mendapatkan lokasi saat ini untuk menavigasi kembali setelah login
  const location = useLocation();

  // Jika pengguna tidak login, redirect ke halaman login dan menyertakan lokasi saat ini
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika hanya admin yang diperbolehkan mengakses dan pengguna bukan admin, redirect ke halaman utama
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Jika pengguna sudah login (dan memenuhi kriteria admin jika diperlukan), render komponen anak yang diteruskan
  return children;
}