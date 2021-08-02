import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';

import { Colors, Typography } from '_styles';
import { RootRoutes, RootNavigatorParamsList } from '_types';
import { Button } from '_atoms';
import { CompletnessListItem, ModalHeader } from '_molecules';
export interface IngredientsCompletnessScreenProps {
  navigation: StackNavigationProp<
    RootNavigatorParamsList,
    RootRoutes.IngredientsCompletnessScreen
  >;
}

const IngredientsCompletnessScreen = ({
  navigation,
  route: { params },
}: IngredientsCompletnessScreenProps) => {
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

  const toggleChecked = index => {
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
                  navigation.navigate('CookingScreen', {
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

export default IngredientsCompletnessScreen;

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  listWrapper: {
    paddingHorizontal: 24,
  },
  overlay: {
    backgroundColor: '#000000B3',
    ...StyleSheet.absoluteFill,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  overlayText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_SEMIHEADER,
    ...Typography.FONT_BOLD,
    textAlign: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingHorizontal: 24,
  },
});
