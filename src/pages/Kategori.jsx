import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Book, Heart, MessageSquare, Search } from 'lucide-react';  // Import icon untuk interaksi
import { useTheme } from "../contexts/ThemeContext";  // Untuk mendapatkan mode tema (dark/light)
import { getStorageItem, setStorageItem } from '../utils/storage';  // Utility untuk mengambil dan menyimpan data ke storage

const NovelList = () => {
  const { category } = useParams();  // Mengambil kategori dari URL params
  const { selectedCategory, novels } = useOutletContext();  // Mengambil data kategori terpilih dan daftar novel dari outlet context
  const [localNovels, setLocalNovels] = useState([]);  // State untuk menyimpan daftar novel lokal
  const [filteredNovels, setFilteredNovels] = useState([]);  // State untuk menyimpan daftar novel yang difilter
  const [searchTerm, setSearchTerm] = useState('');  // State untuk kata pencarian
  const [sortOrder, setSortOrder] = useState('asc');  // State untuk pengurutan novel (A-Z atau Z-A)
  const [currentPage, setCurrentPage] = useState(1);  // State untuk halaman saat ini dalam pagination
  const { isDarkMode } = useTheme();  // Mendapatkan informasi tentang tema (dark atau light)
  const novelsPerPage = 6;  // Jumlah novel yang ditampilkan per halaman
  
  const [selectedNovel, setSelectedNovel] = useState(null);  // State untuk novel yang dipilih
  const [showNovelContent, setShowNovelContent] = useState(false);  // State untuk menampilkan konten novel
  const [showCommentModal, setShowCommentModal] = useState(false);  // State untuk menampilkan modal komentar

  // Efek samping untuk reset halaman saat kategori berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Efek samping untuk mengambil data novel dari storage atau dari context jika tidak ada
  useEffect(() => {
    const storedNovels = getStorageItem('novels') || novels;
    setLocalNovels(storedNovels);
  }, [novels]);

  // Efek samping untuk memfilter dan mengurutkan novel berdasarkan pencarian, kategori, dan urutan
  useEffect(() => {
    let filtered = [...localNovels];

    if (category) {
      filtered = filtered.filter((novel) =>
        novel.category.some(
          (cat) => cat.toLowerCase() === category.toLowerCase()
        )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((novel) =>
        novel.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setFilteredNovels(filtered);
    setCurrentPage(1);  // Reset halaman ke 1 setelah ada perubahan filter
  }, [category, searchTerm, sortOrder, localNovels]);

  // Fungsi untuk memperbarui data novel dan menyimpannya ke storage
  const updateNovelData = (updatedNovels) => {
    setLocalNovels(updatedNovels);
    setStorageItem('novels', updatedNovels);  // Menyimpan novel yang diperbarui ke storage
  };

  // Fungsi untuk menangani saat novel dibaca
  const handleReadNovel = (novel) => {
    setSelectedNovel(novel);
    setShowNovelContent(true);  // Menampilkan konten novel
    
    const updatedNovels = localNovels.map((n) => {
      if (n.id === novel.id) {
        return { ...n, Dibaca: (n.Dibaca || 0) + 1 };  // Meningkatkan jumlah "dibaca"
      }
      return n;
    });

    updateNovelData(updatedNovels);
  };

  // Fungsi untuk menangani tindakan suka (love) pada novel
  const handleLove = (novelId) => {
    const updatedNovels = localNovels.map((novel) => {
      if (novel.id === novelId) {
        return { ...novel, loved: !novel.loved };  // Toggle status 'loved' pada novel
      }
      return novel;
    });

    updateNovelData(updatedNovels);
    const lovedNovel = updatedNovels.find((novel) => novel.id === novelId);
    const message = lovedNovel.loved ? 'Kamu menyukai novel ini!' : 'Kamu menghapus suka dari novel ini.';
    alert(message);  // Menampilkan pesan sesuai dengan status love
  };

  // Fungsi untuk menangani komentar pada novel
  const handleComment = (novel) => {
    setSelectedNovel(novel);
    setShowCommentModal(true);  // Menampilkan modal untuk menulis komentar
  };

  // Fungsi untuk menambahkan komentar pada novel
  const addComment = (novelId, comment) => {
    const updatedNovels = localNovels.map((novel) => {
      if (novel.id === novelId) {
        const newComments = [...(novel.comments || []), { 
          ...comment, 
          id: Date.now(),  // Menggunakan timestamp sebagai ID komentar
          approved: false
        }];
        return { 
          ...novel, 
          comments: newComments,
          commentCount: newComments.length
        };
      }
      return novel;
    });

    updateNovelData(updatedNovels);
    alert('Terima kasih sudah berkomentar!');
  };

  return (
    <div className={`kategori-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Menampilkan judul kategori novel */}
      <h2 className="daftar">Novel {category ? `- ${decodeURIComponent(category)}` : selectedCategory ? `- ${selectedCategory}` : ''}</h2>

      {/* Bagian pencarian dan pengurutan */}
      <div className="search-sort-container">
        <div className="search-container">
          <Search className={`search-icon ${isDarkMode ? 'dark-mode' : 'light-mode'}`} size={20} />
          <input
            type="text"
            placeholder="Cari novel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // Memperbarui kata pencarian
            className={`search-input ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
          />
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}  // Memperbarui urutan novel
          className={`sort-select ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {/* Menampilkan daftar novel yang difilter */}
      <div className={`novel-grid ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        {filteredNovels.length > 0 ? (
          filteredNovels
            .slice((currentPage - 1) * novelsPerPage, currentPage * novelsPerPage)  // Pagination
            .map((novel) => (
              <div key={novel.id} className={`novel-card ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <img src={novel.image} alt={novel.title} className="novel-image" />
                <h3>{novel.title}</h3>
                <div className="novel-categories">
                  {novel.category && novel.category.map((cat, index) => (
                    <span key={index} className={`category-tag ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                      {cat}
                    </span>
                  ))}
                </div>
                <div className="novel-icons">
                  <div className="icon-group" onClick={() => handleReadNovel(novel)}>
                    <Book className={`icon book-icon ${isDarkMode ? 'dark-mode' : 'light-mode'}`} size={20} />
                    <span>{novel.Dibaca || 0}</span>
                  </div>
                  <div className="icon-group">
                    <Heart
                      className={`icon heart-icon ${novel.loved ? 'loved' : ''} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
                      size={20}
                      onClick={() => handleLove(novel.id)}  // Menangani klik love
                      fill={novel.loved ? 'red' : 'none'}
                    />
                  </div>
                  <div className="icon-group" onClick={() => handleComment(novel)}>
                    <MessageSquare className={`icon comment-icon ${isDarkMode ? 'dark-mode' : 'light-mode'}`} size={20} />
                    <span>{novel.commentCount || 0}</span>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className={`no-novels ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>Tidak ada novel yang tersedia di kategori ini.</p>
        )}
      </div>

      {/* Pagination */}
      {filteredNovels.length > novelsPerPage && (
        <div className={`pagination ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          {Array.from({ length: Math.ceil(filteredNovels.length / novelsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}  // Navigasi antar halaman
              className={`${currentPage === index + 1 ? 'active' : ''} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal untuk menambahkan komentar */}
      {showCommentModal && (
        <CommentModal
          novel={selectedNovel}
          onClose={() => setShowCommentModal(false)}  // Menutup modal komentar
          onAddComment={addComment}  // Menambahkan komentar
          isDarkMode={isDarkMode}
        />
      )}

      {/* Modal untuk menampilkan konten novel */}
      {showNovelContent && (
        <NovelContentModal
          novel={selectedNovel}
          onClose={() => setShowNovelContent(false)}  // Menutup modal konten novel
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

const CommentModal = ({ novel, onClose, onAddComment, isDarkMode }) => {
  const [comment, setComment] = useState("");  // State untuk menulis komentar

  const handleSubmit = () => {
    if (comment.trim()) {
      onAddComment(novel.id, {
        text: comment,
        author: "Anonymous",  // Nama pengomentar
        date: new Date().toISOString(),  // Tanggal komentar
      });
      setComment("");  // Reset textarea
      onClose();  // Menutup modal setelah komentar ditambahkan
    }
  };

  return (
    <div className={`modal ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className={`modal-content ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <h3>Komentar untuk {novel.title}</h3>
        <div className={`comments-list ${isDarkMode ? "dark-mode" : "light-mode"}`}>
          {novel.comments &&
            novel.comments.map((comment, index) => (
              <div key={index} className={`comment ${isDarkMode ? "dark-mode" : "light-mode"}`}>
                <p>{comment.text}</p>
                <small>
                  {comment.author} - {new Date(comment.date).toLocaleDateString()}
                </small>
              </div>
            ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}  // Menulis komentar
          placeholder="Tulis komentar Anda di sini..."
          className={isDarkMode ? "dark-mode" : "light-mode"}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit} className={isDarkMode ? "dark-mode" : "light-mode"}>Kirim</button>
          <button onClick={onClose} className={isDarkMode ? "dark-mode" : "light-mode"}>Tutup</button>
        </div>
      </div>
    </div>
  );
};

const NovelContentModal = ({ novel, onClose, isDarkMode }) => {
  return (
    <div className={`modal ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className={`modal-content novel-content-modal ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <h3>{novel.title}</h3>
        <div className={`novel-content ${isDarkMode ? "dark-mode" : "light-mode"}`}>
          <p>{novel.Isi}</p>  {/* Menampilkan konten novel */}
        </div>
        <button onClick={onClose} className={isDarkMode ? "dark-mode" : "light-mode"}>Tutup</button>
      </div>
    </div>
  );
};

export default NovelList;