//featired.js
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Impor ikon panah

const courses = [
  {
    category: 'Science',
    title: 'Biology',
    price: '30.000 - 85.000',
    image: require('../app/assets/bio.png'), // Gambar lokal
  },
  {
    category: 'Science',
    title: 'Mathematics',
    price: '30.000 - 85.000',
    image: require('../app/assets/math.png'), // Gambar lokal
  },
  {
    category: 'Language',
    title: 'Mandarin',
    price: '25.000 - 70.000',
    image: require('../app/assets/mandarin.png'), // Gambar lokal
  },
  {
    category: 'Science',
    title: 'History',
    price: '25.000 - 70.000',
    image: require('../app/assets/history.png'), // Gambar lokal
  },
  {
    category: 'Arts',
    title: 'Piano',
    price: '25.000 - 70.000',
    image: require('../app/assets/piano.png'), // Gambar lokal
  },
];

const Fiturkursus = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          {/* Ikon panah */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#234873" />
          </TouchableOpacity>
          <Text style={styles.header}>Featured Courses</Text>
        </View>
        {courses.map((course, index) => (
          <View key={index} style={styles.card}>
            <ImageBackground
              source={course.image}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay} />
              <View style={styles.textContainer}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>{course.category}</Text>
                </View>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.price}>{course.price}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3BC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginLeft: 20,
    position: 'fixed',
    top: 30, // Menempatkan di atas search bar
    left: -5,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: 10,
  },
  card: {
    position: 'fixed',
    top: 20, // Menempatkan di atas search bar
    left: 0,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden', // Agar gambar tidak keluar dari radius
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Untuk Android
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 10, // Radius untuk gambar
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Efek overlay hitam transparan
    borderRadius: 10,
  },
  textContainer: {
    padding: 15,
  },
  categoryContainer: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#234873',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  price: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
});

export default Fiturkursus;
