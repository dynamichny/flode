import { NavigatorScreenParams } from '@react-navigation/native';

export interface Category {
  name: string;
  emote: string;
  id: string;
  color: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recepie {
  images: string[];
  title: string;
  creationDate: string;
  categories: Category[];
  ingredients: Ingredient[];
  steps: Step[];
  user_id: string;
  public: boolean;
  id: string;
}

export type Step = string;

export enum BottomRoutes {
  CookbookScreen = 'CookbookScreen',
  ExploreScreen = 'ExploreScreen',
  NotScreen = 'NotScreen',
}
export enum StackRoutes {
  BottomNavigation = 'BottomNavigation',
  PreviewScreen = 'PreviewScreen',
}
export enum RootRoutes {
  CookingScreen = 'CookingScreen',
  CreateModal = 'CreateModal',
  IngredientsCompletnessScreen = 'IngredientsCompletnessScreen',
  Stack = 'Stack',
}

export type BottomNavigatorParamsList = {
  [BottomRoutes.ExploreScreen]: undefined;
  [BottomRoutes.NotScreen]: undefined;
  [BottomRoutes.CookbookScreen]: undefined;
};
export type StackNavigatorParamsList = {
  [StackRoutes.PreviewScreen]: { item: Recepie };
  [StackRoutes.BottomNavigation]: NavigatorScreenParams<BottomNavigatorParamsList>;
};
export type RootNavigatorParamsList = {
  [RootRoutes.Stack]: NavigatorScreenParams<StackNavigatorParamsList>;
  [RootRoutes.CreateModal]: undefined;
  [RootRoutes.CookingScreen]: { title: string; steps: Step[] };
  [RootRoutes.IngredientsCompletnessScreen]: {
    list: Ingredient[];
    steps: Step[];
    title: string;
  };
};
