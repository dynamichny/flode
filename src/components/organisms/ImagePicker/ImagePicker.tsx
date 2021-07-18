import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { Colors, Typography } from '_styles';
import { ImagesWithPageing } from '_molecules';

const WIDTH = Dimensions.get('window').width;

interface Props {
  parseImages: (images: Array<string>) => void;
  images: string[];
}

const ImagePicker = ({ parseImages, images }: Props) => {
  const handleImagePicker = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 5,
        quality: 0.9,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          return;
        }
        const imagesA = response.assets.map(x =>
          x.base64 ? `data:image/png;base64,${x.base64}` : '',
        );
        parseImages(imagesA);
      },
    );
  };
  return (
    <View style={s.wrapper}>
      {images.length > 0 && <ImagesWithPageing images={images} />}
      <TouchableOpacity onPress={handleImagePicker}>
        <View style={s.textWrapper}>
          <Text style={s.text}>
            Kliknij, aby {images.length === 0 ? 'dodać' : 'zmienić'} zdjęcie
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  text: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
    textAlign: 'center',
  },
  textWrapper: {
    paddingVertical: 30,
  },
  image: {
    width: WIDTH,
    height: '100%',
  },
  touchableWithImages: {
    paddingVertical: 20,
  },
  imageWrapper: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    height: WIDTH,
  },
});
