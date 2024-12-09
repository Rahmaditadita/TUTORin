import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const PaymentScreen = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [paymentCode, setPaymentCode] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const banks = [
    { id: 'bca', name: 'BCA' },
    { id: 'bri', name: 'BRI' },
  ];

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setShowDropdown(false);
    // Generate a payment code (for demonstration purposes)
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // Random 6-digit code
    setPaymentCode(code);
  };

  const handlePayment = () => {
    if (!selectedBank) {
      Alert.alert('Error', 'Please select a bank to proceed.');
      return;
    }
    Alert.alert('Payment Successful', `You have selected ${selectedBank.name} with code: ${paymentCode}`);
  };

  const copyToClipboard = () => {
    Clipboard.setString(paymentCode);
    Alert.alert('Copied!', 'Payment code has been copied to clipboard.');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Bank</Text>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.dropdownText}>
          {selectedBank ? selectedBank.name : 'Select a bank'}
        </Text>
        <Text style={styles.arrow}>{showDropdown ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showDropdown && (
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownText: {
    fontSize: 18,
  },
  arrow: {
    fontSize: 18,
  },
  bankOption: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bankOptionText: {
    fontSize: 18,
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
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;