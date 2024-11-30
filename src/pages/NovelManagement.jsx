import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react'; // Ikon yang digunakan dalam aplikasi
import NovelModal from '../components/NovelModal'; // Modal untuk menambah atau mengedit novel
import { useNovelContext } from '../contexts/NovelContext'; // Hook untuk mengakses context yang berisi daftar novel

const NovelManagement = () => {
  // Mengambil data dan fungsi untuk mengelola novel dari context
  const { novelList, updateNovels, deleteNovel } = useNovelContext();
  
  // State untuk memilih novel yang sedang diedit, status modal, dan statistik novel
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({});

  // useEffect untuk menghitung statistik berdasarkan daftar novel setiap kali daftar novel berubah
  useEffect(() => {
    const calculateStats = () => {
      // Menghitung total dibaca (totalReads)
      const totalReads = novelList.reduce((sum, novel) => sum + parseInt(novel.Dibaca), 0);
      
      // Menghitung total komentar (totalComments)
      const totalComments = novelList.reduce((sum, novel) => sum + (novel.comments ? novel.comments.length : 0), 0);

      // Menyimpan statistik di state
      setStats({
        totalNovels: novelList.length,
        totalReads,
        totalComments,
      });
    };

    calculateStats(); // Panggil fungsi untuk menghitung statistik
  }, [novelList]);

  // Fungsi untuk menampilkan modal untuk menambah novel baru
  const handleAddNovel = () => {
    setSelectedNovel(null); // Mengatur novel yang dipilih menjadi null (novel baru)
    setIsModalOpen(true); // Menampilkan modal
  };

  // Fungsi untuk mengedit novel yang dipilih
  const handleEditNovel = (novel) => {
    setSelectedNovel(novel); // Menetapkan novel yang akan diedit
    setIsModalOpen(true); // Menampilkan modal
  };

  // Fungsi untuk menghapus novel berdasarkan id
  const handleDeleteNovel = (id) => {
    if (window.confirm('Are you sure you want to delete this novel?')) {
      deleteNovel(id); // Menghapus novel dari daftar
    }
  };

  // Fungsi untuk mengganti status featured novel
  const handleToggleFeatured = (id) => {
    const updatedNovels = novelList.map(novel => 
      novel.id === id ? { ...novel, featured: !novel.featured } : novel // Toggle featured status
    );
    updateNovels(updatedNovels); // Memperbarui daftar novel dengan status featured yang baru
  };

  // Fungsi untuk menyimpan novel baru atau yang telah diedit
  const handleSaveNovel = (novelData) => {
    if (selectedNovel) {
      // Jika novel sedang diedit, memperbarui novel yang ada
      const updatedNovels = novelList.map(novel => 
        novel.id === selectedNovel.id ? { ...novel, ...novelData } : novel
      );
      updateNovels(updatedNovels);
    } else {
      // Jika novel baru, menambahkannya ke dalam daftar
      updateNovels([...novelList, { ...novelData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false); // Menutup modal setelah menyimpan
  };

  return (
    <div className="novel-management">
      <h2>Novel Management</h2>

      {/* Menampilkan statistik novel */}
      <div className="stats-container">
        <div className="stat-item">
          <h3>Total Novels</h3>
          <p>{stats.totalNovels}</p> {/* Menampilkan jumlah total novel */}
        </div>
        <div className="stat-item">
          <h3>Total Reads</h3>
          <p>{stats.totalReads}</p> {/* Menampilkan total dibaca */}
        </div>
        <div className="stat-item">
          <h3>Total Comments</h3>
          <p>{stats.totalComments}</p> {/* Menampilkan total komentar */}
        </div>
      </div>

      {/* Tombol untuk menambah novel baru */}
      <button className="add-novel-btn" onClick={handleAddNovel}>
        <Plus size={20} /> Add New Novel
      </button>

      {/* Tabel untuk menampilkan daftar novel */}
      <table className="novel-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Read Count</th>
            <th>Comment Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {novelList.map(novel => (
            <tr key={novel.id}>
              <td><img src={novel.image} alt={novel.title} className="novel-cover" /></td>
              <td>{novel.title}</td>
              <td>{novel.category.join(', ')}</td> {/* Menampilkan genre novel */}
              <td>{novel.Dibaca || 0}</td> {/* Menampilkan jumlah dibaca */}
              <td>{novel.comments ? novel.comments.length : 0}</td> {/* Menampilkan jumlah komentar */}
              <td>
                {/* Tombol untuk mengedit, menghapus, dan toggle featured */}
                <button onClick={() => handleEditNovel(novel)} className="action-btn">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDeleteNovel(novel.id)} className="action-btn">
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => handleToggleFeatured(novel.id)} 
                  className="action-btn"
                >
                  <Star size={16} fill={novel.featured ? 'gold' : 'none'} /> {/* Mengubah status featured */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Menampilkan modal jika sedang dalam mode edit atau tambah novel */}
      {isModalOpen && (
        <NovelModal
          novel={selectedNovel} // Mengirimkan novel yang sedang diedit (atau null untuk novel baru)
          onSave={handleSaveNovel} // Fungsi untuk menyimpan novel
          onClose={() => setIsModalOpen(false)} // Menutup modal
        />
      )}
    </div>
  );
};

export default NovelManagement;
