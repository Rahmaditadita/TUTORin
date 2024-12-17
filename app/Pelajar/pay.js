import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '../service/firebaseconfig';
import { useNavigation } from '@react-navigation/native';

const PayScreen = ({ onPaymentSuccess }) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [paymentCode, setPaymentCode] = useState('');
  const [payments, setPayments] = useState([]);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showSessionDropdown, setShowSessionDropdown] = useState(false);
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [selectedSessionTime, setSelectedSessionTime] = useState('');
  const [selectedLearningMethod, setSelectedLearningMethod] = useState('');
  

  const banks = [
    { id: 'bca', name: 'BCA' },
    { id: 'bri', name: 'BRI' },
  ];

  const sessionTimes = [
    { id: '10am', name: '10:00 AM' },
    { id: '1pm', name: '1:00 PM' },
    { id: '3pm', name: '3:00 PM' },
  ];

  const learningMethods = [
    { id: 'online', name: 'Online' },
    { id: 'offline', name: 'Offline' },
  ];

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setShowBankDropdown(false);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setPaymentCode(code);
  };

  const handleSessionSelect = (session) => {
    setSelectedSessionTime(session);
    setShowSessionDropdown(false);
  };

  const handleMethodSelect = (method) => {
    setSelectedLearningMethod(method);
    setShowMethodDropdown(false);
  };

  const handlePayment = async (selectedCourseId) => {
    const db = getFirestore();

    const selectedCourse = courses.find(course => course.id === selectedCourseId);
    if (!selectedCourse) {
      console.error('Course tidak ditemukan');
      return;
    }

    const paymentsRef = collection(
      db,
      'Users',
      'loginpelajar',
      'pelajar',
      'pengguna1',
      'Payments',
    );
  
    const paymentDetails = {
      userId: 'pengguna1', // Sesuaikan dengan ID pengguna saat ini
      tutorId: 'Tutor123', // ID tutor
      courseId: 'Biology', // ID kursus
      amount: 100000, // Jumlah pembayaran
      status: 'complete', // Status pembayaran
      timestamp: serverTimestamp(),
    };
  
    try {
      await addDoc(paymentsRef, paymentDetails); // Simpan data ke Firestore
      alert('Pembayaran berhasil!'); // Tampilkan alert sukses
      navigate('/listpelajar'); // Redirect ke halaman 'listpelajar'
    } catch (error) {
      console.error('Error saving payment:', error); // Log error jika terjadi
      alert('Terjadi kesalahan saat menyimpan pembayaran. Coba lagi.'); // Tampilkan alert error
    }
  };

  const fetchPayments = async () => {
    const paymentsRef = collection(
      db,
      'Users',
      'loginpelajar',
      'pelajar',
      'pengguna1',
      'Payments'
    );
  
    try {
      const querySnapshot = await getDocs(paymentsRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(paymentCode);
    Alert.alert('Copied!', 'Payment code has been copied to clipboard.');
  };

  useEffect(() => {
    fetchPayments();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Bank</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowBankDropdown(!showBankDropdown)}>
        <Text style={styles.dropdownText}>
          {selectedBank ? selectedBank.name : 'Select a bank'}
        </Text>
        <Text style={styles.arrow}>{showBankDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showBankDropdown && (
        <FlatList
          data={banks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bankOption}
              onPress={() => handleBankSelect(item)}
            >
              <Text style={styles.bankOptionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.title}>Select Session Time</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowSessionDropdown(!showSessionDropdown)}>
        <Text style={styles.dropdownText}>
          {selectedSessionTime ? selectedSessionTime.name : 'Select a session time'}
        </Text>
        <Text style={styles.arrow}>{showSessionDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showSessionDropdown && (
        <FlatList
          data={sessionTimes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bankOption}
              onPress={() => handleSessionSelect(item)}
            >
              <Text style={styles.bankOptionText}>{item.name}</Text>
            </ TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.title}>Select Learning Method</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowMethodDropdown(!showMethodDropdown)}>
        <Text style={styles.dropdownText}>
          {selectedLearningMethod ? selectedLearningMethod.name : 'Select a learning method'}
        </Text>
        <Text style={styles.arrow}>{showMethodDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showMethodDropdown && (
        <FlatList
          data={learningMethods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bankOption}
              onPress={() => handleMethodSelect(item)}
            >
              <Text style={styles.bankOptionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {paymentCode ? (
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>Payment Code: {paymentCode}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            <Icon name="content-copy" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ) : null}

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6EFBD',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    marginVertical: -10,
    marginTop: 20,
    top: 1,
    color: '#234873',
  },
  dropdownButton: {
    backgroundColor: '#234873',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5C88C4',
  },
  dropdownText: {
    fontSize: 18,
    color: '#F6EFBD'
  },
  arrow: {
    fontSize: 18,
    color: '#F6EFBD'
  },
  bankOption: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#5C88C4',
  },
  bankOptionText: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  codeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  copyButton: {
    padding: 10,
  },
  payButton: {
    backgroundColor: '#5C88C4',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#F6EFBD',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PayScreen;