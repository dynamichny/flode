import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography } from '_styles';

interface Props {
  parseImage: () => void;
}

const ImagePicker = ({ parseImage }: Props) => {
  const handleImagePicker = async () => {
    console.log('xd');
  };
  return (
    <View style={s.wrapper}>
      <LinearGradient colors={[Colors.WHITE, '#FFFFFF00']} style={s.gradient} />
      <TouchableWithoutFeedback onPress={handleImagePicker}>
        <View style={s.touchableWrapper}>
          <Text style={s.text}>Kliknij, aby dodać zdjęcie</Text>
        </View>
      </TouchableWithoutFeedback>
      <LinearGradient colors={['#FFFFFF00', Colors.WHITE]} style={s.gradient} />
    </View>
  );
};

export default ImagePicker;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.GRAY_MEDIUM,
    justifyContent: 'space-between',
  },
  gradient: {
    width: '100%',
    height: 70,
  },
  touchableWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    textAlign: 'center',
  },
});
