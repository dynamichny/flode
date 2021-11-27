import React, { useRef } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Button } from '_atoms';
import { ModalHeader } from '_molecules';
import { CookingScreenProps } from '_navigations';

import s from './CookingScreen.styles';

const HEIGHT = Dimensions.get('screen').height;
const STEP_HEIGHT = 240;
const HEADER_HEIGHT = 80;
export const DOT_WIDTH = 10;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PagginationDot = ({
  index,
  scrollY,
}: {
  index: number;
  scrollY: Animated.SharedValue<number>;
}) => {
  const interpolatedY = interpolate(
    scrollY.value,
    [STEP_HEIGHT * (index - 1), STEP_HEIGHT * index, STEP_HEIGHT * (index + 1)],
    [0.5, 1, 0.5],
    Extrapolate.CLAMP,
  );

  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolatedY,
    transform: [
      {
        scale: interpolatedY,
      },
    ],
  }));

  return <Animated.View style={[s.pagination, dotStyle]} />;
};

const RecepieItem = ({
  item,
  index,
  scrollY,
}: {
  item: string;
  index: number;
  scrollY: Animated.SharedValue<number>;
}) => {
  const inputRange = [
    (index - 1) * STEP_HEIGHT,
    index * STEP_HEIGHT,
    (index + 1) * STEP_HEIGHT,
  ];

  const itemStyle = useAnimatedStyle(
    () => ({
      height: STEP_HEIGHT,
      opacity: interpolate(scrollY.value, inputRange, [0.3, 1, 0.3]),
      transform: [
        {
          translateY: interpolate(scrollY.value, inputRange, [-35, 0, 70]),
        },
      ],
    }),
    [scrollY],
  );

  return (
    <Animated.View style={[s.stepWrapper, itemStyle]}>
      <Text style={[s.stepText]}>{item}</Text>
    </Animated.View>
  );
};

const CookingScreen = ({
  navigation,
  route: {
    params: { title, steps },
  },
}: CookingScreenProps) => {
  const scrollY = useSharedValue<number>(0);
  const headerRef = useRef<View>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <View style={s.screen}>
      <ModalHeader
        title={title}
        goBack={() => navigation.goBack()}
        ref={headerRef}
      />
      <View style={s.paginationWrapper}>
        {steps.map((_, index) => (
          <PagginationDot
            {...{ index, key: `pag_${index}` }}
            scrollY={scrollY}
          />
        ))}
      </View>
      <AnimatedFlatList
        scrollEventThrottle={16}
        snapToInterval={STEP_HEIGHT}
        decelerationRate={0}
        bounces={false}
        data={steps}
        ListHeaderComponent={() => (
          <View
            style={{
              height: (HEIGHT - HEADER_HEIGHT) / 2 - STEP_HEIGHT / 2,
            }}
          />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              height: (HEIGHT - HEADER_HEIGHT) / 2 - STEP_HEIGHT / 2,
              alignItems: 'center',
            }}>
            <Button
              label={'Zakończ'}
              onPress={() => navigation.goBack()}
              style={{ width: 200 }}
            />
          </View>
        )}
        keyExtractor={(item: string, index: number) => `${item}_${index}`}
        onScroll={scrollHandler}
        renderItem={({ item, index }: ListRenderItemInfo<string>) => (
          <RecepieItem {...{ item, index, scrollY }} />
        )}
      />
    </View>
  );
};

export default CookingScreen;
