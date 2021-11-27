import { RefObject, createRef } from 'react';

import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';

import { NavigatorNames, ScreenNames } from '_navigations';

let navigationRef: RefObject<NavigationContainerRef> = createRef();

const navigate = (name: NavigatorNames | ScreenNames, params?: any) => {
  navigationRef?.current?.navigate(name, params);
};

const getState = (): NavigationState => {
  return navigationRef.current?.dangerouslyGetState()!;
};

const setState = (state: NavigationState) => {
  navigationRef.current?.reset(state);
};

const NavigationService = {
  navigationRef,
  navigate,
  getState,
  setState,
};

export default NavigationService;
