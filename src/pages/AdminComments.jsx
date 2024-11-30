// Import hook yang dibutuhkan dari React, ikon dari lucide-react, dan utilitas lainnya
import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, MessageCircle, Search } from 'lucide-react';
import { getStorageItem, setStorageItem } from '../utils/storage'; // Untuk mengakses dan menyimpan data di localStorage
import { useTheme } from "../contexts/ThemeContext.jsx"; // Menggunakan context untuk tema aplikasi

// Komponen utama untuk mengelola komentar di dashboard admin
const AdminComments = () => {
  // State untuk menyimpan komentar, komentar yang sudah difilter, dan filter yang diterapkan
  const [comments, setComments] = useState([]); // Semua komentar
  const [filteredComments, setFilteredComments] = useState([]); // Komentar yang sudah difilter
  const [filterNovel, setFilterNovel] = useState(''); // Filter berdasarkan judul novel
  const [filterUser, setFilterUser] = useState(''); // Filter berdasarkan nama pengguna
  const [stats, setStats] = useState({}); // Statistik komentar
  const { isDarkMode } = useTheme(); // Mengambil status tema (dark mode atau tidak)

  // Hook useEffect untuk memuat komentar saat pertama kali komponen ini dimuat
  useEffect(() => {
    loadComments(); // Memanggil fungsi untuk memuat komentar
  }, []);

  // Fungsi untuk memuat komentar dari localStorage
  const loadComments = () => {
    // Mendapatkan data novel dari localStorage
    const novels = getStorageItem('novels') || [];
    
    // Mengambil semua komentar dari setiap novel
    const allComments = novels.flatMap(novel => 
      (novel.comments || []).map(comment => ({
        ...comment, // Menyalin data komentar
        novelId: novel.id, // Menambahkan id novel ke komentar
        novelTitle: novel.title // Menambahkan judul novel ke komentar
      }))
    );
    
    setComments(allComments); // Menyimpan komentar yang sudah dikumpulkan
  };

  // Hook useEffect untuk menghitung statistik komentar dan menerapkan filter berdasarkan input
  useEffect(() => {
    // Menghitung jumlah komentar yang disetujui dan yang belum disetujui
    const approvedComments = comments.filter(comment => comment.approved);
    setStats({
      totalComments: comments.length, // Total komentar
      approvedComments: approvedComments.length, // Jumlah komentar yang disetujui
      pendingComments: comments.length - approvedComments.length, // Jumlah komentar yang menunggu persetujuan
    });

    // Menerapkan filter pada komentar berdasarkan novel dan pengguna
    setFilteredComments(comments.filter(comment => 
      comment.novelTitle.toLowerCase().includes(filterNovel.toLowerCase()) &&
      comment.author.toLowerCase().includes(filterUser.toLowerCase())
    ));
  }, [comments, filterNovel, filterUser]); // Mengupdate ketika komentar, filterNovel, atau filterUser berubah

  // Fungsi untuk menyetujui komentar
  const handleApprove = (commentId) => {
    // Mendapatkan data novel dari localStorage
    const novels = getStorageItem('novels') || [];
    
    // Memperbarui status persetujuan komentar pada novel terkait
    const updatedNovels = novels.map(novel => ({
      ...novel,
      comments: (novel.comments || []).map(comment => 
        comment.id === commentId ? { ...comment, approved: true } : comment // Menandai komentar sebagai disetujui
      )
    }));
    
    // Menyimpan data yang telah diperbarui ke localStorage
    setStorageItem('novels', updatedNovels);
    
    // Memuat ulang komentar setelah persetujuan
    loadComments();
  };

  // Fungsi untuk menghapus komentar
  const handleDelete = (commentId) => {
    // Konfirmasi sebelum menghapus komentar
    if (window.confirm('Are you sure you want to delete this comment?')) {
      // Mendapatkan data novel dari localStorage
      const novels = getStorageItem('novels') || [];
      
      // Memperbarui data novel setelah menghapus komentar terkait
      const updatedNovels = novels.map(novel => ({
        ...novel,
        comments: (novel.comments || []).filter(comment => comment.id !== commentId), // Menghapus komentar berdasarkan id
        commentCount: (novel.comments || []).filter(comment => comment.id !== commentId).length // Memperbarui jumlah komentar
      }));
      
      // Menyimpan data yang telah diperbarui ke localStorage
      setStorageItem('novels', updatedNovels);
      
      // Memuat ulang komentar setelah penghapusan
      loadComments();
    }
  };

  // Menampilkan UI untuk mengelola komentar
  return (
    <div className={`admin-comments ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <h2>Comments & Reviews Management</h2> {/* Judul halaman */}
      
      {/* Menampilkan statistik komentar */}
      <div className="stats-container">
        <div className="stat-item">
          <h3>Total Comments</h3>
          <p>{stats.totalComments}</p> {/* Menampilkan jumlah komentar */}
        </div>
        <div className="stat-item">
          <h3>Approved Comments</h3>
          <p>{stats.approvedComments}</p> {/* Menampilkan jumlah komentar yang disetujui */}
        </div>
        <div className="stat-item">
          <h3>Pending Comments</h3>
          <p>{stats.pendingComments}</p> {/* Menampilkan jumlah komentar yang menunggu persetujuan */}
        </div>
      </div>
      
      {/* Filter untuk mencari komentar berdasarkan novel atau pengguna */}
      <div className="filters">
        <div className="filter-item">
          <label htmlFor="filterNovel">Filter by Novel:</label>
          <div className="search-container">
            <input
              type="text"
              id="filterNovel"
              value={filterNovel}
              onChange={(e) => setFilterNovel(e.target.value)} // Mengubah filter berdasarkan judul novel
              placeholder="Enter novel title"
              className={isDarkMode ? "dark-mode" : "light-mode"} // Menyesuaikan tema
            />
            <Search size={20} className={isDarkMode ? "dark-mode" : "light-mode"} /> {/* Ikon pencarian */}
          </div>
        </div>
        <div className="filter-item">
          <label htmlFor="filterUser">Filter by User:</label>
          <div className="search-container">
            <input
              type="text"
              id="filterUser"
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)} // Mengubah filter berdasarkan nama pengguna
              placeholder="Enter username"
              className={isDarkMode ? "dark-mode" : "light-mode"} // Menyesuaikan tema
            />
            <Search size={20} className={isDarkMode ? "dark-mode" : "light-mode"} /> {/* Ikon pencarian */}
          </div>
        </div>
      </div>

      {/* Tabel untuk menampilkan komentar yang telah difilter */}
      <table className={`comments-table ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <thead>
          <tr>
            <th>Novel</th> {/* Kolom untuk menampilkan judul novel */}
            <th>User</th> {/* Kolom untuk menampilkan nama pengguna */}
            <th>Comment</th> {/* Kolom untuk menampilkan teks komentar */}
            <th>Date</th> {/* Kolom untuk menampilkan tanggal komentar */}
            <th>Status</th> {/* Kolom untuk menampilkan status komentar */}
            <th>Actions</th> {/* Kolom untuk menampilkan tombol tindakan */}
          </tr>
        </thead>
        <tbody>
          {/* Mengiterasi dan menampilkan komentar yang sudah difilter */}
          {filteredComments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.novelTitle}</td> {/* Menampilkan judul novel */}
              <td>{comment.author}</td> {/* Menampilkan nama pengguna */}
              <td>{comment.text}</td> {/* Menampilkan teks komentar */}
              <td>{new Date(comment.date).toLocaleDateString()}</td> {/* Menampilkan tanggal komentar */}
              <td>{comment.approved ? 'Approved' : 'Pending'}</td> {/* Menampilkan status komentar */}
              <td>
                {/* Tombol untuk menyetujui komentar, hanya ditampilkan jika komentar belum disetujui */}
                {!comment.approved && (
                  <button onClick={() => handleApprove(comment.id)} title="Approve" className={isDarkMode ? "dark-mode" : "light-mode"}>
                    <CheckCircle size={16} />
                  </button>
                )}
                {/* Tombol untuk menghapus komentar */}
                <button onClick={() => handleDelete(comment.id)} title="Delete" className={isDarkMode ? "dark-mode" : "light-mode"}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Mengekspor komponen AdminComments untuk digunakan di tempat lain
export default AdminComments;
