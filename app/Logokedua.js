import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Logokedua({navigation}) {
    // Menggunakan useEffect untuk transisi otomatis ke layar berikutnya
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Logoketiga'); // Navigasi ke layar Logoketiga
        }, 2000); // Delay 5 detik

        // Membersihkan timer saat komponen di-unmount
        return () => clearTimeout(timer);
    }, [navigation]);
    
    return (
        <View style = {styles.container}>
            {/*menampilkan gambar logo */}
            <Image source = {require('../app/assets/Logo.png')} style = {styles.logo} />
            <Text style = {styles.Text}>TUTORin</Text>
            <Text style = {styles.Newtext}>Study fatigue is temporary, but the results last forever. Make it fun!</Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBF3BC', 
    },
    logo: {
        width: 370, //lebar logo
        height: 200, //tinggi logo
        resizeMode: 'contain', //gambar sesuai ukuran asli
        // backgroundColor: '#FBF3BC',
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
    }
});

//            style = {{width: 200, height: 250, backgroundColor: '#FBF3BC'}} />