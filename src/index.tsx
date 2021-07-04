import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from '_navigations';

const App = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);

export default App;
