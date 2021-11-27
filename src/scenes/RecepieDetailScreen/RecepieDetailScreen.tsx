import React, { useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ActionIconWrapper, Button, CategoryIcon } from '_atoms';
import { ImagesWithPageing } from '_molecules';
import { RecepieDetailScreenProps, ScreenNames } from '_navigations';
import { NavigationService } from '_services';
import { Colors } from '_styles';

import s from './RecepieDetailScreen.styles';

const RecepieDetailScreen = ({
  navigation,
  route: {
    params: { item },
  },
}: RecepieDetailScreenProps) => {
  const data = useRef(item).current;
  const insets = useSafeAreaInsets();

  return (
    <View style={s.wrapper}>
      <View style={[s.headerButtons, { paddingTop: insets.top + 10 }]}>
        <ActionIconWrapper onPress={() => navigation.goBack()}>
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
                NavigationService.navigate(ScreenNames.IngredientsScreen, {
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
            NavigationService.navigate(ScreenNames.CookingScreen, {
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

export default RecepieDetailScreen;
