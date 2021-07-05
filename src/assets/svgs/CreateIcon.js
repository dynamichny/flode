import React from 'react';
import { View } from 'react-native';
import Svg, { G, Circle, Path } from 'react-native-svg';
import { Colors } from '_styles';

export default function CreateIcon({
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
        viewBox="0 0 25 25">
        <G transform="translate(-411 -250)">
          <G>
            <Path
              d="M423.5,258.436v8"
              transform="translate(0.126 0.064)"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="2"
            />
            <Path
              d="M423.5,258.436v8"
              transform="translate(685.936 -161) rotate(90)"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="2"
            />
          </G>
          <G
            transform="translate(411 250)"
            fill="none"
            stroke={color}
            strokeWidth="2">
            <Circle cx="12.5" cy="12.5" r="12.5" stroke="none" />
            <Circle cx="12.5" cy="12.5" r="11.5" fill="none" />
          </G>
        </G>
      </Svg>
    </View>
  );
}
