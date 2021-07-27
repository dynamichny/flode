import 'react-native';

const mock = jest.requireMock('react-native-reanimated/mock');
jest.mock('react-native-reanimated', () => {
  return {
    ...mock,
    useSharedValue: jest.fn,
    useAnimatedStyle: jest.fn,
    withTiming: jest.fn,
    withDelay: jest.fn,
  };
});

global.__reanimatedWorkletInit = jest.fn();
