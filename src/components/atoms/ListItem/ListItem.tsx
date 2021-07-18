import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Typography } from '_styles';
import { CategoryIcon } from '_atoms';

const HEIGHT = 135;

interface Category {
  name: string;
  emote: string;
  id: string;
  color: string;
}

interface Props {
  imagePath: string;
  title: string;
  creationDate: string;
  categories: Category[];
  onPress: () => void | undefined;
  index: number;
}

const ListItem = ({
  imagePath,
  title,
  categories,
  creationDate,
  onPress,
  index,
}: Props) => {
  const opacity = useSharedValue(0);
  const offsetY = useSharedValue((index - 1) * HEIGHT);
  const [prevousIndex, setPrevousIndex] = useState(index);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    if (index === prevousIndex) {
      offsetY.value = HEIGHT / 3;
    } else {
      offsetY.value = HEIGHT * (prevousIndex - index);
    }
    offsetY.value = withSpring(0, {
      damping: 20,
    });
    setPrevousIndex(index);
  }, [index]);

  const wrapperStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: offsetY.value,
      },
    ],
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={typeof onPress == 'undefined' ? 1 : 0.75}>
      <Animated.View style={[s.wrapper, wrapperStyle]}>
        <Image
          source={{ uri: imagePath }}
          style={s.image}
          resizeMode={'cover'}
        />
        <View style={s.texts}>
          <Text style={s.date}>
            {new Date(creationDate).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
          </Text>
          <Text style={s.title}>{title}</Text>
          <View style={s.categories}>
            {categories.map((c: Category, index: number) => (
              <CategoryIcon
                key={index}
                index={index}
                color={c.color}
                emote={c.emote}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ListItem;

const s = StyleSheet.create({
  wrapper: {
    height: HEIGHT,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  image: {
    height: 121,
    width: 90,
    borderRadius: 15,
    marginRight: 20,
  },
  texts: {
    justifyContent: 'center',
  },
  date: {
    color: Colors.PRIMARY,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_12,
  },
  title: {
    color: Colors.BLACK,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    paddingTop: 2,
    paddingBottom: 7,
  },
  categories: {
    flexDirection: 'row',
  },
});
