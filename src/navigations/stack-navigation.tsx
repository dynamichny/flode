import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { BottomNavigation } from '_navigations';
import { PreviewScreen } from '_scenes';

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
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
    </Stack.Navigator>
  );
}
