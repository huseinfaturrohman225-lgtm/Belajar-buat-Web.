# Catatan Pembagian Tugas dan Kontribusi

**Kelompok:** Kelompok_Contoh
**Topik:** Pemesanan Menu Kafe (Kedai Senja)

## Anggota dan peran

| Nama anggota | Peran | Bagian kode yang ditulis sendiri |
|---|---|---|
| (isi nama 1) | Koordinator | Data menu (array `daftarMenu`) dan fungsi `rupiah()` |
| (isi nama 2) | Penyusun HTML dan CSS | `index.html` dan `style.css` |
| (isi nama 3) | Penyusun JavaScript | Fungsi `tampilkanMenu()`, `buatKartuMenu()`, `tambahKePesanan()` |
| (isi nama 4) | Penguji dan pencatat | Fungsi `kirimPesanan()`, `kosongkanPesanan()`, validasi input, catatan uji |

## Hasil diskusi

- Fitur yang disepakati: daftar menu, pencarian, filter kategori, input jumlah, rincian pesanan, hapus item, total dan pajak, struk, validasi input.
- Penamaan id yang disepakati: `daftar-menu`, `cari-menu`, `daftar-pesanan`, `teks-total`, `nama-pemesan`, `tombol-pesan`.

## Teknik DOM yang dipakai

| Teknik | Contoh pada kode |
|---|---|
| Memilih elemen | `document.getElementById("daftar-menu")`, `document.querySelectorAll(".filter-tombol")` |
| Mengubah isi | `elTotal.textContent = rupiah(total)` |
| Mengubah tampilan | `classList.add("aktif")`, `classList.toggle("sembunyi", ...)` |
| Membaca input | `Number(inputJumlah.value)` |
| Membuat elemen | `createElement("article")`, `appendChild(...)` |
| Menghapus elemen | `li.remove()` |
| Merespons event | `addEventListener("click" / "input" / "keydown", ...)` |

## Catatan pengujian (hitung manual)

| Skenario | Hasil yang diharapkan | Hasil di aplikasi |
|---|---|---|
| 2 Kopi Susu Gula Aren + 1 Kentang Goreng | Subtotal Rp60.000, pajak Rp6.000, total Rp66.000 | (isi) |
| Jumlah dikosongkan lalu klik Tambah | Muncul pesan error di halaman | (isi) |
| Jumlah 0 atau -3 | Muncul pesan error di halaman | (isi) |
| Kirim pesanan tanpa nama | Muncul pesan error, pesanan tidak terkirim | (isi) |
| Hapus satu item | Baris hilang, total dihitung ulang | (isi) |
