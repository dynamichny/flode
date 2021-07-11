import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import dataArray from '../../data/userCookbook';

import { CategoryIcon, ActionIconWrapper, Button } from '_atoms';
import { Colors, Mixins, Typography } from '_styles';

const WIDTH = Dimensions.get('window').width;
const DOT_WIDTH = 10;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const PreviewScreen = props => {
  const data = useRef(
    dataArray.find(x => x.id === props.route.params.item.id),
  ).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const caruseleX = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  return (
    <View style={s.wrapper}>
      <View style={[s.headerButtons, { paddingTop: insets.top + 10 }]}>
        <ActionIconWrapper onPress={() => props.navigation.goBack()}>
          <Icon name="keyboard-backspace" size={14} color={Colors.BLACK} />
        </ActionIconWrapper>
      </View>
      <Animated.ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={s.imageWrapper}>
          <View
            style={[
              s.indicatorWrapper,
              {
                top: insets.top + 20,
              },
            ]}>
            {data?.images.map((_, index) => {
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
            data={data.images}
            keyExtractor={item => item}
            snapToInterval={WIDTH}
            decelerationRate={0}
            horizontal={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={s.image}
                resizeMode={'cover'}
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
        <View style={s.introductionBox}>
          <Text style={s.title}>{data?.title}</Text>
          <View style={s.belowTitleWrapper}>
            <View style={s.belowTitle}>
              <Icon
                name="subdirectory-arrow-right"
                size={14}
                color={Colors.PRIMARY}
              />
              <Text style={s.belowTitleText}>
                {data?.ingredients.length} składników
              </Text>
            </View>
            <View style={s.belowTitle}>
              <Icon
                name="subdirectory-arrow-right"
                size={14}
                color={Colors.PRIMARY}
              />
              <Text style={s.belowTitleText}>{data?.steps.length} kroków</Text>
            </View>
          </View>
          <View style={s.categories}>
            {[...data.categories].slice(0, 5).map((c, index) => (
              <CategoryIcon
                key={`cat_${index}`}
                index={index}
                color={c.color}
                emote={c.emote}
              />
            ))}
            {data?.categories.length > 5 ? (
              <Text style={s.more}>+ {data?.categories.length - 5} więcej</Text>
            ) : null}
          </View>
        </View>
        <View style={s.ingredientsWrapper}>
          <View style={s.rowBetween}>
            <Text style={s.sectionTitle}>Składniki</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('IngredientsCompletnessScreen', {
                  list: data?.ingredients,
                  steps: data?.steps,
                  title: data?.title,
                })
              }>
              <Text style={s.checkCompletnessText}>Sprawdź kompletność</Text>
            </TouchableOpacity>
          </View>
          {data?.ingredients.map((item, index) => (
            <View style={s.ingredientWrapper} key={`ingr_${index}`}>
              <Text style={s.ingredientText}>{item.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={s.ingredientText}>{item.quantity}</Text>
                <Text style={s.ingredientText}>{item.unit}</Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
      <View style={s.bottomFixed}>
        <ActionIconWrapper onPress={() => {}}>
          <Ionicon name="share-outline" size={14} color={Colors.BLACK} />
        </ActionIconWrapper>
        <Button
          label={'Przejdź do gotowania!'}
          onPress={() =>
            props.navigation.navigate('CookingScreen', {
              steps: data?.steps,
              title: data?.title,
            })
          }
          fullWidth
          style={{ flex: 1, marginLeft: 12 }}
        />
      </View>
    </View>
  );
};

export default PreviewScreen;

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerButtons: {
    position: 'absolute',
    zIndex: 10,
    paddingHorizontal: 20,
  },
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
  introductionBox: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 25,
    paddingHorizontal: 30,
    ...Mixins.boxShadow('#959da5', { height: 8, width: 0 }, 24, 0.2),
    marginHorizontal: 30,
    transform: [
      {
        translateY: -70,
      },
    ],
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 45,
    borderBottomRightRadius: 45,
    zIndex: 10,
    marginBottom: -40,
  },
  title: {
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.BLACK,
  },
  sectionTitle: {
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.BLACK,
  },
  belowTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  belowTitleText: {
    fontSize: Typography.FONT_SIZE_14,
    ...Typography.FONT_LIGHT,
    marginLeft: 5,
  },
  belowTitleWrapper: {
    paddingVertical: 10,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  more: {
    transform: [{ translateX: -20 }],
    ...Typography.FONT_LIGHT,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_12,
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
  ingredientsWrapper: {
    marginHorizontal: 24,
  },
  ingredientWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Mixins.boxShadow('#959da5', { height: 8, width: 0 }, 24, 0.1),
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    padding: 12,
    marginBottom: 8,
  },
  ingredientText: {
    color: Colors.BLACK,
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
  checkCompletnessText: {
    ...Typography.FONT_LIGHT,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_14,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.BLACK_70,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomFixed: {
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    bottom: 0,
  },
});
