import React, { useState } from 'react'; // Import useState
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing the back arrow icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Komponen KategoriKursus
const KategoriKursus = ({ imageSource, name, rating, reviews, onPress, onViewMore}) => {
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
        <Image source={imageSource} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{name}</Text>
        <Text style={styles.categoryText1}>Tutor</Text>
        <Ionicons name="star" size={16} color="#234873" style={styles.starIcon} />
        <Text style={styles.categoryText2}>{rating}</Text>
        <Text style={styles.categoryText3}>({reviews} Reviews)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewMoreButton}
        onPress={onViewMore}>
        <Text style={styles.viewMoreText}>View More</Text>
      </TouchableOpacity>
    </View>
  );
};

// Fiturkursus component menerima 'navigation' sebagai props untuk navigasi antar halaman
const BioScreen = () => {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState(null); // Define selectedCourse state

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('science'); // Navigate to Home or any other screen
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={30} color="#234873" />
        </TouchableOpacity>
        <Text style={styles.header1}>Biology</Text>
      </View>

      <View style={styles.categoryList}>
        <KategoriKursus
          imageSource={require('../assets/aini.png')}
          name="Miss Sekar"
          rating="4.9"
          reviews="100"
          onPress={() => {
            console.log('Bio');
            setSelectedCourse('Bio');
            navigation.navigate('bio');
          }}
          onViewMore={() => {
            console.log('View More Miss Aini');
            navigation.navigate('Profilementor'); // Ganti dengan nama rute yang sesuai
          }}
        />

        <KategoriKursus
          imageSource={require('../assets/hermaw.png')}
          name="Mr. Hermawan"
          textStyle={{fontStyle: 'italic'}}
          rating="4.8"
          reviews="80"
          onPress={() => {
            console.log('bio');
            setSelectedCourse('bio');
            navigation.navigate('bio');
          }}
          onViewMore={() => {
            console.log('View More Mr. Hermawan');
            navigation.navigate('ProfilMbio'); // Ganti dengan nama rute yang sesuai
          }}
        />

        <KategoriKursus
          imageSource={require('../assets/hida.png')}
          name="Miss. Herma"
          textStyle={{fontStyle: 'italic'}}
          rating="4.8"
          reviews="80"
          onPress={() => {
            console.log('bio');
            setSelectedCourse('bio');
            navigation.navigate('bio');
          }}
          onViewMore={() => {
            console.log('View More Mr. Hermawan');
            navigation.navigate('Profilmentor'); // Ganti dengan nama rute yang sesuai
          }}
        />    
      </View>
    </SafeAreaView>
  );
};

// Styling untuk komponen menggunakan StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3BC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  header1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1A1869',
    marginLeft: 88,
    alignItems: 'center'
  },
  categoryList: {
    marginVertical: 1,
    width: '100%',
  },
  categoryContainer: {
    flexDirection: 'row', // Menempatkan kategori dan tombol View More dalam satu baris
    justifyContent: 'space-between', // Memisahkan kategori dan tombol
    alignItems: 'flex-start', // Mengatur agar item di dalam kategori rata kiri
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  categoryItem: {
    flex: 1, // Membuat kategori mengambil ruang yang tersedia
    height:100,
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start', // Mengatur agar item di dalam kategori rata kiri
    marginRight: 10, // Memberi jarak antara kategori dan tombol View More
  },
  categoryImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginTop: -10,
    left: -10,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 20, // Ukuran teks
    color: '#234873', // Warna teks
    marginLeft: 1, // Memberi jarak antara gambar dan teks
    fontWeight: 'bold', // Menambahkan ketebalan pada teks
    left: 75,
    top: -90,
  },
  categoryText1: {
    fontSize: 16, // Ukuran teks
    color: '#234873', // Warna teks
    fontWeight: 'italic',
    left: 76,
    top: -89,
  },
  categoryText2: {
    fontSize: 14, // Ukuran teks
    color: '#234873', // Warna teks
    fontWeight: 'italic',
    left: 97,
    top: -97,
  },
  categoryText3: {
    fontSize: 14, // Ukuran teks
    color: '#234873', // Warna teks
    fontWeight: 'italic',
    left: 123,
    top: -116,
  },
  starIcon: {
    marginLeft: 76, // Memberi jarak antara ikon bintang dan rating
    top: -80
  },
  viewMoreButton: {
    backgroundColor: '#1A1869', // Background color for the View More button
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40, // Menyesuaikan tinggi tombol agar sama dengan kategori
    top: 35,
  },
  viewMoreText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FBF3BC', // Change text color to white for better contrast
  },
});

export default BioScreen;