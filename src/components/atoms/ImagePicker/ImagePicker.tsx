import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors, Typography } from '_styles';

const WIDTH = Dimensions.get('window').width;

interface Props {
  parseImage: () => void;
  image?: string;
}

const ImagePicker = ({ parseImage, image }: Props) => {
  const handleImagePicker = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (response?.assets?.[0]) {
          parseImage(response.assets[0].base64);
        }
      },
    );
  };
  return (
    <View style={s.wrapper}>
      <LinearGradient colors={[Colors.WHITE, '#FFFFFF00']} style={s.gradient} />
      <TouchableWithoutFeedback onPress={handleImagePicker}>
        <View style={s.touchableWrapper}>
          {image ? (
            <Image
              source={{ uri: `data:image/png;base64,${image}` }}
              style={s.image}
            />
          ) : (
            <Text style={s.text}>Kliknij, aby dodać zdjęcie</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ImagePicker;

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  gradient: {
    width: '100%',
    height: 70,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
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
  image: {
    flex: 1,
    width: WIDTH,
    height: 250,
    resizeMode: 'cover',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
