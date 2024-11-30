// Fungsi Color menerima parameter 'title' dan mengembalikan sebuah string CSS yang berupa linear gradient
export default function Color(title) {

  // Daftar warna yang digunakan untuk menghasilkan gradien
  const colors = [
    "rgb(2, 2, 58)", // Warna pertama
    "black", // Warna kedua
    "rgb(1, 1, 96)", // Warna ketiga
    " rgba(0, 0, 0, 0.691)", // Warna keempat dengan transparansi
    "#00104e", // Warna kelima
    "rgb(2, 64, 2)", // Warna keenam
    "black", // Warna ketujuh
    "rgb(73, 3, 3)", // Warna kedelapan
    "rgb(1, 1, 96)", // Warna kesembilan
    "rgba(0, 0, 0, 0.691)", // Warna kesepuluh dengan transparansi
    "#00104e", // Warna kesebelas
    "rgb(10, 10, 40)", // Warna kedua belas
    "rgb(73, 3, 3)", // Warna ketiga belas
    "rgb(29, 29, 38)", // Warna keempat belas
    "black", // Warna kelima belas
    "rgb(2, 2, 58)", // Warna keenam belas
    "rgb(10, 10, 40)", // Warna ketujuh belas
    "rgb(29, 29, 38)", // Warna kedelapan belas
    "black", // Warna kesembilan belas
    "rgb(2, 2, 58)", // Warna kedua puluh
    "#00104e", // Warna kedua puluh satu
    "rgb(73, 3, 3)", // Warna kedua puluh dua
    "rgb(10, 10, 40)", // Warna kedua puluh tiga
    "rgba(0, 0, 0, 0.691)", // Warna kedua puluh empat dengan transparansi
    "rgb(2, 2, 58)", // Warna kedua puluh lima
    "black", // Warna kedua puluh enam
    "rgb(1, 1, 96)", // Warna kedua puluh tujuh
    "rgba(0, 0, 0, 0.691)", // Warna kedua puluh delapan dengan transparansi
    "#00104e", // Warna kedua puluh sembilan
    "rgb(2, 64, 2)", // Warna ketiga puluh
    "rgb(73, 3, 3)", // Warna ketiga puluh satu
    "rgb(23, 25, 23)", // Warna ketiga puluh dua
    "rgb(29, 29, 38)", // Warna ketiga puluh tiga
    "rgb(10, 10, 40)" // Warna ketiga puluh empat
  ];

  // Menghitung index warna berdasarkan panjang string 'title'
  const index = title.length % colors.length; 
  // Modulo digunakan agar hasilnya tetap dalam batas panjang array 'colors', memastikan index selalu valid.

  // Mengembalikan sebuah CSS linear gradient yang menggabungkan dua warna dari array berdasarkan index yang dihitung
  return `linear-gradient(135deg, ${colors[index]} 0%, ${
    colors[(index + 1) % colors.length] // Memilih warna berikutnya setelah warna pada index
  } 100%)`;
}