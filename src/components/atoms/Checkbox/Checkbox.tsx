import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Colors } from '_styles';

interface Props {
  checked: boolean;
}

const SIZE = 25;
const ACTIVE_HEIGHT = SIZE * 0.6;

const Checkbox = ({ checked }: Props) => {
  const boxOpacity = useSharedValue(checked ? 1 : 0);
  const leftCheckmarkHeight = useSharedValue(checked ? 1 : 0);
  const rightCheckmarkHeight = useSharedValue(checked ? 1 : 0);

  const animateIn = () => {
    'worklets';
    boxOpacity.value = withTiming(1);
    leftCheckmarkHeight.value = withDelay(200, withTiming(ACTIVE_HEIGHT));
    rightCheckmarkHeight.value = withDelay(400, withTiming(ACTIVE_HEIGHT));
  };

  const animateOut = () => {
    'worklets';
    boxOpacity.value = withTiming(0);
    leftCheckmarkHeight.value = withDelay(200, withTiming(0));
    rightCheckmarkHeight.value = withDelay(400, withTiming(0));
  };

  useEffect(() => {
    if (checked) {
      animateIn();
    } else {
      animateOut();
    }
  }, [checked]);

  const leftStyle = useAnimatedStyle(() => ({
    height: leftCheckmarkHeight.value,
  }));
  const rightStyle = useAnimatedStyle(() => ({
    height: rightCheckmarkHeight.value,
  }));
  const checkmarkStyle = useAnimatedStyle(() => ({
    opacity: boxOpacity.value,
  }));

  return (
    <View style={s.checkbox}>
      <View style={s.checkmarkWrapper}>
        <Animated.View
          style={[
            s.checkmarkPart,
            { transform: [{ rotate: '45deg' }] },
            leftStyle,
          ]}
        />
        <Animated.View style={[s.checkmarkPart, rightStyle]} />
      </View>
      <Animated.View style={[s.coloredBox, checkmarkStyle]} />
    </View>
  );
};

export default Checkbox;

const s = StyleSheet.create({
  checkbox: {
    width: SIZE,
    height: SIZE,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coloredBox: {
    backgroundColor: Colors.PRIMARY,
    width: SIZE - 2,
    height: SIZE - 2,
    position: 'absolute',
  },
  checkmarkWrapper: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  checkmarkPart: {
    //height: SIZE * 0.6,
    width: 2,
    backgroundColor: Colors.BLACK_70,
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
  },
});
