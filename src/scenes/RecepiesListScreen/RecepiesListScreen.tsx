import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ListItem, Serchbar } from '_atoms';
import { useAppDispatch, useAppSelector } from '_hooks';
import { ScreenNames } from '_navigations';
import { NavigationService } from '_services';
import { RootState } from '_store';
import { Colors } from '_styles';

import * as cookbookActions from '../../store/ducks/Cookbook/cookbookActions';
import s from './RecepiesListScreen.styles';

const selectCookbookItems = (state: RootState) => state.cookbook.items;

const RecepiesListScreen = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCookbookItems);
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(cookbookActions.getUserCollection(query));
  }, [query]);

  return (
    <View style={s.screen}>
      <SafeAreaView style={s.whiteArea} />
      <SafeAreaView style={s.primaryArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={s.wrapper}>
            <Serchbar
              placeholder="Szukaj wśród przepisów..."
              value={query}
              onChangeText={text => setQuery(text)}
            />
            <Text style={s.headerText} testID={'cookbookTitle'}>
              Moje przepisy
            </Text>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => (
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

export default RecepiesListScreen;
