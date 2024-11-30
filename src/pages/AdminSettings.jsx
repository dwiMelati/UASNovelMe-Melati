// Mengimpor hook 'useState' dari React dan komponen 'Save' dari lucide-react untuk ikon simpan
import { useState } from 'react';
import { Save } from 'lucide-react';

// Komponen AdminSettings untuk mengelola pengaturan admin
const AdminSettings = () => {
  // State untuk menyimpan pengaturan yang ada, dengan nilai default yang telah ditentukan
  const [settings, setSettings] = useState({
    siteName: 'NovelMe', // Nama situs
    siteDescription: 'Your favorite web novel platform', // Deskripsi situs
    logo: '/path/to/logo.png', // URL logo situs
    favicon: '/path/to/favicon.ico', // URL favicon situs
    theme: 'light', // Tema situs (light atau dark)
    adminNotifications: true, // Pengaturan untuk notifikasi admin
    userNotifications: true, // Pengaturan untuk notifikasi pengguna
    paymentGateway: 'stripe', // Gateway pembayaran yang digunakan
    adminEmails: 'admin@novelme.com', // Alamat email admin
    twoFactorAuth: false, // Pengaturan autentikasi dua faktor
  });

  // Fungsi untuk menangani perubahan input pada form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value // Menangani perubahan untuk input checkbox dan non-checkbox
    }));
  };

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah form dari pengiriman default
    // Biasanya di sini kita akan mengirim data pengaturan ke backend
    console.log('Settings saved:', settings); // Menampilkan pengaturan yang telah disimpan di konsol
    alert('Settings saved successfully!'); // Menampilkan pesan berhasil menyimpan pengaturan
  };

  return (
    <div className="admin-settings">
      <h2>Admin Settings</h2> {/* Judul halaman pengaturan admin */}
      <form onSubmit={handleSubmit}>
        {/* Bagian pengaturan umum */}
        <div className="settings-section">
          <h3>General Settings</h3>
          
          {/* Form input untuk Nama Situs */}
          <div className="form-group">
            <label htmlFor="siteName">Site Name:</label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName} // Menampilkan nilai siteName dari state
              onChange={handleChange} // Memanggil handleChange ketika input berubah
            />
          </div>
          
          {/* Form input untuk Deskripsi Situs */}
          <div className="form-group">
            <label htmlFor="siteDescription">Site Description:</label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription} // Menampilkan nilai siteDescription dari state
              onChange={handleChange} // Memanggil handleChange ketika input berubah
            />
          </div>
          
          {/* Form input untuk URL Logo */}
          <div className="form-group">
            <label htmlFor="logo">Logo URL:</label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={settings.logo} // Menampilkan nilai logo dari state
              onChange={handleChange} // Memanggil handleChange ketika input berubah
            />
          </div>
          
          {/* Form input untuk URL Favicon */}
          <div className="form-group">
            <label htmlFor="favicon">Favicon URL:</label>
            <input
              type="text"
              id="favicon"
              name="favicon"
              value={settings.favicon} // Menampilkan nilai favicon dari state
              onChange={handleChange} // Memanggil handleChange ketika input berubah
            />
          </div>
          
          {/* Form dropdown untuk memilih Tema */}
          <div className="form-group">
            <label htmlFor="theme">Theme:</label>
            <select
              id="theme"
              name="theme"
              value={settings.theme} // Menampilkan nilai theme dari state
              onChange={handleChange} // Memanggil handleChange ketika input berubah
            >
              <option value="light">Light</option> {/* Opsi tema light */}
              <option value="dark">Dark</option> {/* Opsi tema dark */}
            </select>
          </div>
        </div>

        {/* Bagian pengaturan notifikasi */}
        <div className="settings-section">
          <h3>Notification Settings</h3>
          
          {/* Checkbox untuk notifikasi admin */}
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="adminNotifications"
                checked={settings.adminNotifications} // Menampilkan nilai adminNotifications dari state
                onChange={handleChange} // Memanggil handleChange ketika input berubah
              />
              Enable Admin Notifications
            </label>
          </div>
          
          {/* Checkbox untuk notifikasi pengguna */}
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="userNotifications"
                checked={settings.userNotifications} // Menampilkan nilai userNotifications dari state
                onChange={handleChange} // Memanggil handleChange ketika input berubah
              />
              Enable User Notifications
            </label>
          </div>
        </div>

        {/* Bagian pengaturan pembayaran */}
        <div className="settings-section">
          <h3>Payment Settings</h3>
          
          {/* Dropdown untuk memilih gateway pembayaran */}
          <div className="form-group">
            <label htmlFor="paymentGateway">Payment Gateway:</label>
            <select
              id="paymentGateway"
              name="paymentGateway"
              value={settings.paymentGateway} // Menampilkan nilai paymentGateway dari state
              onChange={handleChange} // Memanggil handleChange ketika input berubah
            >
              <option value="stripe">Stripe</option> {/* Opsi Stripe */}
              <option value="paypal">PayPal</option> {/* Opsi PayPal */}
            </select>
          </div>
        </div>

        {/* Bagian pengaturan keamanan */}
        <div className="settings-section">
          <h3>Security Settings</h3>
          
          {/* Form input untuk memasukkan alamat email admin */}
          <div className="form-group">
            <label htmlFor="adminEmails">Admin Email Addresses:</label>
            <input
              type="text"
              id="adminEmails"
              name="adminEmails"
              value={settings.adminEmails} // Menampilkan nilai adminEmails dari state
              onChange={handleChange} // Memanggil handleChange ketika input berubah
            />
          </div>
          
          {/* Checkbox untuk mengaktifkan autentikasi dua faktor */}
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={settings.twoFactorAuth} // Menampilkan nilai twoFactorAuth dari state
                onChange={handleChange} // Memanggil handleChange ketika input berubah
              />
              Enable Two-Factor Authentication
            </label>
          </div>
        </div>

        {/* Tombol untuk menyimpan pengaturan */}
        <button type="submit" className="save-settings-btn">
          <Save size={16} /> {/* Ikon Save dari lucide-react */}
          Save Settings {/* Teks pada tombol */}
        </button>
      </form>
    </div>
  );
};

// Mengekspor komponen AdminSettings agar bisa digunakan di bagian lain dari aplikasi
export default AdminSettings;