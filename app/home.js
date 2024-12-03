//home.js
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelection = (category) => setSelectedCategory(category);
  const handleCourseSelection = (course) => setSelectedCourse(course);
  const handleSearchChange = (text) => setSearchQuery(text);

  return (
    <View style={styles.container}>
      {/* Rectangle Background */}
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
        <Text style={styles.greeting}>Hello!!</Text>
        <Text style={styles.subGreeting}>Let's start Learning</Text>
      </View>

      {/* Explore Category */}
      <Text style={[styles.sectionTitle, { zIndex: 1 }]}>Explore Category</Text>
      <View style={[styles.categoryContainer, { zIndex: 1 }]}>
        <TouchableOpacity
          style={[styles.categoryItem2, selectedCategory === 'science' && styles.selectedItem]}
          onPress={() => handleCategorySelection('science')}>
          <Image source={require('./assets/ipa.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText}>Science</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryItem3, selectedCategory === 'Arts' && styles.selectedItem]}
          onPress={() => handleCategorySelection('Arts')}>
          <Image source={require('./assets/arts.png')} style={styles.categoryImage} />
          <Text style={styles.categoryText2}>Arts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryItem1, selectedCategory === 'Language' && styles.selectedItem1]}
          onPress={() => handleCategorySelection('Language')}>
          <Image source={require('./assets/language.png')} style={styles.categoryImage1} />
          <Text style={styles.categoryText1}>Language</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Courses */}
      <Text style={[styles.sectionTitle1, { zIndex: 1 }]}>Featured Courses</Text>
      <Text style={[styles.sectionTitle2, { zIndex: 1 }]}>see all</Text>
      <View style={[styles.courseContainer, { zIndex: 1 }]}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.courseContainer}>
            <TouchableOpacity
              style={[styles.courseItem, selectedCourse === 'science' && styles.selectedItem]}
              onPress={() => handleCourseSelection('science')}>
              <Image source={require('./assets/bio.png')} style={styles.courseImage} />
              <Text style={styles.courseTitle}>Science</Text>
              <Text style={styles.courseTitle_}>Biology</Text>
              <Text style={styles.coursePrice}>30.000 - 85.000</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.courseItem1, selectedCourse === 'math' && styles.selectedItem]}
              onPress={() => handleCourseSelection('math')}>
              <Image source={require('./assets/math.png')} style={styles.courseImage1} />
              <Text style={styles.courseTitle1}>Science</Text>
              <Text style={styles.courseTitle1_1}>Mathematics</Text>
              <Text style={styles.coursePrice1}>40.000 - 90.000</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navigationItem}>
          <Image source={require('./assets/home.png')} style={styles.navigationItemIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationItem}>
          <Image source={require('./assets/list.png')} style={styles.navigationItemIcon} />
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
    position: 'absolute',
    top: 80, // Menempatkan di atas search bar
    left: 20,
    right: 20,
    zIndex: 2, // Z-index lebih tinggi daripada search bar
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
    marginHorizontal: 17,
    marginTop: 200, // Memberi jarak dari greetingSection
    alignItems: 'center',
    zIndex: 1, // Z-index lebih rendah dari greetingSection
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#727272',
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    margin: 20,
    color: '#F6EFBD',
    position: 'absolute',
    top: 247, // Menempatkan di atas search bar
    left: 11,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  //untuk exploring
  categoryItem2: {
    width: '45%',
    height: 120,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF7C0',
    alignItems: 'center',
    position: 'absolute',
    top: 38, // Menempatkan di atas search bar
    left: 17,
  },
  categoryItem3: {
    width: '45%',
    height: 120,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF7C0',
    alignItems: 'center',
    position: 'absolute',
    top: 38, // Menempatkan di atas search bar
    left: 210,
  },
  categoryImage: {
    width: 150,
    height: 69,
    marginBottom: 10,
    borderRadius: 10, // Menambahkan border radius hanya di Explore
    position: 'absolute',
    top: 10, // Menempatkan di atas search bar
    left: 17,
  },
  categoryImage1: {
    width: 150,
    height: 69,
    marginBottom: 10,
    borderRadius: 10, // Menambahkan border radius hanya di Explore
    position: 'absolute',
    top: 10, // Menempatkan di atas search bar
    left: 17,
  },
  categoryText: {
    fontSize: 28, // Ukuran teks
    color: '#234873', // Warna teks
    marginTop: 10, // Memberi jarak antara gambar dan teks
    fontWeight: 'bold', // Menambahkan ketebalan pada teks
    position: 'absolute',
    top: 70, // Menempatkan di atas search bar
    left: 35,
  },
  categoryText2: {
    fontSize: 28, // Ukuran teks
    color: '#234873', // Warna teks
    marginTop: 10, // Memberi jarak antara gambar dan teks
    fontWeight: 'bold', // Menambahkan ketebalan pada teks
    position: 'absolute',
    top: 70, // Menempatkan di atas search bar
    left: 68,
  },
  selectedItem: {
    backgroundColor: '#FFD7D7',
  },
  categoryItem1: {
    width: '45%',
    height: 120,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF7C0',
    alignItems: 'center',
    marginTop: 10,
    marginVertical: 5,
    position: 'absolute',
    top: 160, // Menempatkan di atas search bar
    left: 17,
  },
  categoryText1: {
    fontSize: 28, // Ukuran teks
    color: '#234873', // Warna teks
    marginTop: 10, // Memberi jarak antara gambar dan teks
    fontWeight: 'bold', // Menambahkan ketebalan pada teks
    position: 'absolute',
    top: 70, // Menempatkan di atas search bar
    left: 35,
  },
  selectedItem1: {
    backgroundColor: '#FFD7D7',
  },
  //untuk featured
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sectionTitle1: {
    fontSize: 23,
    fontWeight: 'bold',
    margin: 100,
    color: '#F6EFBD',
    top: 187,
    left: -80,
  },
    sectionTitle2: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    color: '#F6EFBD',
    position: 'fixed',
    top: 40, // Menempatkan di atas search bar
    left: 315,
  },
  courseItem: {
    width: '43%',
    height: 200,
    padding: 10,
    paddingHorizontal: 20, 
    borderRadius: 10,
    backgroundColor: '#FFF7C0',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 160, // Memberi jarak dari greetingSection
    position: 'fixed',
    top: -150, // Menempatkan di atas search bar
    left: -2,
  },
    courseItem1: {
    width: '43%',
    height: 200,
    padding: 10,
    paddingHorizontal: 20, 
    borderRadius: 10,
    backgroundColor: '#FFF7C0',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 160, // Memberi jarak dari greetingSection
    position: 'fixed',
    top: -150, // Menempatkan di atas search bar
    left: -10,
  },
    courseImage: {
    width: 260,
    height: 110,
    marginBottom: 10,
    borderRadius: 13,
    position: 'fixed',
    top: 5, // Menempatkan di atas search bar
    left: 1,
  },
    courseImage1: {
    width: 260,
    height: 110,
    marginBottom: 5,
    borderRadius: 13,
    position: 'fixed',
    top: 5, // Menempatkan di atas search bar
    left: 1,
  },
  courseTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    top: -6,
    left:-74,
    color: '#234873',
    position: 'fixed',
  },
  courseTitle_: {
    fontSize: 24,
    fontWeight: 'bold',
    top: -10,
    left: -87,
    color: '#234873',
    position: 'fixed',
  },
    coursePrice: {
    position: 'fixed',
    fontSize: 14,
    color: '#234873',
    top: -32,
    left: 80,
  },
    courseTitle1: {
    position: 'fixed',
    fontSize: 30,
    fontWeight: 'bold',
    top: -3,
    left: -74,
    color: '#234873'
  },
    courseTitle1_1: {
    position: 'fixed',
    fontWeight: 'bold',
    fontSize: 24 ,
    top: -4,
    left: -57,
    color: '#234873'
  },
  coursePrice1: {
    position: 'fixed',
    fontSize: 14,
    color: '#727272',
    top: -26,
    left: 80,
  },
  bottomNavigation: {
    // position: 'absolute',
    // top: 900, // Menempatkan di atas search bar
    // left: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FFF7C0',
    marginVertical: 60,
    marginTop: -100,
    position: 'fixed',
    fontSize: 14,
    color: '#727272',
    top: -50,
    left: 0,
  },
  navigationItemIcon: {
    width: 25,
    height: 25,
  },
   rectangle: {
    position: 'absolute',
    // top: 900, // Menempatkan di atas search bar
    left: 0, 
    width: '100%',
    height: 1000, // Disesuaikan agar tidak menutupi seluruh layar
    backgroundColor: '#234873',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // position1: 'absolute',
    marginVertical: 100,
    marginTop: 230,
    top: 0,
    zIndex: 0,
  },
});

export default HomeScreen;
