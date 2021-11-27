import { StyleSheet } from 'react-native';

import { Colors, Typography } from '_styles';

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 28,
    right: 24,
    zIndex: 10,
  },
  headerText: {
    fontSize: Typography.FONT_SIZE_HEADER,
    color: Colors.BLACK,
    ...Typography.FONT_MEDIUM,
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  form: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  section: {
    paddingVertical: 14,
    paddingBottom: 70,
  },
  sectionTitle: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.PRIMARY,
    textDecorationStyle: 'dotted',
    marginHorizontal: 24,
    marginBottom: 10,
  },
  scrollView: {
    paddingBottom: 50,
  },
  appendButton: {
    position: 'absolute',
    right: 24,
    bottom: 14,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  validationMessage: {
    color: Colors.ALERT,
    paddingTop: 5,
    fontSize: Typography.FONT_SIZE_12,
    ...Typography.FONT_REGULAR,
  },
  validationMessageWrapper: {
    paddingHorizontal: 24,
  },
});

export default s;
