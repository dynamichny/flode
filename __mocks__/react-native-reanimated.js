const mock = jest.requireMock('react-native-reanimated');
jest.mock('react-native-reanimated', () => {
  return {
    ...mock,
    useSharedValue: jest.fn,
    useAnimatedStyle: jest.fn,
  };
});
