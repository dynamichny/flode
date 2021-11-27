import { flowRight } from 'lodash';

import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

import { withStore } from '_hocs';
import { RootNavigation } from '_navigations';
import { NavigationService } from '_services';
import { Colors } from '_styles';

const App = () => {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={Colors.BLACK}
      />
      <RootNavigation />
    </NavigationContainer>
  );
};

export default flowRight(gestureHandlerRootHOC, withStore)(App);
