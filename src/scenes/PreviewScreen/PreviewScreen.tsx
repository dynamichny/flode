import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryIcon, ActionIconWrapper, Button } from '_atoms';
import { ImagesWithPageing } from '_molecules';
import { Colors, Mixins, Typography } from '_styles';

const PreviewScreen = props => {
  const data = useRef(props.route.params.item).current;
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
        contentContainerStyle={{ paddingBottom: 100 }}>
        <ImagesWithPageing
          images={data.images}
          indicatorTop={insets.top + 20}
        />
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
