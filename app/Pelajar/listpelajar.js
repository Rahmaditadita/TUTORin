import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Pastikan sudah menginstall react-native-vector-icons

const courses = [
  {
    id: '1',
    title: 'Biology',
    lessons: '6/10 lessons',
    progress: '40%',
    kelas: 7,
    image: require('../assets/bio.png'),
    screen: 'videoBio',
  },
  {
    id: '2',
    title: 'Mathematics',
    lessons: '5/10 lessons',
    progress: '90%',
    kelas: 7, 
    image: require('../assets/math.png'),
    screen: 'MathVideo',
  },
  {
    id: '3',
    title: 'English',
    lessons: '6/10 lessons',
    progress: '80%',
    kelas: 7,
    image: require('../assets/inggris.png'),
    screen: 'EnglishVideo',
  },
];



// Komponen untuk menampilkan daftar kursus
const MyCourses = ({ navigation }) => {
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity style={styles.courseContainer} onPress={() => handlePress(item.screen)}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseLessons}>{item.lessons}</Text>
        <Text style={styles.coursekelas}>{item.kelas}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: item.progress }]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.headerTitle}>My Courses</Text>
      </View>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

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
    </SafeAreaView>
  );
};

// Style untuk komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282A64',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseContainer: {
    backgroundColor: '#F6EFBD',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    
  },
  header: {
    width: '100%',
    padding: 16,
    backgroundColor: '#282A64',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    top: 30
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF7C0',
  },
  courseImage: {
    width: '103%',
    height: 120,
    resizeMode: 'cover',
    left: -3,
    top: -1
  },
  courseContent: {
    padding: 16,
    width: 300,
    height: 120,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  coursekelas: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  courseLessons: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },

  // Styles for Bottom Navigation
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF7C0',
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
    marginVertical: -20,
    height: 35,
    width: 120,
    borderRadius: 10,
    top: -30,
  },
  navigationItem: {
    tintColor: '#888',
    height: 20,
    width: 50,
    top: 6,
    left: 13,
  },
  searchIcon: {
    color: '#234873',
  },
});

export default MyCourses;
