import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';


const HomePage = ({ onLogout }) => {
  const [profile, setProfile] = useState({
    name: 'Hanna',
    bio: 'Hello, I am Hanna.',
    rating: 4.5,
    money: 1000000,
  });
  const [courses, setCourses] = useState([]); // State untuk menyimpan kursus yang dibeli
  const [bioInput, setBioInput] = useState(profile.bio);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const navigation = useNavigation();

  const addCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setProfile((prevProfile) => ({
      ...prevProfile,
      money: prevProfile.money + newCourse.amount, // Tambahkan jumlah uang yang diterima
    }));
  };

  const saveBio = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      bio: bioInput,
    }));
    setIsEditingBio(false);
  };

  const handleLogout = () => {
    // Setelah logout, navigasi ke ManageQuis
    // navigation.navigate('manageQuiz', { lesson: 'Lesson 1' });
    navigation.navigate('Tutorkursus');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image
          source={require('../assets/putri.png')} // Ganti dengan path gambar avatar yang benar
        />
        <Text style={styles.name}>{profile.name}</Text>
        {isEditingBio ? (
          <TextInput
            style={styles.bioInput}
            value={bioInput}
            onChangeText={setBioInput}
            placeholder="Edit your bio"
          />
        ) : (
          <Text style={styles.bio}>{profile.bio}</Text>
        )}
        <Text style={styles.rating}>Rating: {profile.rating}</Text>
        <Text style={styles.money}>Money: ${profile.money}</Text>
      </View>
      <View style={styles.coursesSection}>
        <Text style={styles.sectionTitle}>Courses</Text>
        {courses.map((course, index) => (
          <Card key={index}>
            <Card.Title>{course.name}</Card.Title>
            <Card.Divider />
            <Text>Amount: ${course.amount}</Text>
            <Text>Method: {course.learningMethod}</Text>
            <Text>Session Time: {course.sessionTime}</Text>
          </Card>
        ))}
      </View>
      <Button title="Logout" onPress={handleLogout} buttonStyle={styles.logoutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: 'gray',
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    marginVertical: 10,
  },
  rating: {
    fontSize: 16,
    marginVertical: 5,
  },
  money: {
    fontSize: 16,
    marginVertical: 5,
  },
  coursesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
 marginTop: 20,
  },
});

export default HomePage;