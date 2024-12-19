import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firestore } from '../service/firebaseconfig';
import { collection, getDocs, doc } from 'firebase/firestore'; // impor fungsi untuk mengambil data

const Tutorkursus = ({ navigation, route }) => {
  const [tutorCourses, setTutorCourses] = useState([]);

  // Ambil data kursus dari Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Mengakses subcollection 'matpel' di dalam dokumen 'Tutor' yang ada di koleksi 'Users'
        const coursesRef = collection(firestore, 'Users', 'Tutor', 'matpel');
        const querySnapshot = await getDocs(coursesRef); // Mengambil semua dokumen di subcollection matpel
        
        if (!querySnapshot.empty) {
          const courseData = querySnapshot.docs.map(doc => doc.data()); // Menyusun data kursus dari dokumen yang ditemukan
          setTutorCourses(courseData); // Menyimpan data kursus ke state
        } else {
          console.log('No courses found in matpel!');
        }
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };
    

    fetchCourses();
  }, []); // Kosongkan array dependency agar hanya dieksekusi sekali saat komponen dimuat

  // Menambahkan kursus baru dari halaman PilihTutor
  useEffect(() => {
    if (route.params?.newCourse) {
      setTutorCourses((prevCourses) => [...prevCourses, route.params.newCourse]);
    }
  }, [route.params?.newCourse]);

  const handleAddCourse = () => {
    navigation.navigate('pilihtutor', { onAddCourse: setTutorCourses });
  };

  const handleCoursePress = (course) => {
    // Arahkan ke halaman 'Videotutor' untuk semua kursus
    navigation.navigate('Videotutor', { courseId: course.id }); // Menambahkan parameter untuk memudahkan pengelolaan kursus di halaman Videotutor
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
        {tutorCourses.length === 0 ? (
          <Text style={styles.noCoursesText}>No courses available</Text>
        ) : (
          tutorCourses.map((course, index) => (
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
          ))
        )}
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
    marginTop: 30,
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
  noCoursesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#234873',
    marginTop: 20,
  },
});

export default Tutorkursus;
