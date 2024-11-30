// Komponen Footer yang digunakan untuk menampilkan bagian footer pada halaman
const Footer = () => {
  return (
    // Elemen <footer> yang membungkus seluruh konten footer
    <footer className="footer">
      <div className="footer-content">
        {/* Bagian pertama footer yang berisi informasi tentang NovelMe:v */}
        <div className="footer-section about">
          <h2>Tentang NovelMe:v</h2>{" "}
          {/* Judul untuk bagian 'Tentang NovelMe:v' */}
          <p>
            NovelMe:v adalah tempat di mana cerita indah bertemu pembaca setia.
            Kami menyediakan berbagai genre novel untuk menginspirasi dan
            menghibur Anda setiap saat.
          </p>
        </div>

        {/* Bagian kedua footer yang berisi informasi kontak */}
        <div className="footer-section contact">
          <h2>Kontak Kami</h2> {/* Judul untuk bagian 'Kontak Kami' */}
          <p>Email: support@novelme:v.com</p> {/* Alamat email untuk kontak */}
          <p>Telepon: +62 987- 456 - 321</p> {/* Nomor telepon untuk kontak */}
          <p>Alamat: Jl. Novel No. 20,Bandung</p>{" "}
          {/* Alamat fisik perusahaan */}
        </div>

        {/* Bagian ketiga footer yang berisi kata-kata inspiratif */}
        <div className="footer-section inspire">
          <h2>Kata-Kata Inspiratif</h2>{" "}
          {/* Judul untuk bagian 'Kata-Kata Inspiratif' */}
          <p>Setiap halaman membawa Anda lebih dekat ke dunia baru.</p>{" "}
          {/* Pesan inspiratif pertama */}
          <p> Baca, nikmati, dan temukan dirimu di dalam cerita. </p>{" "}
          {/* Pesan inspiratif kedua */}
          <p>Ada NovelMe:v yang selalu menemani mu</p>{" "}
          {/* Pesan inspiratif ketiga */}
        </div>
      </div>

      {/* Bagian bawah footer yang berisi informasi hak cipta */}
      <div className="footer-bottom">
        {/* Menampilkan teks hak cipta dengan tahun saat ini */}
        <p>© {new Date().getFullYear()} NovelMe:v. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

// Mengekspor komponen Footer agar bisa digunakan di bagian lain aplikasi
export default Footer;
