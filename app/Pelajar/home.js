import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../service/firebaseconfig'; // Import your Firebase config
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { firestore } from '../service/firebaseconfig';
import { collection,query, where, doc, getDocs } from 'firebase/firestore';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [username, setUsername] = useState('User'); 
  const [firstName, setFirstName] = useState('');
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const firstName = user.displayName ? user.displayName.split(' ')[0] : ''; 
        setUsername(firstName);
        fetchUserDetails(user.email); // Mengambil email pengguna yang sedang login
      } else {
        setUsername(''); 
        setFirstName('');
      }
    });
  
    return () => unsubscribe();
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
              await signOut(auth); // Logout dari Firebase
              console.log('User signed out');
              navigation.navigate('loginpelajar'); // Navigasi ke layar login
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

  const fetchUserDetails = async (email) => {
    try {
      // Referensi ke koleksi yang menyimpan data pengguna
      const usersRef = collection(firestore, 'Users/loginpelajar/pelajar');
      
      // Membuat query untuk mencari dokumen berdasarkan field 'email'
      const q = query(usersRef, where('email', '==', email)); 
  
      // Menjalankan query untuk mengambil dokumen
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(doc => {
          const userData = doc.data();
          setFirstName(userData.firstName); // Mengambil firstName dari Firestore
        });
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user details: ', error);
      Alert.alert('Error', 'Failed to fetch user details.');
    }
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
        <Text style={styles.greeting}>Hello, {firstName || username}!</Text>
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
      <Text style={[styles.sectionTitle1, { zIndex: 1 }]}>Recommendation</Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.courseContainer}>
        <TouchableOpacity
          style={[styles.courseItem, selectedCourse === 'science' && styles.selectedItem]}
          onPress={() => { 
            console.log('science');
            // navigation.navigate('Fiturkursus');
          }}>
          <Image source={require('../assets/bio.png')} style={styles.courseImage} />
          <Text style={styles.courseTitle}>Scicos</Text>
          <Text style={[styles.courseTitle_, { fontWeight: 'bold', fontStyle: 'italic', color: '#234873',}]}>Biology</Text>
          <Text style={styles.courseUseclass}>SMP Class 7</Text>
          <Text style={styles.coursePrice}>30.000</Text>

          <View style={styles.buttonsContainer}>
          {/* Button for method */}
            <TouchableOpacity style={styles.methodButton}>
              <Text style={styles.buttonText1}>Offline</Text>
            </TouchableOpacity>

            {/* Button for buy */}
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                console.log('Navigating to payment...');
                navigation.navigate('pay'); // Navigate to payment screen
              }}
            >
            <Text style={styles.buttonText}>BUY</Text>
          </TouchableOpacity>
        </View>
        </TouchableOpacity>
      </View>

      <View style={styles.courseContainer}>
        <TouchableOpacity
          style={[styles.courseItem, selectedCourse === 'math' && styles.selectedItem]}
          onPress={() => {
            console.log('math');
            navigation.navigate('Fiturkursus');
          }}>
          <Image source={require('../assets/math.png')} style={styles.courseImage} />
          <Text style={styles.courseTitle}>Scicos</Text>
          <Text style={[styles.courseTitle1_, { fontWeight: 'bold', fontStyle: 'italic', color: '#234873', left: 25 }]}>Mathematics</Text>
          <Text style={styles.courseUseclass1}>SMP Class 9</Text>
          <Text style={styles.coursePrice1}>40.000</Text>

          <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.methodButton1}>
              <Text style={styles.buttonText1}>Online</Text>
          </TouchableOpacity>

                      {/* Button for buy */}
          <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                console.log('Navigating to payment...');
                navigation.navigate('pay'); // Navigate to payment screen
              }}
            >
            <Text style={styles.buttonText2}>BUY</Text>
          </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>

      <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleout} // Tetap menjalankan fungsi logout
      >
      <Icon name="sign-out" size={30} color="#888" style={styles.logoutIcon} />
      </TouchableOpacity>
    

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
      <TouchableOpacity 
        style={styles.navigationItem} 
        onPress={() => navigation.navigate('home')} // Navigasi ke layar Home
      >
      <Icon name="home" size={20} color="#888" style={styles.searchIcon} />
      </TouchableOpacity>

    {/* Tombol List Pelajar */}
      <TouchableOpacity 
       style={styles.navigationItem} 
        onPress={() => navigation.navigate('listpelajar')} // Navigasi ke layar List Pelajar
      >
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
    marginRight: -675,
    left: -330,
  },
  sectionTitle1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F6EFBD',
    flexDirection:'row-reverse',
    marginTop: -76,
    marginLeft: 19,
  },
  courseItem: {
    flexDirection: 'column',  // Same layout for all course items
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF7C0',
    color: '#727272',
    marginTop: 3,
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  courseImage: {
    width: 130,
    height: 175,
    borderRadius: 16,
    left: -75,
    top: -2,
  },
  courseTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: 140,
    marginTop: -185,
  },
  courseTitle_: {
    fontSize: 20,
    marginLeft: 65,
    top: -10
  },
  courseTitle1_: {
    fontSize: 20,
    marginLeft: 65,
    top: -12
  },
  coursePrice1: {
    fontSize: 14,
    color: '#234873',
    top: 32,
    left: 20,
  },
  coursePrice: {
    fontSize: 14,
    color: '#234873',
    top: 32,
    left: 20,
  },
  buttonText2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F6EFBD',
    top: 8,
    left: 15,
  },
  buttonText1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F6EFBD',
    top: 8,
    left: 15,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F6EFBD',
    top: 7,
    left: 15
  },
  courseUseclass1: {
    fontSize: 14,
    color: '#234873',
    top: 30,
    left: 38,
    top: 32,
  },
  courseUseclass: {
    fontSize: 14,
    color: '#234873',
    top: 30,
    left: 38,
    top: 32,
  },
  methodButton: {
    backgroundColor: '#234873',
    width: 75,
    height: 35,
    borderRadius: 19,
    top: -50,
    left: 37,
  },
  methodButton1: {
    backgroundColor: '#234873',
    width: 75,
    height: 35,
    borderRadius: 19,
    top: -50,
    left: 37,
  },
  buyButton: {
    backgroundColor: '#5C88C4',
    borderRadius: 10,
    width: 60,
    height: 34,
    left: 112,


  },

  // Add selectedItem style for highlighting the selected item
  selectedItem: {
    borderWidth: 2,
    borderColor: '#234873',
  },
  logoutButton: {
    backgroundColor: '#F6EFBD',
    width: 70,
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    top: -600,
    left: 290,
  },
  logoutIcon: {
    color: '#888',
    fontSize: 40,
    fontWeight: 'bold',
    top: 5,
    left: -5
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF7C0',
    fontSize: 14,
    color: '#727272',
    marginLeft: 120,
    marginVertical:-20,
    height: 35,
    width: 120,
    borderRadius: 10,
    top: -30
  },
  navigationItem: {
    tintColor: '#234873',
    height: 20,
    width: 50,
    top: 6,
    left: 5,
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