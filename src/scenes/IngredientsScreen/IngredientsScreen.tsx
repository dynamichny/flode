import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Button } from '_atoms';
import { CompletnessListItem, ModalHeader } from '_molecules';
import { IngredientsScreenProps, ScreenNames } from '_navigations';
import { Colors } from '_styles';

import s from './IngredientsScreen.styles';

const IngredientsScreen = ({
  navigation,
  route: { params },
}: IngredientsScreenProps) => {
  const [list, setList] = useState(() =>
    params.list.map(x => ({ ...x, checked: false })),
  );
  const overlayOpacity = useSharedValue(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    if (list.every(x => x.checked)) {
      setOverlayVisible(true);
      overlayOpacity.value = withTiming(1);
    }
  }, [list]);

  const toggleChecked = (index: number) => {
    const tempList = [...list];
    tempList[index].checked = !tempList[index].checked;
    setList(tempList);
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));
  return (
    <View style={s.screen}>
      <ModalHeader
        title={'Sprawdź, czy masz wszystkie produkty.'}
        goBack={() => navigation.goBack()}
      />
      <ScrollView
        style={s.listWrapper}
        contentContainerStyle={{ paddingBottom: 50 }}>
        {list.map(({ name, quantity, unit, checked }, index) => (
          <CompletnessListItem
            key={index}
            name={name}
            quantity={quantity}
            unit={unit}
            checked={checked}
            onChange={() => toggleChecked(index)}
          />
        ))}
      </ScrollView>
      {overlayVisible && (
        <Animated.View style={[s.overlay, overlayStyle]}>
          <Text style={s.overlayText}>
            Wygląda na to, że udało Ci się skompletować wszystkie potrzebne
            produkty!
          </Text>
          <View style={s.buttonsWrapper}>
            <Button
              label="Powtót"
              onPress={() => navigation.goBack()}
              style={{ ...s.button, backgroundColor: Colors.GRAY_DARK }}
            />
            <Button
              label="Zacznij gotowanie"
              onPress={() => {
                setTimeout(() => {
                  navigation.navigate(ScreenNames.CookingScreen, {
                    steps: params.steps,
                    title: params.title,
                  });
                }, 500);
                navigation.goBack();
              }}
              style={s.button}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default IngredientsScreen;
