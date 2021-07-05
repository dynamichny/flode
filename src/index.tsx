import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation } from '_navigations';

const App = () => (
  <NavigationContainer>
    <BottomNavigation /> {/* TODO: Change to root navigation */}
  </NavigationContainer>
);

export default App;
