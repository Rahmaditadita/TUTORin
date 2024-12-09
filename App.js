import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// Import the necessary components
import Logopertama from './app/Pelajar/Logopertama';
import LoginScreen from './app/Pelajar/loginpelajar';
import GenderSelectionScreen from './app/Pelajar/gender';
import HomeScreen from './app/Pelajar/home';
import FiturkursusScreen from './app/Pelajar/Fiturkursus';
import scienceScreen from './app/Pelajar/science';
import ArtsScreen from './app/Pelajar/Arts';
import LangScreen from './app/Pelajar/Bahasa';
import Profilmentor from './app/Pelajar/Profilmentor';
import payScreen from './app/Pelajar/pay';
import BioScreen from './app/Pelajar/bio';

import LoginT from './app/Tutor/logintutor';

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
        <Stack.Screen name="gender" component={GenderSelectionScreen} />
        <Stack.Screen name="loginpelajar" component={LoginScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="Fiturkursus" component={FiturkursusScreen} />
        <Stack.Screen name="science" component={scienceScreen} />
        <Stack.Screen name="Arts" component={ArtsScreen} />
        <Stack.Screen name="Bahasa" component={LangScreen} />
        <Stack.Screen name='bio' component={BioScreen} />
        <Stack.Screen name='Profilmentor' component={Profilmentor} />
        <Stack.Screen name='pay' component={payScreen} />

        <Stack.Screen name='logintutor' component={LoginT} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}