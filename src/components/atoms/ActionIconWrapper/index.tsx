import React, { useRef } from 'react';
import {
  StyleSheet,
  Animated,
  GestureResponderEvent,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '_styles';

interface Props {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  style?: any;
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
}: Props) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const animation = toValue =>
    Animated.spring(animValue, {
      toValue,
      useNativeDriver: true,
    });
  const animateInnerCircle = () => {
    animation(0).stop();
    animation(1).start();
  };
  const releaseButton = () => {
    animation(1).stop();
    animation(0).start();
  };

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
        onPressOut={releaseButton}>
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
            transform: [
              {
                scale: animValue,
              },
            ],
          },
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
