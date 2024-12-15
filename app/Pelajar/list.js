import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../service/firebaseconfig'; // Import your Firebase config
import { signOut, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = () => {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [username, setUsername] = useState('User'); 
  const [isLogoutPressed, setIsLogoutPressed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Ambil displayName
        const displayName = user.displayName || '';
        
        // Pisahkan nama depan dari displayName
        const firstName = displayName.split(' ')[0]; // Mengambil kata pertama sebagai nama depan
        setUsername(firstName); // Set username ke nama depan
      } else {
        setUsername(''); // Reset username jika tidak ada pengguna yang login
      }
    });
  
    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

      return (
        <SafeAreaView style={styles.container}>
    

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
      <TouchableOpacity 
        style={styles.navigationItem} 
        onPress={() => navigation.navigate('home')} // Navigasi ke layar Home
      >
      <Icon name="home" size={20} color="#888" style={styles.searchIcon} />
      </TouchableOpacity>

    {/* Tombol List Pelajar */}
      <TouchableOpacity 
       style={styles.navigationItem} 
        onPress={() => navigation.navigate('list')} // Navigasi ke layar List Pelajar
      >
      <Icon name="list" size={20} color="#888" style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6EFBD',
  },
  methodButton: {
    backgroundColor: '#234873',
    width: 75,
    height: 35,
    borderRadius: 19,
    top: -50,
    left: 37,
  },
  methodButton1: {
    backgroundColor: '#234873',
    width: 75,
    height: 35,
    borderRadius: 19,
    top: -50,
    left: 37,
  },
  buyButton: {
    backgroundColor: '#5C88C4',
    borderRadius: 10,
    width: 60,
    height: 34,
    left: 112,


  },

  // Add selectedItem style for highlighting the selected item
  selectedItem: {
    borderWidth: 2,
    borderColor: '#234873',
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
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF7C0',
    fontSize: 14,
    color: '#727272',
    marginLeft: 120,
    marginVertical:-20,
    height: 35,
    width: 120,
    borderRadius: 10,
    top: -30
  },
  navigationItem: {
    tintColor: '#234873',
    height: 20,
    width: 50,
    top: 6,
    left: 5,
  },
   rectangle: {
    position: 'absolute',
    width: '100%',
    height: 1000, // Disesuaikan agar tidak menutupi seluruh layar
    backgroundColor: '#234873',
    marginVertical: 260,
    marginTop: 175,
    zIndex: 0,
  },
});

export default ListScreen;