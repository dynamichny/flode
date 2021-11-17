/* import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';

import { Provider } from 'react-redux';
import store from './store';
import * as categoriesActions from './store/actions/categories';

import { RootNavigation } from '_navigations';
import { Colors } from '_styles';
import { saveToStorage, randomId } from '_utils';

const App = () => {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);
  useEffect(() => {
    store.dispatch(categoriesActions.getCategories());
    console.log('Hello world :)')
  });

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
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
 */
export { default } from '../storybook';
