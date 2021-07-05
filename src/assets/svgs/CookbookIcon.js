import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { Colors } from '_styles';

export default function CookbookIcon({
  color = Colors.BLACK,
  width = 29,
  height = 20,
}) {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 29.432 20.247">
        <G transform="translate(-299.401 -218.947)">
          <Path
            d="M322.736,223.629c1.851-.3,3.866,1.6,4.32,2.207,2.859,5.006-3.562,6.53-3.562,6.53h0v5.828H304.625s-.422-6.145.478-7.542,10.212-.305,10.212-.305"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <Path
            d="M303.493,232.361l.43.244c-.012,0-6.623-2.482-1.581-8.021,2.16-2.373,6.331-3.322,9.635-2.705a12.961,12.961,0,0,1,6.346,3.525"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeWidth="2.5"
          />
          <Path
            d="M311.593,221.765s3.651-2.105,6.71-1.773,5.965,3.756,5.965,3.756"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeWidth="2.5"
          />
          <Path
            d="M313.681,228.576a10.769,10.769,0,0,0,10.617,3.562"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="2.5"
          />
        </G>
      </Svg>
    </View>
  );
}
