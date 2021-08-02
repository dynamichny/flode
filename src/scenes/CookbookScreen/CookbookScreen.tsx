import React, { useEffect, useState } from 'react';
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
import * as cookbookActions from '../../store/actions/cookbook';
import { StackNavigationProp } from '@react-navigation/stack';

import { BottomNavigatorParamsList, BottomRoutes, StackRoutes } from '_types';
import { Colors, Typography } from '_styles';
import { useAppDispatch, useAppSelector } from '_hooks';
import { RootState } from '_store';
import { ListItem, Serchbar } from '_atoms';

export interface CookbookScreenProps {
  navigation: StackNavigationProp<
    BottomNavigatorParamsList,
    BottomRoutes.CookbookScreen
  >;
}

const selectCookbookItems = (state: RootState) => state.cookbook.items;

const CookbookScreen = ({ navigation: { navigate } }: CookbookScreenProps) => {
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
                    //@ts-ignore
                    navigate(StackRoutes.PreviewScreen, {
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

export default CookbookScreen;

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
