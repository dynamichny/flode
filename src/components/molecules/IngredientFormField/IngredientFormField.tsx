import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { Input } from '_atoms';
import { Colors, Typography } from '_styles';

const WIDTH = Dimensions.get('screen').width;
const TRESHOLD = 130;

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Props {
  handleChange: () => void;
  handleBlur: () => void;
  handleRemove: () => void;
  ingredient: Ingredient;
  index: number;
}

const IngredientFormField = ({
  handleChange,
  handleBlur,
  handleRemove,
  ingredient,
  index,
}: Props) => {
  const translateX = useSharedValue(0);
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withTiming(62);
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
          <View style={s.ingredient} key={index}>
            <Input
              label="Nazwa"
              onChangeText={handleChange(`ingredients[${index}].name`)}
              onBlur={handleBlur(`ingredients[${index}].name`)}
              value={ingredient.name}
              style={s.ingredientName}
              smaller={true}
              placeholder={false}
            />
            <Input
              label="Ilosc"
              onChangeText={handleChange(`ingredients[${index}].quantity`)}
              onBlur={handleBlur(`ingredients[${index}].quantity`)}
              value={ingredient.quantity}
              style={s.ingredientQuantity}
              smaller={true}
              placeholder={false}
            />
            <Input
              label="Jednostka"
              onChangeText={handleChange(`ingredients[${index}].unit`)}
              onBlur={handleBlur(`ingredients[${index}].unit`)}
              value={ingredient.unit}
              style={s.ingredientUnit}
              smaller={true}
              placeholder={false}
            />
          </View>
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

export default IngredientFormField;

const s = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  ingredient: {
    flexDirection: 'row',
    marginTop: 24,
    height: 37,
    marginHorizontal: 24,
  },
  ingredientName: {
    flex: 3,
  },
  ingredientQuantity: { flex: 1, marginHorizontal: 5 },
  ingredientUnit: { flex: 1 },

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
});
