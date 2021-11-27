import { StyleSheet } from 'react-native';

import { Colors, Typography } from '_styles';

const s = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.WHITE,
    paddingTop: 10,
  },
  headerText: {
    color: Colors.BLACK,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_SEMIHEADER,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  topGradient: {
    height: 100,
    width: '100%',
    transform: [{ translateY: 20 }],
    zIndex: 10,
  },
  bottomGradient: {
    height: 150,
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
  },
  list: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  listContainer: {
    paddingTop: 0,
    paddingBottom: 80,
  },
  primaryArea: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  whiteArea: {
    flex: 0,
    backgroundColor: Colors.WHITE,
  },
});

export default s;
