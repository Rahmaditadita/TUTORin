import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../service/firebaseconfig'; // Import your Firebase config
import { signOut, onAuthStateChanged } from 'firebase/auth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [username, setUsername] = useState('User'); 
  const [isLogoutPressed, setIsLogoutPressed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Ambil displayName
        const displayName = user.displayName || '';
        
        // Pisahkan nama depan dari displayName
        const firstName = displayName.split(' ')[0]; // Mengambil kata pertama sebagai nama depan
        setUsername(firstName); // Set username ke nama depan
      } else {
        setUsername(''); // Reset username jika tidak ada pengguna yang login
      }
    });
  
    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);
  
  const handleout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled."),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await signOut(auth); // Sign out from Firebase
              console.log('User  signed out');
              navigation.navigate('loginpelajar'); // Navigate to login screen
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to log out. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text); // Update the search query
  };

  const handleSearch = () => {
    // Navigasi ke search.js tanpa memerlukan input
    navigation.navigate('search');
  };


  const handleCategorySelection = (category) => setSelectedCategory(category);
  const handleCourseSelection = (course) => setSelectedCourse(course);

  const handleSeeAll = () => {
    navigation.navigate('Fiturkursus'); // Navigate to Fiturkursus
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle} />

      {/* Kolom Pencarian */}
      <TouchableOpacity style={styles.searchContainer} onPress={handleSearch}>
        <Text style={styles.searchInput}>Search Courses...</Text>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      </TouchableOpacity>

      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>Hello, {username}!</Text>
        <Text style={styles.subGreeting}>Let's start Learning</Text>
      </View>

      {/* Explore Category */}
      <Text style={[styles.sectionTitle, { zIndex: 1 }]}>Explore Category</Text>
      <View style={[styles.categoryContainer, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem, selectedCourse === 'science' && styles.selectedItem]}
          onPress={() => { console.log('science');
          navigation.navigate('science');
          }}>
          <Image source={require('../assets/ipa.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Scicos</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryContainer, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem, selectedCourse === 'Language' && styles.selectedItem]}
          onPress={() => { console.log('Language');
          navigation.navigate('Bahasa');
          }}>

          <Image source={require('../assets/language.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Language</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryContainer2, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem2, selectedCourse === 'math' && styles.selectedItem]}
          onPress={() => { console.log('Math');
          navigation.navigate('Math');
          }}>

          <Image source={require('../assets/math.png')} style={styles.categoryImage1} />
          <Text style={styles.categoryText}>Math</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Courses */}
      <Text style={[styles.sectionTitle1, { zIndex: 1 }]}>Featured Courses</Text>
      
      <TouchableOpacity
            style={[styles.sectionTitle2, { zIndex: 1 }]}
            onPress={() => {
            console.log('See all');
            navigation.navigate('Fiturkursus');
            }}>
            <Text styles={styles.sectionTitle2}>see all</Text>
      </TouchableOpacity>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.courseContainer}>
          <TouchableOpacity
            style={[styles.courseItem, selectedCourse === 'science' && styles.selectedItem]}
            onPress={() => { console.log('science');
              navigation.navigate('Fiturkursus');
            }}>
            <Image source={require('../assets/bio.png')} style={styles.courseImage} />
            <Text style={styles.courseTitle}>Scicos</Text>
            <Text style={[styles.courseTitle_, { fontStyle: 'italic' }]}>Biology</Text>
            <Text style={styles.coursePrice}>30.000 - 85.000</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.courseContainer}>
          <TouchableOpacity
            style={[styles.courseItem1, selectedCourse === 'math' && styles.selectedItem]}
            onPress={() => {console.log('math');
              navigation.navigate('Fiturkursus');
            }}>
            <Image source={require('../assets/math.png')} style={styles.courseImage1} />
            <Text style={styles.courseTitle1}>Scicos</Text>
            <Text style={[styles.courseTitle1_1, { fontStyle: 'italic' }]}>Mathematic</Text>
            <Text style={styles.coursePrice1}>40.000 - 90.000</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[styles.logoutButton, isLogoutPressed && styles.logoutButtonPressed]} 
        onPress={handleout}
        onPressIn={() => setIsLogoutPressed(true)} // Set state saat ditekan
        onPressOut={() => setIsLogoutPressed(false)} // Reset state saat dilepaskan
      >
        <Icon name="sign-out" size={30} color="#888" style={styles.logoutIcon} />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navigationItem}>
          <Icon name="home" size={20} color="#888" style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationItem}>
          <Icon name="list" size={20} color="#888" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFBD',
  },
  greetingSection: {
    marginTop: -150,
    marginHorizontal: 20,
    zIndex: 2,
  },
  greeting: {
    fontSize: 25,
    color: '#234873',
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 30,
    color: '#234873',
    fontWeight: 'bold',
  },
  searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFF7C0',
      borderRadius: 10,
      padding: 12,
      paddingVertical: 14,
      marginTop: 140,
      marginHorizontal: 22,
      alignItems: 'center',
      width: '89%',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#727272',
    marginRight: 30,
  },
  searchIcon: {
    marginLeft: 10,
  },
// exploring 
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    color: '#F6EFBD',
    marginVertical: 72,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 1,
    width: 350,
    },
    categoryItem: {
      width: '45%',
      height: 100,
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#FFF7C0',
      alignItems: 'center',
      marginTop: -68,
      marginVertical: 75,
      marginLeft: -153,
    },
    categoryImage: {
      width: 125,
      height: 50,
      marginBottom: 10,
      borderRadius: 10,
      marginVertical: -10,
    },
  categoryContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 1,
    width: 350,
  },
  categoryItem2: {
    width: '45%',
    height: 100,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF7C0',
    alignItems: 'center',
    marginVertical: -286,
    marginLeft: 180,
  },
  categoryImage1: {
    width: 125,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
    marginVertical: -10,
  },
  categoryText: {
    fontSize: 20, // Ukuran teks
    color: '#234873', // Warna teks
    marginVertical: -8, // Memberi jarak antara gambar dan teks
    fontWeight: 'bold', // Menambahkan ketebalan pada teks
  },
  categoryText1: {
    fontSize: 20, // Ukuran teks
    color: '#234873', // Warna teks
    fontWeight: 'bold', // Menambahkan ketebalan pada teks
    marginVertical: -8,
  },
  selectedItem: {
    backgroundColor: '#FFD7D7',
  },
  selectedItem1: {
    backgroundColor: '#FFD7D7',
  },
  //FEATUREDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 1,
    width: 1000,
    height: 1000,
    flex: 1,
  },
  sectionTitle1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F6EFBD',
    flexDirection:'row-reverse',
    marginTop: -76,
    marginLeft: 19,
  },
  sectionTitle2: {
    fontSize: 12,
    fontWeight: 'medium',
    color: '#F6EFBD',
    marginTop: -19,
    marginLeft: 308,
  },
  courseItem: {
    flexDirection: 'colomn',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF7C0',
    color: '#727272',
    marginHorizontal: 10,
    marginTop: 3,
    marginLeft: -649,
    width: 300,
    height: 170,
    borderRadius: 20,
  },
  courseItem1: {
    flexDirection: 'colomn',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF7C0',
    color: '#727272',
    marginTop: 3,
    marginLeft: -2016,
    width: 300,
    height: 170,
    borderRadius: 18,
  },
    courseImage: {
    width: 260,
    height: 110,
    borderRadius: 13,
    marginTop: 2,
  },
    courseImage1: {
    width: 260,
    height: 110,
    borderRadius: 13,
    marginLeft: 0,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: -174,
    marginTop: -3,
  },
  courseTitle_: {
    fontSize: 16,
    fontWeight: 'italic',
    color: '#234873',
    marginLeft: -208,
    marginTop: -6,
  },
    coursePrice: {
    fontSize: 14,
    color: '#234873',
    marginLeft: 170,
    marginTop: -18,
  },

    courseTitle1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: -134,
    marginTop: -3,
  },
    courseTitle1_1: {
      fontSize: 16,
      fontWeight: 'italic',
      color: '#234873',
      marginLeft: -110,
      marginTop: -6,
  },
  coursePrice1: {
    fontSize: 14,
    color: '#234873',
    marginLeft: 170,
    marginTop: -18,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF7C0',
    fontSize: 14,
    color: '#727272',
    marginLeft: 120,
    marginVertical: -10,
    paddingVertical: 0,
    height: 35,
    width: 120,
    borderRadius: 10,
  },
  navigationItem: {
    tintColor: '#234873',
    marginTop: 6,
    marginLeft: 10,
    height: 20,
    width: 50,
  },
  logoutIcon: {
    left: 9,
    top: -600,
  },
  logoutButton: {
    padding: 0, // Pastikan ada padding untuk area klik yang lebih besar
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Pastikan posisi tombol logout tidak terhalang
    bottom: 20, // Atur posisi tombol logout
    right: 20, // Atur posisi tombol logout
  },
   rectangle: {
    position: 'absolute',
    width: '100%',
    height: 1000, // Disesuaikan agar tidak menutupi seluruh layar
    backgroundColor: '#234873',
    marginVertical: 260,
    marginTop: 175,
    zIndex: 0,
  },
});

export default HomeScreen;