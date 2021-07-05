import React from 'react';
import { View } from 'react-native';
import Svg, { G, Circle, Line } from 'react-native-svg';
import { Colors } from '_styles';

export default function ExploreIcon({
  color = Colors.BLACK,
  width = 25,
  height = 25,
}) {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 27.121 27.121">
        <G transform="translate(-350 -218)">
          <G
            transform="translate(350 218)"
            fill="none"
            stroke={color}
            strokeWidth="3">
            <Circle cx="9.884" cy="9.884" r="9.884" stroke="none" />
            <Circle cx="9.884" cy="9.884" r="8.884" fill="none" />
          </G>
          <Line
            x2="8.14"
            y2="8.14"
            transform="translate(366.86 234.86)"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="4"
          />
        </G>
      </Svg>
    </View>
  );
}
