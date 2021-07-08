import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography } from '_styles';
import { ListItem } from '_atoms';
import data from '../../data/userCookbook';

interface Props {}

const CookbookScreen = (props: Props) => {
  return (
    <View style={s.screen}>
      <SafeAreaView style={s.whiteArea} />
      <SafeAreaView style={s.primaryArea}>
        <View style={s.wrapper}>
          <Text style={s.headerText}>Moje przepisy</Text>
          <LinearGradient
            colors={[Colors.WHITE, '#ffffff00']}
            style={s.topGradient}
          />
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem imagePath={item.images[0]} {...item} />
            )}
            style={s.list}
            contentContainerStyle={s.listContainer}
          />
          <LinearGradient
            colors={['#ffffff00', Colors.PRIMARY]}
            style={s.bottomGradient}
          />
        </View>
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
  },
  headerText: {
    color: Colors.BLACK,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_SEMIHEADER,
    paddingHorizontal: 24,
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
    marginTop: -80,
    paddingHorizontal: 24,
  },
  listContainer: {
    paddingTop: 20,
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
