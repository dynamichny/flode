import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Colors } from '_styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WIDTH = Dimensions.get('window').width;
const DOT_WIDTH = 10;

interface Props {
  images: Array<string>;
  indicatorTop?: number;
}

const ImagesWithPageing = ({ images, indicatorTop = 20 }: Props) => {
  const caruseleX = useRef(new Animated.Value(0)).current;

  return (
    <View style={s.imageWrapper}>
      <View
        style={[
          s.indicatorWrapper,
          {
            top: indicatorTop,
          },
        ]}>
        {images.map((_, index) => {
          const inputRange = [
            WIDTH * (index - 1),
            WIDTH * index,
            WIDTH * (index + 1),
          ];

          return (
            <Animated.View
              key={`indic_${index}`}
              style={[
                s.indicator,
                {
                  opacity: caruseleX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                  }),
                  transform: [
                    {
                      scale: caruseleX.interpolate({
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
        data={images}
        keyExtractor={(item, index) => index}
        snapToInterval={WIDTH}
        decelerationRate={0}
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FastImage
            source={{ uri: item }}
            style={s.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: caruseleX,
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

export default ImagesWithPageing;

const s = StyleSheet.create({
  imageWrapper: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    height: WIDTH,
  },
  image: {
    width: WIDTH,
    height: '100%',
  },
  indicatorWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: DOT_WIDTH,
    height: DOT_WIDTH,
    marginHorizontal: 8,
    borderRadius: DOT_WIDTH / 2,
    backgroundColor: Colors.WHITE,
  },
});
