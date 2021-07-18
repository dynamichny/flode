import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { CategoryIcon } from '_atoms';
import { Colors, Mixins, Typography } from '_styles';

interface Category {
  color: string;
  emote: string;
  name: string;
}

interface Props {
  category: Category;
  onPress: () => void;
  checked: boolean;
}

const CategoryCheckbox = ({
  category: { color, emote, name },
  onPress,
  checked,
}: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0);
  }, [checked]);

  const bgStyle = useAnimatedStyle(() => ({
    opacity: progress.value ? withTiming(0.7) : withTiming(0),
    backgroundColor: color,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: progress.value ? withTiming(1) : withTiming(0.5),
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      style={s.touchable}
      activeOpacity={0.75}>
      <CategoryIcon index={0} color={color} emote={emote} border={false} />
      <Animated.Text style={[s.categoryName, textStyle]}>{name}</Animated.Text>
      <Animated.View style={[s.background, bgStyle]} />
    </TouchableOpacity>
  );
};

export default CategoryCheckbox;

const s = StyleSheet.create({
  touchable: {
    flexGrow: 1,
    ...Mixins.boxShadow(Colors.BLACK, { width: 0, height: 1 }, 2, 0.1),
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  background: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
    top: 3,
    bottom: 3,
    left: 3,
    right: 3,
    borderRadius: 30,
  },
  categoryName: {
    ...Typography.FONT_REGULAR,
    paddingHorizontal: 8,
    color: Colors.BLACK,
    textAlign: 'center',
  },
});
