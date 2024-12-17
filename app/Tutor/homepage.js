import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { firestore, auth } from '../service/firebaseconfig';

const HomePage = ({ onLogout }) => {
  const [profile, setProfile] = useState({
    bio: 'tutors teaching spirit.',
    description: 'I am a passionate mentor with over 5 years of experience in the field. I love sharing knowledge and helping others achieve their goals.',
    rating: 4.5,
    money: 1000000,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('User');
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
    saveMentorDescription();
  };

  const handleCoursePurchase = (paymentAmount) => {
    processPayment(paymentAmount);  // Misalnya paymentAmount = 100000
  };
  

  const processPayment = async (paymentAmount) => {
    try {
      // Mengambil dokumen tutor dari Firestore
      const tutorDocRef = doc(firestore, 'Users', 'Tutor', 'Payments', 'userpelajar'); // Pastikan ID dan path koleksi sudah benar
      const tutorDoc = await getDoc(tutorDocRef);
  
      if (tutorDoc.exists()) {
        // Ambil data profil tutor
        const tutorData = tutorDoc.data();
        const newMoneyAmount = tutorData.money + paymentAmount;
  
        // Update 'money' di dokumen tutor
        await setDoc(tutorDocRef, { money: newMoneyAmount }, { merge: true });
  
        // Update state profil dengan uang terbaru
        setProfile((prevProfile) => ({
          ...prevProfile,  // Menyalin data profil sebelumnya
          money: newMoneyAmount,  // Menambahkan uang baru ke state profil
        }));
  
        console.log('Payment processed successfully');
      } else {
        console.log('Tutor document not found');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  
  
  // Ambil deskripsi mentor dari Firestore
  const fetchMentorDescription = async () => {
    const mentorDocRef = doc(firestore, 'Users', 'Tutor', 'Courses', 'deskripsi'); // Pastikan ID yang benar digunakan
    const mentorDoc = await getDoc(mentorDocRef);
    
    if (mentorDoc.exists()) {
      const data = mentorDoc.data();
      setEditDescription(data.description || ''); // Mengatur deskripsi yang akan diedit
      setProfile({ ...profile, description: data.description || 'No description available' }); // Update state profile
    } else {
      console.log('No such document!');
    }
  };

  // Simpan deskripsi mentor ke Firestore
  const saveMentorDescription = async () => {
    try {
      const mentorDocRef = doc(firestore, 'Users', 'Tutor', 'Courses', 'deskripsi' ); // Ganti 'mentor_user_id' dengan ID yang sesuai
      await setDoc(mentorDocRef, {
        description: editDescription, // Deskripsi baru yang di-edit
      }, { merge: true }); // Menggunakan merge agar data yang ada tetap terjaga
  
      setProfile({ ...profile, description: editDescription }); // Update state profile
      setIsEditing(false); // Setelah disimpan, kembali ke mode tampilan
    } catch (error) {
      console.error('Error saving description:', error);
    }
  };

  // Ambil deskripsi saat komponen pertama kali dimuat
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
useEffect(() => {
  fetchMentorDescription();
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
              navigation.navigate('logintutor'); // Navigasi ke layar login
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to log out. Please try again.');
            }
          }
        }
      ]
    );
  };
  

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>Hello, {firstName || username}!</Text>
            <Text style={styles.subGreeting}>tutors teaching spirit.</Text>
          </View>
          {/* Info Row for Rating and Money as Buttons */}
          <View style={styles.infoRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Rating: {profile.rating}</Text>
            </TouchableOpacity>
            // Menambahkan tombol pembelian kursus atau transaksi pembayaran
          <TouchableOpacity style={styles.button} onPress={() => handleCoursePurchase(100000)}>
             <Text style={styles.buttonText}>Money: ${profile.money}</Text>
          </TouchableOpacity>

          </View>

          <View style={styles.descriptionContainer}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.textInput}
                  value={editDescription}
                  onChangeText={setEditDescription}
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

        <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleout} // Tetap menjalankan fungsi logout
              >
              <Icon name="sign-out" size={30} color="#888" style={styles.logoutIcon} />
        </TouchableOpacity>

        <View style={styles.studentsSection}>
          <Text style={styles.sectionTitle}>Students to Teach</Text>
          {students.map((item) => (
            <Card key={item.id}>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider />
            <Text>Course: {item.course}</Text>
          </Card>
        ))}
      </View>
        <Button title="Logout" onPress={handleLogout} color="red" style={styles.logoutButton} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#234873' },
  header: { alignItems: 'center', marginBottom: 20 },
  greetingSection: {
    marginTop: 7,
    marginHorizontal: 20,
    marginLeft: 2,
    zIndex: 2,
  },
  greeting: {
    fontSize: 25,
    color: '#F6EFBD',
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 30,
    color: '#F6EFBD',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
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
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#F6EFBD', top: 10},
  coursesButton: { backgroundColor: '#4CAF50', padding: 15, alignItems: 'center', borderRadius: 5, top: 13 },
  coursesButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  studentsSection: { marginBottom: 20 },
  logoutButton: { marginTop: 20 },
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
  descriptionContainer: { marginTop: 10, alignItems: 'center', paddingHorizontal: 10 },
  descriptionRow: { flexDirection: 'row', alignItems: 'center' },
  description: { fontSize: 10, color: 'white', marginRight: -80, marginTop: -140},
  editIcon: { marginLeft: 137, color: '#FFF7C0',marginTop: -80,},
  editContainer: { alignItems: 'center', width: '100%', },
  textInput: { width: '90%', borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10, backgroundColor: 'white', marginBottom: 10},
});

export default HomePage;
