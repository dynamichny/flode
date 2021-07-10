import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors, Typography } from '_styles';
import { ActionIconWrapper, Button } from '_atoms';
import { CompletnessListItem, ModalHeader } from '_molecules';

const IngredientsCompletnessScreen = ({ navigation, route: { params } }) => {
  const [list, setList] = useState(() =>
    params.list.map(x => ({ ...x, checked: false })),
  );
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    if (list.every(x => x.checked)) {
      setOverlayVisible(true);
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }
  }, [list]);

  const toggleChecked = index => {
    const tempList = [...list];
    tempList[index].checked = !tempList[index].checked;
    setList(tempList);
  };
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
        <Animated.View
          style={[
            s.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}>
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
