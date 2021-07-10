import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import dataArray from '../../data/userCookbook';

import { CategoryIcon, ActionIconWrapper } from '_atoms';
import { Colors, Mixins, Typography } from '_styles';

const WIDTH = Dimensions.get('window').width;

const PreviewScreen = props => {
  const data = useRef(
    dataArray.find(x => x.id === props.route.params.item.id),
  ).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  return (
    <View style={s.wrapper}>
      <View style={[s.headerButtons, { paddingTop: insets.top + 10 }]}>
        <ActionIconWrapper onPress={() => props.navigation.goBack()}>
          <Icon name="keyboard-backspace" size={14} color={Colors.BLACK} />
        </ActionIconWrapper>
      </View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}>
        <Animated.View style={[s.imageWrapper]}>
          <Image
            source={{ uri: data.images[0] }}
            style={s.image}
            resizeMode={'cover'}
          />
        </Animated.View>
        <View style={s.introductionBox}>
          <Text style={s.title}>{data.title}</Text>
          <View style={s.belowTitleWrapper}>
            <View style={s.belowTitle}>
              <Icon
                name="subdirectory-arrow-right"
                size={14}
                color={Colors.PRIMARY}
              />
              <Text style={s.belowTitleText}>
                {data.ingredients.length} składników
              </Text>
            </View>
            <View style={s.belowTitle}>
              <Icon
                name="subdirectory-arrow-right"
                size={14}
                color={Colors.PRIMARY}
              />
              <Text style={s.belowTitleText}>{data.steps.length} kroków</Text>
            </View>
          </View>
          <View style={s.categories}>
            {[...data.categories].slice(0, 5).map((c, index) => (
              <CategoryIcon index={index} color={c.color} emote={c.emote} />
            ))}
            {data?.categories.length > 5 ? (
              <Text style={s.more}>+ {data?.categories.length - 5} więcej</Text>
            ) : null}
          </View>
        </View>
      </Animated.ScrollView>
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
  },
  image: {
    width: WIDTH,
    height: 400,
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
  },
  title: {
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_20,
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
});
