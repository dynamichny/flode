import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { BottomNavigation } from '_navigations';

const Stack = createStackNavigator();

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
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
    </Stack.Navigator>
  );
}
