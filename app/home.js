import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import hook

const GenderSelectionScreen = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigation = useNavigation(); // Inisialisasi hook navigation

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleNext = () => {
    if (selectedGender) {
      // Logika untuk melanjutkan ke layar berikutnya
      navigation.navigate('NextScreen'); // Ganti 'NextScreen' dengan nama layar berikutnya
    } else {
      alert('Please select your gender first!'); // Tampilkan peringatan jika gender belum dipilih
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your gender</Text>

      <View style={styles.genderOptions}>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'male' && styles.selected]}
          onPress={() => handleGenderSelection('male')}
        >
          <Image source={require('./app/assets/male.png')} style={styles.navigationItemIcon} />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'female' && styles.selected]}
          onPress={() => handleGenderSelection('female')}
        >
          <Image source={require('./app/assets/female.png')} style={styles.navigationItemIcon} />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6EFBD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  genderButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: 150,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#FFD7D7',
  },
  genderText: {
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GenderSelectionScreen;
