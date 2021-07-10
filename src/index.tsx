import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from '_navigations';

const App = () => (
  <NavigationContainer>
    <StatusBar barStyle={'dark-content'} />
    <RootNavigation />
  </NavigationContainer>
);

export default App;
