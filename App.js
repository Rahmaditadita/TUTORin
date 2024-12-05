import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// Import the necessary components
import Logopertama from './Logopertama';
import Logokedua from './Logokedua';
import Logoketiga from './Logoketiga';
import LoginScreen from './login';
import GenderSelectionScreen from './gender'; // Ensure you import GenderSelectionScreen
import HomeScreen from './app/home';
import FiturkursusScreen from './app/Fiturkursus'; // Corrected import path
// import bioScreen from './app/Arts';
import scienceScreen from './app/science';
import ArtsScreen from './app/Arts';
import LangScreen from './app/Bahasa';

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
        <Stack.Screen name="gender" component={GenderSelectionScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="Fiturkursus" component={FiturkursusScreen} />
        <Stack.Screen name="science" component={scienceScreen} />
        <Stack.Screen name="Arts" component={ArtsScreen} />
        <Stack.Screen name="Bahasa" component={LangScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}