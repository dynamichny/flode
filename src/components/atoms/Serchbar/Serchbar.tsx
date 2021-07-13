import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography } from '_styles';
import { ExploreIcon } from '_icons';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: () => void;
  onBlur: () => void;
}

const Serchbar = ({ placeholder, value, onChangeText, ...rest }: Props) => {
  const inputRef = useRef(null);
  const progress = useSharedValue(Colors.GRAY_LIGHT);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    progress.value = withTiming(isFocus ? Colors.PRIMARY : Colors.GRAY_MEDIUM);
  }, [isFocus]);

  const wrapperStyle = useAnimatedStyle(() => ({
    borderColor: progress.value,
  }));

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
      <Animated.View style={[s.wrapper, wrapperStyle]}>
        <View style={s.icon}>
          <ExploreIcon color={Colors.GRAY_LIGHT} height={20} />
        </View>
        <TextInput
          style={s.textinput}
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.GRAY_MEDIUM}
          onBlur={e => {
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
          {...{ rest }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Serchbar;

const s = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24,
    borderWidth: 0.5,
    borderRadius: 40,
    borderColor: Colors.GRAY_MEDIUM,
    flexDirection: 'row',
  },
  label: {
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
    flex: 1,
  },
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    paddingLeft: 50,
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: Typography.FONT_SIZE_14,
    ...Typography.FONT_MEDIUM,
  },
});
