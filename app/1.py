import csv
from datetime import datetime

FILE_NAME = "users.csv"  # Nama file CSV untuk menyimpan data pengguna

class MinHeap:
    def __init__(self, maxsize):
        self.maxsize = maxsize  # Menentukan kapasitas maksimum heap
        self.size = 0  # Ukuran heap saat ini
        self.Heap = [None] * (self.maxsize + 1)  # Menyimpan heap dalam list
        self.FRONT = 1  # Indeks pertama (root) heap

    def parent(self, index):
        return index // 2  # Mengembalikan indeks parent dari indeks yang diberikan

    def LeftChild(self, index):
        return 2 * index  # Mengembalikan indeks anak kiri dari indeks yang diberikan

    def RightChild(self, index):
        return (2 * index) + 1  # Mengembalikan indeks anak kanan dari indeks yang diberikan

    def swap(self, x, y):
        self.Heap[x], self.Heap[y] = self.Heap[y], self.Heap[x]  # Menukar dua elemen dalam heap

    def minHeapify(self, index):
        # Menjaga sifat min-heap pada node tertentu
        left = self.LeftChild(index)
        right = self.RightChild(index)
        smallest = index
        if left <= self.size and self.Heap[left] is not None and self.Heap[left] < self.Heap[smallest]:
            smallest = left
        if right <= self.size and self.Heap[right] is not None and self.Heap[right] < self.Heap[smallest]:
            smallest = right
        if smallest != index:
            self.swap(index, smallest)  # Menukar elemen
            self.minHeapify(smallest)  # Rekursi untuk meminimalkan subtree

    def insert(self, element):
        if self.size >= self.maxsize:  # Mengecek apakah heap sudah penuh
            return
        self.size += 1  # Menambah ukuran heap
        self.Heap[self.size] = element  # Menambahkan elemen baru ke heap
        current = self.size
        while current > 1 and self.Heap[current] < self.Heap[self.parent(current)]:  # Memastikan elemen baru ada di posisi yang benar
            self.swap(current, self.parent(current))
            current = self.parent(current)

    def delete(self):
        if self.size == 0:  # Mengecek apakah heap kosong
            return "Heap is empty"
        min_value = self.Heap[self.FRONT]  # Menyimpan elemen terkecil
        self.Heap[self.FRONT] = self.Heap[self.size]  # Memindahkan elemen terakhir ke posisi root
        self.size -= 1  # Mengurangi ukuran heap
        self.minHeapify(self.FRONT)  # Menjaga sifat min-heap
        return min_value

    def print_heap(self):
        # Menampilkan isi heap dengan detail anak dan parent
        for i in range(1, self.size // 2 + 1):
            parent = "PARENT : " + str(self.Heap[i])
            left_child = ""
            right_child = ""
            if 2 * i <= self.size:
                left_child = " LEFT CHILD : " + str(self.Heap[2 * i])
            if 2 * i + 1 <= self.size:
                right_child = " RIGHT CHILD : " + str(self.Heap[2 * i + 1])
            print(parent + left_child + right_child)
        print("Heap Array:", self.Heap[1:self.size+1])

    def heap_sort(self):
        # Mengurutkan elemen heap dan mengembalikannya dalam urutan yang terurut
        sorted_array = []
        original_size = self.size
        for _ in range(original_size):
            min_value = self.delete()  # Menghapus elemen terkecil dan menambahkannya ke sorted array
            sorted_array.append(min_value)
        return sorted_array

# Fungsi untuk memastikan file CSV pengguna ada
def initialize_csv():
    try:
        with open(FILE_NAME, mode='r') as file:
            pass  # File sudah ada, tidak perlu dilakukan apa-apa
    except FileNotFoundError:
        # Jika file tidak ditemukan, buat file baru dengan header
        with open(FILE_NAME, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["username", "password"])  # Header CSV

# Fungsi untuk registrasi pengguna baru
def register():
    """Fungsi untuk registrasi pengguna baru."""
    initialize_csv()  
    print("\n--- REGISTER ---")
    while True:
        username = input("Masukkan username: ").strip()  # Input username
        if not username:
            print("Username tidak boleh kosong. Silakan coba lagi.\n")
            continue
        password = input("Masukkan password: ").strip()  # Input password
        if not password:
            print("Password tidak boleh kosong. Silakan coba lagi.\n")
            continue
        with open(FILE_NAME, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row['Username'] == username:
                    print("\nUsername sudah terdaftar. Silakan gunakan username lain.")
                    break
            else:
                with open(FILE_NAME, mode='a', newline='') as file:
                    with open(FILE_NAME, mode='r', newline='') as read_file:
                        reader = csv.reader(read_file)
                        file_length = sum(1 for _ in reader)  # Menghitung jumlah baris untuk ID pengguna
                        ID = file_length 
                    writer = csv.writer(file)
                    writer.writerow([username, password, ID])  # Menyimpan data pengguna ke file CSV
                print("\nRegistrasi berhasil! Anda sekarang dapat login.")
                main()  # Kembali ke menu utama setelah registrasi berhasil

# Fungsi untuk login
def login(heap):
    print("\n--- LOGIN ---")
    while True:
        username = input("Masukkan username: ")
        if not username:
            print("Username tidak boleh kosong. Silakan coba lagi.\n")
            continue
        password = input("Masukkan password: ")
        if not password:
            print("Password tidak boleh kosong. Silakan coba lagi.\n")
            continue
        try:
            with open(FILE_NAME, mode='r') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    if row['Username'] == username and row['Password'] == password:
                        ID = row['ID']
                        print("\nLogin berhasil! Selamat datang,", username)
                        return menu(heap, ID)  # Menu utama setelah login berhasil
                print("Username atau password salah. Silakan coba lagi.\n")
        except FileNotFoundError:
            print("\nBelum ada pengguna terdaftar. Silakan registrasi terlebih dahulu.")
            main()  # Menu utama jika file tidak ditemukan
