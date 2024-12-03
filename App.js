import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

// Import komponen yang diperlukan
import Logopertama from './Logopertama';
import Logokedua from './Logokedua';
import Logoketiga from './Logoketiga';
import GenderSelectionScreen from './GenderSelectionScreen'; // Pastikan kamu mengimpor GenderSelectionScreen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Logopertama"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, next, layouts }) => {
            const progress = current.progress;
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Logopertama" component={Logopertama} />
        <Stack.Screen name="Logokedua" component={Logokedua} />
        <Stack.Screen name="Logoketiga" component={Logoketiga} />
        <Stack.Screen name="Gender" component={GenderSelectionScreen} /> {/* Tambahkan screen Gender */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
