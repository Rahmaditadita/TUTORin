import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing the back arrow icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const KategoriKursus = ({ namaKategori, styleKategori, styleText, onPress, marginBottom }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styleKategori, { marginBottom: marginBottom }]}>
        <Text style={styleText}>{namaKategori}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Fiturkursus component menerima 'navigation' sebagai props untuk navigasi antar halaman
const scienceScreen = ({}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('home');
  };

  const handleBiology = () => {
    navigation.navigate('bio');
  };

  const handlePhysics = () => {
    console.log('Physics');
  };

  const handleHistory = () => {
    console.log('History');
  };

  return (
    // SafeAreaView memastikan komponen berada dalam area aman pada layar
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress= {handleBack}>
            <Ionicons name="arrow-back" size={30} color="#234873" />
          </TouchableOpacity>
          <Text style={styles.header1}>Scicos</Text>
        </View>

        {/* BIOOOO*/}
        <View style={styles.textContainer}>
          <KategoriKursus namaKategori="Biology"
          styleKategori={styles.bio} styleText={styles.bio1} 
          onPress={handleBiology} marginBottom={30}
          />
          <KategoriKursus namaKategori="Physics"
          styleKategori={styles.bio} styleText={styles.bio3} 
          onPress={handlePhysics} marginBottom={30} 
          />
          <KategoriKursus namaKategori="History"
          styleKategori={styles.bio} styleText={styles.bio2}
          onPress={handleHistory} marginBottom={30}
          />
        </View>
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
// HEADETRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
  header: {
    flexDirection: 'row', // Membuat kontainer dengan elemen berjejer secara horizontal
    alignItems: 'center', // Menyelaraskan item secara vertikal
    paddingVertical: 20, // Memberikan padding vertikal
    marginHorizontal: 20, // Memberikan margin horizontal
  },
  header1: {
    fontSize: 25, // Ukuran font judul kursus
    fontWeight: 'bold', // Menebalkan font judul kursus
    color: '#1A1869', // Warna teks judul kursus
    marginLeft: 88, // Memberikan margin bawah
    alignItems: 'center'
  },
  // BIOOOOOOO
  textContainer: {
    padding: 15, // Memberikan padding di seluruh konten
  },
  // Styling untuk kategori kursus
  bio: {
    backgroundColor: '#1A1869', // Latar belakang kategori dengan warna putih // Menyelaraskan ke kiri
    paddingVertical: 20, // Padding vertikal pada kategori
    borderRadius: 20,
    justifyContent: 'center', // Memastikan konten di tengah secara vertikal
    alignItems: 'center', // Memastikan konten di tengah secara horizontal
    flexDirection: 'row',
  },
  // Styling untuk teks kategori
  bio1: {
    fontSize: 23, // Ukuran font kategori
    fontWeight: 'bold', // Menebalkan font kategori
    color: '#F6EFBD', // Warna teks kategori
    alignItems: 'center',
    marginLeft: 128,
    flex: 1,
    position: 'static',
    paddingHorizontal: 0,
  },
  bio2: {
    fontSize: 23, // Ukuran font kategori
    fontWeight: 'bold', // Menebalkan font kategori
    color: '#F6EFBD', // Warna teks kategori
    alignItems: 'center',
    marginLeft: 130,
    flex: 1,
  },
  bio3: {
    fontSize: 23, // Ukuran font kategori
    fontWeight: 'bold', // Menebalkan font kategori
    color: '#F6EFBD', // Warna teks kategori
    alignItems: 'center',
    marginLeft: 126,
    flex: 1,
  },

  // Styling untuk ikon
  iconStyle: {
    position: 'absolute', // Menempatkan ikon di atas gambar
    top: 100, // Menempatkan ikon sedikit di atas gambar
    left: 20, // Memberikan jarak dari kiri
    zIndex: 3, // Menempatkan ikon di atas gambar
  },
});

export default scienceScreen;