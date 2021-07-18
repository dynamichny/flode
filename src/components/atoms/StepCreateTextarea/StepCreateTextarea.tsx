import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { Colors, Typography } from '_styles';

const WIDTH = Dimensions.get('screen').width;
const TRESHOLD = 130;
const TEXTAREA_HEIGHT = 70;

interface Props {
  handleChange: () => void;
  handleRemove: () => void;
  value: string;
  index: number;
}

const StepCreateTextarea = ({
  handleChange,
  handleRemove,
  value,
  index,
}: Props) => {
  const translateX = useSharedValue(0);
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withTiming(TEXTAREA_HEIGHT + 10);
  });

  const gesture = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.x = 0;
    },
    onActive: (event, context) => {
      translateX.value = context.x =
        event.translationX > 0 ? 0 : event.translationX;
    },
    onEnd: (event, context) => {
      if (Math.abs(context.x) > TRESHOLD) {
        translateX.value = withTiming(-WIDTH);
        height.value = withTiming(0, {}, isFinished => {
          if (isFinished) {
            runOnJS(handleRemove)();
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const ingredientStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const removeStyle = useAnimatedStyle(() => ({
    width: -translateX.value,
    left: WIDTH + translateX.value,
  }));
  const wrapperStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <PanGestureHandler onGestureEvent={gesture}>
      <Animated.View style={[s.wrapper, wrapperStyle]}>
        <Animated.View style={[ingredientStyle]}>
          <View style={s.labelWrapper}>
            <Text style={s.label}>{index + 1}</Text>
          </View>
          <TextInput
            value={value}
            onChangeText={handleChange}
            style={s.textarea}
            multiline={true}
            placeholder={'Wpisz tekst...'}
            placeholderTextColor={Colors.GRAY_MEDIUM}
          />
        </Animated.View>
        <Animated.View style={[s.remove, removeStyle]}>
          <Text
            style={s.removeText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}>
            Usuń
          </Text>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default StepCreateTextarea;

const s = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    position: 'relative',
    paddingTop: 3,
  },
  textarea: {
    height: TEXTAREA_HEIGHT - 3,
    width: WIDTH - 48,
    marginHorizontal: 24,
    borderWidth: 0.5,
    borderColor: Colors.GRAY_DARK,
    borderRadius: 5,
    padding: 6,
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },

  remove: {
    backgroundColor: Colors.ALERT,
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    right: 0,
    overflow: 'hidden',
  },
  removeText: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    textAlign: 'center',
  },

  labelWrapper: {
    width: 15,
    height: 15,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    position: 'absolute',
    top: -3,
    left: 20,
    zIndex: 10,
  },
  label: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE,
  },
});
