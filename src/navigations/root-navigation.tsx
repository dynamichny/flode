import React from 'react';

import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import { StackNavigation } from '_navigations';
import { CookingScreen, IngredientsScreen, RecepieFormScreen } from '_scenes';

import {
  NavigatorNames,
  RootNavigatorParamsList,
  ScreenNames,
} from './screensNames';

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
      <RootStack.Screen
        name={NavigatorNames.Stack}
        component={StackNavigation}
      />
      <RootStack.Screen
        name={ScreenNames.CreateModal}
        component={RecepieFormScreen}
      />
      <RootStack.Screen
        name={ScreenNames.CookingScreen}
        component={CookingScreen}
      />
      <RootStack.Screen
        name={ScreenNames.IngredientsScreen}
        component={IngredientsScreen}
      />
    </RootStack.Navigator>
  );
}
