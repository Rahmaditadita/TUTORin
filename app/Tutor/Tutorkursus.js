import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Sampel awal kursus yang diajarkan
const initialCourses = [
  {
    category: 'Scisos',
    title: 'Biology',
    image: require('../assets/bio.png'),
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
    if (course.title === 'Biology') {
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
            <ImageBackground
              source={course.image}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.textContainer}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.category}>{course.category}</Text>
                </View>
                <Text style={styles.title}>{course.title}</Text>
              </View>
            </ImageBackground>
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
    backgroundColor: '#FBF3BC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#FBF3BC',
    elevation: 3, // Shadow for header
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234873',
    marginLeft: 10,
    marginTop: 1,
  },
  scrollContent: {
    paddingTop: 10, // Adds space below the header
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden', // To keep the image inside the card bounds
    elevation: 5, // For Android
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 20, // Radius for image corners
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#234873',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
  },
});

export default Tutorkursus;