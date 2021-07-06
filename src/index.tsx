import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from '_navigations';

const App = () => (
  <NavigationContainer>
    <RootNavigation />
  </NavigationContainer>
);

export default App;
