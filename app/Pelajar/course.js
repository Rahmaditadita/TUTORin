import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EmptyCourseScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Judul Kursus */}
      <Text style={styles.title}>Kursus Anda</Text>
      
      {/* Deskripsi atau informasi tentang kursus */}
      <Text style={styles.description}>Saat ini Anda belum mengikuti kursus apapun.</Text>

      {/* Tombol untuk mencari kursus */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('search')}
      >
        <Text style={styles.buttonText}>Cari Kursus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmptyCourseScreen;
