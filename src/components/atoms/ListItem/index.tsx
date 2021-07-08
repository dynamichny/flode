import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from 'react-native-shared-element';
import { Colors, Typography } from '_styles';

interface Props {
  imagePath: string;
  title: string;
  id: string;
  creationDate: string;
  categories: string[] | string;
}

const ListItem = ({
  imagePath,
  title,
  id,
  categories,
  creationDate,
}: Props) => {
  return (
    <View style={s.wrapper}>
      <Image source={{ uri: imagePath }} style={s.image} resizeMode={'cover'} />
      <View style={s.texts}>
        <Text style={s.date}>
          {new Date(creationDate).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </Text>
        <Text style={s.title}>{title}</Text>
        <View style={s.categories}>
          {categories.map((c, index) => (
            <View
              style={[
                s.category,
                {
                  backgroundColor: c.color,
                  transform: [{ translateX: index * -4 }],
                },
              ]}>
              <Text style={s.emoji}>{c.emote}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ListItem;

const s = StyleSheet.create({
  wrapper: {
    height: 135,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    width: 90,
    borderRadius: 15,
    marginRight: 20,
  },
  texts: {
    justifyContent: 'center',
  },
  date: {
    color: Colors.PRIMARY,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_12,
  },
  title: {
    color: Colors.BLACK,
    ...Typography.FONT_MEDIUM,
    fontSize: Typography.FONT_SIZE_16,
    paddingTop: 2,
    paddingBottom: 7 ,
  },
  categories: {
    flexDirection: 'row',
  },
  category: {
    width: 22,
    height: 22,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: { fontSize: 11 },
});
