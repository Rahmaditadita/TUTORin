import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const GenderSelectionScreen = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your gender</Text>

      <View style={styles.genderOptions}>
        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'male' && styles.selected]}
          onPress={() => handleGenderSelection('male')}
        >
          <Image source={require('./assets/male.png')} style={styles.navigationItemIcon} />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderButton, selectedGender === 'female' && styles.selected]}
          onPress={() => handleGenderSelection('female')}
        >
          <Image source={require('./assets/female.png')} style={styles.navigationItemIcon} />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => {
        // Add logic to proceed to the next screen
        console.log('Gender selected:', selectedGender);
      }}>
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
  // genderImage: {
  //   width: 50,
  //   height: 50,
  //   marginBottom: 10,
  // }, // This style is now used
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