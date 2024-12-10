import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// PELAJARRRR
import LogopertamaScreen from '../TUTORin/app/pelajar/logopertama'; // Ensure this path is correct
import LoginScreen from '../TUTORin/app/pelajar/loginpelajar'; // Ensure this path is correct
import GenderSelectionScreen from '../TUTORin/app/pelajar/gender'; // Ensure this path is correct
import HomeScreen from '../TUTORin/app/pelajar/home'; // Ensure this path is correct
import FiturkursusScreen from '../TUTORin/app/pelajar/Fiturkursus'; // Ensure this path is correct
import ScienceScreen from '../TUTORin/app/pelajar/science'; // Ensure this path is correct
import ArtsScreen from '../TUTORin/app/pelajar/Arts'; // Ensure this path is correct
import LangScreen from '../TUTORin/app/pelajar/Bahasa'; // Ensure this path is correct
import PayScreen from '../TUTORin/app/pelajar/pay'; // Ensure this path is correct
import BioScreen from './app/pelajar/bio'; // Ensure this path is correct
import ProfilmentorScreen from './app/pelajar/Profilementor';

//TUTORRRRR
import LoginT from './app/Tutor/logintutor';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="logopertama"
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
        
        <Stack.Screen name="logopertama" component={LogopertamaScreen} />
        <Stack.Screen name="gender" component={GenderSelectionScreen} />
        <Stack.Screen name="loginpelajar" component={LoginScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="Fiturkursus" component={FiturkursusScreen} />
        <Stack.Screen name="science" component={ScienceScreen} />
        <Stack.Screen name="Arts" component={ArtsScreen} />
        <Stack.Screen name="Bahasa" component={LangScreen} />
        <Stack.Screen name="bio" component={BioScreen} />
        <Stack.Screen name="Profilementor" component={ProfilmentorScreen} />
        <Stack.Screen name="pay" component={PayScreen} />

        <Stack.Screen name="logintutor" component={LoginT}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}