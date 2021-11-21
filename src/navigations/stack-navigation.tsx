import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { BottomNavigation } from '_navigations';
import { RecepieDetailScreen } from '_scenes';
import { StackNavigatorParamsList } from '_types';
import { StackRoutes } from '_types';

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
        name={StackRoutes.BottomNavigation}
        component={BottomNavigation}
      />
      <Stack.Screen
        name={StackRoutes.RecepieDetailScreen}
        component={RecepieDetailScreen}
      />
    </Stack.Navigator>
  );
}
