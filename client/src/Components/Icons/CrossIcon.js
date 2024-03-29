import { View } from "native-base";
import React from "react";
import Svg, { G, Path } from "react-native-svg";

const CrossIcon = (color) => {
  return (
    <View
      style={{
        backgroundColor: "#CBD18F",
      }}
    >
      <Svg width={20} height={20} viewBox="0 0 511.991 511.991">
        <G>
          <Path
            d="M286.161,255.867L505.745,36.283c8.185-8.474,7.951-21.98-0.523-30.165c-8.267-7.985-21.375-7.985-29.642,0   L255.995,225.702L36.411,6.118c-8.475-8.185-21.98-7.95-30.165,0.524c-7.985,8.267-7.985,21.374,0,29.641L225.83,255.867   L6.246,475.451c-8.328,8.331-8.328,21.835,0,30.165l0,0c8.331,8.328,21.835,8.328,30.165,0l219.584-219.584l219.584,219.584   c8.331,8.328,21.835,8.328,30.165,0l0,0c8.328-8.331,8.328-21.835,0-30.165L286.161,255.867z"
            fill={color.color}
          />
        </G>
      </Svg>
    </View>
  );
};

export default CrossIcon;
