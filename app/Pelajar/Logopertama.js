import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogopertamaScreen() {
    const navigation = useNavigation();
    const logoAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [showText, setShowText] = useState(false);
    const [showButtons, setShowButtons] = useState(false); 
    const animationSpeed = 1000;
    

    const handlePelajar = () => {
        navigation.navigate('loginpelajar');  // Navigasi ke screen 'Gender'
    };

    const handleTutor = () => {
        navigation.navigate('logintutor');  // Navigasi ke screen 'Gender'
    };

    useEffect(() => {
        // Start the animation
        Animated.parallel([
            Animated.timing(logoAnim, {
                toValue: 10,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.7,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Show text after animation completes
            setShowText(true);
            setShowButtons(true);
        });
    }, [navigation, logoAnim, scaleAnim]);

    return (
        <View style={styles.container}>
            <Animated.View style={{
                transform: [
                    { translateY: logoAnim },
                    { scale: scaleAnim }
                ]
            }}>
                <Image source={require('../assets/Logo.png')} style={styles.logo} />
            </Animated.View>
            {showText && ( // Conditionally render text based on state
                <>
                    <Text style={styles.title}>TUTORin</Text>
                    <Text style={styles.subtitle}>Study fatigue is temporary, but the results last forever. Make it fun!</Text>
                </>
            )}
           {showButtons && ( // Render tombol berdasarkan state
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={(handlePelajar)}>
                        <Text style={styles.buttonText}>Student</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={(handleTutor)}>
                        <Text style={styles.buttonText}>Tutor</Text>
                    </TouchableOpacity>
                </View>
            )} 
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
        width: 365,
        height: 300,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#5C88C4',
        marginTop: -30,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600', // Use '600' for semibold
        fontFamily: 'serif',
        color: '#234873',
        textAlign: 'center',
        marginHorizontal: 35,
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#234873',
        padding: 12,
        borderRadius: 15,
        marginHorizontal: 15,
    },
    buttonText: {
        color: '#F6EFBD',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
