import { StyleSheet } from 'react-native';
import { Colors, Typography } from '_styles';
import { DOT_WIDTH } from './CookingScreen';

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  stepWrapper: {
    alignItems: 'center',
    padding: 20,
  },
  stepText: {
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
    textAlign: 'center',
  },
  paginationWrapper: {
    position: 'absolute',
    left: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  pagination: {
    width: DOT_WIDTH,
    height: DOT_WIDTH,
    marginVertical: 3,
    borderRadius: DOT_WIDTH / 2,
    backgroundColor: Colors.PRIMARY,
  },
});

export default s;
