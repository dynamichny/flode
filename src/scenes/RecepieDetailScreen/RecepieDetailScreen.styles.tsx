import { StyleSheet } from 'react-native';
import { Colors, Mixins, Typography } from '_styles';

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerButtons: {
    position: 'absolute',
    zIndex: 10,
    paddingHorizontal: 20,
  },

  introductionBox: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 25,
    paddingHorizontal: 30,
    ...Mixins.boxShadow('#959da5', { height: 8, width: 0 }, 24, 0.2),
    marginHorizontal: 30,
    transform: [
      {
        translateY: -70,
      },
    ],
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 45,
    borderBottomRightRadius: 45,
    zIndex: 10,
    marginBottom: -40,
  },
  title: {
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.BLACK,
  },
  sectionTitle: {
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.BLACK,
  },
  belowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  belowTitleText: {
    fontSize: Typography.FONT_SIZE_14,
    ...Typography.FONT_LIGHT,
    marginLeft: 5,
  },
  belowTitleWrapper: {
    paddingVertical: 10,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  more: {
    transform: [{ translateX: -20 }],
    ...Typography.FONT_LIGHT,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_12,
  },

  ingredientsWrapper: {
    marginHorizontal: 24,
  },
  ingredientWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Mixins.boxShadow('#959da5', { height: 8, width: 0 }, 24, 0.1),
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    padding: 12,
    marginBottom: 8,
  },
  ingredientText: {
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
  checkCompletnessText: {
    ...Typography.FONT_LIGHT,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_14,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.BLACK_70,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomFixed: {
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    bottom: 0,
  },
});

export default s;
