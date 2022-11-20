import { Image, View } from "native-base";
import React from "react";
import Svg, { Path } from "react-native-svg";

const CommentIcon = () => {
  return (
    <View>
      <Svg width={30} height={30} viewBox="0 0 24 24">
        <Path
          d="M19.675,2.758A11.936,11.936,0,0,0,10.474.1,12,12,0,0,0,12.018,24H19a5.006,5.006,0,0,0,5-5V11.309l0-.063A12.044,12.044,0,0,0,19.675,2.758ZM8,7h4a1,1,0,0,1,0,2H8A1,1,0,0,1,8,7Zm8,10H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Zm0-4H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
};

export default CommentIcon;
