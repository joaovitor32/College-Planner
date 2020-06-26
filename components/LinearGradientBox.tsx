import React, { ReactElement } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../colors/colors";

interface AuxProps {
  children: ReactElement | ReactElement[];
}

const LinearGradientBox = (props: AuxProps) => {
  return (
    <LinearGradient
      colors={[Colors.spanishGray, Colors.darkGray, Colors.blackLinear]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      {props.children}
    </LinearGradient>
  );
};

export default LinearGradientBox;
