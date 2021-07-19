import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CookbookScreen, ExploreScreen } from '_scenes';
import { Colors, Mixins } from '_styles';
import { CookbookIcon, ExploreIcon, CreateIcon } from '_icons';

const Tab = createBottomTabNavigator();

const NotCreate = () => {
  return <View />;
};

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Cookbook"
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
        component={ExploreScreen}
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
        component={NotCreate} //TODO: Change to screen which sugest to crate new repecpie
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TouchableOpacity
              style={s.iconWrapper}
              onPress={() => navigation.navigate('CreateModal')}>
              <CreateIcon color={Colors.GRAY_DARK} height={75} width={75} />
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
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
});
