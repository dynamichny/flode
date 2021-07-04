import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HelloWorld } from '_atoms';
import { CookbookScreen } from '_scenes';
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HelloWorld} />
      <Tab.Screen name="Cookbook" component={CookbookScreen} />
    </Tab.Navigator>
  );
}
