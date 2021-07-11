import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from '_navigations';
import { Colors } from '_styles';

const App = () => (
  <NavigationContainer>
    <StatusBar
      barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      backgroundColor={Colors.BLACK}
    />
    <RootNavigation />
  </NavigationContainer>
);

export default App;
