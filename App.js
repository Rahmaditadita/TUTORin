import React from 'react';
import { SafeAreaView } from 'react-native';
// import GenderSelectionScreen from './app/gender';
import HomeScreen from './app/home';
// // import HomeScreen from './app/featured';
// import HomeScreen from './app/science';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <GenderSelectionScreen /> */}
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
