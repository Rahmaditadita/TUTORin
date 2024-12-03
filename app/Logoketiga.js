import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import hook

export default function Logoketiga() {
    const navigation = useNavigation();  // Gunakan hook untuk mendapatkan objek navigation

    const handleNext = () => {
        navigation.navigate('Gender');  // Navigasi ke screen 'Gender'
    };

    return (
        <View style={styles.container}>
            <Image source={require('../app/assets/Logo.png')} style={styles.logo} />
            <Text style={styles.Text}>TUTORin</Text>
            <Text style={styles.Newtext}>Study fatigue is temporary, but the results last forever. Make it fun!</Text>
            <View style={styles.button}>
                <Button title="Next" onPress={handleNext} color="#5C88C4" />
            </View>
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
        width: 368,
        height: 200,
        resizeMode: 'contain',
    },
    Text: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#5C88C4',
    },
    Newtext: {
        fontSize: 16,
        fontWeight: 'semibold',
        fontFamily: 'serif',
        color: '#234873',
        textAlign: 'center',
        marginHorizontal: 35,
        marginTop: 10,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        width: '20%',
        alignSelf: 'center',
    },
});
