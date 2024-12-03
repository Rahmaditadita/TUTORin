import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing the back arrow icon

// Fiturkursus component menerima 'navigation' sebagai props untuk navigasi antar halaman
const Fiturkursus = ({ navigation }) => {
  return (
    // SafeAreaView memastikan komponen berada dalam area aman pada layar
    <SafeAreaView style={styles.container}>
      {/* ScrollView digunakan agar konten dapat digulir saat ada banyak konten */}
      <ScrollView>
        {/* Header bagian atas dengan tombol kembali dan judul */}
        <View style={styles.headerContainer}>
          {/* Tombol kembali dengan icon yang menggunakan Ionicons */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#234873" style={styles.iconStyle} />
            <Text style={styles.title}>Biology</Text>style={styles.text5} 
          </TouchableOpacity>
        </View>

        {/* Konten kursus pertama */}
        <View style={styles.textContainer}>
          {/* Kontainer kategori kursus */}
          <View style={styles.categoryContainer}>
            {/* Menampilkan kategori kursus */}
            <Text style={styles.category}>Science</Text> 
          </View>
          {/* Menampilkan judul kursus */}
          <Text style={styles.title}>Biology 101</Text>
          {/* Menampilkan harga kursus */}
          <Text style={styles.price}>$99</Text>
        </View>

        {/* Konten kursus kedua */}
        <View style={styles.courseContainer}>
          <TouchableOpacity onPress={() => alert('Course Selected')}>
            {/* Menampilkan gambar kedua kursus */}
            <Image source={require('./assets/bio.png')} style={styles.courseImage} />
            {/* Menampilkan judul kursus kedua */}
            <Text style={styles.title}>Advanced Biology</Text> 
            {/* Menampilkan harga kursus kedua */}
            <Text style={styles.price}>$120</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styling untuk komponen menggunakan StyleSheet
const styles = StyleSheet.create({
  // Style untuk container utama, memberikan warna latar belakang
  container: {
    flex: 1, // Membuat container mengisi seluruh layar
    backgroundColor: '#FBF3BC', // Menentukan warna latar belakang
  },
  // Styling untuk header container (untuk tombol dan judul)
  headerContainer: {
    flexDirection: 'row', // Membuat kontainer dengan elemen berjejer secara horizontal
    alignItems: 'center', // Menyelaraskan item secara vertikal
    paddingVertical: 20, // Memberikan padding vertikal
    marginHorizontal: 20, // Memberikan margin horizontal
  },
    text5: {
    fontSize: 18, // Ukuran font judul kursus
    fontWeight: 'bold', // Menebalkan font judul kursus
    color: '#234873', // Warna teks judul kursus
    marginBottom: 5, // Memberikan margin bawah
  },
  // Styling untuk gambar kursus
  courseImage: {
    width: 500,
    height: 300,
    marginBottom: 5,
    borderRadius: 0,
    position: 'relative', // Menyesuaikan posisi gambar
  },
  // Styling untuk text container (untuk konten teks seperti kategori, judul, harga)
  textContainer: {
    padding: 15, // Memberikan padding di seluruh konten
  },
  // Styling untuk kategori kursus
  categoryContainer: {
    backgroundColor: '#FFF', // Latar belakang kategori dengan warna putih
    alignSelf: 'flex-start', // Menyelaraskan ke kiri
    paddingHorizontal: 10, // Padding horizontal pada kategori
    paddingVertical: 5, // Padding vertikal pada kategori
    borderRadius: 20, // Border radius untuk sudut melengkung pada kategori
    marginBottom: 10, // Memberikan jarak bawah
  },
  // Styling untuk teks kategori
  category: {
    fontSize: 14, // Ukuran font kategori
    fontWeight: 'bold', // Menebalkan font kategori
    color: '#234873', // Warna teks kategori
  },
  // Styling untuk judul kursus
  title: {
    fontSize: 18, // Ukuran font judul kursus
    fontWeight: 'bold', // Menebalkan font judul kursus
    color: '#fff', // Warna teks judul kursus
    marginBottom: 5, // Memberikan margin bawah
  },
  // Styling untuk harga kursus
  price: {
    fontSize: 16, // Ukuran font harga kursus
    color: '#FFD700', // Warna font harga kursus
  },
  // Styling untuk ikon
  iconStyle: {
    position: 'absolute', // Menempatkan ikon di atas gambar
    top: 100, // Menempatkan ikon sedikit di atas gambar
    left: 20, // Memberikan jarak dari kiri
    zIndex: 3, // Menempatkan ikon di atas gambar
  },
});

export default Fiturkursus;
