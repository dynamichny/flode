import { StyleSheet } from 'react-native';
import { Colors, Typography } from '_styles';

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  listWrapper: {
    paddingHorizontal: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000B3',
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  overlayText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_SEMIHEADER,
    ...Typography.FONT_BOLD,
    textAlign: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingHorizontal: 24,
  },
});

export default s;
