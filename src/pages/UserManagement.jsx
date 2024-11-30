import { useState, useEffect } from 'react';
import { User, UserCheck, UserX, Edit, Trash2 } from 'lucide-react';

// Dummy data untuk pengguna (ganti dengan data dari backend di produksi)
const initialUsers = [
  { id: 1, username: 'john_doe', email: 'john@example.com', role: 'reader', verified: true, readCount: 15 },
  { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'writer', verified: true, writtenNovels: 3 },
  { id: 3, username: 'admin_user', email: 'admin@example.com', role: 'admin', verified: true },
  { id: 4, username: 'new_user', email: 'newuser@example.com', role: 'reader', verified: false, readCount: 0 },
];

const UserManagement = () => {
  // State untuk menyimpan daftar pengguna, pengguna yang sedang diedit, dan statistik pengguna
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [userStats, setUserStats] = useState({});

  // useEffect untuk menghitung statistik pengguna ketika daftar pengguna berubah
  useEffect(() => {
    const stats = {
      totalUsers: users.length, // Total pengguna
      verifiedUsers: users.filter(user => user.verified).length, // Jumlah pengguna yang sudah diverifikasi
      adminCount: users.filter(user => user.role === 'admin').length, // Jumlah pengguna dengan peran admin
      writerCount: users.filter(user => user.role === 'writer').length, // Jumlah pengguna dengan peran penulis
      readerCount: users.filter(user => user.role === 'reader').length, // Jumlah pengguna dengan peran pembaca
      topReader: users.reduce((prev, current) => 
        (prev.readCount > current.readCount) ? prev : current
      ), // Pembaca dengan jumlah bacaan terbanyak
      topWriter: users.reduce((prev, current) => 
        (prev.writtenNovels > current.writtenNovels) ? prev : current
      ), // Penulis dengan jumlah novel terbanyak
    };
    setUserStats(stats); // Memperbarui state statistik
  }, [users]);

  // Fungsi untuk memverifikasi pengguna
  const handleVerify = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verified: true } : user // Mengubah status verified menjadi true
    ));
  };

  // Fungsi untuk menghapus pengguna
  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId)); // Menghapus pengguna berdasarkan id
    }
  };

  // Fungsi untuk memulai proses pengeditan pengguna
  const handleEdit = (user) => {
    setEditingUser(user); // Menetapkan pengguna yang akan diedit
  };

  // Fungsi untuk menyimpan perubahan pengguna setelah diedit
  const handleSave = (editedUser) => {
    setUsers(users.map(user => 
      user.id === editedUser.id ? editedUser : user // Memperbarui data pengguna
    ));
    setEditingUser(null); // Menutup modal setelah disimpan
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      
      {/* Menampilkan statistik pengguna */}
      <div className="user-stats">
        <div className="stat-item">
          <h3>Total Users</h3>
          <p>{userStats.totalUsers}</p>
        </div>
        <div className="stat-item">
          <h3>Verified Users</h3>
          <p>{userStats.verifiedUsers}</p>
        </div>
        <div className="stat-item">
          <h3>Admins</h3>
          <p>{userStats.adminCount}</p>
        </div>
        <div className="stat-item">
          <h3>Writers</h3>
          <p>{userStats.writerCount}</p>
        </div>
        <div className="stat-item">
          <h3>Readers</h3>
          <p>{userStats.readerCount}</p>
        </div>
      </div>

      {/* Menampilkan pengguna dengan statistik terbaik (Top Reader, Top Writer) */}
      <div className="top-users">
        <div className="top-user">
          <h3>Top Reader</h3>
          <p>{userStats.topReader?.username} ({userStats.topReader?.readCount} reads)</p>
        </div>
        <div className="top-user">
          <h3>Top Writer</h3>
          <p>{userStats.topWriter?.username} ({userStats.topWriter?.writtenNovels} novels)</p>
        </div>
      </div>

      {/* Tabel pengguna */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.verified ? <UserCheck size={16} color="green" /> : <UserX size={16} color="red" />}</td>
              <td>
                {/* Tombol untuk memverifikasi, mengedit, dan menghapus */}
                {!user.verified && (
                  <button onClick={() => handleVerify(user.id)}><UserCheck size={16} /></button>
                )}
                <button onClick={() => handleEdit(user)}><Edit size={16} /></button>
                <button onClick={() => handleDelete(user.id)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal untuk mengedit pengguna */}
      {editingUser && (
        <UserEditModal user={editingUser} onSave={handleSave} onClose={() => setEditingUser(null)} />
      )}
    </div>
  );
};

// Modal untuk mengedit data pengguna
const UserEditModal = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);

  // Fungsi untuk menangani perubahan input pada form edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menangani pengiriman form edit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser); // Menyimpan perubahan pengguna
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              required
            >
              <option value="reader">Reader</option>
              <option value="writer">Writer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="verified">Verified:</label>
            <input
              type="checkbox"
              id="verified"
              name="verified"
              checked={editedUser.verified}
              onChange={(e) => setEditedUser(prev => ({ ...prev, verified: e.target.checked }))}
            />
          </div>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;
