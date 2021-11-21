import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomNavigatorParamsList } from '_types';
import * as exploreActions from '../../store/actions/explore';

import { Colors, Typography } from '_styles';
import { useAppDispatch, useAppSelector } from '_hooks';
import { RootState } from '_store';
import { ListItem } from '_atoms';
import { Recepie } from '_types';
import { StackRoutes, BottomRoutes } from '_types';

export type ExploreScreenProps = StackScreenProps<
  BottomNavigatorParamsList,
  BottomRoutes.ExploreScreen
>;

const selectExoloreItems = (state: RootState) => state.explore.items;

const ExploreScreen = ({ navigation: { navigate } }: ExploreScreenProps) => {
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
                    navigate(StackRoutes.RecepieDetailScreen, {
                      item,
                    })
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

const s = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.WHITE,
    paddingTop: 10,
  },
  headerText: {
    color: Colors.BLACK,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_SEMIHEADER,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  topGradient: {
    height: 100,
    width: '100%',
    transform: [{ translateY: 20 }],
    zIndex: 10,
  },
  bottomGradient: {
    height: 150,
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
  },
  list: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  listContainer: {
    paddingTop: 0,
    paddingBottom: 80,
  },
  primaryArea: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  whiteArea: {
    flex: 0,
    backgroundColor: Colors.WHITE,
  },
});
