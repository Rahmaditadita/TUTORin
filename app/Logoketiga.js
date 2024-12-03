import React from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';

export default function Logoketiga({ navigation }) {
    const handleNext = () => {
        // Here, you can navigate to the next screen if using navigation, or perform any action
        //navigasi ke layar selanjutnya
        navigation.navigate('Gender'); // Uncomment if using React Navigation
    };

    return (
        <View style = {styles.container}>
            {/* Display logo image */}
            <Image source = {require('../app/assets/Logo.png')} style={styles.logo} />
            <Text style = {styles.Text}>TUTORin</Text>
            <Text style = {styles.Newtext}>Study fatigue is temporary, but the results last forever. Make it fun!</Text>
            <View style = {styles.button}>
                <Button title = "Next" onPress={handleNext} color="#5C88C4" />
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
    button : {
        position: 'absolute', //posisi absolut
        bottom: 20, //jarak dr bawah
        width: '20%', //lebar
        alignSelf: 'center', //pusat scr horizontal
    }
});
