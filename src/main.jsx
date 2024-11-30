// Mengimpor React dan library terkait untuk membangun aplikasi
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Mengimpor router dan routing untuk aplikasi
import { ThemeProvider } from "./contexts/ThemeContext"; // Mengimpor ThemeProvider untuk mengelola tema (dark mode/light mode)
import App from "./App"; // Mengimpor komponen utama aplikasi
import Home from "./pages/Home"; // Mengimpor halaman Home
import About from "./pages/About"; // Mengimpor halaman About
import Kategori from "./pages/Kategori"; // Mengimpor halaman Kategori
import AdminDashboard from "./pages/AdminDashboard"; // Mengimpor halaman Dashboard Admin
import NovelManagement from "./pages/NovelManagement"; // Mengimpor halaman pengelolaan novel
import UserManagement from "./pages/UserManagement"; // Mengimpor halaman pengelolaan user
import AdminComments from "./pages/AdminComments"; // Mengimpor halaman komentar admin
import AdminSettings from "./pages/AdminSettings"; // Mengimpor halaman pengaturan admin
import Login from "./pages/Login"; // Mengimpor halaman login
import ProtectedRoute from "./components/ProtectedRoute"; // Mengimpor ProtectedRoute untuk melindungi route yang memerlukan otentikasi
import "./index.css"; // Mengimpor file CSS untuk styling

// Membuat browser router dengan route dan sub-route
const router = createBrowserRouter([
  {
    path: "/", // Route utama (root) aplikasi
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ), // Melindungi aplikasi utama dengan ProtectedRoute, memastikan pengguna sudah login
    children: [
      {
        index: true, // Route untuk halaman utama (Home) saat path "/" diakses
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ), // Home hanya bisa diakses jika pengguna sudah login
      },
      { path: "about", element: <About /> }, // Route untuk halaman About tanpa perlindungan
      {
        path: "category/:category", // Route untuk halaman kategori berdasarkan parameter kategori
        element: (
          <ProtectedRoute>
            <Kategori />
          </ProtectedRoute>
        ), // Kategori dilindungi agar hanya bisa diakses oleh pengguna yang sudah login
      },
      {
        path: "kategori", // Route untuk halaman kategori
        element: (
          <ProtectedRoute>
            <Kategori />
          </ProtectedRoute>
        ), // Kategori dilindungi agar hanya bisa diakses oleh pengguna yang sudah login
      },
      {
        path: "pengelola", // Route untuk halaman Dashboard Admin
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ), // Dashboard admin dilindungi agar hanya bisa diakses oleh pengguna yang sudah login
      },
      {
        path: "pengelola/novels", // Route untuk halaman pengelolaan novel
        element: (
          <ProtectedRoute>
            <NovelManagement />
          </ProtectedRoute>
        ), // Pengelolaan novel dilindungi oleh ProtectedRoute
      },
      {
        path: "pengelola/users", // Route untuk halaman pengelolaan user
        element: (
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        ), // Pengelolaan user dilindungi oleh ProtectedRoute
      },
      {
        path: "pengelola/comments", // Route untuk halaman komentar admin
        element: (
          <ProtectedRoute>
            <AdminComments />
          </ProtectedRoute>
        ), // Halaman komentar admin dilindungi
      },
      {
        path: "pengelola/settings", // Route untuk halaman pengaturan admin
        element: (
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        ), // Pengaturan admin dilindungi oleh ProtectedRoute
      },
    ],
  },
  {
    path: "/login", // Route untuk halaman login
    element: <Login />, // Halaman login tanpa perlindungan
  },
]);

// Render aplikasi ke dalam elemen dengan id "root" di HTML
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Menyediakan context tema (dark/light mode) untuk seluruh aplikasi */}
    <ThemeProvider>
      {/* Menyediakan router untuk aplikasi, yang menentukan jalur yang akan dirender */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
