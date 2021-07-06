import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CookbookScreen, CreateScreen } from '_scenes';
import { ExploreNavigation } from '_navigations';
import { Colors, Mixins } from '_styles';
import { CookbookIcon, ExploreIcon, CreateIcon } from '_icons';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 30,
          left: 20,
          right: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 40,
          height: 65,
          borderTopWidth: 0,
          ...Mixins.boxShadow(
            Colors.GRAY_MEDIUM,
            { height: 8, width: 0 },
            24,
            0.2,
          ),
        },
        safeAreaInsets: { bottom: 0 },
      }}>
      <Tab.Screen
        name="Explore"
        component={ExploreNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={s.iconWrapper}>
              <ExploreIcon
                color={focused ? Colors.PRIMARY : Colors.GRAY_MEDIUM}
                height={25}
                width={40}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen} //TODO: Change to screen which sugest to crate new repecpie
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={s.iconWrapper}
              onPress={() => navigation.navigate('CreateModal')}>
              <CreateIcon
                color={focused ? Colors.PRIMARY : Colors.GRAY_MEDIUM}
                height={32}
                width={32}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Cookbook"
        component={CookbookScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={s.iconWrapper}>
              <CookbookIcon
                color={focused ? Colors.PRIMARY : Colors.GRAY_MEDIUM}
                height={25}
                width={40}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  iconWrapper: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
});
