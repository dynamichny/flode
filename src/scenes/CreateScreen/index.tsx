import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from '_styles';
import { ActionIconWrapper, ImagePicker } from '_atoms';

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {}

const CreateScreen = (props: Props) => {
  return (
    <View style={s.wrapper}>
      <View>
        <ActionIconWrapper
          onPress={() => props.navigation.goBack()}
          borderColor={Colors.GRAY_MEDIUM}
          style={s.closeButton}>
          <Icon name="window-close" size={18} color={Colors.BLACK} />
        </ActionIconWrapper>
        <Text style={s.headerText}>Dodaj przepis</Text>
      </View>
      <ImagePicker />
      <Text></Text>
    </View>
  );
};

export default CreateScreen;

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
});
