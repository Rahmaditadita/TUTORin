import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomePage = ({ onLogout }) => {
  const [profile, setProfile] = useState({
    name: 'Sekar',
    bio: 'tutors teaching spirit.',
    description: 'I am a passionate mentor with over 5 years of experience in the field. I love sharing knowledge and helping others achieve their goals.',
    rating: 4.5,
    money: 1000000,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(profile.description);

  const [students, setStudents] = useState([
    { id: '1', name: 'Budi', course: 'Mathematics' },
    { id: '2', name: 'Siti', course: 'Physics' },
  ]);

  const navigation = useNavigation();

  const handleCoursesNavigation = () => {
    navigation.navigate('Tutorkursus'); // Pastikan "Tutorkursus" adalah nama route yang benar di navigasi
  };

  const handleLogout = () => {
    onLogout();
    navigation.navigate('logintutor'); // Arahkan kembali ke halaman Login
  };

  const handleEditDescription = () => {
    setIsEditing(true);
  };

  const handleSaveDescription = () => {
    setProfile({ ...profile, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={require('../assets/intan.png')} style={styles.image} />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={[styles.bio, { fontStyle: 'italic' }]}>{profile.bio}</Text>
          {/* Info Row for Rating and Money as Buttons */}
          <View style={styles.infoRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Rating: {profile.rating}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Money: ${profile.money}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionContainer}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.textInput}
                  value={editedDescription}
                  onChangeText={setEditedDescription}
                  multiline
                />
                <Button title="Save" onPress={handleSaveDescription} />
              </View>
            ) : (
              <View style={styles.descriptionRow}>
                <Text style={styles.description}>{profile.description}</Text>
                <TouchableOpacity onPress={handleEditDescription}>
                  <Icon name="edit" size={20} color="blue" style={styles.editIcon} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.coursesSection}>
          <Text style={styles.sectionTitle}>Courses</Text>
          <TouchableOpacity onPress={handleCoursesNavigation} style={styles.coursesButton}>
            <Text style={styles.coursesButtonText}>View and Add Courses</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.studentsSection}>
          <Text style={styles.sectionTitle}>Students to Teach</Text>
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card>
                <Card.Title>{item.name}</Card.Title>
                <Card.Divider />
                <Text>Course: {item.course}</Text>
              </Card>
            )}
          />
        </View>

        <Button title="Logout" onPress={handleLogout} color="red" style={styles.logoutButton} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#234873' },
  header: { alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 30, fontWeight: 'bold', color: '#F6EFBD', top: -90 },
  bio: { fontSize: 20, color: '#FFF7C0', fontStyle: 'italic', top: -95, left: 54},
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    top: 22,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoRow: { 
    flexDirection: 'row',               
    justifyContent: 'space-between',
    width: '100%',
    height: 60,                      
    marginTop: 10,                      
  },
  coursesSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#F6EFBD', top: -57},
  coursesButton: { backgroundColor: '#4CAF50', padding: 15, alignItems: 'center', borderRadius: 5, top: -53 },
  coursesButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  studentsSection: { marginBottom: 20 },
  logoutButton: { marginTop: 20 },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginLeft: -200,
    marginTop: 30,
  },
  studentsSection: {
    marginBottom: 20,
    color: '#F6EFBD',
  },
  studentCard: {
    backgroundColor: '#F6EFBD',
    marginBottom: 10,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',  // Menambahkan bayangan
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,  // Untuk efek bayangan pada Android
  },

  // Styling untuk Judul dalam Card (Nama Siswa)
  studentCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234873',
  },

  // Styling untuk Deskripsi dalam Card (Kursus)
  studentCardDescription: {
    fontSize: 14,
    color: '#F6EFBD',
    marginTop: 5,
  },
  descriptionContainer: { marginTop: 10, alignItems: 'center', paddingHorizontal: 10 },
  descriptionRow: { flexDirection: 'row', alignItems: 'center' },
  description: { fontSize: 16, color: 'white', marginRight: 10, top: -140},
  editIcon: { marginLeft: 10, color: '#FFF7C0',top: -145,},
  editContainer: { alignItems: 'center', width: '100%', },
  textInput: { width: '90%', borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10, backgroundColor: 'white', marginBottom: 10},
});

export default HomePage;
