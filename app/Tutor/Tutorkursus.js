import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Sampel awal kursus yang diajarkan
const initialCourses = [
  {
    category: 'Scisos',
    title: 'Biology Mastery Pack',
    price: '75000',
    rating: '4.9 (100 Reviews)',
    description: 'Coba paket ini dan temukan cara mudah belajar biologi!',
    details: [
      '3 sesi privat',
      '120 menit per sesi',
      'Bebas atur jadwal',
      'Bebas atur sesi'
    ],
  },
];

const Tutorkursus = ({ navigation, route }) => {
  const [tutorCourses, setTutorCourses] = useState(initialCourses);

  // Handle tambahan kursus baru
  React.useEffect(() => {
    if (route.params?.newCourse) {
      setTutorCourses((prevCourses) => [...prevCourses, route.params.newCourse]);
    }
  }, [route.params?.newCourse]);

  const handleAddCourse = () => {
    navigation.navigate('pilihtutor', { onAddCourse: setTutorCourses }); // Navigasi ke layar tambah kursus
  };

  const handleCoursePress = (course) => {
    if (course.title === 'Biology Mastery Pack') {
      navigation.navigate('Videotutor'); // Navigasi ke screen videokuistutor
    }
    // Anda bisa menambahkan navigasi untuk kursus lain di sini
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#234873" />
        </TouchableOpacity>
        <Text style={styles.header}>Courses You Teach</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {tutorCourses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCoursePress(course)}
          >
            <View style={styles.textContainer}>
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{course.category}</Text>
              </View>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseDescription}>{course.description}</Text>
              <Text style={styles.coursePrice}>{course.price}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.courseRating}>{course.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFBD',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F6EFBD',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: 10,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    top: 13,
  },
  textContainer: {
    padding: 15,
    backgroundColor: '#234873',
    borderRadius: 10,
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  category: {
    color: '#234873',
    fontSize: 12,
  },
  courseTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  courseDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
  },
  coursePrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#FFD700',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  courseRating: {
    color: '#FFD700',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#234873',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});

export default Tutorkursus;
