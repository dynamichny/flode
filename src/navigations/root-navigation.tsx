import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { CreateScreen } from '_scenes';
import { StackNavigation } from '_navigations';

const RootStack = createStackNavigator();
export default function RootNavigation() {
  return (
    <RootStack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={() => {
        return {
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        };
      }}>
      <RootStack.Screen name={'Stack'} component={StackNavigation} />
      <RootStack.Screen name={'CreateModal'} component={CreateScreen} />
    </RootStack.Navigator>
  );
}
