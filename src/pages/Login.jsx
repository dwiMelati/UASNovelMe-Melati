import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Untuk navigasi antar halaman
import { ChevronLeft, ChevronRight } from "lucide-react";  // Ikon panah kiri dan kanan untuk navigasi carousel
import novels from "../data/novels.jsx";  // Mengimpor data novel (gambar dan judul) untuk carousel

const Login = () => {
  const navigate = useNavigate();  // Hook untuk mengarahkan pengguna ke halaman lain setelah login
  const [username, setUsername] = useState("");  // State untuk menyimpan nilai input username
  const [password, setPassword] = useState("");  // State untuk menyimpan nilai input password
  const [currentIndex, setCurrentIndex] = useState(0);  // State untuk melacak indeks carousel
  const [errors, setErrors] = useState({ username: "", password: "" });  // State untuk menyimpan error validasi

  // Fungsi untuk navigasi ke slide berikutnya pada carousel
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % novels.length);  // Menambahkan indeks dan loop kembali jika sudah mencapai akhir
  };

  // Fungsi untuk navigasi ke slide sebelumnya pada carousel
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + novels.length) % novels.length  // Mengurangi indeks dan loop kembali ke akhir
    );
  };

  // Fungsi validasi untuk username
  const validateUsername = (value) => {
    if (/\d/.test(value)) {  // Memastikan username tidak mengandung angka
      return "Username tidak boleh mengandung angka.";
    }
    if (value.length < 5) {  // Memastikan username memiliki minimal 5 karakter
      return "Username harus memiliki minimal 5 karakter.";
    }
    return "";  // Tidak ada error
  };

  // Fungsi validasi untuk password
  const validatePassword = (value) => {
    if (!/^[A-Z]/.test(value)) {  // Memastikan password dimulai dengan huruf kapital
      return "Password harus dimulai dengan huruf kapital.";
    }
    if ((value.match(/\d/g) || []).length < 2) {  // Memastikan password mengandung minimal 2 angka
      return "Password harus mengandung minimal 2 angka.";
    }
    if (value.length < 8) {  // Memastikan password memiliki minimal 8 karakter
      return "Password harus memiliki minimal 8 karakter.";
    }
    return "";  // Tidak ada error
  };

  // Menangani perubahan input username dan menjalankan validasi
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);  // Memperbarui nilai username
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: validateUsername(value),  // Memperbarui error berdasarkan validasi
    }));
  };

  // Menangani perubahan input password dan menjalankan validasi
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);  // Memperbarui nilai password
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value),  // Memperbarui error berdasarkan validasi
    }));
  };

  // Menangani proses login saat form disubmit
  const handleLogin = (e) => {
    e.preventDefault();  // Mencegah form untuk refresh halaman

    const usernameError = validateUsername(username);  // Validasi username
    const passwordError = validatePassword(password);  // Validasi password

    if (!usernameError && !passwordError) {  // Jika tidak ada error
      if (username === "dwimelati" && password === "Sikumbang22") {  // Cek kredensial
        localStorage.setItem("isLoggedIn", "true");  // Menyimpan status login di localStorage
        navigate("/");  // Navigasi ke halaman utama setelah login berhasil
      } else {
        alert("Username atau password salah");  // Pesan kesalahan jika kredensial salah
      }
    } else {
      setErrors({ username: usernameError, password: passwordError });  // Menampilkan error validasi jika ada
    }
  };

  return (
    <div className="login-page">
      {/* CSS untuk styling halaman */}
      <style jsx>{`
        .login-page { /* Gaya untuk halaman login secara keseluruhan */}
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
        .login-container { /* Gaya untuk wadah login dan carousel */}
          display: flex;
          background-color: #ffffff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 1000px;
          width: 100%;
        }
        .form-container { /* Gaya untuk form login */
          flex: 1;
          padding: 3rem;
        }
        .form-title { /* Gaya untuk judul form */
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
        }
        .login-form { /* Gaya untuk form login */
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group { /* Gaya untuk setiap grup input */
          display: flex;
          flex-direction: column;
        }
        .form-label { /* Gaya untuk label input */
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .form-input { /* Gaya untuk input field */
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .login-button { /* Gaya untuk tombol login */
          background: linear-gradient(to right, #667eea, #764ba2);
          color: #fff;
          border: none;
          padding: 1rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .carousel-container { /* Gaya untuk wadah carousel novel */
          flex: 1;
          background-color: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .carousel-3d { /* Gaya untuk efek 3D carousel */
          perspective: 1000px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .carousel-item { /* Gaya untuk setiap item carousel */
          position: absolute;
          transition: all 0.5s ease;
          width: 200px;
        }
        .novel-cover { /* Gaya untuk gambar sampul novel */
          width: 100%;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .carousel-button { /* Gaya untuk tombol navigasi carousel */
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .carousel-button.prev { /* Gaya tombol kiri carousel */
          left: 1rem;
        }
        .carousel-button.next { /* Gaya tombol kanan carousel */
          right: 1rem;
        }
      `}</style>

      <div className="login-container">
        {/* Form Login */}
        <div className="form-container">
          <h2 className="form-title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="form-input"
                placeholder="Enter your username"
                required
              />
              {errors.username && <p className="error-message">{errors.username}</p>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>
        </div>

        {/* Carousel */}
        <div className="carousel-container">
          <div className="carousel-3d">
            {/* Menampilkan novel berdasarkan indeks dan gaya 3D */}
            {novels.map((novel, index) => {
              const offset =
                (index - currentIndex + novels.length) % novels.length;
              if (offset > 2 && offset < novels.length - 2) return null;

              let style = {
                transform: "translateX(0) scale(0.7)",
                opacity: 0,
                zIndex: 0,
              };

              if (offset === 0) {
                style.transform = "translateX(0) scale(1)";
                style.opacity = 1;
                style.zIndex = 3;
              } else if (offset === 1) {
                style.transform = "translateX(50%) scale(0.8)";
                style.opacity = 0.7;
                style.zIndex = 2;
              } else if (offset === novels.length - 1) {
                style.transform = "translateX(-50%) scale(0.8)";
                style.opacity = 0.7;
                style.zIndex = 2;
              }

              return (
                <div key={novel.id} className="carousel-item" style={style}>
                  <img src={novel.image} alt={novel.title} className="novel-cover" />
                  <h3 className="novel-title">{novel.title}</h3>
                </div>
              );
            })}
          </div>

          {/* Tombol navigasi carousel */}
          <button className="carousel-button prev" onClick={prevSlide}>
            <ChevronLeft className="carousel-icon" />
          </button>
          <button className="carousel-button next" onClick={nextSlide}>
            <ChevronRight className="carousel-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
