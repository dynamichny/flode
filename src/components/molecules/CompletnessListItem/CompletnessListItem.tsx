import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography } from '_styles';

import { Checkbox } from '_atoms';

interface Props {
  name: string;
  quantity: string;
  unit: string;
  checked: boolean;
  onChange: () => void;
}

const CompletnessListItem = ({
  name,
  quantity,
  unit,
  checked,
  onChange,
}: Props) => {
  const opacity = useSharedValue(checked ? 0.55 : 1);
  const nameRef = useRef(null);

  useEffect(() => {
    opacity.value = withTiming(checked ? 0.55 : 1);
  }, [checked]);

  const wrapperStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <TouchableWithoutFeedback onPress={onChange}>
      <Animated.View style={[s.wrapper, wrapperStyle]}>
        <View style={s.section}>
          <Checkbox checked={checked} />
          <Text style={s.name} ref={nameRef}>
            {name}
          </Text>
        </View>
        <View style={s.section}>
          <Text style={s.quantityUnit}>{quantity}</Text>
          <Text style={s.quantityUnit}>{unit}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CompletnessListItem;

const s = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.WHITE,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: 20,
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
    marginLeft: 10,
  },
  quantityUnit: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
  },
  lineThrough: {},
});
