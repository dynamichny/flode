import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  BottomNavigation,
  NavigatorNames,
  ScreenNames,
  StackNavigatorParamsList,
} from '_navigations';
import { RecepieDetailScreen } from '_scenes';

const Stack = createStackNavigator<StackNavigatorParamsList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="card"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={NavigatorNames.BottomNavigation}
        component={BottomNavigation}
      />
      <Stack.Screen
        name={ScreenNames.RecepieDetailScreen}
        component={RecepieDetailScreen}
      />
    </Stack.Navigator>
  );
}
