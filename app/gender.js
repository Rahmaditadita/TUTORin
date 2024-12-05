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
    backgroundColor: '#FACDB7',
    borderRadius: 50,
    padding: 20,
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: 120,
    alignItems: 'center',
    marginBottom: 4,
    marginRight: 7,
  },
  selected: {
    backgroundColor: '#FFD7D7',
  },
  genderText: {
    fontSize: 16,
    paddingVertical: 10,
  },
  nextButton: {
    backgroundColor: '#234873',
    padding: 20,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 30,
    marginVertical: 20,
  },
  nextButtonText: {
    color: '#F6EFBD',
    fontWeight: 'bold',
  },
});

export default GenderSelectionScreen;