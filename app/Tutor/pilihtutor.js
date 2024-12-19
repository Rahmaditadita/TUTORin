import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ImageBackground } from 'react-native';
import { getFirestore, collection, addDoc, setDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseApp, firestore } from '../service/firebaseconfig'; // Pastikan konfigurasi Firebase kamu ada di sini

const db = getFirestore(firebaseApp);
const auth = getAuth();

export default function PilihTutor({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [privateOption, setPrivateOption] = useState([]); // To store selected private options
  const [durationOption, setDurationOption] = useState([]); // To store selected session durations
  const [scheduleOption, setScheduleOption] = useState([]); // To store selected schedule options
  const [freeSessionOption, setFreeSessionOption] = useState([]); // To store selected free session options

  const availableCourses = [
    { id: '6', title: 'History', category: 'Scisos', image: require('../assets/history.png') },
    { id: '7', title: 'English', category: 'Language', image: require('../assets/inggris.png') },
    { id: '8', title: 'Biology', category: 'Scisos', image: require('../assets/ipa.png') },
    { id: '9', title: 'Chemistry', category: 'Scisos', image: require('../assets/kimia.png') },
    { id: '10', title: 'Mathematics', category: 'Math', image: require('../assets/math.png') },
  ];

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const handleAddCourse = async () => {
    try {
      // Ambil ID user yang sedang login (atau ID yang sesuai)
      const userId = auth.currentUser?.uid;

      // Menambahkan data course baru ke Firestore dengan ID unik
      const tutorRef = collection(firestore, 'Users', 'Tutor', 'matpel');  // Koleksi yang menyimpan data kursus
      const setDoc = await addDoc(tutorRef, {
        tutorId: userId,  // ID user yang menambahkan tutor
        courseId: selectedCourse.id,
        title: title || selectedCourse.title,
        category: selectedCourse.category,
        image: selectedCourse.image,
        price,
        description,
        privateOption,
        durationOption,
        scheduleOption,
        freeSessionOption,
      });

      setModalVisible(false);
      navigation.navigate('Tutorkursus');

      // Reset form setelah menyimpan
      setTitle('');
      setPrice('');
      setDescription('');
      setPrivateOption([]);
      setDurationOption([]);
      setScheduleOption([]);
      setFreeSessionOption([]);
    } catch (error) {
      console.error('Error adding course to Firestore: ', error);
    }
  };

  const toggleOption = (optionArray, setOptionArray, optionValue) => {
    if (optionArray.includes(optionValue)) {
      setOptionArray(optionArray.filter(item => item !== optionValue));
    } else {
      setOptionArray([...optionArray, optionValue]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Choose a Course</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {availableCourses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <ImageBackground source={course.image} style={styles.image} imageStyle={styles.imageStyle}>
              <View style={styles.textContainer}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <TouchableOpacity style={styles.selectButton} onPress={() => handleSelectCourse(course)}>
                  <Text style={styles.selectButtonText}>Add to {course.category}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      <Modal 
        animationType="slide" 
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Details for {selectedCourse?.title}</Text>

            {/* Scrollable content container */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <TextInput 
                style={styles.input} 
                placeholder="Enter title" 
                value={title} 
                onChangeText={setTitle} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Enter price" 
                keyboardType="numeric" 
                value={price} 
                onChangeText={setPrice} 
              />
              <TextInput 
                style={styles.input} 
                placeholder="Enter description" 
                value={description} 
                onChangeText={setDescription} 
              />

              {/* Scrollable Options Section */}
              <View style={styles.scrollableOptions}>
                {/* Private Option */}
                <Text style={styles.optionTitle}>Private:</Text>
                <View style={styles.buttonContainer}>
                  {[1, 2, 3].map((option) => (
                    <TouchableOpacity 
                      key={option} 
                      style={[styles.optionButton, privateOption.includes(option) && styles.selectedOptionButton]} 
                      onPress={() => toggleOption(privateOption, setPrivateOption, option)}
                    >
                      <Text style={styles.optionButtonText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Duration Option */}
                <Text style={styles.optionTitle}>Session Duration:</Text>
                <View style={styles.buttonContainer}>
                  {[120, 60, 180].map((duration) => (
                    <TouchableOpacity 
                      key={duration} 
                      style={[styles.optionButton, durationOption.includes(duration) && styles.selectedOptionButton]} 
                      onPress={() => toggleOption(durationOption, setDurationOption, duration)}
                    >
                      <Text style={styles.optionButtonText}>{duration} minutes</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Schedule Option */}
                <Text style={styles.optionTitle}>Schedule:</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.optionButton, scheduleOption.includes('Atur Jadwal') && styles.selectedOptionButton]} 
                    onPress={() => toggleOption(scheduleOption, setScheduleOption, 'Atur Jadwal')}
                  >
                    <Text style={styles.optionButtonText}>Atur Jadwal</Text>
                  </TouchableOpacity>
                </View>

                {/* Free Session Option */}
                <Text style={styles.optionTitle}>Bebas Atur Sesi:</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.optionButton, freeSessionOption.includes('Bebas Atur Sesi') && styles.selectedOptionButton]} 
                    onPress={() => toggleOption(freeSessionOption, setFreeSessionOption, 'Bebas Atur Sesi')}
                  >
                    <Text style={styles.optionButtonText}>Bebas Atur Sesi</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Buttons outside the ScrollView */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
                  <Text style={styles.addButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6EFBD' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backArrow: { fontSize: 30, color: '#000' },
  header: { fontSize: 24, fontWeight: 'bold', marginLeft: 10 },
  scrollContent: { paddingBottom: 20 },
  courseCard: { marginBottom: 20, borderRadius: 10, overflow: 'hidden' },
  image: { width: '100%', height: 200 },
  imageStyle: { borderRadius: 10 },
  textContainer: { flex: 1, justifyContent: 'flex-end', padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  courseTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  selectButton: { padding: 10, backgroundColor: '#FF6347', marginTop: 10, borderRadius: 5 },
  selectButtonText: { color: '#fff', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
  optionTitle: { fontSize: 16, marginVertical: 10, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  optionButton: { padding: 10, backgroundColor: '#f0f0f0', margin: 5, borderRadius: 5 },
  selectedOptionButton: { backgroundColor: '#FF6347' },
  optionButtonText: { color: '#000', fontSize: 14 },
  addButton: { padding: 15, backgroundColor: '#4CAF50', borderRadius: 5, width: '100%', marginTop: 20 },
  addButtonText: { color: '#fff', textAlign: 'center', fontSize: 18 },
  cancelButton: { padding: 15, backgroundColor: '#f44336', borderRadius: 5, width: '100%', marginTop: 10 },
  cancelButtonText: { color: '#fff', textAlign: 'center', fontSize: 18 },
});
