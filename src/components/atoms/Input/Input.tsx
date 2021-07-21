/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  ViewStyle,
} from 'react-native';

import { Colors, Typography } from '_styles';

interface Props {
  label: string;
  value: string;
  onChangeText: (e: string | React.ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  style?: ViewStyle;
  smaller?: boolean;
  placeholder?: boolean;
}

enum AnimationState {
  LABEL = 0,
  PLACEHOLDER = 1,
}

const Input = ({
  label,
  value,
  onChangeText,
  onBlur,
  style,
  smaller = false,
  placeholder = true,
  ...rest
}: Props) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocus, setIsFocus] = useState(!placeholder);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!placeholder) {
      return;
    }
    if (isFocus) {
      animateLabel(AnimationState.LABEL);
    } else if (value.length === 0 && !isFocus) {
      animateLabel(AnimationState.PLACEHOLDER);
    }
  }, [isFocus]);

  const animateLabel = (toValue: AnimationState) => {
    Animated.spring(animValue, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={[s.wrapper, { borderBottomWidth: smaller ? 1 : 2 }, style]}>
        <Animated.Text
          style={[
            s.label,
            {
              fontSize: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [12, smaller ? 16 : 20],
              }),
              bottom: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [smaller ? 36 : 50, 15],
              }),
              left: placeholder ? 8 : 0,
            },
          ]}>
          {label}
        </Animated.Text>
        <TextInput
          {...rest}
          style={[
            s.textinput,
            {
              fontSize: smaller ? 16 : 22,
              paddingVertical: smaller ? 6 : 12,
              paddingHorizontal: smaller ? 4 : 8,
            },
          ]}
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          onBlur={e => {
            setIsFocus(false);
            return onBlur(e);
          }}
          onFocus={() => setIsFocus(true)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Input;

const s = StyleSheet.create({
  wrapper: {
    borderBottomColor: Colors.BLACK,
  },
  label: {
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
    position: 'absolute',
  },
  textinput: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 22,
    ...Typography.FONT_MEDIUM,
  },
});
