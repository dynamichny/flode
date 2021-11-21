import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { RootNavigatorParamsList, RootRoutes } from '_types';
import { Button } from '_atoms';
import { ModalHeader } from '_molecules';
import { Colors, Typography } from '_styles';

const HEIGHT = Dimensions.get('screen').height;
const DOT_WIDTH = 10;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export type CookingScreenProps = StackScreenProps<
  RootNavigatorParamsList,
  RootRoutes.CookingScreen
>;

const CookingScreen = ({
  navigation,
  route: {
    params: { title, steps },
  },
}: CookingScreenProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerRef = useRef<View>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const stepHeight = 240;
  const stepsList = ['first', ...steps, 'last'];

  useEffect(() => {
    setHeaderHeight(75);

    headerRef.current?.measure((x, y, w, h) => {
      setHeaderHeight(h);
    });
  }, []);

  return (
    <View style={s.screen}>
      <ModalHeader
        title={title}
        goBack={() => navigation.goBack()}
        ref={headerRef}
      />
      <View style={s.paginationWrapper}>
        {steps.map((_, index) => {
          const inputRange = [
            stepHeight * (index - 1),
            stepHeight * index,
            stepHeight * (index + 1),
          ];
          return (
            <Animated.View
              key={`pag_${index}`}
              style={[
                s.pagination,
                {
                  opacity: scrollY.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                  }),
                  transform: [
                    {
                      scale: scrollY.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            />
          );
        })}
      </View>
      <AnimatedFlatList
        scrollEventThrottle={16}
        snapToInterval={stepHeight}
        decelerationRate={0}
        bounces={false}
        data={stepsList}
        keyExtractor={(item: string) => item}
        renderItem={({ item, index }: { item: string; index: number }) => {
          if (['first', 'last'].includes(item)) {
            if (item == 'last') {
              return (
                <View
                  style={{
                    height: (HEIGHT - headerHeight) / 2 - stepHeight / 2,
                    alignItems: 'center',
                  }}>
                  <Button
                    label={'Zakończ'}
                    onPress={() => navigation.goBack()}
                    style={{ width: 200 }}
                  />
                </View>
              );
            }
            return (
              <View
                style={{ height: (HEIGHT - headerHeight) / 2 - stepHeight / 2 }}
              />
            );
          }
          const inputRange = [
            (index - 2) * stepHeight,
            (index - 1) * stepHeight,
            index * stepHeight,
          ];
          return (
            <Animated.View
              style={[
                s.stepWrapper,
                {
                  height: stepHeight,
                  opacity: scrollY.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                  }),
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange,
                        outputRange: [-35, 0, 70],
                      }),
                    },
                  ],
                },
              ]}>
              <Text style={[s.stepText]}>{item}</Text>
            </Animated.View>
          );
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
      />
    </View>
  );
};

export default CookingScreen;

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  stepWrapper: {
    alignItems: 'center',
    padding: 20,
  },
  stepText: {
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
    textAlign: 'center',
  },
  paginationWrapper: {
    position: 'absolute',
    left: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  pagination: {
    width: DOT_WIDTH,
    height: DOT_WIDTH,
    marginVertical: 3,
    borderRadius: DOT_WIDTH / 2,
    backgroundColor: Colors.PRIMARY,
  },
});
