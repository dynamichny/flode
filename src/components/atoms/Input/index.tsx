import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { Colors, Typography } from '_styles';

interface Props {
  label: string;
  value: string;
  onChangeText: () => void;
  onBlur: () => void;
}

enum AnimationState {
  LABEL = 0,
  PLACEHOLDER = 1,
}

const Input = ({ label, value, onChangeText, onBlur, ...rest }: Props) => {
  const inputRef = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocus) {
      animateLabel(AnimationState.LABEL);
    } else if (value.length === 0 && !isFocus) {
      animateLabel(AnimationState.PLACEHOLDER);
    }
  }, [isFocus]);

  const animateLabel = (toValue: AnimationState) => {
    Animated.spring(animValue, {
      toValue,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
      <View style={s.wrapper}>
        <Animated.Text
          style={[
            s.label,
            {
              fontSize: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 20],
              }),
              bottom: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 15],
              }),
            },
          ]}>
          {label}
        </Animated.Text>
        <TextInput
          style={s.textinput}
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          onBlur={e => {
            setIsFocus(false);
            return onBlur(e);
          }}
          onFocus={() => setIsFocus(true)}
          {...{ rest }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Input;

const s = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.BLACK,
  },
  label: {
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
    position: 'absolute',
    left: 8,
  },
  textinput: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 22,
    ...Typography.FONT_MEDIUM,
  },
});
