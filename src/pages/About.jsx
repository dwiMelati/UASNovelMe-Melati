// Mendefinisikan komponen fungsional About yang akan menampilkan informasi tentang platform
const About = () => {
  return (
    // Div utama dengan kelas 'about-container' untuk membungkus seluruh konten
    <div className="about-container">
      {/* Judul halaman tentang kami */}
      <h1 className="about-title">About Us</h1>
      
      {/* Div untuk konten utama yang dibagi menjadi gambar dan teks */}
      <div className="about-content">
        
        {/* Div untuk menampilkan gambar tentang kami */}
        <div className="about-image">
          {/* Gambar yang akan ditampilkan, dengan atribut src untuk menentukan lokasi gambar */}
          {/* Gambar ini berlokasi di folder 'public/images' */}
          <img src="public/images/a (65).jpeg?height=200&width=250" alt="About Us" />
        </div>

        {/* Div untuk menampilkan teks deskripsi tentang platform */}
        <div className="about-text">
          {/* Paragraf pertama yang menjelaskan tentang misi platform */}
          <p>
            Selamat datang di platform novel daring kami! Kami bersemangat
            menghadirkan kisah-kisah terbaik bagi para pembaca kami. Tim pecinta
            buku, kami yang berdedikasi menyusun koleksi novel yang beragam dari
            berbagai genre untuk memenuhi selera setiap pembaca.
          </p>
          
          {/* Paragraf kedua yang menjelaskan misi lebih lanjut, termasuk alasan berdirinya platform */}
          <p>
            Didirikan pada projekan UAS React , misi kami adalah membuat
            kegiatan membaca menjadi mudah diakses dan menyenangkan bagi semua
            orang. Kami percaya pada kekuatan cerita untuk menginspirasi,
            mendidik, dan menghibur. Baik Anda penggemar romansa, misteri, fiksi
            ilmiah, atau fiksi sastra, kami punya sesuatu untuk anda.
          </p>
          
          {/* Paragraf ketiga yang menjelaskan fitur komunitas dan pembaruan platform */}
          <p>
            Platform kami tidak hanya menawarkan berbagai pilihan novel, tetapi
            juga menyediakan komunitas bagi para penggemar buku untuk saling
            terhubung, berbagi rekomendasi, dan mendiskusikan bacaan favorit
            mereka. Kami terus memperbarui koleksi kami dan meningkatkan layanan
            kami untuk meningkatkan pengalaman membaca Anda.
          </p>
        </div>
      </div>

      {/* Div untuk fitur-fitur unggulan yang dimiliki oleh platform */}
      <div className="about-features">
        {/* Judul untuk bagian fitur unggulan */}
        <h2>Mengapa Memilih Kami?</h2>
        
        {/* Daftar fitur-fitur utama platform */}
        <ul>
          {/* Item pertama fitur yang menunjukkan kualitas pilihan novel */}
          <li>Pilihan novel berkualitas tinggi yang dikurasi</li>
          
          {/* Item kedua fitur yang menunjukkan kemudahan antarmuka */}
          <li>Antarmuka yang ramah pengguna untuk navigasi yang mudah</li>
          
          {/* Item ketiga fitur yang menunjukkan pembaruan rutin pada koleksi novel */}
          <li>Pembaruan rutin dengan rilis baru dan favorit klasik</li>
          
          {/* Item keempat fitur yang menunjukkan komunitas untuk penggemar buku */}
          <li>Fitur komunitas untuk pecinta buku agar dapat terhubung</li>
          
          {/* Item kelima fitur yang menunjukkan rekomendasi novel yang dipersonalisasi */}
          <li>
            Rekomendasi yang dipersonalisasi berdasarkan preferensi bacaan Anda
          </li>
        </ul>
      </div>
    </div>
  );
};

// Mengekspor komponen About agar bisa digunakan di bagian lain aplikasi
export default About;