import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
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
  const animValue = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const nameRef = useRef(null);

  const animate = toValue =>
    Animated.timing(animValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    animate(checked ? 1 : 0);
  }, [checked]);

  return (
    <TouchableOpacity onPress={onChange} activeOpacity={0.75}>
      <Animated.View
        style={[
          s.wrapper,
          {
            opacity: animValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.55],
            }),
          },
        ]}>
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
    </TouchableOpacity>
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
