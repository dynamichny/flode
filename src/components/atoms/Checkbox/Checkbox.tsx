import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Colors } from '_styles';

interface Props {
  checked: boolean;
}

const SIZE = 25;

const Checkbox = ({ checked }: Props) => {
  const boxOpacity = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const leftCheckmarkHeight = useRef(
    new Animated.Value(checked ? SIZE * 0.6 : 0),
  ).current;
  const rightCheckmarkHeight = useRef(
    new Animated.Value(checked ? SIZE * 0.6 : 0),
  ).current;
  const animateIn = () =>
    Animated.parallel([
      Animated.spring(boxOpacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(leftCheckmarkHeight, {
        toValue: SIZE * 0.6,
        useNativeDriver: false,
        delay: 200,
      }),
      Animated.spring(rightCheckmarkHeight, {
        toValue: SIZE * 0.6,
        useNativeDriver: false,
        delay: 400,
      }),
    ]).start();
  const animateOut = () =>
    Animated.parallel([
      Animated.timing(leftCheckmarkHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(rightCheckmarkHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.spring(boxOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();

  useEffect(() => {
    if (checked) {
      animateIn();
    } else {
      animateOut();
    }
  }, [checked]);

  return (
    <View style={s.checkbox}>
      <View style={s.checkmarkWrapper}>
        <Animated.View
          style={[
            s.checkmarkPart,
            { transform: [{ rotate: '45deg' }], height: leftCheckmarkHeight },
          ]}
        />
        <Animated.View
          style={[s.checkmarkPart, { height: rightCheckmarkHeight }]}
        />
      </View>
      <Animated.View style={[s.coloredBox, { opacity: boxOpacity }]} />
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
