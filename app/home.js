import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const HomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');

  const handleCategorySelection = (category) => setSelectedCategory(category);
  const handleCourseSelection = (course) => setSelectedCourse(course);
  const handleSearchChange = (text) => setSearchQuery(text);

  // Fungsi untuk navigasi ke Fiturkursus
  const handleSeeAll = () => {
    console.log("Tombol See All ditekan");
    navigation.navigate('Fiturkursus'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangle} />

      {/* Kolom Pencarian */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Courses..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      </View>

      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>Hello, {username}!</Text>
        <Text style={styles.subGreeting}>Let's start Learning</Text>
      </View>

      {/* Explore Category */}
      <Text style={[styles.sectionTitle, { zIndex: 1 }]}>Explore Category</Text>
      <View style={[styles.categoryContainer, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem, selectedCategory === 'science' && styles.selectedItem]}
          onPress={() => handleCategorySelection('science')}>
          <Image source={require('./assets/ipa.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Science</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryContainer, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem, selectedCategory === 'Language' && styles.selectedItem1]}
          onPress={() => handleCategorySelection('Language')}>
          <Image source={require('./assets/language.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Language</Text>
        </TouchableOpacity>
      </View>

      {/* Container terpisah untuk Arts */}
      <View style={[styles.categoryContainer2, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem2, selectedCategory === 'Arts' && styles.selectedItem]}
          onPress={() => handleCategorySelection('Arts')}>
          <Image source={require('./assets/arts.png')} style={styles.categoryImage1} />
          <Text style={styles.categoryText1}>Arts</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Courses */}
      <Text style={[styles.sectionTitle1, { zIndex: 1 }]}>Featured Courses</Text>
      <TouchableOpacity onPress={handleSeeAll}>
        <Text style={[styles.sectionTitle2, { zIndex: 1 }]}>see all</Text>
      </TouchableOpacity>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.courseContainer}>
          <TouchableOpacity
            style={[styles.courseItem, selectedCourse === 'science' && styles.selectedItem]}
            onPress={() => handleCourseSelection('science')}>
            <Image source={require('./assets/bio.png')} style={styles.courseImage} />
            <Text style={styles.courseTitle}>Science</Text>
            <Text style={[styles.courseTitle_, { fontStyle: 'italic' }]}>Biology</Text>
            <Text style={styles.coursePrice}>30.000 - 85.000</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.courseContainer}>
          <TouchableOpacity
            style={[styles.courseItem1, selectedCourse === 'math' && styles.selectedItem]}
            onPress={() => handleCourseSelection('math')}>
            <Image source={require('./assets/math.png')} style={styles.courseImage1} />
            <Text style={styles.courseTitle1}>Science</Text>
            <Text style={[styles.courseTitle1_1, { fontStyle: 'italic' }]}>Mathematic</Text>
            <Text style={styles.coursePrice1}>40.000 - 90.000</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
      padding: 15,
      paddingVertical: 5,
      marginTop: 140,
      marginHorizontal: 20, 
      alignItems: 'center',
      width: '87%',
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
    color: '#C7C08B',
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
    marginLeft: -174,
    marginTop: -3,
  },
    courseTitle1_1: {
      fontSize: 16,
      fontWeight: 'italic',
      color: '#234873',
      marginLeft: -180,
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
    marginVertical: 10,
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
