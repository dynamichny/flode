import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store';
import * as categoriesActions from './store/actions/categories';

import { RootNavigation } from '_navigations';
import { Colors } from '_styles';

const App = () => {
  useEffect(() => {
    store.dispatch(categoriesActions.getCategories());
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={Colors.BLACK}
        />
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
