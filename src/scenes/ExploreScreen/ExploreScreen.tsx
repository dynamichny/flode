import React, { useEffect } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ListItem } from '_atoms';
import { useAppDispatch, useAppSelector } from '_hooks';
import { ScreenNames } from '_navigations';
import { NavigationService } from '_services';
import { RootState } from '_store';
import { Colors } from '_styles';
import { Recepie } from '_types';

import * as exploreActions from '../../store/actions/explore';
import s from './ExploreScreen.styles';

const selectExoloreItems = (state: RootState) => state.explore.items;

const ExploreScreen = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectExoloreItems);

  useEffect(() => {
    dispatch(exploreActions.getItems());
  }, []);

  return (
    <View style={s.screen}>
      <SafeAreaView style={s.whiteArea} />
      <SafeAreaView style={s.primaryArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={s.wrapper}>
            <Text style={s.headerText}>Przeglądaj udostępnione przepisy</Text>
            <FlatList
              data={data}
              keyExtractor={(item: Recepie) => item.id}
              renderItem={({
                item,
                index,
              }: {
                item: Recepie;
                index: number;
              }) => (
                <ListItem
                  imagePath={item.images[0]}
                  title={item.title}
                  creationDate={item.creationDate}
                  categories={item.categories}
                  onPress={() =>
                    NavigationService.navigate(
                      ScreenNames.RecepieDetailScreen,
                      {
                        item,
                      },
                    )
                  }
                  index={index}
                />
              )}
              style={s.list}
              contentContainerStyle={s.listContainer}
            />
            <LinearGradient
              colors={['#ffffff00', Colors.PRIMARY]}
              style={s.bottomGradient}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

export default ExploreScreen;
