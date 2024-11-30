import { useState, useEffect } from 'react'; // Mengimpor hook useState dan useEffect dari React

// Komponen NovelModal menerima 3 properti: novel, onSave, dan onClose
const NovelModal = ({ novel, onSave, onClose }) => {
  // Inisialisasi state formData untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    title: '', // Judul novel
    author: '', // Penulis novel
    description: '', // Deskripsi novel
    category: [], // Kategori novel (sebagai array)
    image: '', // URL gambar novel
    Isi: '', // Konten novel
    Dibaca: '0', // Jumlah pembaca novel
    Bahasa: '', // Bahasa novel
    Halaman: 0, // Jumlah halaman novel
  });

  // Menggunakan useEffect untuk memperbarui formData ketika prop 'novel' berubah
  useEffect(() => {
    if (novel) {
      // Jika ada data novel, setFormData dengan nilai-nilai dari novel
      setFormData({
        title: novel.title || '', // Menggunakan nilai title dari novel atau default ''
        author: novel.author || '', // Menggunakan nilai author dari novel atau default ''
        description: novel.description || '', // Menggunakan nilai description dari novel atau default ''
        category: novel.category || [], // Menggunakan nilai category dari novel atau default []
        image: novel.image || '', // Menggunakan nilai image dari novel atau default ''
        Isi: novel.Isi || '', // Menggunakan nilai Isi dari novel atau default ''
        Dibaca: novel.Dibaca || '0', // Menggunakan nilai Dibaca dari novel atau default '0'
        Bahasa: novel.Bahasa || '', // Menggunakan nilai Bahasa dari novel atau default ''
        Halaman: novel.Halaman || 0, // Menggunakan nilai Halaman dari novel atau default 0
      });
    }
  }, [novel]); // Hook ini hanya akan dijalankan saat properti 'novel' berubah

  // Fungsi untuk menangani perubahan nilai input pada form
  const handleChange = (e) => {
    const { name, value } = e.target; // Mengambil nama dan nilai dari elemen input yang berubah
    if (name === 'category') {
      // Jika input adalah 'category', pisahkan nilai dengan koma dan trim setiap item
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(item => item.trim())
      }));
    } else if (name === 'Halaman') {
      // Jika input adalah 'Halaman', ubah nilai menjadi integer
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0 // Jika tidak bisa diubah menjadi integer, set ke 0
      }));
    } else {
      // Untuk input lainnya, langsung set nilai dari formData
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah pengiriman form secara default (refresh halaman)
    onSave(formData); // Panggil fungsi onSave dengan data form yang sudah diubah
  };

  // JSX untuk render modal
  return (
    <div className="modal-overlay"> {/* Overlay untuk menutupi halaman */}
      <div className="modal"> {/* Modal itu sendiri */}
        <div className="modal-content"> {/* Konten dari modal */}
          {/* Judul modal yang berubah tergantung apakah novel ada atau tidak */}
          <h2>{novel ? 'Edit Novel' : 'Tambah Novel Baru'}</h2> 
          <form onSubmit={handleSubmit}> {/* Formulir untuk mengirim data novel */}
            {/* Input untuk Judul */}
            <div className="form-group">
              <label htmlFor="title">Judul:</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
            </div>
            {/* Input untuk Penulis */}
            <div className="form-group">
              <label htmlFor="author">Penulis:</label>
              <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
            </div>
            {/* Input untuk Deskripsi */}
            <div className="form-group">
              <label htmlFor="description">Deskripsi:</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            {/* Input untuk Kategori */}
            <div className="form-group">
              <label htmlFor="category">Kategori (pisahkan dengan koma):</label>
              <input type="text" id="category" name="category" value={formData.category.join(', ')} onChange={handleChange} />
            </div>
            {/* Input untuk URL Gambar */}
            <div className="form-group">
              <label htmlFor="image">URL Gambar:</label>
              <input type="url" id="image" name="image" value={formData.image} onChange={handleChange} />
            </div>
            {/* Input untuk Konten */}
            <div className="form-group">
              <label htmlFor="Isi">Konten:</label>
              <textarea id="Isi" name="Isi" value={formData.Isi} onChange={handleChange} rows="10" />
            </div>
            {/* Input untuk Bahasa */}
            <div className="form-group">
              <label htmlFor="Bahasa">Bahasa:</label>
              <input type="text" id="Bahasa" name="Bahasa" value={formData.Bahasa} onChange={handleChange} />
            </div>
            {/* Input untuk Halaman */}
            <div className="form-group">
              <label htmlFor="Halaman">Halaman:</label>
              <input type="number" id="Halaman" name="Halaman" value={formData.Halaman} onChange={handleChange} min="0" />
            </div>
            {/* Tombol untuk simpan dan batal */}
            <div className="modal-buttons">
              <button type="submit" className="save-button"> Simpan </button>
              <button type="button" onClick={onClose} className="cancel-button"> Batal </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Mengekspor komponen NovelModal untuk digunakan di file lain
export default NovelModal;