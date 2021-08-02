import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import {
  CreateScreen,
  IngredientsCompletnessScreen,
  CookingScreen,
} from '_scenes';
import { StackNavigation } from '_navigations';
import { RootNavigatorParamsList } from '_types';
import { RootRoutes } from '_types';

const RootStack = createStackNavigator<RootNavigatorParamsList>();

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
      <RootStack.Screen name={RootRoutes.Stack} component={StackNavigation} />
      <RootStack.Screen
        name={RootRoutes.CreateModal}
        component={CreateScreen}
      />
      <RootStack.Screen
        name={RootRoutes.CookingScreen}
        component={CookingScreen}
      />
      <RootStack.Screen
        name={RootRoutes.IngredientsCompletnessScreen}
        component={IngredientsCompletnessScreen}
      />
    </RootStack.Navigator>
  );
}
