import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOnRegisterScreen, setIsOnRegisterScreen] = useState(false);

  // User details for registration and login
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    school: '',
    address: '',
  });

  // For login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const { email, password, firstName, lastName, school, address } = userDetails;

    if (!email || !password || !firstName || !lastName || !school || !address) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsRegistered(true);
    setIsOnRegisterScreen(false);
    Alert.alert('Success', 'Account created successfully! Please log in.');
    setUserDetails({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      school: '',
      address: '',
    });
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    if (email === userDetails.email && password === userDetails.password) {
      Alert.alert('Success', `Welcome ${userDetails.firstName}!`); // Perbaiki di sini
      navigation.navigate('Home'); // Ganti 'Home' dengan layar berikutnya
    } else {
      Alert.alert('Error', 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
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

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={userDetails.password}
            onChangeText={(text) => setUserDetails({ ...userDetails, password: text })}
          />

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
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    width: '80%',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 10,
    padding: 10,
  },
  switchButtonText: {
    color: '#4CAF50',
    fontSize: 14,
  },
});

export default Login;
