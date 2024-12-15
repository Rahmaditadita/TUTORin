import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import ikon
import { auth } from '../service/firebaseconfig'; // Import Firebase Auth
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { db } from '../service/firebaseconfig';
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { firestore } from '../service/firebaseconfig'; // Menggunakan firestore yang diekspor


const Login = () => {
  const [isOnRegisterScreen, setIsOnRegisterScreen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [username, setUsername] = useState(''); // Define username state
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (error) {
    console.error('Error fetching documents: ', error);
  }
};

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    school: '',
    address: '',
    class: '',
  });

  useEffect(() => {
    // Memantau status autentikasi pengguna
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.email); // Atau gunakan user.displayName jika Anda menyimpannya
        // Memanggil fetchUsers setelah pengguna berhasil login
        fetchUsers(); // Menampilkan data dari Firestore setelah pengguna login
      } else {
        setUsername('');
      }
    });
  
    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  const handleRegister = async () => {
    const { email, password, firstName, lastName, school, address, class: userClass } = userDetails;
  
    if (!email || !userClass || !firstName || !lastName || !school || !address || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);
  
      // Tentukan role pengguna (misalnya pelajar atau tutor)
      const role = 'pelajar'; // Ganti dengan 'tutor' jika role-nya tutor
  
      // Simpan detail pengguna di Firestore
      await saveUserDetails({
        email,
        firstName,
        lastName,
        school,
        address,
        class: userClass,
      }, role); // Kirim role ke fungsi saveUserDetails
  
      Alert.alert('Success', 'Account created successfully! Please log in.');
      navigation.navigate('gender', { username });
  
      // Reset form
      setUserDetails({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        school: '',
        address: '',
        class: '',
      });
      setIsOnRegisterScreen(false); // Switch to login screen
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };  

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User  logged in:', userCredential.user);
      setUsername(userCredential.user.displayName || userCredential.user.email); // Set username to user's email
      navigation.navigate('home', { username });
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Invalid credentials. Please check your email and password.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User  signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleClass = (classId) => {
    setUserDetails({ ...userDetails, class: classId });
    setShowDropdown(false); // Menutup dropdown setelah memilih kelas
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isOnRegisterScreen ? (
        <>
          <Text style={styles.title}>Register</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#999"
            value={userDetails.firstName}
            onChangeText={(text) => setUserDetails({ ...userDetails, firstName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#999"
            value={userDetails.lastName}
            onChangeText={(text) => setUserDetails({ ...userDetails, lastName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="School"
            placeholderTextColor="#999"
            value={userDetails.school}
            onChangeText={(text) => setUserDetails({ ...userDetails, school: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#999"
            value={userDetails.address}
            onChangeText={(text) => setUserDetails({ ...userDetails, address: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={userDetails.email}
            onChangeText={(text) => setUserDetails({ ...userDetails, email: text })}
          />

          <View style={styles.input1}>
            <View style={styles.classContainer}>
            <Text style={[styles.selectedClassText1, { color: userDetails.class ? '#234873' : '#999' }]}>
            {userDetails.class || "Class"}
          </Text>
          <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.iconContainer2}>
            <Icon name={showDropdown ? 'chevron-down' : 'chevron-right'} size={14} color={"#234873"} />
          </TouchableOpacity>
          </View>
      </View>     

          {showDropdown && (
            <View style={styles.dropdownContainer}>
              <TouchableOpacity onPress={() => handleClass('7')}>
                <Text style={styles.dropdownItem}>Class 7</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleClass('8')}>
                <Text style={styles.dropdownItem}>Class 8</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleClass('9')}>
                <Text style={styles.dropdownItem}>Class 9</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={userDetails.password}
              onChangeText={(text) => setUserDetails({ ...userDetails, password: text })}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer1}>
              <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsOnRegisterScreen(false)}
          >
            <Text style={styles.switchButtonText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsOnRegisterScreen(true)}
          >
            <Text style={styles.switchButtonText}>Don't have an account? Register</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

// Gaya untuk komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6EFBD',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#234873',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  input1: {
    height: 50,
    width: '90%',
    borderColor: '#234873',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 1,
  },
  selectedClassText1: {
    fontSize: 16,
    padding: 1,
    top: 12,
  },
  button: {
    backgroundColor: '#234873',
    padding: 15,
    width: '90%',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F6EFBD',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#234873',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '90%',
    marginBottom: 10,
    marginTop: -1,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  iconContainer: {
    paddingVertical: 0,
    top: -50,
    marginLeft: 250,
  },
  iconContainer1: {
    paddingVertical: 10,
    marginLeft: 20,
  },
  iconContainer2: {
    paddingVertical:-60,
    marginLeft: 250,
    top: -6,
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: '#4CAF50',
    borderColor: '#234873',
    borderWidth: 1,
    borderRadius: 8,
    width: '50%',
    zIndex: 1,
    marginTop: 5,
    top: 464,
    left: 164,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: '#234873',
  },
});

export default Login;