import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Logopertama({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Logokedua'); // Navigasi otomatis ke Logokedua
        }, 2000); // 3000 ms = 3 detik

        return () => clearTimeout(timer); // Membersihkan timer saat komponen unmount
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Menampilkan gambar logo */}
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
        width: 365, // Lebar logo
        height: 300, // Tinggi logo
        resizeMode: 'contain', // Gambar sesuai ukuran asli
        backgroundColor: '#FBF3BC',
        bottom: 0,
    },
});
