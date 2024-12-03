import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Use the hook to get navigation

export default function Logopertama() {
    const navigation = useNavigation(); // Get the navigation object using the hook

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Logokedua'); // Navigate to Logokedua after 2 seconds
        }, 2000); // 2000 ms = 2 seconds

        return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Display logo image */}
            <Image source={require('../app/assets/Logo.png')} style={styles.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBF3BC',
    },
    logo: {
        width: 365, // Logo width
        height: 300, // Logo height
        resizeMode: 'contain', // Adjust the logo to its original size
        backgroundColor: '#FBF3BC',
        bottom: 0,
    },
});
