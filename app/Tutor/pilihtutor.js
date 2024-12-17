import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, ImageBackground, Modal, TextInput } from 'react-native';

export default function PilihTutor({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');

  const availableCourses = [
    {
      id: '6',
      title: 'History',
      category: 'Scisos',
      image: require('../assets/history.png'),
    },
    {
      id: '7',
      title: 'English',
      category: 'Language',
      image: require('../assets/inggris.png'),
    },
    {
      id: '8',
      title: 'IPA',
      category: 'Scisos',
      image: require('../assets/ipa.png'),
    },
    {
      id: '9',
      title: 'Chemistry',
      category: 'Scisos',
      image: require('../assets/kimia.png'),
    },
    {
      id: '10',
      title: 'Mathematics',
      category: 'Math',
      image: require('../assets/math.png'),
    },
  ];

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setModalVisible(true); // Show modal to input course details
  };

  const handleAddCourse = () => {
    setModalVisible(false);
    navigation.navigate('Tutorkursus', {
      newCourse: {
        id: selectedCourse.id,
        title: title || selectedCourse.title, // Use input title or default
        category: selectedCourse.category,
        image: selectedCourse.image,
        price,
        description,
        details: details.split(',').map((item) => item.trim()), // Convert details to array
      },
    });
    setTitle(''); // Reset title input
    setPrice(''); // Reset price input
    setDescription(''); // Reset description input
    setDetails(''); // Reset details input
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Choose a Course</Text>
      </View>

      <FlatList
        data={availableCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <ImageBackground
              source={item.image}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.textContainer}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => handleSelectCourse(item)}
                >
                  <Text style={styles.selectButtonText}>Add to {item.category}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Details for {selectedCourse?.title}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              value={description}
              onChangeText={setDescription}
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
            <TextInput
              style={styles.input}
              placeholder="Enter course details (comma-separated)"
              value={details}
              onChangeText={setDetails}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddCourse}>
              <Text style={styles.addButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF3BC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FBF3BC',
    elevation: 3,
  },
  backArrow: {
    fontSize: 24,
    color: '#234873',
    marginRight: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#234873',
  },
  listContainer: {
    padding: 20,
  },
  courseCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  selectButton: {
    backgroundColor: '#234873',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234873',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#234873',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#234873',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#234873',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
