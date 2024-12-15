import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, Clipboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const PaymentScreen = ({ onPaymentSuccess }) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [paymentCode, setPaymentCode] = useState('');
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

  const handlePayment = () => {
    if (!selectedBank) {
      Alert.alert('Error', 'Please select a bank to proceed.');
      return;
    }
    if (!selectedSessionTime || !selectedLearningMethod) {
      Alert.alert('Error', 'Please select session time and learning method.');
      return;
    }

    const paymentDetails = {
      bank: selectedBank.name,
      paymentCode,
      sessionTime: selectedSessionTime.name,
      learningMethod: selectedLearningMethod.name,
      amount: 100000, // Contoh jumlah uang yang diterima
    };

    Alert.alert('Payment Successful', 'You have selected ${selectedBank.name} with code: ${paymentCode}');
    
    onPaymentSuccess(paymentDetails); // Memanggil fungsi untuk mengupdate state di HomePage
  };

  const copyToClipboard = () => {
    Clipboard.setString(paymentCode);
    Alert.alert('Copied!', 'Payment code has been copied to clipboard.');
  };

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
              onPress={() => handleSessionSelect(item )}
            >
              <Text style={styles.bankOptionText}>{item.name}</Text>
            </TouchableOpacity>
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

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
        <Text style={styles.copyButtonText}>Copy Payment Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
  },
  bankOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bankOptionText: {
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  copyButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PaymentScreen;