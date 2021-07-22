import React from 'react';
import {
  StyleSheet,
  GestureResponderEvent,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { Colors } from '_styles';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  backgroundColor?: string;
  borderColor?: string;
  activeBackgroundColor?: string;
  size?: number;
}

const ActionIconWrapper = ({
  children,
  onPress,
  style = {},
  backgroundColor = Colors.GRAY_LIGHT,
  borderColor = Colors.WHITE,
  activeBackgroundColor = Colors.PRIMARY,
  size = 50,
  ...rest
}: Props) => {
  const progress = useSharedValue(0);

  const animateInnerCircle = () => {
    progress.value = withSpring(1);
  };
  const releaseButton = () => {
    progress.value = withTiming(0);
  };
  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: progress.value,
      },
    ],
  }));

  return (
    <View
      style={[
        s.wrapper,
        { backgroundColor, borderColor, width: size, height: size },
        style,
      ]}>
      <TouchableWithoutFeedback
        {...{ onPress }}
        onPressIn={animateInnerCircle}
        onPressOut={releaseButton}
        {...rest}>
        <View style={[s.circle, { width: size, height: size }]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          s.animatedCircle,
          {
            backgroundColor: activeBackgroundColor,
            width: size,
            height: size,
          },
          circleStyle,
        ]}
      />
    </View>
  );
};

export default ActionIconWrapper;

const s = StyleSheet.create({
  wrapper: {
    borderRadius: 999,
    borderWidth: 1,
    opacity: 0.7,
  },
  circle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  animatedCircle: {
    position: 'absolute',
    top: -1,
    left: -1,
    zIndex: 1,
    borderRadius: 999,
  },
});
