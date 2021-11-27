import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { Ingredient, Recepie, Step } from '_types';

export enum ScreenNames {
  RecepiesListScreen = 'RecepiesListScreen',
  ExploreScreen = 'ExploreScreen',
  NotScreen = 'NotScreen',
  RecepieDetailScreen = 'RecepieDetailScreen',
  CookingScreen = 'CookingScreen',
  CreateModal = 'CreateModal',
  IngredientsScreen = 'IngredientsScreen',
}

export enum NavigatorNames {
  BottomNavigation = 'BottomNavigation',
  Stack = 'Stack',
}

// NAVIGATORS PROPS

export type BottomNavigatorParamsList = {
  [ScreenNames.ExploreScreen]: undefined;
  [ScreenNames.NotScreen]: undefined;
  [ScreenNames.RecepiesListScreen]: undefined;
};
export type StackNavigatorParamsList = {
  [ScreenNames.RecepieDetailScreen]: { item: Recepie };
  [NavigatorNames.BottomNavigation]: NavigatorScreenParams<BottomNavigatorParamsList>;
};
export type RootNavigatorParamsList = {
  [NavigatorNames.Stack]: NavigatorScreenParams<StackNavigatorParamsList>;
  [ScreenNames.CreateModal]: undefined;
  [ScreenNames.CookingScreen]: { title: string; steps: Step[] };
  [ScreenNames.IngredientsScreen]: {
    list: Ingredient[];
    steps: Step[];
    title: string;
  };
};

// SCREENS PROPS

export type RecepiesListScreenProps = StackScreenProps<
  BottomNavigatorParamsList,
  ScreenNames.RecepiesListScreen
>;

export type RecepieFormScreenProps = StackScreenProps<
  RootNavigatorParamsList,
  ScreenNames.CreateModal
>;

export type RecepieDetailScreenProps = StackScreenProps<
  StackNavigatorParamsList,
  ScreenNames.RecepieDetailScreen
>;

export type IngredientsScreenProps = StackScreenProps<
  RootNavigatorParamsList,
  ScreenNames.IngredientsScreen
>;

export type ExploreScreenProps = StackScreenProps<
  BottomNavigatorParamsList,
  ScreenNames.ExploreScreen
>;

export type CookingScreenProps = StackScreenProps<
  RootNavigatorParamsList,
  ScreenNames.CookingScreen
>;
